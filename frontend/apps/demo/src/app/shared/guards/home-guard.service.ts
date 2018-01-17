import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService, AppService, User } from '@rucken/core';

import { AuthGuardService } from '@rucken/web';

@Injectable()
export class DemoHomeGuardService extends AuthGuardService {
  firstHomeActivated = true;
  accessToReadAdminPage: boolean;
  accessToReadAccountPage: boolean;

  constructor(
    protected accountService: AccountService,
    protected router: Router,
    protected app: AppService,
    protected translateService: TranslateService
  ) {
    super(accountService, router, app, translateService);
    this.accountService.account$.subscribe((account: User) => this.initAccesses());
  }
  initAccesses() {
    this.accessToReadAdminPage = this.accountService.checkPermissions(['read_admin-page']);
    this.accessToReadAccountPage = this.accountService.checkPermissions(['read_account-page']);
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.accessToReadAccountPage === undefined) {
      this.initAccesses();
    }
    if (this.accountService.account && route.data.name && route.data.name === 'home' && this.firstHomeActivated) {
      /* todo: uncomment this, if you want redirect from home page to specific user page, detected with permission
      let founded = false;
      if (!founded && this.accessToReadAdminPage) {
        founded = true;
        this.router.navigate(['/admin']);
      }
      if (!founded && this.accessToReadAccountPage) {
        founded = true;
        this.router.navigate(['/account']);
      }
      if (!founded) {
        this.app.component.showErrorModal(
          this.translateService.instant('Not access')
        );
        return false;
      } else {
        this.firstHomeActivated = false;
      }*/
    }
    return true;
  }
}
