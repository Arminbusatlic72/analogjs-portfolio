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
            href="https://twitter.com/chrisjperko"
            target="_blank"
            class="hover:text-blue-700 dark:hover:text-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="twitter"
              class="text-black w-8 h-8 fill-current transition-colors duration-200 ease-in-out dark:text-gray-100"
            >
              <path
                d="M22,5.8a8.49,8.49,0,0,1-2.36.64,4.13,4.13,0,0,0,1.81-2.27,8.21,8.21,0,0,1-2.61,1,4.1,4.1,0,0,0-7,3.74A11.64,11.64,0,0,1,3.39,4.62a4.16,4.16,0,0,0-.55,2.07A4.09,4.09,0,0,0,4.66,10.1,4.05,4.05,0,0,1,2.8,9.59v.05a4.1,4.1,0,0,0,3.3,4A3.93,3.93,0,0,1,5,13.81a4.9,4.9,0,0,1-.77-.07,4.11,4.11,0,0,0,3.83,2.84A8.22,8.22,0,0,1,3,18.34a7.93,7.93,0,0,1-1-.06,11.57,11.57,0,0,0,6.29,1.85A11.59,11.59,0,0,0,20,8.45c0-.17,0-.35,0-.53A8.43,8.43,0,0,0,22,5.8Z"
              ></path>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/chris-perko/"
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
              <img
                class="logo__image"
                ngSrc="/arminAvatar.png"
                alt="Armin Avatar Logo"
                width="80"
                height="80"
                priority
                sizes="(max-width: 768px) 50vw, 100vw"
              />
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
                  href="/"
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
  styles: [
    `
      .media-header {
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        left: 18px;
        gap: 8px;
        top: 0px;
      }

      @media (max-width: 768px) {
        .media-header {
          display: none;
        }
      }

      .logo__image {
        height: 80px;
        width: 80px;
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
