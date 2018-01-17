import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoUsersFrameRoutes } from './users-frame.routes';
import { UsersFrameModule } from '@rucken/web';

@NgModule({
  imports: [
    UsersFrameModule.forRoot(),
    RouterModule.forChild(DemoUsersFrameRoutes)
  ]
})
export class DemoUsersFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoUsersFrameModule,
      providers: []
    };
  }
}
