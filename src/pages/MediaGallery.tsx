import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Image, Calendar, Filter, X, Grid, ChevronLeft, ChevronRight, ZoomIn, Trash2, ArrowUpDown } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ImageUpload } from '../components/ImageUpload';
import { useGallery } from '../context/GalleryContext';
import { useAuth } from '../context/AuthContext';
import { THEMATIC_AREAS } from '../constants';
import { GalleryImage, GalleryCategory, ThematicArea } from '../types';

type TabType = 'all' | GalleryCategory;
type SortType = 'newest' | 'oldest';

export const MediaGallery: React.FC = () => {
  const { allImages, deleteUploadedImage } = useGallery();
  const { isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortType>('newest');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const tabs: { key: TabType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'media', label: 'Media' },
    { key: 'vision', label: 'Vision' },
    { key: 'uploaded', label: 'Uploaded' },
  ];

  // Unique years across all images
  const years = useMemo(() => {
    const yearSet = new Set(allImages.map(m => m.year).filter(Boolean) as string[]);
    return Array.from(yearSet).sort((a, b) => b.localeCompare(a));
  }, [allImages]);

  // Filtered + sorted images
  const filteredImages = useMemo(() => {
    let result = allImages.filter(item => {
      if (activeTab !== 'all' && item.category !== activeTab) return false;
      if (selectedYear && item.year !== selectedYear) return false;
      if (selectedTheme && item.subCategory !== selectedTheme) return false;
      return true;
    });

    result = [...result].sort((a, b) =>
      sortOrder === 'newest' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
    );

    return result;
  }, [allImages, activeTab, selectedYear, selectedTheme, sortOrder]);

  // Group by year for display
  const imagesByYear = useMemo(() => {
    const grouped: Record<string, GalleryImage[]> = {};
    filteredImages.forEach(item => {
      const key = item.year ?? 'Undated';
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
    });
    return Object.entries(grouped).sort((a, b) =>
      sortOrder === 'newest' ? b[0].localeCompare(a[0]) : a[0].localeCompare(b[0])
    );
  }, [filteredImages, sortOrder]);

  const clearFilters = () => {
    setSelectedYear('');
    setSelectedTheme('');
  };

  const hasActiveFilters = selectedYear || selectedTheme;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigate = (dir: 'prev' | 'next') => {
    if (lightboxIndex === null) return;
    const len = filteredImages.length;
    setLightboxIndex(dir === 'prev' ? (lightboxIndex - 1 + len) % len : (lightboxIndex + 1) % len);
  };

  const getThemeLabel = (subCategory?: string) => {
    if (!subCategory) return null;
    const area = THEMATIC_AREAS[subCategory as ThematicArea];
    return area?.title ?? subCategory;
  };

  const currentImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  // Counts per tab
  const counts = useMemo(() => ({
    all: allImages.length,
    media: allImages.filter(i => i.category === 'media').length,
    vision: allImages.filter(i => i.category === 'vision').length,
    uploaded: allImages.filter(i => i.category === 'uploaded').length,
  }), [allImages]);

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
                  <p className="text-3xl font-bold text-white">{counts.all}</p>
                  <p className="text-sm">Total Images</p>
                </div>
                <div className="w-px bg-white/20"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{years.length}</p>
                  <p className="text-sm">Years Archived</p>
                </div>
                {counts.uploaded > 0 && (
                  <>
                    <div className="w-px bg-white/20"></div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-white">{counts.uploaded}</p>
                      <p className="text-sm">Uploaded</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Admin Upload Panel */}
        {isAdmin && (
          <section className="bg-army-forest/5 border-b border-army-green/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <button
                onClick={() => setShowUpload(prev => !prev)}
                className="text-sm font-medium text-army-green hover:text-army-olive flex items-center gap-2 transition-colors"
              >
                <Grid size={16} />
                {showUpload ? 'Hide Upload Panel' : 'Upload New Images'}
              </button>
              {showUpload && (
                <div className="mt-3 max-w-xl">
                  <ImageUpload />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Tabs + Filters */}
        <section className="bg-white border-b border-army-green/10 sticky top-[4.5rem] sm:top-20 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tabs */}
            <div className="flex gap-1 pt-3 pb-0 border-b border-army-green/10 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'bg-army-green text-white'
                      : 'text-army-olive hover:text-army-green hover:bg-army-green/5'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.key ? 'bg-white/20' : 'bg-army-green/10 text-army-olive'
                  }`}>
                    {counts[tab.key]}
                  </span>
                </button>
              ))}
            </div>

            {/* Filters row */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-3 py-3">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-army-olive" />
                <span className="text-army-navy font-medium text-sm">
                  {filteredImages.length} images
                  {hasActiveFilters && ' (filtered)'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Sort */}
                <button
                  onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-army-green/20 text-army-navy text-sm hover:border-army-green/50 transition-colors"
                >
                  <ArrowUpDown size={14} className="text-army-olive" />
                  {sortOrder === 'newest' ? 'Newest first' : 'Oldest first'}
                </button>

                {/* Year Filter */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-army-green/20 focus:border-army-green outline-none bg-white text-army-navy text-sm"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

                {/* Theme Filter — only for media/all tabs */}
                {(activeTab === 'all' || activeTab === 'media') && (
                  <select
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-army-green/20 focus:border-army-green outline-none bg-white text-army-navy text-sm"
                  >
                    <option value="">All Themes</option>
                    {Object.entries(THEMATIC_AREAS).map(([key, value]) => (
                      <option key={key} value={key}>{value.title}</option>
                    ))}
                  </select>
                )}

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
            {imagesByYear.length > 0 ? (
              <div className="space-y-16">
                {imagesByYear.map(([year, images]) => (
                  <div key={year}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-army-green text-white px-6 py-2 rounded-full font-bold flex items-center gap-2">
                        <Calendar size={18} />
                        {year}
                      </div>
                      <div className="flex-1 h-px bg-army-green/20"></div>
                      <span className="text-sm text-army-olive/60">{images.length} images</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                      {images.map(item => {
                        const globalIndex = filteredImages.findIndex(m => m.id === item.id);
                        return (
                          <div
                            key={item.id}
                            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-army-olive/10 cursor-pointer card-lift"
                            onClick={() => openLightbox(globalIndex)}
                          >
                            <img
                              src={item.src}
                              alt={item.caption}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-army-forest/90 via-army-forest/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <p className="text-white text-sm font-medium line-clamp-2 mb-1">{item.caption}</p>
                                {item.date && <p className="text-white/60 text-xs">{item.date}</p>}
                              </div>
                              <div className="absolute top-4 right-4">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                  <ZoomIn size={18} className="text-white" />
                                </div>
                              </div>
                            </div>

                            {/* Category badge */}
                            <div className="absolute top-3 left-3 flex gap-1">
                              {item.category === 'uploaded' && (
                                <span className="bg-army-gold/90 text-army-forest text-xs font-bold px-2 py-0.5 rounded">
                                  Uploaded
                                </span>
                              )}
                              {item.subCategory && getThemeLabel(item.subCategory) && item.category === 'media' && (
                                <span className="bg-white/90 backdrop-blur-sm text-army-navy text-xs font-medium px-2 py-1 rounded">
                                  {getThemeLabel(item.subCategory)}
                                </span>
                              )}
                            </div>

                            {/* Admin delete button for uploaded images */}
                            {isAdmin && item.category === 'uploaded' && (
                              <button
                                className="absolute bottom-3 right-3 w-8 h-8 bg-army-red/80 hover:bg-army-red text-white rounded-full items-center justify-center hidden group-hover:flex transition-colors z-10"
                                onClick={e => { e.stopPropagation(); deleteUploadedImage(item.id); }}
                                title="Delete image"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
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
                <p className="text-army-olive/70 mb-6">Try adjusting your filters or switching tabs.</p>
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

        <section className="py-8 bg-white border-t border-army-green/10">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-sm text-army-olive/60">
              All images are from documented events and initiatives. For media inquiries or high-resolution images,{' '}
              <Link to="/contact" className="text-army-green hover:underline">contact us</Link>.
            </p>
          </div>
        </section>
      </main>

      <Footer />

      {/* Lightbox */}
      {currentImage !== null && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-3 z-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={closeLightbox}
          >
            <X size={28} />
          </button>

          <button
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50 min-w-[48px] min-h-[48px] flex items-center justify-center"
            onClick={e => { e.stopPropagation(); navigate('prev'); }}
          >
            <ChevronLeft size={28} />
          </button>
          <button
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50 min-w-[48px] min-h-[48px] flex items-center justify-center"
            onClick={e => { e.stopPropagation(); navigate('next'); }}
          >
            <ChevronRight size={28} />
          </button>

          <div className="max-w-5xl max-h-[80vh] p-4" onClick={e => e.stopPropagation()}>
            <img
              src={currentImage.src}
              alt={currentImage.caption}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <p className="text-white font-medium">{currentImage.caption}</p>
              {currentImage.date && <p className="text-white/60 text-sm mt-1">{currentImage.date}</p>}
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightboxIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </div>
  );
};
