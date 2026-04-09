
import React from 'react';
import { Skull, MessageSquare, Activity, Target, Coins } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 p-12 bg-slate-950/80 backdrop-blur-xl relative z-10 mt-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
        <div className="text-left space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-slate-950 italic">
              <Skull className="w-5 h-5" />
            </div>
            <h4 className="font-display font-black text-slate-100 uppercase italic tracking-tighter text-3xl">TRENCHZ</h4>
          </div>
          <p className="text-[11px] font-mono text-slate-600 uppercase tracking-widest leading-relaxed max-w-sm">
            The world's first tactical memecoin arena. Built on Solana for those who choose combat over comfort. Purging jeets since 2024.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          <a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><MessageSquare className="w-3 h-3"/> Discord_Room</a>
          <a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><Activity className="w-3 h-3"/> Twitter_Feed</a>
          <a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><Target className="w-3 h-3"/> System_Docs</a>
          <a href="#" className="hover:text-emerald-400 transition-colors flex items-center gap-2"><Coins className="w-3 h-3"/> Pump.fun</a>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] text-slate-700 uppercase tracking-[0.5em] font-black">
        <span>&copy; 2024 TRENCHZ TACTICAL. ALL_RIGHTS_RESERVED.</span>
        <span className="text-slate-800">POWERED BY: HELIUS • ANCHOR • ARWEAVE</span>
      </div>
    </footer>
  );
};
