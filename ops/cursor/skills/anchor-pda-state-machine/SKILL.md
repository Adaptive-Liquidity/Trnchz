---
name: anchor-pda-state-machine
description: Checklist for new accounts, PDAs, instructions, and state transitions in the Anchor program.
---

# Skill: anchor-pda-state-machine

## When to use

- Adding or changing any **account**, **PDA seed**, **instruction**, or **state enum** in `programs/holder_arena/`.

## Why it exists

Solana exploits often target **wrong PDAs**, **signer confusion**, and **illegal state jumps**. This skill ties implementer work to **documented** seeds and transitions.

## Required inputs

- Current PDA table from solana-state-architect or prior code
- `docs/specs/invariants.md` relevant section

## Exact procedure

1. List all seeds and bump usage; verify `invoke_signed` signers match.
2. Walk the state transition table; ensure **no edge** skips guards (e.g. join after live).
3. For token flows: document source/dest ATAs and authorities.
4. Add or update **negative tests** for each new guard (see `checklists/instruction-review.md`).
5. Update SDK PDA helpers in same epic when seeds change.

## Guardrails

- No omnibus tracked vault for MVP
- No timer-based transitions
- Prefer explicit accounts for finalize winners (no full-table scan onchain)

## Failure conditions

- Instruction reachable with **wrong mint** or **token program** but still passes
- PDA derivation in SDK does not match program `seeds!` / `find_program_address`

## Done criteria

- Tests pass; handoff includes **invariant coverage** line per instruction
- Events emitted for indexer where applicable

## Output template

Short table: `Instruction | PDAs touched | Signers | Negative tests`.
