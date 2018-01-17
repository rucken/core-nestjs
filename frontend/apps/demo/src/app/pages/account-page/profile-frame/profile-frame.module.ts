import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoProfileFrameRoutes } from './profile-frame.routes';
import { ProfileFrameModule } from '@rucken/web';

@NgModule({
  imports: [
    ProfileFrameModule.forRoot(),
    RouterModule.forChild(DemoProfileFrameRoutes)
  ]
})
export class DemoProfileFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DemoProfileFrameModule,
      providers: []
    };
  }
}
