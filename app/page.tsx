import Link from "next/link";
import Image from "next/image";
import { getAllContent } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SystemsMap } from "@/components/SystemsMap";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { ControlTower } from "@/components/ControlTower";

export default function HomePage() {
  const posts = getAllContent("blog").slice(0, 3);
  const projects = getAllContent("projects");
  const spotlight = projects.find((project) => project.featured) ?? projects[0];
  const explorerProjects = spotlight ? projects.filter((project) => project.slug !== spotlight.slug) : projects;

  return (
    <>
      <Reveal>
        <section className="hero">
          <div className="hero-layout">
            <div>
              <p className="eyebrow">GTM Systems | AI Workflows | RevOps Leadership</p>
              <h1>I Build Revenue Engines That Teams Actually Use</h1>
              <p>
                I am Mike Yerke. I design operating systems for Sales, Marketing, and CS that remove friction,
                increase signal quality, and convert strategy into measurable execution.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/projects">
                  Explore Case Studies
                </Link>
                <Link className="btn btn-secondary" href="/resume">
                  Download Resume
                </Link>
              </div>
              <div className="stat-band">
                <div className="stat-pill">
                  <p className="meta">Specialty</p>
                  <h3>RevOps Architecture</h3>
                </div>
                <div className="stat-pill">
                  <p className="meta">Systems Lens</p>
                  <h3>AI + Automation</h3>
                </div>
                <div className="stat-pill">
                  <p className="meta">Delivery Style</p>
                  <h3>Operator + Builder</h3>
                </div>
              </div>
            </div>
            <aside className="hero-panel">
              <p className="meta">What You Get Working With Me</p>
              <h3>Clarity. Speed. Accountability.</h3>
              <ul className="hero-list">
                <li>Clear owner maps across the full funnel</li>
                <li>Automation that survives real world edge cases</li>
                <li>Actionable forecasting and pipeline diagnostics</li>
                <li>Documentation teams can onboard from quickly</li>
              </ul>
              <Link className="inline-cta" href="/contact">
                Start a conversation
              </Link>
            </aside>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section>
          <div className="section-header">
            <h2>Selected Work</h2>
            <Link href="/projects">See all</Link>
          </div>
          {spotlight ? (
            <article className="showcase-card">
              {spotlight.coverImage ? (
                <div className="feature-media">
                  <Image
                    alt={spotlight.title}
                    className="feature-media-image"
                    height={720}
                    priority
                    sizes="(max-width: 820px) 100vw, 70vw"
                    src={spotlight.coverImage}
                    width={1280}
                  />
                </div>
              ) : null}
              <p className="meta">Project Spotlight</p>
              <h3>
                <Link href={`/projects/${spotlight.slug}`}>{spotlight.title}</Link>
              </h3>
              <p>{spotlight.summary}</p>
              <div className="tag-row">
                {spotlight.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ) : null}

          <ProjectExplorer projects={explorerProjects} />
        </section>
      </Reveal>

      <Reveal>
        <section>
          <div className="section-header">
            <h2>Execution Model</h2>
          </div>
          <div className="card-grid">
            <article className="card">
              <h3>1. Diagnose</h3>
              <p>Map bottlenecks in process, data integrity, and ownership boundaries.</p>
            </article>
            <article className="card">
              <h3>2. Architect</h3>
              <p>Design workflows and automation with reliable guardrails and observability.</p>
            </article>
            <article className="card">
              <h3>3. Operationalize</h3>
              <p>Enable teams with clear SOPs and tie outcomes to revenue-facing metrics.</p>
            </article>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <SystemsMap />
      </Reveal>

      <Reveal>
        <ControlTower />
      </Reveal>

      <Reveal>
        <section>
          <div className="section-header">
            <h2>Writing + POV</h2>
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
      </Reveal>

      <Reveal>
        <section className="cta-banner">
          <p className="eyebrow">Open To Leadership Roles</p>
          <h2>Looking for someone who can both design strategy and ship systems?</h2>
          <p>
            This site highlights how I think and how I execute. If you are hiring for RevOps, GTM Systems, or AI
            operations leadership, let us talk.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/contact">
              Contact Mike
            </Link>
            <Link className="btn btn-secondary" href="/resume">
              Review Resume
            </Link>
          </div>
        </section>
      </Reveal>
    </>
  );
}
