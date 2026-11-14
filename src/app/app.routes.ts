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
        path: 'leaves',
        loadComponent: () => import('./modules/leaves/leaves.page').then(m => m.LeavesPage)
      },
      {
        path: 'announcements',
        loadComponent: () => import('./modules/announcements/announcements.page').then(m => m.AnnouncementsPage)
      },
      {
        path: 'holidays',
        loadComponent: () => import('./modules/holidays/holidays.page').then(m => m.HolidaysPage)
      },
      {
        path: 'setting',
        loadComponent: () => import('./modules/setting/setting.page').then(m => m.SettingPage)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
