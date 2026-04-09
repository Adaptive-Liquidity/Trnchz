# ADR-003 — Onchain account layout, PDAs, and finalize witness accounts

## Status

Accepted

## Context

Holder v. Holder requires deterministic custody (PDAs), no onchain iteration over all positions, and explicit finalization when three players remain.

## Decision

1. **PDAs**
   - `GlobalConfig`: seeds `["config"]`.
   - `MintPolicy`: seeds `["mint_policy", mint.as_ref()]`.
   - `Arena`: seeds `["arena", arena_id.to_le_bytes()]`.
   - `VaultAuthority`: seeds `["vault_authority", arena.key().as_ref()]`.
   - `Position`: seeds `["position", arena.key().as_ref(), owner.key().as_ref()]`.

2. **Vaults**
   - **Arena stake vault**: ATA owned by `VaultAuthority`, mint = stake mint (USDC).
   - **Position tracked vault**: ATA owned by **Position** PDA, mint = tracked mint.

3. **Lazy position activation**
   - On `activate_arena_if_full`, only the **Arena** account updates to `Live` and `active_count = joined_count`.
   - **Position** accounts may remain `Recruiting` in storage while the arena is `Live`; instructions treat `(arena Live && position Recruiting)` as in-play until surrender/claim/finalize.

4. **Finalize**
   - The instruction `finalize_if_three_left` requires **three explicit `Position` accounts** passed by the caller (indexer-assisted). The program verifies PDA seeds, arena binding, and that each position is still in-play; then sets `Arena` to `Finalized`, marks those positions `Winner`, and records `per_winner_share` from the stake vault balance at finalize time (integer division; remainder to `treasury`).

5. **Treasury**
   - `GlobalConfig.treasury` receives remainder lamports from `per_winner_share` rounding.

## Consequences

- Indexer/SDK must derive the same PDAs and surface the three position addresses for finalize.
- No omnibus tracked-token vault.

## Links

- [`docs/specs/invariants.md`](../specs/invariants.md)
