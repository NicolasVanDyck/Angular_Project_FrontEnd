import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './interfaces/api-response';
import { environment } from 'src/environments/environment';
import {Platform} from "./interfaces/platform";

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  constructor(private httpClient: HttpClient) {}

  // get all content from the API. This uses the API interface because the API returns an object with a $values property that contains the array of content
  getPlatforms(): Observable<Platform[]> {
    return this.httpClient.get<Platform[]>(environment.api_url + '/Platform');
  }

  getPlatformById(id: number): Observable<Platform> {
    return this.httpClient.get<Platform>(environment.api_url + '/Platform/' + id);
  }

  postPlatform(content: Platform): Observable<Platform> {
    return this.httpClient.post<Platform>(
      environment.api_url + '/Platform',
      content,
    );
  }

  putPlatform(id: number, category: Platform): Observable<Platform> {
    return this.httpClient.put<Platform>(
      environment.api_url + '/Platform/' + id,
      category,
    );
  }

  deletePlatform(id: number): Observable<Platform> {
    return this.httpClient.delete<Platform>(
      environment.api_url + '/Platform/' + id,
    );
  }
}
