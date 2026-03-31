# mikeyerke-site

Personal website for Mike Yerke, built with Next.js and ready for Vercel deployment.

## What is included

- Homepage with positioning, featured projects, and latest writing
- GTM system simulator and recruiter-focused walkthrough sections
- Blog index and blog post pages (Markdown-backed)
- Projects index and project detail pages (Markdown-backed)
- Project visuals (cover images + gallery support from markdown frontmatter)
- Project leadership layer (stakeholders, tradeoffs, governance, rollout, adoption)
- About, Resume, and Contact pages
- Executive hiring pages (`/hire` + role-specific tracks)
- Artifacts hub (`/artifacts`) and trust page (`/trust`)
- Contact funnel with Calendly embed + API-backed form endpoint
- Open Graph image routes (site-wide + per blog post + per project)
- Vercel Analytics + Speed Insights wiring
- SEO metadata, robots.txt, and sitemap.xml

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Update content

- Blog posts: `content/blog/*.md`
- Projects: `content/projects/*.md`

Each content file uses frontmatter:

```yaml
title: ""
date: "YYYY-MM-DD"
summary: ""
tags: ["tag1", "tag2"]
featured: true
repo: "https://github.com/..." # optional
demo: "https://..." # optional
```

Project files also support optional case-study fields:

```yaml
role: "Systems Architect + Builder"
timeline: "4 weeks"
team: "RevOps + Engineering"
stakeholders:
  - "Primary stakeholder group"
tradeoffs:
  - "Design decision tradeoff"
governance:
  - "Governance rule"
rollout:
  - "Rollout step"
adoption:
  - "Adoption motion"
before:
  - "Previous state issue"
after:
  - "Improved state"
impact:
  - label: "Intake Speed"
    value: "2.4x faster"
    detail: "Reduced report-to-ticket time"
coverImage: "/projects/my-project/cover.svg"
visuals:
  - src: "/projects/my-project/cover.svg"
    alt: "Dashboard screenshot"
    caption: "High-level architecture view"
```

## Resume file

Replace `public/mike-yerke-resume.pdf` with your actual PDF.

## Deploy to Vercel

1. Go to [Vercel](https://vercel.com/new).
2. Import `my-ships-it/mikeyerke-site`.
3. Keep defaults and click Deploy.
4. In Vercel project settings, add `mikeyerke.com` and `www.mikeyerke.com` as domains.
5. In Cloudflare DNS, add the records Vercel provides.

## Contact Funnel Setup

The `/contact` page includes:

- Embedded Calendly scheduler
- API-backed contact form (`POST /api/contact`)
- Spam controls: honeypot, timing check, origin allowlist, and rate limiting

Environment variables:

- `NEXT_PUBLIC_CALENDLY_URL` (example: `https://calendly.com/your-handle/30min`)
- `NEXT_PUBLIC_WALKTHROUGH_VIDEO_URL` (optional, YouTube/Vimeo link for walkthrough embed)
- `CONTACT_ALLOWED_ORIGINS` (comma-separated, optional)
- Delivery target (at least one):
  - `CONTACT_WEBHOOK_URL`
  - `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` + `CONTACT_TO_EMAIL`
- Optional bot challenge:
  - `CONTACT_TURNSTILE_SECRET`

## Password Protect The Entire Site

This repo includes middleware-level HTTP Basic Auth. If credentials are not set in production, the site returns `503` (safe default).

1. In Vercel, open your project.
2. Go to `Settings -> Environment Variables`.
3. Add:
   - `SITE_USERNAME`
   - `SITE_PASSWORD`
4. Set both for `Production` (and optionally `Preview`).
5. Redeploy.

After deploy, all pages are behind a username/password prompt.

## CMS Editing (Optional)

This repo includes a Decap CMS panel at `/admin` for visual content editing.
The OAuth backend is self-hosted in this app:

- `/api/cms/auth`
- `/api/cms/callback`

Setup:

1. Create a GitHub OAuth App:
   - Homepage URL: `https://www.mikeyerke.com`
   - Authorization callback URL: `https://www.mikeyerke.com/api/cms/callback`
2. In Vercel `Settings -> Environment Variables`, add:
   - `CMS_BASE_URL=https://www.mikeyerke.com`
   - `CMS_GITHUB_CLIENT_ID=<from GitHub OAuth app>`
   - `CMS_GITHUB_CLIENT_SECRET=<from GitHub OAuth app>`
3. Redeploy.
4. Visit `/admin` and log in with GitHub.
5. Edit blog/projects visually and publish commits to `main`.

## Security Notes

- This site is static and does not store user accounts, databases, or payment info.
- Security headers are applied by middleware.
- Contact endpoint enforces input validation and request throttling.
- `x-powered-by` header is disabled.
- Do not commit secrets or API keys to the repo.
- Keep dependencies updated (`npm outdated`, then patch regularly).
- Use strong unique passwords for Vercel, GitHub, and Cloudflare and enable 2FA.

## Performance and Analytics

- Next.js image optimization is enabled with AVIF/WebP output.
- Vercel Analytics and Speed Insights are wired in `app/layout.tsx`.
- Static media assets under `public/projects/*` are cache-friendly in protected mode.

## Director-Level Content Workflow

1. Add only verified metrics to project frontmatter `impact` blocks.
2. Update `/hire` and `/hire/<track>` pages with approved role-specific outcomes.
3. Add approved reference quotes in `lib/references.ts`.
4. Keep artifacts in `public/artifacts/*` aligned to your latest operating practices.

## Suggested next edits

- Replace placeholder project/blog content with real case studies
- Add your real resume PDF
- Update social links and contact email if needed
