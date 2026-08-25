import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/layout/header/header.component';
import { FooterComponent } from '../components/layout/footer/footer.component';
import { DarkModeService } from './services/dark-mode.service';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div
      class="site-shell"
      [class.dark]="darkModeService.darkModeSignal() === 'dark'"
      [class.light]="darkModeService.darkModeSignal() === 'light'"
    >
      <app-header></app-header>

      <router-outlet> </router-outlet>

      <app-footer name="Armin Busatlic"></app-footer>
    </div>
  `,
})
export class AppComponent {
  darkModeService: DarkModeService = inject(DarkModeService);
}
