// =============================================
// Change Password Component — FarmTrace Admin
// Allows admin to change their password.
// Will connect to POST /api/auth/change-password
// when the backend is ready.
// =============================================

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  form: FormGroup;
  isLoading = false;
  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword:     ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
  }

  // -----------------------------------------------
  // Custom validator — new and confirm must match
  // -----------------------------------------------
  passwordsMatch(group: FormGroup): { mismatch: boolean } | null {
    const newPass = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return newPass === confirm ? null : { mismatch: true };
  }

  goBack(): void {
    this.router.navigate(['/profile']);
  }

  // -----------------------------------------------
  // Submit the password change
  // Will call POST /api/auth/change-password
  // when backend is ready
  // -----------------------------------------------
  onSubmit(): void {
    if (this.form.invalid) return;

    this.isLoading = true;

    // Simulate API call — replace with real HTTP call later
    setTimeout(() => {
      this.isLoading = false;
      this.form.reset();
      this.snackBar.open(
        'Password changed successfully!',
        'Close',
        { duration: 4000 }
      );
      this.router.navigate(['/dashboard']);
    }, 1000);
  }
}