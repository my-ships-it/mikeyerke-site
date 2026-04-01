import type { Metadata } from "next";
import Link from "next/link";
import { VideoWalkthrough } from "@/components/VideoWalkthrough";
import { VerifiedOutcomesBoard } from "@/components/VerifiedOutcomesBoard";
import { SocialProofPanel } from "@/components/SocialProofPanel";
import { hireTracks } from "@/lib/hireTracks";

export const metadata: Metadata = {
  title: "Hire Mike",
  description: "Executive brief for hiring Mike Yerke into Director+ RevOps and GTM systems leadership roles.",
  alternates: {
    canonical: "https://www.mikeyerke.com/hire"
  }
};

export default function HirePage() {
  return (
    <section>
      <h1>Executive Brief</h1>
      <p className="page-intro">
        For hiring teams evaluating Director+ scope across RevOps, GTM systems, and AI-enabled operations.
      </p>

      <article className="showcase-card">
        <p className="eyebrow">At A Glance</p>
        <h2>Operator-level execution with executive-level accountability.</h2>
        <p>
          I design and operationalize GTM systems that translate strategy into measurable execution: clearer
          signal, tighter handoffs, stronger forecasting, and teams that can sustain the model.
        </p>
        <div className="impact-grid">
          <article className="impact-card">
            <p className="meta">Scope</p>
            <h3>Cross-functional revenue systems</h3>
            <p>Marketing, Sales, CS, and leadership cadences connected through one operating model.</p>
          </article>
          <article className="impact-card">
            <p className="meta">Execution Mode</p>
            <h3>Builder + systems architect</h3>
            <p>Hands-on build depth paired with governance, change management, and enablement rigor.</p>
          </article>
          <article className="impact-card">
            <p className="meta">Business Focus</p>
            <h3>Outcome-oriented execution</h3>
            <p>Operating decisions grounded in throughput, confidence, and efficiency metrics.</p>
          </article>
        </div>
        <div className="link-row">
          <Link className="btn btn-primary" href="/contact">
            Schedule Intro
          </Link>
          <Link className="btn btn-secondary" href="/mike-yerke-resume.pdf" target="_blank" rel="noreferrer">
            Resume PDF
          </Link>
          <Link className="btn btn-secondary" href="/artifacts">
            Artifacts
          </Link>
        </div>
      </article>

      <VerifiedOutcomesBoard compact title="Outcome Evidence" />

      <section>
        <div className="section-header">
          <h2>Role-Specific Tracks</h2>
        </div>
        <div className="track-grid">
          {hireTracks.map((track) => (
            <article className="list-item" key={track.slug}>
              <p className="meta">{track.label}</p>
              <h3>{track.title}</h3>
              <p>{track.description}</p>
              <div className="link-row">
                <Link className="btn btn-secondary" href={`/hire/${track.slug}`}>
                  View Track Brief
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>Flagship Artifacts</h2>
          <Link href="/artifacts">Open Artifacts Hub</Link>
        </div>
        <div className="artifact-grid">
          <article className="list-item">
            <h3>Forecast Inspection Scorecard</h3>
            <p>Criteria for confidence review and coaching escalation in forecast calls.</p>
          </article>
          <article className="list-item">
            <h3>AI Operations Governance Canvas</h3>
            <p>Control model for introducing AI into GTM workflows without operational debt.</p>
          </article>
          <article className="list-item">
            <h3>90-Day RevOps Transition Plan</h3>
            <p>Blueprint for stabilizing then scaling GTM execution architecture.</p>
          </article>
        </div>
      </section>

      <VideoWalkthrough
        title="Optional 2-minute walkthrough"
        description="If available, this gives hiring panels a fast overview of strategy, implementation depth, and communication style."
        ctaLabel="Back To Executive Brief"
      />

      <SocialProofPanel />

      <section className="list-stack">
        <article className="list-item">
          <h2>What Happens Next</h2>
          <p>
            Share role context and mandate scope via the contact page. I respond with a tailored fit read and
            first-pass operating hypothesis.
          </p>
          <div className="readiness-list">
            <p>
              <strong>Within 24h:</strong> Initial fit signal and suggested conversation path.
            </p>
            <p>
              <strong>Before first call:</strong> Relevant case-study path and artifact shortlist.
            </p>
            <p>
              <strong>After first call:</strong> Role-specific 90-day point of view if there is alignment.
            </p>
          </div>
        </article>
      </section>
    </section>
  );
}
