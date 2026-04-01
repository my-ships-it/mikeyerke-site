"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";

type RecruiterJourneyProps = {
  placement: "home" | "hire";
  title?: string;
  intro?: string;
};

const steps = [
  {
    id: "resume",
    label: "1. Review Resume",
    detail: "Start with scope and leadership narrative in under 90 seconds.",
    href: "/mike-yerke-resume.pdf",
    cta: "Open Resume",
    external: true
  },
  {
    id: "cases",
    label: "2. Validate Execution",
    detail: "Inspect two representative case studies with implementation detail.",
    href: "/projects/slack-to-jira-triage-bot",
    cta: "Open Lead Routing Case",
    external: false
  },
  {
    id: "intro",
    label: "3. Book Intro",
    detail: "Share role context and schedule a 30-minute fit conversation.",
    href: "/contact",
    cta: "Schedule Intro",
    external: false
  }
] as const;

export function RecruiterJourney({
  placement,
  title = "Recruiter Journey",
  intro = "Use this exact path for quick evaluation: resume, evidence, then intro call."
}: RecruiterJourneyProps) {
  return (
    <section className="journey-shell">
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      <p className="page-intro">{intro}</p>

      <div className="journey-grid">
        {steps.map((step) => (
          <article className="journey-card" key={step.id}>
            <p className="meta">{step.label}</p>
            <p>{step.detail}</p>
            <div className="link-row">
              <Link
                className="btn btn-primary"
                href={step.href}
                onClick={() => {
                  track("recruiter_journey_click", {
                    placement,
                    step: step.id,
                    destination: step.href
                  });
                }}
                rel={step.external ? "noreferrer" : undefined}
                target={step.external ? "_blank" : undefined}
              >
                {step.cta}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
