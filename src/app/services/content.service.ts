import { computed, effect, Injectable, signal } from '@angular/core';
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

  private readonly postsContentSignal = signal<ContentFile<BlogPost>[]>([]);

  readonly allProjects = computed(() =>
    [...(this.projectsContentResource.value() ?? [])].sort(
      (a, b) => (a.attributes.order ?? 99) - (b.attributes.order ?? 99),
    ),
  );
  readonly projectsContentFn = this.allProjects;
  readonly postsContentFn = this.postsContentSignal.asReadonly();

  constructor() {
    effect(() => {
      this.postsContentSignal.set(this.postsContentResource.value() ?? []);
    });
  }

  getBlogNeighbors(slug: string) {
    return this.findNeighbors(this.postsContentSignal(), slug);
  }

  getProjectNeighbors(slug: string) {
    return this.findNeighbors(this.projectsContentFn(), slug);
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

interface NeighborNavigation {
  previous?: string;
  next?: string;
}
