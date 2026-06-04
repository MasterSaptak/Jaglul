import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../services/supabase';
import { Video } from '../types';

interface VideosContextType {
  videos: Video[];
  isLoading: boolean;
  addVideo: (url: string, title: string, description?: string, visionId?: string) => Promise<{ error: Error | null }>;
  deleteVideo: (id: string) => Promise<{ error: Error | null }>;
  updateVideo: (id: string, updates: Partial<Video>) => Promise<{ error: Error | null }>;
  toggleFeatured: (id: string) => Promise<{ error: Error | null }>;
  reorderVideos: (reorderedVideos: Video[]) => Promise<{ error: Error | null }>;
}

const VideosContext = createContext<VideosContextType | undefined>(undefined);

export const VideosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVideos = async () => {
    setIsLoading(true);
    const { data, error } = await (supabase as any)
      .from('videos')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false });

    if (!error && data) {
      setVideos(data as Video[]);
    } else {
      console.error('Error fetching videos:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVideos();
    
    // Subscribe to realtime changes
    const channel = supabase
      .channel('public:videos')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'videos' }, () => {
        fetchVideos();
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const addVideo = async (url: string, title: string, description?: string, visionId?: string) => {
    const youtubeId = extractYoutubeId(url);
    if (!youtubeId) {
      return { error: new Error('Invalid YouTube URL') };
    }

    const thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
    const safeThumbnail = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

    const { error } = await (supabase as any).from('videos').insert([
      {
        title,
        description: description || null,
        vision_id: visionId || null,
        youtube_id: youtubeId,
        thumbnail: safeThumbnail,
        is_featured: videos.length === 0,
        order_index: videos.length,
      }
    ]);

    if (!error) {
      await fetchVideos();
    }

    return { error };
  };

  const deleteVideo = async (id: string) => {
    const { error } = await (supabase as any).from('videos').delete().eq('id', id);
    if (!error) await fetchVideos();
    return { error };
  };

  const updateVideo = async (id: string, updates: Partial<Video>) => {
    const { error } = await (supabase as any).from('videos').update(updates).eq('id', id);
    if (!error) await fetchVideos();
    return { error };
  };

  const toggleFeatured = async (id: string) => {
    await (supabase as any).from('videos').update({ is_featured: false }).neq('id', id);
    const video = videos.find(v => v.id === id);
    const { error } = await (supabase as any).from('videos').update({ is_featured: !video?.is_featured }).eq('id', id);
    if (!error) await fetchVideos();
    return { error };
  };

  const reorderVideos = async (reordered: Video[]) => {
    setVideos(reordered);
    const updates = reordered.map((v, index) => ({
      id: v.id,
      title: v.title,
      youtube_id: v.youtube_id,
      thumbnail: v.thumbnail,
      is_featured: v.is_featured,
      created_at: v.created_at,
      order_index: index,
    }));

    const { error } = await (supabase as any).from('videos').upsert(updates);
    
    if (error) {
      console.error('Error reordering videos:', error);
      fetchVideos();
    }
    return { error };
  };

  return (
    <VideosContext.Provider value={{
      videos,
      isLoading,
      addVideo,
      deleteVideo,
      updateVideo,
      toggleFeatured,
      reorderVideos
    }}>
      {children}
    </VideosContext.Provider>
  );
};

export const useVideos = () => {
  const context = useContext(VideosContext);
  if (context === undefined) {
    throw new Error('useVideos must be used within a VideosProvider');
  }
  return context;
};
