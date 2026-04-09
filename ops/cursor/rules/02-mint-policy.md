# Rule: Mint policy (tracked and stake)

## Tracked mint (battle lot)

- **Default stance: deny** until an explicit `MintPolicy` (or equivalent) marks the mint **allowed** after review.
- **Classic SPL Token** is the default supported path; **Token-2022 is denied by default** unless an ADR and policy flags explicitly allow it.
- **Policy must record** token program, allow/deny, and checks for: mint authority, freeze authority, permanent delegate, transfer-fee extension, confidential transfer, default frozen behavior, mint close authority — aligned with `docs/specs/mint-policy.md`.
- **No instruction** may accept an arbitrary mint without loading and validating policy for that mint.

## Stake mint (USDC)

- **USDC only** for MVP stake unless an ADR changes this; **classic SPL**, **admin-whitelisted** stake mint list in protocol config.
- Stake flows must validate mint + token program against config.

## Forbidden

- Silently supporting Token-2022 or transfer hooks without policy review.
- Allowing tracked mints with active mint authority (unless policy explicitly documents exception and ADR).
- “Wildcard” mint lists or dynamic mint acceptance without policy rows.
