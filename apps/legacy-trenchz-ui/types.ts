
export type TournamentType = 'ROYALE' | 'DEATHMATCH' | 'KING_OF_HILL' | 'SURVIVOR';

export interface TokenMetadata {
  name: string;
  symbol: string;
  ca: string;
  logo: string;
  currentPrice: number;
}

export interface Participant {
  wallet: string;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  positionValue: number;
  timeHeld: number;
  rank: number;
  disqualified: boolean;
}

export interface Tournament {
  id: string;
  type: TournamentType;
  creator: string;
  token: TokenMetadata;
  prizePool: number;
  entryFee: number;
  participantsCount: number;
  timeRemaining: number; // seconds
  totalDuration: number; // seconds
  status: 'ACTIVE' | 'PENDING' | 'COMPLETED';
}

export interface KillFeedItem {
  id: string;
  winner: string;
  amount: number;
  token: string;
  timestamp: number;
}
