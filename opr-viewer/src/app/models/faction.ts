import { Keyword } from './keyword';
import { Spell } from './spell';
import { Unit } from './unit';

export interface Faction {
  specialRules: Keyword[];
  background: string;
  fullname: string;
  name: string;
  spells: Spell[];
  units: Unit[];
  upgradePackages: any[]; // TODO update to upgradePackages type
}
