import { Routes } from '@angular/router';
import { translate } from '@rucken/core';
import { AccountPageComponent, AuthGuardService } from '@rucken/web';
import { DemoProfileFrameRoutes } from './profile-frame/profile-frame.routes';
import { DemoProfileFrameModule } from './profile-frame/profile-frame.module';

export const children = [
  {
    path: 'profile',
    data: DemoProfileFrameRoutes[0].data,
    loadChildren: './profile-frame/profile-frame.module#DemoProfileFrameModule',
    canActivate: [AuthGuardService]
  }
];
export const DemoAccountPageRoutes: Routes = [
  { path: '', redirectTo: '/account/profile', pathMatch: 'full' },
  {
    path: '',
    component: AccountPageComponent,
    data: {
      name: 'account',
      title: translate('Account'),
      visible: true,
      children: children
    },
    children: children,
    canActivate: [AuthGuardService]
  }
];
