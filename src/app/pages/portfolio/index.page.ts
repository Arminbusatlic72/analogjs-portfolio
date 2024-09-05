import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ContentService } from '../../services/content.service';

@Component({
  standalone: true,
  imports: [NgFor, RouterLink, AsyncPipe],
  template: `
    <section class="text-gray-600 body-font p-5 context">
      <div
        class="container px-1 py-2 mx-auto my-4 rounded-2xl bg-slate-100 shadow-violet-950 border-gray-200 dark:text-gray-300 dark:bg-gray-900"
      >
        <div class="flex flex-wrap w-full flex-col  text-left p-5">
          <h2
            class="text-4xl md:text-4xl lg:text-6xl text-violet-700 dark:text-yellow-500 font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 text-left transition-all duration-500 ease-out transform"
          >
            <span class="text-yellow-500 dark:text-violet-700">/</span>
            portfolio
          </h2>
          <p
            class="lg:w-1/2 w-full leading-relaxed text-gray-500 dark:text-gray-300"
          >
            List of my Projects
          </p>
        </div>
        <div class="flex flex-wrap">
          @for (post of posts;track post.attributes.slug) {
          <div class="w-full xl:w-1/3 md:w-1/2 p-4 relative z-[1000]">
            <a [routerLink]="['/portfolio/', post.attributes.slug]">
              <div
                class="border border-gray-200 p-6 rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <div
                  class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-violet-100 text-violet-700 mb-4 dark:bg-violet-700 dark:text-violet-400"
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
                    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"></path>
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
                  {{ post.attributes.technology }}
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
export default class ProjectsPage {
  private contentService = inject(ContentService);
  readonly posts = this.contentService.projectsContentFn;
}
