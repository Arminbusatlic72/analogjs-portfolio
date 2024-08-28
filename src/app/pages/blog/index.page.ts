import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ContentService } from '../../services/content.service';

@Component({
  standalone: true,
  imports: [NgFor, RouterLink, AsyncPipe],
  template: `
    <section class="text-gray-600 body-font p-5">
      <div
        class="container px-1 py-24 mx-auto mb-24 rounded-2xl bg-slate-100 shadow-violet-950 border-gray-200 dark:text-gray-300 dark:bg-gray-900"
      >
        <div
          class="flex flex-wrap w-full mb-20 flex-col items-center text-center"
        >
          <h2
            class="text-4xl md:text-4xl lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 text-center md:text-left dark:text-gray-300"
          >
            Blog posts
          </h2>
          <p
            class="lg:w-1/2 w-full leading-relaxed text-gray-500 dark:text-gray-400"
          >
            This blog explores tech insights and other topics that catch my
            interest, offering a compilation of solutions and ideas that I hope
            will be helpful to others seeking practical guidance.
          </p>
        </div>
        <div class="flex flex-wrap">
          @for (post of posts;track post.attributes.slug) {
          <div class="w-full xl:w-1/3 md:w-1/2 p-4 relative z-[1000]">
            <a [routerLink]="['/blog/', post.attributes.slug]">
              <div
                class="border border-gray-200 p-6 rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <div
                  class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 dark:bg-indigo-800 dark:text-indigo-400"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>

                <h2
                  class="text-lg text-gray-900 font-medium title-font mb-2 dark:text-gray-100"
                >
                  {{ post.attributes.title }}
                </h2>
                <p
                  class="post__desc leading-relaxed text-base dark:text-gray-300"
                >
                  {{ post.attributes.description }}
                </p>
              </div>
            </a>
          </div>

          }
        </div>
      </div>
    </section>
  `,
})
export default class BlogPage {
  private contentService = inject(ContentService);
  readonly posts = this.contentService.postsContentFn;
}
