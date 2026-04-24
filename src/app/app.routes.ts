import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'modules/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'modules',
    loadComponent: () => import('./modules/modules.page').then(m => m.ModulesPage),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./modules/home/home.page').then(m => m.HomePage)
      },
      {
        path: 'setting',
        loadComponent: () => import('./modules/setting/setting.page').then(m => m.SettingPage)
      }
    ]
  }

];
