import React, { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import { Post, PostType, PostVisibility, MediaItem } from '../types';
import { supabase } from '@/services/supabase';
import type { Database } from '@/services/database.types';

export type ApiResult<T> = {
  data?: T;
  error: string | null;
};

interface PostsContextType {
  posts: Post[];
  isLoading: boolean;
  createPost: (post: Omit<Post, 'id' | 'createdAt' | 'reactions'>) => Promise<ApiResult<Post>>;
  updatePost: (id: string, updates: Partial<Post>) => Promise<ApiResult<Post>>;
  deletePost: (id: string) => Promise<ApiResult<null>>;
  archivePost: (id: string) => Promise<ApiResult<Post>>;
  toggleReaction: (id: string, type: 'like' | 'inspire' | 'support') => Promise<ApiResult<Post>>;
  pinPost: (id: string) => Promise<ApiResult<Post>>;
  featurePost: (id: string) => Promise<ApiResult<Post>>;
  getPostBySlug: (slug: string) => Post | undefined;
}

type PostRow = Database['public']['Tables']['posts']['Row'] & {
  media?: Database['public']['Tables']['media']['Row'][] | null;
};

type PostInsert = Database['public']['Tables']['posts']['Insert'];
type PostUpdate = Database['public']['Tables']['posts']['Update'];
type MediaInsert = Database['public']['Tables']['media']['Insert'];

const PostsContext = createContext<PostsContextType | undefined>(undefined);

const defaultReactions = { like: 0, inspire: 0, support: 0 };

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return fallback;
};

const toNullable = <T,>(value: T | null | undefined): T | null => value ?? null;

const mapMediaForInsert = (postId: string, media: MediaItem[]): MediaInsert[] =>
  media.map((item) => ({
    post_id: postId,
    type: item.type,
    url: item.url,
    thumbnail: item.thumbnail ?? null,
    alt: item.alt ?? null,
    bucket: 'external',
    storage_path: null,
  }));

