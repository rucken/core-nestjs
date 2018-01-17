import { NgModule, ModuleWithProviders } from '@angular/core';
import { DemoNavbarComponent } from './navbar.component';
import { SharedModule } from '@rucken/web';
import { ConfirmModalModule, AuthModalModule } from '@rucken/web';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    ConfirmModalModule.forRoot(),
    AuthModalModule.forRoot(),
    CollapseModule.forRoot(),
    RouterModule
  ],
  declarations: [
    DemoNavbarComponent
  ],
  exports: [
    DemoNavbarComponent
  ],
  entryComponents: [DemoNavbarComponent]
})
export class DemoNavbarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoNavbarModule,
      providers: []
    };
  }
}
