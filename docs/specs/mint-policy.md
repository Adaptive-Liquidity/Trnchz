# Mint policy — Holder v. Holder

## Purposes

1. **Tracked mint** (battle lot): reduce fraud and protocol abuse from token authorities and extensions.
2. **Stake mint** (USDC): single allowed stake mint for MVP (classic SPL, allowlisted).

## Default stance

- **Deny all** tracked mints until explicitly allowed via onchain `MintPolicy` (or equivalent) with documented checks.
- **Classic SPL Token** first; **Token-2022** rejected unless an ADR and explicit policy flags allow it after review.

## Tracked mint — checks (default strict)

Reject if present unless policy explicitly overrides with rationale:

| Risk | Why |
|------|-----|
| Active **mint authority** | Supply inflation |
| Active **freeze authority** | Account freezing attacks |
| **Permanent delegate** | Arbitrary transfer/burn |
| **Transfer fee** extension | Transfer math mismatch |
| **Confidential transfer** | Hidden amounts |
| **Default account state** frozen | New holders unusable |
| **Mint close authority** | Extra lifecycle risk |

## Stake mint (USDC)

- Must match **global config allowlist** (or equivalent).
- Classic SPL token program expected; validate program id in instruction.

## Policy record

- Store: mint, token program, allow bit, feature flags, and a **policy hash** or serialized snapshot of evaluated attributes for auditability (implementation detail).

## Admin

- Policy changes are **governance** actions — **never** move user funds or finalize arenas.
