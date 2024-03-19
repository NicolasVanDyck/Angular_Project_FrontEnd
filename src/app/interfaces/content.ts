import {Game} from "./game";
import {Variety} from "./variety";

export interface Content {
  id: number;
  body: string;
  score: number;
  gameId: number;
  game?: Game;
  varietyId: number;
  variety?: Variety;
  userName: string;
  createdAt: Date;
  updatedAt?: Date;
}
