import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CallService } from '../call/call-service';
import { StorageService } from '../storage/storage-service';
import { App } from '../app/app';
import { User } from '../../models/user';
import { ThemeService } from '../theme/theme';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  public callService = inject(CallService);
  public storageService = inject(StorageService);
  public appService = inject(App);
  public readonly themeService = inject(ThemeService);

  public readonly token = signal<string | null>(this.storageService.getToken());
  public readonly userId = signal<string | null>(this.storageService.getUserId());
  public readonly refreshToken = signal<string | null>(this.storageService.getRefreshToken());
  public readonly user = signal<User | null>(this.storageService.getUser());

  getcurrentLocation() {
    return this.appService.getCurrentLocation();
  }

  getUsersData(companyId: string) {
    return this.callService.get<any>(`/api/Hr/users?companyId=${companyId}`);
  }


}

