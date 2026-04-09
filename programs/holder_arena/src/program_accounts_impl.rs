// Included at crate root (`lib.rs`) so Anchor-generated `__client_accounts_*` modules
// resolve to `crate::__client_accounts_*` (required by `#[program]` re-exports).
#[allow(unused_imports)]
use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{Mint, Token, TokenAccount};

use crate::constants::{ARENA_SEED, CONFIG_SEED, MINT_POLICY_SEED, POSITION_SEED, VAULT_AUTH_SEED};
use crate::state::{Arena, GlobalConfig, MintPolicy, Position, PositionState};

#[derive(Accounts)]
pub struct InitializeConfig<'info> {
    #[account(
        init,
        payer = payer,
        space = 8 + GlobalConfig::LEN,
        seeds = [CONFIG_SEED],
        bump
    )]
    pub global_config: Account<'info, GlobalConfig>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SetMintPolicy<'info> {
    #[account(
        mut,
        constraint = global_config.authority == authority.key() @ crate::errors::HolderArenaError::NotOwner
    )]
    pub global_config: Account<'info, GlobalConfig>,
    #[account(mut)]
    pub authority: Signer<'info>,
    /// CHECK: mint account (classic SPL); must appear before mint_policy for PDA seeds.
    pub mint: UncheckedAccount<'info>,
    #[account(
        init_if_needed,
        payer = authority,
        space = 8 + MintPolicy::LEN,
        seeds = [MINT_POLICY_SEED, mint.key().as_ref()],
        bump
    )]
    pub mint_policy: Account<'info, MintPolicy>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(
    arena_id: u64,
    battle_lot: u64,
    entry_stake: u64,
    seat_count: u16,
    winner_count: u16
)]
pub struct CreateArena<'info> {
    #[account(mut)]
    pub global_config: Account<'info, GlobalConfig>,
    #[account(
        init,
        payer = creator,
        space = 8 + Arena::LEN,
        seeds = [ARENA_SEED.as_ref(), &arena_id.to_le_bytes()],
        bump
    )]
    pub arena: Account<'info, Arena>,
    #[account(
        seeds = [crate::constants::MINT_POLICY_SEED, tracked_mint.key().as_ref()],
        bump = mint_policy_tracked.bump
    )]
    pub mint_policy_tracked: Account<'info, MintPolicy>,
    #[account(
        seeds = [crate::constants::MINT_POLICY_SEED, stake_mint.key().as_ref()],
        bump = mint_policy_stake.bump
    )]
    pub mint_policy_stake: Account<'info, MintPolicy>,
    /// CHECK: classic SPL mint
    pub tracked_mint: AccountInfo<'info>,
    #[account(constraint = stake_mint.key() == global_config.default_stake_mint @ crate::errors::HolderArenaError::InvalidStakeMint)]
    pub stake_mint: Account<'info, Mint>,
    #[account(
        seeds = [VAULT_AUTH_SEED.as_ref(), arena.key().as_ref()],
        bump
    )]
    pub vault_authority: UncheckedAccount<'info>,
    #[account(
        init,
        payer = creator,
        associated_token::mint = stake_mint,
        associated_token::authority = vault_authority,
    )]
    pub arena_stake_vault: Account<'info, TokenAccount>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct JoinArena<'info> {
    pub global_config: Account<'info, GlobalConfig>,
    #[account(mut)]
    pub arena: Account<'info, Arena>,
    /// CHECK: mint policy PDA — validated in handler (saves BPF stack vs `Account<MintPolicy>` in `try_accounts`).
    pub mint_policy: UncheckedAccount<'info>,
    #[account(
        init,
        payer = owner,
        space = 8 + Position::LEN,
        seeds = [POSITION_SEED.as_ref(), arena.key().as_ref(), owner.key().as_ref()],
        bump
    )]
    pub position: Account<'info, Position>,
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        seeds = [VAULT_AUTH_SEED.as_ref(), arena.key().as_ref()],
        bump = arena.vault_authority_bump
    )]
    pub vault_authority: UncheckedAccount<'info>,
    /// CHECK: arena stake vault — deserialized in handler (reduces BPF stack in `try_accounts`).
    #[account(mut)]
    pub arena_stake_vault: UncheckedAccount<'info>,
    /// CHECK: user tracked ATA — validated in handler.
    #[account(mut)]
    pub user_tracked: UncheckedAccount<'info>,
    /// CHECK: user stake ATA — validated in handler.
    #[account(mut)]
    pub user_stake: UncheckedAccount<'info>,
    #[account(
        init,
        payer = owner,
        associated_token::mint = tracked_mint,
        associated_token::authority = position,
    )]
    pub position_tracked_vault: Account<'info, TokenAccount>,
    /// CHECK: SPL mint (tracked) — validated in handler (`validate_tracked_mint_strict` + keys).
    pub tracked_mint: UncheckedAccount<'info>,
    /// CHECK: SPL mint (stake) — key checked against arena in handler.
    pub stake_mint: UncheckedAccount<'info>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct LeaveRecruiting<'info> {
    pub global_config: Account<'info, GlobalConfig>,
    #[account(mut)]
    pub arena: Account<'info, Arena>,
    #[account(
        mut,
        close = owner,
        seeds = [POSITION_SEED.as_ref(), arena.key().as_ref(), owner.key().as_ref()],
        bump = position.bump,
        constraint = position.state == PositionState::Recruiting @ crate::errors::HolderArenaError::InvalidPositionState
    )]
    pub position: Account<'info, Position>,
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        seeds = [VAULT_AUTH_SEED.as_ref(), arena.key().as_ref()],
        bump = arena.vault_authority_bump
    )]
    pub vault_authority: UncheckedAccount<'info>,
    #[account(mut, associated_token::mint = stake_mint, associated_token::authority = vault_authority)]
    pub arena_stake_vault: Account<'info, TokenAccount>,
    #[account(mut, constraint = user_stake.owner == owner.key())]
    pub user_stake: Account<'info, TokenAccount>,
    #[account(mut, constraint = user_tracked.owner == owner.key())]
    pub user_tracked: Account<'info, TokenAccount>,
    #[account(
        mut,
        constraint = position_tracked_vault.key() == position.tracked_vault @ crate::errors::HolderArenaError::AmountMismatch
    )]
    pub position_tracked_vault: Account<'info, TokenAccount>,
    pub stake_mint: Account<'info, anchor_spl::token::Mint>,
    pub tracked_mint: Account<'info, anchor_spl::token::Mint>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct ActivateArenaIfFull<'info> {
    pub global_config: Account<'info, GlobalConfig>,
    #[account(mut)]
    pub arena: Account<'info, Arena>,
}

