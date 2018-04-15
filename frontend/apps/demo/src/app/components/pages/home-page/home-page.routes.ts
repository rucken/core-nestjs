import { HomePageComponent } from './home-page.component';
import { translate } from '@rucken/core';

export const HomePageRoutes = [{
  path: '',
  component: HomePageComponent,
  data: {
    name: 'home',
    title: translate('Home'),
    visible: false
  }
}];
