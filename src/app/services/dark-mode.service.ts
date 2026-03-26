import { effect, Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  platformId = inject(PLATFORM_ID);
  darkModeSignal = signal<string>(this.getInitialDarkMode());

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const isDarkMode = this.darkModeSignal() === 'dark';

        window.localStorage.setItem(
          'darkModeSignal',
          JSON.stringify(this.darkModeSignal()),
        );

        if (isDarkMode) {
          document.documentElement.classList.remove('light');
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        }
        document.documentElement.dataset['darkModeAnimated'] = 'true';
      });
    }
  }

  updateDarkMode() {
    this.darkModeSignal.update((value) =>
      value === 'dark' ? 'light' : 'dark',
    );
  }

  private getInitialDarkMode(): string {
    if (isPlatformBrowser(this.platformId)) {
      const storedMode = window.localStorage.getItem('darkModeSignal');
      if (storedMode) {
        try {
          const parsedMode = JSON.parse(storedMode);
          return parsedMode === 'dark' || parsedMode === 'light'
            ? parsedMode
            : 'light';
        } catch (e) {
          window.localStorage.setItem(
            'darkModeSignal',
            JSON.stringify('light'),
          );
          return 'light';
        }
      } else {
        window.localStorage.setItem('darkModeSignal', JSON.stringify('light'));
        return 'light';
      }
    }
    return 'light';
  }
}
