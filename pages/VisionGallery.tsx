import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, X, ZoomIn } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { VISION_GALLERIES } from '../constants';
import { VisionGalleryImage } from '../types';

export const VisionGallery: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState<VisionGalleryImage | null>(null);

  // Validate the slug and get data
  const visionData = slug ? VISION_GALLERIES[slug] : null;

  if (!visionData) {
    return <Navigate to="/#vision" replace />;
  }

  // Close lightbox on escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8]">
      <Navbar />

      <main className="flex-grow">
        {/* Gallery Hero Section */}
        <div className="bg-[#002D1A] py-16 sm:py-24 relative overflow-hidden">
          {/* Subtle overlay texture */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <Link 
              to="/#vision" 
              className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors mb-6 text-sm sm:text-base font-medium tracking-wider uppercase"
            >
              <ArrowLeft size={16} /> Back to Visions
            </Link>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white mb-6 drop-shadow-lg leading-tight">
              {visionData.title}
            </h1>
            
            <p className="max-w-3xl mx-auto text-gray-300 text-lg sm:text-xl font-medium leading-relaxed">
              {visionData.description}
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {visionData.images && visionData.images.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {visionData.images.map((img) => (
                <div 
                  key={img.id}
                  className="relative group cursor-pointer overflow-hidden rounded-xl bg-gray-200 break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={img.url} 
                    alt={visionData.title}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-50 group-hover:scale-100 transition-all duration-500 ease-out">
                      <ZoomIn className="text-white drop-shadow-md" size={28} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No images currently available in this gallery.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Full-Screen Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8 animate-fade-in backdrop-blur-md">
          <button 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white bg-black/50 hover:bg-[#F42A41] rounded-full p-2 transition-all duration-300 z-50 focus:outline-none"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          
          <img 
            src={selectedImage.url} 
            alt="Expanded view" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-scale-up"
          />
        </div>
      )}
    </div>
  );
};
