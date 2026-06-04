import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import type { ContentVisibility } from '../features/posts/types';

interface ContentVisibilityContextType {
  visibilities: ContentVisibility[];
  isLoading: boolean;
  setVisibility: (contentType: 'post' | 'vision', contentId: string, locations: string[]) => Promise<{ error: any }>;
  getContentForLocation: (location: string) => ContentVisibility[];
}

const ContentVisibilityContext = createContext<ContentVisibilityContextType | undefined>(undefined);

export const ContentVisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visibilities, setVisibilities] = useState<ContentVisibility[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVisibilities();

    const subscription = supabase
      .channel('visibility_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'content_visibility' }, () => {
        fetchVisibilities();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchVisibilities = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('content_visibility')
      .select('*');

    if (error) {
      console.error('Error fetching visibilities:', error);
    } else if (data) {
      setVisibilities(data.map(mapDbVisibility));
    }
    setIsLoading(false);
  };

  const setVisibility = async (contentType: 'post' | 'vision', contentId: string, locations: string[]) => {
    // 1. Delete existing for this content
    await supabase
      .from('content_visibility')
      .delete()
      .eq('content_type', contentType)
      .eq('content_id', contentId);

    // 2. Insert new locations
    if (locations.length > 0) {
      const inserts = locations.map(loc => ({
        content_type: contentType,
        content_id: contentId,
        location: loc
      }));

      const { error } = await supabase
        .from('content_visibility')
        .insert(inserts);

      if (error) return { error };
    }

    fetchVisibilities();
    return { error: null };
  };

  const getContentForLocation = (location: string) => {
    return visibilities.filter(v => v.location === location);
  };

  return (
    <ContentVisibilityContext.Provider value={{
      visibilities,
      isLoading,
      setVisibility,
      getContentForLocation
    }}>
      {children}
    </ContentVisibilityContext.Provider>
  );
};

export const useContentVisibility = () => {
  const context = useContext(ContentVisibilityContext);
  if (context === undefined) {
    throw new Error('useContentVisibility must be used within a ContentVisibilityProvider');
  }
  return context;
};

function mapDbVisibility(dbVis: any): ContentVisibility {
  return {
    id: dbVis.id,
    contentType: dbVis.content_type as 'post' | 'vision',
    contentId: dbVis.content_id,
    location: dbVis.location,
    sortOrder: dbVis.sort_order,
    createdAt: dbVis.created_at,
  };
}
