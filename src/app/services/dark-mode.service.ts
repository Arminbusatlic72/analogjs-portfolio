// import { effect, Injectable, signal } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import { Inject, PLATFORM_ID } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class DarkModeService {
//   darkModeSignal = signal<string>(this.getInitialDarkMode());

//   constructor(@Inject(PLATFORM_ID) private platformId: Object) {
//     if (isPlatformBrowser(this.platformId)) {
//       effect(() => {
//         const isDarkMode = this.darkModeSignal() === 'dark';

//         window.localStorage.setItem(
//           'darkModeSignal',
//           JSON.stringify(this.darkModeSignal())
//         );

//         if (isDarkMode) {
//           document.documentElement.classList.add('dark');
//         } else {
//           document.documentElement.classList.remove('dark');
//         }
//       });
//     }
//   }

//   updateDarkMode() {
//     this.darkModeSignal.update((value) =>
//       value === 'dark' ? 'light' : 'dark'
//     );
//   }

//   private getInitialDarkMode(): string {
//     if (isPlatformBrowser(this.platformId)) {
//       const storedMode = window.localStorage.getItem('darkModeSignal');
//       if (storedMode) {
//         try {
//           const parsedMode = JSON.parse(storedMode);
//           return parsedMode === 'dark' || parsedMode === 'light'
//             ? parsedMode
//             : 'light';
//         } catch (e) {
//           window.localStorage.setItem(
//             'darkModeSignal',
//             JSON.stringify('light')
//           );
//           return 'light';
//         }
//       } else {
//         window.localStorage.setItem('darkModeSignal', JSON.stringify('light'));
//         return 'light';
//       }
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const isDarkMode = this.darkModeSignal() === 'dark';

        window.localStorage.setItem(
          'darkModeSignal',
          JSON.stringify(this.darkModeSignal())
        );

        if (isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      });
    }
  }

  updateDarkMode() {
    this.darkModeSignal.update((value) =>
      value === 'dark' ? 'light' : 'dark'
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
            JSON.stringify('light')
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
