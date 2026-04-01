import { experienceHighlights } from "@/lib/experienceHighlights";

type ExperienceHighlightsProps = {
  title?: string;
  intro?: string;
  compact?: boolean;
};

export function ExperienceHighlights({
  title = "Track Record Highlights",
  intro = "Verified outcomes below come from the 2024 resume snapshot (pre-Confluent).",
  compact = false
}: ExperienceHighlightsProps) {
  const visibleHighlights = compact ? experienceHighlights.slice(0, 3) : experienceHighlights;

  return (
    <section>
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      <p className="page-intro">{intro}</p>
      <div className="impact-grid">
        {visibleHighlights.map((highlight) => (
          <article className="impact-card" key={`${highlight.metric}-${highlight.title}`}>
            <p className="meta">{highlight.title}</p>
            <h3>{highlight.metric}</h3>
            <p>{highlight.detail}</p>
            <p className="meta">{highlight.scope}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
