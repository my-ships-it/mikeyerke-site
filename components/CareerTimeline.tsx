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
    id: "foundation",
    phase: "Phase 1",
    title: "Ops Foundation",
    summary: "Built deep operator intuition for how revenue teams actually execute day-to-day.",
    bullets: [
      "Created practical process frameworks used by cross-functional teams.",
      "Focused on reducing handoff friction and role ambiguity.",
      "Developed pattern recognition for what breaks scaling motions."
    ]
  },
  {
    id: "systems",
    phase: "Phase 2",
    title: "Systems Leadership",
    summary: "Shifted from process owner to systems architect across the GTM lifecycle.",
    bullets: [
      "Designed RevOps operating models tied to business outcomes.",
      "Implemented workflow automation with explicit control layers.",
      "Enabled teams with documentation and adoption playbooks."
    ]
  },
  {
    id: "ai",
    phase: "Phase 3",
    title: "AI Enablement",
    summary: "Integrated AI into production workflows with governance and reliability in mind.",
    bullets: [
      "Established AI-assisted execution patterns in GTM operations.",
      "Connected enrichment, scoring, and routing into one signal pipeline.",
      "Balanced speed-to-value with maintainability and observability."
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
