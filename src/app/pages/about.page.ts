import { Component, inject } from '@angular/core';
import { CommonModule, NgFor, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ContentService } from '../services/content.service';
import { TechnologyItemComponent } from '../../components/layout/tech-item/tech-item';
@Component({
  selector: 'about',
  standalone: true,
  imports: [CommonModule, TechnologyItemComponent, RouterLink, AsyncPipe],
  template: `
    <div
      class="text-gray-600 bg-white flex flex-col items-center justify-center dark:bg-gray-800 text-gray-100"
    >
      <section class="text-gray-600 body-font z-10 flex w-full flex-1 flex-col">
        <div class="container px-5 mx-auto flex flex-wrap">
          <!-- Text Wrapper -->
          <div
            class="text-wrapper text-primary-content dark:text-white w-full lg:w-1/2"
          >
            <h2
              class="text-4xl md:text-4xl lg:text-6xl text-violet-700 dark:text-yellow-500 font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12  text-left transition-all duration-500 ease-out transform"
            >
              <span class="text-yellow-500 dark:text-violet-700">/</span> about
              me
            </h2>
            <div class="px-0 md:px-16">
              <p
                class="leading-relaxed text-gray-500 dark:text-gray-400 leading-loose"
              >
                I am Armin Bušatlić and I am a self-taught developer with
                extensive experience in front-end development, with a focus on
                Angular and JavaScript.<br />
                Over the past two years, he has honed his skills in designing
                and implementing frontend solutions for enterprise-scale
                projects based on SAP CX (Hybris B2C & B2B) and CRM platforms
                like Emarsys.
                <br />
                I am passionate about learning new technologies and continually
                expanding his expertise in the ever-evolving world of front-end
                development.
              </p>
            </div>
          </div>

          <!-- Projects Wrapper -->

          <div class="projects-wrapper w-full lg:w-1/2  ">
            <h3
              class="text-3xl md:text-3xl text-violet-700 dark:text-yellow-500 lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 md:text-left transition-all duration-500 ease-out transform"
            >
              <span class="text-yellow-500 dark:text-violet-700">#</span>
              projects
            </h3>
            <div
              class="hidden md:flex flex-wrap max-h-[400px] overflow-y-auto border-gray-200"
            >
              @for (post of posts; track post.attributes.slug) {
              <div class="w-full p-2">
                <a [routerLink]="['/portfolio/', post.attributes.slug]">
                  <div
                    class="border border-gray-200 p-6 rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800"
                  >
                    <!-- Image Container -->
                    <div
                      class="h-48 mb-4 overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-700"
                    >
                      <img
                        class="h-full w-full object-cover object-center"
                        src="{{ post.attributes.featuredImage }}"
                        alt="{{ post.attributes.title }}"
                      />
                    </div>

                    <!-- Title -->
                    <h2
                      class="text-lg text-gray-900 font-medium title-font mb-2 dark:text-gray-100"
                    >
                      {{ post.attributes.title }}
                    </h2>

                    <!-- Description -->
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
        </div>
      </section>
      <section
        class="dark:text-white body-font z-10 flex w-full flex-1 flex-col"
      >
        <div class="container px-5 pb-24 mx-auto">
          <h3
            class="text-3xl md:text-3xl text-violet-700 dark:text-yellow-500 lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 md:text-left transition-all duration-500 ease-out transform"
          >
            <span class="text-yellow-500 dark:text-violet-700">#</span> skills
          </h3>
          <div
            class="py-8 px-0 lg: px-8 px-0 md:px-16 grid md:grid-cols-2 gap-16"
          >
            <div class="leading-loose">
              <h3 class="font-bold text-xl mb-2">Coding</h3>

              <app-tech-item
                *ngFor="let tech of technologies"
                [name]="tech.name"
                [stars]="tech.stars"
              >
              </app-tech-item>
            </div>
            <div class="leading-loose">
              <h3 class="font-bold text-xl mb-2">Languages</h3>

              <app-tech-item
                *ngFor="let language of languages"
                [name]="language.name"
                [stars]="language.stars"
              >
              </app-tech-item>

              <h3 class="font-bold text-xl mb-2 mt-8">Tools / Others</h3>
              <app-tech-item
                *ngFor="let tool of tools"
                [name]="tool.name"
                [stars]="tool.stars"
              >
              </app-tech-item>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export default class AboutPageComponent {
  private contentService = inject(ContentService);
  readonly posts = this.contentService.projectsContentFn;

  technologies = [
    { name: 'HTML/5', stars: 4 },
    { name: 'css/3', stars: 4 },
    // Add more technology items here
  ];
  languages = [
    { name: 'Bosnian (mother tounghe)', stars: 4 },
    { name: 'English (daily use)', stars: 4 },
    // Add more technology items here
  ];
  tools = [
    { name: 'Github', stars: 4 },
    { name: 'Figma', stars: 4 },
    { name: 'VSCode', stars: 4 },
    { name: 'Jira / Atlassian', stars: 5 },
    { name: 'Scrum / Agile', stars: 5 },
    { name: 'SEO', stars: 5 },

    // Add more technology items here
  ];
}
