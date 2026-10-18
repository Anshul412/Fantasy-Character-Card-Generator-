import {
  Character,
  CharacterClass,
  CharacterRace,
  Alignment,
  CharacterAttributes,
  GeneratorLocks,
} from '../types/character';
import {
  CLASS_DATA,
  CLASS_PORTRAITS,
  CARTOON_PORTRAITS,
  CLASS_COLORS,
  FIRST_NAMES,
  SURNAMES,
  EPITHETS,
  TRINKETS,
  PERSONALITIES,
  ALIGNMENTS,
} from '../data/fantasyData';

const RACES: CharacterRace[] = [
  'Human',
  'High Elf',
  'Wood Elf',
  'Mountain Dwarf',
  'Tiefling',
  'Dragonborn',
  'Half-Orc',
  'Halfling',
  'Aasimar',
];

const CLASSES: CharacterClass[] = [
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

function pickRandom<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Simulates 4d6 drop lowest for traditional tabletop distribution
function rollAttributeScore(): number {
  const rolls = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ];
  rolls.sort((a, b) => a - b);
  return rolls[1] + rolls[2] + rolls[3];
}

function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function generateCharacterName(race: CharacterRace): { name: string; title: string } {
  const names = FIRST_NAMES[race] || FIRST_NAMES.Human;
  const firstName = pickRandom(names);
  const surname = pickRandom(SURNAMES);
  const epithet = pickRandom(EPITHETS);

  // 60% chance of "Firstname Surname", 40% chance of "Firstname the Title"
  const useSurname = Math.random() > 0.35;
  const fullName = useSurname ? `${firstName} ${surname}` : `${firstName}`;
  const title = epithet.startsWith('the ') ? epithet : `the ${epithet}`;

  return { name: fullName, title };
}

