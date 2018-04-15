import { ErrorHandler, Injectable, Injector, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { MessageModalService } from '@rucken/web';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor(
    private _injector: Injector,
    private _ngZone: NgZone,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
  }
  handleError(error) {
    if (isPlatformBrowser(this._platformId)) {
      this._ngZone.run(() => {
        const message = error.message ? error.message : (error && error.toString ? error.toString() : error);
        const messageModalService = this._injector.get(MessageModalService);
        messageModalService.error({
          error: message
        }).subscribe();
      });
    } else {
      console.log(error);
    }
  }
}
