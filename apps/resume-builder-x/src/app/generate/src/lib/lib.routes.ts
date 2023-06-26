import { Route } from '@angular/router';

export const generateRoutes: Route[] = [
    {
        path: 'generate',
        loadChildren: () =>
            import('./generate.route.module').then(
                (m) => m.GenerateRoutingModule
            ),
    },
];
