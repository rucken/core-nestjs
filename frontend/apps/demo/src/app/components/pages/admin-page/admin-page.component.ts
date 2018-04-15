import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPageChildrenRoutes } from './admin-page.children-routes';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html'
})
export class AdminPageComponent {

  routes = AdminPageChildrenRoutes;

  constructor(
    public activatedRoute: ActivatedRoute
  ) {
  }
}