export function generateCharacter(
  existingCharacter?: Character | null,
  locks?: GeneratorLocks,
  selectedClass?: CharacterClass | 'Random'
): Character {
  // 1. Determine Class
  let charClass: CharacterClass;
  if (locks?.characterClass && existingCharacter) {
    charClass = existingCharacter.characterClass;
  } else if (selectedClass && selectedClass !== 'Random') {
    charClass = selectedClass;
  } else {
    charClass = pickRandom(CLASSES);
  }

  // 2. Determine Race
  let race: CharacterRace;
  if (locks?.race && existingCharacter) {
    race = existingCharacter.race;
  } else {
    race = pickRandom(RACES);
  }

  // 3. Determine Name & Title
  let name: string;
  let title: string;
  if (locks?.name && existingCharacter) {
    name = existingCharacter.name;
    title = existingCharacter.title;
  } else {
    const generated = generateCharacterName(race);
    name = generated.name;
    title = generated.title;
  }

  const classDef = CLASS_DATA[charClass];

  // 4. Roll & distribute attributes biased toward class core strengths
  const rolledScores = [
    rollAttributeScore(),
    rollAttributeScore(),
    rollAttributeScore(),
    rollAttributeScore(),
    rollAttributeScore(),
    rollAttributeScore(),
  ].sort((a, b) => b - a); // Highest to lowest

  // Ensure high fantasy heroics: minimum highest score is 15
  if (rolledScores[0] < 15) rolledScores[0] = 16;
  if (rolledScores[1] < 13) rolledScores[1] = 14;

  const statOrder = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as const;
  const assignedScores: Record<string, number> = {};

  // Assign top scores to class primary stats
  const primaryList = [...classDef.primaryStats];
  primaryList.forEach((stat, idx) => {
    assignedScores[stat] = rolledScores[idx];
  });

  // Assign remaining scores to other stats
  const remainingStats = statOrder.filter((s) => !primaryList.includes(s));
  remainingStats.forEach((stat, idx) => {
    assignedScores[stat] = rolledScores[primaryList.length + idx];
  });

  const attributes: CharacterAttributes = {
    strength: {
      score: assignedScores.strength,
      modifier: calculateModifier(assignedScores.strength),
    },
    dexterity: {
      score: assignedScores.dexterity,
      modifier: calculateModifier(assignedScores.dexterity),
    },
    constitution: {
      score: assignedScores.constitution,
      modifier: calculateModifier(assignedScores.constitution),
    },
    intelligence: {
      score: assignedScores.intelligence,
      modifier: calculateModifier(assignedScores.intelligence),
    },
    wisdom: {
      score: assignedScores.wisdom,
      modifier: calculateModifier(assignedScores.wisdom),
    },
    charisma: {
      score: assignedScores.charisma,
      modifier: calculateModifier(assignedScores.charisma),
    },
  };

  // 5. Combat Derived Statistics
  const level = 3;
  const conMod = attributes.constitution.modifier;
  const dexMod = attributes.dexterity.modifier;
  // Level 1 max die + average of remaining levels
  const baseHp = classDef.hitDie + conMod + (level - 1) * (Math.floor(classDef.hitDie / 2) + 1 + conMod);
  const maxHp = Math.max(12, baseHp);

  // Armor Class calculation
  let baseAc = 10;
  if (charClass === 'Warrior' || charClass === 'Paladin') {
    baseAc = 18; // Heavy armor + shield
  } else if (charClass === 'Cleric') {
    baseAc = 16; // Scale + shield
  } else if (charClass === 'Rogue' || charClass === 'Ranger') {
    baseAc = 12 + Math.min(3, dexMod); // Light/Medium
  } else if (charClass === 'Druid') {
    baseAc = 13 + Math.min(2, dexMod);
  } else {
    baseAc = 10 + dexMod + 2; // Mage armor / ward
  }

  const speed = race === 'Mountain Dwarf' || race === 'Halfling' ? 25 : 30;
  const initiative = dexMod;

  // Randomly generated Player Card core stats: Health, Mana, Strength
  let healthRoll = 70;
  let manaRoll = 50;
  let strengthRoll = attributes.strength.score;

  if (charClass === 'Warrior' || charClass === 'Paladin') {
    healthRoll = 90 + Math.floor(Math.random() * 35) + conMod * 5;
    manaRoll = 25 + Math.floor(Math.random() * 25);
    strengthRoll = attributes.strength.score + 4 + Math.floor(Math.random() * 6);
  } else if (charClass === 'Mage' || charClass === 'Warlock') {
    healthRoll = 55 + Math.floor(Math.random() * 25) + conMod * 3;
    manaRoll = 90 + Math.floor(Math.random() * 40) + attributes.intelligence.modifier * 6;
    strengthRoll = Math.max(8, attributes.strength.score - 2 + Math.floor(Math.random() * 4));
  } else if (charClass === 'Cleric' || charClass === 'Druid') {
    healthRoll = 75 + Math.floor(Math.random() * 25) + conMod * 4;
    manaRoll = 75 + Math.floor(Math.random() * 35) + attributes.wisdom.modifier * 5;
    strengthRoll = attributes.strength.score + Math.floor(Math.random() * 5);
  } else {
    // Rogue, Ranger, Bard
    healthRoll = 70 + Math.floor(Math.random() * 30) + conMod * 4;
    manaRoll = 45 + Math.floor(Math.random() * 30) + (charClass === 'Bard' ? 20 : 0);
    strengthRoll = attributes.strength.score + Math.floor(Math.random() * 5);
  }

  // 6. Signature ability & loadout
  const signatureAbility = pickRandom(classDef.signatureAbilities);
  const subclass = pickRandom(classDef.subclasses);
  const mainWeapon = pickRandom(classDef.defaultWeapons.main);
  const offWeapon = classDef.defaultWeapons.off ? pickRandom(classDef.defaultWeapons.off) : undefined;
  const trinket = pickRandom(TRINKETS);

  // 7. Personality & Alignment
  const alignment: Alignment = pickRandom(ALIGNMENTS);
  const trait = pickRandom(PERSONALITIES.traits);
  const ideal = pickRandom(PERSONALITIES.ideals);
  const flaw = pickRandom(PERSONALITIES.flaws);
  const quote = pickRandom(classDef.quotes);

  const backstories = [
    `Raised amidst the mist-shrouded frontier settlements, ${name} earned a reputation as an unyielding defender before joining the storied wandering guilds.`,
    `After discovering a forbidden cipher in the family vault, ${name} abandoned a comfortable lineage to pursue the unraveling secrets of the ancient realm.`,
    `Surviving a miraculous ambush in the Whispering Crags, ${name} was forged in adversity and emerged with sharper instincts than seasoned veterans.`,
    `Trained by master practitioners of the old traditions, ${name} carries the mantle of an almost-forgotten order into the coming age of conflict.`,
    `Exiled following a clash with corrupt high lords, ${name} now plies skill and cunning for causes worthy of true honor.`,
  ];
  const backstory = pickRandom(backstories);

  return {
    id: `char-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name,
    title,
    race,
    characterClass: charClass,
    subclass,
    level,
    alignment,
    portraitUrl: CLASS_PORTRAITS[charClass],
    accentColor: CLASS_COLORS[charClass],
    attributes,
    health: healthRoll,
    mana: manaRoll,
    strength: strengthRoll,
    maxHp: healthRoll,
    armorClass: baseAc,
    speed,
    initiative,
    signatureAbility,
    gear: {
      mainHand: mainWeapon,
      offHand: offWeapon,
      armor: classDef.baseArmor,
      trinket,
    },
    personality: {
      trait,
      ideal,
      flaw,
    },
    backstory,
    quote,
    createdAt: Date.now(),
    isFavorite: false,
  };
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function generateCartoonPortrait(char: Character, cycleIndex: number = 0): string {
  const images = CARTOON_PORTRAITS[char.characterClass] || [];
  const totalImageCount = images.length;
  const modIndex = cycleIndex % (totalImageCount + 2);

  if (modIndex < totalImageCount) {
    return images[modIndex];
  }

  // Generate stylized SVG cartoon video game avatars for extra variations
  const primaryColor = CLASS_COLORS[char.characterClass] || '#f59e0b';
  const rune = char.characterClass === 'Warrior' ? '⚔' : char.characterClass === 'Mage' ? '✦' : char.characterClass === 'Rogue' ? '🗡' : '🏹';
  
  if (modIndex === totalImageCount) {
    // 2D Chibi Video Game Art
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e1b4b" />
          <stop offset="50%" stop-color="#312e81" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
        <radialGradient id="aura" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stop-color="${primaryColor}" stop-opacity="0.8" />
          <stop offset="70%" stop-color="${primaryColor}" stop-opacity="0.2" />
          <stop offset="100%" stop-color="transparent" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect width="400" height="400" fill="url(#bgGrad)" />
      <circle cx="200" cy="180" r="160" fill="url(#aura)" />
      <circle cx="200" cy="180" r="130" fill="none" stroke="${primaryColor}" stroke-width="4" stroke-dasharray="10 6" opacity="0.6" />
      <circle cx="200" cy="180" r="100" fill="#18181b" stroke="#e4e4e7" stroke-width="6" />
      <text x="200" y="160" font-family="sans-serif" font-size="70" text-anchor="middle" dominant-baseline="middle" filter="url(#glow)">${rune}</text>
      <text x="200" y="225" font-family="'Cinzel', serif" font-weight="bold" font-size="20" fill="#fde047" text-anchor="middle" letter-spacing="3">${char.characterClass.toUpperCase()}</text>
      <text x="200" y="250" font-family="sans-serif" font-size="12" fill="#a1a1aa" text-anchor="middle">${char.race} Hero · Cel-Shaded Sprite</text>
      <rect x="20" y="20" width="360" height="360" rx="16" fill="none" stroke="${primaryColor}" stroke-width="4" opacity="0.7" />
      <path d="M 20 50 L 50 20 M 380 50 L 350 20 M 20 350 L 50 380 M 380 350 L 350 380" stroke="${primaryColor}" stroke-width="3" />
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  } else {
    // Retro Arcade Video Game Emblem
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
      <rect width="400" height="400" fill="#09090b" />
      <circle cx="200" cy="200" r="150" fill="#1c1917" stroke="#fbbf24" stroke-width="8" />
      <circle cx="200" cy="200" r="135" fill="none" stroke="${primaryColor}" stroke-width="3" />
      <polygon points="200,80 240,160 330,160 260,210 290,290 200,240 110,290 140,210 70,160 160,160" fill="${primaryColor}" opacity="0.3" stroke="${primaryColor}" stroke-width="4" />
      <text x="200" y="195" font-family="'Plus Jakarta Sans', sans-serif" font-size="44" font-weight="900" fill="#ffffff" text-anchor="middle">LVL ${char.level}</text>
      <text x="200" y="240" font-family="'Cinzel', serif" font-size="22" font-weight="700" fill="#fbbf24" text-anchor="middle">${char.name.split(' ')[0]}</text>
      <text x="200" y="265" font-family="monospace" font-size="13" fill="#a8a29e" text-anchor="middle">[VIDEO GAME EDITION]</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }
}

export function generateBackstory(char: Character): string {
  const originStems = [
    `Born under a blood-red moon in the shadowed crags of the frontier, ${char.name} was tutored in the ancient ways of the ${char.characterClass.toLowerCase()} before a family feud forced them into exile.`,
    `Orphaned during an arcane cataclysm that consumed their ancestral settlement, ${char.name} learned to master survival and ${char.subclass.toLowerCase()} disciplines through bitter trial and perseverance.`,
    `Once an honored apprentice within the grand academies of the capital, ${char.name} unearthed a sealed forbidden ledger that changed their worldview forever.`,
    `Raised among the nomadic wanderers of the high steppes, ${char.name} inherited their ${char.gear.mainHand.toLowerCase()} along with a sacred vow never to let innocence perish undefended.`,
    `After single-handedly defending an isolated village from a marauding siege, ${char.name} was marked by destiny as a natural leader among wandering adventurers.`,
    `Escaping the stifling expectations of highborn lineage, ${char.name} took to the open road to forge an unwritten legend with their own hands.`,
    `Trained in seclusion by legendary hermit masters of the old realm, ${char.name} was sent into the mortal kingdoms when ominous portents appeared in the night sky.`,
    `Carrying the rare ancestral heritage of the ${char.race} elders, ${char.name} survived a perilous betrayal that hardened their resolve and sharpened their instincts.`,
  ];

  const destinationStems = [
    `Today, they wander the frontier territories seeking the truth behind a lingering prophecy that threatens the stability of the entire continent.`,
    `Now traveling with blade and cunning, they pledge their talents to any fellowship daring enough to push back against the gathering darkness.`,
    `Haunted by fractured memories of a lost sanctuary, they journey ceaselessly in search of an ancient relic capable of restoring their kin.`,
    `Driven by an unrelenting code of personal honor, they roam from kingdom to kingdom righting grievances that corrupt magistrates ignore.`,
    `With resolute purpose, they brave forgotten catacombs and untamed wilds to ensure that no evil catches the realm unprepared.`,
    `Armed with ${char.gear.mainHand.toLowerCase()} and unwavering resolve, they search for the elusive adversary who stole their birthright.`,
  ];

  const part1 = pickRandom(originStems);
  const part2 = pickRandom(destinationStems);

  return `${part1} ${part2}`;
}


