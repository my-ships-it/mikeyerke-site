import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Templates",
  description: "Downloadable planning and operating templates from Mike Yerke.",
  alternates: {
    canonical: "https://www.mikeyerke.com/artifacts"
  }
};

const artifacts = [
  {
    title: "Forecast Inspection Scorecard",
    description: "Template for forecast review, risk tagging, and manager follow-up decisions.",
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
      <h1>Templates</h1>
      <p className="page-intro">
        Reusable templates I use for operating reviews and planning discussions.
      </p>

      <div className="artifact-grid">
        {artifacts.map((artifact) => (
          <article className="list-item" key={artifact.href}>
            <h2>{artifact.title}</h2>
            <p>{artifact.description}</p>
            <div className="link-row">
              <Link className="btn btn-primary" href={artifact.href} rel="noreferrer" target="_blank">
                Open
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
