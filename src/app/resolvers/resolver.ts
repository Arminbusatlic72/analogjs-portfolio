import { MetaTag } from '@analogjs/router';
import { ContentFile } from '@analogjs/content';
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Project } from 'src/app/models/project';
import { BlogPost } from 'src/app/models/post';
import { ContentService } from '../services/content.service';

/** Strips HTML tags and collapses whitespace, then truncates to maxLength chars. */
function extractDescription(
  content: string | object | undefined,
  maxLength = 155,
): string {
  if (!content || typeof content !== 'string') return '';
  const text = content
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > maxLength
    ? text.slice(0, maxLength).trimEnd() + '…'
    : text;
}

function injectActiveBlogFile(route: {
  params: Record<string, string>;
}): ContentFile<BlogPost> | undefined {
  const contentService = inject(ContentService);
  return contentService
    .postsContentFn()
    .find((f) => f.attributes.slug === route.params['slug']);
}

export const blogTitleResolver: ResolveFn<string> = (route) => {
  const file = injectActiveBlogFile(route);
  return file?.attributes.title ?? 'Blog Post';
};

export const blogMetaResolver: ResolveFn<MetaTag[]> = (route) => {
  const file = injectActiveBlogFile(route);
  if (!file) {
    return [
      {
        name: 'description',
        content:
          'Insights on web development, Angular, and modern frontend technologies by Armin Busatlic.',
      },
      {
        name: 'author',
        content: 'Armin Busatlic',
      },
      {
        property: 'og:title',
        content: 'Blog Post',
      },
      {
        property: 'og:description',
        content:
          'Insights on web development, Angular, and modern frontend technologies by Armin Busatlic.',
      },
      {
        property: 'og:image',
        content: 'https://somepage.com/defaultimage.png',
      },
    ];
  }

  const description =
    file.attributes.description || extractDescription(file.content);

  return [
    {
      name: 'description',
      content: description,
    },
    {
      name: 'author',
      content: 'Armin Busatlic',
    },
    {
      property: 'og:title',
      content: file.attributes.title,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content:
        file.attributes.coverImage || 'https://somepage.com/defaultimage.png',
    },
  ];
};

function injectActiveProjectFile(route: {
  params: Record<string, string>;
}): ContentFile<Project> | undefined {
  const contentService = inject(ContentService);
  return contentService
    .projectsContentFn()
    .find((f) => f.attributes.slug === route.params['slug']);
}

export const projectTitleResolver: ResolveFn<string> = (route) => {
  const file = injectActiveProjectFile(route);
  return file?.attributes.title ?? 'Project';
};

export const projectMetaResolver: ResolveFn<MetaTag[]> = (route) => {
  const file = injectActiveProjectFile(route);
  if (!file) {
    return [
      {
        name: 'description',
        content:
          'Explore web development projects by Armin Busatlic — Angular apps, full-stack solutions, and creative digital experiences.',
      },
      {
        name: 'author',
        content: 'Armin Busatlic',
      },
      {
        property: 'og:title',
        content: 'Project',
      },
      {
        property: 'og:description',
        content:
          'Explore web development projects by Armin Busatlic — Angular apps, full-stack solutions, and creative digital experiences.',
      },
      {
        property: 'og:image',
        content: 'https://somepage.com/defaultimage.png',
      },
    ];
  }

  const description =
    file.attributes.description || extractDescription(file.content);

  return [
    {
      name: 'description',
      content: description,
    },
    {
      name: 'author',
      content: 'Armin Busatlic',
    },
    {
      property: 'og:title',
      content: file.attributes.title,
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content:
        file.attributes.projectImage || 'https://somepage.com/defaultimage.png',
    },
  ];
};
