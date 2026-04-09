use anchor_lang::prelude::*;
use anchor_spl::token::{self, CloseAccount, Transfer};

use crate::SurrenderLive;
use crate::constants::POSITION_SEED;
use crate::events::Surrendered;
use crate::state::{ArenaState, PositionState};

pub fn handler(ctx: Context<SurrenderLive>) -> Result<()> {
    require!(!ctx.accounts.global_config.paused, crate::errors::HolderArenaError::Paused);
    let arena = &ctx.accounts.arena;
    require!(arena.state == ArenaState::Live, crate::errors::HolderArenaError::ArenaNotLive);
    let pos = &ctx.accounts.position;
    let in_play = pos.state == PositionState::Recruiting || pos.state == PositionState::Active;
    require!(in_play, crate::errors::HolderArenaError::InvalidPositionState);

    let battle = arena.battle_lot;
    let arena_key = arena.key();
    let owner_key = ctx.accounts.owner.key();
    let bump = ctx.accounts.position.bump;
    let bump_seed = [bump];

    let seeds: &[&[u8]] = &[POSITION_SEED, arena_key.as_ref(), owner_key.as_ref(), &bump_seed];
    let signers = [seeds];

    let cpi = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: ctx.accounts.position_tracked_vault.to_account_info(),
            to: ctx.accounts.user_tracked.to_account_info(),
            authority: ctx.accounts.position.to_account_info(),
        },
        &signers,
    );
    token::transfer(cpi, battle)?;

    let cpi_close = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        CloseAccount {
            account: ctx.accounts.position_tracked_vault.to_account_info(),
            destination: ctx.accounts.owner.to_account_info(),
            authority: ctx.accounts.position.to_account_info(),
        },
        &signers,
    );
    token::close_account(cpi_close)?;

    let arena_mut = &mut ctx.accounts.arena;
    arena_mut.active_count = arena_mut
        .active_count
        .checked_sub(1)
        .ok_or(crate::errors::HolderArenaError::MathOverflow)?;

    let pos_mut = &mut ctx.accounts.position;
    pos_mut.state = PositionState::Surrendered;
    pos_mut.exit_slot = Clock::get()?.slot;

    emit!(Surrendered {
        arena: arena_key,
        owner: ctx.accounts.owner.key(),
    });
    Ok(())
}
