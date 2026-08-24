import { MarkdownComponent, injectContent } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
// import { LikeDislikeComponent } from '../../../components/like-dislike/like-dislike.component';

import {
  AsyncPipe,
  NgOptimizedImage,
  IMAGE_CONFIG,
  CommonModule,
} from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';

import { BlogPost } from 'src/app/models/post';
import { blogTitleResolver, blogMetaResolver } from '../../resolvers/resolver';
import { ContentService } from '../../services/content.service';
import { normalizeSlug } from '../../utils/slug';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

export const routeMeta: RouteMeta = {
  title: blogTitleResolver,
  meta: blogMetaResolver,
};

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MarkdownComponent,
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
    @let post = post$ | async;
    @if (post) {
      <section
        class="detail-nav page-frame"
      >
        <div
          class="detail-nav-grid"
        >
          <div class="w-full sm:w-auto text-left">
            @if (navigation().previous) {
              <button
                [routerLink]="['/blog', normalizeSlug(navigation().previous)]"
                class="detail-nav-link"
                type="button"
              >
                &#8592;
                <span class="ml-2 arrow-left">Previous</span>
              </button>
            }
          </div>

          <div class="flex-1 text-center">
            <p class="detail-position">
              <strong>Engineering note</strong>
            </p>
          </div>

          <div class="w-full sm:w-auto text-right">
            @if (navigation().next) {
              <button
                [routerLink]="['/blog', normalizeSlug(navigation().next)]"
                class="detail-nav-link detail-nav-next"
                type="button"
              >
                <span class="mr-2 arrow-right">Next</span>
                &#8594;
              </button>
            }
          </div>
        </div>
      </section>
      <section class="detail-page blog-detail">
        <div
          class="detail-shell page-frame"
        >
          <div>
            <header class="detail-header blog-header">
              <p class="detail-kicker">Notes / Frontend engineering</p>
              <h2
                class="detail-title"
              >
                {{ post.attributes.title }}
              </h2>
              <p class="detail-dek">
                {{ post.attributes.description || '' }}
              </p>
              @if (post.attributes.date) {
                <p class="blog-date"><span>Published</span>
                  <time
                    [attr.datetime]="post.attributes.date | date: 'yyyy-MM-dd'"
                  >
                    {{ post.attributes.date | date: 'MMMM d, yyyy' }}
                  </time>
                </p>
              }
            </header>

            <div class="detail-media blog-media"><img
              [ngSrc]="post.attributes.coverImage || '/blog/default-image.png'"
              alt="{{ post.attributes.title }}"
              loading="lazy"
              width="1000"
              height="460"
              sizes="(max-width: 640px) 100vw, 50vw"
            /></div>

            <article class="detail-article">
              <analog-markdown
                [content]="post.content"
                class="markdown-content text-gray-600 body-font"
              />
            </article>
          </div>
        </div>
      </section>
    }
  `,
})
export default class BlogPostPage {
  post$ = injectContent<BlogPost>({
    param: 'slug',
    subdirectory: 'blog',
  });
  private readonly contentService = inject(ContentService);
  private readonly route = inject(ActivatedRoute);
  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { requireSync: true },
  );

  readonly navigation = computed(() => {
    const currentSlug = this.slug();
    return currentSlug ? this.contentService.getBlogNeighbors(currentSlug) : {};
  });
  readonly normalizeSlug = normalizeSlug;
}
