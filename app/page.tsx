import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { getAllContent } from "@/lib/content";

const confidenceRank: Record<string, number> = {
  high: 3,
  medium: 2,
  directional: 1
};

export default function HomePage() {
  const projects = getAllContent("projects");
  const posts = getAllContent("blog").slice(0, 3);
  const featuredProjects = projects.slice(0, 3);
  const latestContentDate = [projects[0]?.date, posts[0]?.date].filter(Boolean).sort().reverse()[0];

  const strongestProject = [...projects].sort((left, right) => {
    const leftConfidence = confidenceRank[left.impact[0]?.confidenceLevel ?? ""] ?? 0;
    const rightConfidence = confidenceRank[right.impact[0]?.confidenceLevel ?? ""] ?? 0;

    if (leftConfidence !== rightConfidence) {
      return rightConfidence - leftConfidence;
    }

    return new Date(right.date).getTime() - new Date(left.date).getTime();
  })[0];

  const proofMetrics = strongestProject?.impact.slice(0, 3) ?? [];

  return (
    <>
      <Reveal>
        <section className="hero">
          <div className="hero-layout">
            <div>
              <p className="eyebrow">GTM Systems | AI Workflows | RevOps Leadership</p>
              <h1>I build GTM systems that teams actually use.</h1>
              <p>
                I design practical operating systems for Sales, Marketing, and Customer Success teams. The
                focus is clear handoffs, clean data, and measurable outcomes.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/projects">
                  View Work
                </Link>
                <Link className="btn btn-secondary" href="/mike-yerke-resume.pdf" target="_blank" rel="noreferrer">
                  Resume PDF
                </Link>
              </div>
              <p className="meta">{latestContentDate ? `Content updated: ${latestContentDate}` : null}</p>
            </div>

            <aside className="hero-panel">
              <p className="meta">Start Here</p>
              <ol>
                <li>Open the resume for role scope and experience summary.</li>
                <li>Review 1-2 case studies for implementation depth.</li>
                <li>Use the contact page for a focused intro call.</li>
              </ol>
              <Link className="inline-cta" href="/hire">
                Open executive brief
              </Link>
            </aside>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section>
          <div className="section-header">
            <h2>Proof, not claims</h2>
            {strongestProject ? <Link href={`/projects/${strongestProject.slug}`}>Source case study</Link> : null}
          </div>

          {proofMetrics.length > 0 ? (
            <div className="impact-grid">
              {proofMetrics.map((metric) => (
                <article className="impact-card" key={`${metric.label}-${metric.value}`}>
                  <p className="meta">{metric.label}</p>
                  <h3>{metric.value}</h3>
                  {metric.detail ? <p>{metric.detail}</p> : null}
                  {metric.baseline ? <p className="meta">Baseline: {metric.baseline}</p> : null}
                  {metric.delta ? <p className="meta">Delta: {metric.delta}</p> : null}
                  {metric.metricPeriod ? <p className="meta">Period: {metric.metricPeriod}</p> : null}
                  {metric.sourceArtifactUrl ? (
                    <p className="meta">
                      <a href={metric.sourceArtifactUrl} target="_blank" rel="noreferrer">
                        Evidence file
                      </a>
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <article className="list-item">
              <h3>Evidence is being prepared.</h3>
            </article>
          )}
        </section>
      </Reveal>

      <Reveal>
        <section>
          <div className="section-header">
            <h2>Selected work</h2>
            <Link href="/projects">All projects</Link>
          </div>

          <div className="showcase-grid">
            {featuredProjects.map((project) => (
              <article className="card" key={project.slug}>
                {project.coverImage ? (
                  <div className="project-thumb-wrap">
                    <Image
                      alt={project.title}
                      className="project-thumb"
                      height={720}
                      loading="lazy"
                      sizes="(max-width: 820px) 100vw, 33vw"
                      src={project.coverImage}
                      width={1280}
                    />
                  </div>
                ) : null}
                <p className="meta">{project.date}</p>
                <h3>
                  <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                </h3>
                <p>{project.summary}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section>
          <div className="section-header">
            <h2>Writing</h2>
            <Link href="/blog">All writing</Link>
          </div>

          <div className="journal-grid">
            {posts.map((post) => (
              <article className="list-item" key={post.slug}>
                <p className="meta">
                  {post.date} | {post.readingMinutes} min read
                </p>
                <h3>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.summary}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="cta-banner">
          <p className="eyebrow">Open To Roles</p>
          <h2>Open to Director+ roles in RevOps, GTM systems, and AI operations.</h2>
          <div className="link-row">
            <Link className="btn btn-primary" href="/contact">
              Contact Mike
            </Link>
            <Link className="btn btn-secondary" href="/hire">
              Hiring Brief
            </Link>
          </div>
        </section>
      </Reveal>
    </>
  );
}
