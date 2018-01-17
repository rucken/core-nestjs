import { Routes } from '@angular/router';
import { translate } from '@rucken/core';
import { AdminPageComponent, AuthGuardService } from '@rucken/web';

import { DemoGroupsFrameRoutes } from './groups-frame/groups-frame.routes';
import { DemoUsersFrameRoutes } from './users-frame/users-frame.routes';

export const children = [
  {
    path: 'users',
    loadChildren: './users-frame/users-frame.module#DemoUsersFrameModule',
    data: DemoUsersFrameRoutes[0].data,
    canActivate: [AuthGuardService]
  },
  {
    path: 'groups',
    loadChildren: './groups-frame/groups-frame.module#DemoGroupsFrameModule',
    data: DemoGroupsFrameRoutes[0].data,
    canActivate: [AuthGuardService]
  }
];
export const DemoAdminPageRoutes: Routes = [
  { path: '', redirectTo: '/admin/users', pathMatch: 'full' },
  {
    path: '',
    component: AdminPageComponent,
    data: {
      name: 'admin',
      title: translate('Admin'),
      visible: true,
      children: children
    },
    children: children,
    canActivate: [AuthGuardService]
  }
];
