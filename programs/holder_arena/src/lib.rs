//! Holder v. Holder — locked-position arena program.
//! Chain state is authoritative; see `docs/specs` and ADR-003.

#![allow(clippy::result_large_err)]

pub mod constants;
pub mod errors;
pub mod events;
pub mod instructions;
pub mod state;
pub mod utils;

use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

include!("program_accounts_impl.rs");

#[program]
pub mod hvh {
    use super::*;

    pub fn initialize_config(
        ctx: Context<InitializeConfig>,
        treasury: Pubkey,
        default_stake_mint: Pubkey,
        arena_creation_mode: u8,
    ) -> Result<()> {
        crate::instructions::initialize_config::handler(ctx, treasury, default_stake_mint, arena_creation_mode)
    }

    pub fn set_mint_policy(
        ctx: Context<SetMintPolicy>,
        allowed: bool,
        require_revoked_mint_authority: bool,
        require_no_freeze_authority: bool,
        allow_token_2022: bool,
        policy_hash: [u8; 32],
    ) -> Result<()> {
        crate::instructions::set_mint_policy::handler(
            ctx,
            allowed,
            require_revoked_mint_authority,
            require_no_freeze_authority,
            allow_token_2022,
            policy_hash,
        )
    }

    pub fn create_arena(
        ctx: Context<CreateArena>,
        arena_id: u64,
        battle_lot: u64,
        entry_stake: u64,
        seat_count: u16,
        winner_count: u16,
    ) -> Result<()> {
        crate::instructions::create_arena::handler(ctx, arena_id, battle_lot, entry_stake, seat_count, winner_count)
    }

    pub fn join_arena(ctx: Context<JoinArena>) -> Result<()> {
        crate::instructions::join_arena::handler(ctx)
    }

    pub fn leave_recruiting(ctx: Context<LeaveRecruiting>) -> Result<()> {
        crate::instructions::leave_recruiting::handler(ctx)
    }

    pub fn activate_arena_if_full(ctx: Context<ActivateArenaIfFull>) -> Result<()> {
        crate::instructions::activate::handler(ctx)
    }

    pub fn surrender_live(ctx: Context<SurrenderLive>) -> Result<()> {
        crate::instructions::surrender::handler(ctx)
    }

    pub fn finalize_if_three_left(ctx: Context<FinalizeIfThreeLeft>) -> Result<()> {
        crate::instructions::finalize::handler(ctx)
    }

    pub fn claim_winnings(ctx: Context<ClaimWinnings>) -> Result<()> {
        crate::instructions::claim::handler(ctx)
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn smoke() {
        assert!(true);
    }
}
