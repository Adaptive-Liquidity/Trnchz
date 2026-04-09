# Rule: Solana contract safety

- **PDA custody only** for program-controlled token flows; verify seeds + bumps on every instruction.
- **Per-position tracked vaults** in MVP — no omnibus pooled tracked-token vault.
- **One position** per `(arena, owner)`; enforce with PDA seeds.
- **Strict account constraints**: correct token program, mint, owner, signer; no unchecked optional paths on money moves.
- **CPIs (v1)**: System, Associated Token, Token / Token-2022 only when policy explicitly allows — default tracked mint is classic SPL with strict policy.
- **Every money instruction** has **negative tests** (wrong mint, wrong ATA, forged PDA, double claim, etc.).
- **No admin instruction** that moves user funds or picks winners offchain.
