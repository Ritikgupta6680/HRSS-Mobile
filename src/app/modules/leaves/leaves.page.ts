import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonBadge,
  IonSpinner,
  IonModal
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  addCircleOutline,
  closeOutline,
  refreshOutline,
  alertCircleOutline
} from 'ionicons/icons';
import { DataService } from '../../services/data/data';
import { LeaveItem } from '../../models/user';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.page.html',
  styleUrls: ['./leaves.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonBadge,
    IonSpinner,
    IonModal
  ]
})
export class LeavesPage implements OnInit {
  private readonly dataService = inject(DataService);

  readonly myLeaves = signal<LeaveItem[]>([]);
  readonly loading = signal<boolean>(true);
  readonly submitting = signal<boolean>(false);
  readonly isModalOpen = signal<boolean>(false);

  leaveType = 'Casual';
  fromDate = '';
  toDate = '';
  reason = '';
  formError = signal<string | null>(null);

  constructor() {
    addIcons({
      calendarOutline,
      addCircleOutline,
      closeOutline,
      refreshOutline,
      alertCircleOutline
    });
  }

  ngOnInit() {
    this.loadLeaves();
  }

  async loadLeaves() {
    this.loading.set(true);
    try {
      const list = await firstValueFrom(this.dataService.getMyLeaves());
      this.myLeaves.set(list || []);
    } catch (err) {
      console.error('Failed to load leaves:', err);
    } finally {
      this.loading.set(false);
    }
  }

  openApplyModal() {
    this.leaveType = 'Casual';
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.fromDate = tomorrow.toISOString().substring(0, 10);
    this.toDate = tomorrow.toISOString().substring(0, 10);
    this.reason = '';
    this.formError.set(null);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  async submitLeave() {
    if (!this.fromDate || !this.toDate || !this.reason.trim()) {
      this.formError.set('Please fill out all fields.');
      return;
    }
    this.submitting.set(true);
    this.formError.set(null);
    try {
      await firstValueFrom(
        this.dataService.applyLeave({
          leaveType: this.leaveType,
          fromDate: this.fromDate,
          toDate: this.toDate,
          reason: this.reason.trim()
        })
      );
      this.closeModal();
      await this.loadLeaves();
    } catch (err: any) {
      this.formError.set(err?.error?.message || 'Failed to submit leave.');
    } finally {
      this.submitting.set(false);
    }
  }

  async cancelLeave(id: string) {
    if (!confirm('Are you sure you want to cancel this leave application?')) return;
    try {
      await firstValueFrom(this.dataService.cancelLeave(id));
      await this.loadLeaves();
    } catch (err) {
      console.error('Cancel leave error:', err);
    }
  }

  getStatusBadgeColor(status: string): string {
    switch ((status || '').toLowerCase()) {
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      case 'cancelled': return 'medium';
      case 'pending':
      default: return 'warning';
    }
  }
}
