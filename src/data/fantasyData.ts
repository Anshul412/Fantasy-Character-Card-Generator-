import { CharacterClass, CharacterRace, Alignment, SignatureAbility, GearLoadout } from '../types/character';

export const CLASS_PORTRAITS: Record<CharacterClass, string> = {
  Warrior: '/src/assets/images/portrait_fantasy_warrior_1792294565161.jpg',
  Mage: '/src/assets/images/portrait_fantasy_mage_1792294566319.jpg',
  Rogue: '/src/assets/images/portrait_fantasy_rogue_1792294566937.jpg',
  Ranger: '/src/assets/images/portrait_fantasy_ranger_1792294566375.jpg',
  Paladin: '/src/assets/images/portrait_fantasy_warrior_1792294565161.jpg',
  Warlock: '/src/assets/images/portrait_fantasy_mage_1792294566319.jpg',
  Cleric: '/src/assets/images/portrait_fantasy_warrior_1792294565161.jpg',
  Druid: '/src/assets/images/portrait_fantasy_ranger_1792294566375.jpg',
  Bard: '/src/assets/images/portrait_fantasy_rogue_1792294566937.jpg',
};

export const CARTOON_PORTRAITS: Record<CharacterClass, string[]> = {
  Warrior: [
    '/src/assets/images/portrait_game_warrior_1792294903419.jpg',
    '/src/assets/images/portrait_game_paladin_1792294905187.jpg',
  ],
  Mage: [
    '/src/assets/images/portrait_game_mage_1792294903800.jpg',
    '/src/assets/images/portrait_game_rogue_1792294904732.jpg',
  ],
  Rogue: [
    '/src/assets/images/portrait_game_rogue_1792294904732.jpg',
    '/src/assets/images/portrait_game_ranger_1792294904671.jpg',
  ],
  Ranger: [
    '/src/assets/images/portrait_game_ranger_1792294904671.jpg',
    '/src/assets/images/portrait_game_rogue_1792294904732.jpg',
  ],
  Paladin: [
    '/src/assets/images/portrait_game_paladin_1792294905187.jpg',
    '/src/assets/images/portrait_game_warrior_1792294903419.jpg',
  ],
  Cleric: [
    '/src/assets/images/portrait_game_paladin_1792294905187.jpg',
    '/src/assets/images/portrait_game_mage_1792294903800.jpg',
  ],
  Druid: [
    '/src/assets/images/portrait_game_ranger_1792294904671.jpg',
    '/src/assets/images/portrait_game_mage_1792294903800.jpg',
  ],
  Warlock: [
    '/src/assets/images/portrait_game_mage_1792294903800.jpg',
    '/src/assets/images/portrait_game_rogue_1792294904732.jpg',
  ],
  Bard: [
    '/src/assets/images/portrait_game_rogue_1792294904732.jpg',
    '/src/assets/images/portrait_game_ranger_1792294904671.jpg',
  ],
};

export const CLASS_COLORS: Record<CharacterClass, string> = {
  Warrior: '#e11d48', // Crimson Rose
  Mage: '#3b82f6',    // Arcane Blue
  Rogue: '#10b981',    // Emerald Shadow
  Ranger: '#84cc16',   // Forest Green
  Paladin: '#f59e0b',  // Solar Amber
  Cleric: '#eab308',   // Divine Gold
  Druid: '#14b8a6',    // Natural Teal
  Warlock: '#8b5cf6',  // Eldritch Violet
  Bard: '#ec4899',     // Lyric Pink
};

