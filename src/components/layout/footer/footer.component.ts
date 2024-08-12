import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SocialIconListComponent } from './social-icon-list.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [DatePipe, SocialIconListComponent],

  template: `
    <footer
      class="p-2  bg-white text-center text-black border-gray-200 sm:px-8 lg:px-16 dark:bg-gray-800 border-gray-700"
    >
      <p class="border-t text-black  pt-10 pb-8 text-sm dark:text-white">
        <span class="text-black dark:text-white">©</span>
        {{ date | date : 'YYYY' }} {{ name }}. All rights reserved.
      </p>

      <app-social-icon-list />
    </footer>
  `,
  styles: [
    `
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
