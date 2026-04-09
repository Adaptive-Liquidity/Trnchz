use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
#[repr(u8)]
pub enum ArenaState {
    Recruiting = 0,
    Live = 1,
    Finalized = 2,
}

#[account]
pub struct Arena {
    pub arena_id: u64,
    pub creator: Pubkey,
    pub tracked_mint: Pubkey,
    pub tracked_token_program: Pubkey,
    pub stake_mint: Pubkey,
    pub stake_token_program: Pubkey,
    pub battle_lot: u64,
    pub entry_stake: u64,
    pub seat_count: u16,
    pub joined_count: u16,
    pub active_count: u16,
    pub winner_count: u16,
    pub state: ArenaState,
    pub created_slot: u64,
    pub activated_slot: u64,
    pub finalized_slot: u64,
    pub vault_authority_bump: u8,
    /// USDC smallest units per winner; set at finalize.
    pub per_winner_share: u64,
    pub bump: u8,
}

impl Arena {
    pub const LEN: usize = 8 + 32 * 5 + 8 * 2 + 2 * 4 + 1 + 8 * 3 + 1 + 8 + 1;
}
