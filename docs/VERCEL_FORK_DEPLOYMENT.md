# Vercel Deployment for Forked Repositories

This repo is a fork. To get your **own** deployment (not the original's), you must create a **new** Vercel project and connect it to **your fork**.

## Why the fork might show the original's site

If your fork's Vercel deployment shows the same content as the original repo, the most common cause is:

**The Vercel project is connected to the wrong Git repository.**

- Vercel deploys from the repository linked in **Project Settings → Git**
- If that repository is `nakulshukla08/api-govern-os` (the original), deployments will use the original's code
- Your fork (`winspect-labs/api-govern-os`) needs its **own** Vercel project linked to the fork

## Fix: Create a new project from your fork

1. Go to [Vercel New Project](https://vercel.com/new)
2. Under **Import Git Repository**, select **winspect-labs/api-govern-os** (your fork)
   - ⚠️ Do **not** select `nakulshukla08/api-govern-os` — that is the original
   - Both may appear in the list if you have access to both; choose the one under your org
3. Configure the project (framework is auto-detected as Next.js)
4. Deploy

## If you already have a project

1. Go to your Vercel project → **Settings** → **Git**
2. Check **Connected Git Repository**
3. If it shows `nakulshukla08/api-govern-os`, you need to:
   - Create a **new** project (Vercel does not allow switching the connected repo)
   - Import `winspect-labs/api-govern-os` as the source
   - Optionally delete or archive the old project

## Using Vercel CLI

If deploying via CLI from your fork:

```bash
cd /path/to/api-govern-os   # Your fork
vercel
```

When prompted **"Link to existing project?"** — choose **No** to create a new project for your fork. Do not link to an existing project that was created from the original repo.

## Verify your deployment

After deploying:

- Your deployment URL should be unique (e.g. `api-govern-os-*.vercel.app` or your custom domain)
- "Edit on GitHub" links should point to `winspect-labs/api-govern-os`
- Content reflects your fork's `data/` and `config/site.config.ts`
