# Rule: No timer; no offchain settlement

## Forbidden in product logic and UX that implies protocol rules

- Countdown timers, round clocks, or **time-based elimination** for Holder v. Holder arenas.
- Inferring “still holding” from **wallet balance polling**, sell detection, or PnL leaderboards as **eligibility** for the protocol.
- Backend-selected winners, **ranked payouts** from offchain logic, partial exits, or re-entry — unless an ADR explicitly changes product scope (not MVP).

## Allowed (operational only)

- Indexer “last updated” timestamps, session TTLs, job scheduling — **not** game rules.
- UI that does not imply **onchain** state (marketing copy) must not contradict the spec.

## When in doubt

Treat as **forbidden** and record an **ADR** before any exception.
