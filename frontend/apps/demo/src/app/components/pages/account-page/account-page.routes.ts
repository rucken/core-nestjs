import { translate } from '@rucken/core';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AccountPageChildrenRoutes } from './account-page.children-routes';
import { AccountPageComponent } from './account-page.component';
import { environment } from '../../../../environments/environment';

export const AccountPageRoutes = [{
  path: '',
  component: AccountPageComponent,
  data: {
    name: 'account',
    title: translate('Account'),
    permissions: {
      only: 'read_account-page'
    }
  },
  ...(environment.server ? {} : { canActivate: [NgxPermissionsGuard] }),
  children: AccountPageChildrenRoutes
}];
