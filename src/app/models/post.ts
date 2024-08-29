export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  previousPost?: string;
  nextPost?: string;
}
