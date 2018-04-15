import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfilePanelModule } from '@rucken/web';
import { SharedModule } from '../../../../shared/shared.module';
import { ProfileFrameComponent } from './profile-frame.component';
import { ProfileFrameRoutes } from './profile-frame.routes';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    SharedModule,
    NgxPermissionsModule.forChild(),
    ProfilePanelModule,
    RouterModule.forChild(ProfileFrameRoutes),
    FormsModule
  ],
  declarations: [
    ProfileFrameComponent
  ]
})
export class ProfileFrameModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProfileFrameModule,
      providers: []
    };
  }
}
