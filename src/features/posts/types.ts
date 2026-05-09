export type PostType = "news" | "event" | "gallery" | "announcement" | "achievement" | "video";

export type PostVisibility = "draft" | "published" | "archived";

export interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  alt?: string;
  thumbnail?: string;
  uploadedAt: string;
}

export interface LinkItem {
  id: string;
  url: string;
  title: string;
  type?: string;
}

export interface Post {
  id: string;
  type: PostType;
  title?: string;
  caption?: string;
  description?: string;
  media: MediaItem[];
  links?: LinkItem[];
  category?: string;
  theme?: string;
  tags?: string[];
  author: string;
  createdAt: string;
  updatedAt?: string;
  visibility: PostVisibility;
  isPinned?: boolean;
  isFeatured?: boolean;
  reactions: {
    like: number;
    inspire: number;
    support: number;
  };
  slug: string;
}
