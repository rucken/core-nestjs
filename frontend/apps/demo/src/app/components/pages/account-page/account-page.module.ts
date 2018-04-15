import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavSidebarModule } from '@rucken/web';
import { SharedModule } from '../../../shared/shared.module';
import { AccountPageComponent } from './account-page.component';
import { AccountPageRoutes } from './account-page.routes';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    SharedModule,
    NgxPermissionsModule.forChild(),
    NavSidebarModule,
    RouterModule.forChild(AccountPageRoutes)
  ],
  declarations: [
    AccountPageComponent
  ]
})
export class AccountPageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AccountPageModule,
      providers: []
    };
  }
}
