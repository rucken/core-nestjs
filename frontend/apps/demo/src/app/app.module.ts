import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { BrowserCookiesModule } from '@ngx-utils/cookies/browser';
import { AccountConfig, AccountModule, AccountService, ContentTypesConfig, ErrorsExtractor, GroupsConfig, LangModule, PermissionsConfig, RuckenCoreRuI18n, TokenInterceptor, TokenModule, TokenService, UsersConfig, accountServiceInitializeApp, tokenServiceInitializeApp, translate, TransferHttpCacheModule } from '@rucken/core';
import { AuthModalModule, NavbarModule, RuckenWebRuI18n, ThemesModule, ThemesService, themesServiceInitializeApp } from '@rucken/web';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { enGbLocale, ruLocale } from 'ngx-bootstrap/locale';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from '.';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { DemoRuI18n } from './i18n/ru.i18n';
import { CustomErrorHandler } from './shared/exceptions/error.handler';
import { environment } from '../environments/environment';

defineLocale('ru', ruLocale);
defineLocale('en', enGbLocale);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'demo' }),
    TransferHttpCacheModule.forRoot(),
    BrowserCookiesModule.forRoot(),
    LangModule.forRoot({
      languages: [{
        title: translate('Russian'),
        code: 'ru',
        translations: [RuckenWebRuI18n, RuckenCoreRuI18n, DemoRuI18n]
      }, {
        title: translate('English'),
        code: 'en',
        translations: []
      }]
    }),
    NgxPermissionsModule.forRoot(),
    TokenModule.forRoot({
      withoutTokenUrls: [
        '/api/account/info',
        '/api/account/login',
        ...(environment.type === 'mockapi' ? ['/'] : [])
      ]
    }),
    AccountModule.forRoot(),
    ThemesModule.forRoot(),
    RouterModule.forRoot(AppRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' }),
    ModalModule.forRoot(),
    AuthModalModule,
    NavbarModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    ErrorsExtractor,
    AccountConfig,
    GroupsConfig,
    PermissionsConfig,
    ContentTypesConfig,
    UsersConfig,
    BsLocaleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
