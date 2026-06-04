import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, uploadMedia } from '../services/supabase';
import type { MediaItem } from '../features/posts/types';

interface MediaLibraryContextType {
  mediaFiles: MediaItem[];
  isLoading: boolean;
  uploadFiles: (files: File[]) => Promise<{ data: MediaItem[]; error: any }>;
  deleteMedia: (id: string) => Promise<{ error: any }>;
  updateMediaMetadata: (id: string, updates: Partial<MediaItem>) => Promise<{ error: any }>;
  bulkDelete: (ids: string[]) => Promise<{ error: any }>;
}

const MediaLibraryContext = createContext<MediaLibraryContextType | undefined>(undefined);

export const MediaLibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mediaFiles, setMediaFiles] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMedia();

    const subscription = supabase
      .channel('media_library_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'media' }, () => {
        fetchMedia();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchMedia = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error) {
      console.error('Error fetching media library:', error);
    } else if (data) {
      setMediaFiles(data.map(mapDbMediaToMediaItem));
    }
    setIsLoading(false);
  };

  const uploadFiles = async (files: File[]) => {
    const uploadedMedia: MediaItem[] = [];
    let uploadError = null;

    for (const file of files) {
      // 1. Upload to Storage
      const storageResult = await uploadMedia(file, 'library');
      if (!storageResult) {
        uploadError = new Error(`Failed to upload ${file.name}`);
        continue;
      }

      // 2. Determine type
      const isVideo = file.type.startsWith('video/');
      
      // 3. Insert record in 'media' table
      const { data, error } = await supabase
        .from('media')
        .insert([
          {
            type: isVideo ? 'video' : 'image',
            url: storageResult.url,
            bucket: 'Media',
            storage_path: storageResult.path,
            alt: file.name,
            file_size: file.size,
            mime_type: file.type,
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error inserting media record:', error);
        uploadError = error;
      } else if (data) {
        const newItem = mapDbMediaToMediaItem(data);
        uploadedMedia.push(newItem);
        setMediaFiles(prev => [newItem, ...prev]);
      }
    }

    return { data: uploadedMedia, error: uploadError };
  };

  const updateMediaMetadata = async (id: string, updates: Partial<MediaItem>) => {
    const dbUpdates: any = {};
    if (updates.alt !== undefined) dbUpdates.alt = updates.alt;
    if (updates.caption !== undefined) dbUpdates.caption = updates.caption;
    if (updates.credits !== undefined) dbUpdates.credits = updates.credits;
    if (updates.sortOrder !== undefined) dbUpdates.sort_order = updates.sortOrder;

    const { error } = await supabase
      .from('media')
      .update(dbUpdates)
      .eq('id', id);

    if (!error) {
      fetchMedia(); // refresh
    }
    return { error };
  };

  const deleteMedia = async (id: string) => {
    const media = mediaFiles.find(m => m.id === id);
    
    // Delete record from DB
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', id);

    if (error) return { error };

    // Optionally delete from Storage if storage_path exists
    if (media?.storagePath) {
       await supabase.storage.from('Media').remove([media.storagePath]);
    }

    setMediaFiles(prev => prev.filter(m => m.id !== id));
    return { error: null };
  };

  const bulkDelete = async (ids: string[]) => {
    const mediaToDelete = mediaFiles.filter(m => ids.includes(m.id));
    
    const { error } = await supabase
      .from('media')
      .delete()
      .in('id', ids);

    if (error) return { error };

    const pathsToDelete = mediaToDelete
      .map(m => m.storagePath)
      .filter((p): p is string => p !== undefined && p !== null);

    if (pathsToDelete.length > 0) {
      await supabase.storage.from('Media').remove(pathsToDelete);
    }

    setMediaFiles(prev => prev.filter(m => !ids.includes(m.id)));
    return { error: null };
  };

  return (
    <MediaLibraryContext.Provider value={{
      mediaFiles,
      isLoading,
      uploadFiles,
      deleteMedia,
      updateMediaMetadata,
      bulkDelete
    }}>
      {children}
    </MediaLibraryContext.Provider>
  );
};

export const useMediaLibrary = () => {
  const context = useContext(MediaLibraryContext);
  if (context === undefined) {
    throw new Error('useMediaLibrary must be used within a MediaLibraryProvider');
  }
  return context;
};

// Also expose this so PostsContext can use it when fetching joined media
export function mapDbMediaToMediaItem(dbMedia: any): MediaItem & { storagePath?: string } {
  return {
    id: dbMedia.id,
    type: dbMedia.type as "image" | "video",
    url: dbMedia.url,
    alt: dbMedia.alt || undefined,
    thumbnail: dbMedia.thumbnail || undefined,
    caption: dbMedia.caption || undefined,
    credits: dbMedia.credits || undefined,
    sortOrder: dbMedia.sort_order || 0,
    uploadedAt: dbMedia.uploaded_at,
    fileSize: dbMedia.file_size || undefined,
    width: dbMedia.width || undefined,
    height: dbMedia.height || undefined,
    mimeType: dbMedia.mime_type || undefined,
    storagePath: dbMedia.storage_path || undefined,
  };
}
