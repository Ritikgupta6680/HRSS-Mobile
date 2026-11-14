import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonButtons,
  IonMenuToggle,
  IonButton,
  IonFooter,
  IonRouterOutlet
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  calendarOutline,
  megaphoneOutline,
  sparklesOutline,
  settingsOutline,
  logOutOutline,
  menuOutline
} from 'ionicons/icons';
import { DataService } from '../services/data/data';
import { Auth } from '../services/auth/auth';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.page.html',
  styleUrls: ['./modules.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonButtons,
    IonMenuToggle,
    IonButton,
    IonFooter,
    IonRouterOutlet
  ]
})
export class ModulesPage {
  public readonly dataService = inject(DataService);
  private readonly auth = inject(Auth);

  readonly user = this.dataService.user;

  constructor() {
    addIcons({
      homeOutline,
      calendarOutline,
      megaphoneOutline,
      sparklesOutline,
      settingsOutline,
      logOutOutline,
      menuOutline
    });
  }

  logout() {
    this.auth.logout();
  }
}
