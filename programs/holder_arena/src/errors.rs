use anchor_lang::prelude::*;

#[error_code]
pub enum HolderArenaError {
    #[msg("Protocol is paused")]
    Paused,
    #[msg("Invalid arena creation mode for caller")]
    InvalidArenaCreator,
    #[msg("Arena is not recruiting")]
    ArenaNotRecruiting,
    #[msg("Arena is not live")]
    ArenaNotLive,
    #[msg("Arena not finalized")]
    ArenaNotFinalized,
    #[msg("Seat count must be greater than winner count")]
    SeatCountTooLow,
    #[msg("Arena full")]
    ArenaFull,
    #[msg("Mint policy not allowed")]
    MintNotAllowed,
    #[msg("Tracked mint policy missing")]
    MintPolicyMissing,
    #[msg("Wrong token program for mint")]
    InvalidTokenProgram,
    #[msg("Mint authority must be none (revoked)")]
    MintAuthorityNotRevoked,
    #[msg("Freeze authority must be none")]
    FreezeAuthorityPresent,
    #[msg("Winner count must be 3 for MVP")]
    InvalidWinnerCount,
    #[msg("Amount mismatch for battle lot or stake")]
    AmountMismatch,
    #[msg("Position already exists")]
    PositionAlreadyExists,
    #[msg("Invalid position state")]
    InvalidPositionState,
    #[msg("Not owner")]
    NotOwner,
    #[msg("Arena not full yet")]
    ArenaNotFull,
    #[msg("Active count must be 3 to finalize")]
    InvalidActiveCount,
    #[msg("Duplicate winner position")]
    DuplicateWinner,
    #[msg("Position not a winner")]
    NotWinner,
    #[msg("Already claimed")]
    AlreadyClaimed,
    #[msg("Math overflow")]
    MathOverflow,
    #[msg("Invalid stake mint")]
    InvalidStakeMint,
    #[msg("Tracked mint must use classic SPL Token for this policy")]
    Token2022NotAllowed,
}
