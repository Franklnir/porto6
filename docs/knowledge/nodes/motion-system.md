---
tags:
  - motion
  - portfolio
type: node
---

# Motion System

## Purpose

Owns browser-side interactions and animations for the portfolio page without adding a frontend runtime.

## Source Files

- `src/features/portfolio/client/index.ts`
- `src/features/portfolio/client/legacy/01-core-ui.ts`
- `src/features/portfolio/client/legacy/02-motion-system.ts`
- `src/features/portfolio/client/legacy/03-dark-section-cover.ts`
- `src/features/portfolio/client/legacy/04-capability-lookbook.ts`
- `src/features/portfolio/client/legacy/05-shared-profile.ts`
- `src/features/portfolio/client/legacy/06-project-details.ts`
- `src/features/portfolio/client/legacy/07-process-lookbook.ts`
- `docs/MOTION_SYSTEM.md`

## Notes

- Each motion domain is imported as a side-effect module from `client/index.ts`.
- Keep reduced-motion behavior intact.
- Dark page-cover motion belongs to the real dark section; do not recreate a fixed curtain overlay.
- Avoid multiple modules writing incompatible `transform` values to the same element unless CSS custom properties mediate composition.
- Use section-specific debugging by disabling one import at a time.

## Related

[[nodes/portfolio-homepage|Portfolio Homepage]], [[nodes/scroll-sequence-hero|Scroll Sequence Hero]], [[nodes/styling-system|Styling System]]
