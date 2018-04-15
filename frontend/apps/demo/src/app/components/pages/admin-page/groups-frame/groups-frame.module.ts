import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GroupsGridModule } from '@rucken/web';
import { SharedModule } from '../../../../shared/shared.module';
import { GroupsFrameComponent } from './groups-frame.component';
import { GroupsFrameRoutes } from './groups-frame.routes';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    SharedModule,
    NgxPermissionsModule.forChild(),
    RouterModule.forChild(GroupsFrameRoutes),
    GroupsGridModule,
    FormsModule
  ],
  declarations: [
    GroupsFrameComponent
  ]
})
export class GroupsFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GroupsFrameModule,
      providers: []
    };
  }
}
