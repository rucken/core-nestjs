import { translate } from '@rucken/core';
import { ThemesPageComponent } from './themes-page.component';

export const ThemesPageRoutes = [{
  path: '',
  component: ThemesPageComponent,
  data: {
    name: 'themes',
    title: translate('Themes')
  }
}];
