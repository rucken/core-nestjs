import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ThemesPageComponent } from './themes-page.component';
import { ThemesPageRoutes } from './themes-page.routes';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ThemesPageRoutes)
  ],
  declarations: [
    ThemesPageComponent
  ]
})
export class ThemesPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ThemesPageModule,
      providers: []
    };
  }
}
