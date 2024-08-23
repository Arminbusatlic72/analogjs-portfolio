import {
  Component,
  HostBinding,
  effect,
  signal,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeService } from '../../../app/services/dark-mode.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header [ngClass]="{ 'no-animation': noAnimation }">
      <nav
        class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-yellow-500 dark:bg-violet-700 mb-3 transition-colors duration-500"
      >
        <div
          class="container px-4 mx-auto flex flex-wrap items-center justify-between"
        >
          <div
            class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start"
          >
            <a class="logo" href="/">
              <img
                class="logo__image"
                src="/arminImage.jpeg"
                alt="Logo Image"
              />
            </a>
            <button
              class="cursor-pointer text-xl leading-none py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none text-black dark:text-white"
              type="button"
              (click)="toggleNavbar()"
            >
              <svg
                class="w-6 h-6 text-black dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <div
            [ngClass]="{ hidden: !showMenu, flex: showMenu }"
            class="lg:flex lg:flex-grow items-center"
          >
            <ul class="flex flex-col lg:flex-row list-none ml-auto">
              <li class="nav-item">
                <a
                  class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black dark:text-white hover:opacity-75 transition-colors duration-500"
                  href="/"
                  >Home</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black dark:text-white hover:opacity-75 transition-colors duration-500"
                  href="/about"
                  >About</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black dark:text-white hover:opacity-75 transition-colors duration-500"
                  href="/blog"
                  >Blog</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black dark:text-white hover:opacity-75 transition-colors duration-500"
                  href="/portfolio"
                  >Portfolio</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black dark:text-white hover:opacity-75 transition-colors duration-500"
                  href="/contact"
                  >Contact</a
                >
              </li>
              <li class="nav-item">
                <button
                  class="h-8 w-8 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 relative flex items-center justify-center transition-transform"
                  (click)="toggleDarkMode()"
                >
                  <!-- Dark mode SVG -->
                  <svg
                    class="fill-violet-700 absolute transition-all duration-500 ease-out transform"
                    [ngClass]="{
                      'opacity-100 rotate-0 scale-1':
                        darkModeService.darkModeSignal() !== 'dark',
                      'opacity-0 rotate-180 scale-0':
                        darkModeService.darkModeSignal() === 'dark'
                    }"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                    ></path>
                  </svg>

                  <!-- Light mode SVG -->
                  <svg
                    class="fill-yellow-500 absolute transition-all duration-500 ease-out transform"
                    [ngClass]="{
                      'opacity-100 rotate-0 scale-1':
                        darkModeService.darkModeSignal() === 'dark',
                      'opacity-0 -rotate-180 scale-0':
                        darkModeService.darkModeSignal() !== 'dark'
                    }"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [
    `
      .no-animation .material-icons {
        transition: none;
      }

      .logo__image {
        height: 60px;
        width: 60px;
        padding: 6px;
        border-radius: 50%;
        border: 8px solid #eab308;
        transition: transform 0.3s ease, border-color 0.3s ease,
          border-width 0.3s ease, box-shadow 0.3s ease;
      }

      .logo__image:hover {
        transform: scale(1.1); /* Scale up the logo */
        border-color: rgb(255, 223, 0); /* Change border color on hover */
        border-width: 12px; /* Increase border width on hover */
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
      }

      .logo__image:focus {
        outline: 2px solid rgba(249, 215, 47, 0.5);
        outline-offset: 4px;
      }
      .transition-transform {
        transition: transform 0.3s ease;
      }

      .transition-opacity {
        transition: opacity 0.5s ease;
      }

      .transform-gpu {
        transform: translate3d(0, 0, 0);
      }
    `,
  ],
})
export class HeaderComponent {
  darkModeService: DarkModeService = inject(DarkModeService);
  noAnimation = true;
  showMenu = false;
  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }

  toggleDarkMode() {
    this.noAnimation = false;

    this.darkModeService.updateDarkMode();
  }
  ngOnInit() {
    // Mark as not user-initiated to avoid animations on initial load
    setTimeout(() => {
      this.noAnimation = false;
    }, 0);
  }
}
