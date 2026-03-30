# mikeyerke-site

Personal website for Mike Yerke, built with Next.js and ready for Vercel deployment.

## What is included

- Homepage with positioning, featured projects, and latest writing
- Blog index and blog post pages (Markdown-backed)
- Projects index and project detail pages (Markdown-backed)
- About, Resume, and Contact pages
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
before:
  - "Previous state issue"
after:
  - "Improved state"
impact:
  - label: "Intake Speed"
    value: "2.4x faster"
    detail: "Reduced report-to-ticket time"
```

## Resume file

Replace `public/mike-yerke-resume.pdf` with your actual PDF.

## Deploy to Vercel

1. Go to [Vercel](https://vercel.com/new).
2. Import `my-ships-it/mikeyerke-site`.
3. Keep defaults and click Deploy.
4. In Vercel project settings, add `mikeyerke.com` and `www.mikeyerke.com` as domains.
5. In Cloudflare DNS, add the records Vercel provides.

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

1. Configure a GitHub OAuth proxy service.
2. Set `backend.base_url` in `public/admin/config.yml`.
3. Visit `/admin` and log in with GitHub.
4. Edit blog/projects visually and publish commits to `main`.

## Security Notes

- This site is static and does not store user accounts, databases, or payment info.
- Security headers are applied by middleware.
- `x-powered-by` header is disabled.
- Do not commit secrets or API keys to the repo.
- Keep dependencies updated (`npm outdated`, then patch regularly).
- Use strong unique passwords for Vercel, GitHub, and Cloudflare and enable 2FA.

## Suggested next edits

- Replace placeholder project/blog content with real case studies
- Add your real resume PDF
- Update social links and contact email if needed
