import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div
      class="min-h-screen min-w-full text-black bg-white flex flex-col items-center justify-center pt-20 dark:bg-gray-800 text-gray-100"
    >
      <router-outlet />
    </div>
  `,
})
export default class BlogPage {}
