---
tags:
  - architecture
  - portfolio
type: node
---

# Portfolio Chrome

## Purpose

Renders page-level UI that sits around the main sections: skip link, scroll progress, loader, cursor, header, and mobile menu.

## Source Files

- `src/features/portfolio/components/PortfolioChrome.astro`
- `src/features/portfolio/fragments/chrome`
- `src/features/portfolio/lib/renderLegacyMarkup.ts`

## Notes

- Chrome is raw HTML imported with `?raw`, then rendered with `RawFragment`.
- Token replacement uses `siteConfig` values through `renderLegacyMarkup`.
- Interaction behavior lives in [[nodes/motion-system|Motion System]].

## Related

[[nodes/portfolio-homepage|Portfolio Homepage]], [[nodes/legacy-fragments|Legacy Fragments]], [[nodes/styling-system|Styling System]]
