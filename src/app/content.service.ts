import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Content } from './interfaces/content';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private httpClient: HttpClient) {}

  getContents(): Observable<Content[]> {
    return this.httpClient.get<Content[]>(environment.api_url + '/Content');
  }

  getContentById(id: number): Observable<Content> {
    return this.httpClient.get<Content>(environment.api_url + '/Content/' + id);
  }

  postContent(content: Content): Observable<Content> {
    return this.httpClient.post<Content>(
      environment.api_url + '/Content',
      content,
    );
  }

  putContent(id: number, category: Content): Observable<Content> {
    return this.httpClient.put<Content>(
      environment.api_url + '/Content/' + id,
      category,
    );
  }

  deleteContent(id: number): Observable<Content> {
    return this.httpClient.delete<Content>(
      environment.api_url + '/Content/' + id,
    );
  }
}
