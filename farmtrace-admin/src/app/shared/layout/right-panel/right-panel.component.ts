// =============================================
// Right Panel Component — FarmTrace Admin Portal
// The white stats panel on the right side of
// every page after login. Shows system overview
// stats, quick actions and sign out button.
// =============================================

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Angular Material imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { AuthService } from '../../../core/auth/auth.service';

// The shape of each stat shown in the overview
interface SystemStat {
  label: string;
  icon: string;
  value: number;
  colorClass: string; // controls the color of the value
}

// The shape of each quick action button
interface QuickAction {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.scss'
})
export class RightPanelComponent {

  // System overview stats shown in the panel
  // These will be replaced with real API data in the dashboard step
  systemStats: SystemStat[] = [
    { label: 'Clerks',            icon: 'badge',       value: 0,  colorClass: 'green' },
    { label: 'Cooperatives',      icon: 'store',       value: 0,  colorClass: 'green' },
    { label: 'Approved farmers',  icon: 'agriculture', value: 0,  colorClass: 'green' },
    { label: 'Pending farmers',   icon: 'schedule',    value: 0,  colorClass: 'amber' },
    { label: 'Rejected farmers',  icon: 'person_off',  value: 0,  colorClass: 'default' }
  ];

  // Quick action buttons
  quickActions: QuickAction[] = [
    { label: 'Create clerk',      icon: 'person_add',  route: '/clerks' },
    { label: 'Add cooperative',   icon: 'add_business', route: '/cooperatives' },
    { label: 'Export report',     icon: 'file_download', route: '/reports' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // -----------------------------------------------
  // Navigate to a page when quick action is clicked
  // -----------------------------------------------
  onQuickAction(route: string): void {
    this.router.navigate([route]);
  }

  // -----------------------------------------------
  // Sign out the admin and go back to login
  // -----------------------------------------------
  onLogout(): void {
    this.authService.logout();
  }
}