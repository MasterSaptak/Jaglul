import React, { useState, useEffect } from 'react';
import { Play, X } from 'lucide-react';
import { useVideos } from '../context/VideosContext';
import { Video } from '../types';

export const YoutubeGrid: React.FC = () => {
  const { videos, isLoading } = useVideos();
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeVideo) {
        setActiveVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideo]);

  if (isLoading) {
    return (
      <div className="py-16 text-center">
        <div className="w-10 h-10 border-4 border-army-green/20 border-t-army-green rounded-full animate-spin mx-auto mb-4" />
        <p className="text-army-olive/60">Loading video gallery...</p>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return null; // Don't show the section if no videos exist
  }

  const featuredVideo = videos.find(v => v.is_featured);
  const gridVideos = videos.filter(v => v.id !== featuredVideo?.id);

  // Schema.org VideoObject Structured Data
  const generateStructuredData = (video: Video) => {
    return {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": video.title,
      "description": `Video message from Colonel (Retd) Md Jaglul Ahsan: ${video.title}`,
      "thumbnailUrl": [ video.thumbnail ],
      "uploadDate": video.created_at,
      "embedUrl": `https://www.youtube.com/embed/${video.youtube_id}`
    };
  };

  return (
    <section id="videos" className="py-16 md:py-24 bg-army-cream/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-army-navy mb-4">
            Video Messages
          </h2>
          <div className="h-1 w-24 bg-army-red mx-auto mb-6"></div>
          <p className="text-army-olive/80 max-w-2xl mx-auto text-sm sm:text-base">
            Speeches, reflections, and public addresses from Colonel Ahsan.
          </p>
        </div>

        {/* Featured Video Section */}
        {featuredVideo && (
          <div className="mb-16">
            <script type="application/ld+json">
              {JSON.stringify(generateStructuredData(featuredVideo))}
            </script>
            <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl group cursor-pointer bg-black" onClick={() => setActiveVideo(featuredVideo)}>
              <div className="absolute top-4 left-4 z-20 bg-army-red text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded shadow-md">
                Featured
              </div>
              
              <div className="aspect-video relative">
                <img 
                  src={featuredVideo.thumbnail} 
                  alt={featuredVideo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60"
                />
                
                {/* Overlay Play Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-army-red/90 transition-all duration-300 shadow-xl">
                    <Play className="w-10 h-10 text-white fill-current translate-x-1" />
                  </div>
                </div>

                {/* Bottom Gradient & Title */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 md:p-8">
                  <h3 className="text-white font-serif font-bold text-2xl md:text-3xl leading-tight group-hover:text-army-gold transition-colors">
                    {featuredVideo.title}
                  </h3>
                  <p className="text-gray-300 text-sm mt-2 font-medium">
                    {new Date(featuredVideo.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Grid */}
        {gridVideos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gridVideos.map(video => (
              <div 
                key={video.id} 
                className="group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-army-green/10"
                onClick={() => setActiveVideo(video)}
              >
                <script type="application/ld+json">
                  {JSON.stringify(generateStructuredData(video))}
                </script>
                <div className="aspect-video relative bg-black overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-army-red transition-all duration-300 shadow-lg">
                      <Play className="w-6 h-6 text-white fill-current translate-x-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-army-navy text-sm md:text-base line-clamp-2 leading-snug group-hover:text-army-green transition-colors">
                    {video.title}
                  </h4>
                  <p className="text-xs text-army-olive/60 mt-2 font-medium">
                    {new Date(video.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lazy-Loaded Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="absolute inset-0" onClick={() => setActiveVideo(null)}></div>
          
          <div className="relative w-full max-w-5xl bg-black rounded-xl overflow-hidden shadow-2xl z-10">
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-army-red transition-colors p-2"
              aria-label="Close video"
            >
              <X size={32} />
            </button>
            
            <div className="aspect-video w-full bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideo.youtube_id}?autoplay=1&rel=0`}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-4 md:p-6 bg-white">
              <h3 className="font-serif font-bold text-xl md:text-2xl text-army-navy">
                {activeVideo.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
