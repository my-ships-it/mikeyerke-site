---
title: "Slack to Jira Triage Bot"
date: "2026-03-20"
summary: "Automated inbound issue capture and triage flow from Slack into structured Jira tickets."
tags: ["Automation", "Slack", "Jira", "Ops"]
featured: true
coverImage: "/projects/slack-to-jira-triage-bot/cover.svg"
visuals:
  - src: "/projects/slack-to-jira-triage-bot/cover.svg"
    alt: "Slack to Jira triage dashboard view with flow cards and impact metrics."
    caption: "High-level control surface showing intake flow and throughput outcomes."
  - src: "/projects/slack-to-jira-triage-bot/workflow.svg"
    alt: "Routing decision workflow from payload capture to owner assignment."
    caption: "Routing logic converted unstructured requests into deterministic owner assignment."
repo: "https://github.com/my-ships-it"
demo: "https://mikeyerke.com"
role: "Systems Architect + Builder"
timeline: "4 weeks"
team: "RevOps + Engineering"
stakeholders:
  - "RevOps lead defining intake policy and triage standards"
  - "Engineering managers owning downstream queue quality"
  - "Individual contributors submitting issues through Slack"
tradeoffs:
  - "Balanced strict intake requirements against submission speed"
  - "Chose deterministic routing over flexible but ambiguous tagging"
  - "Limited first release scope to highest-volume issue types"
governance:
  - "Defined escalation rules for unresolved routing exceptions"
  - "Documented ownership boundaries between ops and engineering"
  - "Established ticket-quality audit checks in weekly review"
rollout:
  - "Piloted with one engineering pod before org-wide rollout"
  - "Added onboarding guidance directly in Slack submission flow"
  - "Iterated routing logic based on first two weeks of usage data"
adoption:
  - "Tracked usage and template completion by reporting team"
  - "Published before-and-after intake examples for contributors"
  - "Added feedback loop for triage edge cases and rule updates"
before:
  - "Issue reports arrived in unstructured Slack threads with missing context."
  - "Triage quality depended on whoever happened to see the message first."
  - "Engineering intake meetings spent time translating messages into ticket format."
after:
  - "Slack form capture normalized issue payloads before ticket creation."
  - "Priority, owner, and component routing were assigned with deterministic rules."
  - "Jira ticket quality improved with required context and linked source conversation."
impact:
  - label: "Intake Speed"
    value: "2.4x faster triage"
    detail: "Reduced time from report to routed ticket."
  - label: "Data Quality"
    value: "90% required fields"
    detail: "Consistent issue templates before ticket creation."
  - label: "Team Efficiency"
    value: "Fewer manual handoffs"
    detail: "Ops and engineering regained focus for higher-value work."
---

Built a lightweight intake bot that turns unstructured Slack reports into standardized Jira issues.

## Impact

- Reduced issue intake latency
- Standardized required fields before ticket creation
- Improved routing to correct engineering owners

## Stack

Node.js, Slack API, Jira API, and rule-based categorization.
