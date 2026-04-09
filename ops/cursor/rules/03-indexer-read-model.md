# Rule: Indexer and read model

## Truth model

- **Chain state and program accounts are authoritative.**
- **Postgres (or any DB) and HTTP APIs are projections** — caches for querying and UX, not sources of settlement truth.

## Indexer responsibilities

- Subscribe via WebSocket (`logsSubscribe`, `programSubscribe`, `accountSubscribe` as needed) and/or poll reconciliation.
- **Decode** Anchor events and account layouts; persist **idempotent** rows keyed by `(signature, instruction_index, event_index)` or an equally strict idempotency key.
- On startup or reconnect: **replay** from last processed slot/signature; **gap-fill** after disconnect.
- Expose **read-only** HTTP APIs for lists, detail, positions, events — **no** endpoints that move funds, finalize winners, or adjudicate.

## Forbidden

- Offchain winner selection or payout execution.
- Treating DB as canonical when it disagrees with chain (fix **projection**, not chain).
- Hidden “reconciliation” that mutates user balances without matching onchain instructions.
