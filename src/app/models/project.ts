export interface Project {
  title: string;
  date: string;
  timePeriod: string;
  technology: string;
  company: string;
  projectType?: string;
  status?: string;
  featuredImage?: string;
  projectImage?: string;
  projectImageSec?: string;
  slug: string;
  order?: number;
  link: string;
  linkLabel?: string;
  description: string;
  tools?: string;
  githublink?: string;
  previousProject?: string;
  nextProject?: string;
}
