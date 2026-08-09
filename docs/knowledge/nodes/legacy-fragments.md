---
tags:
  - architecture
  - migration
type: node
---

# Legacy Fragments

## Purpose

Preserves the migrated portfolio markup while Astro-native components are introduced gradually.

## Source Files

- `src/features/portfolio/fragments/sections`
- `src/features/portfolio/fragments/chrome`
- `src/components/primitives/RawFragment.astro`
- `src/features/portfolio/lib/renderLegacyMarkup.ts`
- `legacy/source.html`
- `legacy/source.externalized.html`

## Notes

- `legacy/source*.html` is historical reference, not the normal edit target.
- Section fragments must not contain inline scripts.
- Data URI media should stay externalized in `public/assets/media`.
- `scripts/verify-project.mjs` checks fragment count and disallows embedded data URIs and inline scripts.

## Related

[[nodes/portfolio-homepage|Portfolio Homepage]], [[nodes/styling-system|Styling System]], [[nodes/quality-deployment|Quality And Deployment]]
