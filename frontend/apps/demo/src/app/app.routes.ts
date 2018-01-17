import { Routes } from '@angular/router';
import { AuthGuardService, HomeGuardService } from '@rucken/web';

import { DemoAccountPageRoutes } from './pages/account-page/account-page.routes';
import { DemoAdminPageRoutes } from './pages/admin-page/admin-page.routes';
import { DemoHomePageRoutes } from './pages/home-page/home-page.routes';
import { DemoThemesPageRoutes } from './pages/themes-page/themes-page.routes';

export const DemoRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: './pages/home-page/home-page.module#DemoHomePageModule',
    data: DemoHomePageRoutes[0].data,
    canActivate: [HomeGuardService]
  },
  {
    path: 'themes',
    loadChildren: './pages/themes-page/themes-page.module#DemoThemesPageModule',
    data: DemoThemesPageRoutes[0].data,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin',
    loadChildren: './pages/admin-page/admin-page.module#DemoAdminPageModule',
    data: DemoAdminPageRoutes[1].data,
    canActivate: [AuthGuardService]
  },
  {
    path: 'account',
    loadChildren: './pages/account-page/account-page.module#DemoAccountPageModule',
    data: DemoAccountPageRoutes[1].data,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
