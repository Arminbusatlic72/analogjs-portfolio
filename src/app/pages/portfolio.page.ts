import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ContentService } from '../services/content.service';

@Component({
  standalone: true,
  imports: [NgFor, RouterLink, AsyncPipe],
  template: `
    <div
      class="min-h-screen min-w-full text-black bg-white flex flex-col items-center
    justify-center pt-20 dark:bg-gray-800"
    >
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div
            class="flex flex-wrap w-full mb-20 flex-col items-center text-center"
          >
            <h1
              class="pt-20 sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            >
              Portfolio Projects
            </h1>
            <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table.
            </p>
          </div>
          <div class="flex flex-wrap">
            @for (project of projects;track project.attributes.slug) {

            <div class="p-4 mb-3 md:w-1/3">
              <div
                class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden"
              >
                <img
                  class="lg:h-48 md:h-36 w-full object-cover object-center"
                  src="{{ project.attributes.featuredImage }}"
                  alt="{{ project.attributes.title }}"
                />
                <div class="p-6">
                  <h2
                    class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                  >
                    {{ project.attributes.technology }}
                  </h2>
                  <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                    {{ project.attributes.title }}
                  </h1>
                  <p class="leading-relaxed mb-3"></p>
                  <div class="flex items-center flex-wrap ">
                    <a
                      class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                      href="{{ project.attributes.link }}"
                      target="_blank"
                      >see project
                      <svg
                        class="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                    <span
                      class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200"
                    >
                      {{ project.attributes.date }}
                    </span>
                    <span
                      class="text-gray-400 inline-flex items-center leading-none text-sm"
                    >
                    </span>
                  </div>
                </div>
              </div>
            </div>

            }
          </div>
        </div>
      </section>
    </div>
  `,
})
export default class PortfolioPage {
  private contentService = inject(ContentService);
  readonly projects = this.contentService.projectsContentFn;
}
