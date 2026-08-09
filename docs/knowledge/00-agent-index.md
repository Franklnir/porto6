---
tags:
  - agent
  - obsidian
  - index
type: entrypoint
---

# Agent Index

This folder makes the project usable as an Obsidian vault and a low-token knowledge graph for coding agents.

## Start Here

1. Read [[generated/project-snapshot|Generated Project Snapshot]] for current scripts, counts, docs, and content entries.
2. Use [[01-project-map|Project Map]] to choose the subsystem.
3. Open exactly one focused node note from the list below.
4. Open source files only after the node note says they are relevant.

## Task Routing

| Task | First note | Source files usually needed |
| --- | --- | --- |
| Homepage layout or section order | [[nodes/portfolio-homepage|Portfolio Homepage]] | `src/pages/index.astro`, section components |
| Header, cursor, loader, menu chrome | [[nodes/portfolio-chrome|Portfolio Chrome]] | `src/features/portfolio/components/PortfolioChrome.astro`, chrome fragments |
| Legacy section markup | [[nodes/legacy-fragments|Legacy Fragments]] | `src/features/portfolio/fragments/sections` |
| Animation or interaction bugs | [[nodes/motion-system|Motion System]] | `src/features/portfolio/client` |
| Scroll image sequence | [[nodes/scroll-sequence-hero|Scroll Sequence Hero]] | `src/components/hero`, `src/features/portfolio/client/scroll-sequence.ts` |
| Project case-study content | [[nodes/project-content|Project Content]] | `src/content.config.ts`, `src/content/projects` |
| Project detail pages | [[nodes/project-pages|Project Pages]] | `src/pages/projects/[id].astro`, project components |
| SEO, shell, metadata | [[nodes/astro-shell|Astro Shell]] and [[nodes/seo-routing|SEO Routing]] | layout, SEO component, robots/sitemap |
| CSS or visual polish | [[nodes/styling-system|Styling System]] | `src/styles` |
| Release, tests, deploy | [[nodes/quality-deployment|Quality And Deployment]] | `docs/QUALITY_GATES.md`, package scripts, deploy configs |

## High-Signal Files

- `README.md`: setup and project overview.
- `docs/ARCHITECTURE.md`: architectural intent and migration boundaries.
- `docs/MOTION_SYSTEM.md`: motion domain boundaries.
- `docs/QUALITY_GATES.md`: verification expectations.
- `RELEASE_STATUS.md`: production readiness status.
- `AGENTS.md`: agent-specific operating rules.

## Obsidian

Open the project folder itself as the Obsidian vault. The `.obsidian` folder is already configured to hide generated build output and heavy media from normal vault navigation.

For a visual graph, open [[project-knowledge-graph.canvas|Project Knowledge Graph Canvas]] or view [[02-knowledge-graph|Knowledge Graph]].
