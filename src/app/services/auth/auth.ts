import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CallService } from '../call/call-service';
import { StorageService } from '../storage/storage-service';
import { Router } from '@angular/router';
import { DataService } from '../data/data';

export interface LoginCredentials {
  companySlug: string;
  email: string;
  password: string;
}


export interface LoginResponse {
  token: string;
  refreshToken: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly api = inject(CallService);
  private readonly storage = inject(StorageService);
  private readonly router = inject(Router);
  private readonly dataService = inject(DataService);

  // Seeded from storage so a page refresh keeps the user signed in.


  readonly isAuthenticated = computed(() => this.dataService.token() !== null);

  login(request: LoginCredentials): Observable<LoginResponse> {
    return this.api.post<LoginResponse>(
      '/api/Auth/login',
      request,
      { withCredentials: true }
    ).pipe(
      tap(response => this.startSession(response))
    );
  }

  getUser(): any | null {
    return this.api.get<unknown>('/api/Auth/loggedIn-user-details');
  }

  logout(): void {
    this.storage.clear();
    this.dataService.token.set(null);
    this.dataService.userId.set(null);
    this.dataService.refreshToken.set(null);
    this.dataService.user.set(null);
    this.router.navigate(['/login']);
  }

  refreshTokenRequest(): Observable<LoginResponse> {
    return this.api.post<LoginResponse>(
      '/api/Auth/refresh',
      {},
      {
        withCredentials: true
      }
    ).pipe(
      tap((response) => this.startSession(response))
    );
  }

  private startSession(response: LoginResponse): void {
    this.storage.setToken(response.token);
    this.storage.setUserId(response.id);
    this.storage.setRefreshToken(response.refreshToken);
    this.dataService.token.set(response.token);
    this.dataService.userId.set(response.id);
    this.dataService.refreshToken.set(response.refreshToken);
    this.getUser().subscribe({
      next: (user: any) => {
        this.storage.setUser(user);
        this.dataService.user.set(user);
      },
      error: (error: any) => {
        console.error('Error fetching user details:', error);
      }
    });
  }
}
