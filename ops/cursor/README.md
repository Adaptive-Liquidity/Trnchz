# Cursor operating layer (Holder v. Holder)

This tree is the **canonical** copy of orchestration docs. Mirror into Cursor **Project Rules** (`.cursor/rules/`) or team settings as needed.

| Path | Purpose |
|------|---------|
| `../orchestrator/` | Orchestrator contract, handoff template, merge criteria |
| `rules/` | `00`–`06` permanent law: charter, Solana safety, mint policy, indexer/read model, web boundaries, testing/release, no-timer/offchain settlement |
| `subagents/` | Specialist scope boundaries |
| `skills/` | Repeatable procedures (SKILL.md per skill) |
| `hooks/` | Guardrail scripts + README |
| `prompts/` | Copy-paste orchestrator prompts |

**Activation order (recommended)**

1. Add root `AGENTS.md` to agent context (always).
2. Register project rules from `rules/` (or a single `.cursor/rules` file that summarizes them).
3. Point agents at `subagents/*.md` when delegating.
4. Load `skills/*/SKILL.md` for procedural work.
5. Configure Cursor Hooks to call `hooks/*.sh` where supported.

## Best-of-n / worktrees

Use isolated git worktrees for competing designs; do not contaminate `main`. See Cursor docs for `/worktree` and `/best-of-n`.
