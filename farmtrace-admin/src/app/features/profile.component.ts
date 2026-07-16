// =============================================
// Profile Component — FarmTrace Admin Portal
// Shows admin profile details
// =============================================

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  // Admin profile details
  // Will come from real JWT token when backend is connected
  admin = {
    name: 'System Administrator',
    email: 'admin@farmtrace.co',
    role: 'Super Administrator',
    lastLogin: new Date().toISOString(),
    joinedAt: '2024-11-01'
  };

  constructor(public router: Router) {}

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  goToChangePassword(): void {
    this.router.navigate(['/change-password']);
  }
}