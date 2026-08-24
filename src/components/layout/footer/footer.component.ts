import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SocialIconListComponent } from './social-icon-list.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [DatePipe, SocialIconListComponent],

  template: `
    <footer class="site-footer">
      <div class="page-frame footer-grid">
        <p><span>AB / {{ date | date: 'yyyy' }}</span>{{ name }} — Frontend & AI product engineer.</p>
        <app-social-icon-list />
        <a href="mailto:dzarma.busatlic@gmail.com">Start a conversation <span>↗</span></a>
      </div>
    </footer>
  `,
  styles: [
    `
      footer { z-index: 1000; }
      img {
        display: inline-block;
      }
    `,
  ],
})
export class FooterComponent {
  date = new Date();
  @Input()
  public name = '';
}
