import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";

import {environment} from "../../environments/environment";

import {AuthResponse, User} from "../interfaces/interfaces";
import {notNull} from "../operators/operators";

const ADMIN_ROLE = 'ADMIN_ROLE';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private _user!: User;
  private headers: HttpHeaders = new HttpHeaders();

  get user() {
    return { ...this._user };
  }

  constructor(private http: HttpClient) {
    AuthService.$token
      .pipe(
        notNull(),
        tap(token => {
          this.headers = new HttpHeaders().set('token', token);
        })
      ).subscribe();
  }

  register(email: string, password: string, name: string, uuid: string) {
    const url = `${this.baseUrl}/signup`;
    const body = { email, password, name, uuid };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        map(resp => resp.token !== ''),
        catchError(err => of(err.error.error))
      );
  }

  login(email: string, password: string) {
    const url  = `${this.baseUrl}/signin`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.token) {
            localStorage.setItem('token', resp.token!);
            localStorage.setItem('user', JSON.stringify(resp.user));
            this._user = {
              name: resp.user!.name,
              email: resp.user?.email!,
              uuid: resp.user?.uuid!,
              role: resp.user?.role!,
            }
          }
        }),
        map(resp => resp.token !== ''),
        catchError(err => of(err.error.error))
      );
  }

  toAdmin() {
    return this.http.post<AuthResponse>(`${this.baseUrl}/turn-admin/${this.uuid}`, {}, { headers: this.headers })
      .pipe(
        tap(resp => {
          if (resp.ok !== false) {
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(resp.user));
            this._user = {
              name: resp.user!.name,
              email: resp.user?.name!,
              uuid: resp.user?.uuid!,
              role: resp.user?.role!,
            };
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.error))
      );
  }

  get isLoggedIn(): Observable<boolean> {
    return of(localStorage.getItem('token') !== null);
  }

  static get $token(): Observable<string | null> {
    const token = localStorage.getItem('token');
    return of(token);
  }

  get name(): string | null {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user ? JSON.parse(localStorage.getItem('user')!).name : null;
  }

  get uuid(): string | null {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user ? JSON.parse(localStorage.getItem('user')!).uuid : null;
  }

  get role(): string | null {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user ? JSON.parse(localStorage.getItem('user')!).role : null;
  }

  logout() {
    localStorage.clear();
  }

  get isAdmin(): Observable<boolean> {
    return of(this.role === ADMIN_ROLE);
  }
}
