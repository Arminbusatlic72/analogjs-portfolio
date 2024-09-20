import { Component, inject } from '@angular/core';
import { NgFor, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ContentService } from '../../services/content.service';

@Component({
  standalone: true,
  imports: [NgFor, RouterLink, NgOptimizedImage],
  template: `
    <section class="text-gray-600 body-font p-5">
      <div
        class="container px-1 py-2 mx-auto mb-24 rounded-2xl bg-slate-100 shadow-violet-950 border-gray-200 dark:text-gray-300 dark:bg-gray-900"
      >
        <div class="flex flex-wrap w-full  flex-col  text-left p-5">
          <h2
            class="text-4xl md:text-4xl lg:text-6xl text-violet-700 dark:text-yellow-500 font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 text-left transition-all duration-500 ease-out transform"
          >
            <span class="text-yellow-500 dark:text-violet-700">/</span>blog
            posts
          </h2>
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
          <div class="w-full xl:w-1/3 md:w-1/2 p-4 relative z-[1000]">
            <a [routerLink]="['/blog/', post.attributes.slug]">
              <div
                class="animated-border rounded-lg dark:bg-white dark:bg-gray-800 overflow-hidden"
              >
                <!-- Full-width cover image -->
                <figure class="relative h-64 overflow-hidden">
                  <img
                    class="h-full w-full object-cover object-center"
                    [ngSrc]="post.attributes.coverImage"
                    alt="{{ post.attributes.title }}"
                    width="500"
                    height="210"
                  />
                </figure>

                <!-- Content area -->
                <div class="p-6">
                  <h2
                    class="two-lines text-lg text-gray-900 font-medium title-font mb-2 dark:text-gray-100"
                  >
                    {{ post.attributes.title }}
                  </h2>
                  <p
                    class="three-lines leading-relaxed text-base dark:text-gray-300"
                  >
                    {{ post.attributes.description }}
                  </p>
                </div>
              </div>
            </a>
          </div>
          }
        </div>

        <!-- <div class="flex flex-wrap">
          @for (post of posts;track post.attributes.slug) {
          <div class="w-full xl:w-1/3 md:w-1/2 p-4 relative z-[1000]">
            <a [routerLink]="['/blog/', post.attributes.slug]">
              <div
                class="border border-gray-200 p-6 rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <div
                  class="w-full h-auto inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4 dark:bg-indigo-800 dark:text-indigo-400"
                >
                  <div
                    class="relative h-48 mb-4 overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-700"
                  >
                    <img
                      class="h-full w-full object-cover object-center"
                      src="{{ post.attributes.coverImage }}"
                      alt="{{ post.attributes.title }}"
                    />
                    <div
                      class="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-800 to-transparent opacity-80"
                    ></div>
                  </div>
                </div>

                <h2
                  class="two-lines text-lg text-gray-900 font-medium title-font mb-2 dark:text-gray-100"
                >
                  {{ post.attributes.title }}
                </h2>
                <p
                  class="tree-lines leading-relaxed text-base dark:text-gray-300"
                >
                  {{ post.attributes.description }}
                </p>
              </div>
            </a>
          </div>

          }
        </div> -->
      </div>
    </section>
  `,
})
export default class BlogPage {
  private contentService = inject(ContentService);
  readonly posts = this.contentService.postsContentFn;
}
