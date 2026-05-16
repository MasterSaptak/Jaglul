import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from '../features/posts/types';
import {
  formatPostDate,
  getPostCategory,
  getPostExcerpt,
  getPostImage,
  getPostUrl,
  isArticlePost,
  sortNewestFirst,
} from '../features/posts/postUtils';

interface NewsSectionProps {
  posts: Post[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ posts }) => {
  const latestPosts = sortNewestFirst(posts.filter(isArticlePost)).slice(0, 3);

  if (latestPosts.length === 0) return null;

  return (
    <section id="news" className="py-16 sm:py-20 bg-white border-t border-army-green/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-army-green mb-2">
            Latest News
          </h2>
          <div className="gold-line w-16 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {latestPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg overflow-hidden border border-army-green/10 shadow-sm group hover:shadow-xl hover:shadow-army-green/5 transition-all duration-300"
            >
              <Link to={getPostUrl(post)} className="block relative h-56 overflow-hidden bg-army-cream">
                <img
                  src={getPostImage(post)}
                  alt={post.title || 'News update'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-army-green text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {getPostCategory(post)}
                </span>
              </Link>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-army-olive/70 mb-3">
                  <Calendar size={14} />
                  {formatPostDate(post)}
                </div>

                <Link to={getPostUrl(post)}>
                  <h3 className="font-serif font-bold text-army-navy text-lg mb-3 line-clamp-2 group-hover:text-army-green transition-colors">
                    {post.title || post.caption || 'Untitled update'}
                  </h3>
                </Link>

                <p className="text-army-olive/80 text-sm mb-5 line-clamp-2">
                  {getPostExcerpt(post)}
                </p>

                <Link
                  to={getPostUrl(post)}
                  className="inline-flex items-center gap-1.5 text-army-red font-semibold text-sm hover:text-army-green transition-colors"
                >
                  Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 bg-army-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-army-olive transition-colors"
          >
            See All News
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};
