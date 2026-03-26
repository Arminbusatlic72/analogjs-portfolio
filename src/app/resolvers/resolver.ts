import { MetaTag } from '@analogjs/router';

import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Project } from 'src/app/models/project';
import { BlogPost } from 'src/app/models/post';
import { ContentService } from '../services/content.service';

function injectActiveBlogMetadata(route: { params: Record<string, string> }) {
  const contentService = inject(ContentService);
  const posts = contentService.postsContentFn();
  const file = posts.find(
    (contentFile) => contentFile.attributes.slug === route.params['slug'],
  );

  return file?.attributes;
}

export const blogTitleResolver: ResolveFn<string> = (route) => {
  const blogMetadata = injectActiveBlogMetadata(route);
  return blogMetadata ? blogMetadata.title : 'Blog Post';
};

export const blogMetaResolver: ResolveFn<MetaTag[]> = (route) => {
  const blogMetadata = injectActiveBlogMetadata(route);
  if (!blogMetadata) {
    return [
      {
        name: 'description',
        content: 'Default description',
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
        content: 'Some catchy description',
      },
      {
        property: 'og:image',
        content: 'https://somepage.com/defaultimage.png',
      },
    ];
  }
  return [
    {
      name: 'description',
      content: blogMetadata.description || 'Default description',
    },
    {
      name: 'author',
      content: 'Armin Busatlic',
    },
    {
      property: 'og:title',
      content: blogMetadata.title,
    },
    {
      property: 'og:description',
      content: blogMetadata.description || 'Some catchy description',
    },
    {
      property: 'og:image',
      content:
        blogMetadata.coverImage || 'https://somepage.com/defaultimage.png',
    },
  ];
};

function injectActiveProjectMetadata(route: {
  params: Record<string, string>;
}) {
  const contentService = inject(ContentService);
  const projects = contentService.projectsContentFn();
  const file = projects.find(
    (contentFile) => contentFile.attributes.slug === route.params['slug'],
  );

  return file?.attributes;
}

export const projectTitleResolver: ResolveFn<string> = (route) => {
  const projectMetadata = injectActiveProjectMetadata(route);
  return projectMetadata ? projectMetadata.title : 'Project';
};

export const projectMetaResolver: ResolveFn<MetaTag[]> = (route) => {
  const projectMetadata = injectActiveProjectMetadata(route);
  if (!projectMetadata) {
    return [
      {
        name: 'description',
        content: 'Default description',
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
        content: 'Some catchy description',
      },
      {
        property: 'og:image',
        content: 'https://somepage.com/defaultimage.png',
      },
    ];
  }

  return [
    {
      name: 'description',
      content: projectMetadata.description || 'Default description',
    },
    {
      name: 'author',
      content: 'Armin Busatlic',
    },
    {
      property: 'og:title',
      content: projectMetadata.title,
    },
    {
      property: 'og:description',
      content: projectMetadata.description || 'Some catchy description',
    },
    {
      property: 'og:image',
      content:
        projectMetadata.projectImage || 'https://somepage.com/defaultimage.png',
    },
  ];
};
