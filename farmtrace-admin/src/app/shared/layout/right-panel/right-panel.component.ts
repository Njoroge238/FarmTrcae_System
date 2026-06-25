// =============================================
// Right Panel Component — FarmTrace Admin Portal
// Now connected to MockDataService so the
// system overview stats match the dashboard.
// =============================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Angular Material imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { AuthService } from '../../../core/auth/auth.service';
import { MockDataService, DashboardSummary } from '../.././../core/services/mock-data.service';

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
export class RightPanelComponent implements OnInit {

  // Holds the system summary data
  summary: DashboardSummary = {
    totalClerks: 0,
    totalCooperatives: 0,
    approvedFarmers: 0,
    pendingFarmers: 0,
    rejectedFarmers: 0,
    unverifiedFarmers: 0
  };

  // Quick action buttons
  quickActions = [
    { label: 'Create clerk',    icon: 'person_add',   route: '/clerks' },
    { label: 'Add cooperative', icon: 'add_business', route: '/cooperatives' },
    { label: 'Export report',   icon: 'file_download', route: '/reports' }
  ];

  constructor(
    private authService: AuthService,
    private mockDataService: MockDataService,
    private router: Router
  ) {}

  // -----------------------------------------------
  // Load system summary when panel loads
  // -----------------------------------------------
  ngOnInit(): void {
    this.mockDataService.getDashboardSummary().subscribe(data => {
      this.summary = data;
    });
  }

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