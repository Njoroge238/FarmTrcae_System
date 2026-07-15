// =============================================
// Dashboard Component — FarmTrace Admin Portal
// =============================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MockDataService,
  DashboardSummary,
  Clerk,
  Cooperative
} from '../../../core/services/mock-data.service';
import { ExportService } from '../../../core/services/export.service';

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
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  isLoading = true;
  kpiCards: KpiCard[] = [];
  recentClerks: Clerk[] = [];
  recentCooperatives: Cooperative[] = [];
  clerkColumns = ['name', 'email', 'region', 'cooperative', 'status'];
  cooperativeColumns = ['name', 'region', 'farmers', 'clerks'];

  constructor(
    private mockDataService: MockDataService,
    private exportService: ExportService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.mockDataService.getDashboardSummary().subscribe(summary => {
        this.buildKpiCards(summary);
      });
      this.mockDataService.getClerks().subscribe(clerks => {
        this.recentClerks = clerks.slice(0, 5);
      });
      this.mockDataService.getCooperatives().subscribe(cooperatives => {
        this.recentCooperatives = cooperatives.slice(0, 5);
        this.isLoading = false;
      });
    }, 800);
  }

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
  // Export dashboard summary as CSV
  // -----------------------------------------------
  onExport(): void {
    this.exportService.exportDashboardSummary();
    this.snackBar.open(
      'Dashboard summary exported as CSV',
      'Close',
      { duration: 3000 }
    );
  }

  goToClerks(): void {
    this.router.navigate(['/clerks']);
  }

  goToCooperatives(): void {
    this.router.navigate(['/cooperatives']);
  }

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