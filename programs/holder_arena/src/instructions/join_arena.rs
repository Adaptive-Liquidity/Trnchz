use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer, TokenAccount};

use crate::JoinArena;
use crate::constants::MINT_POLICY_SEED;
use crate::events::Joined;
use crate::state::{ArenaState, MintPolicy, PositionState};
use crate::utils::mint::validate_tracked_mint_strict;

pub fn handler(ctx: Context<JoinArena>) -> Result<()> {
    require!(!ctx.accounts.global_config.paused, crate::errors::HolderArenaError::Paused);
    let arena = &ctx.accounts.arena;
    require!(arena.state == ArenaState::Recruiting, crate::errors::HolderArenaError::ArenaNotRecruiting);
    require!(
        (arena.joined_count as usize) < (arena.seat_count as usize),
        crate::errors::HolderArenaError::ArenaFull
    );
    let (expected_mint_policy, _) = Pubkey::find_program_address(
        &[MINT_POLICY_SEED, arena.tracked_mint.as_ref()],
        ctx.program_id,
    );
    require_keys_eq!(
        ctx.accounts.mint_policy.key(),
        expected_mint_policy,
        crate::errors::HolderArenaError::AmountMismatch
    );
    let mint_policy = MintPolicy::try_deserialize(&mut &ctx.accounts.mint_policy.try_borrow_data()?[..])?;
    require!(mint_policy.allowed, crate::errors::HolderArenaError::MintNotAllowed);
    let tracked_mint_ai = ctx.accounts.tracked_mint.to_account_info();
    validate_tracked_mint_strict(&tracked_mint_ai)?;

    require_keys_eq!(
        ctx.accounts.tracked_mint.key(),
        arena.tracked_mint,
        crate::errors::HolderArenaError::AmountMismatch
    );
    require_keys_eq!(
        ctx.accounts.stake_mint.key(),
        arena.stake_mint,
        crate::errors::HolderArenaError::InvalidStakeMint
    );

    let arena_stake_vault =
        TokenAccount::try_deserialize(&mut &ctx.accounts.arena_stake_vault.try_borrow_data()?[..])?;
    require_keys_eq!(
        arena_stake_vault.mint,
        arena.stake_mint,
        crate::errors::HolderArenaError::InvalidStakeMint
    );
    require_keys_eq!(
        arena_stake_vault.owner,
        ctx.accounts.vault_authority.key(),
        crate::errors::HolderArenaError::AmountMismatch
    );

    let user_tracked = TokenAccount::try_deserialize(&mut &ctx.accounts.user_tracked.try_borrow_data()?[..])?;
    require_keys_eq!(
        user_tracked.mint,
        arena.tracked_mint,
        crate::errors::HolderArenaError::AmountMismatch
    );
    require_keys_eq!(user_tracked.owner, ctx.accounts.owner.key(), crate::errors::HolderArenaError::AmountMismatch);

    let user_stake = TokenAccount::try_deserialize(&mut &ctx.accounts.user_stake.try_borrow_data()?[..])?;
    require_keys_eq!(
        user_stake.mint,
        arena.stake_mint,
        crate::errors::HolderArenaError::InvalidStakeMint
    );
    require_keys_eq!(user_stake.owner, ctx.accounts.owner.key(), crate::errors::HolderArenaError::AmountMismatch);

    require_eq!(
        user_tracked.amount,
        arena.battle_lot,
        crate::errors::HolderArenaError::AmountMismatch
    );
    require_eq!(
        user_stake.amount,
        arena.entry_stake,
        crate::errors::HolderArenaError::AmountMismatch
    );

    let slot = Clock::get()?.slot;
    let battle = ctx.accounts.arena.battle_lot;
    let entry = ctx.accounts.arena.entry_stake;

    let cpi_tr = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: ctx.accounts.user_tracked.to_account_info(),
            to: ctx.accounts.position_tracked_vault.to_account_info(),
            authority: ctx.accounts.owner.to_account_info(),
        },
    );
    token::transfer(cpi_tr, battle)?;

    let cpi_st = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: ctx.accounts.user_stake.to_account_info(),
            to: ctx.accounts.arena_stake_vault.to_account_info(),
            authority: ctx.accounts.owner.to_account_info(),
        },
    );
    token::transfer(cpi_st, entry)?;

    let arena_mut = &mut ctx.accounts.arena;
    arena_mut.joined_count = arena_mut
        .joined_count
        .checked_add(1)
        .ok_or(crate::errors::HolderArenaError::MathOverflow)?;

    let pos = &mut ctx.accounts.position;
    pos.arena = ctx.accounts.arena.key();
    pos.owner = ctx.accounts.owner.key();
    pos.tracked_vault = ctx.accounts.position_tracked_vault.key();
    pos.state = PositionState::Recruiting;
    pos.battle_lot = ctx.accounts.arena.battle_lot;
    pos.entry_stake = ctx.accounts.arena.entry_stake;
    pos.join_slot = slot;
    pos.exit_slot = 0;
    pos.claim_slot = 0;
    pos.bump = ctx.bumps.position;

    emit!(Joined {
        arena: pos.arena,
        owner: pos.owner,
        position: pos.key(),
    });
    Ok(())
}
