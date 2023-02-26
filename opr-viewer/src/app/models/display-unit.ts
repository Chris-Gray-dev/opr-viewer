import { KeywordDisplay } from './keyword';
import { Spell } from './spell';
import { Weapon } from './weapon';

// Clean version of a unit, used for displaying data
export interface DisplayUnit {
  name: string;
  factionName: string;
  quality: number;
  defense: number;
  weapons: Weapon[];
  gameSystem: string;
  specialRules: KeywordDisplay[];
  spells?: Spell[];
  extraRules?: KeywordDisplay[];
}
