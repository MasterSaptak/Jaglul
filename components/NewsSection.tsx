import React from 'react';
import { Clock, Heart, MessageCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

interface NewsSectionProps {
  posts: Post[];
  onDeletePost?: (id: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ posts }) => {
  // Map specific like counts for the 4 imported posts to match the original design exactly
  const getLikesCount = (id: string) => {
    const likesMap: Record<string, number> = {
      'news-1': 76,
      'news-2': 61,
      'news-3': 81,
      'news-4': 36
    };
    return likesMap[id] || 42;
  };

  return (
    <section id="news" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#c23333] font-normal tracking-wide">
            Latest news
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {posts.slice(0, 4).map((post) => (
            <div key={post.id} className="flex flex-col group">
              <Link to={`/news/${post.id}`} className="block overflow-hidden mb-3">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-44 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </Link>
              
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-1.5 text-[11px] text-[#8992A5] mb-2">
                  <Clock size={12} strokeWidth={1.5} />
                  <span>{post.date}</span>
                </div>
                
                <Link to={`/news/${post.id}`} className="mb-6">
                  <h3 className="text-xl sm:text-[22px] font-serif text-[#2a3c5a] hover:text-[#c23333] transition-colors leading-[1.3]">
                    {post.title}
                  </h3>
                </Link>
                
                <div className="mt-auto flex items-center gap-3 sm:gap-4 text-xs text-[#c23333] font-medium">
                  <div className="flex items-center gap-1">
                    <Heart size={14} strokeWidth={1.5} />
                    <span>{getLikesCount(post.id)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={14} strokeWidth={1.5} />
                    <span>{post.commentCount || 0}</span>
                  </div>
                  <Link 
                    to={`/news/${post.id}`}
                    className="flex items-center gap-1.5 ml-auto hover:text-[#902020] transition-colors"
                  >
                    <FileText size={14} strokeWidth={1.5} />
                    <span>Read more</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link 
            to="/news"
            className="inline-block px-8 py-3 bg-[#c23333] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#a02020] transition-colors"
          >
            SEE ALL NEWS
          </Link>
        </div>
      </div>
    </section>
  );
};

