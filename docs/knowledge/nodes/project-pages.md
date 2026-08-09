---
tags:
  - content
  - astro
type: node
---

# Project Pages

## Purpose

Renders project detail routes and project-specific presentation components from Content Collections.

## Source Files

- `src/pages/projects/[id].astro`
- `src/features/projects/components/ProjectHero.astro`
- `src/features/projects/data/projectCovers.ts`
- `src/assets/images/projects`

## Notes

- Route IDs come from Markdown filenames under `src/content/projects`.
- Project content belongs in collection entries; visual presentation belongs in `src/features/projects`.
- Keep SEO metadata and Open Graph image behavior aligned with [[nodes/seo-routing|SEO Routing]].

## Related

[[nodes/project-content|Project Content]], [[nodes/astro-shell|Astro Shell]], [[nodes/styling-system|Styling System]]
