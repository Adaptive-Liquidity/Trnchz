---
name: mint-policy-review
description: Tracked mint eligibility and Token-2022/extension risk review before allowlisting.
---

# Skill: mint-policy-review

## When to use

- Before **allowing** a new tracked mint or changing policy flags for stake/tracked mints.
- When program validation logic for mints changes.

## Why it exists

Token extensions and authorities can **break** accounting or enable theft; default must be **deny**.

## Required inputs

- Mint address; token program id (classic vs Token-2022)
- Output of `spl-token` / explorer inspection for authorities and extensions
- `docs/specs/mint-policy.md` matrix row to update

## Exact procedure

1. Record mint authority, freeze authority, close authority presence.
2. Detect extensions: transfer fee, confidential transfer, permanent delegate, default frozen.
3. Decide **reject** or **conditional allow** with ADR for exceptions.
4. Add program tests mirroring each rejection path.
5. Document admin UI fields needed (mint, program id, toggles) in spec appendix if missing.

## Guardrails

- Token-2022 off by default
- No “temporary allow” in code without policy bit + ADR

## Failure conditions

- Missing test for a listed rejection reason
- Policy hash or stored flags do not reflect what was checked

## Done criteria

- Matrix row complete; tests red-green for rejects; spec updated

## Output template

| Mint | Program | Verdict | Reason | ADR ref |
