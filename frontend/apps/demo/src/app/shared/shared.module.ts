import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule, MessageModalModule } from '@rucken/web';
import { NgxRepositoryModule } from 'ngx-repository';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [
    CommonModule,
    NgxPermissionsModule,
    NgxRepositoryModule.forRoot(),
    MessageModalModule.forRoot(),
    PipesModule,
    TranslateModule.forChild(),
  ],
  exports: [
    CommonModule,
    NgxPermissionsModule,
    NgxRepositoryModule,
    MessageModalModule,
    PipesModule,
    TranslateModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
