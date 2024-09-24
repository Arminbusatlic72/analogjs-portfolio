import { Injectable } from '@angular/core';
import { injectContentFiles } from '@analogjs/content';

import { Project } from '../models/project';
import { BlogPost } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  readonly projectsContentFn = injectContentFiles<Project>((contentFile) =>
    contentFile.filename.includes('/src/content/projects/')
  );
  readonly postsContentFn = injectContentFiles<BlogPost>((contentFile) =>
    contentFile.filename.includes('/src/content/blog/')
  );
}
