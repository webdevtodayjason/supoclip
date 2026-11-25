import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { ReactNode } from "react";
import { act } from "react";
import { hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ClipCutAnimation } from "@/components/auth/clip-cut-animation";

const messages: Record<string, unknown> = {};
for (const file of readdirSync(join(process.cwd(), "messages/en"))) {
  if (file.endsWith(".json")) {
    messages[file.replace(/\.json$/, "")] = JSON.parse(readFileSync(join(process.cwd(), "messages/en", file), "utf8"));
  }
}

function Intl({ children }: { children: ReactNode }) {
  return <NextIntlClientProvider locale="en" messages={messages}>{children}</NextIntlClientProvider>;
}

// One media query whose answer the test flips between server render and hydration.
// Listeners outlive each test: motion subscribes once per module, not per render.
let reduce = false;
const listeners = new Set<() => void>();
function setReduce(value: boolean) {
  reduce = value;
  listeners.forEach((listener) => listener());
}

let root: Root | undefined;

beforeEach(() => {
  setReduce(false);
  vi.stubGlobal("matchMedia", (query: string) => ({
    get matches() { return query.includes("prefers-reduced-motion") && reduce; },
    media: query,
    addEventListener: (_: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
  }));
  vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
  vi.stubGlobal("IntersectionObserver", class { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } });
});

afterEach(async () => {
  if (root) await act(async () => root?.unmount());
  root = undefined;
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

/** Server-renders `ui` (no reduced motion known), then hydrates it for a visitor who prefers reduced motion. */
async function hydrateWithReducedMotion(ui: ReactNode) {
  const container = document.createElement("div");
  container.innerHTML = renderToString(<Intl>{ui}</Intl>);
  document.body.append(container);

  setReduce(true);
  const onRecoverableError = vi.fn();
  await act(async () => {
    root = hydrateRoot(container, <Intl>{ui}</Intl>, { onRecoverableError });
  });
  return { container, onRecoverableError };
}

describe("reduced motion hydration", () => {
  it("hydrates the auth animation, then shows the finished clips", async () => {
    const { container, onRecoverableError } = await hydrateWithReducedMotion(<ClipCutAnimation />);

    expect(onRecoverableError).not.toHaveBeenCalled();
    // The caption swaps through a short exit animation.
    const ready = (messages.auth as { animation: { ready: string } }).animation.ready;
    await vi.waitFor(() => expect(container.textContent).toContain(ready), { timeout: 3000 });
  });

});
