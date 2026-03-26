import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ContentService } from '../../services/content.service';
import { normalizeSlug } from '../../utils/slug';

const PORTFOLIO_PAGE_SIZE = 6;

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FormsModule],
  styleUrls: ['./portfolio-load-more.styles.scss'],
  template: `
    <section class="text-gray-600 body-font p-5 context">
      <h2
        class="text-4xl md:text-4xl lg:text-6xl text-violet-700 dark:text-yellow-500 font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 text-left transition-all duration-500 ease-out transform"
      >
        <span class="text-yellow-500 dark:text-violet-700">/</span>portfolio
      </h2>
      <div
        class="container px-1 py-2 mx-auto my-4 rounded-2xl bg-slate-100 shadow-violet-950 border-gray-200 dark:text-gray-300 dark:bg-gray-900 relative z-[1000]"
      >
        <div class="flex flex-wrap w-full flex-col text-left p-5">
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
              [ngModel]="selectedTool()"
              (ngModelChange)="filterProjects($event)"
              class="p-1 border rounded bg-gray-100 bg-opacity-50 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out ng-untouched ng-pristine ng-invalid"
            >
              <option value="All">All Tools</option>
              @for (tool of availableTools; track tool) {
                <option [value]="tool">{{ tool }}</option>
              }
            </select>
          </div>
        </div>

        <div class="flex flex-wrap lg:w-[900px] xl:w-[1250px]">
          @for (
            post of visibleProjects();
            track post.attributes.slug;
            let i = $index
          ) {
            @if (i < 3) {
              <div class="w-full xl:w-1/3 md:w-1/2 p-4">
                <a
                  [routerLink]="[
                    '/portfolio/',
                    normalizeSlug(post.attributes.slug),
                  ]"
                  class="block h-full"
                >
                  <div
                    class="animated-border card-card-layout rounded-lg dark:bg-white dark:bg-gray-800"
                  >
                    <div class="card-icon">
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

                    <div class="card-content">
                      <h2
                        class="two-lines text-lg text-gray-900 font-medium title-font mb-2 dark:text-gray-100"
                      >
                        {{ post.attributes.title }}
                      </h2>
                      <p
                        class="three-lines leading-relaxed text-base dark:text-gray-300"
                      >
                        {{ post.attributes.technology }}
                      </p>
                      @if (
                        post.attributes.company || post.attributes.timePeriod
                      ) {
                        <div
                          class="flex flex-wrap items-center gap-3 mt-3 text-xs font-semibold text-gray-500 dark:text-gray-400"
                        >
                          @if (post.attributes.company) {
                            <span>Company: {{ post.attributes.company }}</span>
                          }
                          @if (post.attributes.timePeriod) {
                            <span
                              >Timeframe: {{ post.attributes.timePeriod }}</span
                            >
                          }
                        </div>
                      }
                      @let toolChips =
                        (post.attributes.tools ?? '')
                        .split(',')
                        .map((tool) => tool.trim())
                        .filter((tool) => tool);
                      @if (toolChips.length) {
                        <div class="flex flex-wrap gap-2 mt-3">
                          @for (tool of toolChips; track tool) {
                            <span
                              class="text-[11px] font-semibold px-3 py-1 rounded-full border border-violet-200 text-violet-700 dark:border-violet-700 dark:text-violet-300"
                            >
                              {{ tool }}
                            </span>
                          }
                        </div>
                      }
                    </div>
                  </div>
                </a>
              </div>
            } @else {
              @defer (on idle) {
                <div class="w-full xl:w-1/3 md:w-1/2 p-4">
                  <a
                    [routerLink]="[
                      '/portfolio/',
                      normalizeSlug(post.attributes.slug),
                    ]"
                    class="block h-full"
                  >
                    <div
                      class="animated-border card-card-layout rounded-lg dark:bg-white dark:bg-gray-800"
                    >
                      <div class="card-icon">
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

                      <div class="card-content">
                        <h2
                          class="two-lines text-lg text-gray-900 font-medium title-font mb-2 dark:text-gray-100"
                        >
                          {{ post.attributes.title }}
                        </h2>
                        <p
                          class="three-lines leading-relaxed text-base dark:text-gray-300"
                        >
                          {{ post.attributes.technology }}
                        </p>
                        @if (
                          post.attributes.company || post.attributes.timePeriod
                        ) {
                          <div
                            class="flex flex-wrap items-center gap-3 mt-3 text-xs font-semibold text-gray-500 dark:text-gray-400"
                          >
                            @if (post.attributes.company) {
                              <span
                                >Company: {{ post.attributes.company }}</span
                              >
                            }
                            @if (post.attributes.timePeriod) {
                              <span
                                >Timeframe:
                                {{ post.attributes.timePeriod }}</span
                              >
                            }
                          </div>
                        }
                        @let toolChipsDeferred =
                          (post.attributes.tools ?? '')
                          .split(',')
                          .map((tool) => tool.trim())
                          .filter((tool) => tool);
                        @if (toolChipsDeferred.length) {
                          <div class="flex flex-wrap gap-2 mt-3">
                            @for (tool of toolChipsDeferred; track tool) {
                              <span
                                class="text-[11px] font-semibold px-3 py-1 rounded-full border border-violet-200 text-violet-700 dark:border-violet-700 dark:text-violet-300"
                              >
                                {{ tool }}
                              </span>
                            }
                          </div>
                        }
                      </div>
                    </div>
                  </a>
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
              [attr.aria-label]="'Load ' + remainingCount() + ' more projects'"
            >
              Load {{ remainingCount() }} more
            </button>
            <span class="post-count">
              Showing {{ visibleProjects().length }} of
              {{ filteredProjects().length }}
            </span>
          </div>
        }
        @if (!hasMore() && filteredProjects().length > 0) {
          <p class="all-loaded">All projects loaded</p>
        }
      </div>
    </section>
  `,
})
export default class ProjectsPage {
  private readonly contentService = inject(ContentService);
  readonly allProjects = this.contentService.projectsContentFn;
  readonly normalizeSlug = normalizeSlug;

