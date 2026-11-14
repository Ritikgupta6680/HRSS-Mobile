import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

const TOKEN_KEY = 'hrss-web.token';
const USER_KEY = 'hrss-web.user-basics';
const REFRESH_TOKEN_KEY = 'hrss-web.refresh-token';
const USER_DETAILS_KEY = 'hrss-web.user-details';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private cookieService: CookieService) { }

  getToken(): string | null {
    return this.read(TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return this.read(REFRESH_TOKEN_KEY);
  }

  setToken(token: string): void {
    this.write(TOKEN_KEY, token);
  }

  setRefreshToken(refreshToken: string): void {
    this.write(REFRESH_TOKEN_KEY, refreshToken);
  }

  getUserId<T>(): T | null {
    const raw = this.read(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  getUser<T>(): T | null {
    const raw = this.read(USER_DETAILS_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  setUserId(userId: string): void {
    this.write(USER_KEY, userId);
  }

  setUser(user: unknown): void {
    this.write(USER_DETAILS_KEY, JSON.stringify(user));
  }

  clear(): void {
    this.remove(TOKEN_KEY);
    this.remove(USER_KEY);
    this.remove(USER_DETAILS_KEY);
    this.remove(REFRESH_TOKEN_KEY);
  }

  private read(key: string): string | null {
    try {
      if (this.cookieService.check(key)) {
        const val = this.cookieService.get(key);
        if (val) return val;
      }
    } catch { }

    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
      }
    } catch { }

    return null;
  }

  private write(key: string, value: string): void {
    const isHttps = typeof window !== 'undefined' && window.location.protocol === 'https:';
    try {
      this.cookieService.set(
        key,
        value,
        7,
        '/',
        undefined,
        isHttps,
        'Lax'
      );
    } catch { }

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
      }
    } catch { }
  }

  private remove(key: string): void {
    try {
      this.cookieService.delete(key, '/');
    } catch { }

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key);
      }
    } catch { }
  }
}
