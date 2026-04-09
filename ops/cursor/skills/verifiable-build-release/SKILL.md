---
name: verifiable-build-release
description: Pinned toolchain, reproducible Anchor build, artifacts, deployment manifest for releases.
---

# Skill: verifiable-build-release

## When to use

- Before tagging a release; when **program address** changes; when CI build must be **reproducible**.

## Why it exists

Users verify programs by hash; **drift** between source and deploy destroys trust.

## Required inputs

- Target Solana cluster; Anchor version; Rust version
- CI artifact paths or Docker build recipe

## Exact procedure

1. Pin versions in docs and lockfiles (`rust-toolchain.toml`, `Anchor.toml` notes).
2. Run documented build (local Docker or CI) and record **output hash** / checksum per team policy.
3. Commit **IDL** at release tag; record **program id** in manifest.
4. Fill `docs/runbooks/release-verification.md` checklist.
5. Attach **env inventory** for web/indexer (names only in repo, values in secret store).

## Guardrails

- Secrets never committed; use `.env.example` only

## Failure conditions

- Release with “latest” toolchain unspecified
- IDL missing for deployed program id

## Done criteria

- Artifact checklist complete; rollback section filled for web/indexer

## Output template

`Toolchain | Build command | Hash | Program id | IDL commit | Env vars`.
