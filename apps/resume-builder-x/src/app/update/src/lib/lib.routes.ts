import { Route } from '@angular/router';

export const updateRoutes: Route[] = [
  {
    path: 'update',
    loadChildren: () => import('./update.route.module').then(m => m.UpdateRoutingModule)
  }
];
