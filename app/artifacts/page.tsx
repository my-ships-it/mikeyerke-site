import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Artifacts",
  description: "Downloadable operating artifacts from Mike Yerke's GTM systems and RevOps work.",
  alternates: {
    canonical: "https://www.mikeyerke.com/artifacts"
  }
};

const artifacts = [
  {
    title: "Forecast Inspection Scorecard Template",
    description: "Template for confidence review, risk tagging, and coaching escalation during forecast calls.",
    href: "/artifacts/forecast-inspection-scorecard-template.md"
  },
  {
    title: "AI Operations Governance Canvas",
    description: "Practical checklist for introducing AI into GTM workflows with controls and accountability.",
    href: "/artifacts/ai-ops-governance-canvas.md"
  },
  {
    title: "90-Day RevOps Transition Plan",
    description: "Execution framework for stabilizing workflows and scaling operating discipline in quarter one.",
    href: "/artifacts/90-day-revops-transition-plan.md"
  },
  {
    title: "GTM Operating Rhythm Checklist",
    description: "Cadence blueprint across weekly, monthly, and quarterly revenue operating reviews.",
    href: "/artifacts/gtm-operating-rhythm-checklist.md"
  }
];

export default function ArtifactsPage() {
  return (
    <section>
      <h1>Flagship Artifacts</h1>
      <p className="page-intro">
        Downloadable frameworks used to communicate systems thinking, execution discipline, and leadership
        operating style.
      </p>

      <div className="artifact-grid">
        {artifacts.map((artifact) => (
          <article className="list-item" key={artifact.href}>
            <h2>{artifact.title}</h2>
            <p>{artifact.description}</p>
            <div className="link-row">
              <Link className="btn btn-primary" download href={artifact.href}>
                Download
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
