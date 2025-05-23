import { Component, inject } from '@angular/core';
import { NgFor, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ContentService } from '../../services/content.service';

@Component({
  standalone: true,
  imports: [NgFor, RouterLink, NgOptimizedImage],
  template: `
    <section class="text-gray-600 body-font p-5">
      <h2
        class="text-4xl md:text-4xl lg:text-6xl text-violet-700 dark:text-yellow-500 font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 text-left transition-all duration-500 ease-out transform"
      >
        <span class="text-yellow-500 dark:text-violet-700">/</span>blog
      </h2>
      <div
        class="container px-1 py-2 mx-auto mb-24 rounded-2xl bg-slate-100 shadow-violet-950 border-gray-200 dark:text-gray-300 dark:bg-gray-900 relative z-[1000]"
      >
        <div class="flex flex-wrap w-full  flex-col  text-left p-5">
          <p
            class="lg:w-1/2 w-full leading-relaxed text-gray-500 dark:text-gray-300 leading-loose"
          >
            This blog explores tech insights and other topics that catch my
            interest, offering a compilation of solutions and ideas that, I hope
            will be helpful to others seeking practical guidance.
          </p>
        </div>
        <div class="flex flex-wrap">
          @for (post of posts;track post.attributes.slug) {
          <div class="w-full xl:w-1/3 md:w-1/2 p-4">
            <div
              class="animated-border rounded-lg dark:bg-white dark:bg-gray-800 overflow-hidden"
            >
              <!-- Full-width cover image -->
              <a [routerLink]="['/blog/', post.attributes.slug]">
                <figure class="relative h-64 overflow-hidden">
                  <img
                    class="h-full w-full object-cover object-center"
                    [ngSrc]="post.attributes.coverImage"
                    alt="{{ post.attributes.title }}"
                    width="500"
                    height="210"
                  />
                </figure>
              </a>

              <!-- Content area -->
              <div class="p-3">
                <h2
                  class="two-lines text-lg text-gray-900 font-medium title-font mb-2 dark:text-gray-100"
                >
                  {{ post.attributes.title }}
                </h2>
                <p
                  class="three-lines mb-2 leading-relaxed text-base dark:text-gray-300"
                >
                  {{ post.attributes.description }}
                </p>
                <a
                  [routerLink]="['/blog/', post.attributes.slug]"
                  class="flex justify-end items-center text-sm font-medium text-violet-700 dark:text-yellow-500"
                >
                  Read more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-4 h-4 ml-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
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
