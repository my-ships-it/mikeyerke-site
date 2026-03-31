export type HireTrack = {
  slug: string;
  label: string;
  title: string;
  description: string;
  idealFor: string[];
  mandateFocus: string[];
  outcomesFocus: string[];
  firstNinetyDays: string[];
};

export const hireTracks: HireTrack[] = [
  {
    slug: "revops-director",
    label: "RevOps Director",
    title: "Director of Revenue Operations",
    description:
      "For teams that need tighter forecasting discipline, cleaner process governance, and cross-functional revenue execution.",
    idealFor: [
      "Post-Series B to enterprise SaaS organizations scaling sales complexity",
      "Teams with fragmented pipeline governance across segment or region",
      "Leaders seeking stronger forecast confidence without slowing sellers"
    ],
    mandateFocus: [
      "Design one operating system across Marketing, Sales, and Customer Success",
      "Standardize stage governance, data quality, and handoff accountability",
      "Build executive-ready performance and risk inspection cadences"
    ],
    outcomesFocus: [
      "Higher forecast confidence through consistent inspection criteria",
      "Lower cycle-time friction from clearer ownership and routing",
      "Better signal quality for leadership planning and resource decisions"
    ],
    firstNinetyDays: [
      "Day 0-30: Audit system debt, forecast leakage, and accountability gaps",
      "Day 31-60: Deploy priority architecture changes and manager workflows",
      "Day 61-90: Lock in governance rhythms and measurable adoption benchmarks"
    ]
  },
  {
    slug: "head-of-gtm-systems",
    label: "Head of GTM Systems",
    title: "Head of GTM Systems",
    description:
      "For organizations that want a senior owner of GTM tooling strategy, architecture standards, and scalable automation.",
    idealFor: [
      "Companies with expanding GTM stack and uneven adoption across teams",
      "Environments with high volume routing, enrichment, and lifecycle complexity",
      "Leaders who need technical depth plus operating pragmatism"
    ],
    mandateFocus: [
      "Set architecture standards for data flow, ownership, and controls",
      "Reduce operational risk from brittle point-to-point automations",
      "Accelerate time-to-value for new GTM workflows and AI initiatives"
    ],
    outcomesFocus: [
      "A durable systems backbone that survives growth and org changes",
      "Less time spent on break-fix and more on strategic improvement",
      "Faster launch velocity with tighter observability and governance"
    ],
    firstNinetyDays: [
      "Day 0-30: Map stack topology, dependencies, and critical failure points",
      "Day 31-60: Prioritize high-leverage architecture upgrades and guardrails",
      "Day 61-90: Operationalize build standards, ownership model, and roadmap"
    ]
  },
  {
    slug: "fractional",
    label: "Fractional RevOps",
    title: "Fractional RevOps and GTM Systems Lead",
    description:
      "For teams that need senior systems leadership immediately without waiting for a full-time executive search cycle.",
    idealFor: [
      "Founder-led and lean leadership teams that need immediate execution",
      "Organizations preparing for major GTM process or tooling transitions",
      "Teams that need strategic direction and hands-on build support"
    ],
    mandateFocus: [
      "Stabilize critical workflows and establish short-term operating confidence",
      "Stand up practical governance with lightweight documentation and controls",
      "Deliver fast wins while building toward long-term architecture quality"
    ],
    outcomesFocus: [
      "Immediate risk reduction in core revenue workflows",
      "Visible execution wins in weeks, not quarters",
      "Clear operating playbook for eventual full-time handoff"
    ],
    firstNinetyDays: [
      "Day 0-30: Stabilize priority workflows and immediate revenue risk points",
      "Day 31-60: Launch targeted improvements with measurable impact tracking",
      "Day 61-90: Transfer operating model, artifacts, and ownership handoff"
    ]
  }
];

export function getHireTrackBySlug(slug: string): HireTrack | null {
  return hireTracks.find((track) => track.slug === slug) ?? null;
}
