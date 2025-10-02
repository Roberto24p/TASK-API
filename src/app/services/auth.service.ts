import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { AuthPayload, AuthResponse } from '../models/Auth';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = environment.urlBase+'api';

  private _isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this._isAuthenticated.asObservable();

  private http = inject(HttpClient);


  private hasToken(): boolean {
    return !!localStorage.getItem('jwt_token');
  }


  private setToken(token: string): void {
    localStorage.setItem('jwt_token', token);
    this._isAuthenticated.next(true);
  }


  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }


  login(payload: AuthPayload): Observable<AuthResponse> {
    const url = `${this.baseUrl}/login_check`;

    const loginPayload = { email: payload.email, password: payload.password };

    return this.http.post<AuthResponse>(url, loginPayload).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
        }
      })
    );
  }


  register(payload: AuthPayload): Observable<AuthResponse> {
    const url = `${this.baseUrl}/register`;
    return this.http.post<AuthResponse>(url, payload).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this._isAuthenticated.next(false);
  }
}
