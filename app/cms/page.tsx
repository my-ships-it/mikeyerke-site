import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS",
  description: "Content management setup for blog and project entries."
};

export default function CmsPage() {
  return (
    <section>
      <h1>CMS Setup</h1>
      <p className="page-intro">
        Content editing is available via Decap CMS at <code>/admin</code> once OAuth is configured.
      </p>

      <div className="list-stack">
        <article className="list-item">
          <h2>1. GitHub OAuth App</h2>
          <p>
            Create a GitHub OAuth app with callback URL <code>https://www.mikeyerke.com/api/cms/callback</code>.
          </p>
        </article>

        <article className="list-item">
          <h2>2. Set Vercel Variables</h2>
          <p>
            Add <code>CMS_BASE_URL</code>, <code>CMS_GITHUB_CLIENT_ID</code>, and{" "}
            <code>CMS_GITHUB_CLIENT_SECRET</code> in Vercel project environment variables.
          </p>
        </article>

        <article className="list-item">
          <h2>3. Open Admin</h2>
          <p>
            Visit <code>/admin</code>, authenticate with GitHub, and edit blog/projects visually.
          </p>
        </article>

        <article className="list-item">
          <h2>4. Publish Changes</h2>
          <p>
            Saved content commits to your repository and redeploys automatically on Vercel.
          </p>
        </article>
      </div>
    </section>
  );
}
