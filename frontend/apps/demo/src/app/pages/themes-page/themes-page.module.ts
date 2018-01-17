import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemesPageModule } from '@rucken/web';

import { DemoThemesPageRoutes } from './themes-page.routes';

@NgModule({
  imports: [
    ThemesPageModule.forRoot(),
    RouterModule.forChild(DemoThemesPageRoutes)
  ]
})
export class DemoThemesPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoThemesPageModule,
      providers: []
    };
  }
}
