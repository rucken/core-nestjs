import { translate } from '@rucken/core';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ProfileFrameComponent } from './profile-frame.component';
import { environment } from '../../../../../environments/environment';

export const ProfileFrameRoutes = [{
  path: '',
  component: ProfileFrameComponent,
  data: {
    name: 'profile',
    title: translate('Profile'),
    permissions: {
      only: 'read_profile-frame'
    }
  },
  ...(environment.server ? {} : { canActivate: [NgxPermissionsGuard] })
}];
