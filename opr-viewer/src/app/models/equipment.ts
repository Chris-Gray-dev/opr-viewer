import { KeywordKey } from './keyword';

export interface Equipment {
  name: string;
  attacks: number;
  range: number;
  specialRules: KeywordKey[];
}
