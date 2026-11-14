import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  IonContent,
  IonSpinner,
  IonIcon,
  IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sparklesOutline, calendarOutline } from 'ionicons/icons';
import { DataService } from '../../services/data/data';
import { HolidayItem } from '../../models/user';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.page.html',
  styleUrls: ['./holidays.page.scss'],
  standalone: true,
  imports: [CommonModule, DatePipe, IonContent, IonSpinner, IonIcon, IonBadge]
})
export class HolidaysPage implements OnInit {
  private readonly dataService = inject(DataService);

  readonly holidays = signal<HolidayItem[]>([]);
  readonly loading = signal<boolean>(true);

  constructor() {
    addIcons({ sparklesOutline, calendarOutline });
  }

  ngOnInit() {
    this.loadHolidays();
  }

  async loadHolidays() {
    this.loading.set(true);
    try {
      const companyId = this.dataService.user()?.company?.id || (this.dataService.user() as any)?.companyId;
      if (companyId) {
        const list = await firstValueFrom(this.dataService.getHolidays(companyId));
        this.holidays.set(list || []);
      }
    } catch (err) {
      console.error('Holidays load error:', err);
    } finally {
      this.loading.set(false);
    }
  }
}
