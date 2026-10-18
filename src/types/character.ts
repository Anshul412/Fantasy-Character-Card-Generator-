export type CharacterClass =
  | 'Warrior'
  | 'Mage'
  | 'Rogue'
  | 'Ranger'
  | 'Paladin'
  | 'Cleric'
  | 'Druid'
  | 'Warlock'
  | 'Bard';

export type CharacterRace =
  | 'Human'
  | 'High Elf'
  | 'Wood Elf'
  | 'Mountain Dwarf'
  | 'Tiefling'
  | 'Dragonborn'
  | 'Half-Orc'
  | 'Halfling'
  | 'Aasimar';

export type Alignment =
  | 'Lawful Good'
  | 'Neutral Good'
  | 'Chaotic Good'
  | 'Lawful Neutral'
  | 'True Neutral'
  | 'Chaotic Neutral'
  | 'Lawful Evil'
  | 'Neutral Evil'
  | 'Chaotic Evil';

export interface AttributeScore {
  score: number;
  modifier: number;
}

export interface CharacterAttributes {
  strength: AttributeScore;
  dexterity: AttributeScore;
  constitution: AttributeScore;
  intelligence: AttributeScore;
  wisdom: AttributeScore;
  charisma: AttributeScore;
}

export interface SignatureAbility {
  name: string;
  type: string;
  description: string;
}

export interface GearLoadout {
  mainHand: string;
  offHand?: string;
  armor: string;
  trinket: string;
}

export interface Personality {
  trait: string;
  ideal: string;
  flaw: string;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  race: CharacterRace;
  characterClass: CharacterClass;
  subclass: string;
  level: number;
  alignment: Alignment;
  portraitUrl: string;
  cartoonPortraitUrl?: string;
  activePortraitType?: 'classic' | 'cartoon';
  accentColor: string;
  attributes: CharacterAttributes;
  health: number;
  mana: number;
  strength: number;
  maxHp: number;
  armorClass: number;
  speed: number;
  initiative: number;
  signatureAbility: SignatureAbility;
  gear: GearLoadout;
  personality: Personality;
  backstory: string;
  quote: string;
  createdAt: number;
  isFavorite?: boolean;
}

export interface GeneratorLocks {
  characterClass: boolean;
  race: boolean;
  name: boolean;
}
