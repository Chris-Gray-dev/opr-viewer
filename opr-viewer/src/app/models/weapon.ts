import { Keyword, KeywordDisplay } from './keyword';

export interface Weapon {
  name: string;
  range: number;
  attacks: number;
  armorPen: number;
  special: KeywordDisplay[];
}
