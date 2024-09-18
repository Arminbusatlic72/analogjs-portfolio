import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { CommonModule, IMAGE_CONFIG, NgOptimizedImage } from '@angular/common';
import { DarkModeService } from '../../../app/services/dark-mode.service';
import { SocialIconListComponent } from '../footer/social-icon-list.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, SocialIconListComponent],
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        breakpoints: [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920],
      },
    },
  ],
  template: `
    <header class="bg-white relative z-[1000] dark:bg-gray-800 text-gray-100">
      <div class="media-header">
        <span class="w-px block bg-black h-64 dark:bg-white"></span>

        <div class="flex flex-col space-y-2 items-center">
          <a
            href="https://github.com/Arminbusatlic72"
            target="_blank"
            class="hover:text-blue-700 dark:hover:text-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="github"
              class="text-black w-8 h-8 fill-current transition-colors duration-200 ease-in-out dark:text-gray-100"
            >
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.165c-3.338.725-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.523.116-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.005-.404 1.022.005 2.048.138 3.006.404 2.291-1.552 3.299-1.23 3.299-1.23.653 1.653.241 2.873.118 3.176.77.84 1.236 1.911 1.236 3.221 0 4.61-2.807 5.624-5.479 5.921.43.37.823 1.096.823 2.21v3.284c0 .319.218.694.825.576 4.765-1.588 8.201-6.084 8.201-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/armin-busatlic/"
            target="_blank"
            class="hover:text-blue-700 dark:hover:text-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="linkedin"
              class="text-black w-8 h-8 fill-current transition-colors duration-200 ease-in-out dark:text-gray-100"
            >
              <path
                d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z"
              ></path>
            </svg>
          </a>
        </div>
      </div>

      <nav
        class="relative  flex flex-wrap items-center justify-between px-2 py-3 bg-transparent dark:bg-transparent transition-colors duration-500"
      >
        <div
          class="container px-4 mx-auto flex flex-wrap items-center justify-between"
        >
          <div
            class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start"
          >
            <a href="/home">
              <picture>
                <source srcset="/arminAvatarSmall.webp" type="image/webp" />
                <img
                  class="logo__image"
                  ngSrc="/arminAvatarSmall.png"
                  alt="Armin Avatar Logo"
                  width="80"
                  height="80"
                  priority
                  sizes="(max-width: 768px) 50vw, 100vw"
                />
              </picture>
            </a>
            <button
              class="cursor-pointer text-xl leading-none py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none text-black dark:text-white"
              type="button"
              (click)="toggleNavbar()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-8"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm8.25 5.25a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            [ngClass]="{ hidden: !showMenu, flex: showMenu }"
            class="w-full lg:w-auto lg:flex lg:flex-grow items-center"
          >
            <ul
              class="w-full lg:w-auto flex flex-col lg:flex-row list-none ml-auto"
            >
              <li class="nav-item">
                <a
                  class="px-6 py-4 flex items-center justify-center text-center text-sm uppercase font-bold leading-snug text-black dark:text-white hover:opacity-75 transition-colors duration-500"
                  href="/home"
                  >Home</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="px-6 py-4 flex items-center justify-center text-center text-sm uppercase font-bold leading-snug text-black dark:text-white hover:opacity-75 transition-colors duration-500"
                  href="/about"
                  >About</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="px-6 py-4 flex items-center justify-center text-center text-sm uppercase font-bold leading-snug text-black dark:text-white hover:opacity-75 transition-colors duration-500"
                  href="/blog"
                  >Blog</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="px-6 py-4 flex items-center justify-center text-center text-sm uppercase font-bold leading-snug text-black dark:text-white hover:opacity-75 transition-colors duration-500"
                  href="/portfolio"
                  >Portfolio</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="px-6 py-4 flex items-center justify-center text-center text-sm uppercase font-bold leading-snug text-black dark:text-white hover:opacity-75 transition-colors duration-500"
                  href="/contact"
                  >Contact</a
                >
              </li>
              <li class="nav-item flex items-center justify-center px-6 py-4">
                <button
                  class="h-8 w-8 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 relative flex items-center justify-center transition-transform"
                  (click)="toggleDarkMode()"
                >
                  <!-- Dark mode SVG -->
                  <svg
                    class="fill-violet-700 absolute transition-all duration-500 ease-out transform"
                    [ngClass]="{
                      'opacity-100 rotate-0 scale-1': !isDarkMode,
                      'opacity-0 rotate-180 scale-0': isDarkMode
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
                      'opacity-100 rotate-0 scale-1': isDarkMode,
                      'opacity-0 -rotate-180 scale-0': !isDarkMode
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
})
export class HeaderComponent implements OnInit {
  darkModeService: DarkModeService = inject(DarkModeService);
  isDarkMode = false;
  showMenu = false;
  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.darkModeService.updateDarkMode();
    console.log(this.darkModeService.darkModeSignal());
    console.log('iz odavde', this.isDarkMode);
  }
  ngOnInit() {
    this.isDarkMode = this.darkModeService.darkModeSignal() === 'dark';
  }
}
