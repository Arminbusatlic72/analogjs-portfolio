import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ContentService } from '../../services/content.service';
import { normalizeSlug } from '../../utils/slug';
import { responsiveImageSrcset, responsiveImageUrl } from '../../utils/responsive-image';

const BLOG_PAGE_SIZE = 6;
const BLOG_CARD_WIDTHS = [400, 700, 900] as const;
const RESPONSIVE_BLOG_COVERS = new Set([
  '/blog/analog-angular-update.webp',
  '/blog/analog-zoneless-bundle-optimization.webp',
  '/blog/PaaS-For-Your-SaaS.png',
  '/blog/analogjs-performance-after-zoneless.webp',
]);

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, RouterLink, NgOptimizedImage],
  styleUrls: ['./blog-load-more.styles.scss'],
  template: `
    <main class="blog-archive">
      <header class="blog-archive-header page-frame">
        <p class="eyebrow">Notes / Frontend engineering</p>
        <h1>Ideas tested in<br /><em>working software.</em></h1>
        <div class="blog-archive-intro">
          <p>Practical notes on Angular, React, rendering, state, AI product integration, and the decisions behind maintainable frontend systems.</p>
          <div class="blog-author">
            <img src="/arminAvatarSmall.webp" alt="" width="80" height="80" />
            <div><strong>Written by Armin</strong><span>{{ allPosts().length }} published notes</span></div>
          </div>
        </div>
      </header>

      <section class="page-frame" aria-labelledby="articles-heading">
        <div class="blog-list-heading"><p>01 / Archive</p><h2 id="articles-heading">Latest writing</h2></div>
        <div class="article-grid">
          @for (post of visiblePosts(); track post.attributes.slug; let i = $index) {
            <article class="article-card" [class.article-card-lead]="i === 0">
              <a [routerLink]="['/blog/', normalizeSlug(post.attributes.slug)]">
                <figure>
                  <picture>
                    @if (responsiveBlogImageSrcset(post.attributes.coverImage); as srcset) {
                      <source
                        type="image/webp"
                        [attr.srcset]="srcset"
                        sizes="(max-width: 760px) calc(100vw - 28px), (max-width: 1440px) 45vw, 650px"
                      />
                    }
                    <img
                      [ngSrc]="blogCardImageUrl(post.attributes.coverImage)"
                      alt="{{ post.attributes.title }}"
                      width="900"
                      height="520"
                      [priority]="i === 0"
                    />
                  </picture>
                  <span>Read note ↗</span>
                </figure>
                <div class="article-card-content">
                  <div class="article-meta"><span>Frontend note</span><time>{{ post.attributes.date ? (post.attributes.date | date: 'MMMM d, yyyy') : 'Date pending' }}</time></div>
                  <h3>{{ post.attributes.title }}</h3>
                  <p>{{ post.attributes.description }}</p>
                </div>
              </a>
            </article>
          }
        </div>
        @if (hasMore()) {
          <div class="load-more-container">
            <button type="button" class="load-more-btn" (click)="loadMore()" [attr.aria-label]="'Load ' + remainingCount() + ' more posts'">Load {{ remainingCount() }} more</button>
            <span class="post-count">Showing {{ visiblePosts().length }} of {{ allPosts().length }}</span>
          </div>
        }
      </section>
    </main>
  `,
})
export default class BlogPage {
  private readonly contentService = inject(ContentService);
  readonly allPosts = this.contentService.postsContentFn;
  private readonly visibleCount = signal(BLOG_PAGE_SIZE);
  readonly visiblePosts = computed(() => this.allPosts().slice(0, this.visibleCount()));
  readonly hasMore = computed(() => this.visibleCount() < this.allPosts().length);
  readonly remainingCount = computed(() => Math.max(0, Math.min(BLOG_PAGE_SIZE, this.allPosts().length - this.visibleCount())));
  readonly normalizeSlug = normalizeSlug;

  responsiveBlogImageSrcset(source: string): string | null {
    return RESPONSIVE_BLOG_COVERS.has(source)
      ? responsiveImageSrcset(source, BLOG_CARD_WIDTHS)
      : null;
  }

  blogCardImageUrl(source: string): string {
    return RESPONSIVE_BLOG_COVERS.has(source)
      ? responsiveImageUrl(source, 700)
      : source;
  }

  loadMore(): void { this.visibleCount.update((count) => Math.min(count + BLOG_PAGE_SIZE, this.allPosts().length)); }
}