export const FIRST_NAMES: Record<CharacterRace, string[]> = {
  Human: [
    'Alistair', 'Cedric', 'Rowan', 'Gwyneira', 'Vesper', 'Corin', 'Eleanor', 
    'Desmond', 'Katharine', 'Balian', 'Lyanna', 'Gideon', 'Evander', 'Beatrice'
  ],
  'High Elf': [
    'Aeloria', 'Faelar', 'Thalian', 'Sylas', 'Valerius', 'Illyria', 'Elowen',
    'Caelen', 'Naerith', 'Aerith', 'Lithari', 'Sariel', 'Zephyros', 'Alastor'
  ],
  'Wood Elf': [
    'Kaelen', 'Faenor', 'Brynna', 'Talon', 'Sylvan', 'Lirien', 'Branoc',
    'Yvaine', 'Kestrel', 'Morwen', 'Rowan', 'Tavish', 'Laurel', 'Finneas'
  ],
  'Mountain Dwarf': [
    'Torin', 'Morgrim', 'Helga', 'Bruenor', 'Thrumbar', 'Durnik', 'Kildrak',
    'Balgor', 'Vondal', 'Brynhild', 'Grumbar', 'Orla', 'Darrak', 'Korgan'
  ],
  Tiefling: [
    'Malakor', 'Vespera', 'Zariel', 'Ignis', 'Nyx', 'Xarxes', 'Kallista',
    'Akmenos', 'Marrow', 'Severus', 'Damakos', 'Levistus', 'Mordai', 'Zephira'
  ],
  Dragonborn: [
    'Rhogar', 'Drakath', 'Balfasar', 'Kava', 'Arjhan', 'Medrash', 'Nadarr',
    'Surina', 'Ghesh', 'Patrin', 'Torinn', 'Harann', 'Kriv', 'Daar'
  ],
  'Half-Orc': [
    'Gorgak', 'Valka', 'Krag', 'Thokk', 'Brakka', 'Murok', 'Dench',
    'Ront', 'Shump', 'Brell', 'Hogar', 'Grax', 'Drog', 'Keth'
  ],
  Halfling: [
    'Milo', 'Rosie', 'Corrin', 'Pippa', 'Finnian', 'Merric', 'Eldon',
    'Bree', 'Alton', 'Callie', 'Osborn', 'Wellby', 'Tansy', 'Lyle'
  ],
  Aasimar: [
    'Seraphiel', 'Cassiel', 'Aurelia', 'Uriel', 'Elysia', 'Gabriel', 'Lumina',
    'Valeria', 'Raziel', 'Solomon', 'Celeste', 'Azrael', 'Seraphina', 'Orion'
  ]
};

export const SURNAMES = [
  'Ironbreaker', 'Stormweaver', 'Nightbreeze', 'Sunstrider', 'Voidwalker',
  'Dawnseeker', 'Shadowthorn', 'Emberforge', 'Whisperwind', 'Runehand',
  'Silverleaf', 'Oathsworn', 'Bloodbane', 'Goldweaver', 'Frostfang',
  'Starfall', 'Drakenshield', 'Blackwood', 'Brightblade', 'Silentgrove'
];

export const EPITHETS = [
  'the Undaunted', 'the Silent Blade', 'Weaver of Starlight', 'Sentinel of the Deep',
  'the Cinder Queen', 'Watcher in the Mist', 'the Spell-Bound', 'Shield of the Realm',
  'of the High Peaks', 'the Silver-Tongued', 'of the Ashen Vow', 'the Unbroken',
  'the Wayfarer', 'Harbinger of Dawn', 'the Dread-Eyed', 'of the Forgotten Glen'
];

export interface ClassDefinition {
  subclasses: string[];
  hitDie: number; // 6, 8, 10, or 12
  primaryStats: (keyof typeof STAT_KEYS)[];
  baseArmor: string;
  defaultWeapons: {
    main: string[];
    off?: string[];
  };
  signatureAbilities: SignatureAbility[];
  quotes: string[];
}

const STAT_KEYS = {
  strength: true,
  dexterity: true,
  constitution: true,
  intelligence: true,
  wisdom: true,
  charisma: true,
};

