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
    // Check if the current environment is a browser (not a server)
    if (isPlatformBrowser(this.platformId)) {
      // Retrieve the stored dark mode preference from localStorage
      const storedMode: string | null =
        window.localStorage.getItem('darkModeSignal');

      // If a stored mode is found
      if (storedMode) {
        try {
          // Attempt to parse the stored mode from JSON format
          const parsedMode = JSON.parse(storedMode);
          console.log(parsedMode);
          // If the parsed mode is 'dark', return 'dark', otherwise return 'light'
          return parsedMode === 'dark' ? 'dark' : 'light';
        } catch (e) {
          // If parsing fails (e.g., due to an error), return 'light' by default
          return 'light';
        }
      } else {
        // If no stored mode is found, return 'light' as the default
        return 'light';
      }
    }

    // If not running in a browser environment, return 'dark' by default
    // return 'dark';
  }
}
