use anchor_lang::prelude::*;
use anchor_spl::token::{self, CloseAccount, Transfer};

use crate::ClaimWinnings;
use crate::constants::{POSITION_SEED, VAULT_AUTH_SEED};
use crate::events::Claimed;
use crate::state::{ArenaState, PositionState};

pub fn handler(ctx: Context<ClaimWinnings>) -> Result<()> {
    require!(!ctx.accounts.global_config.paused, crate::errors::HolderArenaError::Paused);
    let arena = &ctx.accounts.arena;
    require!(arena.state == ArenaState::Finalized, crate::errors::HolderArenaError::ArenaNotFinalized);
    require!(
        ctx.accounts.position.state == PositionState::Winner,
        crate::errors::HolderArenaError::NotWinner
    );
    require_eq!(
        ctx.accounts.position.claim_slot,
        0,
        crate::errors::HolderArenaError::AlreadyClaimed
    );

    let share = arena.per_winner_share;
    let battle = arena.battle_lot;
    let arena_key = arena.key();
    let owner_key = ctx.accounts.owner.key();
    let vbump = arena.vault_authority_bump;
    let vault_bump_seed = [vbump];
    let vault_seeds: &[&[u8]] = &[VAULT_AUTH_SEED, arena_key.as_ref(), &vault_bump_seed];
    let vault_signers = [vault_seeds];

    let cpi_usdc = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: ctx.accounts.arena_stake_vault.to_account_info(),
            to: ctx.accounts.user_stake.to_account_info(),
            authority: ctx.accounts.vault_authority.to_account_info(),
        },
        &vault_signers,
    );
    token::transfer(cpi_usdc, share)?;

    let pos_bump = ctx.accounts.position.bump;
    let pos_bump_seed = [pos_bump];
    let pos_seeds: &[&[u8]] = &[POSITION_SEED, arena_key.as_ref(), owner_key.as_ref(), &pos_bump_seed];
    let pos_signers = [pos_seeds];

    let cpi_tr = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: ctx.accounts.position_tracked_vault.to_account_info(),
            to: ctx.accounts.user_tracked.to_account_info(),
            authority: ctx.accounts.position.to_account_info(),
        },
        &pos_signers,
    );
    token::transfer(cpi_tr, battle)?;

    let cpi_close = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        CloseAccount {
            account: ctx.accounts.position_tracked_vault.to_account_info(),
            destination: ctx.accounts.owner.to_account_info(),
            authority: ctx.accounts.position.to_account_info(),
        },
        &pos_signers,
    );
    token::close_account(cpi_close)?;

    ctx.accounts.position.state = PositionState::Claimed;
    ctx.accounts.position.claim_slot = Clock::get()?.slot;

    emit!(Claimed {
        arena: arena_key,
        owner: ctx.accounts.owner.key(),
    });
    Ok(())
}
