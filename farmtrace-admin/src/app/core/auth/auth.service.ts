import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

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
  providedIn: 'root' // available everywhere in the app
})
export class AuthService {

  // Our Spring Boot backend base URL
  // We'll move this to an environment file later
  private apiUrl = 'http://localhost:8080';

  // The key we use to store the token in the browser
  private tokenKey = 'farmtrace_admin_token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // -----------------------------------------------
  // Send email + password to Spring Boot
  // Save the token we get back
  // -----------------------------------------------
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        // Save the token in the browser's localStorage
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
  // (used by the route guard)
  // -----------------------------------------------
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}