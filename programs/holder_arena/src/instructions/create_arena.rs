use anchor_lang::prelude::*;

use crate::CreateArena;
use crate::constants::WINNER_COUNT;
use crate::events::ArenaCreated;
use crate::state::{ArenaCreationMode, ArenaState};
use crate::utils::mint::validate_tracked_mint_strict;

pub fn handler(
    ctx: Context<CreateArena>,
    arena_id: u64,
    battle_lot: u64,
    entry_stake: u64,
    seat_count: u16,
    winner_count: u16,
) -> Result<()> {
    {
        let cfg = &ctx.accounts.global_config;
        require!(!cfg.paused, crate::errors::HolderArenaError::Paused);
        require_eq!(arena_id, cfg.next_arena_id, crate::errors::HolderArenaError::InvalidArenaCreator);
        require!(seat_count > WINNER_COUNT, crate::errors::HolderArenaError::SeatCountTooLow);
        require_eq!(winner_count, WINNER_COUNT, crate::errors::HolderArenaError::InvalidWinnerCount);
        require!(battle_lot > 0 && entry_stake > 0, crate::errors::HolderArenaError::AmountMismatch);

        match cfg.arena_creation_mode {
            ArenaCreationMode::AuthorityOnly => {
                require_keys_eq!(
                    ctx.accounts.creator.key(),
                    cfg.authority,
                    crate::errors::HolderArenaError::InvalidArenaCreator
                );
            }
            ArenaCreationMode::Allowlisted | ArenaCreationMode::Permissionless => {}
        }
    }

    validate_tracked_mint_strict(&ctx.accounts.tracked_mint)?;
    require!(ctx.accounts.mint_policy_tracked.allowed, crate::errors::HolderArenaError::MintNotAllowed);
    require!(ctx.accounts.mint_policy_stake.allowed, crate::errors::HolderArenaError::MintNotAllowed);

    let tracked_token_program = *ctx.accounts.tracked_mint.owner;
    require_keys_eq!(
        tracked_token_program,
        anchor_spl::token::ID,
        crate::errors::HolderArenaError::Token2022NotAllowed
    );

    let slot = Clock::get()?.slot;
    let arena = &mut ctx.accounts.arena;
    arena.arena_id = arena_id;
    arena.creator = ctx.accounts.creator.key();
    arena.tracked_mint = ctx.accounts.tracked_mint.key();
    arena.tracked_token_program = tracked_token_program;
    arena.stake_mint = ctx.accounts.stake_mint.key();
    arena.stake_token_program = anchor_spl::token::ID;
    arena.battle_lot = battle_lot;
    arena.entry_stake = entry_stake;
    arena.seat_count = seat_count;
    arena.joined_count = 0;
    arena.active_count = 0;
    arena.winner_count = winner_count;
    arena.state = ArenaState::Recruiting;
    arena.created_slot = slot;
    arena.activated_slot = 0;
    arena.finalized_slot = 0;
    arena.vault_authority_bump = ctx.bumps.vault_authority;
    arena.per_winner_share = 0;
    arena.bump = ctx.bumps.arena;

    let gc = &mut ctx.accounts.global_config;
    gc.next_arena_id = gc
        .next_arena_id
        .checked_add(1)
        .ok_or(crate::errors::HolderArenaError::MathOverflow)?;

    emit!(ArenaCreated {
        arena: arena.key(),
        arena_id: arena.arena_id,
        tracked_mint: arena.tracked_mint,
    });
    Ok(())
}
