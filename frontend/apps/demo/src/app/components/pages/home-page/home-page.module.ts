import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutes } from './home-page.routes';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(HomePageRoutes)
  ],
  declarations: [
    HomePageComponent
  ]
})
export class HomePageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HomePageModule,
      providers: []
    };
  }
}
