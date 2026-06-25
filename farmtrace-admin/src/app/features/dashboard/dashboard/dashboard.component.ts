// =============================================
// Dashboard Component — FarmTrace Admin Portal
// The first page the admin sees after login.
// Shows KPI cards, recent clerks and
// recent cooperatives using mock data for now.
// View all buttons navigate to full pages.
// =============================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Angular Material imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Our mock data service and models
import {
  MockDataService,
  DashboardSummary,
  Clerk,
  Cooperative
} from '../../../core/services/mock-data.service';

// The shape of each KPI card
interface KpiCard {
  label: string;
  value: number;
  icon: string;
  colorClass: string;
  trend: string;
  trendClass: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  // Controls the loading spinner
  isLoading = true;

  // KPI cards shown at the top of the dashboard
  kpiCards: KpiCard[] = [];

  // Recent clerks shown in the table
  recentClerks: Clerk[] = [];

  // Recent cooperatives shown in the table
  recentCooperatives: Cooperative[] = [];

  // Columns shown in the clerks table
  clerkColumns = ['name', 'email', 'region', 'cooperative', 'status'];

  // Columns shown in the cooperatives table
  cooperativeColumns = ['name', 'region', 'farmers', 'clerks'];

  constructor(
    private mockDataService: MockDataService,
    private router: Router
  ) {}

  // -----------------------------------------------
  // Load all data when the dashboard page opens
  // -----------------------------------------------
  ngOnInit(): void {
    this.loadDashboardData();
  }

  // -----------------------------------------------
  // Fetch dashboard summary stats and tables
  // -----------------------------------------------
  loadDashboardData(): void {
    this.isLoading = true;

    // Load the summary stats for KPI cards
    this.mockDataService.getDashboardSummary().subscribe(summary => {
      this.buildKpiCards(summary);
    });

    // Load recent clerks for the table
    this.mockDataService.getClerks().subscribe(clerks => {
      // Show only the 5 most recent clerks
      this.recentClerks = clerks.slice(0, 5);
    });

    // Load recent cooperatives for the table
    this.mockDataService.getCooperatives().subscribe(cooperatives => {
      // Show only the 5 most recent cooperatives
      this.recentCooperatives = cooperatives.slice(0, 5);
      this.isLoading = false;
    });
  }

  // -----------------------------------------------
  // Build the KPI cards from the summary data
  // -----------------------------------------------
  buildKpiCards(summary: DashboardSummary): void {
    this.kpiCards = [
      {
        label: 'Total Clerks',
        value: summary.totalClerks,
        icon: 'badge',
        colorClass: 'blue',
        trend: '↑ 2 new',
        trendClass: 'up'
      },
      {
        label: 'Cooperatives',
        value: summary.totalCooperatives,
        icon: 'store',
        colorClass: 'green',
        trend: '↑ 1 new',
        trendClass: 'up'
      },
      {
        label: 'Approved Farmers',
        value: summary.approvedFarmers,
        icon: 'agriculture',
        colorClass: 'green',
        trend: '↑ 24 new',
        trendClass: 'up'
      },
      {
        label: 'Pending Approval',
        value: summary.pendingFarmers,
        icon: 'schedule',
        colorClass: 'amber',
        trend: 'Needs attention',
        trendClass: 'warn'
      }
    ];
  }

  // -----------------------------------------------
  // Navigate to the full clerks page
  // -----------------------------------------------
  goToClerks(): void {
    this.router.navigate(['/clerks']);
  }

  // -----------------------------------------------
  // Navigate to the full cooperatives page
  // -----------------------------------------------
  goToCooperatives(): void {
    this.router.navigate(['/cooperatives']);
  }

  // -----------------------------------------------
  // Returns the right CSS class for status pill
  // -----------------------------------------------
  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'ACTIVE':   'status-active',
      'APPROVED': 'status-active',
      'PENDING':  'status-pending',
      'REJECTED': 'status-rejected',
      'INACTIVE': 'status-inactive'
    };
    return map[status] || 'status-inactive';
  }
}