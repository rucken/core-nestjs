import { Component, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountConfig, AccountService, ErrorsExtractor, LangService, TokenService, User, translate } from '@rucken/core';
import { AuthModalComponent, MessageModalService } from '@rucken/web';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from '../environments/environment';
import { AppRoutes } from './app.routes';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  title = 'Rucken: Demo';

  routes = AppRoutes;

  private _destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public accountService: AccountService,
    public langService: LangService,
    private _errorsExtractor: ErrorsExtractor,
    private _tokenService: TokenService,
    private _translateService: TranslateService,
    private _modalService: BsModalService,
    private _messageModalService: MessageModalService,
    private _bsLocaleService: BsLocaleService,
    private _router: Router,
    private _accountConfig: AccountConfig,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    this.accountService.repository.useRest({
      apiUrl: environment.apiUrl,
      ...this._accountConfig,
      pluralName: environment.type === 'mockapi' ? 'account/1' : 'account'
    });
    if (isPlatformBrowser(this._platformId)) {
      this.langService.current$.pipe(
        takeUntil(this._destroyed$)
      ).subscribe(
        lang => {
          this._bsLocaleService.use(lang);
        }
        );
      this._tokenService.tokenHasExpired$.pipe(
        takeUntil(this._destroyed$)
      ).subscribe(result => {
        if (result === true) {
          this.onInfo();
        }
      });
    }
    this.onInfo();
  }
  ngOnDestroy() {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }
  onInfo() {
    const token = this._tokenService.current;
    if (token) {
      if (
        this._tokenService.tokenHasExpired() &&
        environment.type !== 'mockapi'
      ) {
        this._tokenService.stopCheckTokenHasExpired();
        this._messageModalService.error({
          error: translate('Your session has expired, please re-login'),
          class: 'modal-md',
          onTop: true
        }).subscribe(
          result =>
            this.accountService.logout().subscribe(
              data =>
                this.onLogoutSuccess(undefined)
            )
          );
      } else {
        if (!this.accountService.current) {
          this.accountService.info(token).subscribe(
            data =>
              this.onLoginOrInfoSuccess(undefined, data),
            error => {
              if (this._errorsExtractor.getErrorMessage(error)) {
                this.onError(error);
              }
              this.accountService.logout().subscribe(
                data =>
                  this.onLogoutSuccess(undefined)
              );
            }
          );
        }
      }
    }
  }
  onLogout() {
    const bsModalRef: BsModalRef = this._modalService.show(AuthModalComponent, {
      class: 'modal-md',
      initialState: {
        title: this._translateService.instant('Logout'),
        message: this._translateService.instant('Do you really want to leave?'),
        yesTitle: this._translateService.instant('Yes'),
        noTitle: this._translateService.instant('No')
      }
    });
    bsModalRef.content.yes.subscribe(
      (modal: AuthModalComponent) => {
        modal.processing = true;
        this.accountService.logout().subscribe(
          data =>
            this.onLogoutSuccess(modal)
        );
      });
  }
  onLogin() {
    const bsModalRef: BsModalRef = this._modalService.show(AuthModalComponent, {
      class: 'modal-sm',
      initialState: {
        title: this._translateService.instant('Authorization'),
        yesTitle: this._translateService.instant('Sign in'),
        data: {}
      }
    });
    bsModalRef.content.yes.subscribe(
      (modal: AuthModalComponent) => {
        modal.processing = true;
        this.accountService.login(modal.data.username, modal.data.password).subscribe(
          data =>
            this.onLoginOrInfoSuccess(modal, data),
          error =>
            this.onLoginError(modal, error)
        );
      });
  }
  onLoginOrInfoSuccess(modal: AuthModalComponent, data: { token: string; user: User; }) {
    if (modal) {
      modal.processing = false;
    }
    this._tokenService.current = data.token;
    this.accountService.current = data.user;
    if (modal) {
      modal.hide();
    }
    if (environment.type !== 'mockapi') {
      this._tokenService.startCheckTokenHasExpired();
    }
  }
  onLogoutSuccess(modal: AuthModalComponent) {
    if (modal) {
      modal.processing = false;
    }
    this._tokenService.current = undefined;
    this.accountService.current = undefined;
    this._router.navigate(['home']);
    if (modal) {
      modal.hide();
    }
  }
  onError(error: any) {
    this._messageModalService.error({
      error: error,
      onTop: true
    }).subscribe();
  }
  onLoginError(modal: AuthModalComponent, error: any) {
    if (modal) {
      modal.processing = false;
    }
    modal.form.externalErrors = this._errorsExtractor.getValidationErrors(error);
    if (!modal.form.externalErrors) {
      this.onError(error);
    }
  }
}
