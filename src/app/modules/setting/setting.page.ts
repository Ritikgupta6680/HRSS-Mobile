import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonToggle,
  IonList,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline,
  mailOutline,
  callOutline,
  businessOutline,
  logOutOutline,
  moonOutline,
  globeOutline
} from 'ionicons/icons';
import { DataService } from '../../services/data/data';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonItem,
    IonLabel,
    IonToggle,
    IonList,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    IonBadge,
    FormsModule
  ]
})
export class SettingPage implements OnInit {
  public readonly dataService = inject(DataService);
  private readonly auth = inject(Auth);

  readonly user = this.dataService.user;
  isDark = false;
  selectedLanguage = 'en';

  constructor() {
    addIcons({
      personOutline,
      mailOutline,
      callOutline,
      businessOutline,
      logOutOutline,
      moonOutline,
      globeOutline
    });
  }

  ngOnInit() {
    this.isDark = this.dataService.themeService.getTheme() === 'dark';
    const savedLang = localStorage.getItem('app_language');
    if (savedLang) {
      this.selectedLanguage = savedLang;
    }
  }

  onLanguageChange(event: any) {
    const lang = event.detail.value;
    this.selectedLanguage = lang;
    localStorage.setItem('app_language', lang);
  }

  onToggle() {
    this.dataService.themeService.toggleTheme();
    this.isDark = this.dataService.themeService.getTheme() === 'dark';
  }

  logout() {
    this.auth.logout();
  }
}
