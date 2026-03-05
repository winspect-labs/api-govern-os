# Product OS — Agent Workflow

Product OS is **built for agents, by agents**. Most of the work—specification, implementation, status updates—is done by agents. Humans stay aware and review. This document describes how agents should use Product OS effectively.

## Agent-First Philosophy

- **Agents read** — Get full product context from Product OS before implementing.
- **Agents write** — Update Product OS when code ships. Create PRs. No manual drift.
- **Humans review** — Approve agent PRs. Stay aware via the live site. Use Jira/Linear to augment.
- **Kill the drift** — Close the gap between product goals and actual development. Product OS is the canonical layer; project tools augment it.

## Core Principles

1. **Product OS is the source of truth** — Vision, features, backlog, architecture, decisions, and research live here. Do not rely on scattered docs, Jira, or memory.
2. **Always load context first** — Before implementing features, answering "what to build next?", or scoping work, read the relevant Product OS data.
3. **Update when you ship** — When code changes implement a feature or backlog item, Product OS should be updated. Prefer creating a PR to update it.
4. **Never contradict Product OS** — If a user asks for something that conflicts with Product OS (e.g. building a deprecated feature), surface the conflict and suggest aligning with Product OS.

## Context Preparation (No Manual Linking)

Agents should **automatically** have Product OS in context. This is achieved via:

### 1. Cursor Rules (Recommended)

Add a rule to each product repo (api-management-ui, platform-backend-service, etc.) so agents always know to reference Product OS:

- **Product OS repo**: `.cursor/rules/product-os.mdc` — defines how to maintain Product OS
- **Other product repos**: `.cursor/rules/product-os-source-of-truth.mdc` — tells agents to load Product OS before product work

See [RULES_FOR_PRODUCT_REPOS.md](./RULES_FOR_PRODUCT_REPOS.md) for the exact rule content to copy into each repo.

### 2. Workspace Setup

Open Product OS alongside your code repo in a multi-root workspace:

```
File → Add Folder to Workspace → select product-os
```

Agents can then read Product OS files directly. Combined with the rule, they will know to consult it.

### 3. MCP / API (Future)

A Product OS MCP server or API could expose `data/features.yaml`, `data/backlog.yaml`, etc. to any agent. This would eliminate the need for Product OS to be in the workspace. Not yet implemented.

## Agent Workflow: Before Implementing

When an engineer asks "implement feature X" or "what should I work on?":

1. **Load Product OS data**
   - `data/features.yaml` — Is this feature defined? What's its status, priority, repos?
   - `data/backlog.yaml` — Is there a backlog item? ICE score, goal_ids?
   - `content/features/<feature>.mdx` — Full spec and context
   - `content/decisions/` — Relevant decisions (e.g. tech choices)

2. **Verify alignment**
   - Does the request match Product OS? If not, flag it.
   - Is the feature `shipped` or `deprecated`? Don't rebuild.

3. **Scope from Product OS**
   - Use `repos`, `goal_ids`, and content to scope the implementation.
   - Reference architecture (`data/repositories.yaml`) for where code lives.

## Agent Workflow: After Implementing

When code is merged that implements a feature or backlog item:

1. **Detect completion**
   - PR title/body mentions feature id (e.g. `api-catalog`) or backlog id (e.g. `bl-001`)
   - Or: engineer explicitly asks to update Product OS

2. **Propose Product OS updates**
   - Update `data/features.yaml`: set `status: shipped`, `completion: 100`
   - Update `data/backlog.yaml`: set `status: shipped` for the item
   - Update the feature MDX page if needed
   - Run `npm run validate`

3. **Create a PR**
   - Open a PR against the Product OS repo with the updates
   - Or: if Product OS is in the same monorepo, include the changes in the same PR

## Automation (GitHub Actions)

To reduce manual updates, consider:

### Option A: PR Label → Update Product OS

When a PR is merged with label `product-os:feature-api-catalog`, a workflow:

1. Clones Product OS
2. Updates `data/features.yaml` for `api-catalog` → `status: shipped`, `completion: 100`
3. Opens a PR to Product OS

### Option B: Conventional Commits

PR titles follow: `feat(api-catalog): implement OpenAPI ingestion`

A workflow parses the scope, maps to a feature id, and opens a Product OS update PR.

### Option C: Manual Checklist

Add to PR template:

```markdown
## Product OS

- [ ] This PR implements a feature/backlog item in Product OS
- [ ] I have opened (or will open) a PR to update `data/features.yaml` / `data/backlog.yaml`
```

See [DEVELOPER_WORKFLOW.md](./DEVELOPER_WORKFLOW.md) for setup instructions.

## Data Files Reference

| File | When to Read | When to Update |
|------|--------------|----------------|
| `data/features.yaml` | Before implementing a feature; when asked "what's the status of X?" | When a feature is shipped or status changes |
| `data/backlog.yaml` | Before picking up work; when asked "what to build next?" | When an item is shipped or reprioritized |
| `data/goals.yaml` | When mapping work to strategy | When goals are accomplished or added |
| `data/repositories.yaml` | When determining where code lives | When repos are added or changed |
| `content/decisions/` | Before making architectural choices | When a new decision is recorded |
| `content/research/` | When evaluating options or competitors | When new research is added |
