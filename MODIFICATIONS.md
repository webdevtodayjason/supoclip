# Modifications to SupoClip

Pressloom Clips is a modified version of [SupoClip](https://github.com/FujiwaraChoki/supoclip),
built on commit `d2378a9` (18 November 2026), the last SupoClip release published under the
GNU Affero General Public License v3. This file is the notice of modification AGPL-3.0 §5(a)
asks for: what Pressloom changed and when. Git history has the full detail.

## 2026-11-24, Pressloom (Jason Brashear)

- **Fixed fresh-install sign-up.** A backend migration adds the columns and table that only the
  Prisma migrations created (sign-up failed with Prisma P2022). `scripts/check-schema-parity.sh`
  catches future drift between `init.sql` + backend migrations and the Prisma schema.
- **Rebranded to Pressloom Clips.** New name and an original logo. SupoClip's name, logo, hosted
  URLs, App Store, Product Hunt and Discord links were removed from the product. The
  `X-SupoClip-*` webhook headers and `x-supoclip-*` internal headers keep their names for
  compatibility.
- **Attribution and source offer.** Every screen shows a link to SupoClip, the AGPL-3.0 license
  and this install's source code (`LegalNotice`). Set `NEXT_PUBLIC_SOURCE_URL` to the code you run.
- **Removed SupoClip's marketing site** (landing page, blog, SEO pages, FAQ, changelog, demo,
  pricing, privacy/terms, sitemap, social images, demo clips) and the creator (affiliate)
  program's application page. `/` opens the app, or sign-in when signed out. Crawlers are kept out.
- **Removed seeded hosted-service content:** a "degraded" downloads incident and a
  creator-program announcement (backend migration `20261124_0002`).
- **Fonts.** Removed THEBOLDFONT (license unclear for commercial use). Anton (SIL OFL 1.1) replaces
  it in every caption template and as the hook-title default, and `THEBOLDFONT` is kept as an alias
  so old drafts still render. The `default` and `neon` templates set uppercase explicitly to keep
  their all-caps look. License texts for all bundled fonts are in `backend/fonts/licenses/`.
- **Self-host defaults.** No per-video length limit when `SELF_HOST=true` and
  `MAX_VIDEO_DURATION` is unset or `0`. `VIDEO_JOB_TIMEOUT_SECONDS` sets the video worker timeout.
  The MCP server, docker-compose and email fallbacks point at this install, never supoclip.com.
  Emails have no Reply-To unless `SUPPORT_EMAIL` is set.
- **Contribution terms.** Contributions are accepted under AGPL-3.0 only (CONTRIBUTING.md), with a
  clean-room rule: no SupoClip code released after `d2378a9` may enter this repository.

## Files changed from `d2378a9`

Status: A = added, M = modified, D = deleted.

