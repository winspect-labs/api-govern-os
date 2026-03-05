# Product OS — Developer Workflow

Product OS is **agent-first**. Agents get context from it and update it when code ships. Humans integrate Product OS into their workflow to stay aware and review. Jira/Linear augment—don't replace—Product OS.

## One-Time Setup

### 1. Add Product OS to Your Workspace

**Option A: Multi-root workspace (recommended)**

1. Open your main repo (e.g. `api-management-ui`)
2. File → Add Folder to Workspace → select `product-os`
3. Save as `your-product.code-workspace`

**Option B: Symlink (advanced)**

```bash
# In your repo
ln -s /path/to/product-os ./product-os
```

Then add `product-os` to `.gitignore` if you don't want to commit it.

### 2. Add Cursor Rule to Product Repos

Copy the rule from [RULES_FOR_PRODUCT_REPOS.md](./RULES_FOR_PRODUCT_REPOS.md) into each of:

- `api-management-ui/.cursor/rules/product-os-source-of-truth.mdc`
- `platform-backend-service/.cursor/rules/product-os-source-of-truth.mdc`
- Any other repo that implements product features

Adjust the path to Product OS in the rule if your layout differs.

### 3. Add Product OS to Product Repos (Optional)

In each product repo's README or CONTRIBUTING, add:

```markdown
## Product OS

This repo implements features defined in [Product OS](https://github.com/your-org/product-os). Before starting work, check `data/backlog.yaml` and `data/features.yaml` for context. When you ship a feature, update Product OS (see Product OS `content/about-product-os/agent-workflow.mdx`).
```

## Daily Workflow

### Starting a New Task

1. Open Product OS (or ensure it's in your workspace)
2. Ask your agent: "What should I work on next?" — it will read `data/backlog.yaml`
3. Or: "Implement feature X" — it will read `data/features.yaml` and `content/features/x.mdx`
4. Agent loads Product OS context automatically (if rule is installed)

### Shipping a Feature

1. Merge your PR
2. **Update Product OS** — either:
   - **Manual**: Open Product OS, update `data/features.yaml` (e.g. `status: shipped`, `completion: 100`), run `npm run validate`, commit, push
   - **Agent-assisted**: "I just shipped api-catalog. Create a PR to update Product OS."
   - **Automated**: Use GitHub Actions (see below)

### PR Conventions (Recommended)

Use labels or commit scope to link PRs to Product OS:

- **Label**: `product-os:feature-api-catalog` or `product-os:backlog-bl-001`
- **Commit**: `feat(api-catalog): add OpenAPI ingestion`
- **PR title**: `[api-catalog] Implement OpenAPI ingestion`

This enables automation and makes it easy for agents to detect when Product OS should be updated.

## Automation: GitHub Actions

### Workflow 1: Update Product OS on PR Merge

When a PR is merged in `api-management-ui` with label `product-os:feature-*`:

```yaml
# .github/workflows/update-product-os.yml (in api-management-ui)
name: Update Product OS
on:
  pull_request:
    types: [closed]
    branches: [main]
jobs:
  update:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          repository: your-org/product-os
          token: ${{ secrets.PRODUCT_OS_TOKEN }}
      - name: Parse label
        id: parse
        run: |
          LABEL=$(echo '${{ toJSON(github.event.pull_request.labels) }}' | jq -r '.[].name | select(startswith("product-os:feature-"))')
          FEATURE=$(echo "$LABEL" | sed 's/product-os:feature-//')
          echo "feature=$FEATURE" >> $GITHUB_OUTPUT
      - name: Update features.yaml
        run: |
          # Use yq or a script to update data/features.yaml
          # Set status: shipped, completion: 100 for the feature
      - name: Create PR
        uses: peter-evans/create-pull-request@v5
        with:
          branch: product-os-update-${{ github.run_id }}
          commit-message: "chore: mark ${{ steps.parse.outputs.feature }} as shipped"
          title: "Update Product OS: ${{ steps.parse.outputs.feature }} shipped"
```

**Caveat**: Parsing and updating YAML in Actions requires a script. A simpler approach is a **manual checklist** + agent assistance.

### Workflow 2: Validation on Product OS PRs

In the Product OS repo:

```yaml
# .github/workflows/validate.yml
name: Validate
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run validate
```

This ensures all Product OS PRs pass validation.

## Checklist for New Teams

- [ ] Product OS is forked/customized for your product
- [ ] Product OS is in engineers' workspaces (multi-root or symlink)
- [ ] Cursor rule `product-os-source-of-truth.mdc` is in each product repo
- [ ] PR template includes Product OS checklist (if not automated)
- [ ] Team knows to update Product OS when shipping features
- [ ] Product OS validation runs in CI
