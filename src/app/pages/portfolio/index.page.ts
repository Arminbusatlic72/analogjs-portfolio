import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ContentService } from '../../services/content.service';

@Component({
  standalone: true,
  imports: [NgFor, RouterLink, FormsModule],
  template: `
    <section class="text-gray-600 body-font p-5 context">
      <h2
        class="text-4xl md:text-4xl lg:text-6xl text-violet-700 dark:text-yellow-500 font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 text-left transition-all duration-500 ease-out transform"
      >
        <span class="text-yellow-500 dark:text-violet-700">/</span>portfolio
      </h2>
      <div
        class="container px-1 py-2 mx-auto my-4 rounded-2xl bg-slate-100 shadow-violet-950 border-gray-200 dark:text-gray-300 dark:bg-gray-900"
      >
        <div class="flex flex-wrap w-full flex-col  text-left p-5">
          <h3
            class="text-2xl md:text-3xl lg:text-4xl text-violet-700 dark:text-yellow-500 font-bold tracking-tighter leading-tight md:leading-none md:text-left transition-all duration-500 ease-out transform"
          >
            <span class="text-yellow-500 dark:text-violet-700">#</span>client
            projects
          </h3>
          <p
            class="mb-4 lg:w-1/2 w-full leading-relaxed text-gray-500 dark:text-gray-300"
          >
            This section highlights a selection of client projects that I have
            completed as a freelancer or consultant for various companies.
          </p>

          <div class="mb-4">
            <label for="tool-select" class="block mb-2"
              >Filter Projects by tech stack used:</label
            >
            <select
              id="tool-select"
              [(ngModel)]="selectedTool"
              (change)="filterProjects()"
              class="p-1 border rounded bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out ng-untouched ng-pristine ng-invalid"
            >
              <option value="">All Tools</option>
              <option *ngFor="let tool of availableTools" [value]="tool">
                {{ tool }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex flex-wrap  lg:w-[900px] xl:w-[1250px]">
          <div
            *ngFor="let post of filteredPosts"
            class="w-full xl:w-1/3 md:w-1/2 p-4 relative z-[1000]"
          >
            <a [routerLink]="['/portfolio/', post.attributes.slug]">
              <div
                class="animated-border p-6 rounded-lg dark:bg-white dark:bg-gray-800"
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
                  class="two-lines text-lg text-gray-900 font-medium title-font mb-2 dark:text-gray-100"
                >
                  {{ post.attributes.title }}
                </h2>
                <p
                  class="tree-lines leading-relaxed text-base dark:text-gray-300"
                >
                  {{ post.attributes.technology }}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- <section class="text-gray-600 body-font p-5 context">
      <div
        class="container px-1 py-2 mx-auto my-4 rounded-2xl bg-slate-100 shadow-violet-950 border-gray-200 dark:text-gray-300 dark:bg-gray-900"
      >
        <div class="flex flex-wrap w-full flex-col  text-left p-5">
          <h3
            class="text-4xl md:text-4xl lg:text-6xl text-violet-700 dark:text-yellow-500 font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 text-left transition-all duration-500 ease-out transform"
          >
            <span class="text-yellow-500 dark:text-violet-700">#</span>open
            source projects
          </h3>
          <p
            class="mb-4 lg:w-1/2 w-full leading-relaxed text-gray-500 dark:text-gray-300"
          >
            This is a selection of my open-source projects, which I create as
            part of my learning process to explore new technologies and
            approaches. Each project includes links to the code and blog posts,
            in case you'd like to dive deeper into them.
          </p>

          <div class="mb-4">
            <label for="tool-select" class="block mb-2"
              >Filter Projects by tech stack used:</label
            >
            <select
              id="tool-select1"
              [(ngModel)]="selectedTool"
              (change)="filterProjects()"
              class="p-1 border rounded bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out ng-untouched ng-pristine ng-invalid"
            >
              <option value="">All Tools</option>
              <option *ngFor="let tool of availableTools" [value]="tool">
                {{ tool }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex flex-wrap md:min-w-[900px] lg:min-w-[1250px]">
          <div
            *ngFor="let post of filteredPosts"
            class="w-full xl:w-1/3 md:w-1/2 p-4 relative z-[1000]"
          >
            <a [routerLink]="['/portfolio/', post.attributes.slug]">
              <div
                class="animated-border p-6 rounded-lg dark:bg-white dark:bg-gray-800"
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
                  class="two-lines text-lg text-gray-900 font-medium title-font mb-2 dark:text-gray-100"
                >
                  {{ post.attributes.title }}
                </h2>
                <p
                  class="tree-lines leading-relaxed text-base dark:text-gray-300"
                >
                  {{ post.attributes.technology }}
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section> -->
  `,
})
export default class ProjectsPage {
  private contentService = inject(ContentService);
  readonly posts = this.contentService.projectsContentFn;

  selectedTool: string = '';
  availableTools: string[] = [];
  filteredPosts = this.posts;

  constructor() {
    this.initAvailableTools();
    this.filterProjects();
  }

  initAvailableTools() {
    const toolsSet = new Set<string>();
    this.posts.forEach((project) => {
      if (project.attributes.tools) {
        project.attributes.tools.split(',').forEach((tool) => {
          toolsSet.add(tool.trim());
        });
      }
    });
    this.availableTools = Array.from(toolsSet);
  }

  filterProjects() {
    if (this.selectedTool === '') {
      this.filteredPosts = this.posts;
    } else {
      this.filteredPosts = this.posts.filter((project) => {
        if (project.attributes.tools) {
          const tools = project.attributes.tools
            .split(',')
            .map((tool) => tool.trim());
          return tools.includes(this.selectedTool);
        }
        return false;
      });
    }
  }
}
