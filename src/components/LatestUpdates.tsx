import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Play, Rss } from 'lucide-react';
import { Post } from '../features/posts/types';
import { getPostUrl, getPostImage, getPostExcerpt, formatPostDate, sortNewestFirst } from '../features/posts/postUtils';

interface LatestUpdatesProps {
  posts: Post[];
}

export const LatestUpdates: React.FC<LatestUpdatesProps> = ({ posts }) => {
  const latestPosts = sortNewestFirst(posts).slice(0, 3);



  return (
    <section className="py-20 bg-[#fbfbfb] border-t border-army-green/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-army-gold font-black uppercase tracking-[0.2em] text-[10px] mb-3">
              <span className="w-8 h-[1px] bg-army-gold"></span>
              Live Feed
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-army-navy leading-tight">
              Latest Article and Blogs
            </h2>
            <p className="text-army-olive/70 mt-3 text-base sm:text-lg leading-relaxed">
              Real-time updates on news, events, and community initiatives led by Colonel Jaglul Ahsan.
            </p>
          </div>

          <Link
            to="/feed"
            className="group flex items-center gap-3 px-6 py-3 bg-army-navy text-white rounded-lg text-sm font-bold hover:bg-army-navy/90 transition-all shadow-lg shadow-army-navy/20"
          >
            Explore All Updates
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <Link
              key={post.id}
              to={getPostUrl(post)}
              className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-army-green/10 hover:border-army-gold/30 hover:shadow-2xl hover:shadow-army-green/5 transition-all duration-500 h-full"
            >
              {/* Media Preview */}
              <div className="aspect-[16/10] overflow-hidden relative">
                {post.type === 'video' ? (
                  <div className="relative h-full">
                    <img
                      src={getPostImage(post)}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-army-navy/40 flex items-center justify-center group-hover:bg-army-navy/20 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-army-gold text-army-navy flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                        <Play size={20} fill="currentColor" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={getPostImage(post)}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                )}

                {/* Date & Time Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-sm">
                  <Calendar size={14} className="text-army-gold" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-army-navy">
                    {formatPostDate(post)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-army-olive/50 text-[10px] font-bold uppercase tracking-widest mb-3">
                  {formatPostDate(post)}
                </div>

                <h3 className="text-xl font-serif font-bold text-army-navy group-hover:text-army-green transition-colors mb-3 line-clamp-2 leading-tight">
                  {post.title}
                </h3>

                <p className="text-army-olive/60 text-sm leading-relaxed line-clamp-3 mb-6">
                  {getPostExcerpt(post)}
                </p>

                <div className="mt-auto flex items-center gap-2 text-army-green text-xs font-black uppercase tracking-widest group-hover:gap-3 transition-all">
                  Read Update
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mini Stats Bar */}
        <div className="mt-16 py-6 px-8 bg-army-navy rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-army-gold/10 flex items-center justify-center">
              <Rss size={18} className="text-army-gold" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Stay connected with the latest</p>
              <p className="text-white/50 text-xs mt-0.5">Subscribe to our live updates feed</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-army-gold font-serif text-xl font-black">{posts.length}</p>
              <p className="text-white/40 text-[9px] uppercase tracking-widest font-bold">Total Posts</p>
            </div>
            <div className="w-[1px] h-8 bg-white/10 hidden sm:block"></div>
            <div className="text-center">
              <p className="text-army-gold font-serif text-xl font-black">
                {posts.filter(p => p.type === 'event').length}
              </p>
              <p className="text-white/40 text-[9px] uppercase tracking-widest font-bold">Events</p>
            </div>
            <div className="w-[1px] h-8 bg-white/10 hidden sm:block"></div>
            <div className="text-center">
              <p className="text-army-gold font-serif text-xl font-black">
                {posts.filter(p => p.type === 'video').length}
              </p>
              <p className="text-white/40 text-[9px] uppercase tracking-widest font-bold">Videos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
