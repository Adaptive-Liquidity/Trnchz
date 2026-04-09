---
name: solana-indexer-reconciliation
description: Event ingestion, replay, idempotency, and rebuild for the Holder v. Holder read model.
---

# Skill: solana-indexer-reconciliation

## When to use

- Building or changing **indexer** subscription, decoding, schema, or APIs.

## Why it exists

The UI depends on fast reads; **correctness** depends on **replayable** projections that never invent state.

## Required inputs

- IDL + event layout; program deployment slot range
- DB migration strategy; cursor storage (slot/signature)

## Exact procedure

1. Define **idempotency key** (e.g. `signature + ix_index + event_index`).
2. Implement ingest path writing idempotent rows.
3. Implement **replay** from cursor to tip; verify counts vs spot-check RPC accounts.
4. On schema change: document **rebuild** from slot X in `docs/runbooks/indexer-replay.md`.
5. Add health: lag slots, last processed signature.

## Guardrails

- No API that finalizes arenas or pays winners
- Log redaction for RPC URLs containing keys

## Failure conditions

- Duplicate rows on reprocessing same signature
- “Latest” query returns stale without indication

## Done criteria

- Rebuild procedure executed once in dev; documented
- Mismatch detection playbook referenced in runbook

## Output template

`Cursor strategy | Idempotency key | Tables | Replay command | Health metrics`.
