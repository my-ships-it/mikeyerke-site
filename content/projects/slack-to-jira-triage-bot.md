---
title: "Slack to Jira Triage Bot"
date: "2026-03-20"
summary: "Automated inbound issue capture and triage flow from Slack into structured Jira tickets."
tags: ["Automation", "Slack", "Jira", "Ops"]
featured: true
repo: "https://github.com/my-ships-it"
demo: "https://mikeyerke.com"
role: "Systems Architect + Builder"
timeline: "4 weeks"
team: "RevOps + Engineering"
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
