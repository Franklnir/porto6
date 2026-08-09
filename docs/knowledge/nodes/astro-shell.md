---
tags:
  - architecture
  - astro
type: node
---

# Astro Shell

## Purpose

Owns the HTML document shell, SEO head composition, site config, global CSS import, and Astro project configuration.

## Source Files

- `astro.config.ts`
- `src/layouts/BaseLayout.astro`
- `src/components/seo/SeoHead.astro`
- `src/config/site.ts`
- `src/styles/global.css`
- `tsconfig.json`

## Notes

- `BaseLayout.astro` imports `global.css` once and wraps every page slot.
- `siteConfig` reads public environment variables with local fallbacks.
- Keep SEO defaults aligned with [[nodes/seo-routing|SEO Routing]].

## Related

[[01-project-map|Project Map]], [[nodes/styling-system|Styling System]], [[nodes/quality-deployment|Quality And Deployment]]
