import { takeUntil } from 'rxjs/operators';

import { Component, ComponentFactoryResolver, Injector, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RuckenCoreRuI18n, translate } from '@rucken/core';
import { DemoCoreRuI18n } from '@demo/core';
import { DemoWebRuI18n } from '@demo/web';
import { AlertModalComponent, BaseAppComponent, RuckenWebRuI18n } from '@rucken/web';
import * as _ from 'lodash';
import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { enGb, ru } from 'ngx-bootstrap/locale';

import { DemoRuI18n } from './i18n/ru.i18n';
import { environment } from '../environments/environment';

defineLocale('ru', ru);
defineLocale('en', enGb);

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  entryComponents: [AlertModalComponent],
  encapsulation: ViewEncapsulation.None
})
export class DemoAppComponent extends BaseAppComponent {

  languages = [{
    code: 'ru',
    title: translate('Russian'),
    dic: _.merge(RuckenCoreRuI18n, RuckenWebRuI18n, DemoCoreRuI18n, DemoWebRuI18n, DemoRuI18n)
  }, {
    code: 'en',
    title: translate('English'),
    dic: null
  }];

  // todo: remove this if permission or role is worked
  fullAccess = !environment.production;

  constructor(
    public injector: Injector,
    public viewContainerRef: ViewContainerRef,
    public resolver: ComponentFactoryResolver,
    public router: Router
  ) {
    super(injector, viewContainerRef, resolver);
  }
}
