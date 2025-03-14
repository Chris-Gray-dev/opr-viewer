import { KeywordKey } from './keyword';

export interface Unit {
  id: string;
  cost: number;
  name: string;
  size: number;
  quality: number;
  defense: number;
  upgrades: any[];
  equipment: any[];
  specialRules: KeywordKey[];
}
