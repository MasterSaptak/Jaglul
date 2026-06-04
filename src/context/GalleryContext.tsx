import React, { createContext, useContext, useMemo, useCallback, ReactNode, useState } from 'react';
import { GalleryImage, GalleryCategory } from '../types';
import { usePosts } from '../features/posts/context/PostsContext';
import { useMediaLibrary } from './MediaLibraryContext';
import { Post } from '../features/posts/types';

const getGalleryCategory = (post: Post): GalleryCategory => {
  if (post.type === 'gallery') return 'vision';
  return 'media';
};

const getImageDate = (post: Post) =>
  new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const mapPostMediaToGalleryImages = (posts: Post[]): GalleryImage[] =>
  posts
    .filter((post) => post.visibility === 'published')
    .flatMap((post) => {
      const category = getGalleryCategory(post);
      const createdAt = new Date(post.createdAt).getTime() || 0;
      const year = new Date(post.createdAt).getFullYear().toString();

      return post.media
        .filter((item) => item.type === 'image' && item.url)
        .map((item, index) => ({
          id: `${post.id}-${item.id || index}`,
          src: item.url,
          caption: item.alt || item.caption || post.title || post.caption || 'Gallery image',
          category,
          subCategory: category === 'vision' ? post.slug : post.theme,
          year,
          date: getImageDate(post),
          createdAt,
        }));
    });

const dedupeImages = (images: GalleryImage[]) => {
  const seen = new Set<string>();
  const deduped: GalleryImage[] = [];

  for (const image of images) {
    if (!image.src || seen.has(image.src)) continue;
    seen.add(image.src);
    deduped.push(image);
  }

  return deduped;
};

interface GalleryContextType {
  allImages: GalleryImage[];
  uploadImages: (files: File[]) => Promise<{ success: number; skipped: number }>;
  deleteUploadedImage: (id: string) => Promise<void>;
  isUploading: boolean;
  storageUsedKB: number;
  maxStorageKB: number;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { posts } = usePosts();
  const { mediaFiles, uploadFiles, deleteMedia } = useMediaLibrary();
  const [isUploading, setIsUploading] = useState(false);

  // Map standalone media library files
  const libraryImages = useMemo(() => {
    return mediaFiles
      .filter(item => item.type === 'image' && item.url)
      .map(item => ({
        id: item.id,
        src: item.url,
        caption: item.caption || item.alt || 'Uploaded Media',
        category: 'uploaded' as GalleryCategory,
        year: new Date(item.uploadedAt).getFullYear().toString(),
        date: new Date(item.uploadedAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        createdAt: new Date(item.uploadedAt).getTime()
      }));
  }, [mediaFiles]);

  const allImages = useMemo(
    () => dedupeImages([...mapPostMediaToGalleryImages(posts), ...libraryImages]),
    [posts, libraryImages]
  );

  const uploadImagesWrapper = useCallback(
    async (files: File[]) => {
      setIsUploading(true);
      const { data, error } = await uploadFiles(files);
      setIsUploading(false);
      return { success: data?.length || 0, skipped: error ? files.length - (data?.length || 0) : 0 };
    },
    [uploadFiles]
  );

  const deleteUploadedImageWrapper = useCallback(async (id: string) => {
    await deleteMedia(id);
  }, [deleteMedia]);

  return (
    <GalleryContext.Provider
      value={{
        allImages,
        uploadImages: uploadImagesWrapper,
        deleteUploadedImage: deleteUploadedImageWrapper,
        isUploading,
        storageUsedKB: 0, // No longer limited by localstorage
        maxStorageKB: 1048576, // 1GB
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error('useGallery must be used within GalleryProvider');
  return ctx;
};