  readonly selectedTool = signal<string>('All');
  availableTools: string[] = [];
  private readonly visibleCount = signal(PORTFOLIO_PAGE_SIZE);

  readonly filteredProjects = computed(() => {
    const tool = this.selectedTool();
    const projects = this.allProjects();
    if (tool === 'All') {
      return projects;
    }
    return projects.filter((project) => {
      const tools = project.attributes.tools
        ?.split(',')
        .map((toolName) => toolName.trim());
      return tools?.includes(tool);
    });
  });

  readonly visibleProjects = computed(() =>
    this.filteredProjects().slice(0, this.visibleCount()),
  );
  readonly hasMore = computed(
    () => this.visibleCount() < this.filteredProjects().length,
  );
  readonly remainingCount = computed(() => {
    const remaining = this.filteredProjects().length - this.visibleCount();
    return Math.max(0, Math.min(PORTFOLIO_PAGE_SIZE, remaining));
  });

  constructor() {
    effect(() => {
      const toolsSet = new Set<string>();
      this.allProjects().forEach((project) => {
        if (project.attributes.tools) {
          project.attributes.tools.split(',').forEach((tool) => {
            toolsSet.add(tool.trim());
          });
        }
      });
      this.availableTools = Array.from(toolsSet);
    });

    effect(() => {
      this.selectedTool();
      this.visibleCount.set(PORTFOLIO_PAGE_SIZE);
    });
  }

  filterProjects(tool: string): void {
    this.selectedTool.set(tool);
  }

  loadMore(): void {
    this.visibleCount.update((count) =>
      Math.min(count + PORTFOLIO_PAGE_SIZE, this.filteredProjects().length),
    );
  }
}
