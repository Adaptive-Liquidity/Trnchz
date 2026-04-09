# Runbook — Release verification (program + apps)

## Scope

- **Onchain program**: verifiable/pinned build, program id, IDL artifact.
- **Web + indexer**: deploy artifacts, env vars, rollback (redeploy previous version).

## Program checklist

- [ ] Toolchain versions pinned (Solana CLI, Anchor, Rust) documented in repo — see [`docs/TOOLCHAIN.md`](../TOOLCHAIN.md).
- [ ] **Anchor CLI 0.30.1** via **AVM** matches [`Anchor.toml`](../Anchor.toml) `[toolchain.anchor_version]` (do not mix CLI 0.32+ with program crates 0.30.x).
- [ ] `anchor build` (or `anchor build --verifiable` with Docker running, or Linux/WSL) succeeds; BPF artifacts under `target/deploy/`.
- [ ] **IDL + TS types** synced for consumers: `npm run anchor:artifacts` (or `anchor build` then `npm run anchor:idl:sync`). Committed copies live under `packages/sdk/src/idl/hvh.json` and `packages/sdk/src/generated/hvh.ts`.
- [ ] Program **address** and **upgrade authority** recorded (multisig or burn decision documented).
- [ ] **Security review** completed for this release (link to PR or notes).

### `anchor verify` (pin expectations)

- This repo targets **Anchor 0.30.1**. Follow **0.30.x** [verifiable build](https://www.anchor-lang.com/docs/references/verifiable-builds) behavior.
- **Anchor 0.32+** changed verification (`solana-verify`); do not assume the same commands or outputs until you upgrade Anchor, `anchor-lang`, and Solana toolchain together.

## Application checklist

- [ ] **Environment variables** listed with descriptions (no secrets in repo).
- [ ] **Indexer** migration applied before web if ordering matters.
- [ ] **Health** endpoints return OK post-deploy.
- [ ] **Smoke**: read API returns expected arenas; one devnet tx if applicable.

## Rollback

- **Web/indexer**: redeploy previous image/git tag; restore DB snapshot if migration was destructive.
- **Program**: upgrades require governance; **no silent rollback** of user funds logic — document user impact.

## Post-deploy validation

1. Confirm program id matches UI config.
2. Spot-check indexer lag vs RPC slot (metrics).
3. Run manual join/surrender/claim on devnet if available.

## References

- `ops/cursor/skills/verifiable-build-release/SKILL.md`
