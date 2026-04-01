"use client";

import { useState } from "react";

type Milestone = {
  id: string;
  phase: string;
  title: string;
  summary: string;
  bullets: string[];
};

const milestones: Milestone[] = [
  {
    id: "box",
    phase: "2017-2019",
    title: "Box | Sales Development Foundation",
    summary: "Started in hands-on outbound execution and team leadership in enterprise SaaS.",
    bullets: [
      "Built $2.7M pipeline and $1.4M ARR while qualifying 570 enterprise opportunities.",
      "Led all outbound reps in Q3 FY19 pipeline attainment at $1.1M.",
      "Scaled team adoption of LinkedIn Sales Navigator and consistent outbound messaging."
    ]
  },
  {
    id: "uipath-revops",
    phase: "2020-2022",
    title: "UiPath | RevOps Program To GTM Manager",
    summary: "Moved from program execution into owning GTM systems strategy and operations.",
    bullets: [
      "Implemented core GTM tooling (Gong, ZoomInfo, TechTarget) and improved sales productivity.",
      "Increased qualified opportunities by 34% and reduced lead-to-follow-up time by 55%.",
      "Improved SAL conversion by 16% via standardized process and web-form automation."
    ]
  },
  {
    id: "uipath-senior",
    phase: "2022-2024",
    title: "UiPath | Senior Manager, GTM Technology",
    summary: "Led global GTM systems ownership, operating governance, and cross-functional execution.",
    bullets: [
      "Managed a $3M GTM technology stack and reduced spend by $720K through consolidation.",
      "Generated $18M net new pipeline with an automated competitive take-out campaign.",
      "Reduced user access tickets by 52% and improved rep productivity by 18%."
    ]
  },
  {
    id: "current",
    phase: "2024-Present",
    title: "Current Chapter",
    summary: "Focused on GTM systems and AI-enabled operations in enterprise SaaS.",
    bullets: [
      "Building next-level operating systems that connect strategy to frontline execution.",
      "Developing artifact-driven frameworks for forecasting, routing, and lifecycle governance.",
      "Confluent-specific outcomes are intentionally excluded here until finalized for publication."
    ]
  }
];

export function CareerTimeline() {
  const [activeId, setActiveId] = useState(milestones[0].id);
  const activeMilestone = milestones.find((milestone) => milestone.id === activeId) ?? milestones[0];

  return (
    <section className="timeline-shell">
      <div className="section-header">
        <h2>Career Timeline</h2>
      </div>

      <div className="timeline-tabs" role="tablist" aria-label="Career milestones">
        {milestones.map((milestone) => (
          <button
            aria-selected={activeMilestone.id === milestone.id}
            className={`timeline-tab ${activeMilestone.id === milestone.id ? "is-active" : ""}`}
            key={milestone.id}
            onClick={() => setActiveId(milestone.id)}
            role="tab"
            type="button"
          >
            {milestone.phase}
          </button>
        ))}
      </div>

      <article className="timeline-panel">
        <p className="meta">{activeMilestone.phase}</p>
        <h3>{activeMilestone.title}</h3>
        <p>{activeMilestone.summary}</p>
        <ul>
          {activeMilestone.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}
