import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {environment} from "../../environments/environment";
import {AllNewsResponse, CreateEditNewResponse} from "../interfaces/interfaces";
import {AuthService} from "./auth.service";
import {tap} from "rxjs";
import {notNull} from "../operators/operators";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private baseUrl = environment.baseUrl;
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    AuthService.$token
      .pipe(
        notNull(),
        tap((token => {
          this.headers = new HttpHeaders().set('token', token);
        }))
      ).subscribe();
  }

  allNews() {
    return this.http.get<AllNewsResponse>(`${this.baseUrl}/news`);
  }

  createNew(newsUuid: string, title: string, description: string) {
    const body = { newsUuid, title, description };
    return this.http.post<CreateEditNewResponse>(`${this.baseUrl}/news`, body, { headers: this.headers });
  }

  editNew(uuid: string, title: string, description: string) {
    const body = { title, description };
    return this.http.put<CreateEditNewResponse>(`${this.baseUrl}/news/${uuid}`, body, { headers: this.headers });
  }

  deleteNew(uuid: string) {
    return this.http.delete(`${this.baseUrl}/news/${uuid}`, { headers: this.headers });
  }
}
