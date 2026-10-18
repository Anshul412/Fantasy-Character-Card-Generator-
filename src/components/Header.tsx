import React from 'react';
import { Volume2, VolumeX, Bookmark, Layers, Sparkles } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  rosterCount: number;
  deckCount: number;
  activeTab: 'forge' | 'deck';
  onSelectTab: (tab: 'forge' | 'deck') => void;
  onOpenRoster: () => void;
  onOpenInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  rosterCount,
  deckCount,
  activeTab,
  onSelectTab,
  onOpenRoster,
  onOpenInfo,
}) => {
  return (
    <header className="border-b border-amber-900/40 bg-stone-950/95 backdrop-blur-md sticky top-0 z-40 shadow-xl shadow-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div 
          onClick={() => onSelectTab('forge')}
          className="flex items-center gap-3 shrink-0 cursor-pointer group"
          title="Return to Player Card Workbench"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-700 via-amber-800 to-stone-900 flex items-center justify-center shadow-inner border border-amber-500/50 text-amber-300 font-bold font-fantasy text-lg group-hover:border-amber-400 transition-colors">
            ⚗
          </div>
          <span className="font-display font-bold text-base sm:text-lg tracking-wider text-amber-100 group-hover:text-amber-300 transition-colors whitespace-nowrap">
            Alchemist's Character Workbench
          </span>
        </div>

        {/* Zone 2: Navigation Links & View Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => onSelectTab('forge')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'forge'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Player Card Forge</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('deck')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'deck'
                ? 'bg-amber-500 text-stone-950 shadow-md ring-2 ring-amber-400/50'
                : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900/60 border border-amber-900/40'
            }`}
          >
            <Layers className={`w-3.5 h-3.5 ${activeTab === 'deck' ? 'text-stone-950' : 'text-amber-400'}`} />
            <span>My Deck</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold tabular-nums ${
                activeTab === 'deck'
                  ? 'bg-stone-950 text-amber-400'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {deckCount}
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenInfo}
            className="hidden lg:inline-flex px-2.5 py-1.5 text-xs text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
          >
            Rules & Lore
          </button>
        </nav>

        {/* Zone 3: Primary Action & Utilities */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute audio' : 'Unmute audio'}
            title={soundEnabled ? 'Sound FX On' : 'Sound FX Muted'}
            className="p-2 text-stone-400 hover:text-stone-200 hover:bg-stone-900 rounded-lg transition-colors border border-stone-800"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onOpenRoster}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-200 bg-stone-900 hover:bg-stone-800 border border-stone-700/80 rounded-lg transition-colors whitespace-nowrap shadow-sm cursor-pointer"
            title="Open recent roll history"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Roster</span>
            <span className="text-stone-400 tabular-nums">({rosterCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
