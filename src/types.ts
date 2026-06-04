export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  youtube_id: string;
  is_featured: boolean;
  order_index: number;
  created_at: string;
  description?: string;
  category?: string;
  vision_id?: string;
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
