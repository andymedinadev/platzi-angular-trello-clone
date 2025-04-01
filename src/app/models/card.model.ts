import { List } from '@models/index';

export interface Card {
  id: string;
  description: string;
  title: string;
  position: number;
  list: List;
}

export interface CreateCardDto {
  title: string;
  position: number;
  description?: string;
  listId: string;
  boardId: string;
}

export interface UpdateCardDto {
  description?: string;
  title?: string;
  position?: number;
  listId?: string | number;
  boardId?: string;
}
