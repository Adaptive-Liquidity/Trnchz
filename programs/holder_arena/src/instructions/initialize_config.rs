use anchor_lang::prelude::*;

use crate::InitializeConfig;
use crate::constants::GLOBAL_CONFIG_VERSION;
use crate::events::ConfigInitialized;
use crate::state::ArenaCreationMode;

pub fn handler(
    ctx: Context<InitializeConfig>,
    treasury: Pubkey,
    default_stake_mint: Pubkey,
    arena_creation_mode: u8,
) -> Result<()> {
    let mode = match arena_creation_mode {
        0 => ArenaCreationMode::AuthorityOnly,
        1 => ArenaCreationMode::Allowlisted,
        2 => ArenaCreationMode::Permissionless,
        _ => return err!(crate::errors::HolderArenaError::InvalidArenaCreator),
    };
    let cfg = &mut ctx.accounts.global_config;
    cfg.authority = ctx.accounts.payer.key();
    cfg.treasury = treasury;
    cfg.paused = false;
    cfg.arena_creation_mode = mode;
    cfg.default_stake_mint = default_stake_mint;
    cfg.version = GLOBAL_CONFIG_VERSION;
    cfg.next_arena_id = 1;
    cfg.bump = ctx.bumps.global_config;
    emit!(ConfigInitialized {
        authority: cfg.authority,
        treasury: cfg.treasury,
    });
    Ok(())
}
