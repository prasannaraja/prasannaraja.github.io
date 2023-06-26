import { Route } from '@angular/router';
import { AlphaComponent } from './alpha/alpha.component';

export const generateRoutes: Route[] = [
  { path: 'alpha', pathMatch: 'full', component: AlphaComponent },
];
