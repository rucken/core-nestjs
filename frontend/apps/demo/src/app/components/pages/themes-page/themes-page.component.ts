import { Component } from '@angular/core';
import { ThemesService } from '@rucken/web';

@Component({
  selector: 'themes-page',
  templateUrl: './themes-page.component.html'
})
export class ThemesPageComponent {

  constructor(
    public themesService: ThemesService
  ) {
  }
}
