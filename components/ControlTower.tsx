"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Outcome = {
  label: string;
  value: string;
  detail: string;
};

type Scenario = {
  id: string;
  label: string;
  challenge: string;
  signal: string;
  playbook: string[];
  systems: string[];
  outcomes: Outcome[];
  artifact: string;
};

const scenarios: Scenario[] = [
  {
    id: "pipeline",
    label: "Pipeline Health",
    challenge: "Forecast meetings drift into opinion battles because risk signals are inconsistent.",
    signal: "Coverage looked fine, but aging and slippage broke confidence late in quarter.",
    playbook: [
      "Establish one inspection layer with hard qualification criteria by stage.",
      "Define red-flag rules for aging, next step hygiene, and owner accountability.",
      "Roll out manager workflows that turn red flags into coaching actions."
    ],
    systems: ["CRM stage controls", "Risk scoring model", "Leadership review dashboard"],
    outcomes: [
      { label: "Review Velocity", value: "Faster weekly cadence", detail: "Less prep, sharper decisions." },
      { label: "Forecast Confidence", value: "Higher signal consistency", detail: "One lens across leaders." },
      { label: "Execution", value: "Clear owner actions", detail: "Every exception has an accountable follow-up." }
    ],
    artifact: "Forecast Quality Dashboard"
  },
  {
    id: "routing",
    label: "Lead Routing",
    challenge: "Inbound leads stall because triage and ownership are unclear across teams.",
    signal: "High-intent leads were present, but SLA misses and bad handoffs suppressed conversion.",
    playbook: [
      "Normalize lead intake fields before a record enters the routing layer.",
      "Apply deterministic routing rules tied to territory, capacity, and segment.",
      "Automate fallback escalation when SLA thresholds are breached."
    ],
    systems: ["Form + enrichment gate", "Routing rules engine", "SLA breach alerting"],
    outcomes: [
      { label: "Speed-To-Owner", value: "Lower response latency", detail: "Fewer leads waiting in queue." },
      { label: "Conversion Lift", value: "Higher meeting rate", detail: "Qualified leads reach the right rep faster." },
      { label: "Data Integrity", value: "Cleaner attribution", detail: "Better reporting from first touch to meeting." }
    ],
    artifact: "Slack to Jira Triage Bot"
  },
  {
    id: "expansion",
    label: "Expansion Motion",
    challenge: "Upsell and renewal opportunities get missed because customer signals stay fragmented.",
    signal: "CS insights existed, but no shared mechanism converted them into coordinated revenue plays.",
    playbook: [
      "Unify product usage, ticket volume, and lifecycle markers into a health layer.",
      "Define expansion and risk thresholds that automatically create owner tasks.",
      "Link CS and account planning to one expansion forecast view."
    ],
    systems: ["Health score pipeline", "Task orchestration layer", "Expansion forecast view"],
    outcomes: [
      { label: "Coverage", value: "More visible opportunities", detail: "Signal-to-action loop is explicit." },
      { label: "Coordination", value: "Cleaner handoffs", detail: "CS and account teams work one motion." },
      { label: "Predictability", value: "Stronger renewal narrative", detail: "Leadership sees risk and upside earlier." }
    ],
    artifact: "Expansion Signal Architecture"
  }
];

export function ControlTower() {
  const [activeScenarioId, setActiveScenarioId] = useState(scenarios[0].id);
  const [activeView, setActiveView] = useState<"playbook" | "systems" | "outcomes">("playbook");

  const scenario = useMemo(
    () => scenarios.find((item) => item.id === activeScenarioId) ?? scenarios[0],
    [activeScenarioId]
  );

  const panelTitle =
    activeView === "playbook"
      ? "Execution Playbook"
      : activeView === "systems"
      ? "System Design"
      : "Business Outcomes";

  return (
    <section className="control-tower">
      <div className="section-header">
        <h2>GTM Control Tower</h2>
        <Link href="/hire">Recruiter Quick View</Link>
      </div>
      <p className="page-intro">
        Select a scenario to inspect how I diagnose operational failure, design systems, and drive measurable
        execution.
      </p>

      <div className="tower-scenario-list" role="tablist" aria-label="Control tower scenarios">
        {scenarios.map((item) => (
          <button
            aria-selected={item.id === scenario.id}
            className={`tower-scenario ${item.id === scenario.id ? "is-active" : ""}`}
            key={item.id}
            onClick={() => {
              setActiveScenarioId(item.id);
              setActiveView("playbook");
            }}
            role="tab"
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="tower-grid">
        <article className="tower-panel">
          <p className="meta">Operational Challenge</p>
          <h3>{scenario.label}</h3>
          <p>{scenario.challenge}</p>
          <p className="tower-signal">Signal: {scenario.signal}</p>

          <div className="tower-view-list" role="tablist" aria-label="Control tower views">
            <button
              aria-selected={activeView === "playbook"}
              className={`tower-view ${activeView === "playbook" ? "is-active" : ""}`}
              onClick={() => setActiveView("playbook")}
              role="tab"
              type="button"
            >
              Playbook
            </button>
            <button
              aria-selected={activeView === "systems"}
              className={`tower-view ${activeView === "systems" ? "is-active" : ""}`}
              onClick={() => setActiveView("systems")}
              role="tab"
              type="button"
            >
              System Design
            </button>
            <button
              aria-selected={activeView === "outcomes"}
              className={`tower-view ${activeView === "outcomes" ? "is-active" : ""}`}
              onClick={() => setActiveView("outcomes")}
              role="tab"
              type="button"
            >
              Outcomes
            </button>
          </div>

          <div className="tower-content">
            <p className="meta">{panelTitle}</p>
            {activeView === "playbook" ? (
              <ul>
                {scenario.playbook.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            ) : null}

            {activeView === "systems" ? (
              <div className="tower-stack">
                {scenario.systems.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            ) : null}

            {activeView === "outcomes" ? (
              <div className="tower-outcomes">
                {scenario.outcomes.map((outcome) => (
                  <article className="tower-outcome" key={outcome.label}>
                    <p className="meta">{outcome.label}</p>
                    <h4>{outcome.value}</h4>
                    <p>{outcome.detail}</p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </article>

        <aside className="tower-side">
          <p className="meta">Representative Build</p>
          <h3>{scenario.artifact}</h3>
          <p>
            This scenario maps to real work on this site. Browse the case study details or jump to the
            recruiter view for the condensed fit summary.
          </p>
          <div className="link-row">
            <Link className="btn btn-primary" href="/projects">
              Case Studies
            </Link>
            <Link className="btn btn-secondary" href="/hire">
              2-Minute Fit
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
