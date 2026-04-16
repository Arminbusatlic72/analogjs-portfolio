import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ContentService } from '../services/content.service';
import {
  blogTitleResolver,
  blogMetaResolver,
  projectTitleResolver,
  projectMetaResolver,
} from './resolver';

// ── helpers ──────────────────────────────────────────────────────────────────

function makeRoute(slug: string): ActivatedRouteSnapshot {
  return { params: { slug } } as unknown as ActivatedRouteSnapshot;
}

function runResolver<T>(
  resolver: (route: ActivatedRouteSnapshot, state: any) => T,
  route: ActivatedRouteSnapshot,
  contentServiceMock: Partial<ContentService>,
): T {
  return TestBed.runInInjectionContext(() => {
    TestBed.overrideProvider(ContentService, { useValue: contentServiceMock });
    return resolver(route, {} as any);
  });
}

// ── shared fixtures ───────────────────────────────────────────────────────────

const blogFile = {
  attributes: {
    title: 'My Blog Post',
    slug: 'my-blog-post',
    description: 'A great post about Angular signals.',
    coverImage: '/blog/cover.png',
  },
  content: '<p>Body text that should not be used when description exists.</p>',
};

const projectFile = {
  attributes: {
    title: 'DNA Sandbox',
    slug: 'dna-sandbox',
    description: 'An AI-driven research studio.',
    projectImage: '/projects/dna-sandbox/featured.png',
  },
  content: '<p>Project body content.</p>',
};

// ── blog resolvers ─────────────────────────────────────────────────────────

describe('blogTitleResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('returns the post title when the slug matches', () => {
    const service = { postsContentFn: () => [blogFile] } as any;
    const title = runResolver(
      blogTitleResolver,
      makeRoute('my-blog-post'),
      service,
    );
    expect(title).toBe('My Blog Post');
  });

  it('falls back to "Blog Post" when slug is not found', () => {
    const service = { postsContentFn: () => [] } as any;
    const title = runResolver(blogTitleResolver, makeRoute('missing'), service);
    expect(title).toBe('Blog Post');
  });
});

describe('blogMetaResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('uses frontmatter description when present', () => {
    const service = { postsContentFn: () => [blogFile] } as any;
    const tags = runResolver(
      blogMetaResolver,
      makeRoute('my-blog-post'),
      service,
    ) as any[];
    const desc = tags.find((t) => t.name === 'description');
    expect(desc?.content).toBe('A great post about Angular signals.');
  });

  it('falls back to extracted body text when description is missing', () => {
    const noDesc = {
      attributes: { title: 'No Desc', slug: 'no-desc', coverImage: '' },
      content: '<p>Extracted from the body.</p>',
    };
    const service = { postsContentFn: () => [noDesc] } as any;
    const tags = runResolver(
      blogMetaResolver,
      makeRoute('no-desc'),
      service,
    ) as any[];
    const desc = tags.find((t) => t.name === 'description');
    expect(desc?.content).toBe('Extracted from the body.');
  });

  it('body description is truncated to 155 chars', () => {
    const longBody = {
      attributes: { title: 'Long', slug: 'long', coverImage: '' },
      content: '<p>' + 'x'.repeat(200) + '</p>',
    };
    const service = { postsContentFn: () => [longBody] } as any;
    const tags = runResolver(
      blogMetaResolver,
      makeRoute('long'),
      service,
    ) as any[];
    const desc = tags.find((t) => t.name === 'description');
    expect(desc?.content.length).toBeLessThanOrEqual(156); // 155 + ellipsis char
    expect(desc?.content).toMatch(/…$/);
  });

  it('returns default tags when slug is not found', () => {
    const service = { postsContentFn: () => [] } as any;
    const tags = runResolver(
      blogMetaResolver,
      makeRoute('missing'),
      service,
    ) as any[];
    const ogTitle = tags.find((t) => t.property === 'og:title');
    expect(ogTitle?.content).toBe('Blog Post');
  });

  it('sets og:image from coverImage', () => {
    const service = { postsContentFn: () => [blogFile] } as any;
    const tags = runResolver(
      blogMetaResolver,
      makeRoute('my-blog-post'),
      service,
    ) as any[];
    const ogImage = tags.find((t) => t.property === 'og:image');
    expect(ogImage?.content).toBe('/blog/cover.png');
  });
});

// ── project resolvers ──────────────────────────────────────────────────────

describe('projectTitleResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('returns the project title when the slug matches', () => {
    const service = { projectsContentFn: () => [projectFile] } as any;
    const title = runResolver(
      projectTitleResolver,
      makeRoute('dna-sandbox'),
      service,
    );
    expect(title).toBe('DNA Sandbox');
  });

  it('falls back to "Project" when slug is not found', () => {
    const service = { projectsContentFn: () => [] } as any;
    const title = runResolver(
      projectTitleResolver,
      makeRoute('missing'),
      service,
    );
    expect(title).toBe('Project');
  });
});

describe('projectMetaResolver', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('uses frontmatter description when present', () => {
    const service = { projectsContentFn: () => [projectFile] } as any;
    const tags = runResolver(
      projectMetaResolver,
      makeRoute('dna-sandbox'),
      service,
    ) as any[];
    const desc = tags.find((t) => t.name === 'description');
    expect(desc?.content).toBe('An AI-driven research studio.');
  });

  it('falls back to extracted body when description is missing', () => {
    const noDesc = {
      attributes: { title: 'No Desc', slug: 'no-desc', projectImage: '' },
      content: '<p>Body content for project.</p>',
    };
    const service = { projectsContentFn: () => [noDesc] } as any;
    const tags = runResolver(
      projectMetaResolver,
      makeRoute('no-desc'),
      service,
    ) as any[];
    const desc = tags.find((t) => t.name === 'description');
    expect(desc?.content).toBe('Body content for project.');
  });

  it('sets og:image from projectImage', () => {
    const service = { projectsContentFn: () => [projectFile] } as any;
    const tags = runResolver(
      projectMetaResolver,
      makeRoute('dna-sandbox'),
      service,
    ) as any[];
    const ogImage = tags.find((t) => t.property === 'og:image');
    expect(ogImage?.content).toBe('/projects/dna-sandbox/featured.png');
  });

  it('returns default tags when slug is not found', () => {
    const service = { projectsContentFn: () => [] } as any;
    const tags = runResolver(
      projectMetaResolver,
      makeRoute('missing'),
      service,
    ) as any[];
    const ogTitle = tags.find((t) => t.property === 'og:title');
    expect(ogTitle?.content).toBe('Project');
  });
});