```
M  .env.example
M  CLAUDE.md
M  CONTRIBUTING.md
M  README.md
M  backend/fonts/SOURCES.md
D  backend/fonts/THEBOLDFONT.ttf
A  backend/fonts/licenses/TikTokSans-OFL.txt
A  backend/fonts/licenses/anton-OFL.txt
A  backend/fonts/licenses/archivoblack-OFL.txt
A  backend/fonts/licenses/bangers-OFL.txt
A  backend/fonts/licenses/barlowcondensed-OFL.txt
A  backend/fonts/licenses/bebasneue-OFL.txt
A  backend/fonts/licenses/dmsans-OFL.txt
A  backend/fonts/licenses/inter-OFL.txt
A  backend/fonts/licenses/leaguespartan-OFL.txt
A  backend/fonts/licenses/montserrat-OFL.txt
A  backend/fonts/licenses/nunitosans-OFL.txt
A  backend/fonts/licenses/opensans-OFL.txt
A  backend/fonts/licenses/oswald-OFL.txt
A  backend/fonts/licenses/poppins-OFL.txt
A  backend/fonts/licenses/raleway-OFL.txt
A  backend/fonts/licenses/roboto-OFL.txt
A  backend/fonts/licenses/rubik-OFL.txt
A  backend/fonts/licenses/sora-OFL.txt
A  backend/fonts/licenses/urbanist-OFL.txt
A  backend/fonts/licenses/worksans-OFL.txt
M  backend/src/api/routes/email_preferences.py
M  backend/src/api/routes/tasks.py
A  backend/src/branding.py
M  backend/src/caption_templates.py
M  backend/src/config.py
M  backend/src/editor_document.py
M  backend/src/feedback/delivery.py
M  backend/src/font_registry.py
M  backend/src/main.py
M  backend/src/media/captions.py
A  backend/src/migrations/sql/20261124_0001_prisma_schema_parity.sql
A  backend/src/migrations/sql/20261124_0002_clear_hosted_service_seeds.sql
M  backend/src/services/affiliate_email_service.py
M  backend/src/services/ai_edit_service.py
M  backend/src/services/api_key_email_service.py
M  backend/src/services/billing_service.py
M  backend/src/services/email_layout.py
M  backend/src/services/password_reset_email_service.py
M  backend/src/services/subscription_email_service.py
M  backend/src/services/task_completion_email_service.py
M  backend/src/services/verification_email_service.py
M  backend/src/services/video_service.py
M  backend/src/social/tiktok.py
M  backend/src/video_utils.py
M  backend/src/workers/tasks.py
M  backend/tests/integration/test_cancellation_reviews.py
M  backend/tests/integration/test_feedback_inbox.py
M  backend/tests/unit/test_api_key_email_service.py
M  backend/tests/unit/test_billing_service.py
M  backend/tests/unit/test_caption_glyph_fallback.py
M  backend/tests/unit/test_caption_width.py
M  backend/tests/unit/test_config_ollama.py
M  backend/tests/unit/test_editor_service.py
M  backend/tests/unit/test_password_reset_email.py
M  backend/tests/unit/test_subscription_email.py
M  backend/tests/unit/test_task_service_workflows.py
M  backend/tests/unit/test_video_service.py
M  backend/tests/unit/test_video_service_workflows.py
M  backend/tests/unit/test_video_utils_effects.py
M  backend/tests/unit/test_workflow_settings.py
M  docker-compose.yml
M  docs/configuration.md
M  frontend/e2e/announcements.spec.ts
M  frontend/e2e/theme-toggle.spec.ts
M  frontend/messages/de/admin.json
D  frontend/messages/de/affiliate.json
M  frontend/messages/de/analytics.json
M  frontend/messages/de/auth.json
M  frontend/messages/de/billing.json
D  frontend/messages/de/blog.json
D  frontend/messages/de/changelog.json
M  frontend/messages/de/editor.json
M  frontend/messages/de/home.json
D  frontend/messages/de/legal.json
D  frontend/messages/de/marketing.json
M  frontend/messages/de/metadata.json
D  frontend/messages/de/seo.json
M  frontend/messages/de/settings.json
M  frontend/messages/de/share.json
M  frontend/messages/de/shell.json
M  frontend/messages/de/social.json
M  frontend/messages/de/status.json
M  frontend/messages/de/tours.json
M  frontend/messages/en/admin.json
D  frontend/messages/en/affiliate.json
M  frontend/messages/en/analytics.json
M  frontend/messages/en/auth.json
M  frontend/messages/en/billing.json
D  frontend/messages/en/blog.json
D  frontend/messages/en/changelog.json
M  frontend/messages/en/editor.json
M  frontend/messages/en/home.json
D  frontend/messages/en/legal.json
D  frontend/messages/en/marketing.json
M  frontend/messages/en/metadata.json
D  frontend/messages/en/seo.json
M  frontend/messages/en/settings.json
M  frontend/messages/en/share.json
M  frontend/messages/en/shell.json
M  frontend/messages/en/social.json
M  frontend/messages/en/status.json
M  frontend/messages/en/tours.json
M  frontend/messages/es/admin.json
D  frontend/messages/es/affiliate.json
M  frontend/messages/es/analytics.json
M  frontend/messages/es/auth.json
M  frontend/messages/es/billing.json
D  frontend/messages/es/blog.json
D  frontend/messages/es/changelog.json
M  frontend/messages/es/editor.json
M  frontend/messages/es/home.json
D  frontend/messages/es/legal.json
D  frontend/messages/es/marketing.json
M  frontend/messages/es/metadata.json
D  frontend/messages/es/seo.json
M  frontend/messages/es/settings.json
M  frontend/messages/es/share.json
M  frontend/messages/es/shell.json
M  frontend/messages/es/social.json
M  frontend/messages/es/status.json
M  frontend/messages/es/tours.json
M  frontend/messages/id/admin.json
D  frontend/messages/id/affiliate.json
M  frontend/messages/id/analytics.json
M  frontend/messages/id/auth.json
M  frontend/messages/id/billing.json
D  frontend/messages/id/blog.json
D  frontend/messages/id/changelog.json
M  frontend/messages/id/editor.json
M  frontend/messages/id/home.json
D  frontend/messages/id/legal.json
D  frontend/messages/id/marketing.json
M  frontend/messages/id/metadata.json
D  frontend/messages/id/seo.json
M  frontend/messages/id/settings.json
M  frontend/messages/id/share.json
M  frontend/messages/id/shell.json
M  frontend/messages/id/social.json
M  frontend/messages/id/status.json
M  frontend/messages/id/tours.json
M  frontend/messages/pt/admin.json
D  frontend/messages/pt/affiliate.json
M  frontend/messages/pt/analytics.json
M  frontend/messages/pt/auth.json
M  frontend/messages/pt/billing.json
D  frontend/messages/pt/blog.json
D  frontend/messages/pt/changelog.json
M  frontend/messages/pt/editor.json
M  frontend/messages/pt/home.json
D  frontend/messages/pt/legal.json
D  frontend/messages/pt/marketing.json
M  frontend/messages/pt/metadata.json
D  frontend/messages/pt/seo.json
M  frontend/messages/pt/settings.json
M  frontend/messages/pt/share.json
M  frontend/messages/pt/shell.json
M  frontend/messages/pt/social.json
M  frontend/messages/pt/status.json
M  frontend/messages/pt/tours.json
M  frontend/messages/zh/admin.json
D  frontend/messages/zh/affiliate.json
M  frontend/messages/zh/analytics.json
M  frontend/messages/zh/auth.json
M  frontend/messages/zh/billing.json
D  frontend/messages/zh/blog.json
D  frontend/messages/zh/changelog.json
M  frontend/messages/zh/editor.json
M  frontend/messages/zh/home.json
D  frontend/messages/zh/legal.json
D  frontend/messages/zh/marketing.json
M  frontend/messages/zh/metadata.json
D  frontend/messages/zh/seo.json
M  frontend/messages/zh/settings.json
M  frontend/messages/zh/share.json
M  frontend/messages/zh/shell.json
M  frontend/messages/zh/social.json
M  frontend/messages/zh/status.json
M  frontend/messages/zh/tours.json
D  frontend/middleware.ts
D  frontend/public/app-store-badge.svg
D  frontend/public/blog/how-to-clip-gta-6.webp
D  frontend/public/blog/supoclip-editor.webp
D  frontend/public/blog/supoclip-open-source-clipping.webp
D  frontend/public/clips/articles/price-1.jpg
D  frontend/public/clips/articles/price-1.mp4
D  frontend/public/clips/articles/price-1.txt
D  frontend/public/clips/articles/price-2.jpg
D  frontend/public/clips/articles/price-2.mp4
D  frontend/public/clips/articles/price-2.txt
D  frontend/public/clips/articles/price-3.jpg
D  frontend/public/clips/articles/price-3.mp4
D  frontend/public/clips/articles/price-3.txt
D  frontend/public/clips/articles/price-source.jpg
D  frontend/public/clips/articles/sources.json
D  frontend/public/clips/articles/ton-1.jpg
D  frontend/public/clips/articles/ton-1.mp4
D  frontend/public/clips/articles/ton-1.txt
D  frontend/public/clips/articles/ton-2.jpg
D  frontend/public/clips/articles/ton-2.mp4
D  frontend/public/clips/articles/ton-2.txt
D  frontend/public/clips/articles/ton-source.jpg
D  frontend/public/clips/podcast-1.jpg
D  frontend/public/clips/podcast-1.mp4
D  frontend/public/clips/podcast-2.jpg
D  frontend/public/clips/podcast-2.mp4
D  frontend/public/clips/source.jpg
D  frontend/public/discord-mark.svg
M  frontend/public/email-assets/logo.png
D  frontend/public/llms.txt
M  frontend/public/logo.png
D  frontend/public/videos/creator-program-poster.jpg
D  frontend/public/videos/creator-program.mp4
D  frontend/src/app/[slug]/page.tsx
M  frontend/src/app/admin/page.tsx
D  frontend/src/app/affiliate/page.tsx
D  frontend/src/app/blog/[slug]/page.tsx
D  frontend/src/app/blog/page.tsx
D  frontend/src/app/changelog/page.tsx
D  frontend/src/app/demo/page.tsx
D  frontend/src/app/faq/page.tsx
M  frontend/src/app/global-error.tsx
M  frontend/src/app/icon.png
M  frontend/src/app/icon.svg
M  frontend/src/app/layout.tsx
M  frontend/src/app/not-found.tsx
M  frontend/src/app/oauth/consent/page.test.tsx
M  frontend/src/app/oauth/consent/page.tsx
D  frontend/src/app/opengraph-image.tsx
M  frontend/src/app/page.tsx
D  frontend/src/app/privacy/page.tsx
M  frontend/src/app/robots.ts
M  frontend/src/app/settings/api-keys/page.test.tsx
M  frontend/src/app/settings/api-keys/page.tsx
D  frontend/src/app/settings/creator-program/page.tsx
M  frontend/src/app/settings/page.tsx
D  frontend/src/app/sitemap.ts
M  frontend/src/app/status/page.tsx
D  frontend/src/app/terms/page.tsx
D  frontend/src/app/twitter-image.tsx
M  frontend/src/components/app/app-shell.tsx
D  frontend/src/components/articles/article-clip-examples.tsx
D  frontend/src/components/articles/article-shell.tsx
D  frontend/src/components/articles/creator-guide-article.tsx
D  frontend/src/components/articles/gta6/diagrams.tsx
D  frontend/src/components/articles/gta6/earnings-calculator.test.ts
D  frontend/src/components/articles/gta6/earnings-calculator.tsx
D  frontend/src/components/articles/gta6/gta6-clipping-article.tsx
D  frontend/src/components/articles/gta6/moment-map.tsx
D  frontend/src/components/articles/opusclip-comparison-article.tsx
D  frontend/src/components/articles/self-hosting-guide-article.tsx
D  frontend/src/components/articles/tiktok-publishing-article.tsx
M  frontend/src/components/assistant-connect.test.tsx
M  frontend/src/components/auth/auth-frame.tsx
M  frontend/src/components/billing/upgrade-prompt.tsx
M  frontend/src/components/editor/inspector.tsx
M  frontend/src/components/feature-tour.test.tsx
M  frontend/src/components/home-router.tsx
D  frontend/src/components/landing-page.tsx
D  frontend/src/components/landing/editor-section.tsx
D  frontend/src/components/landing/faq-section.tsx
D  frontend/src/components/landing/feature-bento.tsx
D  frontend/src/components/landing/hero-stage.tsx
D  frontend/src/components/landing/product-film.tsx
D  frontend/src/components/landing/publish-section.tsx
D  frontend/src/components/landing/reveal.tsx
A  frontend/src/components/legal-notice.tsx
D  frontend/src/components/marketing/acquisition-cta.tsx
D  frontend/src/components/marketing/clip-examples.tsx
D  frontend/src/components/marketing/creator-offer-banner.tsx
D  frontend/src/components/marketing/related-guides.tsx
D  frontend/src/components/marketing/site-footer.tsx
D  frontend/src/components/marketing/supported-languages.test.tsx
D  frontend/src/components/marketing/supported-languages.tsx
M  frontend/src/components/mcp-setup.tsx
D  frontend/src/components/supo-live-article.tsx
M  frontend/src/hooks/use-prefers-reduced-motion.test.tsx
M  frontend/src/i18n/config.ts
D  frontend/src/lib/app-flags.ts
D  frontend/src/lib/article-clip-assets.json
D  frontend/src/lib/article-clips.ts
D  frontend/src/lib/blog-posts.ts
D  frontend/src/lib/creator-guides.ts
D  frontend/src/lib/demo.ts
M  frontend/src/lib/editor/document.ts
D  frontend/src/lib/landing-faq.ts
D  frontend/src/lib/marketing-links.test.ts
D  frontend/src/lib/marketing-links.ts
D  frontend/src/lib/seo-pages.ts
M  frontend/src/lib/site.ts
D  frontend/src/middleware.test.ts
M  frontend/src/server/announcements.ts
M  init.sql
M  mcp/.env.example
M  mcp/src/supoclip_mcp/config.py
M  mcp/src/supoclip_mcp/server.py
A  scripts/check-schema-parity.sh
```
