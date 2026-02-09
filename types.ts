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

export type PostCategory = 'News' | 'Event' | 'Humanitarian' | 'Op-Ed' | 'Policy';
export type PostTag = 'Humanitarian' | 'Public Dialogue' | 'Security & Policy' | 'Community Engagement' | 'Veterans Welfare';

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
