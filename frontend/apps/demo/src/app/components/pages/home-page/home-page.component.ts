import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {

  readme = require('html-loader!markdown-loader!./../../../../../../../README.md')
    .replace('<h1 id="rucken">rucken</h1>', '');

  constructor(
    public activatedRoute: ActivatedRoute
  ) {
  }
}
