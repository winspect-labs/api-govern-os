# Winspect — API Governance Product Knowledge

Product knowledge base for the Winspect API governance platform. Consolidates vision, features, backlog, architecture decisions, and research into a single repository—with YAML data files for machine consumption, MDX content for human reading, and a generated site for browsing.

The core idea: product knowledge and code should stay in sync. Agents read this repo for context before implementing, and update it when code ships. Humans review and make decisions.

## Feedback

Found a bug, have a feature idea, or want to improve the docs? [Open an issue](https://github.com/nakulshukla08/api-govern-os/issues/new/choose). We have templates for bug reports, feature requests, and documentation feedback.

## Documentation

Read on the [generated site](/about-product-os) or on GitHub:

- [Why Product OS](content/about-product-os/value-proposition.mdx) — The drift problem, design principles
- [Developer Workflow](content/about-product-os/developer-workflow.mdx) — Setup, daily workflow for engineers
- [Product Manager Workflow](content/about-product-os/product-manager-workflow.mdx) — Defining work, specifications, delegating to agents
- [Agent Workflow](content/about-product-os/agent-workflow.mdx) — Reference for AI agents
- [Agent Rules for Repos](content/about-product-os/rules-for-product-repos.mdx) — Rule content for Cursor, Claude Code, Windsurf, Copilot

## Winspect Domains

- **api-catalog** — API registration, subscriptions, ABAC, mock server (shipped)
- **discovery** — K8s runtime discovery, spec records, bulk import, manual mapping (in progress)
- **ai-search** — RAG semantic search (in progress)
- **subscription-authz** — External AuthZ API, OPA, gateway plugins (planned)

Data lives in `data/features/*.yaml` per domain. See `data/schema.yaml` for the domain structure.

## Quick Start

```bash
git clone https://github.com/nakulshukla08/api-govern-os.git
cd api-govern-os
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
api-govern-os/
├── content/          # MDX pages (product, features, backlog, research, etc.)
├── data/             # Machine-readable YAML (schema, features per domain, backlog, goals)
├── schemas/          # JSON Schema for validation
├── templates/        # Templates for new content
├── components/       # Custom MDX components (StatusBadge, FeatureTable, etc.)
└── app/              # Nextra 4 + Next.js App Router
```

## Customization

Branding and theme in **`config/site.config.ts`**:

| Option | Description |
|--------|-------------|
| `productName` | Product name (nav, footer, page title) |
| `repository` | GitHub repo URL for Edit on GitHub, feedback links |
| `logo` | Image path or custom React component |
| `theme.colors` | `primaryHue`, `primarySaturation` |

## Deployment

Deploy to Vercel. Connect the repo, add env vars if using auth. The build includes Pagefind postbuild for search.

## License

MIT