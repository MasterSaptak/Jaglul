import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const resolvedSupabaseUrl = supabaseUrl || 'https://placeholder.supabase.co';
const resolvedSupabaseAnonKey = supabaseAnonKey || 'placeholder-key';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials missing. ' +
      'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local'
  );
}

export const supabase = createClient<Database>(
  resolvedSupabaseUrl,
  resolvedSupabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: false,
      persistSession: true,
    },
  }
);

/** Check if the current session user has admin role. */
export async function checkIsAdmin(): Promise<boolean> {
  const { data } = await supabase.rpc('is_admin');
  return data === true;
}

/** Generate a Supabase Storage public URL. */
export function getStorageUrl(bucket: string, path: string): string {
  return `${resolvedSupabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}

/** Upload a file to Supabase Storage, return public URL. */
export async function uploadMedia(
  file: File,
  folder: string = 'posts'
): Promise<{ url: string; path: string } | null> {
  const ext = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { data, error } = await supabase.storage
    .from('Media')
    .upload(fileName, file, { upsert: false });

  if (error || !data) {
    console.error('Upload error:', error);
    return null;
  }

  return {
    path: data.path,
    url: getStorageUrl('Media', data.path),
  };
}
