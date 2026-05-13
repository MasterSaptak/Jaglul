import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import { useGallery } from '../context/GalleryContext';
import { GalleryImage } from '../types';

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(query.matches);

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return prefersReducedMotion;
};

const shuffleImages = (images: GalleryImage[]) => {
  const shuffled = [...images];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled.slice(0, 6);
};

export const GalleryPreview: React.FC = () => {
  const { allImages } = useGallery();
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const galleryImages = useMemo(() => allImages.filter((image) => image.src), [allImages]);
  const pickImages = useCallback(() => shuffleImages(galleryImages), [galleryImages]);
  const [visibleImages, setVisibleImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    setVisibleImages(pickImages());
  }, [pickImages]);

  useEffect(() => {
    if (prefersReducedMotion || isPaused || galleryImages.length <= 6) return;

    // Slower rotation for a more "premium" feel (2.5s)
    const intervalId = window.setInterval(() => {
      setVisibleImages(pickImages());
    }, 2500);

    return () => window.clearInterval(intervalId);
  }, [galleryImages.length, isPaused, pickImages, prefersReducedMotion]);

  if (galleryImages.length === 0) return null;

  const imagesToShow = visibleImages.length > 0 ? visibleImages : galleryImages.slice(0, 6);

  // Layout logic for Bento-style grid
  const getGridClass = (index: number) => {
    switch(index) {
      case 0: return "md:col-span-2 md:row-span-2"; // Big feature
      case 1: return "md:col-span-1 md:row-span-1";
      case 2: return "md:col-span-1 md:row-span-1";
      case 3: return "md:col-span-1 md:row-span-1";
      case 4: return "md:col-span-1 md:row-span-1";
      case 5: return "md:col-span-1 md:row-span-1";
      default: return "";
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F8FAF9] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-army-green/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-army-navy/5 rounded-full text-army-gold font-bold uppercase tracking-[0.2em] text-[10px] mb-4">
            <ImageIcon size={14} />
            Visual Archive
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-army-navy mb-4">
            Capturing the <span className="text-army-green">Journey</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-army-gold via-army-red to-army-gold mx-auto rounded-full mb-6"></div>
          <p className="text-army-olive/70 max-w-2xl mx-auto text-lg leading-relaxed">
            A dynamic glimpse into Colonel Ahsan's initiatives, public service, and community engagements across Bangladesh.
          </p>
        </div>

        {/* Innovative Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 auto-rows-[140px] sm:auto-rows-[180px]">
          {imagesToShow.map((image, index) => (
            <Link
              key={`${image.id}-${image.src}`}
              to="/gallery"
              className={`group relative overflow-hidden rounded-2xl bg-white border-4 border-white shadow-xl hover:shadow-2xl hover:z-20 transition-all duration-500 ease-out transform hover:-translate-y-1 ${getGridClass(index)}`}
            >
              <img
                src={image.src}
                alt={image.caption}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1"
                loading="lazy"
              />
              
              {/* Premium Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]">
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-sm sm:text-base font-serif font-bold mb-2 line-clamp-2">
                    {image.caption}
                  </p>
                  <div className="flex items-center gap-2 text-army-gold text-xs font-black uppercase tracking-widest">
                    Explore Details <ArrowRight size={14} />
                  </div>
                </div>
              </div>
              
              {/* Photo-style Border/Ring */}
              <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none"></div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-3 bg-army-navy text-white px-10 py-4 rounded-xl font-bold hover:bg-army-green transition-all shadow-xl hover:shadow-army-green/20 transform hover:-translate-y-1 active:scale-95"
          >
            Enter Full Media Archive
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};
