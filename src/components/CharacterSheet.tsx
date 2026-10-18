import React, { useState } from 'react';
import {
  Shield,
  Heart,
  Zap,
  Footprints,
  Sparkles,
  Sword,
  BookOpen,
  Copy,
  Check,
  Star,
  Share2,
  RefreshCw,
} from 'lucide-react';
import { Character, CharacterAttributes } from '../types/character';
import { formatModifier } from '../utils/characterGenerator';

import {
  Gamepad2,
  Palette,
  Image as ImageIcon,
  ScrollText,
  BookmarkPlus,
  Swords,
  Droplet,
  Layers,
} from 'lucide-react';

interface CharacterSheetProps {
  character: Character;
  onRerollAttributes: () => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
  isRolling: boolean;
  onGenerateCartoonPortrait: () => void;
  onRegenerateCartoonPortrait: () => void;
  onSwitchToClassicPortrait: () => void;
  isGeneratingPortrait: boolean;
  onGenerateBackstory: () => void;
  isGeneratingBackstory?: boolean;
  onSaveToDeck: (char: Character) => void;
  isInDeck: boolean;
}

export const CharacterSheet: React.FC<CharacterSheetProps> = ({
  character,
  onRerollAttributes,
  onToggleFavorite,
  isFavorite,
  isRolling,
  onGenerateCartoonPortrait,
  onRegenerateCartoonPortrait,
  onSwitchToClassicPortrait,
  isGeneratingPortrait,
  onGenerateBackstory,
  isGeneratingBackstory = false,
  onSaveToDeck,
  isInDeck,
}) => {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const copyToClipboard = () => {
    const text = `
=== ${character.name.toUpperCase()} ===
Title: ${character.title}
Race: ${character.race} | Class: ${character.characterClass} (${character.subclass})
Level: ${character.level} | Alignment: ${character.alignment}
HP: ${character.maxHp} | AC: ${character.armorClass} | Speed: ${character.speed}ft | Init: ${formatModifier(character.initiative)}

-- ATTRIBUTES --
STR: ${character.attributes.strength.score} (${formatModifier(character.attributes.strength.modifier)})
DEX: ${character.attributes.dexterity.score} (${formatModifier(character.attributes.dexterity.modifier)})
CON: ${character.attributes.constitution.score} (${formatModifier(character.attributes.constitution.modifier)})
INT: ${character.attributes.intelligence.score} (${formatModifier(character.attributes.intelligence.modifier)})
WIS: ${character.attributes.wisdom.score} (${formatModifier(character.attributes.wisdom.modifier)})
CHA: ${character.attributes.charisma.score} (${formatModifier(character.attributes.charisma.modifier)})

-- SIGNATURE ABILITY --
${character.signatureAbility.name} (${character.signatureAbility.type})
${character.signatureAbility.description}

-- GEAR --
Weapon: ${character.gear.mainHand} ${character.gear.offHand ? `& ${character.gear.offHand}` : ''}
Armor: ${character.gear.armor}
Trinket: ${character.gear.trinket}

-- BACKSTORY & TRAITS --
${character.backstory}
Ideal: ${character.personality.ideal}
Flaw: ${character.personality.flaw}
Quote: ${character.quote}
`.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const attributeKeys: (keyof CharacterAttributes)[] = [
    'strength',
    'dexterity',
    'constitution',
    'intelligence',
    'wisdom',
    'charisma',
  ];

  const statLabels: Record<keyof CharacterAttributes, { abbr: string; full: string }> = {
    strength: { abbr: 'STR', full: 'Strength' },
    dexterity: { abbr: 'DEX', full: 'Dexterity' },
    constitution: { abbr: 'CON', full: 'Constitution' },
    intelligence: { abbr: 'INT', full: 'Intelligence' },
    wisdom: { abbr: 'WIS', full: 'Wisdom' },
    charisma: { abbr: 'CHA', full: 'Charisma' },
  };

  return (
    <article className="relative bg-gradient-to-b from-[#241a12] via-[#1a120c] to-[#0f0b08] border-4 sm:border-8 border-[#3f2c1c] rounded-3xl p-5 sm:p-7 shadow-[0_30px_90px_rgba(0,0,0,0.95)] ring-2 ring-amber-600/40 backdrop-blur-md transition-all duration-300">
      {/* Ornate Card Corner Ornaments */}
      <div className="absolute top-2.5 right-3 text-amber-600/40 text-[10px] font-mono tracking-widest select-none pointer-events-none">
        ✦ CARD № {character.id.slice(-4).toUpperCase()}
      </div>
      <div className="absolute bottom-2.5 right-3 text-amber-600/40 text-[10px] font-mono select-none pointer-events-none">
        EDITION I · COLLECTIBLE HERO
      </div>
      <div className="absolute top-2.5 left-3 text-amber-600/40 text-[10px] font-mono select-none pointer-events-none">
        ⚗ ALCHEMICAL SERIES
      </div>
      <div className="absolute bottom-2.5 left-3 text-amber-600/40 text-[10px] font-mono select-none pointer-events-none">
        {character.alignment.toUpperCase()}
      </div>

      {/* Card Header & Title Bar */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 pb-5 border-b-2 border-amber-900/50 relative z-10">
        <div>
          <div className="flex items-center gap-3">
            {/* Character Name in Stylized Fantasy Font */}
            <h1 className="font-fantasy text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-amber-100 drop-shadow-[0_2px_14px_rgba(245,158,11,0.3)]">
              {character.name}
            </h1>
            <button
              type="button"
              onClick={() => onToggleFavorite(character.id)}
              className={`p-1.5 rounded-full border transition-all ${
                isFavorite
                  ? 'border-red-600/80 bg-red-950/70 text-red-400 shadow-md shadow-red-950/60 ring-2 ring-red-700/30'
                  : 'border-amber-900/50 bg-stone-900/60 text-stone-500 hover:text-amber-300'
              }`}
              title={isFavorite ? 'Remove alchemical wax seal' : 'Stamp wax seal to favorite'}
              aria-label="Favorite character"
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-300' : ''}`} />
            </button>
          </div>

          <p className="text-sm font-medium italic text-amber-300/90 mt-1 font-serif">
            {character.title}
          </p>

          {/* Zero-Pill Unboxed Metadata with Typographic Separators */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-stone-400 mt-2 font-medium">
            <span className="text-amber-200/90 font-semibold">{character.race}</span>
            <span aria-hidden="true" className="text-amber-700/60">·</span>
            <span className="text-amber-300 font-bold">{character.characterClass}</span>
            <span aria-hidden="true" className="text-amber-700/60">/</span>
            <span className="text-stone-300">{character.subclass}</span>
            <span aria-hidden="true" className="text-amber-700/60">·</span>
            <span className="text-stone-300 font-mono">Level {character.level}</span>
            <span aria-hidden="true" className="text-amber-700/60">·</span>
            <span className="text-stone-300">{character.alignment}</span>
          </div>
        </div>

        {/* Action Buttons with Save to Deck */}
        <div className="flex flex-wrap items-center gap-2 self-start shrink-0">
          <button
            type="button"
            onClick={() => onSaveToDeck(character)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all shadow-md active:scale-[0.98] cursor-pointer whitespace-nowrap ${
              isInDeck
                ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/80 shadow-emerald-950/50'
                : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 border border-amber-400/80 shadow-amber-950/60'
            }`}
            title={isInDeck ? 'Character is saved in My Deck' : 'Save character to My Deck'}
          >
            <BookmarkPlus className="w-3.5 h-3.5" />
            <span>{isInDeck ? 'In Deck ✓' : 'Save to Deck'}</span>
          </button>

          <button
            type="button"
            onClick={onGenerateBackstory}
            disabled={isGeneratingBackstory}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-200 bg-amber-950/60 hover:bg-amber-900/70 hover:text-amber-100 border border-amber-600/50 rounded-lg transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
            title="Generate a unique 1-2 sentence origin story for this character"
          >
            <ScrollText className={`w-3.5 h-3.5 ${isGeneratingBackstory ? 'animate-bounce text-amber-400' : 'text-amber-400'}`} />
            <span>Generate Backstory</span>
          </button>

          <button
            type="button"
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 bg-stone-800/80 hover:bg-stone-800 hover:text-stone-100 border border-stone-700/60 rounded-lg transition-colors whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Sheet</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onRerollAttributes}
            disabled={isRolling}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 bg-stone-800/80 hover:bg-stone-800 hover:text-stone-100 border border-stone-700/60 rounded-lg transition-colors whitespace-nowrap disabled:opacity-50"
            title="Roll new attribute scores with 4d6 rules"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRolling ? 'animate-spin text-amber-400' : ''}`} />
            <span>Reroll Stats</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Portrait + Derived Combat Gauges + Attribute Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        {/* Left Column: Portrait & Derived Vitality */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Portrait Container */}
          <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-stone-700/80 bg-stone-950 shadow-inner group">
            {/* Active Art Style Watermark Tag */}
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="px-2 py-1 text-[10px] font-semibold tracking-wider uppercase rounded bg-stone-950/80 text-amber-300 border border-stone-800 backdrop-blur-sm flex items-center gap-1">
                {character.activePortraitType === 'cartoon' ? (
                  <>
                    <Gamepad2 className="w-3 h-3 text-amber-400" />
                    <span>Cartoon / Game Style</span>
                  </>
                ) : (
                  <>
                    <Palette className="w-3 h-3 text-stone-400" />
                    <span>Classic Fantasy</span>
                  </>
                )}
              </span>
            </div>

            {/* Portrait Image */}
            {!imgError ? (
              <img
                key={character.activePortraitType === 'cartoon' && character.cartoonPortraitUrl ? character.cartoonPortraitUrl : character.portraitUrl}
                src={character.activePortraitType === 'cartoon' && character.cartoonPortraitUrl ? character.cartoonPortraitUrl : character.portraitUrl}
                alt={`${character.name} the ${character.characterClass}`}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-stone-900 to-stone-950 text-stone-400 p-6 text-center">
                <Sword className="w-12 h-12 text-amber-500 mb-2" />
                <span className="font-display font-bold text-lg text-stone-200">
                  {character.characterClass}
                </span>
                <span className="text-xs text-stone-500 mt-1">{character.race}</span>
              </div>
            )}

            {/* Loading / Generating Overlay */}
            {isGeneratingPortrait && (
              <div className="absolute inset-0 bg-stone-950/85 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-20 animate-in fade-in duration-150">
                <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
                <span className="font-display text-xs font-semibold text-amber-200">
                  Forging Cartoon Portrait...
                </span>
              </div>
            )}

            {/* Visual class insignia overlay */}
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent flex items-center justify-between text-xs">
              <span className="font-display font-semibold tracking-wide text-amber-200">
                {character.subclass}
              </span>
              <span className="font-mono text-stone-400 tabular-nums">
                Hit Die: d{character.characterClass === 'Warrior' || character.characterClass === 'Paladin' || character.characterClass === 'Ranger' ? 10 : character.characterClass === 'Mage' ? 6 : 8}
              </span>
            </div>
          </div>

          {/* Portrait Generator & Regenerator Buttons */}
          <div className="p-3.5 bg-stone-950/70 border border-stone-800 rounded-xl flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-300 flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
                Cartoon / Video Game Portrait
              </span>
              {character.activePortraitType === 'cartoon' && (
                <span className="text-[11px] text-amber-400 font-medium">Active</span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onGenerateCartoonPortrait}
                disabled={isGeneratingPortrait}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all border border-amber-500/80 bg-amber-600 hover:bg-amber-500 text-stone-950 shadow-md shadow-amber-950/40 active:scale-[0.98] cursor-pointer disabled:opacity-50 whitespace-nowrap"
                title="Generate a cartoon / video game style portrait for this character"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Generate Cartoon Portrait</span>
              </button>

              <button
                type="button"
                onClick={onRegenerateCartoonPortrait}
                disabled={isGeneratingPortrait}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all border border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-amber-300 active:scale-[0.98] cursor-pointer disabled:opacity-50 whitespace-nowrap"
                title="Regenerate cartoon / video game style portrait with an alternate variation"
              >
                <RefreshCw className={`w-3.5 h-3.5 shrink-0 ${isGeneratingPortrait ? 'animate-spin text-amber-400' : ''}`} />
                <span>Regenerate Cartoon Portrait</span>
              </button>
            </div>

            {character.activePortraitType === 'cartoon' && (
              <button
                type="button"
                onClick={onSwitchToClassicPortrait}
                className="text-[11px] text-stone-400 hover:text-stone-200 transition-colors text-center pt-1"
              >
                Switch back to Classic Art Style
              </button>
            )}
          </div>

          {/* Core Player Card Stats: Health, Mana, and Strength */}
          <div className="p-3.5 bg-stone-950/85 border-2 border-amber-900/50 rounded-2xl shadow-inner flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-display font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Player Card Core Stats
              </span>
              <span className="text-[10px] font-mono text-stone-500">RANDOMIZED RATINGS</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* Health Stat */}
              <div className="p-2.5 rounded-xl bg-gradient-to-b from-red-950/60 to-stone-950/90 border border-red-700/60 flex flex-col items-center text-center shadow-sm">
                <span className="text-[11px] font-bold text-red-400 flex items-center gap-1 uppercase tracking-wider">
                  <Heart className="w-3.5 h-3.5 fill-red-500/40 text-red-400" /> Health
                </span>
                <span className="font-mono text-2xl font-black tabular-nums text-stone-100 mt-1">
                  {character.health || character.maxHp}
                </span>
                <span className="text-[10px] text-red-300/70 font-medium">Vitality</span>
              </div>

              {/* Mana Stat */}
              <div className="p-2.5 rounded-xl bg-gradient-to-b from-blue-950/60 to-stone-950/90 border border-blue-700/60 flex flex-col items-center text-center shadow-sm">
                <span className="text-[11px] font-bold text-blue-400 flex items-center gap-1 uppercase tracking-wider">
                  <Droplet className="w-3.5 h-3.5 fill-blue-500/40 text-blue-400" /> Mana
                </span>
                <span className="font-mono text-2xl font-black tabular-nums text-stone-100 mt-1">
                  {character.mana || 50}
                </span>
                <span className="text-[10px] text-blue-300/70 font-medium">Arcane Pool</span>
              </div>

              {/* Strength Stat */}
              <div className="p-2.5 rounded-xl bg-gradient-to-b from-amber-950/60 to-stone-950/90 border border-amber-700/60 flex flex-col items-center text-center shadow-sm">
                <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1 uppercase tracking-wider">
                  <Swords className="w-3.5 h-3.5 text-amber-400" /> Strength
                </span>
                <span className="font-mono text-2xl font-black tabular-nums text-stone-100 mt-1">
                  {character.strength || character.attributes.strength.score}
                </span>
                <span className="text-[10px] text-amber-300/70 font-medium">Strike Power</span>
              </div>
            </div>
          </div>

          {/* Secondary Tactical Metrics Strip */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 bg-stone-950/60 border border-amber-950/60 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 text-blue-400 text-[11px] mb-0.5">
                <Shield className="w-3 h-3" />
                <span className="font-medium">Armor Class</span>
              </div>
              <span className="font-mono text-base font-bold tabular-nums text-stone-100">
                {character.armorClass}
              </span>
            </div>

            <div className="p-2 bg-stone-950/60 border border-amber-950/60 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 text-[11px] mb-0.5">
                <Zap className="w-3 h-3" />
                <span className="font-medium">Initiative</span>
              </div>
              <span className="font-mono text-base font-bold tabular-nums text-stone-100">
                {formatModifier(character.initiative)}
              </span>
            </div>

            <div className="p-2 bg-stone-950/60 border border-amber-950/60 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-400 text-[11px] mb-0.5">
                <Footprints className="w-3 h-3" />
                <span className="font-medium">Speed</span>
              </div>
              <span className="font-mono text-base font-bold tabular-nums text-stone-100">
                {character.speed}<span className="text-xs font-normal text-stone-400">ft</span>
              </span>
            </div>
          </div>

          {/* Quote */}
          <div className="p-3.5 rounded-xl bg-stone-950/40 border border-stone-800/80 italic text-stone-300 text-xs sm:text-sm">
            {character.quote}
          </div>
        </div>

        {/* Right Column: Attribute Scores & Lore & Loadout */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* 6 Primary Attribute Blocks */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Core Abilities (4d6 Tabletop Standard)
              </h2>
              <span className="text-xs text-stone-500 font-mono">Scores & Modifiers</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {attributeKeys.map((key) => {
                const attr = character.attributes[key];
                const modFormatted = formatModifier(attr.modifier);
                const isPositive = attr.modifier > 0;
                const percentage = Math.min(100, Math.max(10, ((attr.score - 6) / 14) * 100));

                return (
                  <div
                    key={key}
                    className="flex flex-col items-center p-2.5 bg-stone-950/70 border border-stone-800/90 rounded-xl text-center hover:border-stone-700 transition-colors"
                  >
                    <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                      {statLabels[key].abbr}
                    </span>
                    <span className="font-mono text-xl font-bold tabular-nums text-stone-100 my-0.5">
                      {attr.score}
                    </span>
                    <span
                      className={`text-xs font-mono font-medium px-1.5 py-0.5 rounded ${
                        isPositive
                          ? 'text-amber-300 bg-amber-950/40'
                          : attr.modifier < 0
                          ? 'text-red-400 bg-red-950/40'
                          : 'text-stone-400 bg-stone-800/40'
                      }`}
                    >
                      {modFormatted}
                    </span>
                    {/* Visual power mini gauge */}
                    <div className="w-full bg-stone-800 h-1 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Signature Ability Showcase */}
          <div className="p-4 bg-stone-950/70 border border-stone-800/80 rounded-xl">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="font-display font-semibold text-sm text-stone-100">
                  {character.signatureAbility.name}
                </h3>
              </div>
              <span className="text-xs text-stone-400 font-medium">
                {character.signatureAbility.type}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {character.signatureAbility.description}
            </p>
          </div>

          {/* Gear & Relics Loadout */}
          <div className="p-4 bg-stone-950/70 border border-stone-800/80 rounded-xl">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2.5 flex items-center gap-1.5">
              <Sword className="w-3.5 h-3.5 text-stone-400" />
              Equipment & Armory
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex flex-col">
                <span className="text-stone-500 font-medium">Weapons:</span>
                <span className="text-stone-200">
                  {character.gear.mainHand}
                  {character.gear.offHand ? ` · ${character.gear.offHand}` : ''}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-stone-500 font-medium">Armor:</span>
                <span className="text-stone-200">{character.gear.armor}</span>
              </div>
              <div className="sm:col-span-2 flex flex-col mt-1">
                <span className="text-stone-500 font-medium">Peculiar Trinket:</span>
                <span className="text-amber-300/90 italic">{character.gear.trinket}</span>
              </div>
            </div>
          </div>

          {/* Lore & Flaws */}
          <div className="p-4 bg-stone-950/70 border border-stone-800/80 rounded-xl">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-300/90 flex items-center gap-1.5 font-display">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                Chronicle & Origin Story
              </h3>
              <button
                type="button"
                onClick={onGenerateBackstory}
                disabled={isGeneratingBackstory}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-950/70 hover:bg-amber-900/80 text-amber-200 border border-amber-600/40 shadow-sm active:scale-[0.98] cursor-pointer transition-colors disabled:opacity-50"
                title="Generate a unique 1-2 sentence origin story for this character"
              >
                <ScrollText className={`w-3.5 h-3.5 ${isGeneratingBackstory ? 'animate-bounce text-amber-300' : 'text-amber-400'}`} />
                <span>Generate Backstory</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed mb-3.5 font-serif italic border-l-2 border-amber-600/50 pl-3 py-0.5 bg-stone-950/40 rounded-r-lg">
              "{character.backstory}"
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-400 pt-2 border-t border-stone-800">
              <div>
                <span className="text-stone-500 font-medium">Guiding Ideal: </span>
                <span className="text-stone-300">{character.personality.ideal}</span>
              </div>
              <div>
                <span className="text-stone-500 font-medium">Tragic Flaw: </span>
                <span className="text-stone-300">{character.personality.flaw}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
