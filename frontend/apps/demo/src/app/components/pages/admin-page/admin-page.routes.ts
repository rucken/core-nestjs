import { translate } from '@rucken/core';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AdminPageChildrenRoutes } from './admin-page.children-routes';
import { AdminPageComponent } from './admin-page.component';
import { environment } from '../../../../environments/environment';

export const AdminPageRoutes = [{
  path: '',
  component: AdminPageComponent,
  data: {
    name: 'admin',
    title: translate('Administration'),
    permissions: {
      only: 'read_admin-page'
    }
  },
  ...(environment.server ? {} : { canActivate: [NgxPermissionsGuard] }),
  children: AdminPageChildrenRoutes
}];
