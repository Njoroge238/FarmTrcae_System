// =============================================
// Navbar Component — FarmTrace Admin Portal
// The dark top navigation bar that appears on
// every page after the admin logs in.
// Handles navigation links and logout.
// =============================================

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

// Angular Material imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private authService: AuthService) {}

  // -----------------------------------------------
  // Called when the admin clicks logout
  // Clears the token and goes back to login page
  // -----------------------------------------------
  onLogout(): void {
    this.authService.logout();
  }
}