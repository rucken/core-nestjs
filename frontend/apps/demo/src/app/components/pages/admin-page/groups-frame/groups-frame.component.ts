import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'groups-frame',
  templateUrl: './groups-frame.component.html'
})
export class GroupsFrameComponent {

  apiUrl = environment.apiUrl;

  constructor(
    public activatedRoute: ActivatedRoute
  ) {
  }
}
