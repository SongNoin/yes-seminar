export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  path: string;
  category: GameCategory;
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export type GameCategory = 'puzzle' | 'arcade' | 'strategy' | 'action' | 'card';

export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  cardBg: string;
} 