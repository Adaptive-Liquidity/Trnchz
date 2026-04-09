# Program tests

- **Unit / Rust tests**: live in the program crate (`programs/holder_arena`) — run `cargo test -p holder_arena` or `anchor test` once the full harness exists.
- **Integration tests** (TypeScript + local validator): prefer `tests/integration/` in later phases.

This folder holds **harness documentation** only for Phase 1.

## Smoke

```bash
cargo test -p holder_arena
```

From repo root with Solana/Anchor toolchain (see `docs/TOOLCHAIN.md`):

```bash
anchor build
```
