import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class App {

  constructor(private alertController: ToastController) { }

  async getCurrentLocation() {
    try {
      if (Capacitor.getPlatform() !== 'web') {
        if ((await Geolocation.checkPermissions()).location !== 'granted') {
          await Geolocation.requestPermissions();
        }
      }
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 5000
      });
      return position;
    } catch (error: any) {
      if (error.code === 3) {
        this.presentErrorAlert('Location', 'Location timeout. Please enable GPS or move outdoors.');
      }
      console.error(error);
      return null;
    }
  }

  presentAlert(message: string) {
    this.alertController.create({
      color: 'success',
      header: 'Success',
      message: message,
      position: 'bottom',
      duration: 3000,
    }).then(alert => alert.present());
  }

  presentErrorAlert(header: string, message: string) {
    this.alertController.create({
      color: 'danger',
      header: header + ' Error:',
      message: message,
      position: 'bottom',
      duration: 3000,
    }).then(alert => alert.present());
  }
}
