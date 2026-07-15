// =============================================
// Not Found Component — FarmTrace Admin Portal
// Shown when admin visits an unknown route
// =============================================

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  constructor(private router: Router) {}

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}