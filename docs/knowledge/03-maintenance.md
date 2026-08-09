---
tags:
  - agent
  - maintenance
type: process
---

# Knowledge Maintenance

## Regenerate

Run this after changing routes, scripts, docs, content entries, or core source structure:

```bash
npm run knowledge:graph
```

The command refreshes:

- `docs/knowledge/generated/project-snapshot.md`
- `docs/knowledge/generated/knowledge-graph.json`
- `docs/knowledge/project-knowledge-graph.canvas`

## Manual Notes

Manual notes should stay compact. Prefer:

- purpose
- source files
- entry points
- risks
- related notes

Do not duplicate full source code or long docs in notes.

## When To Add A Node

Add a note under `docs/knowledge/nodes` when a subsystem has its own files, risks, and maintenance rules. Link it from [[00-agent-index|Agent Index]], [[01-project-map|Project Map]], and [[02-knowledge-graph|Knowledge Graph]].
