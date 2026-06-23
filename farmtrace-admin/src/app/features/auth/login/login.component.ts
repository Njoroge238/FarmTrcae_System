// =============================================
// Login Component — FarmTrace Admin Portal
// Handles the login form, validates input and
// sends credentials to AuthService which talks
// to the Spring Boot backend.
// =============================================

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // The login form with email and password fields
  loginForm: FormGroup;

  // Controls the loading spinner while waiting for Spring Boot
  isLoading = false;

  // Holds any error message to show the admin
  errorMessage = '';

  // Controls whether the password is visible or hidden
  hidePassword = true;

  // Current year for the footer copyright
  currentYear = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Build the form with validation rules
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // -----------------------------------------------
  // Called when the admin clicks the Login button
  // -----------------------------------------------
  onLogin(): void {
    // Don't proceed if the form has errors
    if (this.loginForm.invalid) return;

    // Show the spinner and clear any old error
    this.isLoading = true;
    this.errorMessage = '';

    // Send credentials to Spring Boot via AuthService
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        // Login successful — go to the dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        // Login failed — show a friendly error message
        this.isLoading = false;
        this.errorMessage = err.status === 401
          ? 'Invalid email or password. Please try again.'
          : 'Something went wrong. Please try again later.';
      }
    });
  }
}