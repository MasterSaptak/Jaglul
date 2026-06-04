import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, X, ZoomIn, PlayCircle } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { usePosts } from '../features/posts/context/PostsContext';
import { useVisions } from '../context/VisionsContext';
import { useVideos } from '../context/VideosContext';

const VideoCard: React.FC<{ video: any }> = ({ video }) => {
  const [expanded, setExpanded] = useState(false);
  const MAX_LENGTH = 150;
  const isLong = video.description && video.description.length > MAX_LENGTH;
  const displayText = !isLong || expanded 
    ? video.description 
    : video.description.slice(0, MAX_LENGTH) + '...';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 flex flex-col">
      <div className="relative pt-[56.25%] bg-black w-full">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${video.youtube_id}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-6 flex-grow">
        <h3 className="font-serif font-bold text-xl text-[#002D1A] mb-2">{video.title}</h3>
        {video.description && (
          <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap break-words">
            {displayText}
            {isLong && (
              <button 
                onClick={() => setExpanded(!expanded)} 
                className="text-[#F42A41] font-bold ml-2 hover:underline focus:outline-none"
              >
                {expanded ? 'Show Less' : 'Read More'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const VisionGallery: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts } = usePosts();
  const { getVisionBySlug, isLoading: visionsLoading } = useVisions();
  const { videos } = useVideos();
  
  const [selectedImage, setSelectedImage] = useState<{ id: string; url: string } | null>(null);

  const vision = getVisionBySlug(slug || '');

  // Find posts that used to be associated with this vision (legacy support)
  const legacyVisionPosts = posts.filter(p => p.slug === slug && p.type === 'gallery');
  const legacyImages = legacyVisionPosts.flatMap(post => 
    post.media.map((m, i) => ({
      id: m.id || `${post.id}-${i}`,
      url: m.url
    }))
  );

  // Get videos specifically linked to this vision
  const visionVideos = videos.filter(v => v.vision_id === vision?.id);

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

  if (visionsLoading) {
    return <div className="min-h-screen bg-[#F7FAF8] flex items-center justify-center">Loading...</div>;
  }

  if (!vision) {
    return <Navigate to="/#vision" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8]">
      <Navbar />

      <main className="flex-grow">
        {/* Gallery Hero Section */}
        <div className="bg-[#002D1A] py-16 sm:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: vision.bannerImage ? `url(${vision.bannerImage})` : 'none' }}></div>
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <Link
              to="/#vision"
              className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors mb-6 text-sm sm:text-base font-medium tracking-wider uppercase"
            >
              <ArrowLeft size={16} /> Back to Visions
            </Link>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white mb-6 drop-shadow-lg leading-tight">
              {vision.title}
            </h1>

            <p className="max-w-3xl mx-auto text-gray-300 text-lg sm:text-xl font-medium leading-relaxed">
              {vision.fullDescription || vision.shortDescription}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          
          {/* VIDEOS SECTION */}
          {visionVideos.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
                <PlayCircle className="text-[#F42A41]" size={32} />
                <h2 className="text-3xl font-serif font-bold text-[#002D1A]">Featured Videos</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {visionVideos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          )}

          {/* IMAGE GALLERY SECTION */}
          {(legacyImages.length > 0 || visionVideos.length === 0) && (
            <div>
              {visionVideos.length > 0 && (
                <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
                  <ZoomIn className="text-[#D4AF37]" size={32} />
                  <h2 className="text-3xl font-serif font-bold text-[#002D1A]">Image Gallery</h2>
                </div>
              )}
              
              {legacyImages.length > 0 ? (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                  {legacyImages.map((img) => (
                    <div
                      key={img.id}
                      className="relative group cursor-pointer overflow-hidden rounded-xl bg-gray-200 break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-300"
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img.url}
                        alt={vision.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
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
                <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <p className="text-gray-500 text-lg">No content currently available in this vision's gallery.</p>
                </div>
              )}
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
