import { Game } from './game';
import { Variety } from './variety';

export interface Content {
  id: number;
  title: string;
  body: string;
  score: number | null;
  gameId: number;
  game?: Game;
  varietyId: number;
  variety?: Variety;
  userName: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
