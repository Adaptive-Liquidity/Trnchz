
import React from 'react';
import { Skull, Activity, Target, ScrollText } from 'lucide-react';
import { Button } from './Button';

export type NavigationTab = 'home' | 'arena' | 'creator' | 'rules';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  isWalletConnected: boolean;
  setIsWalletConnected: (connected: boolean) => void;
  onLogoClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isWalletConnected, 
  setIsWalletConnected,
  onLogoClick
}) => {
  const navItems = [
    { id: 'home', label: 'HOME', icon: Skull },
    { id: 'arena', label: 'THE_ARENA', icon: Activity },
    { id: 'creator', label: 'COMMAND_CENTER', icon: Target },
    { id: 'rules', label: 'RULES_OF_WAR', icon: ScrollText }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-900 px-4 md:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={onLogoClick}>
        <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-slate-950 italic group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.4)]">
          <Skull className="w-5 h-5" />
        </div>
        <span className="text-xl font-display font-black tracking-tighter text-slate-100 uppercase italic">
          TRENCH<span className="text-emerald-500">Z</span>
        </span>
      </div>

      <div className="hidden md:flex items-center bg-slate-900/50 p-1 border border-slate-800 rounded-2xl">
        {navItems.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as NavigationTab)}
            className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl flex items-center gap-2 ${
              activeTab === tab.id 
              ? 'bg-emerald-500 text-slate-950 shadow-lg' 
              : 'text-slate-500 hover:text-slate-200'
            }`}
          >
            <tab.icon className="w-3 h-3" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {!isWalletConnected ? (
          <Button onClick={() => setIsWalletConnected(true)} glow className="px-6 py-2.5 text-xs">CONNECT_COMBATANT</Button>
        ) : (
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 hover:border-emerald-500/50 transition-colors cursor-pointer group">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
            <span className="text-xs font-mono font-bold text-slate-300">8x2v...9p</span>
          </div>
        )}
      </div>
    </nav>
  );
};
