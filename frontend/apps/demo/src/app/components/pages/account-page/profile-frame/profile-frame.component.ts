import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'profile-frame',
  templateUrl: './profile-frame.component.html'
})
export class ProfileFrameComponent {

  apiUrl = environment.apiUrl;

  constructor(
    public activatedRoute: ActivatedRoute
  ) {
  }
}
