import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials missing. ' +
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local'
  );
}

// Typed database schema
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          role: 'viewer' | 'editor' | 'admin' | 'super_admin';
          created_at: string;
        };
        Insert: Partial<Database['public']['Tables']['profiles']['Row']> & { id: string };
        Update: Partial<Database['public']['Tables']['profiles']['Row']>;
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
          visibility: 'draft' | 'published' | 'archived';
          reactions: { like: number; inspire: number; support: number };
          created_by: string | null;
          created_at: string;
          updated_at: string;
          media?: Database['public']['Tables']['media']['Row'][];
        };
        Insert: Omit<Database['public']['Tables']['posts']['Row'], 'id' | 'created_at' | 'updated_at' | 'search_vector' | 'media'>;
        Update: Partial<Database['public']['Tables']['posts']['Insert']>;
      };
      media: {
        Row: {
          id: string;
          post_id: string | null;
          type: 'image' | 'video';
          url: string;
          bucket: string;
          storage_path: string | null;
          thumbnail: string | null;
          alt: string | null;
          uploaded_at: string;
        };
        Insert: Omit<Database['public']['Tables']['media']['Row'], 'id' | 'uploaded_at'>;
        Update: Partial<Database['public']['Tables']['media']['Insert']>;
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
        Insert: Omit<Database['public']['Tables']['comments']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['comments']['Insert']>;
      };
    };
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
  };
};

export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// ─── Helpers ──────────────────────────────────────────────────────

/** Check if the current session user has admin role */
export async function checkIsAdmin(): Promise<boolean> {
  const { data } = await supabase.rpc('is_admin');
  return data === true;
}

/** Generate a Supabase Storage public URL */
export function getStorageUrl(bucket: string, path: string): string {
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}

/** Upload a file to Supabase Storage, return public URL */
export async function uploadMedia(
  file: File,
  folder: string = 'posts'
): Promise<{ url: string; path: string } | null> {
  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { data, error } = await supabase.storage
    .from('media')
    .upload(fileName, file, { upsert: false });

  if (error || !data) {
    console.error('Upload error:', error);
    return null;
  }

  return {
    path: data.path,
    url: getStorageUrl('media', data.path),
  };
}
