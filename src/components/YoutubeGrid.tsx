import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { useVideos } from '../context/VideosContext';
import { Video } from '../types';

const DescriptionText = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 150;
  const isLong = text.length > MAX_LENGTH;
  const displayText = !isLong || expanded ? text : text.slice(0, MAX_LENGTH) + '...';

  return (
    <p className="mt-4 text-army-olive/80 text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words max-w-4xl">
      {displayText}
      {isLong && (
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="text-army-red font-bold ml-2 hover:underline focus:outline-none"
        >
          {expanded ? 'Show Less' : 'Read More'}
        </button>
      )}
    </p>
  );
};

export const YoutubeGrid: React.FC = () => {
  const { videos, isLoading } = useVideos();
  const [mainVideo, setMainVideo] = useState<Video | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    if (videos && videos.length > 0 && !mainVideo) {
      setMainVideo(videos.find(v => v.is_featured) || videos[0]);
    }
  }, [videos, mainVideo]);

  if (isLoading) {
    return (
      <div className="py-16 text-center">
        <div className="w-10 h-10 border-4 border-army-green/20 border-t-army-green rounded-full animate-spin mx-auto mb-4" />
        <p className="text-army-olive/60">Loading video gallery...</p>
      </div>
    );
  }

  if (!videos || videos.length === 0 || !mainVideo) {
    return null;
  }

  const gridVideos = videos.filter(v => v.id !== mainVideo.id);

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

  const handleVideoSelect = (video: Video) => {
    setMainVideo(video);
    setAutoPlay(true);
    
    // Smooth scroll to the main video player
    const element = document.getElementById('videos-section');
    if (element) {
      // Offset slightly to account for navbar
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="videos-section" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-10 flex items-end justify-between border-b border-army-green/10 pb-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-army-navy mb-2">
              Video Messages
            </h2>
            <p className="text-army-olive/80 text-sm sm:text-base">
              Speeches, reflections, and public addresses from Colonel Ahsan.
            </p>
          </div>
          <div className="hidden sm:block">
            <Play className="w-10 h-10 text-army-red opacity-80" />
          </div>
        </div>

        {/* YouTube Style Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Video Player (Left Side) */}
          <div id="main-video-player" className="w-full lg:w-2/3 bg-[#F7FAF8] rounded-2xl overflow-hidden shadow-xl border border-army-green/10 flex-shrink-0">
            <script type="application/ld+json">
              {JSON.stringify(generateStructuredData(mainVideo))}
            </script>
            
            <div className="aspect-video relative bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${mainVideo.youtube_id}?autoplay=${autoPlay ? 1 : 0}&rel=0`}
                title={mainVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
            
            <div className="p-6 md:p-8">
              <h3 className="font-serif font-bold text-2xl md:text-3xl text-army-navy leading-tight">
                {mainVideo.title}
              </h3>
              
              <p className="text-army-olive/50 text-xs md:text-sm mt-3 font-medium pb-4 border-b border-army-green/10">
                Published on {new Date(mainVideo.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>

              {mainVideo.description && (
                <DescriptionText text={mainVideo.description} />
              )}
            </div>
          </div>

          {/* Playlist / More Videos (Right Side) */}
          {gridVideos.length > 0 && (
            <div className="w-full lg:w-1/3 flex flex-col gap-3">
              <h4 className="text-lg font-serif font-bold text-army-navy mb-2">Up Next</h4>
              
              <div className="flex flex-col gap-3 max-h-[800px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-army-green/20 scrollbar-track-transparent">
                {gridVideos.map(video => (
                  <div 
                    key={video.id} 
                    className="group cursor-pointer rounded-xl overflow-hidden bg-white hover:bg-[#F7FAF8] transition-all duration-300 flex items-start gap-3 p-2 border border-transparent hover:border-army-green/20 shadow-sm"
                    onClick={() => handleVideoSelect(video)}
                  >
                    <script type="application/ld+json">
                      {JSON.stringify(generateStructuredData(video))}
                    </script>
                    <div className="w-32 sm:w-40 aspect-video relative bg-black overflow-hidden flex-shrink-0 rounded-lg">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-70"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-army-red transition-all duration-300 shadow-md">
                          <Play className="w-4 h-4 text-white fill-current translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-grow pt-1 min-w-0">
                      <h4 className="font-bold text-army-navy text-sm line-clamp-2 leading-snug group-hover:text-army-green transition-colors">
                        {video.title}
                      </h4>
                      <p className="text-xs text-army-olive/60 mt-1.5 font-medium">
                        {new Date(video.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
