---
name: browser-e2e-regression
description: Smoke and regression checks for arena UX after meaningful changes.
---

# Skill: browser-e2e-regression

## When to use

- After changes to **wallet flows**, **arena pages**, **admin**, or **auth**; before release candidates.

## Why it exists

Money UX regressions are **credibility** failures; catch them before users.

## Required inputs

- Base URL (local/staging); devnet wallet setup notes
- List of **must-pass** flows from orchestrator

## Exact procedure

1. Connect wallet; verify network matches intended cluster.
2. Browse arenas; open detail; verify data from **indexer** (not hardcoded).
3. Join → leave recruiting → (when available) full seat activation path.
4. Surrender, finalize (third-party trigger if needed), claim — as applicable on env.
5. Admin: mint policy + create arena — smoke only if role available.
6. A11y: tab to primary buttons; check labels on forms.
7. Log defects with **severity** and **repro**.

## Guardrails

- No destructive tests on mainnet without explicit approval

## Failure conditions

- Claim marked success without confirmation path
- Using mock data interleaved with real APIs without banner

## Done criteria

- Pass/fail matrix attached to handoff; blocking issues filed

## Output template

| Flow | Pass/Fail | Notes | Screenshot ref |
