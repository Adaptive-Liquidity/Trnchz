
import React from 'react';
import { Flame, ShieldAlert, Rocket, TrendingUp, Zap } from 'lucide-react';
import { Button } from '../components/Button';
import { NavigationTab } from '../components/Navbar';

interface HomeProps {
  jeetCount: number;
  onNavigate: (tab: NavigationTab) => void;
}

export const Home: React.FC<HomeProps> = ({ jeetCount, onNavigate }) => {
  return (
    <div className="space-y-16 pb-20 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-8 lg:p-12 bg-slate-900/40 border border-slate-800 rounded-[2rem] flex flex-col justify-center relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12">
            <Flame className="w-64 h-64 text-emerald-500" />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-lg text-[10px] font-black text-rose-500 uppercase tracking-[0.2em]">
              <ShieldAlert className="w-3.5 h-3.5" /> SENTRY_ENGINE_ONLINE
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-[0.85] italic tracking-tighter uppercase text-slate-100">
              THE ULTIMATE <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-violet-500">RUG HEDGE.</span>
            </h1>
            <p className="text-sm lg:text-base text-slate-500 font-mono uppercase leading-relaxed max-w-xl tracking-tight">
              Even if the coin goes to zero, the war chest remains. TRENCHZ uses <span className="text-slate-100 font-bold">Hybrid Sentry Architecture</span> to monitor paper hands and redistribute their liquidity to the diamond-handed survivors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button glow onClick={() => onNavigate('arena')} className="px-10 py-5 text-sm font-black italic tracking-widest gap-2">
                <Rocket className="w-4 h-4 fill-slate-950" /> ENTER THE TRENCHES
              </Button>
              <div className="flex items-center gap-4 px-6 border-l border-slate-800">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">JEETS_PURGED</span>
                  <span className="text-2xl font-display font-black text-emerald-500 italic leading-none">{jeetCount}</span>
                </div>
                <TrendingUp className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 grid grid-rows-2 gap-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 flex flex-col justify-center backdrop-blur-md group hover:border-emerald-500/30 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-lg font-black text-slate-100 uppercase italic tracking-tight mb-2">ANCHOR_PROTOCOL</h3>
            <p className="text-[11px] font-mono text-slate-500 uppercase leading-relaxed">
              100% On-chain custody via PDA vaults. Settlement logic secured by Rust smart contracts.
            </p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 flex flex-col justify-center backdrop-blur-md group hover:border-violet-500/30 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-violet-500" />
            </div>
            <h3 className="text-lg font-black text-slate-100 uppercase italic tracking-tight mb-2">LIVE_SPOILS</h3>
            <p className="text-[11px] font-mono text-slate-500 uppercase leading-relaxed">
              Current extraction pool: <span className="text-violet-400 font-bold">12,450.2 SOL</span> across all active fronts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
