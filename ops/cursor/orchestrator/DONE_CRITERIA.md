# Definition of done (orchestrator merge gate)

A track is **merge-ready** only when all applicable items below are satisfied.

## Always

- [ ] Code builds / typechecks for touched packages
- [ ] Tests added or updated for behavior changes
- [ ] Docs or runbooks updated if behavior, ops, or architecture changed materially
- [ ] Handoff template filled (summary, files, invariants, tests, risks)

## Solana program / money path

- [ ] Negative tests for new or changed instructions
- [ ] PDA seeds and signer model reviewed
- [ ] **security-reviewer** sign-off on PR or linked notes (for non-trivial changes)

## Indexer / read model

- [ ] Idempotency key / replay story unchanged or improved
- [ ] Rebuild or gap-fill path documented if schema or decoding changed

## Frontend / wallet

- [ ] Client/server boundaries respected (no secret leakage)
- [ ] **browser-e2e-agent** or manual smoke noted for wallet-critical flows when UX changed

## Release-touching

- [ ] **release-verification-agent** checklist consulted
- [ ] No ad-hoc edits to deployment manifests without release owner
