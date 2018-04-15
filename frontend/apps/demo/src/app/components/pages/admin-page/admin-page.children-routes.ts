import { GroupsFrameRoutes } from './groups-frame/groups-frame.routes';
import { UsersFrameRoutes } from './users-frame/users-frame.routes';

export const AdminPageChildrenRoutes = [
  { path: '', redirectTo: '/admin/users', pathMatch: 'full' },
  {
    path: 'users',
    loadChildren: './users-frame/users-frame.module#UsersFrameModule',
    data: UsersFrameRoutes[0].data
  },
  {
    path: 'groups',
    loadChildren: './groups-frame/groups-frame.module#GroupsFrameModule',
    data: GroupsFrameRoutes[0].data
  }
];
