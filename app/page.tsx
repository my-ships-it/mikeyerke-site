import Link from "next/link";
import { getAllContent } from "@/lib/content";

export default function HomePage() {
  const posts = getAllContent("blog").slice(0, 3);
  const projects = getAllContent("projects").filter((item) => item.featured).slice(0, 4);

  return (
    <>
      <section className="hero">
        <p className="eyebrow">GTM Systems | AI Workflows | RevOps Leadership</p>
        <h1>Mike Yerke</h1>
        <p>
          I design and deploy scalable GTM systems that help teams move faster with better data, cleaner
          handoffs, and measurable revenue impact.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/projects">
            View Projects
          </Link>
          <Link className="btn btn-secondary" href="/resume">
            View Resume
          </Link>
        </div>
        <div className="metric-row">
          <article className="metric-card">
            <p className="meta">Focus</p>
            <h3>Revenue Systems</h3>
            <p>Operational design across lifecycle, routing, and pipeline hygiene.</p>
          </article>
          <article className="metric-card">
            <p className="meta">Stack</p>
            <h3>AI + Automation</h3>
            <p>Workflow automation that supports teams without introducing hidden complexity.</p>
          </article>
          <article className="metric-card">
            <p className="meta">Outcomes</p>
            <h3>Execution Velocity</h3>
            <p>Faster handoffs, better data quality, and cleaner forecasting signals.</p>
          </article>
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>Featured Projects</h2>
          <Link href="/projects">See all</Link>
        </div>
        <div className="card-grid">
          {projects.map((project) => (
            <article className="card" key={project.slug}>
              <h3>
                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              </h3>
              <p>{project.summary}</p>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>How I Work</h2>
        </div>
        <div className="card-grid">
          <article className="card">
            <h3>1. Map the operating model</h3>
            <p>Align stage definitions, ownership, and dependencies before touching tooling.</p>
          </article>
          <article className="card">
            <h3>2. Build for adoption</h3>
            <p>Ship systems teams actually use, with clear documentation and low friction workflows.</p>
          </article>
          <article className="card">
            <h3>3. Measure business lift</h3>
            <p>Tie every automation to conversion, cycle time, and forecast confidence improvements.</p>
          </article>
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>Latest Writing</h2>
          <Link href="/blog">Read all</Link>
        </div>
        <div className="list-stack">
          {posts.map((post) => (
            <article className="list-item" key={post.slug}>
              <p className="meta">{post.date}</p>
              <h3>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p>{post.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
