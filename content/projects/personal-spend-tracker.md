---
title: "Personal Spend Tracker"
date: "2026-02-14"
summary: "A simple app for monthly spend visibility and category-level trend analysis."
tags: ["Finance", "App", "Analytics"]
featured: false
coverImage: "/projects/personal-spend-tracker/cover.svg"
visuals:
  - src: "/projects/personal-spend-tracker/cover.svg"
    alt: "Personal spend tracker screen showing monthly trend and budget status cards."
    caption: "Primary dashboard with trend line, budget pacing, and drift indicators."
  - src: "/projects/personal-spend-tracker/monthly-trend.svg"
    alt: "Category heatmap and monthly alert queue for spending behavior shifts."
    caption: "Category-level alerting view for early detection of spending pattern changes."
role: "Product Builder"
timeline: "2 weeks"
team: "Solo"
stakeholders:
  - "Primary end user requiring fast monthly budget clarity"
  - "Future collaborators reviewing product architecture decisions"
tradeoffs:
  - "Chose simple category model over complex multi-dimensional tagging"
  - "Prioritized fast trend visibility over deeper historical modeling"
  - "Used lightweight architecture to speed iteration and feedback loops"
governance:
  - "Defined naming conventions for categories and budget thresholds"
  - "Documented update path for adding new transaction sources"
  - "Set routine checks for data normalization consistency"
rollout:
  - "Released baseline dashboard before adding alert logic"
  - "Validated category mappings against manual monthly review"
  - "Iterated budget alerts based on actual usage patterns"
adoption:
  - "Integrated dashboard into regular monthly decision cadence"
  - "Captured friction points and translated them into product backlog"
  - "Used tool as sandbox for experimentation and feature velocity"
before:
  - "Monthly spend visibility lived across bank portals and CSV exports."
  - "Category budgeting required manual spreadsheet updates."
  - "No lightweight way to spot trend shifts early in the month."
after:
  - "Transactions were normalized into category-level dashboards."
  - "Budget thresholds generated clear month-to-date alerts."
  - "Trend view made spending behavior changes immediately visible."
impact:
  - label: "Decision Speed"
    value: "Same-day visibility"
    detail: "Monthly pacing decisions no longer waited for manual spreadsheet rollups."
    metric_period: "Personal usage, 3-month tracking window"
    baseline: "1-2 day lag to assemble spend view"
    delta: "Moved to same-day visibility"
    source_artifact_url: "/evidence/personal-spend-tracker/impact-audit.md"
    confidence_level: "medium"
  - label: "Consistency"
    value: "96% category coverage"
    detail: "Standardized category mapping improved month-over-month comparability."
    metric_period: "Personal usage, 3-month tracking window"
    baseline: "~61% transactions categorized on first pass"
    delta: "+35 pts first-pass categorization"
    source_artifact_url: "/evidence/personal-spend-tracker/impact-audit.md"
    confidence_level: "medium"
---

Built a utility app to categorize transactions, monitor budget thresholds, and chart monthly spending trends.

## Why it matters

Small internal tools sharpen product judgment and operating rigor. This project demonstrates end-to-end build speed, measurement discipline, and iterative product thinking in a low-risk sandbox.
