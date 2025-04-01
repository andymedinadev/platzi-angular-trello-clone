import { Card, Color, List, User } from './index';

export interface Board {
  id: string;
  title: string;
  backgroundColor: Color;
  members: User[];
  lists: List[];
  cards: Card[];
}
