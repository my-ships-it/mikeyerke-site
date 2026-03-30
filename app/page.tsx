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
