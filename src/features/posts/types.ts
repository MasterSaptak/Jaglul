export type PostType = "news" | "event" | "gallery" | "announcement" | "achievement" | "video" | "blog" | "activity";

export type PostVisibility = "draft" | "published" | "archived";
export type VisionStatus = "draft" | "published" | "archived";

export interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  alt?: string;
  thumbnail?: string;
  caption?: string;
  credits?: string;
  sortOrder?: number;
  uploadedAt: string;
  fileSize?: number;
  width?: number;
  height?: number;
  mimeType?: string;
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
  scheduledAt?: string;
  publishedAt?: string;
  contentFormat?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  featuredImageId?: string;
  viewCount?: number;
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

export interface Vision {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  fullDescription?: string;
  coverImage?: string;
  bannerImage?: string;
  featuredVideoUrl?: string;
  status: VisionStatus;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContentVisibility {
  id: string;
  contentType: 'post' | 'vision';
  contentId: string;
  location: string;
  sortOrder: number;
  createdAt: string;
}

export interface PostVision {
  postId: string;
  visionId: string;
  createdAt: string;
}

export interface DocumentItem {
  id: string;
  postId?: string;
  name: string;
  fileUrl: string;
  storagePath?: string;
  fileType?: string;
  fileSize?: number;
  uploadedAt: string;
}
