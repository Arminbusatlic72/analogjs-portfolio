import { MarkdownComponent, injectContent } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import {
  AsyncPipe,
  NgIf,
  NgOptimizedImage,
  IMAGE_CONFIG,
  DatePipe,
} from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project';
import {
  projectTitleResolver,
  projectMetaResolver,
} from '../../resolvers/resolver';
import { ContentService } from '../../services/content.service';

export const routeMeta: RouteMeta = {
  title: projectTitleResolver,
  meta: projectMetaResolver,
};
@Component({
  standalone: true,
  imports: [
    MarkdownComponent,
    DatePipe,
    NgIf,
    AsyncPipe,
    RouterLink,
    NgOptimizedImage,
  ],
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        breakpoints: [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920],
      },
    },
  ],
  template: `
    <div *ngIf="post$ | async as post">
      <section
        class="mb-4 flex w-full flex-auto flex-row justify-between gap-4 text-gray-600 dark:text-gray-300"
      >
        <div class="flex items-center justify-between w-full">
          <div class="w-28">
            <button
              *ngIf="post.attributes.previousProject"
              [routerLink]="['/portfolio', post.attributes.previousProject]"
              class="btn btn-accent w-28"
              type="button"
            >
              Previous
            </button>
          </div>

          <div class="flex-1 text-center">
            <p
              class="text-lg text-black dark:text-white"
              aria-label="Project position"
            >
              <strong> {{ projectPosition }} of {{ totalProjects }} </strong>
            </p>
          </div>

          <div class="w-28 text-right">
            <button
              *ngIf="post.attributes.nextProject"
              [routerLink]="['/portfolio', post.attributes.nextProject]"
              class="btn btn-accent w-28"
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </section>
      <section class="text-gray-600 body-font p-5">
        <div
          class="container px-5 sm:px-24 pb-24 mx-auto  rounded-2xl bg-slate-100 shadow-violet-950 border-gray-200 dark:text-gray-300 dark:bg-gray-900 relative z-[1000]"
        >
          <div class="max-w-3xl mx-auto">
            <div class="py-4">
              <h2
                class="text-4xl md:text-4xl lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 text-left dark:text-gray-300"
              >
                {{ post.attributes.title }}
              </h2>

              <p class="text-md mb-4">
                {{ post.attributes.description }}
              </p>
              <p class="text-md">
                <strong>Company:</strong>
                {{ post.attributes.company }}
              </p>
              <p class="text-md">
                <strong>Tech stack:</strong>
                {{ post.attributes.tools }}
              </p>
              <p class="text-md">
                <strong>Project Duration:</strong>
                {{ post.attributes.timePeriod }}
              </p>
              <p *ngIf="post.attributes.date" class="text-md">
                <strong>Release day:</strong>
                <time
                  [attr.datetime]="post.attributes.date | date : 'yyyy-MM-dd'"
                >
                  {{ post.attributes.date | date : 'MMMM d, yyyy' }}</time
                >
              </p>

              <div class="flex items-center space-x-4 mt-5">
                <a
                  *ngIf="post.attributes.link"
                  href="{{ post.attributes.link }}"
                  target="_blank"
                  class="animated inline-block mb-4 text-white bg-violet-700 border-0 py-2 px-8 focus:outline-none hover:bg-violet-600 rounded text-lg"
                >
                  Visit website
                </a>
                <a
                  *ngIf="post.attributes.githublink"
                  href="{{ post.attributes.githublink }}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    class="h-6 w-6 text-gray-900 dark:text-white hover:text-gray-600 transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.729.082-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.107-.774.419-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.468-2.382 1.235-3.22-.123-.304-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.398 3.003-.404 1.02.006 2.046.138 3.005.404 2.29-1.552 3.296-1.23 3.296-1.23.653 1.652.241 2.872.118 3.176.77.838 1.233 1.91 1.233 3.22 0 4.61-2.805 5.623-5.475 5.92.43.37.814 1.102.814 2.222v3.293c0 .32.218.694.824.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <img
              class="w-full h-auto mb-8"
              [ngSrc]="post.attributes.projectImage"
              alt="{{ post.attributes.title }}"
              priority
              width="1000"
              height="460"
              sizes="(max-width: 640px) 100vw, 50vw"
            />

            <img
              *ngIf="post.attributes.projectImageSec"
              class="w-full h-auto mb-8"
              [ngSrc]="post.attributes.projectImageSec"
              alt="{{ post.attributes.title }}"
              priority
              width="1000"
              height="460"
              sizes="(max-width: 640px) 100vw, 50vw"
            />

            <article
              class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto"
            >
              <analog-markdown
                [content]="post.content"
                class="markdown-content text-gray-600 body-font"
              />
            </article>
          </div>
        </div>
      </section>
    </div>
  `,
})
// export default class ProjectPage {
//   private contentService = inject(ContentService);

//   readonly posts = this.contentService.projectsContentFn;

//   post$ = injectContent<Project>({
//     param: 'slug',
//     subdirectory: 'projects',
//   });
//   projectPosition: number | null = null; // Position of the current project
//   totalProjects: number | null = null; // Total number of projects

//   constructor(private route: ActivatedRoute) {
//     this.calculateProjectPosition();
//   }
//   calculateProjectPosition() {
//     const projects = this.posts; // Assume this is an array of ContentFile<Project>
//     console.log(projects);
//     // Get the current project slug from the route
//     const currentSlug = this.route.snapshot.paramMap.get('slug');

//     console.log(currentSlug);
//     // If we have projects and a current slug
//     if (projects && currentSlug) {
//       // Find the total number of projects
//       this.totalProjects = projects.length;

//       // Find the index of the current project by its slug
//       const currentIndex = projects.findIndex(
//         (project) => project.attributes.slug === currentSlug
//       );

//       if (currentIndex !== -1) {
//         // Update the current project position (1-based index)
//         this.projectPosition = currentIndex + 1;
//       }
//     }
//   }
// }
export default class ProjectPage implements OnInit, OnDestroy {
  private contentService = inject(ContentService);
  readonly posts = this.contentService.projectsContentFn;

  post$ = injectContent<Project>({
    param: 'slug',
    subdirectory: 'projects',
  });

  projectPosition: number | null = null; // Position of the current project
  totalProjects: number | null = null; // Total number of projects
  private routeSubscription!: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscribe to route changes
    this.routeSubscription = this.route.params.subscribe(() => {
      this.calculateProjectPosition();
    });
  }

  calculateProjectPosition() {
    const projects = this.posts; // Assume this is an array of ContentFile<Project>

    // Get the current project slug from the route
    const currentSlug = this.route.snapshot.paramMap.get('slug');

    // If we have projects and a current slug
    if (projects && currentSlug) {
      // Find the total number of projects
      this.totalProjects = projects.length;

      // Find the index of the current project by its slug
      const currentIndex = projects.findIndex(
        (project) => project.attributes.slug === currentSlug
      );

      if (currentIndex !== -1) {
        // Update the current project position (1-based index)
        this.projectPosition = currentIndex + 1;
      }
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from route changes to avoid memory leaks
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
