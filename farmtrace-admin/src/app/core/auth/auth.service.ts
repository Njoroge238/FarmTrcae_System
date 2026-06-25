// =============================================
// AuthService — FarmTrace Admin Portal
// Handles login, logout and token management.
// Talks to Spring Boot backend in production.
// Uses mock data during development when
// the backend is not yet running.
// =============================================

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

// The shape of what we send to Spring Boot on login
export interface LoginRequest {
  email: string;
  password: string;
}

// The shape of what Spring Boot sends back after login
export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Our Spring Boot backend base URL — from environment file
  private apiUrl = environment.apiUrl;

  // The key we use to store the token in the browser
  private tokenKey = 'farmtrace_admin_token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // -----------------------------------------------
  // Send email + password to Spring Boot
  // OR use mock login during development
  // -----------------------------------------------
  login(credentials: LoginRequest): Observable<LoginResponse> {

    // ── Mock login — used when backend is not ready ──
    if (environment.useMockData) {

      // Accept any email/password during development
      // Save a fake token so the guard lets us through
      const fakeToken = 'mock-jwt-token-farmtrace-admin-2025';
      localStorage.setItem(this.tokenKey, fakeToken);

      // Return a fake response that looks like the real one
      return of({ token: fakeToken });
    }

    // ── Real login — used when backend is running ──
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth/login`,
      credentials
    ).pipe(
      tap(response => {
        // Save the real token from Spring Boot
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  // -----------------------------------------------
  // Remove the token and send admin back to login
  // -----------------------------------------------
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  // -----------------------------------------------
  // Get the saved token (used by the interceptor)
  // -----------------------------------------------
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // -----------------------------------------------
  // Check if the admin is currently logged in
  // -----------------------------------------------
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}