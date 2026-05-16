import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PostCard } from '../components/PostCard';
import { usePosts } from '../context/PostsContext';
import { THEMATIC_AREAS } from '@/constants';
import { Calendar, TrendingUp, Award, Image as ImageIcon, Rss, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PostType } from '../types';

// ── Type filter config ──────────────────────────────────────
const TYPE_FILTERS: { value: PostType | 'all'; label: string; emoji: string; color: string }[] = [
  { value: 'all', label: 'All Updates', emoji: '🗂️', color: 'bg-army-green text-white' },
  { value: 'news', label: 'News', emoji: '📰', color: 'bg-army-navy text-white' },
  { value: 'event', label: 'Events', emoji: '📍', color: 'bg-army-gold text-army-navy' },
  { value: 'gallery', label: 'Gallery', emoji: '🖼️', color: 'bg-army-olive text-white' },
  { value: 'achievement', label: 'Achievements', emoji: '🏆', color: 'bg-amber-600 text-white' },
  { value: 'announcement', label: 'Announcements', emoji: '📢', color: 'bg-army-red text-white' },
  { value: 'video', label: 'Videos', emoji: '🎥', color: 'bg-army-navy/80 text-white' },
];

const THEME_LABELS: Record<string, string> = {
  humanitarian: 'Humanitarian',
  education: 'Education & Youth',
  security: 'National Security',
  veterans: 'Veterans Welfare',
  civic: 'Civic Action',
};

