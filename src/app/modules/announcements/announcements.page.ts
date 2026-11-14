import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  IonContent,
  IonSpinner,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { megaphoneOutline, timeOutline } from 'ionicons/icons';
import { DataService } from '../../services/data/data';
import { AnnouncementItem } from '../../models/user';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.page.html',
  styleUrls: ['./announcements.page.scss'],
  standalone: true,
  imports: [CommonModule, DatePipe, IonContent, IonSpinner, IonIcon]
})
export class AnnouncementsPage implements OnInit {
  private readonly dataService = inject(DataService);

  readonly announcements = signal<AnnouncementItem[]>([]);
  readonly loading = signal<boolean>(true);

  constructor() {
    addIcons({ megaphoneOutline, timeOutline });
  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.loading.set(true);
    try {
      const companyId = this.dataService.user()?.company?.id || (this.dataService.user() as any)?.companyId;
      if (companyId) {
        const list = await firstValueFrom(this.dataService.getAnnouncements(companyId));
        this.announcements.set(list || []);
      }
    } catch (err) {
      console.error('Announcements load error:', err);
    } finally {
      this.loading.set(false);
    }
  }
}
