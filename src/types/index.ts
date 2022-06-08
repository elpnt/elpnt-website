export interface Meta {
  title: string;
  publishedAt: string;
  tags: string[];
}

export interface Post {
  slug: string;
  content: string;
  meta: Meta;
}
