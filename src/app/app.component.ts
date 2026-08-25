import { AfterViewInit, Component, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/layout/header/header.component';
import { FooterComponent } from '../components/layout/footer/footer.component';
import { DarkModeService } from './services/dark-mode.service';
import { BotpressLoaderService } from './services/botpress-loader.service';

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
export class AppComponent implements AfterViewInit, OnDestroy {
  darkModeService: DarkModeService = inject(DarkModeService);
  private readonly botpressLoader = inject(BotpressLoaderService);

  ngAfterViewInit(): void {
    this.botpressLoader.initFooterDetection();
  }

  ngOnDestroy(): void {
    this.botpressLoader.cleanup();
  }
}
