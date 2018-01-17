import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import {
  AppService,
  EndpointHelper,
  HttpHelper,
  RepositoryHelper,
  RuckenCoreServices,
  ThemesService,
  TokenService,
} from '@rucken/core';
import { DemoCoreServices } from '@demo/core';
import { DemoWebServices } from '@demo/web';
import {
  AlertModalModule,
  AuthModalModule,
  BaseResourceSelectInputConfig,
  RuckenWebServices,
  SelectInputConfig,
  TableColumnConfig,
  TextInputConfig,
  WebAppService,
  WebThemesService,
  WebTokenService,
} from '@rucken/web';
import { HomeGuardService, SharedModule } from '@rucken/web';
import {
  ComponentLoaderFactory,
  PaginationConfig,
  PopoverConfig,
  PositioningService,
  TabsetConfig,
  TooltipConfig,
  BsLocaleService
} from 'ngx-bootstrap';

import {
  DemoAppComponent,
  DemoRoutes,
  DemoNavbarModule,
  DemoHomeGuardService,
  DemoEndpointHelper,
  DemoHttpHelper,
  DemoServices
} from './index';

@NgModule({
  declarations: [
    DemoAppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
    }),
    SharedModule.forRoot(),
    AlertModalModule.forRoot(),
    DemoNavbarModule.forRoot(),
    RouterModule.forRoot(DemoRoutes, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [
    ComponentLoaderFactory,
    PositioningService,
    TooltipConfig,
    PaginationConfig,
    TabsetConfig,
    PopoverConfig,
    BsLocaleService,
    RuckenCoreServices,
    RuckenWebServices,
    DemoCoreServices,
    DemoWebServices,
    DemoServices,
    BaseResourceSelectInputConfig,
    TextInputConfig,
    SelectInputConfig,
    TableColumnConfig,
    { provide: ThemesService, useClass: WebThemesService },
    { provide: AppService, useClass: WebAppService },
    { provide: TokenService, useClass: WebTokenService },
    { provide: RepositoryHelper, useClass: RepositoryHelper },
    { provide: EndpointHelper, useClass: DemoEndpointHelper },
    { provide: HttpHelper, useClass: DemoHttpHelper },
    { provide: HomeGuardService, useClass: DemoHomeGuardService }
  ],
  bootstrap: [DemoAppComponent]
})
export class DemoAppModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: DemoAppModule };
  }
}
