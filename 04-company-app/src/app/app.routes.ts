import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/admin/layouts/admin-layout/admin-layout'),
    children: [
      {
        path: '',
        loadComponent: () => import('./modules/admin/pages/summary/summary')
      },
      {
        path: 'projects',
        loadComponent: () => import('./modules/admin/pages/projects/projects')
      },

    ]
  },

  {
    path: '*',
    redirectTo: ''
  }
];
