---
name: incident-runbook
description: Structured response for indexer lag, RPC failures, projection drift, and auth incidents.
---

# Skill: incident-runbook

## When to use

- When production/staging shows **wrong UI state**, **indexer lag**, **replay failure**, or **auth abuse** spikes.

## Why it exists

Panic edits **widen** incidents; a short template preserves **timeline** and **rollback** discipline.

## Required inputs

- Symptom, time range, affected users/arenas (hashes only)
- Metrics: indexer lag slots, error rate, RPC provider

## Exact procedure

1. Copy `templates/incident-note.md` to a **private** tracker or secure doc (not this repo if PII).
2. Classify: **indexer**, **RPC**, **program**, **UI**, **auth**.
3. Mitigate: failover RPC, pause dangerous UI flags, run replay per `docs/runbooks/indexer-replay.md`.
4. Post-incident: update runbooks and add tests/monitoring tickets.

## Guardrails

- Do not paste **session tokens** or **wallet addresses** of users into public GitHub issues without policy

## Failure conditions

- “Fixed” by manual DB edits that **diverge** from chain without rebuild plan

## Done criteria

- Incident closed with root cause and **follow-up tasks** owned

## Output template

Use `templates/incident-note.md` fields; link to metrics dashboards if any.
