import { Post, Video, Comment, MediaItem, VisionCategory } from './types';

export const ADMIN_PASSWORD = "admin"; // Simple for demo purposes

export const INITIAL_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Veterans Welfare: A Call for Unity',
    thumbnail: 'https://img.youtube.com/vi/wCzM4lGzVWU/hqdefault.jpg',
    date: 'Jan 15, 2026',
    youtubeId: 'wCzM4lGzVWU'
  },
  {
    id: '2',
    title: 'Reflections on 30 Years of Service',
    thumbnail: 'https://img.youtube.com/vi/wCzM4lGzVWU/hqdefault.jpg',
    date: 'Dec 16, 2025',
    youtubeId: 'wCzM4lGzVWU'
  },
  {
    id: '3',
    title: 'Independence Day Message 2025',
    thumbnail: 'https://img.youtube.com/vi/wCzM4lGzVWU/hqdefault.jpg',
    date: 'Mar 26, 2025',
    youtubeId: 'wCzM4lGzVWU'
  }
];

export const INITIAL_POSTS: Post[] = [];

// Sample approved comments for demonstration
export const INITIAL_COMMENTS: Comment[] = [];
export const MEDIA_GALLERY: MediaItem[] = [];

export const CONTACT_REASONS = [
  "Veterans Welfare Inquiry",
  "Media / Interview Request",
  "Event Invitation / Speaking Engagement",
  "Collaboration Proposal",
  "General Inquiry",
  "Other"
];

export const POST_CATEGORIES = ['All', 'News', 'Event', 'Humanitarian', 'Op-Ed', 'Policy'];
export const POST_TAGS = ['Humanitarian', 'Public Dialogue', 'Security & Policy', 'Community Engagement', 'Veterans Welfare'];
export const POST_YEARS = ['2026', '2025', '2024'];

// Thematic Area Configuration
export const THEMATIC_AREAS = {
  humanitarian: {
    id: 'humanitarian',
    title: 'Humanitarian Work',
    subtitle: 'Relief, Aid & Community Support',
    description: 'Organized relief efforts, charitable initiatives, and community support programs led by Colonel Ahsan.',
    icon: 'Heart',
    color: 'army-red'
  },
  education: {
    id: 'education',
    title: 'Education & Youth',
    subtitle: 'Leadership Development & Scholarships',
    description: 'Programs focused on youth empowerment, educational support, and developing future leaders.',
    icon: 'GraduationCap',
    color: 'army-gold'
  },
  security: {
    id: 'security',
    title: 'National Security & Policy',
    subtitle: 'Strategic Dialogue & Public Discourse',
    description: 'Expert commentary and public dialogue on national security, regional stability, and policy matters.',
    icon: 'Shield',
    color: 'army-navy'
  },
  veterans: {
    id: 'veterans',
    title: 'Veterans Welfare',
    subtitle: 'Support, Unity & Advocacy',
    description: 'Initiatives supporting retired military personnel through welfare programs, community building, and advocacy.',
    icon: 'Medal',
    color: 'army-green'
  },
  civic: {
    id: 'civic',
    title: 'Civic Action & Rights',
    subtitle: 'Awareness, Ethics & Public Responsibility',
    description: 'Civic awareness campaigns, ethical leadership advocacy, and public rights education.',
    icon: 'Scale',
    color: 'army-olive'
  }
};

export const VISION_GALLERIES: Record<string, VisionCategory> = {};
