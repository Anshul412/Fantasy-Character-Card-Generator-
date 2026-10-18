/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { CharacterSheet } from './components/CharacterSheet';
import { CharacterControls } from './components/CharacterControls';
import { DeckView } from './components/DeckView';
import { RosterDrawer } from './components/RosterDrawer';
import { InfoModal } from './components/InfoModal';
import { Character, CharacterClass, GeneratorLocks } from './types/character';
import { generateCharacter, generateCartoonPortrait, generateBackstory } from './utils/characterGenerator';
import { soundManager } from './utils/audio';

const STORAGE_KEY = 'fantasy_creator_roster_v1';
const DECK_STORAGE_KEY = 'fantasy_creator_deck_v1';

export default function App() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [roster, setRoster] = useState<Character[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [deck, setDeck] = useState<Character[]>(() => {
    try {
      const saved = localStorage.getItem(DECK_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState<'forge' | 'deck'>('forge');
  const [deckNotification, setDeckNotification] = useState<string | null>(null);

  const [selectedClass, setSelectedClass] = useState<CharacterClass | 'Random'>('Random');
  const [locks, setLocks] = useState<GeneratorLocks>({
    characterClass: false,
    race: false,
    name: false,
  });

  const [isRolling, setIsRolling] = useState(false);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);
  const [portraitVariations, setPortraitVariations] = useState<Record<string, number>>({});
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isRosterOpen, setIsRosterOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Sync deck to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deck));
    } catch {
      // storage unavailable or full
    }
  }, [deck]);

  // Sync roster to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(roster));
    } catch {
      // storage unavailable or full
    }
  }, [roster]);

  // Generate initial character on first load
  useEffect(() => {
    const initialChar = generateCharacter(null, locks, selectedClass);
    setCharacter(initialChar);
    setRoster((prev) => (prev.length === 0 ? [initialChar] : prev));
  }, []);

  const handleGenerateCartoonPortrait = useCallback(() => {
    if (!character || isGeneratingPortrait) return;
    setIsGeneratingPortrait(true);
    soundManager.playSuccessChime();

    setTimeout(() => {
      const currentIdx = portraitVariations[character.id] || 0;
      const cartoonUrl = generateCartoonPortrait(character, currentIdx);
      const updated: Character = {
        ...character,
        cartoonPortraitUrl: cartoonUrl,
        activePortraitType: 'cartoon',
      };
      setCharacter(updated);
      setRoster((prev) => prev.map((c) => (c.id === character.id ? updated : c)));
      setIsGeneratingPortrait(false);
    }, 180);
  }, [character, isGeneratingPortrait, portraitVariations]);

  const handleRegenerateCartoonPortrait = useCallback(() => {
    if (!character || isGeneratingPortrait) return;
    setIsGeneratingPortrait(true);
    soundManager.playDiceRoll();

    setTimeout(() => {
      const currentIdx = portraitVariations[character.id] || 0;
      const nextIdx = currentIdx + 1;
      setPortraitVariations((prev) => ({ ...prev, [character.id]: nextIdx }));

      const cartoonUrl = generateCartoonPortrait(character, nextIdx);
      const updated: Character = {
        ...character,
        cartoonPortraitUrl: cartoonUrl,
        activePortraitType: 'cartoon',
      };
      setCharacter(updated);
      setRoster((prev) => prev.map((c) => (c.id === character.id ? updated : c)));
      setIsGeneratingPortrait(false);
    }, 180);
  }, [character, isGeneratingPortrait, portraitVariations]);

  const handleSwitchToClassicPortrait = useCallback(() => {
    if (!character) return;
    const updated: Character = {
      ...character,
      activePortraitType: 'classic',
    };
    setCharacter(updated);
    setRoster((prev) => prev.map((c) => (c.id === character.id ? updated : c)));
  }, [character]);

  const handleGenerateBackstory = useCallback(() => {
    if (!character || isGeneratingBackstory) return;
    setIsGeneratingBackstory(true);
    soundManager.playSuccessChime();

    setTimeout(() => {
      const newBackstory = generateBackstory(character);
      const updated: Character = {
        ...character,
        backstory: newBackstory,
      };
      setCharacter(updated);
      setRoster((prev) => prev.map((c) => (c.id === character.id ? updated : c)));
      setIsGeneratingBackstory(false);
    }, 160);
  }, [character, isGeneratingBackstory]);

  const handleGenerate = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);
    soundManager.playDiceRoll();

    setTimeout(() => {
      const newChar = generateCharacter(character, locks, selectedClass);
      setCharacter(newChar);
      setRoster((prev) => {
        // Keep unique up to 25 recent heroes
        const filtered = prev.filter((c) => c.id !== newChar.id);
        return [newChar, ...filtered].slice(0, 25);
      });
      setIsRolling(false);
    }, 180);
  }, [character, locks, selectedClass, isRolling]);

  const handleRerollAttributes = useCallback(() => {
    if (!character || isRolling) return;
    setIsRolling(true);
    soundManager.playDiceRoll();

    setTimeout(() => {
      // Lock everything except attributes
      const updated = generateCharacter(
        character,
        { characterClass: true, race: true, name: true },
        character.characterClass
      );
      setCharacter(updated);
      setRoster((prev) => prev.map((c) => (c.id === character.id ? updated : c)));
      setIsRolling(false);
    }, 150);
  }, [character, isRolling]);

  const handleToggleLock = (key: keyof GeneratorLocks) => {
    setLocks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggleFavorite = (id: string) => {
    setRoster((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );
    if (character && character.id === id) {
      setCharacter((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
  };

  const handleDeleteCharacter = (id: string) => {
    setRoster((prev) => prev.filter((c) => c.id !== id));
    if (character?.id === id) {
      const remaining = roster.filter((c) => c.id !== id);
      if (remaining.length > 0) {
        setCharacter(remaining[0]);
      } else {
        handleGenerate();
      }
    }
  };

  const handleClearRoster = () => {
    if (window.confirm('Are you sure you want to clear your character roster?')) {
      setRoster([]);
    }
  };

  const handleSaveToDeck = useCallback((char: Character) => {
    setDeck((prev) => {
      const exists = prev.some((c) => c.id === char.id);
      if (exists) {
        soundManager.playDiceRoll();
        setDeckNotification(`Removed "${char.name}" from My Deck.`);
        setTimeout(() => setDeckNotification(null), 3000);
        return prev.filter((c) => c.id !== char.id);
      } else {
        soundManager.playSuccessChime();
        setDeckNotification(`Saved "${char.name}" to My Deck!`);
        setTimeout(() => setDeckNotification(null), 3500);
        return [char, ...prev];
      }
    });
  }, []);

  const handleRemoveFromDeck = useCallback((id: string) => {
    setDeck((prev) => prev.filter((c) => c.id !== id));
    soundManager.playDiceRoll();
  }, []);

  const handleClearDeck = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all cards from My Deck?')) {
      setDeck([]);
    }
  }, []);

  const handleSelectDeckCard = useCallback((card: Character) => {
    setCharacter(card);
    setActiveTab('forge');
    soundManager.playSuccessChime();
  }, []);

  const toggleSound = () => {
    soundManager.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  // Global hotkey: Space bar rolls a new character when in forge
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        activeTab === 'forge' &&
        e.code === 'Space' &&
        e.target instanceof HTMLElement &&
        e.target.tagName !== 'INPUT' &&
        e.target.tagName !== 'TEXTAREA' &&
        e.target.tagName !== 'BUTTON'
      ) {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGenerate, activeTab]);

  return (
    <div
      className="min-h-screen text-stone-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-300 relative bg-[#0d0907]"
      style={{
        backgroundImage: `radial-gradient(ellipse at 50% 15%, rgba(20, 14, 10, 0.82) 0%, rgba(13, 9, 7, 0.92) 60%, rgba(7, 5, 4, 0.97) 100%), url('/src/assets/images/alchemist_workbench_texture_1792295255376.jpg')`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        rosterCount={roster.length}
        deckCount={deck.length}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenRoster={() => setIsRosterOpen(true)}
        onOpenInfo={() => setIsInfoOpen(true)}
      />

      {/* Floating Notification Toast */}
      {deckNotification && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-2xl border border-amber-300/80">
            <span>🃏 {deckNotification}</span>
            {activeTab !== 'deck' && (
              <button
                type="button"
                onClick={() => setActiveTab('deck')}
                className="underline hover:text-stone-900 ml-1.5 cursor-pointer font-extrabold"
              >
                View Deck →
              </button>
            )}
          </div>
        </div>
      )}

      <main id="creator" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 relative z-10">
        {activeTab === 'forge' ? (
          <>
            {/* Generator Controls */}
            <CharacterControls
              onGenerate={handleGenerate}
              selectedClass={selectedClass}
              onSelectClass={setSelectedClass}
              locks={locks}
              onToggleLock={handleToggleLock}
              isRolling={isRolling}
              onGenerateCartoonPortrait={handleGenerateCartoonPortrait}
              onRegenerateCartoonPortrait={handleRegenerateCartoonPortrait}
              isGeneratingPortrait={isGeneratingPortrait}
              onGenerateBackstory={handleGenerateBackstory}
              isGeneratingBackstory={isGeneratingBackstory}
            />

            {/* Character Sheet Display (Bordered Player Card Layout) */}
            {character ? (
              <CharacterSheet
                character={character}
                onRerollAttributes={handleRerollAttributes}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={!!character.isFavorite}
                isRolling={isRolling}
                onGenerateCartoonPortrait={handleGenerateCartoonPortrait}
                onRegenerateCartoonPortrait={handleRegenerateCartoonPortrait}
                onSwitchToClassicPortrait={handleSwitchToClassicPortrait}
                isGeneratingPortrait={isGeneratingPortrait}
                onGenerateBackstory={handleGenerateBackstory}
                isGeneratingBackstory={isGeneratingBackstory}
                onSaveToDeck={handleSaveToDeck}
                isInDeck={deck.some((c) => c.id === character.id)}
              />
            ) : (
              <div className="h-96 flex items-center justify-center border border-stone-800 rounded-2xl bg-stone-900/50">
                <span className="text-stone-400 font-display">Forging player card...</span>
              </div>
            )}

            {/* Quick Hotkey Indicator & Editorial Note */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 border-t border-stone-800/60 pt-6">
              <div className="flex items-center gap-2">
                <span>Tip: Press</span>
                <kbd className="px-2 py-0.5 bg-stone-900 border border-stone-800 rounded text-stone-300 font-mono text-[11px]">
                  Space
                </kbd>
                <span>anywhere to quickly roll a new fantasy adventurer with random Health, Mana, and Strength.</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('deck')}
                className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-medium flex items-center gap-1"
              >
                <span>Switch to My Deck ({deck.length} saved)</span> →
              </button>
            </div>
          </>
        ) : (
          /* My Deck List View */
          <DeckView
            deck={deck}
            activeId={character?.id || null}
            onSelectCard={handleSelectDeckCard}
            onRemoveFromDeck={handleRemoveFromDeck}
            onClearDeck={handleClearDeck}
            onSwitchToForge={() => setActiveTab('forge')}
          />
        )}
      </main>

      {/* Roster Drawer */}
      <RosterDrawer
        isOpen={isRosterOpen}
        onClose={() => setIsRosterOpen(false)}
        roster={roster}
        activeId={character?.id || null}
        onSelectCharacter={(char) => {
          setCharacter(char);
          setActiveTab('forge');
        }}
        onDeleteCharacter={handleDeleteCharacter}
        onClearRoster={handleClearRoster}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Info & Rules Modal */}
      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </div>
  );
}
