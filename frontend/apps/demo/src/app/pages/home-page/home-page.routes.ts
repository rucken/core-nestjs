import { translate } from '@rucken/core';
import { DemoHomeGuardService } from '../../shared/guards/home-guard.service';

import { DemoHomePageComponent } from './home-page.component';

export const DemoHomePageRoutes = [{
  path: '',
  pathMatch: 'full',
  component: DemoHomePageComponent,
  data: {
    name: 'home',
    title: translate('Home'),
    visible: true
  },
  canActivate: [DemoHomeGuardService]
}];
