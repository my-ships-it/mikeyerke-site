# Contributing Guide

## Branch and PR Workflow

1. Create a branch from `main` with prefix `codex/`.
2. Make changes and keep commits focused.
3. Open a pull request to `main`.
4. Ensure CI passes before merging.
5. After merge, verify the Vercel production deployment.

## Required Local Checks

Run these before opening a PR:

```bash
npm run qa:content
npm run lint
npm run typecheck
npm run build
```

## Content and Claims Policy

- Publish only verified outcomes and metrics.
- Do not include unapproved quotes or testimonial attributions.
- Avoid placeholder language in public-facing copy.

## Security and Secrets

- Never commit credentials, tokens, or API keys.
- Keep secrets in Vercel environment variables.
- Rotate any secret that is ever exposed in logs or screenshots.
