import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CallService } from '../call/call-service';
import { StorageService } from '../storage/storage-service';
import { App } from '../app/app';
import { User, TodayAttendance, LeaveItem, HolidayItem, AnnouncementItem } from '../../models/user';
import { ThemeService } from '../theme/theme';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public readonly callService = inject(CallService);
  public readonly storageService = inject(StorageService);
  public readonly appService = inject(App);
  public readonly themeService = inject(ThemeService);

  public readonly token = signal<string | null>(this.storageService.getToken());
  public readonly userId = signal<string | null>(this.storageService.getUserId());
  public readonly refreshToken = signal<string | null>(this.storageService.getRefreshToken());
  public readonly user = signal<User | null>(this.storageService.getUser());

  getcurrentLocation() {
    return this.appService.getCurrentLocation();
  }

  // Attendance
  getTodayAttendance(): Observable<any> {
    return this.callService.get<any>('/api/Attandance/today');
  }

  checkIn(location: string = 'Mobile App'): Observable<any> {
    return this.callService.post<any>('/api/Attandance/check-in', { location });
  }

  checkOut(location: string = 'Mobile App'): Observable<any> {
    return this.callService.put<any>('/api/Attandance/check-out', { location });
  }

  getUserAttendanceMonthly(): Observable<any> {
    return this.callService.get<any>('/api/Dashboard/User-attendance-monthly-details');
  }

  // Leaves
  getMyLeaves(): Observable<LeaveItem[]> {
    return this.callService.get<LeaveItem[]>('/api/Attandance/my-leaves');
  }

  applyLeave(request: { leaveType: string; fromDate: string; toDate: string; reason: string }): Observable<any> {
    return this.callService.post<any>('/api/Attandance/apply-leave', request);
  }

  cancelLeave(id: string): Observable<any> {
    return this.callService.put<any>(`/api/Attandance/leave/${id}/cancel`, {});
  }

  // Announcements
  getAnnouncements(companyId: string): Observable<AnnouncementItem[]> {
    return this.callService.get<AnnouncementItem[]>(`/api/Announcement/company/${companyId}`);
  }

  // Holidays
  getHolidays(companyId: string, year?: number): Observable<HolidayItem[]> {
    const url = year ? `/api/Holiday?companyId=${companyId}&year=${year}` : `/api/Holiday?companyId=${companyId}`;
    return this.callService.get<HolidayItem[]>(url);
  }

  getUsersData(companyId: string) {
    return this.callService.get<any>(`/api/Hr/users?companyId=${companyId}`);
  }
}
