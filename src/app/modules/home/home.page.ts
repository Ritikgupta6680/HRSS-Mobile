import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonTitle, IonIcon, IonButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { location, refresh } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Data } from 'src/app/services/data/data';

addIcons({
  location,
  refresh
});

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonIcon, IonTitle, IonCardTitle, IonCardContent, IonCardHeader, IonCard, IonContent, FormsModule, IonButton]
})
export class HomePage implements OnInit {

  Date: string = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    weekday: 'long'
  })

  constructor(private dataService: Data) {
    this.getLocaleDirection();
  }

  ngOnInit() {
  }

  async getLocaleDirection() {
    const locationData = await this.dataService.getcurrentLocation();
    console.log('Location Data:', locationData);
  }

}
