import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Tag, User, MapPin, Clock, Users, ArrowLeft, Share2, Facebook, Twitter } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CommentSection } from '../components/CommentSection';
import { EventSummaryCard } from '../components/EventSummaryCard';
import { usePosts } from '../src/features/posts/context/PostsContext';
import { INITIAL_COMMENTS } from '../constants';

export const NewsPost: React.FC = () => {
  const { id, slug } = useParams<{ id?: string; slug?: string }>();
  const navigate = useNavigate();
  const { getPostBySlug, posts } = usePosts();
  
  // Try to find by slug first (new system), then by id (compatibility)
  const post = slug ? getPostBySlug(slug) : posts.find(p => p.id === id);
  const postId = post?.id || id;
  const postComments = INITIAL_COMMENTS.filter(c => c.postId === postId && c.approved);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5f5f0]">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-army-navy mb-4 tracking-wide">Article Not Found</h1>
            <p className="text-army-olive/70 mb-6">The update you're looking for doesn't exist or has been moved.</p>
            <Link to="/feed" className="bg-army-green text-white px-6 py-3 rounded-lg font-bold hover:bg-army-olive transition-all shadow-md">
              Return to Feed
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <h3 key={index} className="text-xl font-serif font-bold text-army-navy mt-10 mb-5 tracking-wide">
            {paragraph.replace(/\*\*/g, '')}
          </h3>
        );
      }
      if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').filter(line => line.startsWith('- '));
        return (
          <ul key={index} className="list-disc list-inside space-y-3 my-6 text-army-navy/80">
            {items.map((item, i) => (
              <li key={i}>{item.replace('- ', '')}</li>
            ))}
          </ul>
        );
      }
      if (paragraph.startsWith('"') && paragraph.endsWith('"')) {
        return (
          <blockquote key={index} className="border-l-4 border-army-gold pl-6 italic text-army-navy/70 my-10 font-serif text-xl">
            {paragraph}
          </blockquote>
        );
      }
      return (
        <p key={index} className="text-army-navy/80 leading-relaxed mb-6 text-lg">
          {paragraph}
        </p>
      );
    });
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'Event': return 'bg-army-gold text-army-navy';
      case 'Humanitarian': return 'bg-army-red text-white';
      case 'Op-Ed': return 'bg-army-navy text-white';
      default: return 'bg-army-green text-white';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f0]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Hero */}
        <section className="relative">
          <div className="h-[40vh] md:h-[60vh] relative overflow-hidden">
            <img 
              src={post.media[0]?.url || '/placeholder.jpg'} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b3c] via-[#1a2b3c]/60 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
              <button 
                onClick={() => navigate(-1)}
                className="mb-6 text-white/70 hover:text-white flex items-center gap-2 transition-all font-bold text-sm uppercase tracking-widest"
              >
                <ArrowLeft size={16} /> Back
              </button>
              
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className={`${getCategoryColor(post.category)} text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-sm`}>
                  {post.category || post.type}
                </span>
                {post.tags?.map(tag => (
                  <span key={tag} className="bg-white/10 backdrop-blur-md text-white/90 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-6 tracking-wide shadow-text">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/70 text-xs font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-army-gold" />
                  {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2">
                  <User size={14} className="text-army-gold" />
                  {post.author}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <article className="prose prose-xl prose-army max-w-none">
                  {post.description && formatContent(post.description)}
                </article>

                <div className="mt-16 bg-white rounded-2xl border border-army-green/10 p-8 flex items-center gap-6 shadow-sm">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-army-gold/30 flex-shrink-0">
                    <img 
                      src="/colonel-jaglul.png" 
                      alt="Colonel Ahsan"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-army-olive/50 uppercase tracking-widest mb-1">Authentic Statement</p>
                    <p className="font-serif font-bold text-army-navy text-xl">Colonel (Retd.) Md. Jaglul Ahsan</p>
                    <p className="text-sm text-army-olive/70 font-medium">SUP, psc, G • Bangladesh Army (Retired)</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-army-green/10 p-6 mb-8 lg:sticky lg:top-24 shadow-sm">
                  <h4 className="text-xs font-bold text-army-navy uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Share2 size={16} className="text-army-gold" /> Share Update
                  </h4>
                  <div className="flex flex-col gap-3">
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#1877F2] text-white py-3 rounded-xl flex items-center justify-center gap-3 font-bold text-sm hover:brightness-110 transition-all shadow-md"
                    >
                      <Facebook size={18} /> Facebook
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#1DA1F2] text-white py-3 rounded-xl flex items-center justify-center gap-3 font-bold text-sm hover:brightness-110 transition-all shadow-md"
                    >
                      <Twitter size={18} /> Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};
