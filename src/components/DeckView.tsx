import React from 'react';
import { Shield, Heart, Zap, Sparkles, Trash2, Eye, Download, Plus, Swords, Droplet } from 'lucide-react';
import { Character } from '../types/character';

interface DeckViewProps {
  deck: Character[];
  activeId: string | null;
  onSelectCard: (card: Character) => void;
  onRemoveFromDeck: (id: string) => void;
  onClearDeck: () => void;
  onSwitchToForge: () => void;
}

export const DeckView: React.FC<DeckViewProps> = ({
  deck,
  activeId,
  onSelectCard,
  onRemoveFromDeck,
  onClearDeck,
  onSwitchToForge,
}) => {
  const exportDeck = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(deck, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `my_hero_deck_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const avgHealth = deck.length > 0 ? Math.round(deck.reduce((acc, c) => acc + (c.health || c.maxHp), 0) / deck.length) : 0;
  const avgMana = deck.length > 0 ? Math.round(deck.reduce((acc, c) => acc + (c.mana || 50), 0) / deck.length) : 0;
  const avgStrength = deck.length > 0 ? Math.round(deck.reduce((acc, c) => acc + (c.strength || c.attributes.strength.score), 0) / deck.length) : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Deck Header & Summary Bar */}
      <div className="bg-gradient-to-b from-[#221811]/95 via-[#18110b]/95 to-[#120d09]/98 border-2 border-amber-900/50 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-amber-950/60">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-amber-500 font-fantasy text-2xl">🃏</span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-amber-100">
                My Deck
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 tabular-nums">
                {deck.length} {deck.length === 1 ? 'Card' : 'Cards'}
              </span>
            </div>
            <p className="text-xs text-amber-300/70 mt-1 font-serif">
              Your saved collection of bordered player cards with customized stats, gear, and portraits.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onSwitchToForge}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 shadow-md border border-amber-400/60 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Forge New Card</span>
            </button>

            {deck.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={exportDeck}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-amber-200 border border-stone-700/80 transition-colors cursor-pointer"
                  title="Export deck to JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Deck</span>
                </button>

                <button
                  type="button"
                  onClick={onClearDeck}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-red-400/80 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear Deck</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Deck Stat Averages */}
        {deck.length > 0 && (
          <div className="grid grid-cols-3 gap-3 pt-4 text-center">
            <div className="p-2.5 rounded-xl bg-stone-950/70 border border-amber-900/30">
              <span className="text-[11px] font-semibold text-red-400/90 uppercase tracking-wider flex items-center justify-center gap-1">
                <Heart className="w-3 h-3" /> Avg Health
              </span>
              <span className="font-mono text-lg font-bold tabular-nums text-stone-100 mt-0.5 block">
                {avgHealth}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-950/70 border border-amber-900/30">
              <span className="text-[11px] font-semibold text-blue-400/90 uppercase tracking-wider flex items-center justify-center gap-1">
                <Droplet className="w-3 h-3" /> Avg Mana
              </span>
              <span className="font-mono text-lg font-bold tabular-nums text-stone-100 mt-0.5 block">
                {avgMana}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-stone-950/70 border border-amber-900/30">
              <span className="text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider flex items-center justify-center gap-1">
                <Swords className="w-3 h-3" /> Avg Strength
              </span>
              <span className="font-mono text-lg font-bold tabular-nums text-stone-100 mt-0.5 block">
                {avgStrength}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Grid of Bordered Player Cards in Deck */}
      {deck.length === 0 ? (
        <div className="bg-gradient-to-b from-[#221811]/90 via-[#18110b]/90 to-[#120d09]/95 border-2 border-amber-900/40 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-950/50 border border-amber-600/30 flex items-center justify-center text-3xl mb-3 shadow-inner">
            🃏
          </div>
          <h3 className="font-display font-bold text-lg text-amber-200">
            Your Deck is Empty
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-md font-serif">
            Return to the Character Forge, generate a champion with randomized Health, Mana, and Strength stats, and click "Save to Deck" to build your hand.
          </p>
          <button
            type="button"
            onClick={onSwitchToForge}
            className="mt-5 px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-display font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg border border-amber-400/50 cursor-pointer"
          >
            Go to Character Forge
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deck.map((card) => {
            const isActive = card.id === activeId;
            const cardImg = card.activePortraitType === 'cartoon' && card.cartoonPortraitUrl ? card.cartoonPortraitUrl : card.portraitUrl;

            return (
              <div
                key={card.id}
                className={`relative rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between group ${
                  isActive
                    ? 'border-4 border-amber-500 bg-gradient-to-b from-[#2e2015] to-[#17100b] shadow-[0_15px_35px_rgba(245,158,11,0.25)] ring-2 ring-amber-400/50'
                    : 'border-4 border-[#3d2b1c] hover:border-amber-700/80 bg-gradient-to-b from-[#241a12] via-[#1a120c] to-[#120c09] shadow-xl hover:shadow-2xl'
                }`}
              >
                {/* Active Tag */}
                {isActive && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-mono font-bold tracking-wider uppercase shadow-md z-20">
                    Active on Workbench
                  </div>
                )}

                {/* Card Top Title Bar */}
                <div className="flex items-center justify-between pb-2 border-b border-amber-900/40">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-fantasy text-lg font-bold text-amber-100 truncate tracking-wide">
                      {card.name}
                    </h4>
                    <div className="text-[11px] text-stone-400 font-medium truncate">
                      <span>{card.race}</span> · <span className="text-amber-300">{card.characterClass}</span>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-amber-950 border border-amber-600/50 flex items-center justify-center font-mono text-xs font-bold text-amber-300 shrink-0 ml-2 shadow-inner">
                    L{card.level}
                  </div>
                </div>

                {/* Card Art Thumbnail */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden border-2 border-amber-950 my-3 bg-stone-950 group-hover:border-amber-800/60 transition-colors">
                  <img
                    src={cardImg}
                    alt={card.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-[10px] text-amber-200">
                    <span className="font-display font-medium truncate">{card.subclass}</span>
                    {card.activePortraitType === 'cartoon' && (
                      <span className="text-amber-400 font-bold">[Cartoon Art]</span>
                    )}
                  </div>
                </div>

                {/* Core Player Card Stats: Health, Mana, Strength */}
                <div className="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-stone-950/80 border border-amber-950/80 mb-3 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-red-400 flex items-center gap-0.5 uppercase">
                      <Heart className="w-2.5 h-2.5" /> HP
                    </span>
                    <span className="font-mono text-sm font-bold text-stone-100 tabular-nums">
                      {card.health || card.maxHp}
                    </span>
                  </div>

                  <div className="flex flex-col items-center border-x border-stone-800">
                    <span className="text-[10px] font-bold text-blue-400 flex items-center gap-0.5 uppercase">
                      <Droplet className="w-2.5 h-2.5" /> MP
                    </span>
                    <span className="font-mono text-sm font-bold text-stone-100 tabular-nums">
                      {card.mana || 50}
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-amber-400 flex items-center gap-0.5 uppercase">
                      <Swords className="w-2.5 h-2.5" /> STR
                    </span>
                    <span className="font-mono text-sm font-bold text-stone-100 tabular-nums">
                      {card.strength || card.attributes.strength.score}
                    </span>
                  </div>
                </div>

                {/* Card Ability Snippet */}
                <div className="p-2 rounded-lg bg-stone-950/50 border border-amber-900/30 text-xs mb-3">
                  <span className="font-display font-bold text-amber-300 text-[11px] block truncate">
                    ✦ {card.signatureAbility.name}
                  </span>
                  <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed mt-0.5 font-serif italic">
                    {card.signatureAbility.description}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-amber-950/50">
                  <button
                    type="button"
                    onClick={() => onSelectCard(card)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-200 text-xs font-semibold border border-amber-900/50 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onRemoveFromDeck(card.id)}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-red-400 hover:bg-red-950/40 border border-stone-800 transition-colors cursor-pointer"
                    title="Remove from deck"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
