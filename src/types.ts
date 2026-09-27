export type Category = 'Engineering' | 'Design' | 'Productivity' | 'AI' | 'Career';
export type SortKey = 'Latest' | 'Most Popular' | 'Trending';
export interface Author {
  id: string; name: string; role: string; avatar: string; bio: string;
  social: { twitter: string; github: string; linkedin: string };
}
export type Block =
  | { type: 'h' | 'p' | 'quote' | 'callout'; text: string }
  | { type: 'code'; text: string; lang: string }
  | { type: 'image'; src: string; caption: string };
export interface Post {
  id: number; title: string; excerpt: string; category: Category; authorId: string;
  cover: string; tags: string[]; readingTime: number; publishedAt: string;
  views: number; likes: number; content: Block[];
}
export interface Comment { id: number; name: string; text: string; date: string }
