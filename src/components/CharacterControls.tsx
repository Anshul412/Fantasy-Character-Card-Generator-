import React from 'react';
import { Dices, Lock, Unlock, Shuffle, Sparkles, RefreshCw, ScrollText } from 'lucide-react';
import { CharacterClass, GeneratorLocks } from '../types/character';

interface CharacterControlsProps {
  onGenerate: () => void;
  selectedClass: CharacterClass | 'Random';
  onSelectClass: (c: CharacterClass | 'Random') => void;
  locks: GeneratorLocks;
  onToggleLock: (key: keyof GeneratorLocks) => void;
  isRolling: boolean;
  onGenerateCartoonPortrait?: () => void;
  onRegenerateCartoonPortrait?: () => void;
  isGeneratingPortrait?: boolean;
  onGenerateBackstory?: () => void;
  isGeneratingBackstory?: boolean;
}

const CLASS_OPTIONS: (CharacterClass | 'Random')[] = [
  'Random',
  'Warrior',
  'Mage',
  'Rogue',
  'Ranger',
  'Paladin',
  'Cleric',
  'Druid',
  'Warlock',
  'Bard',
];

export const CharacterControls: React.FC<CharacterControlsProps> = ({
  onGenerate,
  selectedClass,
  onSelectClass,
  locks,
  onToggleLock,
  isRolling,
  onGenerateCartoonPortrait,
  onRegenerateCartoonPortrait,
  isGeneratingPortrait,
  onGenerateBackstory,
  isGeneratingBackstory,
}) => {
  return (
    <div className="bg-gradient-to-b from-[#1f1610]/95 via-[#18110b]/95 to-[#120d09]/98 border-2 border-amber-900/40 rounded-2xl p-6 shadow-2xl backdrop-blur-md flex flex-col gap-5">
      {/* Primary Action Button (The Heart of the App) */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-bold text-amber-100 flex items-center gap-2">
            <span className="text-amber-500 font-fantasy text-xl">⚗</span>
            <span>Alchemical Character Forge</span>
          </h2>
          <p className="text-xs text-amber-300/70 mt-0.5 font-serif">
            Transmute raw elements into a complete hero with unique name, class archetypes, 4d6 attributes, and equipment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onGenerate}
            disabled={isRolling}
            className="relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-display font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-lg shadow-amber-950/60 active:scale-[0.98] transition-all duration-150 cursor-pointer disabled:opacity-60 whitespace-nowrap border border-amber-400/60"
          >
            <Dices className={`w-4 h-4 ${isRolling ? 'animate-spin text-stone-950' : ''}`} />
            <span>{isRolling ? 'Transmuting Hero...' : 'Generate Character'}</span>
          </button>

          {onGenerateCartoonPortrait && (
            <button
              type="button"
              onClick={onGenerateCartoonPortrait}
              disabled={isGeneratingPortrait}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-amber-300 font-semibold text-xs tracking-wide rounded-xl border border-stone-700 shadow-sm transition-all duration-150 cursor-pointer disabled:opacity-50 whitespace-nowrap"
              title="Generate cartoon / video game style portrait for currently displayed character"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Generate Cartoon Portrait</span>
            </button>
          )}

          {onRegenerateCartoonPortrait && (
            <button
              type="button"
              onClick={onRegenerateCartoonPortrait}
              disabled={isGeneratingPortrait}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-3 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-300 font-semibold text-xs tracking-wide rounded-xl border border-stone-700 shadow-sm transition-all duration-150 cursor-pointer disabled:opacity-50 whitespace-nowrap"
              title="Regenerate cartoon / video game style portrait with alternate variation"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingPortrait ? 'animate-spin text-amber-400' : ''}`} />
              <span>Regenerate Cartoon Portrait</span>
            </button>
          )}

          {onGenerateBackstory && (
            <button
              type="button"
              onClick={onGenerateBackstory}
              disabled={isGeneratingBackstory}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 bg-amber-950/70 hover:bg-amber-900/80 text-amber-200 hover:text-amber-100 font-semibold text-xs tracking-wide rounded-xl border border-amber-600/50 shadow-sm transition-all duration-150 cursor-pointer disabled:opacity-50 whitespace-nowrap"
              title="Generate a unique 1-2 sentence origin story for this character"
            >
              <ScrollText className={`w-3.5 h-3.5 ${isGeneratingBackstory ? 'animate-bounce text-amber-300' : 'text-amber-400'}`} />
              <span>Generate Backstory</span>
            </button>
          )}
        </div>
      </div>

      {/* Class Filtering Segmented Control */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Target Class Focus
          </span>
          {locks.characterClass && (
            <span className="text-xs text-amber-400 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Class Locked
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-950/70 border border-stone-800/90 rounded-xl overflow-x-auto">
          {CLASS_OPTIONS.map((cls) => {
            const isActive = selectedClass === cls;
            return (
              <button
                key={cls}
                type="button"
                onClick={() => onSelectClass(cls)}
                disabled={locks.characterClass}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer disabled:opacity-40 ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                {cls}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reroll Pinning / Locks */}
      <div className="pt-2 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400">
        <span className="font-medium text-stone-300">Lock Traits for Next Roll:</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleLock('characterClass')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${
              locks.characterClass
                ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            {locks.characterClass ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3 text-stone-600" />}
            <span>Class</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleLock('race')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${
              locks.race
                ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            {locks.race ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3 text-stone-600" />}
            <span>Race</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleLock('name')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${
              locks.name
                ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                : 'bg-stone-950/50 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            {locks.name ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3 text-stone-600" />}
            <span>Name</span>
          </button>
        </div>
      </div>
    </div>
  );
};
