import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Tag, User, MapPin, Clock, Users, ArrowLeft, Share2, Facebook, Twitter } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CommentSection } from '../components/CommentSection';
import { EventSummaryCard } from '../components/EventSummaryCard';
import { INITIAL_POSTS, INITIAL_COMMENTS } from '../constants';

export const NewsPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const post = INITIAL_POSTS.find(p => p.id === id);
  const postComments = INITIAL_COMMENTS.filter(c => c.postId === id && c.approved);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-army-cream">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-army-green mb-4">Post Not Found</h1>
            <p className="text-army-olive/70 mb-6">The article you're looking for doesn't exist.</p>
            <Link to="/news" className="bg-army-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-army-olive transition-colors">
              Browse All News
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Parse content to handle markdown-like formatting
  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      // Handle bold headers with **text**
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <h3 key={index} className="text-xl font-serif font-bold text-army-green mt-8 mb-4">
            {paragraph.replace(/\*\*/g, '')}
          </h3>
        );
      }
      // Handle lists
      if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').filter(line => line.startsWith('- '));
        return (
          <ul key={index} className="list-disc list-inside space-y-2 my-4 text-army-navy/80">
            {items.map((item, i) => (
              <li key={i}>{item.replace('- ', '')}</li>
            ))}
          </ul>
        );
      }
      // Handle quotes
      if (paragraph.startsWith('"') && paragraph.endsWith('"')) {
        return (
          <blockquote key={index} className="border-l-4 border-army-gold pl-4 italic text-army-navy/70 my-6">
            {paragraph}
          </blockquote>
        );
      }
      // Regular paragraph
      return (
        <p key={index} className="text-army-navy/80 leading-relaxed mb-4">
          {paragraph}
        </p>
      );
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Event': return 'bg-army-gold text-army-navy';
      case 'Humanitarian': return 'bg-army-red text-white';
      case 'Op-Ed': return 'bg-army-navy text-white';
      default: return 'bg-army-green text-white';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-army-cream">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Header */}
        <section className="relative">
          {/* Featured Image */}
          <div className="h-[40vh] md:h-[50vh] relative overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-army-forest via-army-forest/60 to-transparent"></div>
          </div>
          
          {/* Header Content */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
              {/* Back Button */}
              <button 
                onClick={() => navigate(-1)}
                className="mb-4 text-white/80 hover:text-white flex items-center gap-2 transition-colors"
              >
                <ArrowLeft size={18} />
                Back
              </button>
              
              {/* Category & Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`${getCategoryColor(post.category)} text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
                  {post.category}
                </span>
                {post.tags.map(tag => (
                  <span key={tag} className="bg-white/10 text-white/90 text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-4">
                {post.title}
              </h1>
              
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} />
                  {post.author}
                </div>
                {post.commentsEnabled && (
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                    {post.commentCount} Comments
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Event Summary Card - Standardized for all posts */}
                <EventSummaryCard post={post} />

                {/* Divider */}
                <div className="gold-line mb-8"></div>

                {/* Article Content */}
                <article className="prose prose-lg max-w-none">
                  {formatContent(post.content)}
                </article>

                {/* Author Card */}
                <div className="mt-12 bg-white rounded-xl border border-army-green/10 p-6 flex items-center gap-4 group card-lift cursor-pointer">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-army-gold/30 flex-shrink-0 group-hover:border-army-gold group-hover:scale-110 transition-all duration-300">
                    <img 
                      src="https://picsum.photos/100/100?grayscale" 
                      alt={post.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-army-olive/60 uppercase tracking-wider">Written by</p>
                    <p className="font-serif font-bold text-army-green text-lg group-hover:text-army-gold transition-colors duration-300">Colonel (Retd.) Md. Jaglul Ahsan</p>
                    <p className="text-sm text-army-olive/70">SUP, psc, G • Bangladesh Army</p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Share Card */}
                <div className="bg-white rounded-xl border border-army-green/10 p-5 mb-6 sticky top-24">
                  <h4 className="font-semibold text-army-navy mb-4 flex items-center gap-2">
                    <Share2 size={18} />
                    Share This Article
                  </h4>
                  <div className="flex gap-2">
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#1877F2] text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#166FE5] hover:scale-105 transition-all duration-300"
                    >
                      <Facebook size={18} />
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#1DA1F2] text-white py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-[#1A91DA] hover:scale-105 transition-all duration-300"
                    >
                      <Twitter size={18} />
                    </a>
                  </div>
                </div>

                {/* Related Posts */}
                <div className="bg-white rounded-xl border border-army-green/10 p-5">
                  <h4 className="font-semibold text-army-navy mb-4">Related Articles</h4>
                  <div className="space-y-4">
                    {INITIAL_POSTS.filter(p => p.id !== post.id && p.tags.some(t => post.tags.includes(t)))
                      .slice(0, 3)
                      .map(relatedPost => (
                        <Link 
                          key={relatedPost.id}
                          to={`/news/${relatedPost.id}`}
                          className="block group p-2 -mx-2 rounded-lg hover:bg-army-cream/50 transition-colors duration-300"
                        >
                          <p className="text-xs text-army-olive/60 mb-1">{relatedPost.date}</p>
                          <p className="text-sm font-medium text-army-navy group-hover:text-army-green transition-colors line-clamp-2 group-hover:translate-x-1 transform duration-300">
                            {relatedPost.title}
                          </p>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comment Section */}
        {post.commentsEnabled && (
          <CommentSection 
            postId={post.id} 
            comments={postComments} 
            totalCount={post.commentCount} 
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};
