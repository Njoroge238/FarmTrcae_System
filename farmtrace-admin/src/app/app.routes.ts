// =============================================
// App Routes — FarmTrace Admin Portal
// Defines all the pages and who can access them.
// The auth guard protects all pages except login.
// =============================================

import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Default route — redirect to login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Login page — publicly accessible, no guard needed
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent)
  },

  // Dashboard — protected by auth guard
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },

  // Clerks — protected by auth guard
  {
    path: 'clerks',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/clerks/clerks.component')
        .then(m => m.ClerksComponent)
  },

  // Cooperatives — protected by auth guard
  {
    path: 'cooperatives',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/cooperatives/cooperatives.component')
        .then(m => m.CooperativesComponent)
  },

  // Farmers — protected by auth guard
  {
    path: 'farmers',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/farmers/farmers.component')
        .then(m => m.FarmersComponent)
  },

  // Accounts — protected by auth guard
  {
    path: 'accounts',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/accounts/accounts.component')
        .then(m => m.AccountsComponent)
  },

  // Reports — protected by auth guard
  {
    path: 'reports',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/reports/reports.component')
        .then(m => m.ReportsComponent)
  },

  // Audit log — protected by auth guard
  {
    path: 'audit-log',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/audit-log/audit-log.component')
        .then(m => m.AuditLogComponent)
  },

  // Catch any unknown routes — redirect to login
  {
    path: '**',
    redirectTo: 'login'
  }
];