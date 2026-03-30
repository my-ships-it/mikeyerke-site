import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Background and operating philosophy of Mike Yerke."
};

export default function AboutPage() {
  return (
    <section>
      <h1>About</h1>
      <p className="page-intro">
        I work at the intersection of GTM systems, AI enablement, and revenue operations. My focus is building
        reliable systems that reduce friction between Sales, Marketing, and Customer Success.
      </p>

      <div className="list-stack">
        <article className="list-item">
          <h2>What I Optimize For</h2>
          <p>
            Better signal in pipeline data, cleaner process handoffs, and automation that scales without creating
            hidden operational debt.
          </p>
        </article>

        <article className="list-item">
          <h2>Core Areas</h2>
          <p>RevOps architecture, AI workflow design, lifecycle automation, and GTM tooling strategy.</p>
        </article>

        <article className="list-item">
          <h2>How I Work</h2>
          <p>
            I prioritize systems that teams can actually adopt. The goal is measurable business outcomes, not just
            shipping shiny tools.
          </p>
        </article>
      </div>
    </section>
  );
}
