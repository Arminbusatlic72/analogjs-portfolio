import { Injectable } from '@angular/core';
import { ContentFile, injectContentFiles } from '@analogjs/content';

import { Project } from '../models/project';
import { BlogPost } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  readonly projectsContentFn = prioritizeProject(
    injectContentFiles<Project>((contentFile) =>
      contentFile.filename.includes('/src/content/projects/'),
    ),
    'dna-sandbox',
  );
  readonly postsContentFn = injectContentFiles<BlogPost>((contentFile) =>
    contentFile.filename.includes('/src/content/blog/'),
  );
}

function prioritizeProject(
  projects: ContentFile<Project>[],
  slug: string,
): ContentFile<Project>[] {
  const ordered = [...projects];
  const targetIndex = ordered.findIndex(
    (project) => project.attributes.slug === slug,
  );
  if (targetIndex > 0) {
    const [match] = ordered.splice(targetIndex, 1);
    ordered.unshift(match);
  }
  return ordered;
}
