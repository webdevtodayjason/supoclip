// Modified by Pressloom (modified SupoClip, AGPL-3.0), 2026-11-24: Pressloom branding, no links
// to the hosted SupoClip service, and the source/attribution links AGPL-3.0 requires.

export const SITE_NAME = "Pressloom Clips";
export const COMPANY_NAME = "Pressloom";
export const DEFAULT_SITE_URL = "http://localhost:3107";

/**
 * Where users of this install get its source code (AGPL-3.0 §13). Point it at the exact
 * code you deploy, for example a tag or commit, with NEXT_PUBLIC_SOURCE_URL.
 */
export const SOURCE_CODE_URL =
  process.env.NEXT_PUBLIC_SOURCE_URL?.trim() || "https://github.com/webdevtodayjason/supoclip/tree/agpl-base";
/** Repository the docs and MCP install snippets point at, and the branch they read from. */
export const GITHUB_URL = "https://github.com/webdevtodayjason/supoclip";
export const SOURCE_REF = process.env.NEXT_PUBLIC_SOURCE_REF?.trim() || "agpl-base";

/** Upstream project this install is based on (attribution only; no affiliation). */
export const UPSTREAM_NAME = "SupoClip";
export const UPSTREAM_REPO_URL = "https://github.com/FujiwaraChoki/supoclip";
export const UPSTREAM_LICENSE = "AGPL-3.0";

/** Default MCP endpoint (the compose `mcp` service); set NEXT_PUBLIC_MCP_URL in production. */
export const HOSTED_MCP_URL = "http://localhost:9100/mcp";

/** MCP endpoint shown in setup snippets; self-hosters set NEXT_PUBLIC_MCP_URL. */
export function getMcpUrl() {
  const value = process.env.NEXT_PUBLIC_MCP_URL?.trim();
  if (!value) return HOSTED_MCP_URL;
  try {
    return new URL(value).toString().replace(/\/$/, "");
  } catch {
    return HOSTED_MCP_URL;
  }
}

export function getSiteUrl() {
  try {
    return new URL(process.env.NEXT_PUBLIC_APP_URL || DEFAULT_SITE_URL).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}
