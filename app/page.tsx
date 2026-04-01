import Link from "next/link";
import Image from "next/image";
import { getAllContent } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { GtmSimulator } from "@/components/GtmSimulator";
import { RecruiterJourney } from "@/components/RecruiterJourney";
import { SystemsMap } from "@/components/SystemsMap";
import { ControlTower } from "@/components/ControlTower";

const confidenceRank: Record<string, number> = {
  high: 3,
  medium: 2,
  directional: 1
};

export default function HomePage() {
  const posts = getAllContent("blog").slice(0, 2);
  const projects = getAllContent("projects");

  const strongestProject = [...projects].sort((left, right) => {
    const leftConfidence = confidenceRank[left.impact[0]?.confidenceLevel ?? ""] ?? 0;
    const rightConfidence = confidenceRank[right.impact[0]?.confidenceLevel ?? ""] ?? 0;

    if (leftConfidence !== rightConfidence) {
      return rightConfidence - leftConfidence;
    }

    return new Date(right.date).getTime() - new Date(left.date).getTime();
  })[0];

  const strongestMetric = strongestProject?.impact[0];
  const remainingProjects = strongestProject
    ? projects.filter((project) => project.slug !== strongestProject.slug)
    : projects;

  return (
    <>
      <Reveal>
        <section className="hero">
          <div className="hero-layout">
            <div>
              <p className="eyebrow">GTM Systems | AI Workflows | RevOps Leadership</p>
              <h1>Director-Level RevOps Leadership With Measured Systems Execution</h1>
              <p>
                I build operating systems for Sales, Marketing, and Customer Success that raise signal quality,
                tighten handoffs, and translate strategy into accountable execution.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href={strongestProject ? `/projects/${strongestProject.slug}` : "/projects"}>
                  Read Strongest Case Study
                </Link>
                <Link className="btn btn-secondary" href="/hire">
                  Open Executive Brief
                </Link>
              </div>
            </div>

            <aside className="hero-panel">
              <p className="meta">Strongest Proof Above Fold</p>
              {strongestProject ? (
                <>
                  <h3>{strongestProject.title}</h3>
                  <p>{strongestProject.summary}</p>
                  {strongestMetric ? (
                    <article className="sim-highlight" style={{ marginTop: "0.45rem" }}>
                      <p className="meta">Measured Outcome</p>
                      <h3>{strongestMetric.value}</h3>
                      <p>{strongestMetric.detail}</p>
                      {strongestMetric.baseline ? <p className="meta">Baseline: {strongestMetric.baseline}</p> : null}
                      {strongestMetric.delta ? <p className="meta">Delta: {strongestMetric.delta}</p> : null}
                      {strongestMetric.metricPeriod ? <p className="meta">Period: {strongestMetric.metricPeriod}</p> : null}
                      {strongestMetric.confidenceLevel ? (
                        <p className="meta">Confidence: {strongestMetric.confidenceLevel}</p>
                      ) : null}
                      {strongestMetric.sourceArtifactUrl ? (
                        <p className="meta">
                          <a href={strongestMetric.sourceArtifactUrl} rel="noreferrer" target="_blank">
                            Evidence source
                          </a>
                        </p>
                      ) : null}
                    </article>
                  ) : null}
                  <Link className="inline-cta" href={`/projects/${strongestProject.slug}`}>
                    Inspect full implementation
                  </Link>
                </>
              ) : (
                <p>Project evidence is being prepared.</p>
              )}
            </aside>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section>
          <div className="section-header">
            <h2>Measured Case Study</h2>
            {strongestProject ? <Link href={`/projects/${strongestProject.slug}`}>Open full detail</Link> : null}
          </div>

          {strongestProject ? (
            <article className="showcase-card page-showcase">
              {strongestProject.coverImage ? (
                <div className="feature-media">
                  <Image
                    alt={strongestProject.title}
                    className="feature-media-image"
                    height={720}
                    priority
                    sizes="(max-width: 820px) 100vw, 70vw"
                    src={strongestProject.coverImage}
                    width={1280}
                  />
                </div>
              ) : null}
              <p className="meta">{strongestProject.date}</p>
              <h3>
                <Link href={`/projects/${strongestProject.slug}`}>{strongestProject.title}</Link>
              </h3>
              <p>{strongestProject.summary}</p>

              <div className="impact-grid" style={{ marginTop: "0.8rem" }}>
                {strongestProject.impact.slice(0, 3).map((metric) => (
                  <article className="impact-card" key={`${metric.label}-${metric.value}`}>
                    <p className="meta">{metric.label}</p>
                    <h3>{metric.value}</h3>
                    {metric.detail ? <p>{metric.detail}</p> : null}
                    {metric.metricPeriod ? <p className="meta">{metric.metricPeriod}</p> : null}
                    {metric.sourceArtifactUrl ? (
                      <p className="meta">
                        <a href={metric.sourceArtifactUrl} target="_blank" rel="noreferrer">
                          Evidence source
                        </a>
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            </article>
          ) : (
            <article className="list-item">
              <h3>Case study content is being prepared.</h3>
            </article>
          )}
        </section>
      </Reveal>

      <Reveal>
        <section>
          <div className="section-header">
            <h2>Selected Work</h2>
            <Link href="/projects">See all projects</Link>
          </div>
          <ProjectExplorer projects={remainingProjects} />
        </section>
      </Reveal>

      <Reveal>
        <SystemsMap />
      </Reveal>

      <Reveal>
        <ControlTower />
      </Reveal>

      <Reveal>
        <GtmSimulator />
      </Reveal>

      <Reveal>
        <>
          <RecruiterJourney placement="home" />
          <section className="list-stack" style={{ marginTop: "1rem" }}>
            <div className="section-header">
              <h2>Latest Writing</h2>
              <Link href="/blog">Read all</Link>
            </div>
            <div className="journal-grid">
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
      </Reveal>
    </>
  );
}
