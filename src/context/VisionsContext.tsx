import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import type { Vision, VisionStatus } from '../features/posts/types';

interface VisionsContextType {
  visions: Vision[];
  isLoading: boolean;
  createVision: (vision: Omit<Vision, 'id' | 'createdAt' | 'updatedAt'>) => Promise<{ data: Vision | null; error: any }>;
  updateVision: (id: string, updates: Partial<Vision>) => Promise<{ error: any }>;
  deleteVision: (id: string) => Promise<{ error: any }>;
  getVisionBySlug: (slug: string) => Vision | undefined;
  archiveVision: (id: string) => Promise<{ error: any }>;
}

const VisionsContext = createContext<VisionsContextType | undefined>(undefined);

export const VisionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visions, setVisions] = useState<Vision[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVisions();

    const subscription = supabase
      .channel('visions_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'visions' }, () => {
        fetchVisions();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchVisions = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('visions')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching visions:', error);
    } else if (data) {
      setVisions(data.map(mapDbVisionToVision));
    }
    setIsLoading(false);
  };

  const createVision = async (vision: Omit<Vision, 'id' | 'createdAt' | 'updatedAt'>) => {
    const { data, error } = await supabase
      .from('visions')
      .insert([
        {
          title: vision.title,
          slug: vision.slug,
          short_description: vision.shortDescription,
          full_description: vision.fullDescription,
          cover_image: vision.coverImage,
          banner_image: vision.bannerImage,
          featured_video_url: vision.featuredVideoUrl,
          status: vision.status,
          sort_order: vision.sortOrder,
        }
      ])
      .select()
      .single();

    if (!error && data) {
      const newVision = mapDbVisionToVision(data);
      setVisions(prev => [...prev, newVision]);
      return { data: newVision, error: null };
    }
    return { data: null, error };
  };

  const updateVision = async (id: string, updates: Partial<Vision>) => {
    const dbUpdates: any = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
    if (updates.shortDescription !== undefined) dbUpdates.short_description = updates.shortDescription;
    if (updates.fullDescription !== undefined) dbUpdates.full_description = updates.fullDescription;
    if (updates.coverImage !== undefined) dbUpdates.cover_image = updates.coverImage;
    if (updates.bannerImage !== undefined) dbUpdates.banner_image = updates.bannerImage;
    if (updates.featuredVideoUrl !== undefined) dbUpdates.featured_video_url = updates.featuredVideoUrl;
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.sortOrder !== undefined) dbUpdates.sort_order = updates.sortOrder;

    const { error } = await supabase
      .from('visions')
      .update(dbUpdates)
      .eq('id', id);

    if (!error) {
      fetchVisions(); // re-fetch to get updated_at
    }
    return { error };
  };

  const deleteVision = async (id: string) => {
    const { error } = await supabase
      .from('visions')
      .delete()
      .eq('id', id);

    if (!error) {
      setVisions(prev => prev.filter(v => v.id !== id));
    }
    return { error };
  };

  const archiveVision = async (id: string) => {
    return updateVision(id, { status: 'archived' });
  };

  const getVisionBySlug = (slug: string) => {
    return visions.find(v => v.slug === slug);
  };

  return (
    <VisionsContext.Provider value={{
      visions,
      isLoading,
      createVision,
      updateVision,
      deleteVision,
      getVisionBySlug,
      archiveVision
    }}>
      {children}
    </VisionsContext.Provider>
  );
};

export const useVisions = () => {
  const context = useContext(VisionsContext);
  if (context === undefined) {
    throw new Error('useVisions must be used within a VisionsProvider');
  }
  return context;
};

function mapDbVisionToVision(dbVision: any): Vision {
  return {
    id: dbVision.id,
    title: dbVision.title,
    slug: dbVision.slug,
    shortDescription: dbVision.short_description || undefined,
    fullDescription: dbVision.full_description || undefined,
    coverImage: dbVision.cover_image || undefined,
    bannerImage: dbVision.banner_image || undefined,
    featuredVideoUrl: dbVision.featured_video_url || undefined,
    status: dbVision.status as VisionStatus,
    sortOrder: dbVision.sort_order,
    createdAt: dbVision.created_at,
    updatedAt: dbVision.updated_at,
  };
}
