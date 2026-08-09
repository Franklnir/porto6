---
tags:
  - styling
  - architecture
type: node
---

# Styling System

## Purpose

Controls tokens, global styles, scroll sequence styles, view transitions, and legacy cascade compatibility.

## Source Files

- `src/styles/global.css`
- `src/styles/tokens.css`
- `src/styles/view-transitions.css`
- `src/styles/scroll-sequence.css`
- `src/styles/legacy`

## Notes

- Global CSS is imported by `BaseLayout.astro`.
- Legacy CSS is split by domain and cascade order.
- When editing motion-heavy sections, inspect related client modules before changing CSS transforms.
- Check mobile overflow after visual changes.

## Related

[[nodes/astro-shell|Astro Shell]], [[nodes/legacy-fragments|Legacy Fragments]], [[nodes/motion-system|Motion System]], [[nodes/quality-deployment|Quality And Deployment]]
