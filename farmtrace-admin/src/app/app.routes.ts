// =============================================
// App Routes — FarmTrace Admin Portal
// Defines all the pages and who can access them.
// All protected pages load inside the shell
// which gives them the navbar and right panel.
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

  // Login page — publicly accessible
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent)
  },

  // All protected pages load inside the shell
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./shared/layout/shell/shell.component')
        .then(m => m.ShellComponent),
    children: [

      // Dashboard
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },

      // Clerks
      {
        path: 'clerks',
        loadComponent: () =>
          import('./features/clerks/clerks.component')
            .then(m => m.ClerksComponent)
      },

      // Cooperatives list
      {
        path: 'cooperatives',
        loadComponent: () =>
          import('./features/cooperatives/cooperatives.component')
            .then(m => m.CooperativesComponent)
      },

      // Cooperative detail page — shows clerks and farmers
      {
        path: 'cooperatives/:id',
        loadComponent: () =>
          import('./features/cooperatives/cooperative-detail.component')
            .then(m => m.CooperativeDetailComponent)
      },

      // Farmers
      {
        path: 'farmers',
        loadComponent: () =>
          import('./features/farmers/farmers.component')
            .then(m => m.FarmersComponent)
      },

      // Reports
      {
        path: 'reports',
        loadComponent: () =>
          import('./features/reports/reports.component')
            .then(m => m.ReportsComponent)
      },

      // Audit log
      {
        path: 'audit-log',
        loadComponent: () =>
          import('./features/audit-log/audit-log.component')
            .then(m => m.AuditLogComponent)
      }
    ]
  },

  // Catch any unknown routes — redirect to login
  {
    path: '**',
    redirectTo: 'login'
  }
];