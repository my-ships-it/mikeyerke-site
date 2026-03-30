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
          <h2>1. OAuth Service</h2>
          <p>
            Configure a GitHub OAuth proxy service and set the URL in <code>public/admin/config.yml</code> for{" "}
            <code>base_url</code>.
          </p>
        </article>

        <article className="list-item">
          <h2>2. Open Admin</h2>
          <p>
            Visit <code>/admin</code>, authenticate with GitHub, and edit blog/projects visually.
          </p>
        </article>

        <article className="list-item">
          <h2>3. Publish Changes</h2>
          <p>
            Saved content commits to your repository and redeploys automatically on Vercel.
          </p>
        </article>
      </div>
    </section>
  );
}
