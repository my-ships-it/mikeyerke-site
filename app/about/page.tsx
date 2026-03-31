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
        I operate at the intersection of GTM systems, AI enablement, and revenue operations. My work is about
        turning messy cross-functional workflows into clear, scalable operating systems.
      </p>

      <div className="list-stack">
        <article className="list-item">
          <h2>What I Optimize For</h2>
          <p>
            Better decision signal, faster execution cycles, and systems that teams trust enough to adopt.
          </p>
        </article>

        <article className="list-item">
          <h2>Core Areas</h2>
          <p>RevOps architecture, AI workflow design, lifecycle automation, and GTM tooling strategy.</p>
        </article>

        <article className="list-item">
          <h2>How I Work</h2>
          <p>
            I pair strategic framing with operator-level execution. The goal is measurable business lift, not
            just shipping tools.
          </p>
        </article>
      </div>

      <CareerTimeline />
    </section>
  );
}
