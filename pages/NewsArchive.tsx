import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Filter, X, ArrowRight, Search, Grid, List, MessageSquare } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { THEMATIC_AREAS } from '../constants';
import { ThematicArea } from '../types';
import { usePosts } from '../src/features/posts/context/PostsContext';
import {
  formatPostDate,
  getPostCategory,
  getPostExcerpt,
  getPostImage,
  getPostUrl,
  getPostYear,
  isArticlePost,
  sortNewestFirst,
} from '../src/features/posts/postUtils';

export const NewsArchive: React.FC = () => {
  const { posts } = usePosts();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');

  const publicPosts = useMemo(() => sortNewestFirst(posts.filter(isArticlePost)), [posts]);

  const categories = useMemo(() => {
    const values = publicPosts.map(getPostCategory).filter(Boolean);
    return ['All', ...Array.from(new Set(values)).sort()];
  }, [publicPosts]);

  const years = useMemo(() => {
    const values = publicPosts.map(getPostYear).filter(Boolean);
    return Array.from(new Set(values)).sort((a, b) => b.localeCompare(a));
  }, [publicPosts]);

  const filteredPosts = useMemo(() => {
    return publicPosts.filter((post) => {
      if (selectedCategory !== 'All' && getPostCategory(post) !== selectedCategory) return false;
      if (selectedYear && getPostYear(post) !== selectedYear) return false;
      if (selectedTheme && post.theme !== selectedTheme) return false;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          (post.title || '').toLowerCase().includes(query) ||
          getPostExcerpt(post).toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [publicPosts, searchQuery, selectedCategory, selectedTheme, selectedYear]);

  const postsByYear = useMemo(() => {
    const grouped: Record<string, typeof filteredPosts> = {};
    filteredPosts.forEach((post) => {
      const year = getPostYear(post);
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(post);
    });

    return Object.entries(grouped).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filteredPosts]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedYear('');
    setSelectedTheme('');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedYear || selectedTheme || searchQuery;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Event':
        return 'bg-army-gold text-army-navy';
      case 'Humanitarian':
        return 'bg-army-red text-white';
      case 'Op-Ed':
        return 'bg-army-navy text-white';
      default:
        return 'bg-army-green text-white';
    }
  };

  const getThemeTitle = (theme?: string) => {
    if (!theme) return 'General';
    return THEMATIC_AREAS[theme as ThematicArea]?.title ?? 'General';
  };

  return (
    <div className="min-h-screen flex flex-col bg-army-cream">
      <Navbar />

      <main className="flex-grow">
        <section className="relative bg-gradient-to-br from-army-green via-army-olive to-army-forest py-10 sm:py-16 md:py-20">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>

          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">News & Events</h1>
              <div className="gold-line w-24 mx-auto mb-6"></div>
              <p className="text-green-100/80 max-w-2xl mx-auto mb-8">
                A documented record of initiatives, events, and commentary from Colonel (Retd.) Md. Jaglul Ahsan.
              </p>

              <div className="flex flex-wrap justify-center gap-6 text-white/80">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{publicPosts.length}</p>
                  <p className="text-sm">Total Posts</p>
                </div>
                <div className="w-px bg-white/20 hidden sm:block"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">
                    {publicPosts.filter((post) => getPostCategory(post) === 'Event').length}
                  </p>
                  <p className="text-sm">Events</p>
                </div>
                <div className="w-px bg-white/20 hidden sm:block"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">
                    {publicPosts.filter((post) => post.theme === 'humanitarian').length}
                  </p>
                  <p className="text-sm">Humanitarian</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border-b border-army-green/10 sticky top-20 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
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

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2.5 border border-army-green/20 rounded-lg text-army-navy"
              >
                <Filter size={18} />
                Filters
                {hasActiveFilters && <span className="w-2 h-2 bg-army-red rounded-full"></span>}
              </button>

              <div className="hidden md:flex items-center gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2.5 rounded-lg border border-army-green/20 focus:border-army-green outline-none bg-white text-army-navy text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

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

                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-2.5 rounded-lg border border-army-green/20 focus:border-army-green outline-none bg-white text-army-navy text-sm"
                >
                  <option value="">All Years</option>
                  {years.map((year) => (
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

            {showFilters && (
              <div className="md:hidden mt-4 pt-4 border-t border-army-green/10 space-y-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-army-green/20 focus:border-army-green outline-none bg-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
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
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-army-green/20 focus:border-army-green outline-none bg-white"
                >
                  <option value="">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-army-red text-sm font-medium flex items-center gap-1">
                    <X size={16} />
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <p className="text-army-olive/70">
                Showing <span className="font-semibold text-army-navy">{filteredPosts.length}</span> articles
                {hasActiveFilters && ' (filtered)'}
              </p>
              {viewMode === 'timeline' && <p className="text-sm text-army-olive/60">Grouped by year</p>}
            </div>

            {viewMode === 'grid' && filteredPosts.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-xl overflow-hidden border border-army-green/10 card-lift group hover-shine">
                    <Link to={getPostUrl(post)} className="block relative h-48 overflow-hidden img-zoom bg-army-cream">
                      <img src={getPostImage(post)} alt={post.title} className="w-full h-full object-cover" />
                      <span className={`${getCategoryColor(getPostCategory(post))} absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
                        {getPostCategory(post)}
                      </span>
                    </Link>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-army-green bg-army-green/5 px-2 py-0.5 rounded border border-army-green/20">
                          {getThemeTitle(post.theme)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-army-olive/60 mb-3">
                        <Calendar size={14} />
                        {formatPostDate(post)}
                      </div>

                      <Link to={getPostUrl(post)}>
                        <h3 className="font-serif font-bold text-army-navy text-lg mb-3 line-clamp-2 group-hover:text-army-green transition-colors">
                          {post.title || post.caption || 'Untitled update'}
                        </h3>
                      </Link>

                      <p className="text-army-olive/80 text-sm mb-4 line-clamp-2">
                        {getPostExcerpt(post)}
                      </p>

                      <Link to={getPostUrl(post)} className="inline-flex items-center gap-1.5 text-army-red font-semibold text-sm hover:text-army-green transition-colors">
                        Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {viewMode === 'timeline' && filteredPosts.length > 0 && (
              <div className="space-y-12">
                {postsByYear.map(([year, yearPosts]) => (
                  <div key={year} className="relative">
                    <div className="sticky top-36 z-30 mb-6">
                      <div className="inline-flex items-center gap-3 bg-army-green text-white px-6 py-2 rounded-full shadow-lg">
                        <Calendar size={18} />
                        <span className="font-bold text-lg">{year}</span>
                        <span className="text-sm text-green-100/80">({yearPosts.length} entries)</span>
                      </div>
                    </div>

                    <div className="relative pl-8 border-l-2 border-army-green/20 space-y-6">
                      {yearPosts.map((post) => (
                        <div key={post.id} className="relative group">
                          <div className="absolute -left-[41px] top-6 w-4 h-4 rounded-full bg-army-cream border-4 border-army-green group-hover:bg-army-gold group-hover:border-army-gold transition-colors"></div>

                          <div className="bg-white rounded-xl border border-army-green/10 overflow-hidden shadow-sm hover:shadow-md transition-all card-lift">
                            <div className="flex flex-col md:flex-row">
                              <Link to={getPostUrl(post)} className="md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden img-zoom bg-army-cream">
                                <img src={getPostImage(post)} alt={post.title} className="w-full h-full object-cover" />
                              </Link>

                              <div className="flex-1 p-6">
                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                  <span className={`${getCategoryColor(getPostCategory(post))} text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider`}>
                                    {getPostCategory(post)}
                                  </span>
                                  <span className="text-xs text-army-olive/60">{formatPostDate(post)}</span>
                                </div>

                                <Link to={getPostUrl(post)}>
                                  <h3 className="font-serif font-bold text-army-navy text-xl mb-2 group-hover:text-army-green transition-colors">
                                    {post.title || post.caption || 'Untitled update'}
                                  </h3>
                                </Link>

                                <p className="text-army-olive/80 text-sm mb-4 line-clamp-2">
                                  {getPostExcerpt(post)}
                                </p>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-army-olive/60">
                                  <div className="flex items-center gap-1">
                                    <MessageSquare size={14} />
                                    <span>{Object.values(post.reactions).reduce((sum, count) => sum + count, 0)} reactions</span>
                                  </div>
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
