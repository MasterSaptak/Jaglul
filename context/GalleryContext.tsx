import React, { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { GalleryImage, GalleryCategory } from '../types';
import { MEDIA_GALLERY, VISION_GALLERIES } from '../constants';

const STORAGE_KEY = 'gallery_uploaded_images';
const MAX_WIDTH = 800;
const JPEG_QUALITY = 0.7;
const MAX_STORAGE_KB = 4500;

async function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => { img.src = e.target?.result as string; };
    reader.onerror = reject;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas not supported'));

      const scale = Math.min(1, MAX_WIDTH / img.width);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
    };
    img.onerror = reject;

    reader.readAsDataURL(file);
  });
}

const defaultMediaImages: GalleryImage[] = MEDIA_GALLERY.map(m => ({
  id: m.id,
  src: m.imageUrl,
  caption: m.caption,
  category: 'media' as GalleryCategory,
  subCategory: m.thematicArea,
  year: m.year,
  date: m.date,
  createdAt: new Date(m.date).getTime() || 0,
}));

const defaultVisionImages: GalleryImage[] = Object.values(VISION_GALLERIES).flatMap(v =>
  v.images.map(img => ({
    id: img.id,
    src: img.url,
    caption: v.title,
    category: 'vision' as GalleryCategory,
    subCategory: v.slug,
    year: undefined,
    date: undefined,
    createdAt: 0,
  }))
);

interface GalleryContextType {
  allImages: GalleryImage[];
  uploadImages: (files: File[]) => Promise<{ success: number; skipped: number }>;
  deleteUploadedImage: (id: string) => void;
  isUploading: boolean;
  storageUsedKB: number;
  maxStorageKB: number;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [uploadedImages, setUploadedImages] = useState<GalleryImage[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [isUploading, setIsUploading] = useState(false);

  const storageUsedKB = useMemo(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) ?? '[]';
      return Math.round((raw.length * 2) / 1024);
    } catch {
      return 0;
    }
  }, [uploadedImages]);

  const allImages = useMemo(() => [
    ...defaultMediaImages,
    ...defaultVisionImages,
    ...uploadedImages,
  ], [uploadedImages]);

  const uploadImages = useCallback(async (files: File[]) => {
    setIsUploading(true);
    let success = 0;
    let skipped = 0;
    const newImages: GalleryImage[] = [];

    try {
      for (const file of files) {
        const currentKB = storageUsedKB + newImages.reduce((a, i) => a + (i.src.length * 2) / 1024, 0);
        if (currentKB > MAX_STORAGE_KB) { skipped++; continue; }

        try {
          const compressed = await compressImage(file);
          newImages.push({
            id: `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            src: compressed,
            caption: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
            category: 'uploaded',
            createdAt: Date.now(),
            year: new Date().getFullYear().toString(),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          });
          success++;
        } catch {
          skipped++;
        }
      }

      if (newImages.length > 0) {
        setUploadedImages(prev => {
          const updated = [...prev, ...newImages];
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* quota exceeded */ }
          return updated;
        });
      }
    } finally {
      setIsUploading(false);
    }

    return { success, skipped };
  }, [storageUsedKB]);

  const deleteUploadedImage = useCallback((id: string) => {
    setUploadedImages(prev => {
      const updated = prev.filter(img => img.id !== id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* ignore */ }
      return updated;
    });
  }, []);

  return (
    <GalleryContext.Provider value={{
      allImages,
      uploadImages,
      deleteUploadedImage,
      isUploading,
      storageUsedKB,
      maxStorageKB: MAX_STORAGE_KB,
    }}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error('useGallery must be used within GalleryProvider');
  return ctx;
};
