import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ContentService } from '../../services/content.service';
import { normalizeSlug } from '../../utils/slug';
import { projectContributions } from '../../data/project-contributions';

const PORTFOLIO_PAGE_SIZE = 6;
const FEATURED_PROJECT_SLUGS = new Set([
  'dna-sandbox',
  'kriz-winery-next-sanity',
  'basiqdental',
  'royalswinkels',
  'contract-analyzer',
]);

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FormsModule],
  styleUrls: ['./portfolio-load-more.styles.scss'],
  template: `
    <section class="work-page context">
      <h2 class="page-title page-frame"><span>02 / Work index</span> Selected systems, shipped.</h2>
      <div class="work-index page-frame">
        <div class="work-toolbar">
          <div>
            <h3 class="work-intro-title">Real work across product interfaces, AI integration, commerce, and content.</h3>
            <p>Five detailed case studies lead the collection. The full archive remains available below.</p>
          </div>
          <div>
            <label for="tool-select">Filter by technology</label>
            <select id="tool-select" [ngModel]="selectedTool()" (ngModelChange)="filterProjects($event)" class="tool-select">
              <option value="All">All Tools</option>
              @for (tool of availableTools; track tool) { <option [value]="tool">{{ tool }}</option> }
            </select>
          </div>
        </div>

        @if (featuredProjects().length) {
          <section class="featured-work" aria-labelledby="featured-heading">
            <div class="tier-heading"><p>Priority 01</p><h3 id="featured-heading">Featured case studies</h3><span>{{ featuredProjects().length }} projects</span></div>
            <div class="featured-grid">
              @for (post of featuredProjects(); track post.attributes.slug; let i = $index) {
                <article class="featured-card" [class.featured-card-lead]="i === 0">
                  <a [routerLink]="['/portfolio/', normalizeSlug(post.attributes.slug)]">
                    <div class="featured-card-index">0{{ i + 1 }} / Case study <span>Read ↗</span></div>
                    @if (post.attributes.featuredImage) {
                      <figure class="featured-card-media">
                        <img
                          [src]="post.attributes.featuredImage"
                          [alt]="post.attributes.title + ' project preview'"
                          loading="lazy"
                          decoding="async"
                        />
                      </figure>
                    }
                    <div class="featured-card-body">
                      <div>
                        <p class="featured-company">{{ post.attributes.company }} · {{ post.attributes.timePeriod }}</p>
                        <h4>{{ post.attributes.title }}</h4>
                      </div>
                      <p>{{ post.attributes.description }}</p>
                    </div>
                    @let featuredTools = (post.attributes.tools ?? '').split(',').map((tool) => tool.trim()).filter((tool) => tool);
                    <div class="featured-tools">
                      @for (tool of featuredTools.slice(0, 7); track tool) { <span>{{ tool }}</span> }
                    </div>
                  </a>
                </article>
              }
            </div>
          </section>
        }

        @if (moreProjects().length) {
          <section class="more-work" aria-labelledby="more-work-heading">
            <div class="tier-heading"><p>Archive 02</p><h3 id="more-work-heading">More work</h3><span>{{ moreProjects().length }} matching</span></div>
            <div class="more-work-grid">
              @for (post of visibleMoreProjects(); track post.attributes.slug) {
                <article class="more-work-card">
                  <a [routerLink]="['/portfolio/', normalizeSlug(post.attributes.slug)]">
                    <div class="more-work-top"><span>{{ post.attributes.company }}</span><span>{{ post.attributes.timePeriod }}</span></div>
                    @if (post.attributes.featuredImage) {
                      <figure class="more-work-media">
                        <img
                          [src]="post.attributes.featuredImage"
                          [alt]="post.attributes.title + ' project preview'"
                          loading="lazy"
                          decoding="async"
                        />
                      </figure>
                    }
                    <h4>{{ post.attributes.title }}</h4>
                    <p class="more-work-contribution"><span>My contribution</span>{{ projectContributions[post.attributes.slug] }}</p>
                    <div class="more-work-stack"><span>{{ post.attributes.technology }}</span><b aria-hidden="true">↗</b></div>
                  </a>
                </article>
              }
            </div>
            @if (hasMore()) {
              <div class="load-more-container">
                <button type="button" class="load-more-btn" (click)="loadMore()" [attr.aria-label]="'Load ' + remainingCount() + ' more projects'">Load {{ remainingCount() }} more</button>
                <span class="post-count">Showing {{ visibleMoreProjects().length }} of {{ moreProjects().length }}</span>
              </div>
            }
          </section>
        }

        @if (!featuredProjects().length && !moreProjects().length) {
          <p class="work-empty">No projects use this technology yet.</p>
        }
      </div>
    </section>
  `,
})
export default class ProjectsPage {
  private readonly contentService = inject(ContentService);
  readonly allProjects = this.contentService.projectsContentFn;
  readonly normalizeSlug = normalizeSlug;
  readonly projectContributions = projectContributions;
  readonly selectedTool = signal('All');
  private readonly visibleCount = signal(PORTFOLIO_PAGE_SIZE);
  availableTools: string[] = [];

  readonly filteredProjects = computed(() => {
    const selected = this.selectedTool();
    if (selected === 'All') return this.allProjects();
    return this.allProjects().filter((project) =>
      project.attributes.tools?.split(',').map((tool) => tool.trim()).includes(selected),
    );
  });

  readonly featuredProjects = computed(() =>
    this.filteredProjects().filter((project) => FEATURED_PROJECT_SLUGS.has(project.attributes.slug)),
  );
  readonly moreProjects = computed(() =>
    this.filteredProjects().filter((project) => !FEATURED_PROJECT_SLUGS.has(project.attributes.slug)),
  );
  readonly visibleMoreProjects = computed(() => this.moreProjects().slice(0, this.visibleCount()));
  readonly hasMore = computed(() => this.visibleCount() < this.moreProjects().length);
  readonly remainingCount = computed(() => Math.max(0, Math.min(PORTFOLIO_PAGE_SIZE, this.moreProjects().length - this.visibleCount())));

  constructor() {
    effect(() => {
      const tools = new Set<string>();
      this.allProjects().forEach((project) => project.attributes.tools?.split(',').forEach((tool) => tools.add(tool.trim())));
      this.availableTools = Array.from(tools).sort();
    });
    effect(() => { this.selectedTool(); this.visibleCount.set(PORTFOLIO_PAGE_SIZE); });
  }

  filterProjects(tool: string): void { this.selectedTool.set(tool); }
  loadMore(): void { this.visibleCount.update((count) => Math.min(count + PORTFOLIO_PAGE_SIZE, this.moreProjects().length)); }
}
