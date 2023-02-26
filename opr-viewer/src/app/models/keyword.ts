export interface KeywordKey {
  key: string;
  name: string;
  modify: boolean;
  rating: string;
}

export interface Keyword {
  id: number;
  name: string;
  description: string;
  hasRating: boolean;
}

export interface KeywordDisplay {
  name: string;
  description: string;
  hasRating: boolean;
  rating?: number;
}
