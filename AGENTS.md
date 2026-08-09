# Agent Operating Notes

Start with [docs/knowledge/00-agent-index.md](docs/knowledge/00-agent-index.md). It is the compact entrypoint for this repo.

## Token Budget Rules

- Read `docs/knowledge/generated/project-snapshot.md` before opening source files.
- Open only the node note that matches the task, then the source files listed in that note.
- Avoid loading generated assets during normal work: `public/sequences`, `public/assets/media`, `preview-static`, `dist`, `.astro`, and Playwright output.
- Treat `legacy/source*.html` as reference-only unless the task explicitly targets the migration source.

## Update Rules

- After changing structure, docs, content entries, routes, scripts, or major feature files, run `npm run knowledge:graph`.
- Keep manual notes in `docs/knowledge` short and link-heavy. Put volatile generated facts in `docs/knowledge/generated`.
- Existing docs remain source of truth for detail; the knowledge graph is a routing layer, not a replacement for tests.

## Quality Gate

Use the smallest relevant check while iterating. Before production-level handoff, use `npm run verify` or `npm run verify:full` when Playwright browsers are available.
