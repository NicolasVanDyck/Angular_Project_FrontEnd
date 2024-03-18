import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {Game} from "./interfaces/game";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) {}

  // get all content from the API. This uses the API interface because the API returns an object with a $values property that contains the array of content
  getGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(environment.api_url + '/Game');
  }

  getGameById(id: number): Observable<Game> {
    return this.httpClient.get<Game>(environment.api_url + '/Game/' + id);
  }

  postGame(content: Game): Observable<Game> {
    return this.httpClient.post<Game>(
      environment.api_url + '/Game',
      content,
    );
  }

  putGame(id: number, category: Game): Observable<Game> {
    return this.httpClient.put<Game>(
      environment.api_url + '/Game/' + id,
      category,
    );
  }

  deleteGame(id: number): Observable<Game> {
    return this.httpClient.delete<Game>(
      environment.api_url + '/Game/' + id,
    );
  }
}
