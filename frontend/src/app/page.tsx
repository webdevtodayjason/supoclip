// Modified by Pressloom (modified SupoClip, AGPL-3.0), 2026-11-24: internal tool, no landing page.
import type { Metadata } from "next";

import { HomeRouter } from "@/components/home-router";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  robots: { index: false, follow: false },
};

export default function HomePage() {
  return <HomeRouter />;
}
