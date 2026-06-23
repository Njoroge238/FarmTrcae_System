// =============================================
// Auth Guard — FarmTrace Admin Portal
// Protects all portal pages from being accessed
// without a valid login token.
// If no token is found, the admin is sent back
// to the login page immediately.
// =============================================

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = () => {

  // Grab the services we need
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the admin is logged in
  if (authService.isLoggedIn()) {
    // Yes — allow them through to the page they requested
    return true;
  }

  // No token found — send them back to the login page
  router.navigate(['/login']);
  return false;
};