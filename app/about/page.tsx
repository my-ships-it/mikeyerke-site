import type { Metadata } from "next";
import { CareerTimeline } from "@/components/CareerTimeline";

export const metadata: Metadata = {
  title: "About",
  description: "Background and operating philosophy of Mike Yerke."
};

export default function AboutPage() {
  return (
    <section>
      <h1>About</h1>
      <p className="page-intro">
        I work at the intersection of GTM systems, AI enablement, and RevOps. My focus is turning messy
        cross-functional workflows into simple systems teams can actually run.
      </p>

      <div className="list-stack">
        <article className="list-item">
          <h2>What I Optimize For</h2>
          <p>Clear ownership, faster decision cycles, and systems teams trust enough to adopt.</p>
        </article>

        <article className="list-item">
          <h2>Core Areas</h2>
          <p>RevOps architecture, AI workflow design, lifecycle automation, and GTM tooling strategy.</p>
        </article>

        <article className="list-item">
          <h2>How I Work</h2>
          <p>
            I combine strategic framing with hands-on execution. The goal is measurable business lift, not just
            shipping tools.
          </p>
        </article>
      </div>

      <CareerTimeline />
    </section>
  );
}
