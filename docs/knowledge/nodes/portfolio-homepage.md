---
tags:
  - architecture
  - portfolio
type: node
---

# Portfolio Homepage

## Purpose

Composes the one-page portfolio experience: chrome, hero, content sections, motion entrypoint, and project overlay.

## Source Files

- `src/pages/index.astro`
- `src/features/portfolio/components/sections`
- `src/features/portfolio/components/ProjectViewOverlay.astro`
- `src/features/portfolio/client/index.ts`

## Notes

- `src/pages/index.astro` is the section-order source of truth.
- `ENABLE_SEQUENCE_HERO` gates `ScrollSequenceHero`; default is currently false.
- Section wrappers render raw HTML fragments through `RawFragment` and `renderLegacyMarkup`.
- Client interactions load from one browser entrypoint at the bottom of the page.

## Related

[[nodes/portfolio-chrome|Portfolio Chrome]], [[nodes/legacy-fragments|Legacy Fragments]], [[nodes/motion-system|Motion System]], [[nodes/scroll-sequence-hero|Scroll Sequence Hero]]
