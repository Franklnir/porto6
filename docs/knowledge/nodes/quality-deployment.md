---
tags:
  - quality
  - deployment
type: node
---

# Quality And Deployment

## Purpose

Defines verification commands, release expectations, and production deployment paths.

## Source Files

- `package.json`
- `scripts/doctor.mjs`
- `scripts/verify-project.mjs`
- `docs/QUALITY_GATES.md`
- `docs/PRODUCTION_CHECKLIST.md`
- `docs/DEPLOYMENT.md`
- `RELEASE_STATUS.md`
- `vercel.json`
- `wrangler.jsonc`
- `playwright.config.ts`
- `vitest.config.ts`

## Notes

- `npm run verify` is the main local production gate.
- `npm run verify:full` adds Playwright E2E after browser install.
- Static build output is `dist`.
- Do not certify production if homepage is blank, horizontal overflow appears, overlay fails, or reduced motion still triggers heavy sticky animation.

## Related

[[nodes/astro-shell|Astro Shell]], [[nodes/motion-system|Motion System]], [[nodes/project-content|Project Content]]
