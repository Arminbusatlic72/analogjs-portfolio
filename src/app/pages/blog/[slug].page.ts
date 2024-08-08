import { MarkdownComponent, injectContent } from '@analogjs/content';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';

import { BlogPost } from 'src/app/models/post';

@Component({
  standalone: true,
  imports: [MarkdownComponent, NgIf, AsyncPipe],
  template: `
    <div *ngIf="post$ | async as post">
      <h2>{{ post.attributes.title }}</h2>
      <article>
        <img class="post__image" [src]="post.attributes.coverImage" />
        <analog-markdown [content]="post.content" />
      </article>
    </div>
  `,
  styles: [
    `
      .post__image {
        margin: 0 auto;
        max-height: 40vh;
      }
    `,
  ],
})
export default class BlogPostPage {
  post$ = injectContent<BlogPost>({
    param: 'slug',
    subdirectory: 'blog',
  });
}
