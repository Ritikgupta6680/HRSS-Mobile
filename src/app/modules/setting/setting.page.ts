import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonToggle, IonList, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { ThemeService } from '../../services/theme/theme';
import { Data } from 'src/app/services/data/data';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonToggle, IonList, IonSelect, IonSelectOption, FormsModule]
})
export class SettingPage implements OnInit {

  isDark = false;
  selectedLanguage = 'en';

  constructor(private data: Data) { }

  ngOnInit() {
    this.isDark = this.data.themeService.getTheme() === 'dark';
    const savedLang = localStorage.getItem('app_language');
    if (savedLang) {
      this.selectedLanguage = savedLang;
    }
  }

  onLanguageChange(event: any) {
    const lang = event.detail.value;
    this.selectedLanguage = lang;
    localStorage.setItem('app_language', lang);

    console.log('Language changed to:', lang);
  }

  onToggle() {
    this.data.themeService.toggleTheme();
    this.isDark = this.data.themeService.getTheme() === 'dark';
  }

}
