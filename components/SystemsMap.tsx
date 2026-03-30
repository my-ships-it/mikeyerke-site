"use client";

import { useMemo, useState } from "react";

type MapNode = {
  stage: string;
  owner: string;
  stack: string;
};

type Scenario = {
  id: string;
  label: string;
  description: string;
  nodes: MapNode[];
};

const scenarios: Scenario[] = [
  {
    id: "lead-flow",
    label: "Lead To Meeting",
    description: "Intake, enrichment, qualification, and routing into the right rep pod.",
    nodes: [
      { stage: "Signal Intake", owner: "Marketing Ops", stack: "Forms + Attribution + CRM Sync" },
      { stage: "AI Enrichment", owner: "RevOps", stack: "Firmographic + Intent + Scoring" },
      { stage: "Routing Logic", owner: "Sales Ops", stack: "Territory + Capacity + SLA Guardrails" },
      { stage: "Meeting Handoff", owner: "AEs + SDRs", stack: "Context Pack + Sequence Trigger" }
    ]
  },
  {
    id: "forecast",
    label: "Forecast Integrity",
    description: "A repeatable inspection layer for deal quality and confidence scoring.",
    nodes: [
      { stage: "Pipeline Capture", owner: "Sales", stack: "Stage Rules + Required Fields" },
      { stage: "Risk Detection", owner: "RevOps", stack: "Aging + Slippage + Missing Criteria" },
      { stage: "Narrative Layer", owner: "Leaders", stack: "Exception Notes + Coaching Flags" },
      { stage: "Forecast Ops", owner: "Exec Team", stack: "Confidence Bands + Scenario Views" }
    ]
  },
  {
    id: "expansion",
    label: "Expansion Motion",
    description: "Customer signal to renewal and upsell opportunities with ownership clarity.",
    nodes: [
      { stage: "Health Signals", owner: "CS Ops", stack: "Product Usage + Support Trends" },
      { stage: "Opportunity Scoring", owner: "RevOps", stack: "Playbooks + Threshold Rules" },
      { stage: "Plays + Tasks", owner: "CSM Team", stack: "Automated Plan + Owner Routing" },
      { stage: "Revenue Conversion", owner: "Account Team", stack: "Expansion Pipeline + Forecast Link" }
    ]
  }
];

export function SystemsMap() {
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const activeScenario = useMemo(
    () => scenarios.find((scenario) => scenario.id === activeId) ?? scenarios[0],
    [activeId]
  );

  return (
    <section className="systems-map">
      <div className="section-header">
        <h2>Interactive Systems Map</h2>
      </div>
      <p className="page-intro">
        A lightweight view of how I design workflows from signal capture through execution and revenue outcomes.
      </p>

      <div className="systems-tabs" role="tablist" aria-label="Systems map scenarios">
        {scenarios.map((scenario) => (
          <button
            aria-selected={activeScenario.id === scenario.id}
            className={`systems-tab ${activeScenario.id === scenario.id ? "is-active" : ""}`}
            key={scenario.id}
            onClick={() => setActiveId(scenario.id)}
            role="tab"
            type="button"
          >
            {scenario.label}
          </button>
        ))}
      </div>

      <article className="systems-board">
        <p className="meta">Scenario</p>
        <h3>{activeScenario.label}</h3>
        <p>{activeScenario.description}</p>

        <div className="systems-flow" role="list">
          {activeScenario.nodes.map((node, index) => (
            <div className="systems-node" key={node.stage} role="listitem">
              <p className="meta">Stage {index + 1}</p>
              <h4>{node.stage}</h4>
              <p>{node.owner}</p>
              <p className="stack-label">{node.stack}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
