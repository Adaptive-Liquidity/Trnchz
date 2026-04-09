//! Protocol constants and seeds.

pub const CONFIG_SEED: &[u8] = b"config";
pub const MINT_POLICY_SEED: &[u8] = b"mint_policy";
pub const ARENA_SEED: &[u8] = b"arena";
pub const VAULT_AUTH_SEED: &[u8] = b"vault_authority";
pub const POSITION_SEED: &[u8] = b"position";

/// Fixed winner count for MVP (see `docs/specs/invariants.md`).
pub const WINNER_COUNT: u16 = 3;

pub const GLOBAL_CONFIG_VERSION: u16 = 1;
