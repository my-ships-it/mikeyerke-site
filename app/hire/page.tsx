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
        If you have 2 minutes, this page gives you the fastest way to evaluate fit for RevOps and GTM systems
        leadership roles.
      </p>

      <div className="impact-grid">
        <article className="impact-card">
          <p className="meta">Core Strength</p>
          <h2>Systems Leadership</h2>
          <p>Cross-functional operating design across Sales, Marketing, and CS workflows.</p>
        </article>
        <article className="impact-card">
          <p className="meta">Builder Skillset</p>
          <h2>AI + Automation</h2>
          <p>Hands-on delivery of workflow automation with strong controls and adoption focus.</p>
        </article>
        <article className="impact-card">
          <p className="meta">Business Lens</p>
          <h2>Revenue Outcomes</h2>
          <p>Execution tied to conversion lift, cycle-time reduction, and forecast confidence.</p>
        </article>
      </div>

      <div className="list-stack">
        <article className="list-item">
          <h2>Best Links To Review</h2>
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
          <h2>Open Roles</h2>
          <p>
            Open to Director/Head-level roles in RevOps, GTM Systems, and AI-enabled operations leadership.
          </p>
          <div className="link-row">
            <Link className="btn btn-primary" href="/contact">
              Start Conversation
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
