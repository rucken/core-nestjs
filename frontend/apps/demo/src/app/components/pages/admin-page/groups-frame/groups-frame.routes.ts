import { translate } from '@rucken/core';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { GroupsFrameComponent } from './groups-frame.component';
import { environment } from '../../../../../environments/environment';

export const GroupsFrameRoutes = [{
  path: '',
  component: GroupsFrameComponent,
  data: {
    name: 'groups',
    title: translate('Groups'),
    permissions: {
      only: 'read_groups-frame'
    }
  },
  ...(environment.server ? {} : { canActivate: [NgxPermissionsGuard] })
}];
