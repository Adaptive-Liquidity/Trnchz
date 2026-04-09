
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import { Navbar, NavigationTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { KillFeed } from './components/KillFeed';
import { TournamentView } from './components/TournamentView';
import { CreatorDashboard } from './components/CreatorDashboard';

// Pages
import { Home } from './pages/Home';
import { Arena } from './pages/Arena';
import { Rules } from './pages/Rules';

// Types
import { Tournament } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [jeetCount, setJeetCount] = useState(1420);

  // Global VFX Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setJeetCount(prev => prev + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (tab: NavigationTab) => {
    setActiveTab(tab);
    setSelectedTournament(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTournamentSelect = (t: Tournament) => {
    setSelectedTournament(t);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] relative selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden">
      {/* Background VFX Layer */}
      <div className="fixed inset-0 cyber-grid opacity-10 pointer-events-none" />
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse delay-1000" />

      {/* Main Layout */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleNavigate}
        isWalletConnected={isWalletConnected}
        setIsWalletConnected={setIsWalletConnected}
        onLogoClick={() => handleNavigate('home')}
      />

      <KillFeed />

      <main className="flex-1 max-w-7xl mx-auto w-full relative z-10 px-4 md:px-8">
        <AnimatePresence mode="wait">
          {selectedTournament ? (
            <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-8">
              <TournamentView tournament={selectedTournament} onBack={() => setSelectedTournament(null)} />
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="py-8"
            >
              {activeTab === 'home' && (
                <Home jeetCount={jeetCount} onNavigate={handleNavigate} />
              )}

              {activeTab === 'arena' && (
                <Arena onSelectTournament={handleTournamentSelect} />
              )}

              {activeTab === 'creator' && (
                <CreatorDashboard />
              )}

              {activeTab === 'rules' && (
                <Rules />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      <style>{`
        .cyber-grid {
          background-image: linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default App;
