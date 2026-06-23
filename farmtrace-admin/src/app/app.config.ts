// =============================================
// App Config — FarmTrace Admin Portal
// Registers all global providers including
// the router, HTTP client and JWT interceptor.
// =============================================

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Register all our routes
    provideRouter(routes),

    // Enable animations for Angular Material
    provideAnimationsAsync(),

    // Register the HTTP client with our JWT interceptor
    // This means every HTTP request will automatically
    // have the token attached by the jwtInterceptor
    provideHttpClient(
      withInterceptors([jwtInterceptor])
    )
  ]
};