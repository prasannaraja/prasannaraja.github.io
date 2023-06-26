import { Route } from '@angular/router';
import { AlphaComponent } from '@org/resume-builder-x/src/app/generate';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: AlphaComponent },
];
