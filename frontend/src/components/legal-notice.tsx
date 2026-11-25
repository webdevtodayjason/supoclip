// Added 2026-11-24 by Jason Brashear / Pressloom (modified version of SupoClip, AGPL-3.0).
//
// The "Appropriate Legal Notices" AGPL-3.0 §5(d) asks every interactive interface to show, and
// the source-code offer §13 owes everyone who uses this install over a network.
import { cn } from "@/lib/utils";
import {
  GITHUB_URL,
  SITE_NAME,
  SOURCE_CODE_URL,
  SOURCE_REF,
  UPSTREAM_LICENSE,
  UPSTREAM_NAME,
  UPSTREAM_REPO_URL,
} from "@/lib/site";

const LICENSE_URL = `${GITHUB_URL}/blob/${SOURCE_REF}/LICENSE`;

const link = "underline underline-offset-2 hover:text-foreground";

export function LegalNotice({ className, compact = false }: { className?: string; compact?: boolean }) {
  if (compact) {
    return (
      <p className={cn("text-[11px] leading-relaxed text-muted-foreground", className)}>
        Based on{" "}
        <a href={UPSTREAM_REPO_URL} target="_blank" rel="noopener noreferrer" className={link}>{UPSTREAM_NAME}</a>
        {" · "}
        <a href={LICENSE_URL} target="_blank" rel="noopener noreferrer" className={link}>{UPSTREAM_LICENSE}</a>
        {" · "}
        <a href={SOURCE_CODE_URL} target="_blank" rel="noopener noreferrer" className={link}>Source</a>
      </p>
    );
  }
  return (
    <p className={cn("text-xs leading-relaxed text-muted-foreground", className)}>
      {SITE_NAME} is a modified version of{" "}
      <a href={UPSTREAM_REPO_URL} target="_blank" rel="noopener noreferrer" className={link}>{UPSTREAM_NAME}</a>
      {" "}© the {UPSTREAM_NAME} contributors and Pressloom. It is free software under the{" "}
      <a href={LICENSE_URL} target="_blank" rel="noopener noreferrer" className={link}>GNU Affero General Public License v3</a>
      , provided without any warranty.{" "}
      <a href={SOURCE_CODE_URL} target="_blank" rel="noopener noreferrer" className={link}>Get the source code</a>.
    </p>
  );
}
