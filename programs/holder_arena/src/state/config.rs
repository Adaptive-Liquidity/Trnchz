use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
#[repr(u8)]
pub enum ArenaCreationMode {
    AuthorityOnly = 0,
    Allowlisted = 1,
    Permissionless = 2,
}

#[account]
pub struct GlobalConfig {
    pub authority: Pubkey,
    pub treasury: Pubkey,
    pub paused: bool,
    pub arena_creation_mode: ArenaCreationMode,
    pub default_stake_mint: Pubkey,
    pub version: u16,
    /// Monotonic id for next arena (see ADR-003).
    pub next_arena_id: u64,
    pub bump: u8,
}

impl GlobalConfig {
    /// Serialized data size (excluding 8-byte Anchor discriminator).
    pub const LEN: usize = 32 + 32 + 1 + 1 + 32 + 2 + 8 + 1;
}
