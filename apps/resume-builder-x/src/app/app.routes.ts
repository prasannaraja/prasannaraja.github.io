import { Route } from '@angular/router';
import { AlphaComponent } from './generate/src';

export const appRoutes: Route[] = [
    { path: '', redirectTo: '/generate', pathMatch: 'full' },
    { path: '**', component: AlphaComponent },
];