use anchor_lang::prelude::*;

use crate::ActivateArenaIfFull;
use crate::events::Activated;
use crate::state::ArenaState;

pub fn handler(ctx: Context<ActivateArenaIfFull>) -> Result<()> {
    require!(!ctx.accounts.global_config.paused, crate::errors::HolderArenaError::Paused);
    let arena = &mut ctx.accounts.arena;
    require!(arena.state == ArenaState::Recruiting, crate::errors::HolderArenaError::ArenaNotRecruiting);
    require_eq!(
        arena.joined_count,
        arena.seat_count,
        crate::errors::HolderArenaError::ArenaNotFull
    );
    arena.state = ArenaState::Live;
    arena.active_count = arena.joined_count;
    arena.activated_slot = Clock::get()?.slot;
    emit!(Activated {
        arena: arena.key(),
        slot: arena.activated_slot,
    });
    Ok(())
}
