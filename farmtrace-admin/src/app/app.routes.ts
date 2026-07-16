// =============================================
// App Routes — FarmTrace Admin Portal
// =============================================

import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Default — redirect to login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Login — public
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent)
  },

  // 404 page — public and standalone (no shell)
  {
    path: '404',
    loadComponent: () =>
      import('./features/not-found.component')
        .then(m => m.NotFoundComponent)
  },

  // All protected pages inside the shell
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
      // Cooperative detail
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
      },
      // Admin profile
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile.component')
            .then(m => m.ProfileComponent)
      },
      // Change password
      {
        path: 'change-password',
        loadComponent: () =>
          import('./features/change-password.component')
            .then(m => m.ChangePasswordComponent)
      }
    ]
  },

  // Any unknown route — redirect to 404
  {
    path: '**',
    redirectTo: '/404'
  }
];