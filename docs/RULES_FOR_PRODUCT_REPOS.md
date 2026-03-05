# Cursor Rules for Product Repos

Copy the rule below into **each product repository** (e.g. `api-management-ui`, `platform-backend-service`) so AI agents always treat Product OS as the source of truth.

## Setup

1. Create `.cursor/rules/` in the repo if it doesn't exist
2. Create `.cursor/rules/product-os-source-of-truth.mdc` with the content below
3. Adjust `PRODUCT_OS_PATH` to match your setup (see options below)

## Rule Content

```markdown
---
description: Product OS is the source of truth for product knowledge — always consult it
alwaysApply: true
---

# Product OS — Source of Truth

Product OS is **built for agents, by agents**. It is the ultimate source of truth. Agents get context from it and **update it when code ships**. Kill the drift.

1. **Load Product OS context first** — Read `data/features.yaml`, `data/backlog.yaml`, and relevant `content/` before implementing or scoping work.
2. **Align with Product OS** — Do not implement features that are deprecated or contradict Product OS. If the user's request conflicts, surface the conflict.
3. **Update Product OS when you ship** — When code implements a feature or backlog item, create a PR to update Product OS (e.g. set `status: shipped`, `completion: 100`). Agents do this; humans review.

## Product OS Location

- **Path**: `../product-os` (relative to this repo) — or add Product OS to your workspace
- **Key files**: `data/features.yaml`, `data/backlog.yaml`, `data/goals.yaml`, `data/repositories.yaml`
- **Full guide**: See Product OS `content/about-product-os/agent-workflow.mdx`
```

## Path Options

| Setup | PRODUCT_OS_PATH |
|-------|-----------------|
| Sibling folder | `../product-os` |
| Monorepo subfolder | `../product-os` or `../../product-os` |
| Absolute path | `/Users/you/Source/product-os` (less portable) |
| Workspace root | If Product OS is in the same workspace, use the folder name |

## For Product OS Repo Itself

In the Product OS repo, use `.cursor/rules/product-os-maintainer.mdc`:

```markdown
---
description: Product OS maintenance — keep data and content in sync, validate before commit
globs: data/**/*.yaml, content/**/*.mdx
alwaysApply: false
---

# Product OS Maintenance

- When updating `data/features.yaml`, ensure corresponding `content/features/*.mdx` exists and is in sync
- When updating `data/backlog.yaml`, consider adding/updating `content/backlog/items/*.mdx`
- Run `npm run validate` before committing
- Use templates in `templates/` for new content
```
