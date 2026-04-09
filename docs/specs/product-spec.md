# Product specification — Holder v. Holder

## One-line definition

**Holder v. Holder** is a Solana **locked-position survival arena**: players lock a fixed **battle lot** of a tracked project token and a fixed **USDC stake** onchain; elimination is by **surrender** only; when **three** active positions remain, the arena can be **finalized** and those three **split the USDC pot equally** and recover battle lots. **No timers.** **No wallet-balance inference.** **No offchain winner selection.**

## Canonical rules

- One arena per tracked mint configuration (per arena parameters: `battle_lot`, `entry_stake`, `seat_count`).
- Arena states: **Recruiting** → **Live** → **Finalized** (exact enum names may differ in code; semantics must match).
- Arena becomes **Live** only when `joined_count == seat_count` (full seats); activation instruction or equivalent transitions state.
- While **Recruiting**, a player may **leave** and recover battle lot and stake per program rules.
- While **Live**, a player may **surrender**: **tracked battle lot** returned per program; **USDC stake forfeited** to pool logic per program (not offchain).
- **Elimination** is only by surrender (or disqualifying state transitions explicitly coded — no time-based knockouts).
- When **active player count** reaches **three**, **anyone** may invoke **finalize** (with correct accounts); program marks winners.
- **Winners claim** USDC share and tracked tokens per program; **losers** cannot claim pot.
- **Re-entry** is disallowed for the same seat semantics unless explicitly changed by ADR (not MVP).

## Non-goals (MVP)

- Timed rounds, speed leaderboards, or “still holding” detected by offchain balance polling.
- Ranked payouts beyond final-three split.
- Cross-project tournaments, side bets, agent-custodied funds, CEX balance proofs.

## UX expectations (product app)

- Read path: **indexer/API** first; chain RPC for **transaction confirmation** and reconciliation.
- Wallet auth: **session for UX**; funds always moved by **user-signed** transactions to the program.

## Compliance note

Contest/gambling exposure varies by jurisdiction; marketing and geofencing are out of scope for this spec — track in legal review before public launch.
