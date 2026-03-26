import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DatePipe, NgOptimizedImage, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ContentService } from '../../services/content.service';
import { normalizeSlug } from '../../utils/slug';

const BLOG_PAGE_SIZE = 6;

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DatePipe, RouterLink, NgOptimizedImage],
  styleUrls: ['./blog-load-more.styles.scss'],
  template: `
    <section class="text-gray-600 body-font p-5">
      <h2
        class="text-4xl md:text-4xl lg:text-6xl text-violet-700 dark:text-yellow-500 font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 text-left transition-all duration-500 ease-out transform"
      >
        <span class="text-yellow-500 dark:text-violet-700">/</span>blog
      </h2>
      <div
        class="container px-1 py-2 mx-auto mb-24 rounded-2xl bg-slate-100 shadow-violet-950 border border-gray-200 dark:text-gray-300 dark:bg-gray-900 relative z-[1000]"
      >
        <div class="flex flex-wrap w-full flex-col text-left p-5">
          <p
            class="lg:w-1/2 w-full leading-relaxed text-gray-500 dark:text-gray-300 leading-loose"
          >
            This blog explores tech insights and other topics that catch my
            interest, offering a compilation of solutions and ideas that, I hope
            will be helpful to others seeking practical guidance.
          </p>
        </div>
        <div class="flex flex-wrap">
          @for (
            post of visiblePosts();
            track post.attributes.slug;
            let i = $index
          ) {
            @if (i < 3) {
              <div class="w-full xl:w-1/3 md:w-1/2 p-4">
                <div
                  class="animated-border card-card-layout rounded-lg dark:bg-white dark:bg-gray-800 overflow-hidden"
                >
                  <a
                    [routerLink]="[
                      '/blog/',
                      normalizeSlug(post.attributes.slug),
                    ]"
                    class="block"
                  >
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
                  <div class="p-3 card-content">
                    <div class="flex-1">
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
                    </div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span
                        class="font-semibold text-sm text-gray-900 dark:text-gray-100"
                      >
                        @if (post.attributes.date) {
                          {{ post.attributes.date | date: 'MMMM d, yyyy' }}
                        } @else {
                          Publication date TBD
                        }
                      </span>
                    </div>
                    <a
                      [routerLink]="[
                        '/blog/',
                        normalizeSlug(post.attributes.slug),
                      ]"
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
            } @else {
              @defer (on idle) {
                <div class="w-full xl:w-1/3 md:w-1/2 p-4">
                  <div
                    class="animated-border card-card-layout rounded-lg dark:bg-white dark:bg-gray-800 overflow-hidden"
                  >
                    <a
                      [routerLink]="[
                        '/blog/',
                        normalizeSlug(post.attributes.slug),
                      ]"
                      class="block"
                    >
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
                    <div class="p-3 card-content">
                      <div class="flex-1">
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
                      </div>
                      <div
                        class="text-xs text-gray-500 dark:text-gray-400 mb-3"
                      >
                        <span
                          class="font-semibold text-sm text-gray-900 dark:text-gray-100"
                        >
                          @if (post.attributes.date) {
                            {{ post.attributes.date | date: 'MMMM d, yyyy' }}
                          } @else {
                            Publication date TBD
                          }
                        </span>
                      </div>
                      <a
                        [routerLink]="[
                          '/blog/',
                          normalizeSlug(post.attributes.slug),
                        ]"
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
              } @placeholder {
                <div class="w-full xl:w-1/3 md:w-1/2 p-4">
                  <div class="card-placeholder"></div>
                </div>
              }
            }
          }
        </div>
        @if (hasMore()) {
          <div class="load-more-container">
            <button
              type="button"
              class="load-more-btn animated text-white bg-violet-700 border-0 py-2 px-8 focus:outline-none hover:bg-violet-600 rounded text-lg"
              (click)="loadMore()"
              [attr.aria-label]="'Load ' + remainingCount() + ' more posts'"
            >
              Load {{ remainingCount() }} more
            </button>
            <span class="post-count">
              Showing {{ visiblePosts().length }} of {{ allPosts().length }}
            </span>
          </div>
        }
        @if (!hasMore() && allPosts().length > 0) {
          <p class="all-loaded">All posts loaded</p>
        }
      </div>
    </section>
  `,
})
export default class BlogPage {
  private readonly contentService = inject(ContentService);
  readonly allPosts = this.contentService.postsContentFn;
  private readonly visibleCount = signal(BLOG_PAGE_SIZE);

  readonly visiblePosts = computed(() =>
    this.allPosts().slice(0, this.visibleCount()),
  );
  readonly hasMore = computed(
    () => this.visibleCount() < this.allPosts().length,
  );
  readonly remainingCount = computed(() => {
    const remaining = this.allPosts().length - this.visibleCount();
    return Math.max(0, Math.min(BLOG_PAGE_SIZE, remaining));
  });

  loadMore(): void {
    this.visibleCount.update((count) =>
      Math.min(count + BLOG_PAGE_SIZE, this.allPosts().length),
    );
  }

  readonly normalizeSlug = normalizeSlug;
}