const mapFromSupabase = (post: PostRow): Post => ({
  id: post.id,
  type: post.type as PostType,
  title: post.title ?? undefined,
  caption: post.caption ?? undefined,
  description: post.description ?? undefined,
  media:
    post.media?.map((item) => ({
      id: item.id,
      type: item.type,
      url: item.url,
      thumbnail: item.thumbnail ?? undefined,
      alt: item.alt ?? undefined,
      uploadedAt: item.uploaded_at,
    })) ?? [],
  category: post.category ?? undefined,
  theme: post.theme ?? undefined,
  tags: post.tags ?? undefined,
  author: post.author ?? 'Colonel (Retd.) Md. Jaglul Ahsan',
  createdAt: post.created_at,
  updatedAt: post.updated_at,
  visibility: post.visibility as PostVisibility,
  isPinned: post.is_pinned,
  isFeatured: post.is_featured,
  reactions: post.reactions ?? defaultReactions,
  slug: post.slug,
  scheduledAt: post.scheduled_at ?? undefined,
  publishedAt: post.published_at ?? undefined,
  contentFormat: post.content_format ?? undefined,
  metaTitle: post.meta_title ?? undefined,
  metaDescription: post.meta_description ?? undefined,
  ogImage: post.og_image ?? undefined,
  canonicalUrl: post.canonical_url ?? undefined,
  featuredImageId: post.featured_image_id ?? undefined,
  viewCount: post.view_count ?? undefined,
});

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = useCallback(async (): Promise<ApiResult<Post[]>> => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*, media(*)')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedPosts = (data ?? []).map((post) => mapFromSupabase(post as PostRow));
      setPosts(mappedPosts);

      return { data: mappedPosts, error: null };
    } catch (error) {
      const message = getErrorMessage(error, 'Error fetching posts.');
      console.error('Error fetching posts:', error);
      return { error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPosts();

    const channel = supabase
      .channel('public:posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => {
        void fetchPosts();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'media' }, () => {
        void fetchPosts();
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [fetchPosts]);

  const createPost = useCallback(
    async (newPost: Omit<Post, 'id' | 'createdAt' | 'reactions'>): Promise<ApiResult<Post>> => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) return { error: 'You must be signed in as an admin to publish posts.' };

        const payload: PostInsert = {
          type: newPost.type,
          title: toNullable(newPost.title),
          caption: toNullable(newPost.caption),
          description: toNullable(newPost.description),
          theme: toNullable(newPost.theme),
          category: toNullable(newPost.category),
          tags: newPost.tags ?? null,
          author: toNullable(newPost.author),
          slug: newPost.slug,
          visibility: newPost.visibility,
          is_pinned: newPost.isPinned ?? false,
          is_featured: newPost.isFeatured ?? false,
          created_by: user.id,
          scheduled_at: newPost.scheduledAt ?? null,
          published_at: newPost.publishedAt ?? null,
          content_format: newPost.contentFormat ?? null,
          meta_title: newPost.metaTitle ?? null,
          meta_description: newPost.metaDescription ?? null,
          og_image: newPost.ogImage ?? null,
          canonical_url: newPost.canonicalUrl ?? null,
          featured_image_id: newPost.featuredImageId ?? null,
          view_count: newPost.viewCount ?? null,
        };

        const { data: postData, error: postError } = await supabase
          .from('posts')
          .insert(payload)
          .select('*')
          .single();

        if (postError) throw postError;
        if (!postData) return { error: 'Post was not created.' };

        let insertedMedia: Database['public']['Tables']['media']['Row'][] = [];

        if (newPost.media.length > 0) {
          const { data: mediaData, error: mediaError } = await supabase
            .from('media')
            .insert(mapMediaForInsert(postData.id, newPost.media))
            .select('*');

          if (mediaError) {
            await supabase.from('posts').delete().eq('id', postData.id);
            throw mediaError;
          }

          insertedMedia = mediaData ?? [];
        }

        const createdPost = mapFromSupabase({ ...(postData as PostRow), media: insertedMedia });
        await fetchPosts();

        return { data: createdPost, error: null };
      } catch (error) {
        const message = getErrorMessage(error, 'Error creating post.');
        console.error('Error creating post:', error);
        return { error: message };
      }
    },
    [fetchPosts]
  );

  const updatePost = useCallback(
    async (id: string, updates: Partial<Post>): Promise<ApiResult<Post>> => {
      try {
        const dbUpdates: PostUpdate = {};

        if (updates.type !== undefined) dbUpdates.type = updates.type;
        if (updates.title !== undefined) dbUpdates.title = toNullable(updates.title);
        if (updates.caption !== undefined) dbUpdates.caption = toNullable(updates.caption);
        if (updates.description !== undefined) dbUpdates.description = toNullable(updates.description);
        if (updates.theme !== undefined) dbUpdates.theme = toNullable(updates.theme);
        if (updates.category !== undefined) dbUpdates.category = toNullable(updates.category);
        if (updates.tags !== undefined) dbUpdates.tags = updates.tags ?? null;
        if (updates.author !== undefined) dbUpdates.author = toNullable(updates.author);
        if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
        if (updates.visibility !== undefined) dbUpdates.visibility = updates.visibility;
        if (updates.isPinned !== undefined) dbUpdates.is_pinned = updates.isPinned;
        if (updates.isFeatured !== undefined) dbUpdates.is_featured = updates.isFeatured;
        if (updates.reactions !== undefined) dbUpdates.reactions = updates.reactions;
        if (updates.scheduledAt !== undefined) dbUpdates.scheduled_at = toNullable(updates.scheduledAt);
        if (updates.publishedAt !== undefined) dbUpdates.published_at = toNullable(updates.publishedAt);
        if (updates.contentFormat !== undefined) dbUpdates.content_format = toNullable(updates.contentFormat);
        if (updates.metaTitle !== undefined) dbUpdates.meta_title = toNullable(updates.metaTitle);
        if (updates.metaDescription !== undefined) dbUpdates.meta_description = toNullable(updates.metaDescription);
        if (updates.ogImage !== undefined) dbUpdates.og_image = toNullable(updates.ogImage);
        if (updates.canonicalUrl !== undefined) dbUpdates.canonical_url = toNullable(updates.canonicalUrl);
        if (updates.featuredImageId !== undefined) dbUpdates.featured_image_id = toNullable(updates.featuredImageId);
        if (updates.viewCount !== undefined) dbUpdates.view_count = toNullable(updates.viewCount);

        dbUpdates.updated_at = new Date().toISOString();

        const { data: postData, error: postError } = await supabase
          .from('posts')
          .update(dbUpdates)
          .eq('id', id)
          .select('*')
          .single();

        if (postError) throw postError;
        if (!postData) return { error: 'Post was not updated.' };

        let mediaRows: Database['public']['Tables']['media']['Row'][] = [];

        if (updates.media !== undefined) {
          const { error: deleteMediaError } = await supabase.from('media').delete().eq('post_id', id);
          if (deleteMediaError) throw deleteMediaError;

          if (updates.media.length > 0) {
            const { data: mediaData, error: insertMediaError } = await supabase
              .from('media')
              .insert(mapMediaForInsert(id, updates.media))
              .select('*');

            if (insertMediaError) throw insertMediaError;
            mediaRows = mediaData ?? [];
          }
        } else {
          const { data: mediaData, error: mediaError } = await supabase
            .from('media')
            .select('*')
            .eq('post_id', id);

          if (mediaError) throw mediaError;
          mediaRows = mediaData ?? [];
        }

        const updatedPost = mapFromSupabase({ ...(postData as PostRow), media: mediaRows });
        await fetchPosts();

        return { data: updatedPost, error: null };
      } catch (error) {
        const message = getErrorMessage(error, 'Error updating post.');
        console.error('Error updating post:', error);
        return { error: message };
      }
    },
    [fetchPosts]
  );

  const deletePost = useCallback(
    async (id: string): Promise<ApiResult<null>> => {
      if (!window.confirm('Are you sure you want to delete this post permanently?')) {
        return { data: null, error: null };
      }

      try {
        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (error) throw error;

        await fetchPosts();
        return { data: null, error: null };
      } catch (error) {
        const message = getErrorMessage(error, 'Error deleting post.');
        console.error('Error deleting post:', error);
        return { error: message };
      }
    },
    [fetchPosts]
  );

  const archivePost = useCallback(
    (id: string) => updatePost(id, { visibility: 'archived' }),
    [updatePost]
  );

  const toggleReaction = useCallback(
    (id: string, type: 'like' | 'inspire' | 'support') => {
      const post = posts.find((item) => item.id === id);
      if (!post) return Promise.resolve({ error: 'Post not found.' });

      return updatePost(id, {
        reactions: {
          ...post.reactions,
          [type]: post.reactions[type] + 1,
        },
      });
    },
    [posts, updatePost]
  );

  const pinPost = useCallback(
    (id: string) => {
      const post = posts.find((item) => item.id === id);
      if (!post) return Promise.resolve({ error: 'Post not found.' });

      return updatePost(id, { isPinned: !post.isPinned });
    },
    [posts, updatePost]
  );

  const featurePost = useCallback(
    (id: string) => {
      const post = posts.find((item) => item.id === id);
      if (!post) return Promise.resolve({ error: 'Post not found.' });

      return updatePost(id, { isFeatured: !post.isFeatured });
    },
    [posts, updatePost]
  );

  const getPostBySlug = useCallback(
    (slug: string) => posts.find((post) => post.slug === slug),
    [posts]
  );

  return (
    <PostsContext.Provider
      value={{
        posts,
        isLoading,
        createPost,
        updatePost,
        deletePost,
        archivePost,
        toggleReaction,
        pinPost,
        featurePost,
        getPostBySlug,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) throw new Error('usePosts must be used within PostsProvider');
  return context;
};
