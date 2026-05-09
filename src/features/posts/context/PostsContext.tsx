import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Post, PostType, PostVisibility, MediaItem } from '../types';
import { supabase, uploadMedia } from '../../../../services/supabase';

interface PostsContextType {
  posts: Post[];
  isLoading: boolean;
  createPost: (post: Omit<Post, 'id' | 'createdAt' | 'reactions'>) => Promise<void>;
  updatePost: (id: string, updates: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  archivePost: (id: string) => Promise<void>;
  toggleReaction: (id: string, type: 'like' | 'inspire' | 'support') => Promise<void>;
  pinPost: (id: string) => Promise<void>;
  featurePost: (id: string) => Promise<void>;
  getPostBySlug: (slug: string) => Post | undefined;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

// Mapping Helpers
const mapFromSupabase = (p: any): Post => ({
  id: p.id,
  type: p.type as PostType,
  title: p.title,
  caption: p.caption,
  description: p.description,
  media: p.media?.map((m: any) => ({
    id: m.id,
    type: m.type,
    url: m.url,
    thumbnail: m.thumbnail,
    uploadedAt: m.uploaded_at
  })) || [],
  category: p.category,
  theme: p.theme,
  tags: p.tags || [],
  author: p.author,
  createdAt: p.created_at,
  updatedAt: p.updated_at,
  visibility: p.visibility as PostVisibility,
  isPinned: p.is_pinned,
  isFeatured: p.is_featured,
  reactions: p.reactions || { like: 0, inspire: 0, support: 0 },
  slug: p.slug
});

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*, media(*)')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setPosts(data.map(mapFromSupabase));
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial Hydration & Real-time Subscription
  useEffect(() => {
    fetchPosts();

    // Subscribe to changes
    const channel = supabase
      .channel('public:posts')
      .on('postgres_changes', { event: '*', table: 'posts' }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPosts]);

  const createPost = useCallback(async (newPost: Omit<Post, 'id' | 'createdAt' | 'reactions'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { data: postData, error: postError } = await supabase
        .from('posts')
        .insert([{
          type: newPost.type,
          title: newPost.title,
          caption: newPost.caption,
          description: newPost.description,
          theme: newPost.theme,
          category: newPost.category,
          tags: newPost.tags,
          author: newPost.author,
          slug: newPost.slug,
          visibility: newPost.visibility,
          is_pinned: newPost.isPinned ?? false,
          is_featured: newPost.isFeatured ?? false,
          created_by: user?.id ?? null
        }])
        .select()
        .single();

      if (postError) throw postError;

      // Insert media if present
      if (newPost.media && newPost.media.length > 0 && postData) {
        const mediaToInsert = newPost.media.map(m => ({
          post_id: postData.id,
          type: m.type,
          url: m.url,
          thumbnail: m.thumbnail
        }));
        const { error: mediaError } = await supabase.from('media').insert(mediaToInsert);
        if (mediaError) throw mediaError;
      }
      
      await fetchPosts();
    } catch (err) {
      console.error('Error creating post:', err);
      throw err;
    }
  }, [fetchPosts]);

  const updatePost = useCallback(async (id: string, updates: Partial<Post>) => {
    try {
      const dbUpdates: any = {};
      if (updates.title !== undefined) dbUpdates.title = updates.title;
      if (updates.caption !== undefined) dbUpdates.caption = updates.caption;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.visibility !== undefined) dbUpdates.visibility = updates.visibility;
      if (updates.isPinned !== undefined) dbUpdates.is_pinned = updates.isPinned;
      if (updates.isFeatured !== undefined) dbUpdates.is_featured = updates.isFeatured;
      if (updates.reactions !== undefined) dbUpdates.reactions = updates.reactions;
      
      dbUpdates.updated_at = new Date().toISOString();

      const { error } = await supabase
        .from('posts')
        .update(dbUpdates)
        .eq('id', id);

      if (error) throw error;
      await fetchPosts();
    } catch (err) {
      console.error('Error updating post:', err);
    }
  }, [fetchPosts]);

  const deletePost = useCallback(async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post permanently?")) return;
    
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchPosts();
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  }, [fetchPosts]);

  const archivePost = useCallback(async (id: string) => {
    await updatePost(id, { visibility: 'archived' });
  }, [updatePost]);

  const toggleReaction = useCallback(async (id: string, type: 'like' | 'inspire' | 'support') => {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    const newReactions = {
      ...post.reactions,
      [type]: post.reactions[type] + 1
    };

    await updatePost(id, { reactions: newReactions });
  }, [posts, updatePost]);

  const pinPost = useCallback(async (id: string) => {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    await updatePost(id, { isPinned: !post.isPinned });
  }, [posts, updatePost]);

  const featurePost = useCallback(async (id: string) => {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    await updatePost(id, { isFeatured: !post.isFeatured });
  }, [posts, updatePost]);

  const getPostBySlug = useCallback((slug: string) => {
    return posts.find(p => p.slug === slug);
  }, [posts]);

  return (
    <PostsContext.Provider value={{
      posts,
      isLoading,
      createPost,
      updatePost,
      deletePost,
      archivePost,
      toggleReaction,
      pinPost,
      featurePost,
      getPostBySlug
    }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) throw new Error('usePosts must be used within a PostsProvider');
  return context;
};

