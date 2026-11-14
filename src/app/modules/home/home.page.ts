import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonIcon,
  IonButton,
  IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  location,
  refresh,
  logInOutline,
  logOutOutline,
  timeOutline,
  calendarOutline,
  megaphoneOutline,
  sparklesOutline,
  checkmarkCircleOutline,
  alertCircleOutline
} from 'ionicons/icons';
import { DataService } from '../../services/data/data';
import { TodayAttendance, AnnouncementItem, HolidayItem } from '../../models/user';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    FormsModule,
    RouterLink,
    IonContent,
    IonIcon,
    IonButton,
    IonSpinner
  ]
})
export class HomePage implements OnInit {
  public readonly dataService = inject(DataService);

  readonly user = this.dataService.user;
  readonly todayAttendance = signal<TodayAttendance | null>(null);
  readonly announcements = signal<AnnouncementItem[]>([]);
  readonly upcomingHolidays = signal<HolidayItem[]>([]);

  readonly loading = signal<boolean>(true);
  readonly checkingAction = signal<boolean>(false);
  readonly locationString = signal<string>('Detecting location...');

  readonly formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  readonly isClockedIn = computed(() => {
    const att = this.todayAttendance();
    return !!(att && att.checkInTime && !att.checkOutTime);
  });

  constructor() {
    addIcons({
      location,
      refresh,
      logInOutline,
      logOutOutline,
      timeOutline,
      calendarOutline,
      megaphoneOutline,
      sparklesOutline,
      checkmarkCircleOutline,
      alertCircleOutline
    });
  }

  ngOnInit() {
    this.refreshAll();
  }

  async refreshAll() {
    this.loading.set(true);
    await Promise.all([
      this.detectLocation(),
      this.loadTodayAttendance(),
      this.loadAnnouncements(),
      this.loadHolidays()
    ]);
    this.loading.set(false);
  }

  async detectLocation() {
    try {
      const loc = await this.dataService.getcurrentLocation();
      if (loc && loc.coords) {
        this.locationString.set(`Lat: ${loc.coords.latitude.toFixed(3)}, Lon: ${loc.coords.longitude.toFixed(3)}`);
      } else {
        this.locationString.set('Mobile GPS Connected');
      }
    } catch {
      this.locationString.set('Office / Remote Network');
    }
  }

  async loadTodayAttendance() {
    try {
      const res = await firstValueFrom(this.dataService.getTodayAttendance());
      this.todayAttendance.set(res || null);
    } catch (err) {
      console.warn('Today attendance not found or error:', err);
      this.todayAttendance.set(null);
    }
  }

  async loadAnnouncements() {
    try {
      const companyId = this.user()?.company?.id || (this.user() as any)?.companyId;
      if (companyId) {
        const list = await firstValueFrom(this.dataService.getAnnouncements(companyId));
        this.announcements.set((list || []).slice(0, 3));
      }
    } catch (err) {
      console.error('Error loading announcements:', err);
    }
  }

  async loadHolidays() {
    try {
      const companyId = this.user()?.company?.id || (this.user() as any)?.companyId;
      if (companyId) {
        const list = await firstValueFrom(this.dataService.getHolidays(companyId));
        this.upcomingHolidays.set((list || []).slice(0, 3));
      }
    } catch (err) {
      console.error('Error loading holidays:', err);
    }
  }

  async handleAttendanceAction() {
    this.checkingAction.set(true);
    try {
      if (this.isClockedIn()) {
        await firstValueFrom(this.dataService.checkOut(this.locationString()));
      } else {
        await firstValueFrom(this.dataService.checkIn(this.locationString()));
      }
      await this.loadTodayAttendance();
    } catch (err: any) {
      alert(err?.error?.message || 'Attendance action failed. Please try again.');
    } finally {
      this.checkingAction.set(false);
    }
  }
}
