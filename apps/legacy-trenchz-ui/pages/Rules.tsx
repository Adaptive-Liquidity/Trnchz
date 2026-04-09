
import React from 'react';
import { ZapOff, ShieldAlert, UserCheck } from 'lucide-react';
import { Card } from '../components/Card';

export const Rules: React.FC = () => {
  return (
    <div className="space-y-16 pb-20 animate-in fade-in duration-500">
      <div className="text-center space-y-6">
          <div className="inline-block px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-2xl mb-4 transform -skew-x-12">
            <span className="text-rose-500 text-[11px] font-black tracking-[0.4em] uppercase">Tactical_Briefing_v1.2</span>
        </div>
        <h1 className="text-6xl font-display font-black text-slate-100 uppercase italic tracking-tighter leading-none">Rules of War</h1>
        <p className="text-slate-500 max-w-2xl mx-auto font-mono text-sm uppercase tracking-tight leading-relaxed">
            All engagements are governed by the TRENCHZ smart contracts. Protocol enforcement is automated and final. Paper hands are disqualified without prejudice.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card title="Extraction Protocol" className="p-8 border-slate-800 bg-slate-900/40 rounded-[2.5rem]">
            <div className="space-y-8 pt-4">
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-500 font-black italic border border-emerald-500/20">01</div>
                  <p className="text-[12px] font-mono text-slate-400 uppercase leading-relaxed">
                      P&L is calculated from point of entry. Price data is pulled from high-fidelity on-chain oracles at the exact tick of confirmation.
                  </p>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-500 font-black italic border border-emerald-500/20">02</div>
                  <p className="text-[12px] font-mono text-slate-400 uppercase leading-relaxed">
                      The extraction timer is fixed. Prize distribution triggers immediately upon zero.
                  </p>
                </div>
            </div>
          </Card>

          <Card title="Anti-Jeet Logic" className="p-8 border-slate-800 bg-slate-900/40 rounded-[2.5rem]">
            <div className="space-y-8 pt-4">
                <div className="flex gap-5 items-start group">
                  <ZapOff className="w-10 h-10 text-rose-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <p className="text-[12px] font-mono text-slate-400 uppercase leading-relaxed">
                      <span className="text-rose-500 font-black">THE 10% TRAP:</span> Exiting before 10% of the duration has elapsed triggers an automated DQ.
                  </p>
                </div>
                <div className="flex gap-5 items-start group">
                  <ShieldAlert className="w-10 h-10 text-rose-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <p className="text-[12px] font-mono text-slate-400 uppercase leading-relaxed">
                      <span className="text-rose-500 font-black">MIN_HOLD:</span> Position tenure must exceed 5 minutes. No exceptions.
                  </p>
                </div>
            </div>
          </Card>

          <Card title="Combat Security" className="p-8 border-slate-800 bg-slate-900/40 rounded-[2.5rem]">
            <div className="space-y-8 pt-4">
                <div className="flex gap-5 items-start">
                  <UserCheck className="w-10 h-10 text-violet-500 shrink-0" />
                  <p className="text-[12px] font-mono text-slate-400 uppercase leading-relaxed">
                      Sybil resistance active. One wallet per arena. Large positions capped to maintain engagement parity.
                  </p>
                </div>
                <div className="p-6 bg-violet-500/5 border border-violet-500/10 rounded-3xl text-center shadow-inner">
                  <p className="text-[10px] font-black text-violet-400 uppercase tracking-[0.3em] italic">
                      NETWORK_INTEGRITY_SAFE_V2
                  </p>
                </div>
            </div>
          </Card>
      </div>

      <div className="bg-slate-950 border border-slate-800 p-12 rounded-[3rem] text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none" />
          <h3 className="text-2xl font-black text-slate-100 uppercase italic mb-4">Engagement Fees</h3>
          <p className="text-[12px] font-mono text-slate-500 uppercase leading-relaxed max-w-2xl mx-auto">
            A <span className="text-emerald-500 font-bold">5% Combat Tax</span> is applied to all reward vaults. These funds sustain arena maintenance and future battle development.
          </p>
      </div>
    </div>
  );
};
