import type { Metadata } from "next";
import Link from "next/link";
import { VideoWalkthrough } from "@/components/VideoWalkthrough";
import { VerifiedOutcomesBoard } from "@/components/VerifiedOutcomesBoard";
import { SocialProofPanel } from "@/components/SocialProofPanel";
import { RecruiterJourney } from "@/components/RecruiterJourney";
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
        This page is designed for hiring managers and recruiting partners evaluating Director+ scope across
        RevOps, GTM systems, and AI-enabled operations.
      </p>

      <article className="showcase-card">
        <p className="eyebrow">Leadership Positioning</p>
        <h2>Operator-Level Execution With Executive-Level Accountability</h2>
        <p>
          I build and operationalize GTM systems that translate strategy into measurable execution: cleaner
          signal, tighter handoffs, stronger forecasting, and teams that can sustain the model.
        </p>
        <div className="impact-grid">
          <article className="impact-card">
            <p className="meta">Mandate Scope</p>
            <h3>Cross-Functional Revenue Operating Systems</h3>
            <p>Marketing, Sales, CS, and leadership cadences connected through one system design.</p>
          </article>
          <article className="impact-card">
            <p className="meta">Leadership Mode</p>
            <h3>Builder + Systems Architect</h3>
            <p>Hands-on build depth paired with governance, change management, and enablement rigor.</p>
          </article>
          <article className="impact-card">
            <p className="meta">Business Lens</p>
            <h3>Outcome-Oriented Execution</h3>
            <p>Operating decisions grounded in throughput, confidence, and efficiency metrics.</p>
          </article>
        </div>
        <div className="link-row">
          <Link className="btn btn-primary" href="/contact">
            Schedule Intro
          </Link>
          <Link className="btn btn-secondary" href="/mike-yerke-resume.pdf" target="_blank">
            Resume PDF
          </Link>
          <Link className="btn btn-secondary" href="/artifacts">
            Flagship Artifacts
          </Link>
        </div>
      </article>

      <VideoWalkthrough
        title="Walkthrough For Hiring Panels"
        description="A 2-minute walkthrough lets hiring teams quickly validate systems thinking, communication style, and execution depth."
        ctaLabel="Open Full Recruiter Track"
      />

      <RecruiterJourney
        intro="Fastest evaluator path: resume, one case study, then a focused intro call."
        placement="hire"
        title="2-Minute Evaluator Path"
      />

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
            <p>Executive-ready criteria for confidence review and coaching escalation.</p>
          </article>
          <article className="list-item">
            <h3>AI Operations Governance Canvas</h3>
            <p>Control model for introducing AI into GTM workflows without creating operational debt.</p>
          </article>
          <article className="list-item">
            <h3>90-Day RevOps Transition Plan</h3>
            <p>Implementation blueprint for stabilizing and then scaling GTM execution architecture.</p>
          </article>
        </div>
      </section>

      <SocialProofPanel />

      <section className="list-stack">
        <article className="list-item">
          <h2>What Happens Next</h2>
          <p>
            Share role context and mandate scope via the contact page. I reply with a tailored operating
            hypothesis and fit signal.
          </p>
          <div className="readiness-list">
            <p>
              <strong>Within 24h:</strong> Reply with initial fit and suggested conversation path.
            </p>
            <p>
              <strong>Before first call:</strong> Provide relevant case-study path and artifact shortlist.
            </p>
            <p>
              <strong>After first call:</strong> Share role-specific 90-day point of view if there is alignment.
            </p>
          </div>
        </article>
      </section>
    </section>
  );
}
