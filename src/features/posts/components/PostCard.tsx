import React from 'react';
import { Post } from '../types';
import { MediaGrid } from './MediaGrid';
import { Heart, Lightbulb, Handshake, Share2, MoreHorizontal, Pin, Pencil, Archive, Trash2 } from 'lucide-react';
import { usePosts } from '../context/PostsContext';

interface PostCardProps {
  post: Post;
  isAdmin?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, isAdmin }) => {
  const { toggleReaction, pinPost, archivePost, deletePost } = usePosts();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`bg-white rounded-xl border border-army-green/10 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${post.isPinned ? 'ring-1 ring-army-gold/30' : ''}`}>
      {/* Header */}
      <div className="p-4 sm:p-6 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-army-green/10 flex items-center justify-center text-army-green font-serif font-bold text-lg border border-army-green/20">
            {post.author.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-serif font-bold text-army-navy text-base sm:text-lg leading-tight">
                {post.author}
              </h4>
              {post.isPinned && <Pin size={14} className="text-army-gold fill-army-gold" />}
            </div>
            <p className="text-xs text-army-olive/60 font-medium tracking-wide uppercase mt-0.5">
              {formatDate(post.createdAt)} • <span className="text-army-gold">{post.type}</span>
            </p>
          </div>
        </div>
        
        {isAdmin && (
          <div className="flex items-center gap-2">
            <button className="text-army-olive/40 hover:text-army-green p-1 transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 pb-4">
        {post.title && (
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-army-navy mb-3 leading-tight">
            {post.title}
          </h3>
        )}
        
        {post.caption && (
          <p className="text-army-navy/80 text-sm sm:text-base mb-4 italic font-medium leading-relaxed border-l-2 border-army-gold/30 pl-4">
            {post.caption}
          </p>
        )}

        {post.description && (
          <div className="prose prose-sm sm:prose-base max-w-none text-army-oliveDark mb-6 whitespace-pre-wrap">
            {post.description}
          </div>
        )}

        {/* Media Grid */}
        <MediaGrid media={post.media} />

        {/* Links */}
        {post.links && post.links.length > 0 && (
          <div className="mt-4 space-y-2">
            {post.links.map(link => (
              <a 
                key={link.id} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-army-cream/30 rounded-lg border border-army-green/5 hover:bg-army-cream/50 transition-colors group"
              >
                <div className="w-8 h-8 rounded bg-white flex items-center justify-center border border-army-green/10 text-army-green">
                  <Share2 size={16} />
                </div>
                <span className="text-sm font-semibold text-army-navy group-hover:text-army-green transition-colors">
                  {link.title}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Interactions */}
      <div className="px-4 sm:px-6 py-4 bg-army-cream/10 border-t border-army-green/5 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={() => toggleReaction(post.id, 'like')}
            className="flex items-center gap-1.5 text-army-olive/60 hover:text-army-red transition-all group"
          >
            <div className="p-1.5 rounded-full group-hover:bg-army-red/5">
              <Heart size={18} className={post.reactions.like > 0 ? 'fill-army-red text-army-red' : ''} />
            </div>
            <span className="text-xs font-bold">{post.reactions.like}</span>
          </button>

          <button 
            onClick={() => toggleReaction(post.id, 'inspire')}
            className="flex items-center gap-1.5 text-army-olive/60 hover:text-army-gold transition-all group"
          >
            <div className="p-1.5 rounded-full group-hover:bg-army-gold/5">
              <Lightbulb size={18} className={post.reactions.inspire > 0 ? 'fill-army-gold text-army-gold' : ''} />
            </div>
            <span className="text-xs font-bold">{post.reactions.inspire}</span>
          </button>

          <button 
            onClick={() => toggleReaction(post.id, 'support')}
            className="flex items-center gap-1.5 text-army-olive/60 hover:text-army-green transition-all group"
          >
            <div className="p-1.5 rounded-full group-hover:bg-army-green/5">
              <Handshake size={18} className={post.reactions.support > 0 ? 'fill-army-green text-army-green' : ''} />
            </div>
            <span className="text-xs font-bold">{post.reactions.support}</span>
          </button>
        </div>

        <button className="text-army-olive/40 hover:text-army-navy transition-colors">
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
};
