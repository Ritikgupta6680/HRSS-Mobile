import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  setLight() {
    document.body.classList.remove('dark');
    localStorage.setItem('ion-theme', 'light');
  }

  setDark() {
    document.body.classList.add('dark');
    localStorage.setItem('ion-theme', 'dark');
  }

  loadTheme() {
    const theme = localStorage.getItem('ion-theme') || 'light';
    document.body.classList.toggle('dark', theme === 'dark');
  }

  getTheme(): 'light' | 'dark' {
    return (localStorage.getItem('ion-theme') as 'light' | 'dark') || 'light';
  }

  toggleTheme() {
    const next = this.getTheme() === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('dark', next === 'dark');
    localStorage.setItem('ion-theme', next);
  }
}
