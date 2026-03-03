import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageSquare, Filter, X, ArrowRight, Search, Grid, List, MapPin, Users, ChevronDown } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { INITIAL_POSTS, POST_CATEGORIES, POST_TAGS, POST_YEARS, THEMATIC_AREAS } from '../constants';
import { Post, PostTag, ThematicArea } from '../types';

export const NewsArchive: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');

  // Filter posts based on selections
  const filteredPosts = useMemo(() => {
    return INITIAL_POSTS.filter(post => {
      // Category filter
      if (selectedCategory !== 'All' && post.category !== selectedCategory) return false;
      
      // Tag filter
      if (selectedTag && !post.tags.includes(selectedTag as PostTag)) return false;
      
      // Year filter
      if (selectedYear && !post.date.includes(selectedYear)) return false;
      
      // Theme filter
      if (selectedTheme && post.thematicArea !== selectedTheme) return false;
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return post.title.toLowerCase().includes(query) || 
               post.excerpt.toLowerCase().includes(query);
      }
      
      return true;
    });
  }, [selectedCategory, selectedTag, selectedYear, selectedTheme, searchQuery]);

  // Group posts by year for timeline view
  const postsByYear = useMemo(() => {
    const grouped: { [key: string]: Post[] } = {};
    filteredPosts.forEach(post => {
      const year = post.date.split(', ')[1] || '2025';
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(post);
    });
    return Object.entries(grouped).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filteredPosts]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedTag('');
    setSelectedYear('');
    setSelectedTheme('');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedTag || selectedYear || selectedTheme || searchQuery;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Event': return 'bg-army-gold text-army-navy';
      case 'Humanitarian': return 'bg-army-red text-white';
      case 'Op-Ed': return 'bg-army-navy text-white';
      default: return 'bg-army-green text-white';
    }
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">News & Events</h1>
              <div className="gold-line w-24 mx-auto mb-6"></div>
              <p className="text-green-100/80 max-w-2xl mx-auto mb-8">
                A documented record of initiatives, events, and commentary from Colonel (Retd.) Md. Jaglul Ahsan.
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 text-white/80">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{INITIAL_POSTS.length}</p>
                  <p className="text-sm">Total Posts</p>
                </div>
                <div className="w-px bg-white/20 hidden sm:block"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{INITIAL_POSTS.filter(p => p.category === 'Event').length}</p>
                  <p className="text-sm">Events</p>
                </div>
                <div className="w-px bg-white/20 hidden sm:block"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{INITIAL_POSTS.filter(p => p.thematicArea === 'humanitarian').length}</p>
                  <p className="text-sm">Humanitarian</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="bg-white border-b border-army-green/10 sticky top-20 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-army-olive/50" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-army-green/20 focus:border-army-green outline-none transition-colors"
                />
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-army-cream rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-army-green text-white' : 'text-army-olive hover:bg-army-green/10'}`}
                  title="Grid View"
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'timeline' ? 'bg-army-green text-white' : 'text-army-olive hover:bg-army-green/10'}`}
                  title="Timeline View"
                >
                  <List size={18} />
                </button>
              </div>

              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2.5 border border-army-green/20 rounded-lg text-army-navy"
              >
                <Filter size={18} />
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-army-red rounded-full"></span>
                )}
              </button>

              {/* Desktop Filters */}
              <div className="hidden md:flex items-center gap-3">
                {/* Category */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2.5 rounded-lg border border-army-green/20 focus:border-army-green outline-none bg-white text-army-navy text-sm"
                >
                  {POST_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                {/* Theme */}
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

                {/* Year */}
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-2.5 rounded-lg border border-army-green/20 focus:border-army-green outline-none bg-white text-army-navy text-sm"
                >
                  <option value="">All Years</option>
                  {POST_YEARS.map(year => (
                    <option key={year} value={year}>{year}</option>
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

            {/* Mobile Filters Dropdown */}
            {showFilters && (
              <div className="md:hidden mt-4 pt-4 border-t border-army-green/10 space-y-3">
                <div>
                  <label className="text-xs text-army-olive/60 uppercase tracking-wider mb-1 block">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-army-green/20 focus:border-army-green outline-none bg-white"
                  >
                    {POST_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-army-olive/60 uppercase tracking-wider mb-1 block">Theme</label>
                  <select
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-army-green/20 focus:border-army-green outline-none bg-white"
                  >
                    <option value="">All Themes</option>
                    {Object.entries(THEMATIC_AREAS).map(([key, value]) => (
                      <option key={key} value={key}>{value.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-army-olive/60 uppercase tracking-wider mb-1 block">Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-army-green/20 focus:border-army-green outline-none bg-white"
                  >
                    <option value="">All Years</option>
                    {POST_YEARS.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-army-red text-sm font-medium flex items-center gap-1"
                  >
                    <X size={16} />
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-army-olive/70">
                Showing <span className="font-semibold text-army-navy">{filteredPosts.length}</span> articles
                {hasActiveFilters && ' (filtered)'}
              </p>
              {viewMode === 'timeline' && (
                <p className="text-sm text-army-olive/60">Grouped by year</p>
              )}
            </div>

            {/* Grid View */}
            {viewMode === 'grid' && filteredPosts.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article 
                    key={post.id}
                    className="bg-white rounded-xl overflow-hidden border border-army-green/10 card-lift group hover-shine"
                  >
                    {/* Image */}
                    <Link to={`/news/${post.id}`} className="block relative h-48 overflow-hidden img-zoom">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className={`${getCategoryColor(post.category)} text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
                          {post.category}
                        </span>
                      </div>
                      {/* Comment Badge */}
                      {post.commentsEnabled && post.commentCount > 0 && (
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-army-navy text-xs font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1.5">
                          <MessageSquare size={12} />
                          {post.commentCount}
                        </div>
                      )}
                    </Link>
                    
                    {/* Content */}
                    <div className="p-6">
                      {/* Theme Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs text-${getThemeConfig(post.thematicArea).color}/80 bg-${getThemeConfig(post.thematicArea).color}/5 px-2 py-0.5 rounded border border-${getThemeConfig(post.thematicArea).color}/20`}>
                          {getThemeConfig(post.thematicArea).title}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-army-olive/60 mb-3">
                        <Calendar size={14} />
                        {post.date}
                        {post.eventDetails?.location && (
                          <>
                            <span className="w-1 h-1 bg-army-olive/40 rounded-full"></span>
                            <MapPin size={14} />
                            <span className="truncate max-w-[120px]">{post.eventDetails.location.split(',')[0]}</span>
                          </>
                        )}
                      </div>
                      
                      {/* Title */}
                      <Link to={`/news/${post.id}`}>
                        <h3 className="font-serif font-bold text-army-navy text-lg mb-3 line-clamp-2 group-hover:text-army-green transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      
                      {/* Excerpt */}
                      <p className="text-army-olive/80 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      {/* Read More */}
                      <Link 
                        to={`/news/${post.id}`}
                        className="inline-flex items-center gap-1.5 text-army-red font-semibold text-sm hover:text-army-green transition-colors"
                      >
                        Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Timeline View */}
            {viewMode === 'timeline' && filteredPosts.length > 0 && (
              <div className="space-y-12">
                {postsByYear.map(([year, posts]) => (
                  <div key={year} className="relative">
                    {/* Year Header */}
                    <div className="sticky top-36 z-30 mb-6">
                      <div className="inline-flex items-center gap-3 bg-army-green text-white px-6 py-2 rounded-full shadow-lg">
                        <Calendar size={18} />
                        <span className="font-bold text-lg">{year}</span>
                        <span className="text-sm text-green-100/80">({posts.length} entries)</span>
                      </div>
                    </div>

                    {/* Timeline Items */}
                    <div className="relative pl-8 border-l-2 border-army-green/20 space-y-6">
                      {posts.map((post, index) => (
                        <div key={post.id} className="relative group">
                          {/* Timeline Dot */}
                          <div className="absolute -left-[41px] top-6 w-4 h-4 rounded-full bg-army-cream border-4 border-army-green group-hover:bg-army-gold group-hover:border-army-gold transition-colors"></div>
                          
                          {/* Card */}
                          <div className="bg-white rounded-xl border border-army-green/10 overflow-hidden shadow-sm hover:shadow-md transition-all card-lift">
                            <div className="flex flex-col md:flex-row">
                              {/* Image */}
                              <Link to={`/news/${post.id}`} className="md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden img-zoom">
                                <img 
                                  src={post.imageUrl} 
                                  alt={post.title}
                                  className="w-full h-full object-cover"
                                />
                              </Link>
                              
                              {/* Content */}
                              <div className="flex-1 p-6">
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                  <span className={`${getCategoryColor(post.category)} text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider`}>
                                    {post.category}
                                  </span>
                                  <span className="text-xs text-army-olive/60">{post.date}</span>
                                  {post.eventDetails?.role && (
                                    <span className="text-xs text-army-gold bg-army-gold/10 px-2 py-0.5 rounded">
                                      {post.eventDetails.role}
                                    </span>
                                  )}
                                </div>
                                
                                <Link to={`/news/${post.id}`}>
                                  <h3 className="font-serif font-bold text-army-navy text-xl mb-2 group-hover:text-army-green transition-colors">
                                    {post.title}
                                  </h3>
                                </Link>
                                
                                <p className="text-army-olive/80 text-sm mb-4 line-clamp-2">
                                  {post.excerpt}
                                </p>
                                
                                {/* Meta Row */}
                                <div className="flex flex-wrap items-center gap-4 text-sm text-army-olive/60">
                                  {post.eventDetails?.location && (
                                    <div className="flex items-center gap-1">
                                      <MapPin size={14} />
                                      <span className="truncate max-w-[200px]">{post.eventDetails.location}</span>
                                    </div>
                                  )}
                                  {post.eventDetails?.attendees && (
                                    <div className="flex items-center gap-1">
                                      <Users size={14} />
                                      <span>{post.eventDetails.attendees} attendees</span>
                                    </div>
                                  )}
                                  {post.commentCount > 0 && (
                                    <div className="flex items-center gap-1">
                                      <MessageSquare size={14} />
                                      <span>{post.commentCount} responses</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-army-green/10">
                <Search className="w-12 h-12 text-army-olive/30 mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-army-navy mb-2">No articles found</h3>
                <p className="text-army-olive/70 mb-6">Try adjusting your filters or search query.</p>
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
      </main>
      
      <Footer />
    </div>
  );
};
