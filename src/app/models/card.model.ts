import { List } from '@models/index';

export interface Card {
  id: string;
  description: string;
  title: string;
  position: number;
  list: List;
}

export interface UpdateCardDto {
  description?: string;
  title?: string;
  position?: number;
  listId?: string | number;
  boardId?: string;
}
