# Protocol invariants — Holder v. Holder

These are **design contracts** for the Anchor program and projections. Update this document when behavior changes; link ADRs.

## Arena

- `winner_count == 3` (fixed for MVP unless ADR changes product).
- `seat_count > 3`.
- `joined_count <= seat_count`.
- `active_count <= joined_count` (and reflects live surrender semantics).
- No joins after **Live** (except where explicitly forbidden by instruction design).
- No recruiting exit after **Live** via recruiting-only instructions.
- **Finalization** only when `active_count == 3` (or equivalent guard) for the arena state machine used.
- **USDC** stake vault accounting: vault balance matches program’s accounting model for stakes, forfeits, and claims (document exact formula in program docs).

## Position

- At most **one position PDA** per `(arena, owner)`.
- Battle lot and entry stake on the position match arena parameters at join.
- **Surrendered** positions never return to **active** for the same round.
- **Claimed** positions cannot claim again.

## Token custody

- **Per-position tracked vault** holds that position’s battle lot while locked; no omnibus tracked-token pool for MVP.
- **Arena stake vault** holds USDC per arena economics.
- Vault ATAs owned by **PDA** authorities as defined by the program; only program instructions move funds per rules.

## Projection (indexer)

- Every persisted event is **idempotent** by a stable key (e.g. signature + instruction index + event index).
- Rebuild from chain replays the same rows as steady-state ingestion (allowing delete-and-replay for admin rebuild).

## Security posture

- No instruction path **mints** user value, **confiscates** tracked tokens, or **picks winners** offchain.
- Admin may **pause UI** or **policy** flags per program — not **seize** user funds.
