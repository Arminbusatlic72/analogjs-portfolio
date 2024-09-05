export interface Project {
  title: string;
  date: string;
  technology: string;
  featuredImage: string;
  projectImage: string;
  projectImageSec?: string;
  slug: string;
  link: string;
  description: string;
  tools: string;
  githublink?: string;
  previousProject?: string;
  nextProject?: string;
}
