import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountPageChildrenRoutes } from './account-page.children-routes';

@Component({
  selector: 'account-page',
  templateUrl: './account-page.component.html'
})
export class AccountPageComponent {

  routes = AccountPageChildrenRoutes;

  constructor(
    public activatedRoute: ActivatedRoute
  ) {
  }
}
