// =============================================
// Farmers Component — FarmTrace Admin Portal
// Full farmers visibility page. Admin can view
// and filter all farmers across all cooperatives.
// Read only — admin cannot approve or reject.
// That is the clerk's job on the mobile app.
// =============================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

import { MockDataService, Farmer } from '../../core/services/mock-data.service';

// Filter tab type
type FilterStatus = 'ALL' | 'APPROVED' | 'PENDING' | 'REJECTED' | 'UNVERIFIED';

@Component({
  selector: 'app-farmers',
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
  templateUrl: './farmers.component.html',
  styleUrl: './farmers.component.scss'
})
export class FarmersComponent implements OnInit {

  // All farmers loaded from the service
  allFarmers: Farmer[] = [];

  // Farmers shown in the table after filter and search
  filteredFarmers: Farmer[] = [];

  // Currently selected farmer for the detail panel
  selectedFarmer: Farmer | null = null;

  // Controls the loading spinner
  isLoading = true;

  // Currently active filter tab
  activeFilter: FilterStatus = 'ALL';

  // Current search query
  searchQuery = '';

  // Table columns
  columns = ['name', 'email', 'region', 'cooperative', 'crop', 'status'];

  // Filter tabs with counts
  filterTabs: { label: string; value: FilterStatus; count: number }[] = [];

  constructor(private mockDataService: MockDataService) {}

  // -----------------------------------------------
  // Load farmers when the page opens
  // -----------------------------------------------
  ngOnInit(): void {
    this.loadFarmers();
  }

  // -----------------------------------------------
  // Fetch all farmers from the shared service
  // -----------------------------------------------
  loadFarmers(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.mockDataService.getFarmers().subscribe(farmers => {
        this.allFarmers = farmers;
        this.buildFilterTabs(farmers);
        this.applyFilters();
        this.isLoading = false;
      });
    }, 600);
  }

  // -----------------------------------------------
  // Build the filter tabs with live counts
  // -----------------------------------------------
  buildFilterTabs(farmers: Farmer[]): void {
    this.filterTabs = [
      {
        label: 'All',
        value: 'ALL',
        count: farmers.length
      },
      {
        label: 'Approved',
        value: 'APPROVED',
        count: farmers.filter(f => f.status === 'APPROVED').length
      },
      {
        label: 'Pending',
        value: 'PENDING',
        count: farmers.filter(f => f.status === 'PENDING').length
      },
      {
        label: 'Rejected',
        value: 'REJECTED',
        count: farmers.filter(f => f.status === 'REJECTED').length
      },
      {
        label: 'Unverified',
        value: 'UNVERIFIED',
        count: farmers.filter(f => f.status === 'UNVERIFIED').length
      }
    ];
  }

  // -----------------------------------------------
  // Apply both filter and search together
  // -----------------------------------------------
  applyFilters(): void {
    let result = this.allFarmers;

    // Apply status filter
    if (this.activeFilter !== 'ALL') {
      result = result.filter(f => f.status === this.activeFilter);
    }

    // Apply search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(f =>
        f.fullName.toLowerCase().includes(query) ||
        f.email.toLowerCase().includes(query) ||
        f.region.toLowerCase().includes(query) ||
        f.cooperativeName.toLowerCase().includes(query)
      );
    }

    this.filteredFarmers = result;
  }

  // -----------------------------------------------
  // Switch the active filter tab
  // -----------------------------------------------
  setFilter(filter: FilterStatus): void {
    this.activeFilter = filter;
    this.applyFilters();
  }

  // -----------------------------------------------
  // Handle search input
  // -----------------------------------------------
  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  // -----------------------------------------------
  // Select a farmer to view their profile panel
  // -----------------------------------------------
  onSelectFarmer(farmer: Farmer): void {
    // Toggle — clicking same farmer closes the panel
    this.selectedFarmer =
      this.selectedFarmer?.id === farmer.id ? null : farmer;
  }

  // -----------------------------------------------
  // Close the farmer detail panel
  // -----------------------------------------------
  closePanel(): void {
    this.selectedFarmer = null;
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
  // Get CSS class for status pill
  // -----------------------------------------------
  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'APPROVED':   'status-approved',
      'PENDING':    'status-pending',
      'REJECTED':   'status-rejected',
      'UNVERIFIED': 'status-unverified'
    };
    return map[status] || 'status-unverified';
  }
}