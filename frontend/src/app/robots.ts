// Modified by Pressloom (modified SupoClip, AGPL-3.0), 2026-11-24: internal tool, keep crawlers out.
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }] };
}
