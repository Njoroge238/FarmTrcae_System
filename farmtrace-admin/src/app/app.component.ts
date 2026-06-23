// =============================================
// App Component — FarmTrace Admin Portal
// The root component — just renders the router
// outlet which loads the correct page based
// on the current route.
// =============================================

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <!-- The router outlet renders whichever
         page matches the current URL -->
    <router-outlet />
  `,
  styles: []
})
export class AppComponent {
  title = 'FarmTrace Admin Portal';
}