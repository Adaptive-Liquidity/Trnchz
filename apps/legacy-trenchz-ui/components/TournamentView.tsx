
import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip, AreaChart, Area, XAxis } from 'recharts';
import { Tournament, Participant } from '../types';
import { Card } from './Card';
import { Button } from './Button';
import { 
  Trophy, 
  Users, 
  Timer, 
  Zap, 
  ShieldAlert, 
  Skull, 
  TrendingUp, 
  ArrowLeft,
  ChevronRight,
  Loader2,
  CheckCircle2,
  ExternalLink,
  Flame,
  Bomb,
  Clock,
  Server,
  Database,
  Crosshair,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TournamentViewProps {
  tournament: Tournament;
  onBack: () => void;
}

export const TournamentView: React.FC<TournamentViewProps> = ({ tournament, onBack }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [chartData, setChartData] = useState<{ time: string, price: number }[]>([]);
  const [joinStatus, setJoinStatus] = useState<'IDLE' | 'JOINING' | 'CONFIRMED'>('IDLE');
  const [timeLeft, setTimeLeft] = useState(tournament.timeRemaining);
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'technical' | 'prizes'>('leaderboard');
  const [networkLatency, setNetworkLatency] = useState(14); // ms
  
  // Use a ref to track the latest price for the interval closure without stale state
  const latestPriceRef = useRef(tournament.token.currentPrice);
  
  // Real-time countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
      setNetworkLatency(Math.floor(Math.random() * (45 - 12 + 1) + 12)); // Simulate RPC jitter
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Real-time price simulation & Game Loop
  useEffect(() => {
    // Initialize chart data if empty
    if (chartData.length === 0) {
      const initialData = Array.from({ length: 20 }, (_, i) => ({
        time: `${i}:00`,
        price: tournament.token.currentPrice * (1 + (Math.random() * 0.1 - 0.05))
      }));
      setChartData(initialData);
      latestPriceRef.current = initialData[initialData.length - 1].price;
    }

    const interval = setInterval(() => {
      // 1. Calculate Price Movement (Random Walk)
      const volatility = tournament.type === 'DEATHMATCH' ? 0.08 : 0.05; // Higher vol for deathmatch
      const drift = 0.001; // Slight upward drift
      const change = 1 + (Math.random() * volatility - (volatility / 2)) + drift;
      const nextPrice = latestPriceRef.current * change;
      latestPriceRef.current = nextPrice;

      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });

      // 2. Update Chart
      setChartData(prev => {
        return [...prev.slice(1), { time: timestamp, price: nextPrice }];
      });

      // 3. Update Participants & Enforce Rules
      setParticipants(prev => prev.map(p => {
        if (p.disqualified) return p;

        // Dynamic PnL Calculation
        // Formula: (Current - Entry) / Entry * 100
        const pnl = ((nextPrice - p.entryPrice) / p.entryPrice) * 100;
        
        let isDisqualified = false;
        
        // --- GAME MODE: ROYALE LOGIC ---
        if (tournament.type === 'ROYALE') {
           // RULE 1: LIQUIDATION THRESHOLD (The "Trench")
           // If PnL drops below -30%, the protocol automatically purges the wallet to save remaining pool value? 
           // Or just standard "Rekt" disqualification.
           if (pnl < -30.0) {
             isDisqualified = true;
           }

           // RULE 2: MINIMUM HOLD TIME (Anti-Jeet)
           // Simulate a "Paper Hand" action. 
           // If a user (simulated) tries to exit before the minimum hold time, they are disqualified.
           const isPaperHanding = Math.random() < 0.02; // 2% chance per tick to fold
           const minHoldSeconds = 300; // 5 minutes required hold

           if (isPaperHanding && p.timeHeld < minHoldSeconds) {
             isDisqualified = true;
           }
        }

        return {
          ...p,
          currentPrice: nextPrice,
          pnl: parseFloat(pnl.toFixed(2)),
          timeHeld: p.timeHeld + 5, // 5s interval update
          disqualified: p.disqualified || isDisqualified
        };
      }).sort((a, b) => {
        // Sort Order: Active > Disqualified, then High PnL > Low PnL
        if (a.disqualified && !b.disqualified) return 1;
        if (!a.disqualified && b.disqualified) return -1;
        return b.pnl - a.pnl;
      }));

    }, 5000);

    return () => clearInterval(interval);
  }, [tournament]);

  // Initial participants population (Mock)
  useEffect(() => {
    if (participants.length === 0) {
      const ps: Participant[] = Array.from({ length: 15 }, (_, i) => ({
        wallet: `${Math.random().toString(36).substring(7).toUpperCase()}...${Math.random().toString(36).substring(2, 4).toUpperCase()}`,
        entryPrice: tournament.token.currentPrice * (1 + (Math.random() * 0.05 - 0.025)),
        currentPrice: tournament.token.currentPrice,
        pnl: Math.random() * 40 - 10,
        positionValue: Math.random() * 25 + 5,
        timeHeld: Math.floor(Math.random() * 1800),
        rank: i + 1,
        disqualified: Math.random() < 0.1
      })).sort((a, b) => b.pnl - a.pnl);
      setParticipants(ps);
    }
  }, [tournament]);

  const handleJoin = async () => {
    setJoinStatus('JOINING');
    // Simulate Anchor contract interaction
    await new Promise(resolve => setTimeout(resolve, 2500));
    setJoinStatus('CONFIRMED');
    
    // Add player to the board
    const newPlayer: Participant = {
      wallet: "YOU_CHAD_777",
      entryPrice: latestPriceRef.current,
      currentPrice: latestPriceRef.current,
      pnl: 0,
      positionValue: 10,
      timeHeld: 0,
      rank: participants.length + 1,
      disqualified: false
    };
    setParticipants(prev => [newPlayer, ...prev]);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isTimeLow = timeLeft <= 600; // Last 10 minutes

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ARENA HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-900/40 border border-slate-800 p-6 rounded-3xl backdrop-blur-md">
        <div className="flex items-center gap-5">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-emerald-500 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="relative group">
            <img src={tournament.token.logo} className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-800 group-hover:border-emerald-500 transition-all shadow-2xl" />
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-1 rounded-lg">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-display font-black text-slate-100 uppercase italic tracking-tighter leading-none">
                {tournament.token.name} <span className="text-emerald-500">ARENA</span>
              </h2>
              <span className="bg-slate-950 border border-slate-800 px-3 py-1 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest">{tournament.type}</span>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <code className="text-[10px] font-mono font-bold text-slate-600 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">PDA: {tournament.token.ca.substring(0,8)}...SAFE</code>
                <ExternalLink className="w-3 h-3 text-slate-700 cursor-pointer hover:text-emerald-500" />
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">SENTRY_ENGINE_ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="flex-1 lg:flex-none px-6 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-right">
             <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">CUSTODY_VAULT</span>
             <span className="text-2xl font-display font-black text-violet-400 italic leading-none">{tournament.prizePool} SOL</span>
          </div>
          <div className={`flex-1 lg:flex-none px-6 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-right transition-colors duration-500 ${isTimeLow ? 'border-rose-500/50 bg-rose-500/5' : ''}`}>
             <span className={`text-[9px] font-black uppercase tracking-widest block mb-1 ${isTimeLow ? 'text-rose-500 animate-pulse' : 'text-slate-600'}`}>
               {isTimeLow ? 'CRITICAL_EXTRACTION' : 'SETTLEMENT_TIMER'}
             </span>
             <motion.span 
              animate={isTimeLow ? {
                scale: [1, 1.05, 1],
                color: ["#f43f5e", "#ff4d6d", "#f43f5e"],
                textShadow: ["0 0 0px rgba(244,63,94,0)", "0 0 12px rgba(244,63,94,0.4)", "0 0 0px rgba(244,63,94,0)"]
              } : {}}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-2xl font-mono font-black text-rose-500 italic leading-none block"
             >
              {formatTime(timeLeft)}
             </motion.span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visuals & Board */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Chart Card */}
             <Card title="TWAP Oracle Feed" subtitle="High-Fidelity Price Action" className="h-[320px] flex flex-col">
                <div className="flex-1 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px', color: '#fff' }}
                        itemStyle={{ color: '#10b981' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorPrice)" 
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between items-center pt-2 text-[10px] font-mono text-slate-600 border-t border-slate-800/50 mt-2">
                   <span className="flex items-center gap-1.5"><Activity className="w-3 h-3 text-emerald-500" /> LIVE_RPC_STREAM</span>
                   <span className="text-slate-500">PROVIDER: HELIUS • LATENCY: {networkLatency}ms</span>
                </div>
             </Card>

             {/* Combat Stats */}
             <Card title="Sentry Engine Logs" className="h-[320px]">
                <div className="grid grid-cols-2 gap-4 h-full pt-2">
                   <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-center">
                      <Users className="w-5 h-5 text-emerald-500 mb-2" />
                      <span className="text-[9px] font-black text-slate-600 uppercase mb-1">Active_Wallets</span>
                      <span className="text-2xl font-display font-black text-slate-100 italic">{tournament.participantsCount} / 250</span>
                   </div>
                   <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-center">
                      <Flame className="w-5 h-5 text-rose-500 mb-2" />
                      <span className="text-[9px] font-black text-slate-600 uppercase mb-1">Burned_Stakes</span>
                      <span className="text-2xl font-display font-black text-rose-400 italic">4.2K SOL</span>
                   </div>
                   <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-center">
                      <Server className="w-5 h-5 text-violet-500 mb-2" />
                      <span className="text-[9px] font-black text-slate-600 uppercase mb-1">Index_Height</span>
                      <span className="text-2xl font-display font-black text-violet-400 italic">293,481</span>
                   </div>
                   <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
                      <ShieldAlert className="w-5 h-5 text-blue-500 mb-2 relative z-10" />
                      <span className="text-[9px] font-black text-slate-600 uppercase mb-1 relative z-10">Verification</span>
                      <span className="text-2xl font-display font-black text-blue-400 italic relative z-10">OPTIMISTIC</span>
                   </div>
                </div>
             </Card>
          </div>

          {/* Leaderboard Section */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden flex flex-col backdrop-blur-md">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
              <div className="flex gap-4">
                 {(['leaderboard', 'technical', 'prizes'] as const).map(tab => (
                   <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[10px] font-black uppercase tracking-widest pb-1 transition-all border-b-2 ${activeTab === tab ? 'border-emerald-500 text-emerald-500' : 'border-transparent text-slate-600'}`}
                   >
                     {tab}
                   </button>
                 ))}
              </div>
              <div className="text-[10px] font-mono text-slate-500 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> SYNC: {networkLatency}ms
              </div>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'leaderboard' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="overflow-x-auto no-scrollbar"
                  >
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em] border-b border-slate-800">
                          <th className="px-4 py-4">RANK</th>
                          <th className="px-4 py-4">WARRIOR_ADDRESS</th>
                          <th className="px-4 py-4 text-right">PNL_%</th>
                          <th className="px-4 py-4 text-right">SOL_VAL</th>
                          <th className="px-4 py-4 text-right">TENURE</th>
                          <th className="px-4 py-4 text-center">PROTOCOL_STATE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40">
                        {participants.map((p, idx) => (
                          <tr key={p.wallet} className={`group hover:bg-slate-800/20 transition-all ${p.disqualified ? 'opacity-40 grayscale' : ''} ${p.wallet === "YOU_CHAD_777" ? 'bg-emerald-500/10' : ''}`}>
                            <td className="px-4 py-5">
                              <span className={`text-xs font-black font-display italic ${idx < 3 && !p.disqualified ? 'text-emerald-500' : 'text-slate-500'}`}>
                                {idx === 0 && !p.disqualified ? '🥇' : idx === 1 && !p.disqualified ? '🥈' : idx === 2 && !p.disqualified ? '🥉' : `#${idx + 1}`}
                              </span>
                            </td>
                            <td className="px-4 py-5">
                              <div className="flex flex-col">
                                <span className={`text-[11px] font-mono font-bold ${p.wallet === "YOU_CHAD_777" ? 'text-emerald-400' : 'text-slate-200'}`}>{p.wallet}</span>
                                {p.wallet === "YOU_CHAD_777" && <span className="text-[7px] text-emerald-500 font-black uppercase">YOUR_PDA_KEY</span>}
                              </div>
                            </td>
                            <td className={`px-4 py-5 text-right font-display font-black italic text-sm ${p.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {p.pnl > 0 ? '+' : ''}{p.pnl.toFixed(2)}%
                            </td>
                            <td className="px-4 py-5 text-right font-mono font-bold text-slate-300 text-xs">
                              {p.positionValue.toFixed(2)}
                            </td>
                            <td className="px-4 py-5 text-right font-mono text-slate-500 text-xs">
                              {Math.floor(p.timeHeld / 60)}M
                            </td>
                            <td className="px-4 py-5 text-center">
                              {p.disqualified ? (
                                <div className="flex flex-col items-center gap-1 group/dq cursor-help">
                                   <div className="flex items-center gap-1">
                                      <Skull className="w-3 h-3 text-rose-600 group-hover/dq:scale-125 transition-transform" />
                                      <span className="text-[9px] font-black text-rose-600 uppercase">KIA</span>
                                   </div>
                                   <span className="text-[7px] font-mono text-slate-600 uppercase">PROOF_OF_JEET</span>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center gap-2">
                                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                   <span className="text-[9px] font-black text-emerald-500 uppercase">ACTIVE</span>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                )}

                {activeTab === 'technical' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4"
                  >
                    {[
                      { icon: ShieldAlert, title: 'Optimistic Verification', desc: 'Anti-Jeet logic uses optimistic execution with a Sentry reporting overlay.' },
                      { icon: Clock, title: 'TWAP Oracle', desc: 'Settlement price uses 5-minute Time-Weighted Average Price to prevent manipulation.' },
                      { icon: Database, title: 'Anchor PDA', desc: 'Each arena is a unique Program Derived Address on Solana Mainnet.' },
                      { icon: Crosshair, title: 'Bounty System', desc: 'Reporters of Jeet behavior earn 1% of the slashed stake.' }
                    ].map((rule, i) => (
                      <div key={i} className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl flex items-start gap-3">
                         <rule.icon className="w-5 h-5 text-emerald-500 mt-0.5" />
                         <div>
                            <h4 className="text-[10px] font-black text-slate-100 uppercase mb-1">{rule.title}</h4>
                            <p className="text-[9px] font-mono text-slate-500 uppercase leading-tight">{rule.desc}</p>
                         </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'prizes' && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4 py-4"
                  >
                    {[
                      { rank: '1ST_PLACE', percentage: '50%', sol: (tournament.prizePool * 0.5).toFixed(1), color: 'emerald' },
                      { rank: '2ND_PLACE', percentage: '30%', sol: (tournament.prizePool * 0.3).toFixed(1), color: 'emerald' },
                      { rank: '3RD_PLACE', percentage: '20%', sol: (tournament.prizePool * 0.2).toFixed(1), color: 'emerald' }
                    ].map((prize, i) => (
                      <div key={i} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex justify-between items-center group hover:border-emerald-500/50 transition-all">
                         <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl bg-${prize.color}-500/10 flex items-center justify-center border border-${prize.color}-500/20`}>
                               <Trophy className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div>
                               <h4 className="text-xs font-black text-slate-100 italic">{prize.rank}</h4>
                               <span className="text-[9px] font-mono text-slate-600 uppercase">SHARE: {prize.percentage}</span>
                            </div>
                         </div>
                         <div className="text-right">
                            <span className="text-xl font-display font-black text-emerald-500 italic">{prize.sol} SOL</span>
                         </div>
                      </div>
                    ))}
                    <div className="p-4 bg-violet-500/5 border border-violet-500/10 rounded-2xl text-center">
                       <p className="text-[9px] font-black text-violet-400 uppercase tracking-widest">A 5% PROTOCOL_FEE IS ROUTED TO THE TRENCHZ DAO</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column: Interaction */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="sticky top-24">
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                 <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">CURRENT_PUMP_PRICE</span>
                 <div className="flex items-end gap-2">
                    <span className="text-4xl font-display font-black text-slate-100 italic">{latestPriceRef.current.toFixed(5)}</span>
                    <span className={`text-xs font-mono font-bold mb-1.5 ${latestPriceRef.current >= tournament.token.currentPrice ? 'text-emerald-500' : 'text-rose-500'}`}>
                       {latestPriceRef.current >= tournament.token.currentPrice ? '+' : ''}
                       {(((latestPriceRef.current - tournament.token.currentPrice) / tournament.token.currentPrice) * 100).toFixed(2)}%
                    </span>
                 </div>
              </div>

              <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-600 uppercase">ENTRY_FEE</span>
                    <span className="text-sm font-black text-slate-100">{tournament.entryFee} SOL</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-600 uppercase">NETWORK_FEES</span>
                    <span className="text-sm font-black text-slate-100">0.002 SOL</span>
                 </div>
                 <div className="pt-2 border-t border-slate-900 flex justify-between items-center">
                    <span className="text-[10px] font-black text-emerald-500 uppercase">TOTAL_TO_PAY</span>
                    <span className="text-lg font-display font-black text-emerald-500 italic">{(tournament.entryFee + 0.002).toFixed(3)} SOL</span>
                 </div>
              </div>

              <AnimatePresence mode="wait">
                {joinStatus === 'IDLE' && (
                  <Button 
                    key="join"
                    glow 
                    className="w-full py-5 text-base font-black italic tracking-widest gap-3"
                    onClick={handleJoin}
                  >
                    <Zap className="w-5 h-5 fill-slate-950" />
                    JOIN THE WAR
                  </Button>
                )}
                {joinStatus === 'JOINING' && (
                  <motion.div 
                    key="joining"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full py-5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center gap-3 text-slate-400 font-black italic text-sm"
                  >
                    <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
                    ANCHOR_TX_PENDING...
                  </motion.div>
                )}
                {joinStatus === 'CONFIRMED' && (
                  <motion.div 
                    key="confirmed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full py-5 bg-emerald-500 rounded-xl flex items-center justify-center gap-3 text-slate-950 font-black italic text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    COMBAT_DEPLOYED_OK
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex items-start gap-3">
                 <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                 <p className="text-[9px] font-mono text-slate-500 uppercase leading-tight">
                   WARNING: ENTERING THIS ARENA REQUIRES SOL AS MARGIN. BY DEPLOYING, YOU ACKNOWLEDGE HIGH MARKET VOLATILITY AND CONTRACT-ENFORCED DQ RULES.
                 </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
