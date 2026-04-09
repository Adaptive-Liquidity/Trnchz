---
name: architecture-decision-records
description: Create ADRs for product-rule or architecture changes; enforce consequences and links.
---

# Skill: architecture-decision-records

## When to use

- Any change to game rules, account layouts, instruction sets, mint policy semantics, trust boundaries, or indexer/chain responsibilities.

## Why it exists

Holder v. Holder is safety-critical; **implicit** decisions become production bugs. ADRs make decisions **reviewable** and **linkable** from specs.

## Required inputs

- Problem statement and **options** considered (at least two)
- Impacted files: `docs/specs/*`, `programs/*`, indexer, SDK
- Orchestrator or spec-guardian request for ADR

## Exact procedure

1. Copy `templates/adr-template.md` to `docs/adr/ADR-NNNN-short-title.md` (next free number).
2. Fill: context, decision, alternatives, consequences, **invariants affected**, links to PRs/specs.
3. Update `docs/adr/README.md` index row.
4. If decision supersedes an older ADR, mark old ADR **Superseded** with pointer.

## Guardrails

- Do not record secrets, keys, or production URLs
- Do not use ADRs to bypass `AGENTS.md` non-negotiables without explicit **accepted** status and human approval

## Failure conditions

- ADR with no alternatives section
- Decision text that contradicts `docs/specs/invariants.md` without updating invariants in same change set

## Done criteria

- ADR is **Accepted** (or **Proposed** with explicit open questions listed)
- Specs cross-link to ADR where rules changed

## Output template

Use `templates/adr-template.md`; final output is the filled ADR file path.
