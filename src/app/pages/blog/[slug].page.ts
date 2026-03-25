import { MarkdownComponent, injectContent } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
// import { LikeDislikeComponent } from '../../../components/like-dislike/like-dislike.component';

import { AsyncPipe, NgOptimizedImage, IMAGE_CONFIG } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BlogPost } from 'src/app/models/post';
import { blogTitleResolver, blogMetaResolver } from '../../resolvers/resolver';

export const routeMeta: RouteMeta = {
  title: blogTitleResolver,
  meta: blogMetaResolver,
};

@Component({
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe, RouterLink, NgOptimizedImage],
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
        class="mb-4 flex w-full flex-auto flex-row justify-between gap-4 text-gray-600 dark:text-gray-300"
      >
        <div class="flex items-center justify-between w-full px-6">
          <div class="w-28 text-left">
            @if (post.attributes.previousPost) {
              <button
                [routerLink]="['/blog', post.attributes.previousPost]"
                class="btn btn-accent w-28 flex items-center justify-start"
                type="button"
              >
                &#8592;
                <span class="ml-2 arrow-left">Previous</span>
              </button>
            }
          </div>

          <div class="flex-1 text-center">
            <p class="text-lg text-black dark:text-white">
              <strong>Blog post</strong>
            </p>
          </div>

          <div class="w-28 text-left">
            @if (post.attributes.nextPost) {
              <button
                [routerLink]="['/blog', post.attributes.nextPost]"
                class="btn btn-accent w-28 flex items-center justify-end"
                type="button"
              >
                <span class="mr-2 arrow-right">Next</span>
                &#8594;
              </button>
            }
          </div>
        </div>
      </section>

      <section class="text-gray-600 body-font p-5">
        <div
          class="container px-5 sm:px-24 pb-24 mx-auto rounded-2xl bg-slate-100 shadow-violet-950 border border-gray-200 dark:text-gray-300 dark:bg-gray-900 relative z-[1000]"
        >
          <div class="max-w-3xl mx-auto">
            <div class="py-4">
              <h2
                class="text-4xl md:text-4xl lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 text-left dark:text-gray-300"
              >
                {{ post.attributes.title }}
              </h2>
              <p class="text-md mb-4 text-gray-600 dark:text-gray-200">
                {{ post.attributes.description || '' }}
              </p>
              @if (post.attributes.date) {
                <p class="text-md text-gray-500">
                  Published on
                  <time
                    [attr.datetime]="post.attributes.date | date: 'yyyy-MM-dd'"
                  >
                    {{ post.attributes.date | date: 'MMMM d, yyyy' }}
                  </time>
                </p>
              }
            </div>

            <img
              class="w-full h-auto mb-8"
              [ngSrc]="post.attributes.coverImage || '/blog/default-image.png'"
              alt="{{ post.attributes.title }}"
              loading="lazy"
              width="1000"
              height="460"
              sizes="(max-width: 640px) 100vw, 50vw"
            />

            <article
              class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto"
            >
              <analog-markdown
                [content]="post.content"
                class="markdown-content"
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
}
