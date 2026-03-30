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

## Resume file

Replace `public/mike-yerke-resume.pdf` with your actual PDF.

## Deploy to Vercel

1. Go to [Vercel](https://vercel.com/new).
2. Import `my-ships-it/mikeyerke-site`.
3. Keep defaults and click Deploy.
4. In Vercel project settings, add `mikeyerke.com` and `www.mikeyerke.com` as domains.
5. In Cloudflare DNS, add the records Vercel provides.

## Suggested next edits

- Replace placeholder project/blog content with real case studies
- Add your real resume PDF
- Update social links and contact email if needed
