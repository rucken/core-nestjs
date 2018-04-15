import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'users-frame',
  templateUrl: './users-frame.component.html'
})
export class UsersFrameComponent {

  apiUrl = environment.apiUrl;

  constructor(
    public activatedRoute: ActivatedRoute
  ) {
  }
}
