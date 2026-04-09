# Runbook — Indexer replay and rebuild

## When to use

- Subscription disconnects, suspected missed events, or DB corruption.
- After deploy of indexer code that changes decoders or schema.

## Preconditions

- RPC endpoint with **HTTP** and **WebSocket** access.
- Database credentials and migration path for the indexer schema.
- Last processed **slot** and/or **signature** cursor stored durably (see indexer implementation).

## Procedure

1. **Pause** ingestion if needed (stop indexer process or enable read-only mode if supported).
2. **Record** current `latest` slot from RPC for comparison.
3. **Choose** rebuild strategy:
   - **Forward replay**: from last good cursor to latest (gap fill).
   - **Full rebuild**: truncate projection tables (or snapshot restore) and replay from genesis of program deployment or known start slot.
4. **Run** indexer replay job (implementation-specific command).
5. **Verify** row counts and sample hashes: compare a sample of arena accounts to RPC `getAccountInfo` or decoded state.
6. **Resume** live subscriptions.

## Idempotency

- Reprocessing the same chain events must not duplicate business rows; use idempotency keys from `docs/specs/invariants.md`.

## Failure modes

- **Decoder mismatch**: Fix code, bump version, rebuild from last compatible slot.
- **RPC rate limits**: backoff, rotate endpoint, or use paid tier.

## Escalation

- If chain and DB disagree after rebuild: treat **chain** as correct; open incident note per `ops/cursor/skills/incident-runbook/`.
