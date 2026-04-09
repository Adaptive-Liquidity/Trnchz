use anchor_lang::prelude::*;

use crate::SetMintPolicy;
use crate::events::MintPolicySet;
use crate::utils::mint::read_spl_mint;

pub fn handler(
    ctx: Context<SetMintPolicy>,
    allowed: bool,
    require_revoked_mint_authority: bool,
    require_no_freeze_authority: bool,
    allow_token_2022: bool,
    policy_hash: [u8; 32],
) -> Result<()> {
    require!(!ctx.accounts.global_config.paused, crate::errors::HolderArenaError::Paused);
    let mint_ai = ctx.accounts.mint.to_account_info();
    if !allow_token_2022 {
        require_keys_eq!(*mint_ai.owner, anchor_spl::token::ID, crate::errors::HolderArenaError::Token2022NotAllowed);
    }
    let spl_mint = read_spl_mint(&mint_ai)?;
    if require_revoked_mint_authority {
        require!(spl_mint.mint_authority.is_none(), crate::errors::HolderArenaError::MintAuthorityNotRevoked);
    }
    if require_no_freeze_authority {
        require!(spl_mint.freeze_authority.is_none(), crate::errors::HolderArenaError::FreezeAuthorityPresent);
    }
    let p = &mut ctx.accounts.mint_policy;
    p.mint = ctx.accounts.mint.key();
    p.token_program = *mint_ai.owner;
    p.allowed = allowed;
    p.require_revoked_mint_authority = require_revoked_mint_authority;
    p.require_no_freeze_authority = require_no_freeze_authority;
    p.allow_token_2022 = allow_token_2022;
    p.policy_hash = policy_hash;
    p.bump = ctx.bumps.mint_policy;
    emit!(MintPolicySet {
        mint: p.mint,
        allowed: p.allowed,
    });
    Ok(())
}
