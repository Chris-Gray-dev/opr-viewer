import { Keyword } from './keyword';
import { Weapon } from './weapon';

// Clean version of a unit, used for displaying data
export interface DisplayUnit {
  name: string;
  factionName: string;
  quality: number;
  defense: number;
  weapons: Weapon[];
  gameSystem: string;
  specialRules: Keyword[];
}
