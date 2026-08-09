---
tags:
  - content
  - astro
type: node
---

# Project Content

## Purpose

Defines structured project case-study content through Astro Content Collections.

## Source Files

- `src/content.config.ts`
- `src/content/projects`
- `src/features/projects/data/projectCovers.ts`
- `docs/CONTENT_GUIDE.md`

## Schema

Required frontmatter:

- `title`
- `summary`
- `year`
- `order`
- `status`: `concept`, `development`, or `complete`
- `domain`
- `technologies`
- `featured`

## Notes

- Add or edit project entries in Markdown, not in page layout.
- Keep cover image mapping aligned with project IDs.
- Build validation catches invalid schema values.

## Related

[[nodes/project-pages|Project Pages]], [[nodes/seo-routing|SEO Routing]], [[nodes/quality-deployment|Quality And Deployment]]
