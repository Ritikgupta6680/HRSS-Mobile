import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonMenuToggle, IonItem, IonList, IonButtons, IonButton, IonIcon, IonRouterOutlet, IonFooter } from '@ionic/angular/standalone';
import { menu, home, settings, logOut } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterLink, RouterLinkActive } from '@angular/router';

addIcons({
  menu,
  home,
  settings,
  'log-out': logOut
});

@Component({
  selector: 'app-modules',
  templateUrl: './modules.page.html',
  styleUrls: ['./modules.page.scss'],
  standalone: true,
  imports: [IonRouterOutlet, RouterLink, RouterLinkActive, IonIcon, IonButton, IonButtons, IonList, IonItem, IonMenu, IonMenuToggle, IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, IonFooter]
})
export class ModulesPage implements OnInit {

  constructor() {
    addIcons({ home, settings, logOut, menu });
  }

  ngOnInit() {
  }

}
