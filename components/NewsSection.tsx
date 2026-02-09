import React from 'react';
import { ArrowRight, Calendar, MessageSquare, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { useAuth } from '../context/AuthContext';

interface NewsSectionProps {
  posts: Post[];
  onDeletePost: (id: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ posts, onDeletePost }) => {
  const { isAdmin } = useAuth();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Event': return 'bg-army-gold text-army-navy';
      case 'Humanitarian': return 'bg-army-red text-white';
      case 'Op-Ed': return 'bg-army-navy text-white';
      default: return 'bg-army-green text-white';
    }
  };

  return (
    <section id="news" className="py-16 bg-army-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-army-green">Latest News & Updates</h2>
          <div className="h-1 w-24 bg-army-red mx-auto mt-4"></div>
          <p className="mt-4 text-army-oliveDark/80 max-w-2xl mx-auto">
            Stay informed about Colonel Ahsan's advocacy work, veteran welfare initiatives, and public engagements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-army-green/10 flex flex-col card-lift group hover-shine">
              <Link to={`/news/${post.id}`} className="relative h-48 overflow-hidden block img-zoom">
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
                {/* Comment Badge - Always show if comments enabled */}
                {post.commentsEnabled && (
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-army-navy text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-2 shadow-lg group-hover:bg-army-green group-hover:text-white transition-colors duration-300">
                    <MessageSquare size={14} className="group-hover:animate-pulse" />
                    <span>{post.commentCount > 0 ? `${post.commentCount} Responses` : 'Join Discussion'}</span>
                  </div>
                )}
              </Link>
              
              <div className="p-6 flex-1 flex flex-col">
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs text-army-olive/70 bg-army-cream px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-army-olive/60 mb-3">
                  <Calendar size={14} />
                  {post.date}
                </div>
                
                <Link to={`/news/${post.id}`}>
                  <h3 className="text-xl font-bold text-army-navy mb-3 line-clamp-2 leading-tight group-hover:text-army-green transition-colors">
                    {post.title}
                  </h3>
                </Link>
                
                <p className="text-army-olive/80 text-sm mb-4 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-army-green/10">
                  <Link 
                    to={`/news/${post.id}`}
                    className="text-army-red font-bold text-sm flex items-center gap-1.5 group/link hover:text-army-green transition-colors"
                  >
                    Read Full Story <ArrowRight size={16} className="arrow-slide group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                  
                  <div className="flex items-center gap-3">
                    {/* Comment Link */}
                    {post.commentsEnabled && (
                      <Link 
                        to={`/news/${post.id}#comments`}
                        className="text-army-olive/60 hover:text-army-green text-sm flex items-center gap-1.5 transition-colors"
                        title="Leave a comment"
                      >
                        <MessageSquare size={14} />
                        <span className="hidden sm:inline">Comment</span>
                      </Link>
                    )}
                    
                    {isAdmin && (
                      <button 
                        onClick={(e) => { e.preventDefault(); onDeletePost(post.id); }}
                        className="text-gray-400 hover:text-army-red transition-colors p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/news"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-army-green text-white font-medium rounded-lg hover:bg-army-olive transition-colors btn-military"
          >
            View All News & Events
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};