export const CLASS_DATA: Record<CharacterClass, ClassDefinition> = {
  Warrior: {
    subclasses: ['Battle Master', 'Juggernaut Champion', 'Eldritch Knight', 'Berserker Vanguard'],
    hitDie: 10,
    primaryStats: ['strength', 'constitution', 'dexterity'],
    baseArmor: 'Full Steel Plate Harness',
    defaultWeapons: {
      main: ['Greatsword of the Lion', 'Masterwork Poleaxe', 'Engraved Broadsword', 'Valyrian Bastard Blade'],
      off: ['Heavy Runic Kite Shield', 'Parrying Dagger', 'Iron Buckler'],
    },
    signatureAbilities: [
      {
        name: 'Second Wind',
        type: 'Active Burst',
        description: 'Draws upon a deep reservoir of stamina to recover vigor and shrug off fatal trauma in combat.',
      },
      {
        name: 'Action Surge',
        type: 'Tactical Overdrive',
        description: 'Pushes past normal physical limits to deliver a flurry of devastating weapon strikes in a heartbeat.',
      },
      {
        name: 'Shield Wall Stance',
        type: 'Defensive Bulwark',
        description: 'Locks armor plates and shield to deflect incoming arrows, spells, and heavy siege swings.',
      },
    ],
    quotes: [
      '"Steel remembers what blood forgives. Hold the line!"',
      '"A warrior does not seek glory—glory follows victory."',
      '"Stand behind my shield until the horns sound our triumph."',
    ],
  },
  Mage: {
    subclasses: ['Arcanist of the Astral College', 'Pyromancer of the Hearth', 'Chronomancy Theorist', 'Abjuration Aegis'],
    hitDie: 6,
    primaryStats: ['intelligence', 'constitution', 'wisdom'],
    baseArmor: 'Runed Scholar Mantle & Silk Vestments',
    defaultWeapons: {
      main: ['Starlight Focusing Staff', 'Channeled Glass Wand', 'Grimoire of Whispering Glyphs'],
      off: ['Orb of Swirling Chrono-Mist', 'Arcane Focus Crystal', 'Bound Tarot of the Ancients'],
    },
    signatureAbilities: [
      {
        name: 'Arcane Overload',
        type: 'Spiritual Resonance',
        description: 'Channels concentrated mana through focal ley-lines, doubling spell radius and incinerating enemy shields.',
      },
      {
        name: 'Temporal Step',
        type: 'Chronomancy',
        description: 'Bends space-time to instantly teleport 30 feet, leaving behind a mirage of crackling azure sparks.',
      },
      {
        name: 'Prismatic Ward',
        type: 'Abjuration Barrier',
        description: 'Erects an iridescent hexagonal shield absorbing elemental damage and rebounding kinetic impact.',
      },
    ],
    quotes: [
      '"Reality is merely clay to those who know the true words of creation."',
      '"Knowledge without power is impotent; power without wisdom is catastrophe."',
      '"I have cataloged stars that died before this kingdom was named."',
    ],
  },
  Rogue: {
    subclasses: ['Shadow Assassin', 'Arcane Trickster', 'Phantom Skirmisher', 'Master Infiltrator'],
    hitDie: 8,
    primaryStats: ['dexterity', 'charisma', 'intelligence'],
    baseArmor: 'Supple Shadow-Stitched Leather',
    defaultWeapons: {
      main: ['Twin Obsidian Daggers', 'Serrated Moonblade', 'Silent Whispering Hand Crossbow'],
      off: ['Smoke Vials & Throwing Needles', 'Lockbreaker Gauntlet', 'Darksteel Stiletto'],
    },
    signatureAbilities: [
      {
        name: 'Sneak Attack',
        type: 'Precision Lethality',
        description: 'Strikes an unsuspecting foe in a vital nerve point, dealing massive critical trauma from shadows.',
      },
      {
        name: 'Cunning Action',
        type: 'Acrobatic Mastery',
        description: 'Disengages, hides in shadowy crevices, or dashes across rooftops with near-frictionless agility.',
      },
      {
        name: 'Shadowmeld',
        type: 'Stealth Weaving',
        description: 'Dissolves visually into deep darkness, completely masking scent, thermal warmth, and footfalls.',
      },
    ],
    quotes: [
      '"You never hear the blade that actually matters."',
      '"Locked doors are just polite suggestions left by the careless."',
      '"Trust is expensive. Paranoia is free and keeps you breathing."',
    ],
  },
  Ranger: {
    subclasses: ['Deepwood Warden', 'Gloom Stalker', 'Fey Beast Companion', 'Horizon Sentinel'],
    hitDie: 10,
    primaryStats: ['dexterity', 'wisdom', 'constitution'],
    baseArmor: 'Studded Elk-Hide Jerkin & Camouflage Cloak',
    defaultWeapons: {
      main: ['Carved Yew Longbow', 'Twin Briarwood Scimitars', 'Ancient Elven Recurve'],
      off: ['Quiver of Barbed Briar Arrows', 'Trapper Shortbow', 'Hunting Kukri'],
    },
    signatureAbilities: [
      {
        name: "Hunter's Quarry",
        type: 'Focused Tracking',
        description: 'Marks an enemy target spiritually, predicting their evasion vectors and finding vulnerabilities in any hide.',
      },
      {
        name: 'Nature Walk',
        type: 'Terrain Dominion',
        description: 'Travels effortlessly across thorny underbrush, marshland, and icy crags without leaving footprints.',
      },
      {
        name: 'Hail of Thorns',
        type: 'Area Volley',
        description: 'Enchants an arrow volley with explosive botanical briars that shred clusters of foes upon detonation.',
      },
    ],
    quotes: [
      '"The forest speaks to those who listen; it buries those who do not."',
      '"One shot, one breath, the wind does the rest."',
      '"Out here, civilisation is only an unmade bed."',
    ],
  },
  Paladin: {
    subclasses: ['Oath of Vengeance', 'Oath of the Ancients', 'Sacred Devotion', 'Crown Knight'],
    hitDie: 10,
    primaryStats: ['strength', 'charisma', 'constitution'],
    baseArmor: 'Gilded Sun-Forged Plate',
    defaultWeapons: {
      main: ['Holy Avenger War Hammer', 'Radiant Broadsword', 'Solar Flail'],
      off: ['Blessed Tower Shield', 'Sanctified Reliquary'],
    },
    signatureAbilities: [
      {
        name: 'Divine Smite',
        type: 'Holy Consecration',
        description: 'Infuses weapon strikes with searing sacred fire, blinding evil aberrations and disintegrating fiends.',
      },
      {
        name: 'Lay on Hands',
        type: 'Restorative Grace',
        description: 'Channels blessed divine benevolence to purge toxins, stitch flesh, and mend shattered bones.',
      },
      {
        name: 'Aura of Courage',
        type: 'Inspiring Presence',
        description: 'Radiates an empowering golden glow that prevents nearby allies from fleeing or succumbing to fear.',
      },
    ],
    quotes: [
      '"My blade is sworn to the fallen, my spirit to the eternal dawn."',
      '"Darkness does not negotiate, and neither do I."',
      '"Stand firm, child. The righteous will not bend."',
    ],
  },
  Cleric: {
    subclasses: ['Life Domain High Priest', 'Tempest Oracle', 'Twilight Keeper', 'Forge Smith'],
    hitDie: 8,
    primaryStats: ['wisdom', 'constitution', 'strength'],
    baseArmor: 'Ceremonial Scale Mail & Vestments',
    defaultWeapons: {
      main: ['Flanged Morningstar', 'Sunlight Scepter', 'Runic War Hammer'],
      off: ['Silver Divine Symbol Shield', 'Censer of Purifying Incense'],
    },
    signatureAbilities: [
      {
        name: 'Channel Divinity: Radiance',
        type: 'Deity Manifestation',
        description: 'Summons a burst of pure solar energy that incinerates darkness and restores vitality to wounded comrades.',
      },
      {
        name: 'Beacon of Hope',
        type: 'Aura Blessing',
        description: 'Bestows resolute spirit upon companions, maximizing healing potency and resisting mental curses.',
      },
      {
        name: 'Spiritual Weapon',
        type: 'Ethereal Summon',
        description: 'Manifests a floating spectral hammer of pure divine wrath that strikes foes with righteous fury.',
      },
    ],
    quotes: [
      '"Faith is the anchor that holds when the world turns to ash."',
      '"The gods have not abandoned us; we are their outstretched hands."',
      '"In darkness, be the candle; in battle, be the beacon."',
    ],
  },
  Druid: {
    subclasses: ['Circle of the Moon', 'Circle of Spores', 'Circle of the Land (Coast)', 'Wildheart Shaman'],
    hitDie: 8,
    primaryStats: ['wisdom', 'constitution', 'dexterity'],
    baseArmor: 'Cured Ironwood & Antler Cuirass',
    defaultWeapons: {
      main: ['Living Oak Shillelagh', 'Curved Obsidian Sickle', 'Staff of Verdant Sprouts'],
      off: ['Woven Bark Buckler', 'Pouch of Primeval Seeds'],
    },
    signatureAbilities: [
      {
        name: 'Wild Shape: Dire Beast',
        type: 'Metamorphic Rite',
        description: 'Transforms physical anatomy into a massive dire wolf, cave bear, or giant eagle with savage claws.',
      },
      {
        name: 'Call Lightning',
        type: 'Storm Conjuration',
        description: 'Summons tempestuous thunderclouds, directing arcs of lightning down upon enemies with precision.',
      },
      {
        name: 'Barkskin & Briars',
        type: 'Botanical Armor',
        description: 'Hardens skin into ancient ironwood timber, reflecting kinetic blows back at attackers.',
      },
    ],
    quotes: [
      '"We do not inherit nature; we are merely visitors on its patience."',
      '"Blood and soil, petal and bone—the cycle knows neither pity nor rage."',
      '"Step lightly, or the earth will reclaim what it gave you."',
    ],
  },
  Warlock: {
    subclasses: ['Pact of the Fiend', 'Eldritch Great Old One', 'Hexblade Blade-Pact', 'Archfey Trickster'],
    hitDie: 8,
    primaryStats: ['charisma', 'constitution', 'dexterity'],
    baseArmor: 'Runed Nether-Cloth & Bone Corslet',
    defaultWeapons: {
      main: ['Pact Blade of Shadowflame', 'Chirurgical Athame', 'Staff of Void Crystals'],
      off: ['Tome of Forbidden Secrets', 'Soul Gem Talisman'],
    },
    signatureAbilities: [
      {
        name: 'Eldritch Blast',
        type: 'Void Cannon',
        description: 'Hurls beams of crackling violet occult force that knock enemies backwards and rupture armor plates.',
      },
      {
        name: "Hexblade's Curse",
        type: 'Dark Affliction',
        description: 'Binds an enemy soul in an ominous shadow pact, stealing their vitality as they fall in combat.',
      },
      {
        name: 'Hunger of Hadar',
        type: 'Abyssal Rift',
        description: 'Opens a gateway to the black void between stars, bathing enemies in freezing cosmic dread and whispers.',
      },
    ],
    quotes: [
      '"The price was steep, but the power was worth every single drop."',
      '"You fear the dark because you don\'t understand the bargains it makes."',
      '"My patron whispered your true name. You shouldn\'t have made me angry."',
    ],
  },
  Bard: {
    subclasses: ['College of Lore', 'College of Swords', 'College of Glamour', 'College of Whispers'],
    hitDie: 8,
    primaryStats: ['charisma', 'dexterity', 'intelligence'],
    baseArmor: 'Embroidered Velvet Jerkin & Leather Boots',
    defaultWeapons: {
      main: ['Masterwork Silver Rapier', 'Gilded Rosewood Lute', 'Dragon-Bone Shortbow'],
      off: ['Dagger of Melodic Whispers', 'Enchanted Songbook'],
    },
    signatureAbilities: [
      {
        name: 'Bardic Inspiration',
        type: 'Harmonic Anthem',
        description: 'Weaves inspiring melodies and rhyming words that steady an ally\'s hand for crucial heroic moments.',
      },
      {
        name: 'Cutting Words',
        type: 'Psychic Mockery',
        description: 'Hurls a sharp, razor-tongued insult laced with enchantments that distracts and unnerves enemy attackers.',
      },
      {
        name: 'Song of Rest',
        type: 'Soothe & Mending',
        description: 'Plays a soothing lullaby during campfire respites, accelerating physical and mental rejuvenation.',
      },
    ],
    quotes: [
      '"History is written by the victors, but it\'s sung by the survivors."',
      '"A well-timed ballad has toppled more crowns than a thousand siege engines."',
      '"Smile! Even tragedy looks better with a crescendo."',
    ],
  },
};

