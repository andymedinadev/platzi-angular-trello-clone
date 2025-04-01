import { List } from '@models/index';

export interface Card {
  id: string;
  description: string;
  title: string;
  position: number;
  list: List;
}
