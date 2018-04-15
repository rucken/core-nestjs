import { translate } from '@rucken/core';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { UsersFrameComponent } from './users-frame.component';
import { environment } from '../../../../../environments/environment';

export const UsersFrameRoutes = [{
  path: '',
  component: UsersFrameComponent,
  data: {
    name: 'users',
    title: translate('Users'),
    permissions: {
      only: 'read_users-frame'
    }
  },
  ...(environment.server ? {} : { canActivate: [NgxPermissionsGuard] })
}];