#[derive(Accounts)]
pub struct SurrenderLive<'info> {
    pub global_config: Account<'info, GlobalConfig>,
    #[account(mut)]
    pub arena: Account<'info, Arena>,
    #[account(
        mut,
        seeds = [POSITION_SEED.as_ref(), arena.key().as_ref(), owner.key().as_ref()],
        bump = position.bump,
        constraint = position.owner == owner.key() @ crate::errors::HolderArenaError::NotOwner
    )]
    pub position: Account<'info, Position>,
    pub owner: Signer<'info>,
    #[account(
        mut,
        constraint = position_tracked_vault.key() == position.tracked_vault @ crate::errors::HolderArenaError::AmountMismatch
    )]
    pub position_tracked_vault: Account<'info, TokenAccount>,
    #[account(mut, constraint = user_tracked.owner == owner.key())]
    pub user_tracked: Account<'info, TokenAccount>,
    pub tracked_mint: Account<'info, anchor_spl::token::Mint>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct FinalizeIfThreeLeft<'info> {
    pub global_config: Account<'info, GlobalConfig>,
    #[account(mut)]
    pub arena: Account<'info, Arena>,
    #[account(
        seeds = [VAULT_AUTH_SEED.as_ref(), arena.key().as_ref()],
        bump = arena.vault_authority_bump
    )]
    pub vault_authority: UncheckedAccount<'info>,
    #[account(mut, associated_token::mint = stake_mint, associated_token::authority = vault_authority)]
    pub arena_stake_vault: Account<'info, TokenAccount>,
    #[account(constraint = stake_mint.key() == arena.stake_mint @ crate::errors::HolderArenaError::InvalidStakeMint)]
    pub stake_mint: Account<'info, anchor_spl::token::Mint>,
    #[account(
        mut,
        constraint = treasury_token_account.owner == global_config.treasury @ crate::errors::HolderArenaError::NotOwner
    )]
    pub treasury_token_account: Account<'info, TokenAccount>,
    #[account(
        mut,
        seeds = [POSITION_SEED.as_ref(), arena.key().as_ref(), pa.owner.as_ref()],
        bump = pa.bump
    )]
    pub pa: Account<'info, Position>,
    #[account(
        mut,
        seeds = [POSITION_SEED.as_ref(), arena.key().as_ref(), pb.owner.as_ref()],
        bump = pb.bump
    )]
    pub pb: Account<'info, Position>,
    #[account(
        mut,
        seeds = [POSITION_SEED.as_ref(), arena.key().as_ref(), pc.owner.as_ref()],
        bump = pc.bump
    )]
    pub pc: Account<'info, Position>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct ClaimWinnings<'info> {
    pub global_config: Account<'info, GlobalConfig>,
    #[account(mut)]
    pub arena: Account<'info, Arena>,
    #[account(
        seeds = [VAULT_AUTH_SEED.as_ref(), arena.key().as_ref()],
        bump = arena.vault_authority_bump
    )]
    pub vault_authority: UncheckedAccount<'info>,
    #[account(mut, associated_token::mint = stake_mint, associated_token::authority = vault_authority)]
    pub arena_stake_vault: Account<'info, TokenAccount>,
    #[account(constraint = stake_mint.key() == arena.stake_mint @ crate::errors::HolderArenaError::InvalidStakeMint)]
    pub stake_mint: Account<'info, anchor_spl::token::Mint>,
    #[account(
        mut,
        seeds = [POSITION_SEED.as_ref(), arena.key().as_ref(), owner.key().as_ref()],
        bump = position.bump,
        constraint = position.owner == owner.key() @ crate::errors::HolderArenaError::NotOwner
    )]
    pub position: Account<'info, Position>,
    pub owner: Signer<'info>,
    #[account(mut, constraint = user_stake.owner == owner.key())]
    pub user_stake: Account<'info, TokenAccount>,
    #[account(
        mut,
        constraint = position_tracked_vault.key() == position.tracked_vault @ crate::errors::HolderArenaError::AmountMismatch
    )]
    pub position_tracked_vault: Account<'info, TokenAccount>,
    #[account(mut, constraint = user_tracked.owner == owner.key())]
    pub user_tracked: Account<'info, TokenAccount>,
    pub tracked_mint: Account<'info, anchor_spl::token::Mint>,
    pub token_program: Program<'info, Token>,
}
