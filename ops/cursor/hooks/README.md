# Cursor hooks (guardrails)

These scripts are **templates**. Wire them to [Cursor Hooks](https://cursor.com/docs) in your team’s hook configuration so they run at the right lifecycle events (before submit, after file edit, etc.).

## Scripts

| Script | Intent |
|--------|--------|
| `block-dangerous-commands.sh` | Block known-dangerous patterns in suggested terminal commands (extend the deny regex for your org). |
| `require-plan-before-implementation.sh` | Optional gate: require `CURSOR_PLAN_OK=1` or customize for plan approval. |
| `require-tests-on-program-changes.sh` | **Primary:** In CI, set `RUN_STRICT=1` and `BASE=<ref>` to fail when `programs/` changes without test changes (patterns adjustable inside script). |
| `require-tests-on-merge.sh` | **Deprecated alias:** invokes `require-tests-on-program-changes.sh` for backward compatibility. |
| `log-agent-actions.sh` | Append JSON lines to `AGENT_LOG_DIR` for local audit. |

## Attachment

1. **Block dangerous commands**: On proposed terminal command text (stdin or argv), exit non-zero if pattern matches.
2. **Plan gate**: Before large edits, optionally require env or manual approval (uncomment `exit 1` in script when policy is strict).
3. **Tests on program changes**: Intended for **CI** (`RUN_STRICT=1`), not interactive Cursor sessions by default.
4. **Log**: On agent milestone or hook event, append one line.

## Windows

Use **Git Bash**, **WSL**, or translate to PowerShell. Do not run untrusted hook code without review.

## Suggested policy (orchestrator)

- Plan before epic-level implementation
- No program merge without tests (enforce in CI with `require-tests-on-program-changes.sh`)
- No broad MCP `*:*` in production agent profiles
- Cloud Agents off for secrets and final release
