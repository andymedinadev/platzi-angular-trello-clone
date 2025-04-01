import { Color, User } from './index';

export interface Board {
  id: string;
  title: string;
  backgroundColor: Color;
  members: User[];
}
