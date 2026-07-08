// =============================================
// Cooperative Detail Component — FarmTrace Admin
// Shows full details of a single cooperative
// including all assigned clerks and all farmers
// belonging to that cooperative.
// =============================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

// Angular Material imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

import {
  MockDataService,
  Cooperative,
  Clerk,
  Farmer
} from '../../core/services/mock-data.service';

@Component({
  selector: 'app-cooperative-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatChipsModule
  ],
  templateUrl: './cooperative-detail.component.html',
  styleUrl: './cooperative-detail.component.scss'
})
export class CooperativeDetailComponent implements OnInit {

  // The cooperative being viewed
  cooperative: Cooperative | undefined;

  // Clerks assigned to this cooperative
  clerks: Clerk[] = [];

  // Farmers belonging to this cooperative
  farmers: Farmer[] = [];

  // Controls the loading spinner
  isLoading = true;

  // Active tab — clerks or farmers
  activeTab: 'clerks' | 'farmers' = 'clerks';

  // Table columns for clerks
  clerkColumns = ['name', 'email', 'region', 'status'];

  // Table columns for farmers
  farmerColumns = ['name', 'email', 'phone', 'cropType', 'status'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mockDataService: MockDataService
  ) {}

  // -----------------------------------------------
  // Load cooperative details when page opens
  // -----------------------------------------------
  ngOnInit(): void {
    // Get the cooperative ID from the URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDetails(id);
    } else {
      // No ID found — go back to cooperatives list
      this.router.navigate(['/cooperatives']);
    }
  }

  // -----------------------------------------------
  // Load the cooperative, its clerks and farmers
  // -----------------------------------------------
  loadDetails(id: string): void {
    this.isLoading = true;

    setTimeout(() => {
      // Load the cooperative details
      this.mockDataService.getCooperativeById(id).subscribe(coop => {
        if (!coop) {
          // Cooperative not found — go back
          this.router.navigate(['/cooperatives']);
          return;
        }
        this.cooperative = coop;

        // Load clerks assigned to this cooperative
        this.mockDataService.getClerksByCooperative(coop.name)
          .subscribe(clerks => {
            this.clerks = clerks;
          });

        // Load farmers belonging to this cooperative
        this.mockDataService.getFarmersByCooperative(id)
          .subscribe(farmers => {
            this.farmers = farmers;
            this.isLoading = false;
          });
      });
    }, 600);
  }

  // -----------------------------------------------
  // Switch between clerks and farmers tabs
  // -----------------------------------------------
  setTab(tab: 'clerks' | 'farmers'): void {
    this.activeTab = tab;
  }

  // -----------------------------------------------
  // Go back to the cooperatives list
  // -----------------------------------------------
  goBack(): void {
    this.router.navigate(['/cooperatives']);
  }

  // -----------------------------------------------
  // Get initials for avatar
  // -----------------------------------------------
  getAvatar(name: string): string {
    return name.split(' ')
      .map(n => n.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  // -----------------------------------------------
  // Get CSS class for farmer status pill
  // -----------------------------------------------
  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'ACTIVE':      'status-active',
      'APPROVED':    'status-active',
      'PENDING':     'status-pending',
      'REJECTED':    'status-rejected',
      'UNVERIFIED':  'status-unverified',
      'INACTIVE':    'status-inactive'
    };
    return map[status] || 'status-inactive';
  }

  // -----------------------------------------------
  // Count farmers by status
  // -----------------------------------------------
  getFarmerCount(status: string): number {
    return this.farmers.filter(f => f.status === status).length;
  }
}