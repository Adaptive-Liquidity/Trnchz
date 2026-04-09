
import React from 'react';
import { Tournament, KillFeedItem } from './types';

export const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: 't1',
    type: 'ROYALE',
    creator: 'C7...xY',
    token: {
      name: 'PEPE PUMP',
      symbol: 'PEPE',
      ca: 'EpjFW...6M',
      logo: 'https://picsum.photos/id/1/200/200',
      currentPrice: 0.00045,
    },
    prizePool: 125.5,
    entryFee: 0.5,
    participantsCount: 42,
    timeRemaining: 3600,
    totalDuration: 7200,
    status: 'ACTIVE',
  },
  {
    id: 't2',
    type: 'DEATHMATCH',
    creator: 'A2...b4',
    token: {
      name: 'SOL CAT',
      symbol: 'SCAT',
      ca: '9k...Zz',
      logo: 'https://picsum.photos/id/102/200/200',
      currentPrice: 0.0012,
    },
    prizePool: 50.0,
    entryFee: 1.0,
    participantsCount: 2,
    timeRemaining: 1200,
    totalDuration: 3600,
    status: 'ACTIVE',
  },
  {
    id: 't3',
    type: 'KING_OF_HILL',
    creator: 'D9...w1',
    token: {
      name: 'PUMP KING',
      symbol: 'KING',
      ca: '4v...Rr',
      logo: 'https://picsum.photos/id/103/200/200',
      currentPrice: 0.0056,
    },
    prizePool: 210.2,
    entryFee: 0.25,
    participantsCount: 156,
    timeRemaining: 18000,
    totalDuration: 86400,
    status: 'ACTIVE',
  }
];

export const MOCK_KILL_FEED: KillFeedItem[] = [
  { id: 'k1', winner: '8x...2v', amount: 45.2, token: 'PEPE', timestamp: Date.now() - 5000 },
  { id: 'k2', winner: 'G2...p9', amount: 12.8, token: 'SCAT', timestamp: Date.now() - 15000 },
  { id: 'k3', winner: 'L0...r6', amount: 89.1, token: 'KING', timestamp: Date.now() - 30000 },
];
