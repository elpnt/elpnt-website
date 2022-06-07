export interface Post {
  slug: string;
  content: string;
  data: {
    title: string;
    publishedAt: string;
    tags: string[];
  };
}
