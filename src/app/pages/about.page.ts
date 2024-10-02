import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouteMeta } from '@analogjs/router';

import { ContentService } from '../services/content.service';
import { TechnologyItemComponent } from '../../components/layout/tech-item/tech-item';
export const routeMeta: RouteMeta = {
  title: 'Armin Busatlic - About',
};

@Component({
  selector: 'about',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CommonModule,
    TechnologyItemComponent,
    RouterLink,
    AsyncPipe,
  ],
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
              <span class="text-yellow-500 dark:text-violet-700">/</span>about
            </h2>
            <div class="px-0 md:px-16">
              <p
                class="leading-relaxed text-gray-500 leading-loose dark:text-gray-300"
              >
                I'm Armin Bušatlić, a front-end developer with over 4 years of
                experience creating user-friendly interfaces using HTML, CSS,
                and JavaScript. My focus over the past two years has been on
                Angular and JavaScript, developing and maintaining UI features
                for a B2B multinational e-commerce project on the SAP Commerce
                Cloud-based Spartacus storefront.<br />
                I'm always eager to learn new technologies and continually
                expand my skills in the fast-evolving world of front-end
                development.
                <br />
              </p>
            </div>
          </div>

          <div
            class="text-wrapper text-primary-content dark:text-white w-full lg:w-1/2"
          >
            <h3
              class="text-2xl md:text-3xl text-violet-700 dark:text-yellow-500 lg:text-4xl font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 md:text-left transition-all duration-500 ease-out transform"
            >
              <span class="text-yellow-500 dark:text-violet-700">#</span>skills
            </h3>
            <div class="px-0 md:px-16">
              <h3
                class="font-bold text-xl mb-2 cursor-pointer flex items-center justify-between border border-gray-300 px-4 py-2"
                (click)="toggleSection('coding')"
              >
                <span>Coding</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-5 h-5 transition-transform transform"
                  [ngClass]="{ 'rotate-90': isCodingOpen }"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </h3>
              <div [class.open]="isCodingOpen" class="accordion-content pl-4">
                <app-tech-item
                  *ngFor="let tech of technologies"
                  [name]="tech.name"
                  [stars]="tech.stars"
                >
                </app-tech-item>
              </div>

              <h3
                class="font-bold text-xl mb-2 cursor-pointer flex items-center justify-between border border-gray-300 px-4 py-2"
                (click)="toggleSection('platforms')"
              >
                <span>Platforms</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-5 h-5 transition-transform transform"
                  [ngClass]="{ 'rotate-90': isPlatformsOpen }"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </h3>
              <div
                [class.open]="isPlatformsOpen"
                class="accordion-content pl-4"
              >
                <app-tech-item
                  *ngFor="let platform of platforms"
                  [name]="platform.name"
                  [stars]="platform.stars"
                >
                </app-tech-item>
              </div>

              <h3
                class="font-bold text-xl mb-2 cursor-pointer flex items-center justify-between border border-gray-300 px-4 py-2"
                (click)="toggleSection('tools')"
              >
                <span>Tools / Others</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-5 h-5 transition-transform transform"
                  [ngClass]="{ 'rotate-90': isToolsOpen }"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </h3>
              <div [class.open]="isToolsOpen" class="accordion-content pl-4">
                <app-tech-item
                  *ngFor="let tool of tools"
                  [name]="tool.name"
                  [stars]="tool.stars"
                >
                </app-tech-item>
              </div>
              <h3
                class="font-bold text-xl mb-2 cursor-pointer flex items-center justify-between border border-gray-300 px-4 py-2"
                (click)="toggleSection('languages')"
              >
                <span>Languages</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-5 h-5 transition-transform transform"
                  [ngClass]="{ 'rotate-90': isLanguagesOpen }"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </h3>
              <div
                [class.open]="isLanguagesOpen"
                class="accordion-content pl-4"
              >
                <app-tech-item
                  *ngFor="let language of languages"
                  [name]="language.name"
                  [stars]="language.stars"
                >
                </app-tech-item>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        class="about-section pb-10 relative dark:text-white body-font z-10 flex w-full flex-1 flex-col"
      >
        <div class="container px-5 mx-auto flex flex-wrap">
          <div class="projects-wrapper w-full lg:w-1/2  ">
            <h3
              class="text-2xl md:text-3xl text-violet-700 dark:text-yellow-500 lg:text-4xl font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 md:text-left transition-all duration-500 ease-out transform"
            >
              <span class="text-yellow-500 dark:text-violet-700">#</span
              >projects
            </h3>
            <div
              class="flex flex-wrap max-h-[400px] overflow-y-auto border-gray-200"
            >
              @for (post of posts; track post.attributes.slug) {
              <div class="w-full p-2">
                <a [routerLink]="['/portfolio/', post.attributes.slug]">
                  <div
                    class="border border-gray-200 p-6 rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800"
                  >
                    <div
                      class="relative h-48 mb-4 overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-700"
                    >
                      <img
                        class="h-full w-full object-cover object-center"
                        [ngSrc]="post.attributes.featuredImage"
                        alt="{{ post.attributes.title }}"
                        width="400"
                        height="260"
                      />
                      <div
                        class="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-800 to-transparent opacity-80"
                      ></div>
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
          <div
            class="text-wrapper text-primary-content dark:text-white w-full lg:w-1/2"
          ></div>
        </div>
      </section>
    </div>
  `,
})
export default class AboutPageComponent {
  private contentService = inject(ContentService);
  readonly posts = this.contentService.projectsContentFn;
  isCodingOpen = false;
  isPlatformsOpen = false;
  isLanguagesOpen = false;
  isToolsOpen = false;

  toggleSection(section: string) {
    if (section === 'coding') {
      this.isCodingOpen = !this.isCodingOpen;
    } else if (section === 'languages') {
      this.isLanguagesOpen = !this.isLanguagesOpen;
    } else if (section === 'tools') {
      this.isToolsOpen = !this.isToolsOpen;
    } else if (section === 'platforms') {
      this.isPlatformsOpen = !this.isPlatformsOpen;
    }
  }

  technologies = [
    { name: 'HTML/5', stars: 5 },
    { name: 'css/3', stars: 5 },
    { name: 'SASS, Less', stars: 5 },
    { name: 'BEM', stars: 5 },
    { name: 'Bootstrap, React Bootstrap', stars: 5 },
    { name: 'Tailwind css', stars: 5 },
    { name: 'Styled component', stars: 5 },
    { name: 'Javascript', stars: 4 },
    { name: 'Typescript', stars: 4 },
    { name: 'JQuery', stars: 4 },
    { name: 'Angular', stars: 4 },
    { name: 'Spartacus', stars: 3 },
    { name: 'AnalogJS', stars: 4 },
    { name: 'ReactJS', stars: 3 },
    { name: 'GatsbyJS', stars: 4 },
    { name: 'NextJS', stars: 3 },
    { name: 'RxJS', stars: 3 },
    { name: 'NgRX', stars: 2 },
  ];
  languages = [
    { name: 'Bosnian (mother tounghe)', stars: 5 },
    { name: 'English (daily use)', stars: 5 },
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
  platforms = [
    { name: 'Hybris', stars: 4 },
    { name: 'WordPress', stars: 4 },
    { name: 'Strapi', stars: 3 },
    { name: 'Prismic', stars: 3 },
    { name: 'Contentful', stars: 3 },
    // Add more platforms here
  ];
}
