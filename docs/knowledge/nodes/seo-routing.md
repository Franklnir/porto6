---
tags:
  - seo
  - astro
type: node
---

# SEO Routing

## Purpose

Owns metadata, canonical URLs, sitemap, robots, favicon, and Open Graph output.

## Source Files

- `src/components/seo/SeoHead.astro`
- `src/config/site.ts`
- `src/pages/sitemap.xml.ts`
- `src/pages/robots.txt.ts`
- `src/pages/404.astro`
- `public/favicon.svg`
- `public/og-cover.svg`

## Notes

- Public URLs and contact/profile links come from environment variables with fallbacks in `siteConfig`.
- Keep page titles and descriptions concise and aligned with Indonesian portfolio positioning.
- Static output means deployment providers should point to `dist`.

## Related

[[nodes/astro-shell|Astro Shell]], [[nodes/project-content|Project Content]], [[nodes/quality-deployment|Quality And Deployment]]
