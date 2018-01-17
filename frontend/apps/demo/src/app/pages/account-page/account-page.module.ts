import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoAccountPageRoutes } from './account-page.routes';
import { AccountPageModule } from '@rucken/web';

@NgModule({
  imports: [
    AccountPageModule.forRoot(),
    RouterModule.forChild(DemoAccountPageRoutes)
  ]
})
export class DemoAccountPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoAccountPageModule,
      providers: []
    };
  }
}
