// import { effect, Injectable, signal } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import { Inject, PLATFORM_ID } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class DarkModeService {
//   darkModeSignal = signal<string>(this.getInitialDarkMode());

//   updateDarkMode() {
//     this.darkModeSignal.update((value) =>
//       value === 'dark' ? 'light' : 'dark'
//     );
//   }

//   constructor(@Inject(PLATFORM_ID) private platformId: Object) {
//     if (isPlatformBrowser(this.platformId)) {
//       effect(() => {
//         window.localStorage.setItem(
//           'darkModeSignal',
//           JSON.stringify(this.darkModeSignal())
//         );
//       });
//     }
//   }

//   private getInitialDarkMode(): string {
//     if (isPlatformBrowser(this.platformId)) {
//       return JSON.parse(
//         window.localStorage.getItem('darkModeSignal') ?? 'light'
//       );
//     }
//     return 'light';
//   }
// }

// import { effect, Injectable, signal } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import { Inject, PLATFORM_ID } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class DarkModeService {
//   darkModeSignal = signal<string>(
//     JSON.parse(window.localStorage.getItem('darModeSignal') ?? 'null')
//   );

//   updateDarkMode() {
//     this.darkModeSignal.update((value) => (value === 'dark' ? 'null' : 'dark'));
//   }

//   constructor(@Inject(PLATFORM_ID) private platformId: Object) {
//     if (isPlatformBrowser(this.platformId)) {
//       effect(() => {
//         window.localStorage.setItem(
//           'darkModeSignal',
//           JSON.stringify(this.darkModeSignal())
//         );
//       });
//     }
//   }

//   private getInitialDarkMode(): string {
//     if (isPlatformBrowser(this.platformId)) {
//       const storedMode = window.localStorage.getItem('darkModeSignal');
//       return storedMode === 'dark' || storedMode === 'light'
//         ? storedMode
//         : 'light';
//     }
//     return 'light';
//   }
// }

import { effect, Injectable, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  darkModeSignal = signal<string>(this.getInitialDarkMode());

  updateDarkMode() {
    this.darkModeSignal.update((value) =>
      value === 'dark' ? 'light' : 'dark'
    );
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        window.localStorage.setItem(
          'darkModeSignal',
          JSON.stringify(this.darkModeSignal())
        );
      });
    }
  }

  private getInitialDarkMode(): string {
    if (isPlatformBrowser(this.platformId)) {
      const storedMode: string | null =
        window.localStorage.getItem('darkModeSignal');
      if (storedMode) {
        try {
          const parsedMode = JSON.parse(storedMode);
          return parsedMode === 'dark' ? 'dark' : 'light';
        } catch (e) {
          return 'light';
        }
      } else {
        return 'light';
      }
    }
    return 'light';
  }
}
