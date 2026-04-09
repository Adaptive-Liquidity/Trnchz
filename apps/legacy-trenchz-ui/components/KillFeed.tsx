
import React, { useState, useEffect } from 'react';
import { MOCK_KILL_FEED } from '../constants';
import { KillFeedItem } from '../types';

export const KillFeed: React.FC = () => {
  const [feed, setFeed] = useState<KillFeedItem[]>(MOCK_KILL_FEED);

  // Simulate new kills
  useEffect(() => {
    const interval = setInterval(() => {
      const newItem: KillFeedItem = {
        id: Math.random().toString(),
        winner: `${Math.random().toString(36).substring(7)}...`,
        amount: parseFloat((Math.random() * 50).toFixed(1)),
        token: ['PEPE', 'SCAT', 'KING', 'DOGE', 'SOL'][Math.floor(Math.random() * 5)],
        timestamp: Date.now()
      };
      setFeed(prev => [newItem, ...prev].slice(0, 5));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900/80 border-y border-slate-800 py-1 overflow-hidden h-10 flex items-center">
      <div className="animate-marquee whitespace-nowrap flex gap-12 text-sm font-medium">
        {feed.map(item => (
          <div key={item.id} className="flex items-center gap-2">
            <span className="text-emerald-400">⚔️ {item.winner}</span>
            <span className="text-slate-400">WON</span>
            <span className="text-violet-400 font-bold">{item.amount} SOL</span>
            <span className="text-slate-400">IN</span>
            <span className="text-slate-100 font-display font-bold">{item.token}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};
