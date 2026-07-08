// =============================================
// Cooperatives Component — FarmTrace Admin Portal
// Full cooperatives management page. Admin can
// view, search, create and delete cooperatives.
// Now uses the shared mock data service so
// stats update everywhere when changes are made.
// =============================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MockDataService, Cooperative } from '../../core/services/mock-data.service';
import { RegionCountPipe } from '../../shared/pipes/region-count.pipe';

@Component({
  selector: 'app-cooperatives',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    RegionCountPipe
  ],
  templateUrl: './cooperatives.component.html',
  styleUrl: './cooperatives.component.scss'
})
export class CooperativesComponent implements OnInit {

  // All cooperatives loaded from the service
  allCooperatives: Cooperative[] = [];

  // Cooperatives shown after search filter
  filteredCooperatives: Cooperative[] = [];

  // Controls the loading spinner
  isLoading = true;

  // Controls whether the create form is visible
  showCreateForm = false;

  // Controls the loading state of the create button
  isCreating = false;

  // The create cooperative form
  createForm: FormGroup;

  // Summary stats shown at the top
  totalFarmers = 0;
  totalRegions = 0;

  // All unique regions — shown when admin clicks regions stat
  regionsList: string[] = [];

  // Controls whether regions list is visible
  showRegions = false;

  // Available regions for the dropdown
  regions = [
    'Central', 'Eastern', 'Western',
    'Nyanza', 'Rift Valley', 'Nairobi',
    'North Eastern', 'Coast'
  ];

  // Available crop types for the dropdown
  cropTypes = [
    'Tea', 'Coffee', 'Maize', 'Wheat',
    'Rice', 'Sugar Cane', 'Vegetables', 'Fruits'
  ];

  constructor(
    private mockDataService: MockDataService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      name:     ['', [Validators.required, Validators.minLength(3)]],
      region:   ['', Validators.required],
      cropType: ['', Validators.required]
    });
  }

  // -----------------------------------------------
  // Load cooperatives when the page opens
  // -----------------------------------------------
  ngOnInit(): void {
    this.loadCooperatives();
  }

  // -----------------------------------------------
  // Fetch all cooperatives from the shared service
  // -----------------------------------------------
  loadCooperatives(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.mockDataService.getCooperatives().subscribe(cooperatives => {
        this.allCooperatives = cooperatives;
        this.filteredCooperatives = cooperatives;
        this.calculateStats(cooperatives);
        this.isLoading = false;
      });
    }, 600);
  }

  // -----------------------------------------------
  // Calculate summary stats from cooperatives list
  // -----------------------------------------------
  calculateStats(cooperatives: Cooperative[]): void {
    this.totalFarmers = cooperatives.reduce(
      (sum, coop) => sum + coop.farmerCount, 0
    );

    // Get unique regions list
    this.regionsList = [...new Set(
      cooperatives.map(coop => coop.region)
    )].sort();

    this.totalRegions = this.regionsList.length;
  }

  // -----------------------------------------------
  // Toggle showing the regions breakdown list
  // -----------------------------------------------
  toggleRegions(): void {
    this.showRegions = !this.showRegions;
  }

  // -----------------------------------------------
  // Filter cooperatives by name or region
  // -----------------------------------------------
  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCooperatives = this.allCooperatives.filter(coop =>
      coop.name.toLowerCase().includes(query) ||
      coop.region.toLowerCase().includes(query)
    );
  }

  // -----------------------------------------------
  // Show or hide the create cooperative form
  // -----------------------------------------------
  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    if (!this.showCreateForm) {
      this.createForm.reset();
    }
  }

  // -----------------------------------------------
  // Create a new cooperative using the shared service
  // -----------------------------------------------
  onCreateCooperative(): void {
    if (this.createForm.invalid) return;

    this.isCreating = true;

    setTimeout(() => {
      const formValue = this.createForm.value;

      const newCooperative: Cooperative = {
        id: 'co-' + Date.now(),
        name: formValue.name,
        region: formValue.region,
        cropType: formValue.cropType,
        farmerCount: 0,
        clerkCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };

      this.mockDataService.addCooperative(newCooperative).subscribe(() => {
        this.allCooperatives = [newCooperative, ...this.allCooperatives];
        this.filteredCooperatives = [
          newCooperative, ...this.filteredCooperatives
        ];
        this.calculateStats(this.allCooperatives);

        this.isCreating = false;
        this.showCreateForm = false;
        this.createForm.reset();

        this.snackBar.open(
          `${newCooperative.name} has been created successfully`,
          'Close',
          { duration: 4000, panelClass: 'snack-success' }
        );
      });
    }, 800);
  }

  // -----------------------------------------------
  // Delete a cooperative using the shared service
  // -----------------------------------------------
  onDeleteCooperative(cooperative: Cooperative): void {
    const confirmed = confirm(
      `Are you sure you want to delete ${cooperative.name}? This cannot be undone.`
    );

    if (!confirmed) return;

    this.mockDataService.deleteCooperative(cooperative.id).subscribe(() => {
      this.allCooperatives = this.allCooperatives.filter(
        c => c.id !== cooperative.id
      );
      this.filteredCooperatives = this.filteredCooperatives.filter(
        c => c.id !== cooperative.id
      );
      this.calculateStats(this.allCooperatives);

      this.snackBar.open(
        `${cooperative.name} has been deleted`,
        'Close',
        { duration: 4000, panelClass: 'snack-success' }
      );
    });
  }

  // -----------------------------------------------
  // Navigate to cooperative detail page
  // -----------------------------------------------
  onViewDetails(cooperative: Cooperative): void {
    this.router.navigate(['/cooperatives', cooperative.id]);
  }

  // -----------------------------------------------
  // Get the first letter of cooperative name
  // -----------------------------------------------
  getAvatar(name: string): string {
    return name.charAt(0).toUpperCase();
  }

  // -----------------------------------------------
  // Get crop type from cooperative
  // -----------------------------------------------
  getCropType(coop: Cooperative): string {
    return coop.cropType || 'Mixed';
  }
}