use anchor_lang::prelude::*;

#[event]
pub struct ConfigInitialized {
    pub authority: Pubkey,
    pub treasury: Pubkey,
}

#[event]
pub struct MintPolicySet {
    pub mint: Pubkey,
    pub allowed: bool,
}

#[event]
pub struct ArenaCreated {
    pub arena: Pubkey,
    pub arena_id: u64,
    pub tracked_mint: Pubkey,
}

#[event]
pub struct Joined {
    pub arena: Pubkey,
    pub owner: Pubkey,
    pub position: Pubkey,
}

#[event]
pub struct LeftRecruiting {
    pub arena: Pubkey,
    pub owner: Pubkey,
}

#[event]
pub struct Activated {
    pub arena: Pubkey,
    pub slot: u64,
}

#[event]
pub struct Surrendered {
    pub arena: Pubkey,
    pub owner: Pubkey,
}

#[event]
pub struct Finalized {
    pub arena: Pubkey,
    pub per_winner_share: u64,
}

#[event]
pub struct Claimed {
    pub arena: Pubkey,
    pub owner: Pubkey,
}
