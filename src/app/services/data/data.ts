import { Injectable } from '@angular/core';
import { App } from '../app/app';
import { ThemeService } from '../theme/theme';
import { Translate } from '../translate/translate';

@Injectable({
  providedIn: 'root',
})
export class Data {

  constructor(private appService: App, public themeService: ThemeService, private translate: Translate) { }

  getcurrentLocation() {
    return this.appService.getCurrentLocation();
  }
}
