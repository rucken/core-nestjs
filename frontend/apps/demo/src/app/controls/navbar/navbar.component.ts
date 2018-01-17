import { Component, Injector } from '@angular/core';
import { AuthModalComponent, ConfirmModalComponent, NavbarComponent } from '@rucken/web';

import { DemoRoutes } from './../../app.routes';

@Component({
  selector: 'demo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  entryComponents: [ConfirmModalComponent, AuthModalComponent]
})
export class DemoNavbarComponent extends NavbarComponent {

  initRoutes() {
    this.childrenRoutes = DemoRoutes;
  }
}
