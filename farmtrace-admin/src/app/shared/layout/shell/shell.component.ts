// =============================================
// Shell Component — FarmTrace Admin Portal
// The main layout wrapper for all protected
// pages after login. Contains the navbar,
// the page content area and the right panel.
// =============================================

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Our layout components
import { NavbarComponent } from '../navbar/navbar.component';
import { RightPanelComponent } from '../right-panel/right-panel.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    RightPanelComponent
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  // Shell is purely a layout wrapper —
  // all logic lives in individual pages.
}