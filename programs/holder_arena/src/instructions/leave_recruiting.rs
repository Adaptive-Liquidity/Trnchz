use anchor_lang::prelude::*;
use anchor_spl::token::{self, CloseAccount, Transfer};

use crate::LeaveRecruiting;
use crate::constants::{POSITION_SEED, VAULT_AUTH_SEED};
use crate::events::LeftRecruiting;
use crate::state::ArenaState;

pub fn handler(ctx: Context<LeaveRecruiting>) -> Result<()> {
    require!(!ctx.accounts.global_config.paused, crate::errors::HolderArenaError::Paused);
    require!(
        ctx.accounts.arena.state == ArenaState::Recruiting,
        crate::errors::HolderArenaError::ArenaNotRecruiting
    );

    let battle = ctx.accounts.arena.battle_lot;
    let entry = ctx.accounts.arena.entry_stake;
    let arena_key = ctx.accounts.arena.key();
    let owner_key = ctx.accounts.owner.key();
    let vbump = ctx.accounts.arena.vault_authority_bump;
    let pos_bump = ctx.accounts.position.bump;
    let pos_bump_seed = [pos_bump];
    let pos_seeds: &[&[u8]] = &[
        POSITION_SEED,
        arena_key.as_ref(),
        owner_key.as_ref(),
        &pos_bump_seed,
    ];

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

    let vault_bump_seed = [vbump];
    let vault_seeds: &[&[u8]] = &[VAULT_AUTH_SEED, arena_key.as_ref(), &vault_bump_seed];
    let vault_signers = [vault_seeds];
    let cpi_st = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: ctx.accounts.arena_stake_vault.to_account_info(),
            to: ctx.accounts.user_stake.to_account_info(),
            authority: ctx.accounts.vault_authority.to_account_info(),
        },
        &vault_signers,
    );
    token::transfer(cpi_st, entry)?;

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

    ctx.accounts.arena.joined_count = ctx
        .accounts
        .arena
        .joined_count
        .checked_sub(1)
        .ok_or(crate::errors::HolderArenaError::MathOverflow)?;

    emit!(LeftRecruiting {
        arena: arena_key,
        owner: ctx.accounts.owner.key(),
    });
    Ok(())
}
