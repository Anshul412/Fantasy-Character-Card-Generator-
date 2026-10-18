import React from 'react';
import { X, Dices, Shield, Sparkles, BookOpen } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="w-full max-w-2xl bg-gradient-to-b from-[#221811] via-[#1a120c] to-[#120d09] border-2 border-amber-900/50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6 border-b border-amber-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-fantasy text-xl">⚗</span>
            <h2 className="font-display text-lg font-bold text-amber-100">
              Alchemist's Grimoire: Rules & Lore
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-stone-300 text-sm leading-relaxed max-h-[75vh] overflow-y-auto">
          {/* Section 1: 4d6 generation */}
          <div>
            <h3 className="font-display font-semibold text-amber-200 mb-1.5 flex items-center gap-1.5">
              <Dices className="w-4 h-4 text-amber-400" />
              The 4d6 Drop Lowest Rolling Method
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm">
              Each attribute (Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma) is rolled
              by simulating four 6-sided dice and discarding the lowest die. This produces an authentic bell-curve
              favoring above-average heroic adventurers (scores ranging between 8 and 18).
            </p>
          </div>

          {/* Section 2: Attribute modifiers */}
          <div>
            <h3 className="font-display font-semibold text-amber-200 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Ability Modifiers Formula
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm">
              Modifiers are calculated using the classic tabletop formula:
              <code className="mx-1 px-1.5 py-0.5 rounded bg-stone-950 font-mono text-amber-300">
                floor((Score - 10) / 2)
              </code>
              . For example, a Strength of 16 grants a <span className="text-amber-400 font-mono">+3</span> modifier
              to weapon damage, athletics checks, and physical saving throws.
            </p>
          </div>

          {/* Section 3: Archetype Prioritization */}
          <div>
            <h3 className="font-display font-semibold text-amber-200 mb-1.5 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-400" />
              Archetype Class Synergy
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                <span className="font-bold text-red-400 block mb-0.5">Warrior & Paladin</span>
                <span className="text-stone-400">
                  Prioritizes high Strength and Constitution for frontline survival, heavy plate armor, and crushing martial weapons.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                <span className="font-bold text-blue-400 block mb-0.5">Mage & Warlock</span>
                <span className="text-stone-400">
                  Prioritizes Intelligence or Charisma to channel destructive elemental spells, arcane wards, and cosmic rifts.
                </span>
              </div>
              <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                <span className="font-bold text-emerald-400 block mb-0.5">Rogue & Ranger</span>
                <span className="text-stone-400">
                  Prioritizes Dexterity and Wisdom for unmatched initiative speed, lethal critical strikes from shadow, and pathfinding.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-stone-800 bg-stone-950/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-200 bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
