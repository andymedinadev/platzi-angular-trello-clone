import { Color } from './color.model';
import { User } from './user.model';

export interface Board {
  id: string;
  title: string;
  backgroundColor: Color;
  members: User[];
}
