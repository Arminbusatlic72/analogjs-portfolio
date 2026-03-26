import { effect, Injectable, signal } from '@angular/core';
import { ContentFile } from '@analogjs/content';
import { contentFilesResource } from '@analogjs/content/resources';

import { Project } from '../models/project';
import { BlogPost } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly projectsContentResource = contentFilesResource<Project>(
    (contentFile) => contentFile.filename.includes('src/content/projects/'),
  );
  private readonly postsContentResource = contentFilesResource<BlogPost>(
    (contentFile) => contentFile.filename.includes('src/content/blog/'),
  );

  private readonly projectsContentSignal = signal<ContentFile<Project>[]>([]);
  private readonly postsContentSignal = signal<ContentFile<BlogPost>[]>([]);

  readonly projectsContentFn = this.projectsContentSignal.asReadonly();
  readonly postsContentFn = this.postsContentSignal.asReadonly();

  constructor() {
    effect(() => {
      this.projectsContentSignal.set(
        prioritizeProject(
          this.projectsContentResource.value() ?? [],
          'dna-sandbox',
        ),
      );
    });

    effect(() => {
      this.postsContentSignal.set(this.postsContentResource.value() ?? []);
    });
  }

  getBlogNeighbors(slug: string) {
    return this.findNeighbors(this.postsContentSignal(), slug);
  }

  getProjectNeighbors(slug: string) {
    return this.findNeighbors(this.projectsContentSignal(), slug);
  }

  private findNeighbors(
    items: ContentFile<any>[],
    slug: string,
  ): NeighborNavigation {
    const normalizedSlug = slug ?? '';
    const index = items.findIndex(
      (item) => item.attributes.slug === normalizedSlug,
    );
    if (index === -1) {
      return {};
    }

    return {
      previous: index > 0 ? items[index - 1].attributes.slug : undefined,
      next:
        index < items.length - 1 ? items[index + 1].attributes.slug : undefined,
    };
  }
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

interface NeighborNavigation {
  previous?: string;
  next?: string;
}
