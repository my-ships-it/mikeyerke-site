import Link from "next/link";
import { getAllContent } from "@/lib/content";

type OutcomeItem = {
  value: string;
  label: string;
  detail?: string;
  baseline?: string;
  delta?: string;
  metricPeriod?: string;
  confidenceLevel?: "high" | "medium" | "directional";
  sourceArtifactUrl?: string;
  projectTitle: string;
  projectSlug: string;
};

type VerifiedOutcomesBoardProps = {
  title?: string;
  compact?: boolean;
};

export function VerifiedOutcomesBoard({
  title = "Verified Outcomes",
  compact = false
}: VerifiedOutcomesBoardProps) {
  const projects = getAllContent("projects");
  const outcomes: OutcomeItem[] = projects.flatMap((project) =>
    project.impact.map((metric) => ({
      value: metric.value,
      label: metric.label,
      detail: metric.detail,
      baseline: metric.baseline,
      delta: metric.delta,
      metricPeriod: metric.metricPeriod,
      confidenceLevel: metric.confidenceLevel,
      sourceArtifactUrl: metric.sourceArtifactUrl,
      projectTitle: project.title,
      projectSlug: project.slug
    }))
  );

  const visibleOutcomes = outcomes.slice(0, compact ? 3 : 6);

  return (
    <section className="outcomes-board">
      <div className="section-header">
        <h2>{title}</h2>
        <Link href="/projects">Source Case Studies</Link>
      </div>

      <p className="page-intro">
        Outcomes shown below are tied directly to published case-study artifacts and implementation context.
      </p>

      <div className="outcomes-grid">
        {visibleOutcomes.map((outcome) => (
          <article className="outcome-card" key={`${outcome.projectSlug}-${outcome.label}-${outcome.value}`}>
            <p className="meta">{outcome.label}</p>
            <h3>{outcome.value}</h3>
            {outcome.detail ? <p>{outcome.detail}</p> : null}
            {outcome.baseline ? <p className="meta">Baseline: {outcome.baseline}</p> : null}
            {outcome.delta ? <p className="meta">Delta: {outcome.delta}</p> : null}
            {outcome.metricPeriod ? <p className="meta">Period: {outcome.metricPeriod}</p> : null}
            {outcome.confidenceLevel ? (
              <p className="meta">Confidence: {outcome.confidenceLevel}</p>
            ) : null}
            <p className="meta">
              Source:{" "}
              <Link href={`/projects/${outcome.projectSlug}`}>{outcome.projectTitle}</Link>
            </p>
            {outcome.sourceArtifactUrl ? (
              <p className="meta">
                <Link href={outcome.sourceArtifactUrl} rel="noreferrer" target="_blank">
                  Open evidence file
                </Link>
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
