# ADR-002 — Legacy Vite “Trenchz” UI disposition

## Status

Accepted

## Context

The repository previously contained a **Vite + React** demo (“Trenchz”) with timers, mock wallet state, and tournament metaphors that **do not** match Holder v. Holder protocol rules. The product target is **Next.js App Router** + Anchor + indexer per `AGENTS.md`.

## Decision

1. The legacy UI is **not** the Holder v. Holder protocol client.
2. Source for that demo lives under **`apps/legacy-trenchz-ui/`** as a **quarantined** package for local demos, branding reference, or gradual salvage of **non-protocol** styling only.
3. **No new features** are added to the legacy app for Holder v. Holder money paths; new work goes to **`apps/web`** (Phase 1 scaffold).
4. Engineers must not copy **timer / PnL / leaderboard-as-truth** patterns into the production app.

## Consequences

- Root `package.json` may use **npm workspaces** to run the legacy package via `npm run dev:legacy` (or equivalent).
- Documentation and agents must refer to **Holder v. Holder** orchestration docs, not the legacy tournament description.

## Links

- [`AGENTS.md`](../../AGENTS.md)
