export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  date?: string;
  previousPost?: string;
  nextPost?: string;
}
