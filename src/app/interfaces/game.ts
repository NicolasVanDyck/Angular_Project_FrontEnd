import {Platform} from "./platform";

export interface Game {
  id: number;
  name: string;
  publisher: string;
  platformId: number;
  platform?: Platform;
  createdAt: Date;
}
