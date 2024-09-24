import { injectContentFiles } from '@analogjs/content';
import { MetaTag } from '@analogjs/router';

import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Project } from 'src/app/models/project';
import { BlogPost } from 'src/app/models/post';

function injectActiveBlogMetadata(route: ActivatedRouteSnapshot): BlogPost {
  const file = injectContentFiles<BlogPost>().find((contentFile) => {
    return contentFile.slug === route.params['slug'];
  });

  return file!.attributes;
}

export const blogTitleResolver: ResolveFn<string> = (route) =>
  injectActiveBlogMetadata(route).title;

// Resolver to set dynamic meta tags for the blog post
export const blogMetaResolver: ResolveFn<MetaTag[]> = (route) => {
  const blogMetadata = injectActiveBlogMetadata(route);

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

function injectActiveProjectMetadata(route: ActivatedRouteSnapshot): Project {
  const file = injectContentFiles<Project>().find((contentFile) => {
    return contentFile.slug === route.params['slug'];
  });

  return file!.attributes;
}

export const projectTitleResolver: ResolveFn<string> = (route) =>
  injectActiveProjectMetadata(route).title;

export const projectMetaResolver: ResolveFn<MetaTag[]> = (route) => {
  const projectMetadata = injectActiveProjectMetadata(route);

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
