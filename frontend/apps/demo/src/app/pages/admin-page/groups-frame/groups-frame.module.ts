import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoGroupsFrameRoutes } from './groups-frame.routes';
import { GroupsFrameModule } from '@rucken/web';

@NgModule({
  imports: [
    GroupsFrameModule.forRoot(),
    RouterModule.forChild(DemoGroupsFrameRoutes)
  ]
})
export class DemoGroupsFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupsFrameModule,
      providers: []
    };
  }
}
