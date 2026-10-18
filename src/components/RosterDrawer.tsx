import React from 'react';
import { X, Trash2, Star, Download, Play, Eye } from 'lucide-react';
import { Character } from '../types/character';

interface RosterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  roster: Character[];
  activeId: string | null;
  onSelectCharacter: (char: Character) => void;
  onDeleteCharacter: (id: string) => void;
  onClearRoster: () => void;
  onToggleFavorite: (id: string) => void;
}

export const RosterDrawer: React.FC<RosterDrawerProps> = ({
  isOpen,
  onClose,
  roster,
  activeId,
  onSelectCharacter,
  onDeleteCharacter,
  onClearRoster,
  onToggleFavorite,
}) => {
  if (!isOpen) return null;

  const exportAllJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(roster, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `fantasy_characters_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div
        className="w-full max-w-md bg-stone-950 border-l border-stone-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg font-bold text-stone-100">
              Hero Roster
            </h2>
            <span className="text-xs font-mono text-stone-400 bg-stone-900 px-2 py-0.5 rounded-full border border-stone-800 tabular-nums">
              {roster.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {roster.length > 0 && (
              <button
                type="button"
                onClick={exportAllJson}
                className="p-1.5 text-stone-400 hover:text-stone-200 hover:bg-stone-900 rounded-lg transition-colors border border-stone-800"
                title="Export all characters to JSON"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-200 hover:bg-stone-900 rounded-lg transition-colors"
              aria-label="Close roster"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of Characters */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {roster.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <span className="text-3xl mb-2">⚔️</span>
              <p className="text-sm font-medium text-stone-400">Your roster is currently empty</p>
              <p className="text-xs text-stone-500 mt-1 max-w-xs">
                Roll new adventurers using the character forge; they will be recorded here automatically.
              </p>
            </div>
          ) : (
            roster.map((char) => {
              const isActive = char.id === activeId;
              return (
                <div
                  key={char.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isActive
                      ? 'bg-amber-950/20 border-amber-500/50 shadow-sm'
                      : 'bg-stone-900/60 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Character Thumbnail */}
                    <div className="w-11 h-11 rounded-lg overflow-hidden border border-stone-700/80 bg-stone-950 shrink-0">
                      <img
                        src={char.activePortraitType === 'cartoon' && char.cartoonPortraitUrl ? char.cartoonPortraitUrl : char.portraitUrl}
                        alt={char.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-fantasy font-bold text-amber-100 text-base truncate tracking-wide">
                          {char.name}
                        </h4>
                        {isActive && (
                          <span className="text-[10px] font-mono text-amber-400 font-medium">
                            Active
                          </span>
                        )}
                        {char.activePortraitType === 'cartoon' && (
                          <span className="text-[10px] text-amber-300 font-medium">
                            [Game Art]
                          </span>
                        )}
                      </div>

                      {/* Zero-Pill Unboxed Metadata */}
                      <div className="text-xs text-stone-400 mt-0.5 truncate">
                        <span>{char.race}</span>
                        <span className="mx-1.5 text-stone-600">·</span>
                        <span className="text-amber-300 font-medium">{char.characterClass}</span>
                        <span className="mx-1.5 text-stone-600">·</span>
                        <span className="text-stone-300">{char.subclass}</span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] font-mono text-stone-400 mt-2">
                        <span>HP: {char.maxHp}</span>
                        <span>AC: {char.armorClass}</span>
                        <span>STR: {char.attributes.strength.score}</span>
                        <span>DEX: {char.attributes.dexterity.score}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(char.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          char.isFavorite
                            ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                            : 'border-stone-800 text-stone-500 hover:text-stone-300'
                        }`}
                        title={char.isFavorite ? 'Favorited' : 'Add favorite'}
                      >
                        <Star className={`w-3.5 h-3.5 ${char.isFavorite ? 'fill-amber-400' : ''}`} />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onSelectCharacter(char);
                          onClose();
                        }}
                        className="p-1.5 rounded-lg border border-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-500/30 transition-colors"
                        title="View & Edit in Forge"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteCharacter(char.id)}
                        className="p-1.5 rounded-lg border border-stone-800 text-stone-500 hover:text-red-400 hover:border-red-900/50 transition-colors"
                        title="Delete from roster"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {roster.length > 0 && (
          <div className="p-4 border-t border-stone-800 bg-stone-950/80 flex items-center justify-between">
            <span className="text-xs text-stone-500">
              Stored locally in browser
            </span>
            <button
              type="button"
              onClick={onClearRoster}
              className="text-xs text-red-400/80 hover:text-red-300 transition-colors font-medium"
            >
              Clear Entire Roster
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
