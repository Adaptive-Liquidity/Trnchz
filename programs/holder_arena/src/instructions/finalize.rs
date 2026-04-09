use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer};

use crate::FinalizeIfThreeLeft;
use crate::constants::VAULT_AUTH_SEED;
use crate::events::Finalized;
use crate::state::{ArenaState, PositionState};

pub fn handler(ctx: Context<FinalizeIfThreeLeft>) -> Result<()> {
    require!(!ctx.accounts.global_config.paused, crate::errors::HolderArenaError::Paused);
    let arena = &ctx.accounts.arena;
    require!(arena.state == ArenaState::Live, crate::errors::HolderArenaError::ArenaNotLive);
    require_eq!(arena.active_count, 3, crate::errors::HolderArenaError::InvalidActiveCount);

    require_keys_neq!(ctx.accounts.pa.owner, ctx.accounts.pb.owner, crate::errors::HolderArenaError::DuplicateWinner);
    require_keys_neq!(ctx.accounts.pa.owner, ctx.accounts.pc.owner, crate::errors::HolderArenaError::DuplicateWinner);
    require_keys_neq!(ctx.accounts.pb.owner, ctx.accounts.pc.owner, crate::errors::HolderArenaError::DuplicateWinner);

    for p in [&ctx.accounts.pa, &ctx.accounts.pb, &ctx.accounts.pc] {
        require_keys_eq!(p.arena, ctx.accounts.arena.key(), crate::errors::HolderArenaError::AmountMismatch);
        let ok = p.state == PositionState::Recruiting || p.state == PositionState::Active;
        require!(ok, crate::errors::HolderArenaError::InvalidPositionState);
    }

    let balance = ctx.accounts.arena_stake_vault.amount;
    let per = balance / 3;
    let remainder = balance % 3;

    let arena_key = ctx.accounts.arena.key();
    let vbump = ctx.accounts.arena.vault_authority_bump;
    let vault_bump_seed = [vbump];
    let vault_seeds: &[&[u8]] = &[VAULT_AUTH_SEED, arena_key.as_ref(), &vault_bump_seed];

    if remainder > 0 {
        let signers = [vault_seeds];
        let cpi = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.arena_stake_vault.to_account_info(),
                to: ctx.accounts.treasury_token_account.to_account_info(),
                authority: ctx.accounts.vault_authority.to_account_info(),
            },
            &signers,
        );
        token::transfer(cpi, remainder)?;
    }

    let slot = Clock::get()?.slot;
    let arena_mut = &mut ctx.accounts.arena;
    arena_mut.state = ArenaState::Finalized;
    arena_mut.per_winner_share = per;
    arena_mut.finalized_slot = slot;

    ctx.accounts.pa.state = PositionState::Winner;
    ctx.accounts.pb.state = PositionState::Winner;
    ctx.accounts.pc.state = PositionState::Winner;

    emit!(Finalized {
        arena: arena_key,
        per_winner_share: per,
    });
    Ok(())
}
