import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Image, Calendar, Filter, X, Grid, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MEDIA_GALLERY, THEMATIC_AREAS } from '../constants';
import { ThematicArea } from '../types';

export const MediaGallery: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Get unique years
  const years = useMemo(() => {
    const yearSet = new Set(MEDIA_GALLERY.map(m => m.year));
    return Array.from(yearSet).sort((a, b) => b.localeCompare(a));
  }, []);

  // Filter media
  const filteredMedia = useMemo(() => {
    return MEDIA_GALLERY.filter(item => {
      if (selectedYear && item.year !== selectedYear) return false;
      if (selectedTheme && item.thematicArea !== selectedTheme) return false;
      return true;
    });
  }, [selectedYear, selectedTheme]);

  // Group by year
  const mediaByYear = useMemo(() => {
    const grouped: { [key: string]: typeof MEDIA_GALLERY } = {};
    filteredMedia.forEach(item => {
      if (!grouped[item.year]) grouped[item.year] = [];
      grouped[item.year].push(item);
    });
    return Object.entries(grouped).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filteredMedia]);

  const clearFilters = () => {
    setSelectedYear('');
    setSelectedTheme('');
  };

  const hasActiveFilters = selectedYear || selectedTheme;

  const openLightbox = (imageUrl: string, index: number) => {
    setLightboxImage(imageUrl);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (lightboxIndex - 1 + filteredMedia.length) % filteredMedia.length
      : (lightboxIndex + 1) % filteredMedia.length;
    setLightboxIndex(newIndex);
    setLightboxImage(filteredMedia[newIndex].imageUrl);
  };

  const getThemeConfig = (theme: string) => {
    return THEMATIC_AREAS[theme as ThematicArea] || { title: 'General', color: 'army-olive' };
  };

  return (
    <div className="min-h-screen flex flex-col bg-army-cream">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-army-green via-army-olive to-army-forest py-10 sm:py-16 md:py-20">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 text-white border border-white/20">
                <Image size={32} />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">Media Gallery</h1>
              <div className="gold-line w-24 mx-auto mb-6"></div>
              <p className="text-green-100/80 max-w-2xl mx-auto">
                Visual documentation of events, initiatives, and public engagements. Browse by year or focus area.
              </p>
              
              {/* Stats */}
              <div className="flex justify-center gap-4 sm:gap-8 mt-6 sm:mt-8 text-white/80">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{MEDIA_GALLERY.length}</p>
                  <p className="text-sm">Total Images</p>
                </div>
                <div className="w-px bg-white/20"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{years.length}</p>
                  <p className="text-sm">Years Archived</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-white border-b border-army-green/10 sticky top-[4.5rem] sm:top-20 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <Grid size={18} className="text-army-olive" />
                <span className="text-army-navy font-medium">
                  {filteredMedia.length} images
                  {hasActiveFilters && ' (filtered)'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Year Filter */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-2.5 rounded-lg border border-army-green/20 focus:border-army-green outline-none bg-white text-army-navy text-sm"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

                {/* Theme Filter */}
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="px-4 py-2.5 rounded-lg border border-army-green/20 focus:border-army-green outline-none bg-white text-army-navy text-sm"
                >
                  <option value="">All Themes</option>
                  {Object.entries(THEMATIC_AREAS).map(([key, value]) => (
                    <option key={key} value={key}>{value.title}</option>
                  ))}
                </select>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-army-red text-sm font-medium flex items-center gap-1 hover:underline"
                  >
                    <X size={16} />
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {mediaByYear.length > 0 ? (
              <div className="space-y-16">
                {mediaByYear.map(([year, images]) => (
                  <div key={year}>
                    {/* Year Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-army-green text-white px-6 py-2 rounded-full font-bold flex items-center gap-2">
                        <Calendar size={18} />
                        {year}
                      </div>
                      <div className="flex-1 h-px bg-army-green/20"></div>
                      <span className="text-sm text-army-olive/60">{images.length} images</span>
                    </div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                      {images.map((item, index) => {
                        const globalIndex = filteredMedia.findIndex(m => m.id === item.id);
                        return (
                          <div 
                            key={item.id}
                            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-army-olive/10 cursor-pointer card-lift"
                            onClick={() => openLightbox(item.imageUrl, globalIndex)}
                          >
                            <img 
                              src={item.imageUrl} 
                              alt={item.caption}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-army-forest/90 via-army-forest/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <p className="text-white text-sm font-medium line-clamp-2 mb-1">{item.caption}</p>
                                <p className="text-white/60 text-xs">{item.date}</p>
                              </div>
                              <div className="absolute top-4 right-4">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                  <ZoomIn size={18} className="text-white" />
                                </div>
                              </div>
                            </div>
                            
                            {/* Theme Badge */}
                            <div className="absolute top-3 left-3">
                              <span className="bg-white/90 backdrop-blur-sm text-army-navy text-xs font-medium px-2 py-1 rounded">
                                {getThemeConfig(item.thematicArea).title}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-army-green/10">
                <Image className="w-12 h-12 text-army-olive/30 mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-army-navy mb-2">No images found</h3>
                <p className="text-army-olive/70 mb-6">Try adjusting your filters.</p>
                <button
                  onClick={clearFilters}
                  className="bg-army-green text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-army-olive transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Notice */}
        <section className="py-8 bg-white border-t border-army-green/10">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-sm text-army-olive/60">
              All images are from documented events and initiatives. For media inquiries or high-resolution images, 
              please <Link to="/contact" className="text-army-green hover:underline">contact us</Link>.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button - touch friendly */}
          <button 
            className="absolute top-4 right-4 text-white/80 hover:text-white p-3 sm:p-2 z-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={closeLightbox}
          >
            <X size={28} className="sm:w-8 sm:h-8" />
          </button>

          {/* Navigation - touch friendly */}
          <button 
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 sm:p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50 min-w-[48px] min-h-[48px] flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
          >
            <ChevronLeft size={28} className="sm:w-8 sm:h-8" />
          </button>
          <button 
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 sm:p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50 min-w-[48px] min-h-[48px] flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
          >
            <ChevronRight size={28} className="sm:w-8 sm:h-8" />
          </button>

          {/* Image */}
          <div 
            className="max-w-5xl max-h-[80vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={lightboxImage} 
              alt="Gallery image"
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            {/* Caption */}
            <div className="text-center mt-4">
              <p className="text-white font-medium">{filteredMedia[lightboxIndex]?.caption}</p>
              <p className="text-white/60 text-sm mt-1">{filteredMedia[lightboxIndex]?.date}</p>
            </div>
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightboxIndex + 1} / {filteredMedia.length}
          </div>
        </div>
      )}
    </div>
  );
};
