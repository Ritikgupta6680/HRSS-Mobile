import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './auth/guard/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'modules',
    canActivate: [authGuard],
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
