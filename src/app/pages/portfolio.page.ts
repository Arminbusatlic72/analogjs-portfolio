import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div
      class="min-h-screen min-w-full text-black bg-white flex flex-col items-center justify-center dark:bg-gray-800"
    >
      <router-outlet />
    </div>
  `,
})
export default class BlogPage {}
