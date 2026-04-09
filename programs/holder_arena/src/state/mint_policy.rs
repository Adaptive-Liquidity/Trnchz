use anchor_lang::prelude::*;

#[account]
pub struct MintPolicy {
    pub mint: Pubkey,
    pub token_program: Pubkey,
    pub allowed: bool,
    pub require_revoked_mint_authority: bool,
    pub require_no_freeze_authority: bool,
    pub allow_token_2022: bool,
    pub policy_hash: [u8; 32],
    pub bump: u8,
}

impl MintPolicy {
    pub const LEN: usize = 32 + 32 + 1 + 1 + 1 + 1 + 32 + 1;
}
