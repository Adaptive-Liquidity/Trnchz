use anchor_lang::prelude::*;
use anchor_lang::solana_program::program_pack::Pack;
use anchor_spl::token::spl_token::state::Mint as SplMint;

use crate::errors::HolderArenaError;

/// Validate classic SPL mint: revoked mint authority, no freeze authority.
pub fn validate_tracked_mint_strict(mint_ai: &AccountInfo) -> Result<()> {
    require_keys_eq!(
        *mint_ai.owner,
        anchor_spl::token::ID,
        HolderArenaError::Token2022NotAllowed
    );
    let data = mint_ai.try_borrow_data()?;
    let mint =
        SplMint::unpack(&data).map_err(|_| error!(HolderArenaError::MintPolicyMissing))?;
    require!(mint.mint_authority.is_none(), HolderArenaError::MintAuthorityNotRevoked);
    require!(mint.freeze_authority.is_none(), HolderArenaError::FreezeAuthorityPresent);
    Ok(())
}

pub fn read_spl_mint(mint_ai: &AccountInfo) -> Result<SplMint> {
    require_keys_eq!(
        *mint_ai.owner,
        anchor_spl::token::ID,
        HolderArenaError::Token2022NotAllowed
    );
    let data = mint_ai.try_borrow_data()?;
    SplMint::unpack(&data).map_err(|_| error!(HolderArenaError::MintPolicyMissing))
}
