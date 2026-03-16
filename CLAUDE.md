# Winspect API Govern OS — Agent Interaction Guide

This repo is the **source of truth** for Winspect product knowledge. Agents get context from here and **update it when code ships**. Humans review; agents do the heavy lifting.

- **Agents read** — Load this repo before implementing or scoping work in api-management-ui, platform-backend-service, or winspect-api-discovery-agent.
- **Agents write** — Update this repo when code ships. Create PRs.
- **Augment, don't replace** — Jira, Linear augment this. We don't eliminate them.

**Full workflow**: See [content/about-product-os/agent-workflow.mdx](content/about-product-os/agent-workflow.mdx).

## Data Sources (Machine-Readable)

| File | Purpose |
|------|---------|
| `data/schema.yaml` | Domain→file mapping. Domains: api-catalog, discovery, ai-search, subscription-authz |
| `data/features/*.yaml` | Feature registry per domain. Status, priority, completion, goal_ids, repos |
| `data/backlog.yaml` | Prioritized backlog with ICE scores, feature_id, goal_ids |
| `data/goals.yaml` | Strategic goals: core-platform, automated-discovery, subscription-authz, ai-discoverability, enterprise-readiness |
| `data/repositories.yaml` | api-management-ui, platform-backend-service, winspect-api-discovery-agent, api-govern-os |
| `data/roadmap.yaml` | Q1–Q4 2026 themes |
| `data/research-sources.yaml` | Cited sources for research |

## Winspect Repos

- **api-management-ui** — Next.js 14, Material UI, Clerk. Catalog, subscriptions, discovery, RAG search.
- **platform-backend-service** — Spring Boot monorepo (backend-core + platform-ai). API management, ABAC, discovery, RAG proxy.
- **winspect-api-discovery-agent** — K8s discovery agent. Helm-deployed in customer clusters.
- **api-govern-os** — This repo. Product knowledge.

## Content Structure

- **Product** — Vision, pitch, value prop, target audience, competitive landscape
- **Features** — api-catalog, k8s-discovery, rag-search, subscription-authz
- **Architecture** — Repo map, tech stack
- **Decisions** — PDR-001 (spec record primary) through PDR-005 (ABAC v2)
- **Research** — API governance market, RAG/pgvector, competitor landscape

## Making Recommendations

1. Read `data/backlog.yaml` — items pre-prioritized by ICE
2. Read `data/features/*.yaml` — identify gaps (low completion, blocked)
3. Read `content/decisions/` — past decisions and rationale
4. Output: Prioritized list with reasoning, referencing specific data

## Validation

Run `npm run validate` before committing changes to data/.