export const Feed: React.FC = () => {
  const { posts } = usePosts();
  const { isAdmin } = useAuth();

  const [searchParams, setSearchParams] = useSearchParams();

  // ── Active filters state (initialized from URL) ──────────
  const [activeType, setActiveType] = useState<PostType | 'all'>((searchParams.get('type') as PostType) || 'all');
  const [activeTheme, setActiveTheme] = useState<string>(searchParams.get('theme') || '');

  // Sync state with URL params
  useEffect(() => {
    const type = searchParams.get('type') as PostType || 'all';
    const theme = searchParams.get('theme') || '';
    setActiveType(type);
    setActiveTheme(theme);
  }, [searchParams]);

  // Helper to update filters and URL
  const updateFilters = (type: PostType | 'all', theme: string) => {
    const params: Record<string, string> = {};
    if (type !== 'all') params.type = type;
    if (theme) params.theme = theme;
    setSearchParams(params);
  };

  const clearFilters = () => updateFilters('all', '');
  const publicPosts = useMemo(() =>
    posts
      .filter(p => p.visibility === 'published')
      .sort((a, b) => {
        // pinned always float to top within any filter
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }),
    [posts]
  );

  // ── Filtered feed (type + theme combined) ────────────────
  const filteredPosts = useMemo(() => {
    return publicPosts.filter(p => {
      const typeMatch = activeType === 'all' || p.type === activeType;
      const themeMatch = activeTheme === '' || p.theme === activeTheme;
      return typeMatch && themeMatch;
    });
  }, [publicPosts, activeType, activeTheme]);

  // ── Count per type (always from full public list) ────────
  const countByType = useMemo(() => {
    const counts: Record<string, number> = { all: publicPosts.length };
    TYPE_FILTERS.slice(1).forEach(f => {
      counts[f.value] = publicPosts.filter(p => p.type === f.value).length;
    });
    return counts;
  }, [publicPosts]);

  // ── Right sidebar widgets ────────────────────────────────
  const upcomingEvents = publicPosts.filter(p => p.type === 'event').slice(0, 3);
  const featuredGallery = publicPosts.filter(p => p.media.length > 0).slice(0, 4);

  const hasActiveFilter = activeType !== 'all' || activeTheme !== '';

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f0]">
      <Navbar />

      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-army-navy via-army-green to-army-olive py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-army-gold/20 flex items-center justify-center border border-army-gold/30">
                <Rss size={20} className="text-army-gold" />
              </div>
              <div>
                <h1 className="font-serif font-bold text-white text-2xl sm:text-3xl tracking-wide">
                  Live Updates
                </h1>
                <p className="text-green-100/60 text-sm mt-0.5">
                  News · Events · Gallery · Achievements · Announcements
                </p>
              </div>
            </div>
            {isAdmin && (
              <Link
                to="/admin/studio"
                className="flex items-center gap-2 bg-army-gold text-army-navy text-sm font-bold px-5 py-2.5 rounded-lg hover:brightness-110 transition-all shadow-md"
              >
                ✦ Create Post
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── STICKY CATEGORY FILTER BAR ───────────────────────── */}
      <div className="sticky top-[80px] z-40 bg-white border-b border-army-green/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            {TYPE_FILTERS.map(f => {
              const count = countByType[f.value] ?? 0;
              const isActive = activeType === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => updateFilters(f.value, activeTheme)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex-shrink-0
                    ${isActive
                      ? `${f.color} shadow-sm scale-[1.02]`
                      : 'bg-army-cream/60 text-army-olive/70 hover:bg-army-cream hover:text-army-navy'
                    }`}
                >
                  <span>{f.emoji}</span>
                  <span>{f.label}</span>
                  {count > 0 && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center
                      ${isActive ? 'bg-white/25 text-white' : 'bg-army-olive/10 text-army-olive/60'}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Active filter pill + clear */}
            {hasActiveFilter && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2 ml-2 rounded-full text-xs font-bold bg-army-red/10 text-army-red hover:bg-army-red/20 transition-all flex-shrink-0 border border-army-red/20"
              >
                <X size={12} /> Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────── */}
      <main className="flex-grow py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* ── LEFT SIDEBAR ──────────────────────────────── */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-[140px] space-y-5">

                {/* Theme Filters (functional) */}
                <div className="bg-white rounded-xl border border-army-green/10 p-5 shadow-sm">
                  <h3 className="text-[10px] font-bold text-army-olive/50 uppercase tracking-widest mb-3">
                    Filter by Theme
                  </h3>
                  <nav className="space-y-0.5">
                    {/* "All Themes" reset */}
                    <button
                      onClick={() => updateFilters(activeType, '')}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-between group
                        ${activeTheme === '' ? 'bg-army-green text-white' : 'text-army-olive/70 hover:bg-army-cream hover:text-army-navy'}`}
                    >
                      <span>All Themes</span>
                      <span className={`text-xs font-bold px-1.5 rounded-full
                        ${activeTheme === '' ? 'bg-white/20 text-white' : 'text-army-olive/30'}`}>
                        {publicPosts.length}
                      </span>
                    </button>

                    {Object.entries(THEME_LABELS).map(([key, label]) => {
                      const themeCount = publicPosts.filter(p => p.theme === key).length;
                      const isThemeActive = activeTheme === key;
                      return (
                        <button
                          key={key}
                          onClick={() => updateFilters(activeType, isThemeActive ? '' : key)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-between group
                            ${isThemeActive
                              ? 'bg-army-green/10 text-army-green border border-army-green/20'
                              : 'text-army-olive/70 hover:bg-army-cream hover:text-army-navy'
                            }`}
                        >
                          <span>{label}</span>
                          <span className={`text-xs font-bold px-1.5 rounded-full
                            ${isThemeActive ? 'bg-army-green/15 text-army-green' : 'bg-army-olive/5 text-army-olive/40'}`}>
                            {themeCount}
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-xl border border-army-green/10 p-5 shadow-sm">
                  <h3 className="text-[10px] font-bold text-army-olive/50 uppercase tracking-widest mb-3">
                    Quick Links
                  </h3>
                  <div className="space-y-1">
                    <button onClick={() => updateFilters('news', '')} className="w-full flex items-center gap-3 text-sm text-army-olive/70 hover:text-army-green transition-colors py-2 px-2 rounded-lg hover:bg-army-cream text-left">
                      <div className="w-6 h-6 rounded bg-army-navy/5 flex items-center justify-center"><Award size={13} className="text-army-navy" /></div>
                      News Archive
                    </button>
                    <button onClick={() => updateFilters('gallery', '')} className="w-full flex items-center gap-3 text-sm text-army-olive/70 hover:text-army-green transition-colors py-2 px-2 rounded-lg hover:bg-army-cream text-left">
                      <div className="w-6 h-6 rounded bg-army-gold/10 flex items-center justify-center"><ImageIcon size={13} className="text-army-gold" /></div>
                      Media Gallery
                    </button>
                    <Link to="/contact" className="flex items-center gap-3 text-sm text-army-olive/70 hover:text-army-green transition-colors py-2 px-2 rounded-lg hover:bg-army-cream">
                      <div className="w-6 h-6 rounded bg-army-green/10 flex items-center justify-center"><TrendingUp size={13} className="text-army-green" /></div>
                      Get Involved
                    </Link>
                  </div>
                </div>

              </div>
            </aside>

            {/* ── CENTER FEED ───────────────────────────────── */}
            <div className="lg:col-span-6">

              {/* Active filter summary */}
              {hasActiveFilter && (
                <div className="flex items-center gap-2 mb-5 flex-wrap">
                  <span className="text-xs text-army-olive/50 font-medium">Showing:</span>
                  {activeType !== 'all' && (
                    <span className="flex items-center gap-1 bg-army-green text-white text-xs font-bold px-3 py-1 rounded-full">
                      {TYPE_FILTERS.find(f => f.value === activeType)?.emoji} {TYPE_FILTERS.find(f => f.value === activeType)?.label}
                      <button onClick={() => updateFilters('all', activeTheme)} className="ml-1 hover:opacity-70"><X size={10} /></button>
                    </span>
                  )}
                  {activeTheme && (
                    <span className="flex items-center gap-1 bg-army-gold/90 text-army-navy text-xs font-bold px-3 py-1 rounded-full">
                      {THEME_LABELS[activeTheme]}
                      <button onClick={() => updateFilters(activeType, '')} className="ml-1 hover:opacity-70"><X size={10} /></button>
                    </span>
                  )}
                  <span className="text-xs text-army-olive/40 ml-1">
                    — {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'}
                  </span>
                </div>
              )}

              {/* Posts */}
              <div className="space-y-6">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map(post => (
                    <PostCard key={post.id} post={post} isAdmin={isAdmin} />
                  ))
                ) : (
                  <div className="bg-white rounded-xl border border-army-green/10 p-16 text-center shadow-sm">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="font-serif font-bold text-army-navy text-lg mb-1">No posts found</p>
                    <p className="text-army-olive/50 text-sm mb-5">
                      {hasActiveFilter
                        ? 'No content matches your current filters.'
                        : 'No published updates yet.'}
                    </p>
                    {hasActiveFilter && (
                      <button onClick={clearFilters} className="text-army-green font-bold text-sm hover:underline">
                        Clear all filters →
                      </button>
                    )}
                    {!hasActiveFilter && isAdmin && (
                      <Link to="/admin/studio" className="inline-block text-army-green font-semibold text-sm hover:underline">
                        Create your first post →
                      </Link>
                    )}
                  </div>
                )}
              </div>

            </div>

            {/* ── RIGHT SIDEBAR ─────────────────────────────── */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-[140px] space-y-5">

                {/* Upcoming Events */}
                {upcomingEvents.length > 0 && (
                  <div className="bg-white rounded-xl border border-army-green/10 p-5 shadow-sm">
                    <h3 className="font-serif font-bold text-army-navy text-sm mb-4 flex items-center gap-2 uppercase tracking-wide">
                      <Calendar size={15} className="text-army-gold" /> Upcoming Events
                    </h3>
                    <div className="space-y-4">
                      {upcomingEvents.map(event => (
                        <button
                          key={event.id}
                          onClick={() => { updateFilters('event', ''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="w-full text-left group border-b border-army-green/5 pb-4 last:border-0 last:pb-0"
                        >
                          <p className="text-[10px] font-bold text-army-gold uppercase tracking-widest mb-1">
                            {new Date(event.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                          <h4 className="text-sm font-semibold text-army-navy group-hover:text-army-green transition-colors line-clamp-2 leading-tight">
                            {event.title || event.caption}
                          </h4>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => { updateFilters('event', ''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="mt-4 text-xs font-bold text-army-green hover:text-army-gold transition-colors uppercase tracking-widest"
                    >
                      See all events →
                    </button>
                  </div>
                )}

                {/* Latest Media */}
                {featuredGallery.length > 0 && (
                  <div className="bg-white rounded-xl border border-army-green/10 p-5 shadow-sm">
                    <h3 className="font-serif font-bold text-army-navy text-sm mb-4 flex items-center gap-2 uppercase tracking-wide">
                      <ImageIcon size={15} className="text-army-gold" /> Latest Media
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {featuredGallery.map(post => (
                        <div
                          key={post.id}
                          onClick={() => { updateFilters('gallery', ''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="aspect-square rounded-lg overflow-hidden border border-army-green/10 bg-army-cream/30 cursor-pointer group"
                        >
                          {post.media[0] && (
                            <img
                              src={post.media[0].url}
                              alt={post.title || 'Post'}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => { updateFilters('gallery', ''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="block w-full text-center text-xs font-bold text-army-green hover:text-army-gold transition-colors mt-4 uppercase tracking-widest"
                    >
                      View Full Gallery →
                    </button>
                  </div>
                )}

                {/* Type summary mini-panel */}
                <div className="bg-white rounded-xl border border-army-green/10 p-5 shadow-sm">
                  <h3 className="text-[10px] font-bold text-army-olive/50 uppercase tracking-widest mb-4">
                    Content Breakdown
                  </h3>
                  <div className="space-y-2">
                    {TYPE_FILTERS.slice(1).filter(f => (countByType[f.value] ?? 0) > 0).map(f => (
                      <button
                        key={f.value}
                        onClick={() => updateFilters(f.value, activeTheme)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all
                          ${activeType === f.value ? 'bg-army-green/10 text-army-green font-bold' : 'text-army-olive/70 hover:bg-army-cream'}`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{f.emoji}</span> {f.label}
                        </span>
                        <span className="font-bold text-xs bg-army-cream rounded-full w-6 h-6 flex items-center justify-center">
                          {countByType[f.value]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
