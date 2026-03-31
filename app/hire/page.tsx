import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hire Mike",
  description: "Recruiter-friendly summary of Mike Yerke's strengths, outcomes, and links."
};

export default function HirePage() {
  return (
    <section>
      <h1>Recruiter Quick View</h1>
      <p className="page-intro">
        If you have 2 minutes, this gives you the fastest read on role fit for RevOps, GTM systems, and
        AI-enabled operations leadership.
      </p>

      <article className="showcase-card">
        <p className="eyebrow">What You Are Hiring</p>
        <h2>An Operator Who Can Architect and Ship</h2>
        <p>
          I turn GTM ambiguity into clear execution systems: shared metrics, cleaner handoffs, and automation
          teams trust enough to adopt.
        </p>
        <div className="link-row">
          <Link className="btn btn-primary" href="/contact">
            Book Intro Conversation
          </Link>
          <Link className="btn btn-secondary" href="/mike-yerke-resume.pdf" target="_blank">
            Resume PDF
          </Link>
        </div>
      </article>

      <div className="impact-grid">
        <article className="impact-card">
          <p className="meta">Best Fit Scope</p>
          <h2>Director+ Mandates</h2>
          <p>RevOps and GTM systems ownership with cross-functional execution responsibility.</p>
        </article>
        <article className="impact-card">
          <p className="meta">Operating Style</p>
          <h2>Builder-Leader</h2>
          <p>Strategic framing plus hands-on implementation in the tooling and process layer.</p>
        </article>
        <article className="impact-card">
          <p className="meta">Outcome Lens</p>
          <h2>Measurable Lift</h2>
          <p>Execution tied to cycle-time reduction, cleaner signal, and higher forecast confidence.</p>
        </article>
      </div>

      <div className="list-stack">
        <article className="list-item">
          <h2>Proof Path</h2>
          <div className="link-row">
            <Link className="btn btn-primary" href="/resume">
              Download Resume
            </Link>
            <Link className="btn btn-secondary" href="/projects">
              Case Studies
            </Link>
            <Link className="btn btn-secondary" href="/blog">
              Writing + POV
            </Link>
          </div>
        </article>

        <article className="list-item">
          <h2>90-Day Value Plan</h2>
          <div className="readiness-list">
            <p>
              <strong>Days 1-30:</strong> Audit pipeline signal quality, ownership maps, and process friction.
            </p>
            <p>
              <strong>Days 31-60:</strong> Stand up priority workflow architecture and early automation wins.
            </p>
            <p>
              <strong>Days 61-90:</strong> Operationalize dashboards, governance, and manager enablement loops.
            </p>
          </div>
        </article>

        <article className="list-item">
          <h2>Open To Roles</h2>
          <p>
            Open to Director and Head-level opportunities across RevOps, GTM Systems, and AI operations
            leadership.
          </p>
          <div className="link-row">
            <Link className="btn btn-primary" href="/contact">
              Start The Conversation
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
