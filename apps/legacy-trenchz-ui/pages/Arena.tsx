import React, { useState } from 'react';
import { 
  Globe, ShieldCheck, Radar, Crown, ChevronRight, 
  Target, Clock, Flame, Zap, Timer 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_TOURNAMENTS } from '../constants';
import { Tournament } from '../types';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

type FilterMode = 'HIGHEST_BOUNTY' | 'ENDING_SOON' | 'MOST_ACTIVE';

interface ArenaProps {
  onSelectTournament: (t: Tournament) => void;
}

export const Arena: React.FC<ArenaProps> = ({ onSelectTournament }) => {
  const [filterMode, setFilterMode] = useState<FilterMode>('HIGHEST_BOUNTY');

  // Helper functions
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const getModeColor = (type: string) => {
    switch (type) {
      case 'ROYALE': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'DEATHMATCH': return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
      default: return 'text-violet-400 border-violet-500/30 bg-violet-500/10';
    }
  };

  const getModeBorderHover = (type: string) => {
    switch (type) {
      case 'ROYALE': return 'group-hover:border-emerald-500/50';
      case 'DEATHMATCH': return 'group-hover:border-rose-500/50';
      default: return 'group-hover:border-violet-500/50';
    }
  };

  const getFeaturedTournaments = () => {
    const sorted = [...MOCK_TOURNAMENTS].sort((a, b) => {
      switch (filterMode) {
        case 'HIGHEST_BOUNTY':
          return b.prizePool - a.prizePool || a.timeRemaining - b.timeRemaining;
        case 'ENDING_SOON':
          return a.timeRemaining - b.timeRemaining || b.prizePool - a.prizePool;
        case 'MOST_ACTIVE':
          return b.participantsCount - a.participantsCount || b.prizePool - a.prizePool;
        default:
          return 0;
      }
    });
    return sorted.slice(0, 3);
  };

  // Find the "King" tournament
  const kingTournament = MOCK_TOURNAMENTS.length > 0 ? MOCK_TOURNAMENTS.reduce((prev, current) => 
    ((prev.prizePool * 10) + prev.participantsCount) > ((current.prizePool * 10) + current.participantsCount) ? prev : current
  ) : null;

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      
      {/* 1. TOP DASHBOARD SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* GLOBAL TACTICAL INDEX */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-[1.5rem] p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-6 opacity-5">
              <Radar className="w-32 h-32 text-emerald-500" />
          </div>
          
          <div className="relative z-10 flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-emerald-500 animate-spin-slow" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Global_Tactical_Index</span>
              </div>
              <h2 className="text-2xl font-display font-black text-slate-100 uppercase italic">Combat Theater</h2>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Protocol_v4.2_OK</span>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-4 border-t border-slate-800/50 pt-4">
              <div>
                <p className="text-[8px] font-black text-slate-600 uppercase mb-0.5">Live_Spoils</p>
                <p className="text-xl font-display font-black text-emerald-500 italic">4.1K <span className="text-xs text-slate-500 not-italic">SOL</span></p>
              </div>
              <div>
                <p className="text-[8px] font-black text-slate-600 uppercase mb-0.5">Warriors</p>
                <p className="text-xl font-display font-black text-violet-400 italic">8,241</p>
              </div>
              <div>
                <p className="text-[8px] font-black text-slate-600 uppercase mb-0.5">Purge_Ratio</p>
                <p className="text-xl font-display font-black text-rose-500 italic">94.2%</p>
              </div>
          </div>
        </div>

        {/* KING OF THE HILL */}
        {kingTournament ? (
          <div 
            className="relative group cursor-pointer bg-slate-900/80 border border-amber-500/30 rounded-[1.5rem] p-6 overflow-hidden hover:border-amber-500/60 transition-all"
            onClick={() => onSelectTournament(kingTournament)}
          >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Crown className="w-24 h-24 text-amber-500 -rotate-12" />
              </div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-bounce" />
                      <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">Sector_King</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <img src={kingTournament.token.logo} className="w-10 h-10 rounded-lg border border-amber-500/30 shadow-lg object-cover" />
                      <div>
                          <h3 className="text-lg font-display font-black text-slate-100 uppercase italic leading-none">{kingTournament.token.symbol}</h3>
                          <span className="text-[9px] font-mono font-bold text-amber-500/80">DOMINANCE</span>
                      </div>
                    </div>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-500/10 flex items-center justify-between">
                    <div>
                      <p className="text-[8px] text-slate-500 font-black uppercase">Bounty</p>
                      <p className="text-lg font-black text-slate-200">{kingTournament.prizePool} ◎</p>
                    </div>
                    <Button className="h-8 px-3 text-[9px] bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500 hover:text-slate-950">
                      RAID <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                </div>
              </div>
          </div>
        ) : (
            <div className="rounded-[1.5rem] border border-slate-800 border-dashed flex items-center justify-center p-6 text-slate-600 text-xs font-mono">
              NO_KING_DETECTED
            </div>
        )}
      </div>

      {/* 2. LIVE ARENAS LIST */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-4 border-b border-slate-900">
        <div>
          <h1 className="text-4xl font-display font-black text-slate-100 uppercase italic tracking-tighter leading-none mb-2">Live Arenas</h1>
          <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-slate-500 text-[10px] font-mono font-bold uppercase tracking-[0.2em]">Deployment status: <span className="text-emerald-500 italic">ACTIVE_COMBAT</span></p>
          </div>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select 
            className="flex-1 md:flex-none bg-slate-950 border border-slate-800 rounded-2xl px-6 py-3 text-[11px] font-black text-slate-400 uppercase tracking-widest focus:outline-none focus:border-emerald-500 transition-all cursor-pointer"
            onChange={(e) => setFilterMode(e.target.value as FilterMode)}
            value={filterMode}
          >
            <option value="HIGHEST_BOUNTY">HIGHEST BOUNTY</option>
            <option value="ENDING_SOON">ENDING SOON</option>
            <option value="MOST_ACTIVE">MOST ACTIVE</option>
          </select>
          <Button variant="ghost" className="px-6 rounded-2xl border-slate-800">
              <Target className="w-4 h-4 text-slate-500" />
          </Button>
        </div>
      </div>

      {MOCK_TOURNAMENTS.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-slate-800 border-dashed rounded-[2rem] text-slate-600">
          <Radar className="w-16 h-16 opacity-20 mb-4" />
          <p className="text-xs font-mono uppercase tracking-widest">NO_WARZONES_DETECTED_IN_SECTOR</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFeaturedTournaments().map(t => {
            const progress = ((t.totalDuration - t.timeRemaining) / t.totalDuration) * 100;
            const isHot = t.participantsCount > 50;

            return (
              <motion.div 
                key={t.id} 
                className="group relative"
                whileHover={{ y: -5 }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-violet-600 rounded-[2.5rem] blur opacity-0 group-hover:opacity-10 transition duration-700"></div>
                <Card className="relative h-full flex flex-col p-8 border-slate-800 hover:border-emerald-500/40 transition-all rounded-[2.5rem] bg-slate-900/60 backdrop-blur-md overflow-hidden">
                  <div className="p-6 pb-4 border-b border-slate-900/50 flex justify-between items-start bg-slate-900/30">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={t.token.logo} className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-800 group-hover:border-emerald-500/50 transition-all" />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-950 shadow-lg">✓</div>
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-black text-slate-100 italic uppercase leading-none mb-1">{t.token.name}</h3>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{t.token.symbol}</p>
                      </div>
                    </div>
                    <span className={`text-[8px] font-black px-2.5 py-1 rounded-lg bg-slate-950 border tracking-[0.2em] uppercase ${getModeColor(t.type)}`}>
                      {t.type.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="space-y-6 mb-8 flex-1">
                    <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800/50">
                      <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">War Chest</span>
                      <span className="text-4xl font-display font-black text-violet-400 italic leading-none">{t.prizePool} SOL</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest flex items-center gap-1.5"><Timer className="w-3 h-3"/> Extraction</p>
                        <p className="text-rose-500 font-mono font-black text-sm">{formatTime(t.timeRemaining)}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest flex items-center gap-1.5 justify-end"><Zap className="w-3 h-3"/> Entry</p>
                        <p className="text-emerald-400 font-black text-sm">{t.entryFee} SOL</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-800/50">
                        <div className="flex -space-x-3">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="w-7 h-7 rounded-lg border-2 border-slate-900 bg-slate-800 overflow-hidden shadow-xl">
                              <img src={`https://picsum.photos/id/${20 + i}/100/100`} className="grayscale group-hover:grayscale-0 transition-all" />
                            </div>
                          ))}
                        </div>
                        <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{t.participantsCount} Gladiators</span>
                    </div>
                  </div>

                  <Button 
                    className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] italic gap-2 rounded-xl group-hover:bg-slate-100 group-hover:text-slate-950 transition-all ${getModeBorderHover(t.type)} ${
                        t.type === 'DEATHMATCH' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 
                        t.type === 'ROYALE' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                        'bg-violet-500/10 text-violet-500 border border-violet-500/20'
                      }`}
                    onClick={() => onSelectTournament(t)}
                  >
                    ACCESS TERMINAL <ChevronRight className="w-3 h-3" />
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};