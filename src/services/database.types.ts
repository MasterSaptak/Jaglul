export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ProfileRole = 'viewer' | 'editor' | 'admin' | 'super_admin';
export type PostVisibility = 'draft' | 'published' | 'archived';
export type VisionStatus = 'draft' | 'published' | 'archived';
export type MediaType = 'image' | 'video';

export type PostReactions = {
  like: number;
  inspire: number;
  support: number;
};

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          role: ProfileRole;
          created_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: ProfileRole;
          created_at?: string;
        };
        Update: {
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: ProfileRole;
          created_at?: string;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          id: string;
          type: string;
          title: string | null;
          caption: string | null;
          description: string | null;
          theme: string | null;
          category: string | null;
          tags: string[] | null;
          author: string | null;
          slug: string;
          is_pinned: boolean;
          is_featured: boolean;
          visibility: PostVisibility;
          reactions: PostReactions | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
          scheduled_at: string | null;
          published_at: string | null;
          content_format: string | null;
          meta_title: string | null;
          meta_description: string | null;
          og_image: string | null;
          canonical_url: string | null;
          featured_image_id: string | null;
          view_count: number | null;
        };
        Insert: {
          id?: string;
          type: string;
          title?: string | null;
          caption?: string | null;
          description?: string | null;
          theme?: string | null;
          category?: string | null;
          tags?: string[] | null;
          author?: string | null;
          slug: string;
          is_pinned?: boolean;
          is_featured?: boolean;
          visibility?: PostVisibility;
          reactions?: PostReactions | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
          scheduled_at?: string | null;
          published_at?: string | null;
          content_format?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          og_image?: string | null;
          canonical_url?: string | null;
          featured_image_id?: string | null;
          view_count?: number | null;
        };
        Update: {
          type?: string;
          title?: string | null;
          caption?: string | null;
          description?: string | null;
          theme?: string | null;
          category?: string | null;
          tags?: string[] | null;
          author?: string | null;
          slug?: string;
          is_pinned?: boolean;
          is_featured?: boolean;
          visibility?: PostVisibility;
          reactions?: PostReactions | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
          scheduled_at?: string | null;
          published_at?: string | null;
          content_format?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          og_image?: string | null;
          canonical_url?: string | null;
          featured_image_id?: string | null;
          view_count?: number | null;
        };
        Relationships: [];
      };
      media: {
        Row: {
          id: string;
          post_id: string | null;
          type: MediaType;
          url: string;
          bucket: string | null;
          storage_path: string | null;
          thumbnail: string | null;
          alt: string | null;
          uploaded_at: string;
          caption: string | null;
          credits: string | null;
          sort_order: number | null;
          file_size: number | null;
          width: number | null;
          height: number | null;
          mime_type: string | null;
        };
        Insert: {
          id?: string;
          post_id?: string | null;
          type: MediaType;
          url: string;
          bucket?: string | null;
          storage_path?: string | null;
          thumbnail?: string | null;
          alt?: string | null;
          uploaded_at?: string;
          caption?: string | null;
          credits?: string | null;
          sort_order?: number | null;
          file_size?: number | null;
          width?: number | null;
          height?: number | null;
          mime_type?: string | null;
        };
        Update: {
          post_id?: string | null;
          type?: MediaType;
          url?: string;
          bucket?: string | null;
          storage_path?: string | null;
          thumbnail?: string | null;
          alt?: string | null;
          uploaded_at?: string;
          caption?: string | null;
          credits?: string | null;
          sort_order?: number | null;
          file_size?: number | null;
          width?: number | null;
          height?: number | null;
          mime_type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'media_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
        ];
      };
      videos: {
        Row: {
          id: string;
          title: string;
          youtube_id: string;
          thumbnail: string;
          is_featured: boolean;
          order_index: number;
          created_at: string;
          description: string | null;
          category: string | null;
          vision_id: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          youtube_id: string;
          thumbnail: string;
          is_featured?: boolean;
          order_index?: number;
          created_at?: string;
          description?: string | null;
          category?: string | null;
          vision_id?: string | null;
        };
        Update: {
          title?: string;
          youtube_id?: string;
          thumbnail?: string;
          is_featured?: boolean;
          order_index?: number;
          created_at?: string;
          description?: string | null;
          category?: string | null;
          vision_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'videos_vision_id_fkey';
            columns: ['vision_id'];
            isOneToOne: false;
            referencedRelation: 'visions';
            referencedColumns: ['id'];
          },
        ];
      };
      visions: {
        Row: {
          id: string;
          title: string;
          slug: string;
          short_description: string | null;
          full_description: string | null;
          cover_image: string | null;
          banner_image: string | null;
          featured_video_url: string | null;
          status: VisionStatus;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          short_description?: string | null;
          full_description?: string | null;
          cover_image?: string | null;
          banner_image?: string | null;
          featured_video_url?: string | null;
          status?: VisionStatus;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          slug?: string;
          short_description?: string | null;
          full_description?: string | null;
          cover_image?: string | null;
          banner_image?: string | null;
          featured_video_url?: string | null;
          status?: VisionStatus;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      content_visibility: {
        Row: {
          id: string;
          content_type: string;
          content_id: string;
          location: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          content_type: string;
          content_id: string;
          location: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          content_type?: string;
          content_id?: string;
          location?: string;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      post_visions: {
        Row: {
          post_id: string;
          vision_id: string;
          created_at: string;
        };
        Insert: {
          post_id: string;
          vision_id: string;
          created_at?: string;
        };
        Update: {
          post_id?: string;
          vision_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'post_visions_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'post_visions_vision_id_fkey';
            columns: ['vision_id'];
            isOneToOne: false;
            referencedRelation: 'visions';
            referencedColumns: ['id'];
          },
        ];
      };
      documents: {
        Row: {
          id: string;
          post_id: string | null;
          name: string;
          file_url: string;
          storage_path: string | null;
          file_type: string | null;
          file_size: number | null;
          uploaded_at: string;
        };
        Insert: {
          id?: string;
          post_id?: string | null;
          name: string;
          file_url: string;
          storage_path?: string | null;
          file_type?: string | null;
          file_size?: number | null;
          uploaded_at?: string;
        };
        Update: {
          post_id?: string | null;
          name?: string;
          file_url?: string;
          storage_path?: string | null;
          file_type?: string | null;
          file_size?: number | null;
          uploaded_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'documents_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
        ];
      };
      comments: {
        Row: {
          id: string;
          post_id: string | null;
          name: string;
          email: string | null;
          content: string;
          is_approved: boolean;
          is_author: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id?: string | null;
          name: string;
          email?: string | null;
          content: string;
          is_approved?: boolean;
          is_author?: boolean;
          created_at?: string;
        };
        Update: {
          post_id?: string | null;
          name?: string;
          email?: string | null;
          content?: string;
          is_approved?: boolean;
          is_author?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'comments_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
        ];
      };
      contact_submissions: {
        Row: {
          id: string;
          full_name: string;
          phone: string;
          email: string | null;
          reason: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          phone: string;
          email?: string | null;
          reason: string;
          message: string;
          created_at?: string;
        };
        Update: {
          full_name?: string;
          phone?: string;
          email?: string | null;
          reason?: string;
          message?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
  };
}
