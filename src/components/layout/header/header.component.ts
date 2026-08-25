import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DarkModeService } from '../../../app/services/dark-mode.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  template: `
    <header class="site-header">
      <nav class="site-nav" aria-label="Primary navigation">
        <a class="wordmark" routerLink="/home" aria-label="Armin Busatlic, home" (click)="closeNavbar()">
          <span class="wordmark-mark">AB</span>
          <span><strong>Armin Busatlic</strong><small>Product engineer</small></span>
        </a>
        <button class="menu-toggle" [class.menu-toggle-open]="showMenu" type="button" (click)="toggleNavbar()" [attr.aria-expanded]="showMenu" aria-controls="primary-menu" [attr.aria-label]="showMenu ? 'Close menu' : 'Open menu'">
          <span></span><span></span>
        </button>
          <div
            [class.menu-open]="showMenu"
            class="nav-panel"
            id="primary-menu"
          >
            <ul>
              <li class="nav-item">
                <a
                  class="nav-link"
                  routerLink="/home"
                  routerLinkActive="nav-link-active"
                  [routerLinkActiveOptions]="{ exact: true }"
                  (click)="closeNavbar()"
                  >Home</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  routerLink="/about"
                  routerLinkActive="nav-link-active"
                  [routerLinkActiveOptions]="{ exact: true }"
                  (click)="closeNavbar()"
                  >About</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  routerLink="/blog"
                  routerLinkActive="nav-link-active"
                  [routerLinkActiveOptions]="{ exact: true }"
                  (click)="closeNavbar()"
                  >Blog</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  routerLink="/portfolio"
                  routerLinkActive="nav-link-active"
                  [routerLinkActiveOptions]="{ exact: true }"
                  (click)="closeNavbar()"
                  >Portfolio</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  routerLink="/contact"
                  routerLinkActive="nav-link-active"
                  [routerLinkActiveOptions]="{ exact: true }"
                  (click)="closeNavbar()"
                  >Contact</a
                >
              </li>
            </ul>
            <a class="availability" routerLink="/contact" (click)="closeNavbar()"><i></i> Available for work</a>
            <button class="theme-toggle" (click)="toggleDarkMode()" [attr.aria-label]="isDarkMode ? 'Use light theme' : 'Use dark theme'">
              {{ isDarkMode ? 'LIGHT' : 'DARK' }}
            </button>
          </div>
      </nav>
      @if (showMenu) {
        <button class="menu-backdrop" type="button" aria-label="Close menu" (click)="closeNavbar()"></button>
      }
    </header>
  `,
})
export class HeaderComponent {
  darkModeService: DarkModeService = inject(DarkModeService);
  private readonly host = inject(ElementRef<HTMLElement>);
  get isDarkMode() {
    return this.darkModeService.darkModeSignal() === 'dark';
  }
  showMenu = false;
  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }

  closeNavbar() {
    this.showMenu = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.showMenu && !this.host.nativeElement.contains(event.target as Node)) {
      this.closeNavbar();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeNavbar();
  }

  toggleDarkMode() {
    this.darkModeService.updateDarkMode();
  }
}
