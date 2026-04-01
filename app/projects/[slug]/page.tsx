import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllContent, getContentBySlug, markdownToHtml } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllContent("projects").map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getContentBySlug("projects", slug);

  if (!project) {
    return { title: "Project" };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `https://www.mikeyerke.com/projects/${project.slug}`
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      url: `https://www.mikeyerke.com/projects/${project.slug}`,
      images: [{ url: `/projects/${project.slug}/opengraph-image`, width: 1200, height: 630, alt: project.title }]
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [`/projects/${project.slug}/opengraph-image`]
    }
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getContentBySlug("projects", slug);

  if (!project) {
    notFound();
  }

  const leadershipSections = [
    { title: "Stakeholder Map", items: project.stakeholders },
    { title: "Decision Tradeoffs", items: project.tradeoffs },
    { title: "Governance Model", items: project.governance },
    { title: "Rollout Plan", items: project.rollout },
    { title: "Adoption Strategy", items: project.adoption }
  ];
  const hasLeadershipLayer = leadershipSections.some((section) => section.items.length > 0);
  const hasExternalProjectLinks = Boolean(project.repo || project.demo);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    datePublished: project.date,
    author: {
      "@type": "Person",
      name: "Mike Yerke"
    },
    url: `https://www.mikeyerke.com/projects/${project.slug}`,
    keywords: project.tags
  };

  return (
    <article className="case-study">
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} type="application/ld+json" />

      <header className="case-hero">
        <p className="meta">{project.date}</p>
        <h1>{project.title}</h1>
        <p className="page-intro">{project.summary}</p>

        <div className="case-meta-grid">
          {project.role ? (
            <div className="case-meta-card">
              <p className="meta">Role</p>
              <h3>{project.role}</h3>
            </div>
          ) : null}
          {project.timeline ? (
            <div className="case-meta-card">
              <p className="meta">Timeline</p>
              <h3>{project.timeline}</h3>
            </div>
          ) : null}
          {project.team ? (
            <div className="case-meta-card">
              <p className="meta">Team</p>
              <h3>{project.team}</h3>
            </div>
          ) : null}
        </div>

        {hasExternalProjectLinks ? (
          <div className="link-row">
            {project.repo ? (
              <Link className="btn btn-secondary" href={project.repo} target="_blank" rel="noreferrer">
                GitHub Repo
              </Link>
            ) : null}
            {project.demo ? (
              <Link className="btn btn-primary" href={project.demo} target="_blank" rel="noreferrer">
                Live Demo
              </Link>
            ) : null}
          </div>
        ) : null}
      </header>

      {project.visuals.length > 0 ? (
        <section className="case-gallery">
          {project.visuals.map((visual) => (
            <figure className="case-visual-card" key={visual.src}>
              <Image
                alt={visual.alt}
                className="case-visual-image"
                height={900}
                priority={visual.src === project.visuals[0].src}
                sizes="(max-width: 820px) 100vw, 70vw"
                src={visual.src}
                width={1600}
              />
              {visual.caption ? <figcaption>{visual.caption}</figcaption> : null}
            </figure>
          ))}
        </section>
      ) : null}

      {project.impact.length > 0 ? (
        <section className="impact-grid">
          {project.impact.map((metric) => (
            <article className="impact-card" key={`${metric.label}-${metric.value}`}>
              <p className="meta">{metric.label}</p>
              <h2>{metric.value}</h2>
              {metric.detail ? <p>{metric.detail}</p> : null}
              {metric.baseline ? <p className="meta">Baseline: {metric.baseline}</p> : null}
              {metric.delta ? <p className="meta">Delta: {metric.delta}</p> : null}
              {metric.metricPeriod ? <p className="meta">Period: {metric.metricPeriod}</p> : null}
              {metric.confidenceLevel ? (
                <p className="meta">Confidence: {metric.confidenceLevel}</p>
              ) : null}
              {metric.sourceArtifactUrl ? (
                <p className="meta">
                  <a href={metric.sourceArtifactUrl} rel="noreferrer" target="_blank">
                    Evidence source
                  </a>
                </p>
              ) : null}
            </article>
          ))}
        </section>
      ) : null}

      {hasLeadershipLayer ? (
        <section className="leadership-layer">
          <h2>Leadership Layer</h2>
          <div className="leadership-grid">
            {leadershipSections
              .filter((section) => section.items.length > 0)
              .map((section) => (
                <article className="leadership-card" key={section.title}>
                  <p className="meta">{section.title}</p>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
          </div>
        </section>
      ) : null}

      {(project.before.length > 0 || project.after.length > 0) ? (
        <section className="architecture-wrap">
          <h2>Architecture Evolution</h2>
          <div className="architecture-grid">
            <article className="architecture-card">
              <p className="meta">Before</p>
              {project.before.length > 0 ? (
                <ul>
                  {project.before.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="meta">No baseline details captured.</p>
              )}
            </article>
            <article className="architecture-card architecture-after">
              <p className="meta">After</p>
              {project.after.length > 0 ? (
                <ul>
                  {project.after.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="meta">No target state details captured.</p>
              )}
            </article>
          </div>
        </section>
      ) : null}

      <section className="article-body" dangerouslySetInnerHTML={{ __html: markdownToHtml(project.content) }} />

      <section className="cta-banner">
        <p className="eyebrow">Interested In Similar Work?</p>
        <h2>Let&apos;s talk about your GTM systems roadmap.</h2>
        <div className="link-row">
          <Link className="btn btn-primary" href="/contact">
            Contact Mike
          </Link>
          <Link className="btn btn-secondary" href="/hire">
            Executive Brief
          </Link>
        </div>
      </section>
    </article>
  );
}
