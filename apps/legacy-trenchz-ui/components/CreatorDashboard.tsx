
import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { TournamentType } from '../types';
import { 
  Zap, 
  Plus, 
  History, 
  BarChart3, 
  Settings2, 
  Copy, 
  Check, 
  Clock, 
  Coins, 
  TrendingUp, 
  ShieldCheck,
  LayoutGrid,
  Trophy,
  AlertTriangle,
  Loader2,
  ShieldAlert,
  Target,
  Sword,
  Swords,
  ScrollText,
  Wallet,
  Skull,
  Crosshair,
  FileText,
  ChevronRight,
  Info,
  Lock,
  Search,
  CheckCircle,
  ArrowRight,
  Share2,
  Link as LinkIcon,
  X,
  Facebook,
  Instagram,
  Hash,
  Server,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type DashboardView = 'OVERVIEW' | 'DEPLOY' | 'OPERATIONS' | 'BARRACKS';
type DeployStep = 1 | 2 | 3 | 4;

export const CreatorDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<DashboardView>('OVERVIEW');
  
  // -- DEPLOYMENT WIZARD STATE --
  const [deployStep, setDeployStep] = useState<DeployStep>(1);
  const [isLaunching, setIsLaunching] = useState(false);
  const [simulatedToken, setSimulatedToken] = useState<{name: string, symbol: string, image: string} | null>(null);
  const [isFetchingToken, setIsFetchingToken] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Configuration State
  const [config, setConfig] = useState({
    ca: '',
    type: 'ROYALE' as TournamentType,
    duration: '24h',
    entryFee: 0.5,
    maxPlayers: 100,
    distribution: '50/30/20',
    antiJeet: true,
    creatorSeed: 1.0 // SOL amount creator puts in to start the pot
  });

  const [errors, setErrors] = useState<{ entryFee?: string; distribution?: string; ca?: string }>({});

  // -- USER STATS STATE (MOCKED) --
  const userStats = {
    rank: 'ELITE COMMANDER',
    level: 42,
    totalEarnings: 345.8,
    battlesDeployed: 12,
    battlesWon: 8,
    winRate: 67,
    claimableRoyalties: 12.45
  };

  const activeEngagements = [
    { id: 't1', name: 'PEPE PUMP', type: 'ROYALE', pnl: 145, status: 'WINNING', timeleft: '45m' },
    { id: 't4', name: 'WIF HAT', type: 'DEATHMATCH', pnl: -12, status: 'AT_RISK', timeleft: '2h' },
  ];

  const deployedOperations = [
    { id: 'd1', name: 'DOGE KILLER', type: 'KING_OF_HILL', volume: 450.2, royalties: 22.5, status: 'ACTIVE' },
    { id: 'd2', name: 'BONK WARS', type: 'ROYALE', volume: 120.5, royalties: 6.0, status: 'COMPLETED' },
  ];

  // -- LOGIC --

  const handleTokenSearch = async () => {
    if (config.ca.length < 30) {
      setErrors({...errors, ca: 'INVALID_CONTRACT_LENGTH'});
      return;
    }
    setIsFetchingToken(true);
    setErrors({});
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setSimulatedToken({
      name: 'Simulated Token',
      symbol: 'SIM',
      image: `https://picsum.photos/seed/${config.ca}/200/200`
    });
    setIsFetchingToken(false);
  };

  const nextStep = () => {
    if (deployStep === 1 && !simulatedToken) return;
    setDeployStep(prev => Math.min(prev + 1, 4) as DeployStep);
  };

  const prevStep = () => setDeployStep(prev => Math.max(prev - 1, 1) as DeployStep);

  const handleLaunch = async () => {
    setIsLaunching(true);
    // Simulate deployment steps
    await new Promise(r => setTimeout(r, 800)); // Deploy Contract
    await new Promise(r => setTimeout(r, 800)); // Seed Vault
    await new Promise(r => setTimeout(r, 800)); // Verify
    setIsLaunching(false);
    
    // Instead of redirecting immediately, show the success modal
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setDeployStep(1);
    setConfig({ ...config, ca: '' });
    setSimulatedToken(null);
    setCurrentView('OPERATIONS');
  };

  // Reusable Tooltip Component
  const LabelWithTooltip = ({ label, tooltip, error }: { label: string, tooltip: string, error?: boolean }) => (
    <div className="flex items-center gap-2 mb-3 group w-fit">
      <label className={`text-[9px] font-black uppercase tracking-[0.2em] cursor-help ${error ? 'text-rose-500' : 'text-slate-600'}`}>
        {label}
      </label>
      <div className="relative">
        <Info className={`w-3 h-3 cursor-help transition-colors ${error ? 'text-rose-400' : 'text-slate-600 group-hover:text-emerald-500'}`} />
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-slate-950 border border-slate-700 rounded-xl text-[10px] font-mono text-slate-300 leading-relaxed opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-50 shadow-[0_0_15px_rgba(0,0,0,0.5)] translate-y-2 group-hover:translate-y-0">
          {tooltip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-700" />
        </div>
      </div>
    </div>
  );

  const DeploymentSuccessModal = () => {
    if (!showSuccessModal) return null;

    const shareText = `I just deployed a tactical war zone for $${simulatedToken?.symbol} on @Trenchz.\n\n🏆 Prize Pool: ${config.creatorSeed} SOL (Growing)\n🎟 Entry: ${config.entryFee} SOL\n💀 Mode: ${config.type}\n\nProve your diamond hands or get purged.\n\nJoin the arena:`;
    const shareUrl = `https://trenchz.fun/arena/${config.ca.substring(0,6)}`;

    // Using a specific abstract tech background to match the UE5 prompt vibe
    const cardBgUrl = "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?q=80&w=2070&auto=format&fit=crop"; 

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* LEFT: THE VISUAL CARD (Trojan Style) */}
          <div className="flex flex-col justify-center">
             <div className="relative group perspective-1000">
               <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-violet-600 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
               <div className="relative bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden aspect-[4/5] flex flex-col shadow-2xl">
                  
                  {/* Cinematic Background Image */}
                  <div className="absolute inset-0">
                    <img src={cardBgUrl} className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/80 to-slate-950"></div>
                  </div>

                  {/* Card Content Layer */}
                  <div className="relative z-10 flex flex-col h-full p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center text-slate-950">
                          <Skull className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-black italic uppercase text-slate-100 tracking-wider">TRENCHZ</span>
                      </div>
                      <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[8px] font-black uppercase tracking-[0.2em] rounded">
                        DEPLOYMENT_CONFIRMED
                      </span>
                    </div>

                    {/* Main Focus */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 rounded-full"></div>
                        <img src={simulatedToken?.image} className="relative w-28 h-28 rounded-2xl border-2 border-slate-100/10 shadow-2xl z-10" />
                      </div>
                      
                      <div>
                        <h2 className="text-6xl font-display font-black text-white italic tracking-tighter uppercase leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                          {simulatedToken?.symbol}
                        </h2>
                        <div className="mt-2 inline-block px-4 py-1 rounded-full bg-slate-100/10 backdrop-blur-md border border-slate-100/10">
                           <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">
                              {config.type} ARENA
                           </p>
                        </div>
                      </div>
                    </div>

                    {/* Footer Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-8 border-t border-slate-800/50 pt-6">
                       <div className="bg-slate-950/40 backdrop-blur-sm p-4 rounded-xl border border-slate-800/50">
                          <p className="text-[9px] text-slate-400 font-black uppercase mb-1">Entry Fee</p>
                          <p className="text-xl font-mono font-bold text-white">{config.entryFee} ◎</p>
                       </div>
                       <div className="bg-slate-950/40 backdrop-blur-sm p-4 rounded-xl border border-slate-800/50">
                          <p className="text-[9px] text-slate-400 font-black uppercase mb-1">Total Prize Pool</p>
                          <p className="text-xl font-mono font-bold text-emerald-400">{config.creatorSeed} ◎</p>
                       </div>
                    </div>
                  </div>
               </div>
             </div>
             <p className="text-center text-[9px] text-slate-500 font-mono mt-4 uppercase">
               * Preview of generated social card
             </p>
          </div>

          {/* RIGHT: ACTIONS & LINKS */}
          <div className="flex flex-col justify-center space-y-6">
             <div className="space-y-2">
               <h2 className="text-3xl font-display font-black text-white italic uppercase">Mission Deployed</h2>
               <p className="text-sm text-slate-400">Your competitive arena is live on Solana Mainnet. Spread the propaganda to recruit combatants.</p>
             </div>

             <div className="space-y-3">
               <Button 
                  glow 
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank')}
                  className="w-full py-4 bg-black hover:bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center gap-3 text-sm font-black italic tracking-widest"
               >
                 <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                 POST TO X
               </Button>
               
               <div className="grid grid-cols-2 gap-3">
                 <Button className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white text-xs font-bold gap-2">
                   <Facebook className="w-4 h-4" /> FACEBOOK
                 </Button>
                 <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white text-xs font-bold gap-2">
                   <Instagram className="w-4 h-4" /> INSTAGRAM
                 </Button>
               </div>
             </div>

             <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
                <div>
                   <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">ARENA_UPLINK</label>
                   <div className="flex gap-2">
                      <div className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs font-mono text-emerald-500 truncate">
                         {shareUrl}
                      </div>
                      <Button size="sm" variant="ghost" className="px-3" onClick={() => navigator.clipboard.writeText(shareUrl)}>
                         <Copy className="w-4 h-4" />
                      </Button>
                   </div>
                </div>
                <div>
                   <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">SOLSCAN_VERIFICATION</label>
                   <div className="flex gap-2">
                      <div className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs font-mono text-slate-400 truncate">
                         https://solscan.io/account/{config.ca}
                      </div>
                      <Button size="sm" variant="ghost" className="px-3" onClick={() => window.open(`https://solscan.io/account/${config.ca}`, '_blank')}>
                         <LinkIcon className="w-4 h-4" />
                      </Button>
                   </div>
                </div>
             </div>

             <Button variant="ghost" onClick={closeSuccessModal} className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] gap-2 border-slate-800 hover:bg-slate-800 text-slate-500 hover:text-white">
                <Check className="w-4 h-4" /> RETURN TO BASE
             </Button>
          </div>
        </div>
      </div>
    );
  };

  // -- RENDERERS --

  const renderOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-500">
      {/* KPI CARDS */}
      <div className="lg:col-span-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-emerald-500/10 border-emerald-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Coins className="w-4 h-4 text-emerald-500" />
              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Total_Lifecycle_Value</span>
            </div>
            <span className="text-3xl font-display font-black text-slate-100 italic">{userStats.totalEarnings} SOL</span>
          </Card>
          <Card className="bg-violet-500/10 border-violet-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-4 h-4 text-violet-500" />
              <span className="text-[9px] font-black text-violet-400 uppercase tracking-widest">Victory_Rate</span>
            </div>
            <span className="text-3xl font-display font-black text-slate-100 italic">{userStats.winRate}%</span>
          </Card>
          <Card className="bg-rose-500/10 border-rose-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-4 h-4 text-rose-500" />
              <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Battles_Deployed</span>
            </div>
            <span className="text-3xl font-display font-black text-slate-100 italic">{userStats.battlesDeployed}</span>
          </Card>
        </div>

        {/* ACTIVE DUTY */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-black text-slate-100 uppercase italic">Active Duty <span className="text-slate-500 text-xs not-italic font-mono ml-2">/// CURRENTLY ENGAGED</span></h3>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {activeEngagements.map(battle => (
              <div key={battle.id} className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-center justify-between group hover:border-emerald-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${battle.type === 'ROYALE' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
                    <Sword className={`w-5 h-5 ${battle.type === 'ROYALE' ? 'text-emerald-500' : 'text-rose-500'}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-100 uppercase italic">{battle.name}</h4>
                    <span className="text-[9px] font-mono text-slate-500 uppercase">{battle.type} • ENDS IN {battle.timeleft}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                   <div className="text-right">
                      <p className="text-[8px] font-black text-slate-600 uppercase">Current_PnL</p>
                      <p className={`text-sm font-mono font-bold ${battle.pnl >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>{battle.pnl > 0 ? '+' : ''}{battle.pnl}%</p>
                   </div>
                   <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg border-slate-700">
                     <ChevronRight className="w-4 h-4" />
                   </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COMPETITIVE METRICS */}
        <div className="space-y-4 pt-2">
           <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-black text-slate-100 uppercase italic">Combat Performance <span className="text-slate-500 text-xs not-italic font-mono ml-2">/// LIFETIME METRICS</span></h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-900/40 border-slate-800 p-5 group hover:border-emerald-500/30 transition-all">
                 <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-slate-500 group-hover:text-emerald-500 transition-colors">
                       <Swords className="w-4 h-4" />
                       <span className="text-[9px] font-black uppercase tracking-widest">Total_Wagered</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                       <span className="text-2xl font-display font-black text-slate-100 italic">1,240.5</span>
                       <span className="text-[10px] font-black text-emerald-500">SOL</span>
                    </div>
                 </div>
              </Card>
              <Card className="bg-slate-900/40 border-slate-800 p-5 group hover:border-violet-500/30 transition-all">
                 <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-slate-500 group-hover:text-violet-500 transition-colors">
                       <Coins className="w-4 h-4" />
                       <span className="text-[9px] font-black uppercase tracking-widest">Pool_Contrib</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                       <span className="text-2xl font-display font-black text-slate-100 italic">850.0</span>
                       <span className="text-[10px] font-black text-violet-500">SOL</span>
                    </div>
                 </div>
              </Card>
              <Card className="bg-slate-900/40 border-slate-800 p-5 group hover:border-amber-500/30 transition-all">
                 <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-slate-500 group-hover:text-amber-500 transition-colors">
                       <Trophy className="w-4 h-4" />
                       <span className="text-[9px] font-black uppercase tracking-widest">Win_Ratio</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                       <span className="text-2xl font-display font-black text-slate-100 italic">{userStats.winRate}%</span>
                       <span className="text-[10px] font-black text-amber-500">GLOBAL</span>
                    </div>
                 </div>
              </Card>
           </div>
        </div>
      </div>

      {/* SIDEBAR ACTIONS */}
      <div className="lg:col-span-4 space-y-6">
         <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800">
            <div className="space-y-4">
               <div>
                 <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">UNCLAIMED_ROYALTIES</span>
                 <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-display font-black text-emerald-500 italic">{userStats.claimableRoyalties}</span>
                    <span className="text-sm font-black text-slate-500">SOL</span>
                 </div>
               </div>
               <Button glow className="w-full py-3 text-[10px] font-black uppercase tracking-widest">
                  <Zap className="w-3 h-3" /> EXTRACT_FUNDS
               </Button>
               <p className="text-[8px] text-center font-mono text-slate-600">
                 AUTO-COMPOUNDING INACTIVE. MANUAL EXTRACTION REQUIRED.
               </p>
            </div>
         </Card>
         <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/20">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">SYSTEM_LOGS</h4>
            <div className="space-y-3 font-mono text-[9px]">
               <div className="flex justify-between text-slate-500">
                  <span>[14:20] Reward_Pool_Distrib</span>
                  <span className="text-emerald-500">CONFIRMED</span>
               </div>
               <div className="flex justify-between text-slate-500">
                  <span>[12:01] Battle_Deploy_#882</span>
                  <span className="text-emerald-500">CONFIRMED</span>
               </div>
               <div className="flex justify-between text-slate-500">
                  <span>[09:30] Jeet_Detection</span>
                  <span className="text-rose-500">PURGED_2</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const renderDeployWizard = () => (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500">
      
      {/* Wizard Header */}
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-display font-black text-slate-100 uppercase italic">Operation Initialization Protocol</h2>
        <div className="flex items-center justify-center gap-4">
          {[1, 2, 3, 4].map(step => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black border transition-all ${
                deployStep >= step 
                  ? 'bg-emerald-500 text-slate-950 border-emerald-500' 
                  : 'bg-slate-950 text-slate-600 border-slate-800'
              }`}>
                {step < deployStep ? <Check className="w-4 h-4" /> : step.toString().padStart(2, '0')}
              </div>
              {step < 4 && <div className={`w-8 h-0.5 ${deployStep > step ? 'bg-emerald-500' : 'bg-slate-800'}`} />}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* PHASE 1: ASSET RECON */}
        {deployStep === 1 && (
          <motion.div key="step1" initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -20}}>
            <Card title="Phase 1: Asset Recon" subtitle="Identify the target asset for this engagement.">
              <div className="space-y-6 pt-4">
                <div>
                   <LabelWithTooltip label="TARGET_CONTRACT_ADDRESS" tooltip="The Solana Contract Address (CA) of the Pump.fun token." error={!!errors.ca} />
                   <div className="relative flex items-center">
                     <div className="absolute left-4 text-slate-500"><Search className="w-4 h-4" /></div>
                     <input 
                       value={config.ca}
                       onChange={(e) => setConfig({...config, ca: e.target.value})}
                       placeholder="Enter CA (e.g. EpjFW...)" 
                       className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-sm focus:border-emerald-500 focus:outline-none transition-colors"
                     />
                     <div className="absolute right-2">
                       <Button size="sm" onClick={handleTokenSearch} disabled={isFetchingToken || !config.ca} className="text-[10px] h-8">
                         {isFetchingToken ? <Loader2 className="w-3 h-3 animate-spin" /> : 'SCAN_NETWORK'}
                       </Button>
                     </div>
                   </div>
                </div>

                {simulatedToken && (
                  <div className="flex items-center gap-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl animate-in fade-in slide-in-from-top-2">
                    <img src={simulatedToken.image} className="w-12 h-12 rounded-lg" />
                    <div>
                      <h4 className="font-black text-slate-100 uppercase italic">{simulatedToken.name}</h4>
                      <p className="text-[10px] font-mono text-emerald-500 uppercase">ASSET_VERIFIED • {simulatedToken.symbol}</p>
                    </div>
                    <div className="ml-auto">
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <Button onClick={nextStep} disabled={!simulatedToken} glow>CONFIRM_ASSET <ArrowRight className="w-4 h-4" /></Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* PHASE 2: RULES OF ENGAGEMENT */}
        {deployStep === 2 && (
          <motion.div key="step2" initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -20}}>
            <Card title="Phase 2: Rules of Engagement" subtitle="Define the tactical parameters of the arena.">
              <div className="space-y-8 pt-4">
                
                {/* War Mode */}
                <div>
                  <LabelWithTooltip label="WAR_MODE" tooltip="Standard Royale (High PnL), Deathmatch (High Vol), or King of the Hill." />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(['ROYALE', 'DEATHMATCH', 'KING_OF_HILL', 'SURVIVOR'] as TournamentType[]).map(t => (
                      <button 
                        key={t}
                        onClick={() => setConfig({...config, type: t})}
                        className={`p-3 text-[10px] font-black rounded-xl border transition-all flex flex-col items-center gap-2 ${
                          config.type === t 
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950' 
                          : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
                        }`}
                      >
                        <Trophy className={`w-4 h-4 ${config.type === t ? 'text-slate-950' : 'text-slate-700'}`} />
                        {t.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sliders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <LabelWithTooltip label="DURATION_TIMER" tooltip="Length of the combat window." />
                    <div className="flex flex-wrap gap-2 mb-2">
                       {['1h', '4h', '24h', '3d', '7d'].map(d => (
                         <button key={d} onClick={() => setConfig({...config, duration: d})} className={`px-3 py-1 rounded text-[9px] font-black border uppercase ${config.duration === d ? 'bg-emerald-500 text-slate-950 border-emerald-500' : 'bg-slate-950 text-slate-600 border-slate-800'}`}>{d}</button>
                       ))}
                    </div>
                  </div>

                  <div>
                    <LabelWithTooltip label={`ENTRY_FEE: ${config.entryFee} SOL`} tooltip="Cost to enter. Higher fee = Higher stakes." />
                    <input 
                      type="range" min="0.1" max="10" step="0.1" 
                      value={config.entryFee} 
                      onChange={(e) => setConfig({...config, entryFee: parseFloat(e.target.value)})}
                      className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[8px] text-slate-600 font-mono mt-2">
                      <span>0.1 SOL (PLANKTON)</span>
                      <span>10 SOL (WHALE)</span>
                    </div>
                  </div>
                </div>

                {/* Capacity */}
                 <div>
                    <LabelWithTooltip label={`MAX_COMBATANTS: ${config.maxPlayers}`} tooltip="Lobby cap. Lower cap creates exclusivity/FOMO." />
                    <input 
                      type="range" min="10" max="1000" step="10" 
                      value={config.maxPlayers} 
                      onChange={(e) => setConfig({...config, maxPlayers: parseInt(e.target.value)})}
                      className="w-full accent-violet-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                 </div>

                <div className="flex justify-between pt-4">
                  <Button variant="ghost" onClick={prevStep}>BACK</Button>
                  <Button onClick={nextStep} glow>LOCK PARAMETERS <ArrowRight className="w-4 h-4" /></Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* PHASE 3: VICTORY CONDITIONS */}
        {deployStep === 3 && (
          <motion.div key="step3" initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -20}}>
            <Card title="Phase 3: Victory Conditions" subtitle="Configure payout logic and security protocols.">
              <div className="space-y-8 pt-4">
                
                {/* Distribution */}
                <div>
                   <LabelWithTooltip label="PRIZE_DISTRIBUTION" tooltip="How the War Chest is split." />
                   <div className="grid grid-cols-3 gap-3">
                     {[
                       { id: '100', label: 'WINNER TAKE ALL', desc: '1st: 100%' },
                       { id: '50/30/20', label: 'PODIUM SPLIT', desc: '1st: 50%, 2nd: 30%, 3rd: 20%' },
                       { id: 'TOP10', label: 'DEEP PAYOUT', desc: 'Top 10 players paid' }
                     ].map(opt => (
                       <button
                         key={opt.id}
                         onClick={() => setConfig({...config, distribution: opt.id})}
                         className={`p-4 rounded-xl border text-left transition-all ${
                           config.distribution === opt.id 
                           ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                           : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
                         }`}
                       >
                         <div className="text-[10px] font-black uppercase mb-1">{opt.label}</div>
                         <div className="text-[9px] font-mono opacity-70">{opt.desc}</div>
                       </button>
                     ))}
                   </div>
                </div>

                {/* Security Toggles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div 
                      onClick={() => setConfig({...config, antiJeet: !config.antiJeet})}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${config.antiJeet ? 'bg-rose-500/10 border-rose-500' : 'bg-slate-950 border-slate-800 opacity-50'}`}
                   >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.antiJeet ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className={`text-xs font-black uppercase ${config.antiJeet ? 'text-rose-400' : 'text-slate-500'}`}>ANTI-JEET PROTOCOL</h4>
                        <p className="text-[8px] font-mono text-slate-500">Auto-DQ for sells before 50% duration.</p>
                      </div>
                   </div>
                   
                   <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 flex flex-col justify-center">
                      <LabelWithTooltip label="CREATOR_SEED (SOL)" tooltip="Deposit initial SOL to attract players." />
                      <div className="flex items-center gap-2">
                        <input 
                           type="number" step="0.1" 
                           value={config.creatorSeed}
                           onChange={(e) => setConfig({...config, creatorSeed: parseFloat(e.target.value)})}
                           className="bg-slate-950 border border-slate-800 rounded px-3 py-1 text-sm font-mono text-emerald-500 w-24 focus:outline-none focus:border-emerald-500"
                        />
                        <span className="text-xs font-black text-slate-600">SOL</span>
                      </div>
                   </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="ghost" onClick={prevStep}>BACK</Button>
                  <Button onClick={nextStep} glow>FINALIZE MANIFEST <ArrowRight className="w-4 h-4" /></Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* PHASE 4: DEPLOYMENT */}
        {deployStep === 4 && (
          <motion.div key="step4" initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -20}}>
            <Card title="Phase 4: Deployment Authorization" subtitle="Review manifest and authorize on-chain deployment.">
              <div className="space-y-6 pt-2">
                
                {/* Manifest Ticket */}
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl font-mono text-xs space-y-3 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-2 opacity-20"><Lock className="w-24 h-24 text-slate-700" /></div>
                   <div className="border-b border-slate-800 pb-2 mb-2">
                      <p className="text-slate-500">TARGET_ASSET</p>
                      <p className="text-emerald-400 font-bold text-sm">{simulatedToken?.name} ({simulatedToken?.symbol})</p>
                      <p className="text-slate-600 text-[8px]">{config.ca}</p>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-slate-500">TACTICAL_MODE</p>
                        <p className="text-slate-200">{config.type}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">DURATION</p>
                        <p className="text-slate-200">{config.duration}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">ENTRY_FEE</p>
                        <p className="text-slate-200">{config.entryFee} SOL</p>
                      </div>
                      <div>
                        <p className="text-slate-500">MAX_CAPACITY</p>
                        <p className="text-slate-200">{config.maxPlayers} UNITS</p>
                      </div>
                      <div>
                        <p className="text-slate-500">DISTRIBUTION</p>
                        <p className="text-slate-200">{config.distribution}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">ANTI-JEET</p>
                        <p className={config.antiJeet ? 'text-rose-500' : 'text-slate-600'}>{config.antiJeet ? 'ACTIVE' : 'DISABLED'}</p>
                      </div>
                   </div>
                   <div className="border-t border-slate-800 pt-2 mt-2">
                      <div className="flex justify-between items-center text-sm">
                         <span className="text-slate-400">TOTAL_DEPLOYMENT_COST</span>
                         <span className="text-emerald-500 font-bold">{(config.creatorSeed + 0.02).toFixed(3)} SOL</span>
                      </div>
                      <p className="text-[8px] text-slate-600 text-right mt-1">INCLUDES 0.02 SOL NETWORK + PLATFORM FEE</p>
                   </div>
                </div>

                <div className="flex justify-between items-center pt-4">
                   <Button variant="ghost" onClick={prevStep} disabled={isLaunching}>ADJUST PARAMETERS</Button>
                   <Button 
                      onClick={handleLaunch} 
                      disabled={isLaunching}
                      glow 
                      className="px-8"
                   >
                      {isLaunching ? (
                        <div className="flex items-center gap-2">
                           <Loader2 className="w-4 h-4 animate-spin" /> INITIALIZING PDA...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                           <Database className="w-4 h-4" /> DEPLOY PDA ON-CHAIN
                        </div>
                      )}
                   </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <DeploymentSuccessModal />
    </div>
  );

  const renderOperations = () => (
     <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
        <div className="flex justify-between items-end">
           <h3 className="text-lg font-display font-black text-slate-100 uppercase italic">Your Operations</h3>
           <Button variant="ghost" className="text-[10px]" onClick={() => { setConfig({...config, ca: ''}); setDeployStep(1); setCurrentView('DEPLOY'); }}>+ NEW_DEPLOYMENT</Button>
        </div>
        <div className="grid gap-4">
           {deployedOperations.map(op => (
             <Card key={op.id} className="flex flex-col md:flex-row items-center justify-between p-6 gap-6">
                <div className="flex items-center gap-4 w-full md:w-auto">
                   <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-slate-500" />
                   </div>
                   <div>
                      <h4 className="text-sm font-black text-slate-100 uppercase italic">{op.name}</h4>
                      <p className="text-[9px] font-mono text-slate-500 uppercase">{op.type} • {op.status}</p>
                   </div>
                </div>
                <div className="flex gap-8 w-full md:w-auto justify-between md:justify-end">
                   <div>
                      <p className="text-[8px] font-black text-slate-600 uppercase">Volume</p>
                      <p className="text-sm font-mono font-bold text-slate-200">{op.volume} ◎</p>
                   </div>
                   <div>
                      <p className="text-[8px] font-black text-slate-600 uppercase">Royalties</p>
                      <p className="text-sm font-mono font-bold text-emerald-500">+{op.royalties} ◎</p>
                   </div>
                   <Button variant="ghost" className="h-auto py-1 text-[9px] border-slate-700">MANAGE</Button>
                </div>
             </Card>
           ))}
        </div>
     </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* HEADER PROFILE HUD */}
      <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Skull className="w-64 h-64 text-slate-100" />
        </div>
        
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-20 h-20 bg-slate-950 border-2 border-slate-800 rounded-2xl flex items-center justify-center relative group">
              <Skull className="w-10 h-10 text-slate-600 group-hover:text-emerald-500 transition-colors" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center text-[10px] font-black text-slate-950 border-2 border-slate-900">42</div>
           </div>
           <div>
              <div className="flex items-center gap-2 mb-1">
                 <h1 className="text-2xl font-display font-black text-slate-100 uppercase italic tracking-tighter">8x2v...9p</h1>
                 <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[8px] font-black text-emerald-500 uppercase tracking-widest">{userStats.rank}</span>
              </div>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> SENTRY_LINK_ESTABLISHED
              </p>
           </div>
        </div>

        <div className="flex bg-slate-950/50 p-1.5 rounded-xl border border-slate-800 relative z-10">
           {[
             { id: 'OVERVIEW', icon: LayoutGrid, label: 'COMMAND_DECK' },
             { id: 'DEPLOY', icon: Server, label: 'PDA_DEPLOY' },
             { id: 'OPERATIONS', icon: Crosshair, label: 'OPERATIONS' },
             { id: 'BARRACKS', icon: FileText, label: 'BARRACKS' }
           ].map((tab) => (
             <button
               key={tab.id}
               onClick={() => setCurrentView(tab.id as DashboardView)}
               className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                 currentView === tab.id 
                 ? 'bg-emerald-500 text-slate-950 shadow-lg' 
                 : 'text-slate-500 hover:text-slate-200 hover:bg-slate-900'
               }`}
             >
               <tab.icon className="w-3 h-3" />
               {tab.label}
             </button>
           ))}
        </div>
      </div>

      {/* DYNAMIC CONTENT AREA */}
      <div className="min-h-[400px]">
         {currentView === 'OVERVIEW' && renderOverview()}
         {currentView === 'DEPLOY' && renderDeployWizard()}
         {currentView === 'OPERATIONS' && renderOperations()}
         {currentView === 'BARRACKS' && (
            <div className="flex flex-col items-center justify-center h-[400px] text-slate-600 space-y-4 border border-slate-800/50 rounded-3xl border-dashed">
               <History className="w-12 h-12 opacity-20" />
               <p className="text-xs font-mono uppercase">NO_COMBAT_LOGS_FOUND</p>
            </div>
         )}
      </div>
    </div>
  );
};

function Rocket(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}
