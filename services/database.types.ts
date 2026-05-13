export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ProfileRole = 'viewer' | 'editor' | 'admin' | 'super_admin';
export type PostVisibility = 'draft' | 'published' | 'archived';
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
