# Holder v. Holder

This repository builds a Solana-based **locked-position survival arena** (Holder v. Holder). Money path stays **onchain**; offchain systems **project** chain state only.

## Non-negotiables

- No timed gameplay
- No wallet-balance watcher logic
- No offchain winner selection
- No admin seizure or reassignment of user funds
- No agent-managed funds in MVP
- **Chain state is source of truth**
- Indexer / database is **projection only**

## Architecture defaults

- Solana + Anchor
- PDA-owned custody
- Strict mint allowlist
- Per-position tracked vaults
- USDC stake vault (classic SPL, policy-whitelisted)
- Next.js App Router web app (when product app lands)
- Postgres read model + small TypeScript indexer
- Wallet-signature auth for UX (not for program authorization)

## Engineering defaults

- Plan before implementation for non-trivial work
- ADR for architecture / product-rule changes
- Tests required for every behavior change
- **Negative tests required** for money-path changes
- Docs and runbooks updated with every material change

## Where to look

| Concern | Location |
|--------|----------|
| Orchestrator contract | `ops/cursor/orchestrator/ORCHESTRATOR.md` |
| Subagent boundaries | `ops/cursor/subagents/` |
| Repeatable procedures | `ops/cursor/skills/` |
| Permanent rule text | `ops/cursor/rules/` + this file |
| Hooks (guardrails) | `ops/cursor/hooks/` |
| Bootstrap prompts | `ops/cursor/prompts/` |

## Cursor usage

- **Orchestrator** = single intake; delegates to specialists
- **Worktrees** / **best-of-n** = isolated competing implementations (never edit main from subagent runs without merge gate)
- **Cloud Agents** = long-running, **non-sensitive** mechanical work only
- **Local agent** = contract logic, secrets-adjacent work, release steps
