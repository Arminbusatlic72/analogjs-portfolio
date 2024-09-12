import { MarkdownComponent, injectContent } from '@analogjs/content';
import {
  AsyncPipe,
  NgIf,
  NgOptimizedImage,
  IMAGE_CONFIG,
} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BlogPost } from 'src/app/models/post';

@Component({
  standalone: true,
  imports: [MarkdownComponent, NgIf, AsyncPipe, RouterLink, NgOptimizedImage],
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
        <div class="flex justify-between w-full items-center">
          <button
            *ngIf="post.attributes.nextPost"
            [routerLink]="['/blog', post.attributes.nextPost]"
            class="btn btn-accent w-28"
            type="button"
          >
            Next
          </button>
          <div class="flex-1 text-right">
            <button
              *ngIf="post.attributes.previousPost"
              [routerLink]="['/blog', post.attributes.previousPost]"
              class="btn btn-accent w-28"
              type="button"
            >
              Previous
            </button>
          </div>
        </div>
      </section>

      <section class="text-gray-600 body-font p-5">
        <div
          class="container px-5 sm:px-24 pb-24 mx-auto  rounded-2xl bg-slate-100 shadow-violet-950 border-gray-200 dark:text-gray-300 dark:bg-gray-900 relative z-[1000]"
        >
          <div class="max-w-full sm:max-w-3xl mx-auto">
            <div class="py-4">
              <h2
                class="text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 text-left dark:text-gray-300"
              >
                {{ post.attributes.title }}
              </h2>
              <p class="text-gray-500 text-sm text-left">
                Published on <time datetime="2022-04-05">April 5, 2022</time>
              </p>
            </div>

            <img
              class="w-full h-auto mb-8"
              [ngSrc]="post.attributes.coverImage"
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
    </div>
  `,
})
export default class BlogPostPage {
  post$ = injectContent<BlogPost>({
    param: 'slug',
    subdirectory: 'blog',
  });

  constructor() {
    this.post$.subscribe((post) => {
      console.log(post);
    });
  }
}
