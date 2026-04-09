# ADR-001 — Platform charter and trust model

## Status

Accepted

## Context

Holder v. Holder is a **money-adjacent** Solana application: users lock tokens and USDC under program rules. Wrong trust boundaries (offchain settlement, balance watching, timers) create security and fairness failures.

## Decision

1. **Game truth** lives in **onchain accounts** updated only by the **Anchor program**.
2. **Indexer + Postgres** are a **projection** for UX; they must **replay** chain history and be **rebuildable**.
3. **Wallet authentication** is for **product UX** (sessions, personalized views), not for authorizing fund movements (signers on transactions authorize).
4. **MVP** disallows: timer-based elimination, wallet-balance-based eligibility, offchain winner selection, admin seizure of user funds, agent-custodied funds.
5. **Mint policy** is **strict-by-default** for tracked tokens; **USDC-only** stake mint for MVP unless a future ADR expands scope.

## Alternatives considered

- **Offchain oracle for “still holding”**: Rejected — violates non-watcher rule.
- **Omnibus vault for tracked tokens**: Rejected for MVP — per-position vaults for auditability and simpler accounting (see product spec).

## Consequences

- Engineering must maintain **IDL + indexer decoders** in lockstep with program changes.
- Releases require **verifiable/pinned** program build artifacts and documented addresses.
- **Compliance** (gambling/contest laws) remains an external obligation; this ADR does not grant legal clearance.

## Links

- [`docs/specs/product-spec.md`](../specs/product-spec.md)
- [`docs/specs/system-boundaries.md`](../specs/system-boundaries.md)
- [`ops/cursor/rules/00-platform-charter.md`](../../ops/cursor/rules/00-platform-charter.md)
