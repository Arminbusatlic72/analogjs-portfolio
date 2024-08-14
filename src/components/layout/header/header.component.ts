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
        class="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:bg-gray-800 border-gray-700"
      >
        <ul
          class="navigation max-w-[90vw] flex flex-wrap justify-between items-center relative mx-auto py-8 dark:text-white"
        >
          <a class="logo" href="/">
            <img class="logo__image" src="/arminImage.jpeg" alt="Logo Image" />
          </a>
          <input type="checkbox" id="check" />

          <span
            class="menu flex [&>li]:pl-8 [&>li>a]:text-center [&>li>a]:relative [&>li>a]:transition [&>li>a]:duration-200 [&>li>a]:ease-in-out [&>li>a]:font-medium [&>li>a]:text-lg"
          >
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/portfolio">Portfolio</a></li>
            <li><a href="/contact">Contact</a></li>
            <li>
              <button
                class="h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 relative flex items-center justify-center transition-transform"
                (click)="toggleDarkMode()"
              >
                <!-- Dark mode SVG -->
                <svg
                  class="fill-violet-700 absolute transition-opacity duration-500 ease-out"
                  [ngClass]="{
                    'opacity-100': darkModeService.darkModeSignal() === 'dark',
                    'opacity-0': darkModeService.darkModeSignal() !== 'dark'
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
                  class="fill-yellow-500 absolute transition-opacity duration-500 ease-out"
                  [ngClass]="{
                    'opacity-100': darkModeService.darkModeSignal() !== 'dark',
                    'opacity-0': darkModeService.darkModeSignal() === 'dark'
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

            <label for="check" class="close-menu">X</label>
          </span>

          <label for="check" class="open-menu mr-5">Menu</label>
        </ul>
      </nav>
    </header>
  `,
  styles: [
    `
      .no-animation .material-icons {
        transition: none;
      }
      .close-menu,
      .open-menu {
        position: absolute;
        cursor: pointer;
        display: none;
      }

      .open-menu {
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
      }

      .close-menu {
        top: 20px;
        right: 20px;
      }

      #check {
        display: none;
      }

      @media (max-width: 800px) {
        .menu {
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 73%;
          height: 100vh;
          position: fixed;
          top: 0;
          right: -100%;
          z-index: 100;
          background-color: #000;
          color: #fff;
          transition: all 0.5s ease-in-out;
          text-transform: uppercase;
          font-size: 24px;
        }

        .menu li {
          margin-top: 40px;
        }

        .menu li a {
          padding: 10px;
        }

        .close-menu,
        .open-menu {
          display: block;
        }

        #check:checked ~ .menu {
          right: 0;
        }
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
    `,
  ],
})
export class HeaderComponent {
  darkModeService: DarkModeService = inject(DarkModeService);
  noAnimation = true;

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
