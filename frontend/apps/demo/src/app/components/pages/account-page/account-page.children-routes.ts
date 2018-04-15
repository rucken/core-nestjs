import { ProfileFrameRoutes } from './profile-frame/profile-frame.routes';

export const AccountPageChildrenRoutes = [
  { path: '', redirectTo: '/account/profile', pathMatch: 'full' },
  {
    path: 'profile',
    loadChildren: './profile-frame/profile-frame.module#ProfileFrameModule',
    data: ProfileFrameRoutes[0].data
  }
];
