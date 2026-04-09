use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
#[repr(u8)]
pub enum PositionState {
    Recruiting = 0,
    Active = 1,
    Surrendered = 2,
    Winner = 3,
    Claimed = 4,
}

#[account]
pub struct Position {
    pub arena: Pubkey,
    pub owner: Pubkey,
    pub tracked_vault: Pubkey,
    pub state: PositionState,
    pub battle_lot: u64,
    pub entry_stake: u64,
    pub join_slot: u64,
    pub exit_slot: u64,
    pub claim_slot: u64,
    pub bump: u8,
}

impl Position {
    pub const LEN: usize = 32 * 3 + 1 + 8 * 5 + 1;
}
