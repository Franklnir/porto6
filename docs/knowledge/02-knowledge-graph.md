---
tags:
  - architecture
  - obsidian
type: graph
---

# Knowledge Graph

Use this map when Obsidian graph view is too dense.

```mermaid
flowchart LR
  AgentIndex["Agent Index"] --> ProjectMap["Project Map"]
  AgentIndex --> Snapshot["Generated Snapshot"]
  ProjectMap --> AstroShell["Astro Shell"]
  ProjectMap --> PortfolioHomepage["Portfolio Homepage"]
  ProjectMap --> ProjectContent["Project Content"]
  ProjectMap --> QualityDeployment["Quality And Deployment"]
  PortfolioHomepage --> PortfolioChrome["Portfolio Chrome"]
  PortfolioHomepage --> LegacyFragments["Legacy Fragments"]
  PortfolioHomepage --> MotionSystem["Motion System"]
  PortfolioHomepage --> ScrollSequence["Scroll Sequence Hero"]
  PortfolioHomepage --> ProjectPages["Project Pages"]
  AstroShell --> SeoRouting["SEO Routing"]
  AstroShell --> StylingSystem["Styling System"]
  LegacyFragments --> StylingSystem
  MotionSystem --> StylingSystem
  ScrollSequence --> StylingSystem
  ProjectContent --> ProjectPages
  QualityDeployment --> AstroShell
  QualityDeployment --> MotionSystem
```

## Linked Notes

[[00-agent-index|Agent Index]] links to every major node. Each node links back to this graph through related notes or via [[01-project-map|Project Map]].

## Machine-Readable Graph

The script writes `docs/knowledge/generated/knowledge-graph.json` for agents that prefer structured context.
