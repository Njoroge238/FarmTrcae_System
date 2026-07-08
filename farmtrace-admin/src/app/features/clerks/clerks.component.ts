// =============================================
// Clerks Component — FarmTrace Admin Portal
// Full clerks management page. Admin can view,
// search, create and delete clerk accounts.
// Now uses the shared mock data service so
// stats update everywhere when changes are made.
// =============================================

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Angular Material imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MockDataService, Clerk } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-clerks',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './clerks.component.html',
  styleUrl: './clerks.component.scss'
})
export class ClerksComponent implements OnInit {

  // All clerks loaded from the service
  allClerks: Clerk[] = [];

  // Clerks shown in the table after search filter
  filteredClerks: Clerk[] = [];

  // Controls the loading spinner
  isLoading = true;

  // Controls whether the create form panel is visible
  showCreateForm = false;

  // The create clerk form
  createForm: FormGroup;

  // Controls the loading state of the create button
  isCreating = false;

  // Table columns
  columns = ['name', 'email', 'region', 'cooperative', 'status', 'actions'];

  // Available regions for the dropdown
  regions = [
    'Central', 'Eastern', 'Western',
    'Nyanza', 'Rift Valley', 'Nairobi',
    'North Eastern', 'Coast'
  ];

  // Available cooperatives for the dropdown
  cooperatives = [
    'Kiambu Tea SACCO',
    'Meru Coffee Growers',
    'Nakuru Wheat Growers',
    'Kisumu Rice Farmers',
    'Kakamega Sugar Cane SACCO'
  ];

  constructor(
    private mockDataService: MockDataService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    // Build the create clerk form with validation
    this.createForm = this.fb.group({
      fullName:        ['', [Validators.required, Validators.minLength(3)]],
      email:           ['', [Validators.required, Validators.email]],
      region:          ['', Validators.required],
      cooperativeName: ['', Validators.required]
    });
  }

  // -----------------------------------------------
  // Load clerks when the page opens
  // -----------------------------------------------
  ngOnInit(): void {
    this.loadClerks();
  }

  // -----------------------------------------------
  // Fetch all clerks from the shared mock service
  // -----------------------------------------------
  loadClerks(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.mockDataService.getClerks().subscribe(clerks => {
        this.allClerks = clerks;
        this.filteredClerks = clerks;
        this.isLoading = false;
      });
    }, 600);
  }

  // -----------------------------------------------
  // Filter clerks by name as admin types in search
  // -----------------------------------------------
  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredClerks = this.allClerks.filter(clerk =>
      clerk.fullName.toLowerCase().includes(query) ||
      clerk.email.toLowerCase().includes(query) ||
      clerk.region.toLowerCase().includes(query)
    );
  }

  // -----------------------------------------------
  // Show or hide the create clerk form panel
  // -----------------------------------------------
  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    if (!this.showCreateForm) {
      this.createForm.reset();
    }
  }

  // -----------------------------------------------
  // Create a new clerk using the shared service
  // so the stats update everywhere automatically
  // -----------------------------------------------
  onCreateClerk(): void {
    if (this.createForm.invalid) return;

    this.isCreating = true;

    setTimeout(() => {
      const formValue = this.createForm.value;

      // Build a new clerk object from the form
      const newClerk: Clerk = {
        id: 'c-' + Date.now(),
        fullName: formValue.fullName,
        email: formValue.email,
        region: formValue.region,
        cooperativeName: formValue.cooperativeName,
        status: 'ACTIVE',
        createdAt: new Date().toISOString().split('T')[0]
      };

      // Add via shared service — updates stats everywhere
      this.mockDataService.addClerk(newClerk).subscribe(() => {
        this.allClerks = [newClerk, ...this.allClerks];
        this.filteredClerks = [newClerk, ...this.filteredClerks];

        this.isCreating = false;
        this.showCreateForm = false;
        this.createForm.reset();

        this.snackBar.open(
          `Clerk account created for ${newClerk.fullName}`,
          'Close',
          { duration: 4000, panelClass: 'snack-success' }
        );
      });
    }, 800);
  }

  // -----------------------------------------------
  // Delete a clerk using the shared service
  // so the stats update everywhere automatically
  // -----------------------------------------------
  onDeleteClerk(clerk: Clerk): void {
    const confirmed = confirm(
      `Are you sure you want to delete ${clerk.fullName}'s account? This cannot be undone.`
    );

    if (!confirmed) return;

    // Delete via shared service — updates stats everywhere
    this.mockDataService.deleteClerk(clerk.id).subscribe(() => {
      this.allClerks = this.allClerks.filter(c => c.id !== clerk.id);
      this.filteredClerks = this.filteredClerks.filter(
        c => c.id !== clerk.id
      );

      this.snackBar.open(
        `${clerk.fullName}'s account has been deleted`,
        'Close',
        { duration: 4000, panelClass: 'snack-success' }
      );
    });
  }

  // -----------------------------------------------
  // Returns the right CSS class for status pill
  // -----------------------------------------------
  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'ACTIVE':   'status-active',
      'INACTIVE': 'status-inactive'
    };
    return map[status] || 'status-inactive';
  }
}