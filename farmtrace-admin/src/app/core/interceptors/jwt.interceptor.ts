// =============================================
// JWT Interceptor — FarmTrace Admin Portal
// Automatically attaches the saved token to
// every outgoing HTTP request to Spring Boot.
// Think of it as the access badge attached
// silently to every request we make.
// =============================================

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  // Grab the AuthService to get our saved token
  const authService = inject(AuthService);
  const token = authService.getToken();

  // If we have a token, clone the request and attach it
  // We clone because HTTP requests are immutable in Angular
  if (token) {
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    // Pass the cloned request (with token) forward
    return next(clonedRequest);
  }

  // If no token, just pass the original request as-is
  // (this happens on the login page)
  return next(req);
};