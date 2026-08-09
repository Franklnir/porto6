---
tags:
  - motion
  - asset-pipeline
type: node
---

# Scroll Sequence Hero

## Purpose

Optional full-screen canvas hero that maps scroll progress to a WebP image sequence.

## Source Files

- `src/components/hero/ScrollSequenceHero.astro`
- `src/features/portfolio/client/scroll-sequence.ts`
- `src/styles/scroll-sequence.css`
- `public/sequences/hero/sequence-manifest.json`
- `scripts/optimize-sequence.mjs`

## Notes

- The homepage flag `ENABLE_SEQUENCE_HERO` controls whether this feature renders.
- The manifest describes `frameCount`, frame URL pattern, dimensions, format, and quality.
- The controller uses lazy frame loading, nearest-frame fallback, DPR-aware canvas rendering, and cleanup on Astro page lifecycle events.
- Do not read all frame files for context; read the manifest and script instead.

## Related

[[nodes/portfolio-homepage|Portfolio Homepage]], [[nodes/motion-system|Motion System]], [[nodes/styling-system|Styling System]]
