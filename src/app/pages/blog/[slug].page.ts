import { MarkdownComponent, injectContent } from '@analogjs/content';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';

import { BlogPost } from 'src/app/models/post';

@Component({
  standalone: true,
  imports: [MarkdownComponent, NgIf, AsyncPipe],
  template: `
    <div *ngIf="post$ | async as post">
      <!-- Blog post with featured image -->

      <section class="text-gray-600 body-font p-5">
        <div
          class="container px-5 py-24 mx-auto my-24 rounded-2xl bg-slate-100 shadow-violet-950 border-gray-200 dark:text-gray-300 dark:bg-gray-900 relative z-[1000]"
        >
          <div class="max-w-full sm:max-w-3xl mx-auto">
            <!-- Adjust max-width for mobile -->
            <div class="py-8">
              <h2
                class="text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none my-6 md:my-12 text-center md:text-left dark:text-gray-300"
              >
                {{ post.attributes.title }}
              </h2>
              <p class="text-gray-500 text-sm text-center md:text-left">
                Published on <time datetime="2022-04-05">April 5, 2022</time>
              </p>
            </div>

            <img
              class="w-full h-auto mb-8"
              [src]="post.attributes.coverImage"
              alt="{{ post.attributes.title }}"
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
}