export const TRINKETS = [
  'A tarnished brass compass that points toward the nearest ancient ruin',
  'A sealed glass phial containing captured aurora borealis light',
  'A silver coin engraved with an unfamiliar constellation on both sides',
  'A petrified dragon claw wrapped in braided elven silk',
  'A music box that plays a melancholy tune heard in childhood dreams',
  'A small whetstone that emits violet sparks when striking steel',
  'A miniature obsidian gargoyle that turns to face whoever lies',
  'A pressed blue orchid that never withers or loses its scent',
  'A bone ring carved with runes of forgotten mountain wardens',
  'A hollow ivory die with seven numbered sides instead of six'
];

export const PERSONALITIES = {
  traits: [
    'Always speaks in measured, quiet tones even during chaotic ambushes.',
    'Obsessively polishes weapons and gear around every evening campfire.',
    'Keeps a pocket sketch journal filled with maps, herbs, and architectural ruins.',
    'Flourishes weapons with theatrical bravado before any duel.',
    'Collects odd folk tales and bedtime proverbs from taverns in every frontier town.',
    'Suspicious of anyone who smiles too eagerly or offers unearned gifts.',
    'Has an insatiable appetite for spicy roasted meats and exotic cheeses.',
    'Refuses to sleep in soft beds, preferring the hard ground and night sky.',
  ],
  ideals: [
    'Honor: "A promise given under oath is stronger than dwarven granite."',
    'Freedom: "Chains, whether forged of iron or aristocratic law, must be broken."',
    'Knowledge: "The ancient world holds answers to cures modern kingdoms desperately need."',
    'Loyalty: "My companions are my true family, and I will bleed to see them home."',
    'Balance: "Neither flame nor frost must rule supreme; equilibrium preserves life."',
    'Glory: "To be forgotten is the true death; let our deeds echo across song."',
  ],
  flaws: [
    'Cannot resist wagering gold on absurdly dangerous bets or feats of skill.',
    'Holds bitter grudges for years, remembering every slight in vivid detail.',
    'Easily mesmerized by ancient relics and often touches cursed artifacts first.',
    'Blunt to a fault; incapable of sugarcoating uncomfortable truths.',
    'Secrets weigh heavily on them, leading to sleepless nights and brooding stares.',
    'Overestimates personal endurance and rarely retreats until near collapse.',
  ],
};

export const ALIGNMENTS: Alignment[] = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
  'Chaotic Neutral',
  'Lawful Evil',
  'Neutral Evil',
  'Chaotic Evil'
];
