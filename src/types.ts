export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  date: string;
  youtubeId: string;
}

export interface Comment {
  id: string;
  postId: string;
  name: string;
  email: string;
  content: string;
  date: string;
  approved: boolean;
  replies?: CommentReply[];
}

export interface CommentReply {
  id: string;
  commentId: string;
  name: string;
  content: string;
  date: string;
  isAuthor?: boolean;
}

export type PostCategory = 'News' | 'Event' | 'Humanitarian' | 'Op-Ed' | 'Policy' | 'Civic' | 'Education';
export type PostTag =
  | 'Humanitarian'
  | 'Public Dialogue'
  | 'Security & Policy'
  | 'Community Engagement'
  | 'Veterans Welfare'
  | 'Civic Action & Rights'
  | 'Education & Youth'
  | 'Community Support';

// Thematic Focus Areas
export type ThematicArea = 'humanitarian' | 'education' | 'security' | 'veterans' | 'civic';

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: PostCategory;
  tags: PostTag[];
  thematicArea: ThematicArea; // Primary thematic area
  imageUrl: string;
  images?: string[]; // Additional images for gallery
  author: string;
  commentsEnabled: boolean;
  commentCount: number;
  // Event specific fields
  eventDetails?: {
    location: string;
    eventDate: string;
    organizer: string;
    role?: string;
    attendees?: number;
    outcome?: string;
  };
}

// Media Gallery Item
export interface MediaItem {
  id: string;
  postId?: string;
  imageUrl: string;
  caption: string;
  date: string;
  year: string;
  thematicArea: ThematicArea;
}

export interface VisionGalleryImage {
  id: string;
  url: string;
}

export interface VisionCategory {
  id: string;
  slug: string;
  title: string;
  description?: string;
  images: VisionGalleryImage[];
}

export type GalleryCategory = 'media' | 'vision' | 'uploaded';

export interface GalleryImage {
  id: string;
  src: string;
  caption: string;
  category: GalleryCategory;
  subCategory?: string; // thematicArea for media, vision slug for vision
  year?: string;
  date?: string;
  createdAt: number;
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  reason: string;
  contactPerson?: string;
  message: string;
}

export interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}
