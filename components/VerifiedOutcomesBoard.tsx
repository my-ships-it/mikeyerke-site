import Link from "next/link";
import { getAllContent } from "@/lib/content";

type OutcomeItem = {
  value: string;
  label: string;
  detail?: string;
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
            <p className="meta">
              Source:{" "}
              <Link href={`/projects/${outcome.projectSlug}`}>{outcome.projectTitle}</Link>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
