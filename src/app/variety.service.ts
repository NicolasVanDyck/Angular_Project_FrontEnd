import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {Variety} from "./interfaces/variety";

@Injectable({
  providedIn: 'root'
})
export class VarietyService {

  constructor(private httpClient: HttpClient) {}

  // get all content from the API. This uses the API interface because the API returns an object with a $values property that contains the array of content
  getVarieties(): Observable<Variety[]> {
    return this.httpClient.get<Variety[]>(environment.api_url + '/Variety');
  }

  getVarietyById(id: number): Observable<Variety> {
    return this.httpClient.get<Variety>(environment.api_url + '/Variety/' + id);
  }

  postVariety(content: Variety): Observable<Variety> {
    return this.httpClient.post<Variety>(
      environment.api_url + '/Variety',
      content,
    );
  }

  putVariety(id: number, category: Variety): Observable<Variety> {
    return this.httpClient.put<Variety>(
      environment.api_url + '/Variety/' + id,
      category,
    );
  }

  deleteVariety(id: number): Observable<Variety> {
    return this.httpClient.delete<Variety>(
      environment.api_url + '/Variety/' + id,
    );
  }}
