import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PostComposer } from '../components/PostComposer';
import { PostCard } from '../components/PostCard';
import { usePosts } from '../context/PostsContext';
import { useMediaLibrary } from '@/context/MediaLibraryContext';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Pin,
  Star,
  Trash2,
  Edit3,
  Archive,
  Eye,
  Plus,
  ChevronRight,
  Image as ImageIcon
} from 'lucide-react';
import { Post } from '../types';
import { VideosAdminTab } from '../components/VideosAdminTab';
import { VisionsAdminTab } from '../components/VisionsAdminTab';
import { MediaLibraryTab } from '../components/MediaLibraryTab';
import { StudioSidebar, StudioTab } from '../components/StudioSidebar';

export const AdminDashboard: React.FC = () => {
  const { posts, deletePost, archivePost, pinPost, featurePost, updatePost } = usePosts();
  const { mediaFiles } = useMediaLibrary();
  const { isAdmin, isLoading, logout, user } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<StudioTab>('dashboard');
  const [editingPost, setEditingPost] = useState<Post | undefined>(undefined);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    navigate('/admin/login', { replace: true });
    void logout().then(({ error }) => {
      if (error) console.error('Logout error:', error);
    });
  };

  if (isLoading && !user) {
    return (
      <div className="min-h-screen flex flex-col bg-army-cream">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center bg-white rounded-xl border border-army-green/10 p-12 max-w-md mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-army-green/10 flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard size={28} className="text-army-green animate-pulse" />
            </div>
            <h2 className="font-serif font-bold text-2xl text-army-navy mb-2">Opening Studio</h2>
            <p className="text-army-olive/70 text-sm">Verifying your admin session...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const publishedPosts = posts.filter(p => p.visibility === 'published').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const draftPosts = posts.filter(p => p.visibility === 'draft').sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const archivedPosts = posts.filter(p => p.visibility === 'archived');
  
  // Combine all media for total count
  const allMediaCount = mediaFiles.length + posts.flatMap(p => p.media).length;

  const stats = [
    { label: 'Published', value: publishedPosts.length, color: 'text-army-green', bg: 'bg-army-green/10' },
    { label: 'Drafts', value: draftPosts.length, color: 'text-army-gold', bg: 'bg-army-gold/10' },
    { label: 'Archived', value: archivedPosts.length, color: 'text-army-olive', bg: 'bg-army-olive/10' },
    { label: 'Media Files', value: allMediaCount, color: 'text-army-navy', bg: 'bg-army-navy/10' },
  ];

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setActiveTab('compose');
  };

  const handleComposerSuccess = () => {
    setEditingPost(undefined);
    setActiveTab('published');
  };

  const PostTable: React.FC<{ list: Post[] }> = ({ list }) => (
    <div className="space-y-3">
      {list.length === 0 && (
        <div className="text-center py-12 text-army-olive/50 italic font-serif bg-white rounded-xl border border-army-green/10">No posts here yet.</div>
      )}
      {list.map(post => (
        <div
          key={post.id}
          className="bg-white rounded-xl border border-army-green/10 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm hover:shadow-md transition-all"
        >
          {/* Thumbnail */}
          <div className="w-full sm:w-20 h-16 sm:h-14 rounded-lg overflow-hidden bg-army-cream/50 flex-shrink-0 border border-army-green/5">
            {post.media[0] ? (
              <img src={post.media[0].url} alt={post.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-army-olive/20">
                <ImageIcon size={20} />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full
                ${post.type === 'event' ? 'bg-army-gold/20 text-army-gold' :
                  post.type === 'gallery' ? 'bg-army-navy/10 text-army-navy' :
                    'bg-army-green/10 text-army-green'}`}>
                {post.type}
              </span>
              {post.isPinned && <Pin size={12} className="text-army-gold fill-army-gold" />}
              {post.isFeatured && <Star size={12} className="text-army-gold fill-army-gold" />}
            </div>
            <h4 className="font-serif font-bold text-army-navy text-base leading-tight truncate">
              {post.title || post.caption || '(No title)'}
            </h4>
            <p className="text-xs text-army-olive/50 mt-0.5">
              {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              {post.updatedAt && ' · Edited'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => handleEdit(post)}
              title="Edit"
              className="p-2 rounded-lg text-army-olive/50 hover:text-army-green hover:bg-army-green/5 transition-all"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={() => pinPost(post.id)}
              title={post.isPinned ? "Unpin" : "Pin"}
              className={`p-2 rounded-lg transition-all ${post.isPinned ? 'text-army-gold' : 'text-army-olive/50 hover:text-army-gold'} hover:bg-army-gold/5`}
            >
              <Pin size={16} />
            </button>
            <button
              onClick={() => featurePost(post.id)}
              title={post.isFeatured ? "Unfeature" : "Feature"}
              className={`p-2 rounded-lg transition-all ${post.isFeatured ? 'text-army-gold' : 'text-army-olive/50 hover:text-army-gold'} hover:bg-army-gold/5`}
            >
              <Star size={16} />
            </button>
            {post.visibility !== 'archived' && (
              <button
                onClick={() => archivePost(post.id)}
                title="Archive"
                className="p-2 rounded-lg text-army-olive/50 hover:text-army-red hover:bg-army-red/5 transition-all"
              >
                <Archive size={16} />
              </button>
            )}
            {post.visibility === 'archived' && (
              <button
                onClick={() => updatePost(post.id, { visibility: 'published' })}
                title="Restore"
                className="p-2 rounded-lg text-army-olive/50 hover:text-army-green hover:bg-army-green/5 transition-all"
              >
                <Eye size={16} />
              </button>
            )}
            <button
              onClick={() => deletePost(post.id)}
              title="Delete"
              className="p-2 rounded-lg text-army-olive/50 hover:text-army-red hover:bg-army-red/5 transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-army-cream/30">
      <Navbar />

      <div className="flex-grow flex items-stretch">
        <StudioSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          counts={{
            published: publishedPosts.length,
            drafts: draftPosts.length,
            archived: archivedPosts.length,
            media: allMediaCount
          }}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
        />

        {/* ── MAIN CONTENT ── */}
        <main className="flex-grow overflow-auto relative">
          <div className="p-6 sm:p-8 max-w-5xl mx-auto">

            {/* DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <div className="animate-fade-in">
                <div className="mb-8">
                  <h1 className="font-serif font-bold text-3xl text-army-navy">Dashboard</h1>
                  <p className="text-army-olive/60 mt-1 text-sm">Welcome back, Colonel Ahsan's content hub.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  {stats.map(stat => (
                    <div key={stat.label} className="bg-white rounded-xl border border-army-green/10 p-5 shadow-sm text-center transform hover:-translate-y-1 transition-transform">
                      <div className={`font-serif font-bold text-4xl ${stat.color}`}>{stat.value}</div>
                      <div className="text-xs text-army-olive/50 font-medium uppercase tracking-widest mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Recent Posts */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-serif font-bold text-xl text-army-navy">Recent Posts</h2>
                    <button onClick={() => setActiveTab('published')} className="text-xs text-army-green font-bold hover:underline flex items-center gap-1">
                      View All <ChevronRight size={14} />
                    </button>
                  </div>
                  <PostTable list={publishedPosts.slice(0, 5)} />
                </div>

                {/* Quick Action */}
                <button
                  onClick={() => { setEditingPost(undefined); setActiveTab('compose'); }}
                  className="w-full flex items-center justify-center gap-3 p-6 bg-gradient-to-r from-army-green to-army-olive text-white rounded-xl font-bold text-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <Plus size={22} />
                  Create New Post
                </button>
              </div>
            )}

            {/* COMPOSE TAB (Always mounted to persist state) */}
            <div className={activeTab === 'compose' ? 'block animate-fade-in' : 'hidden'}>
              <div className="mb-8">
                <h1 className="font-serif font-bold text-3xl text-army-navy">
                  {editingPost ? 'Edit Post' : 'Create New Post'}
                </h1>
                <p className="text-army-olive/60 mt-1 text-sm">
                  {editingPost ? `Editing: "${editingPost.title || editingPost.caption}"` : 'Compose and publish your update to the live feed.'}
                </p>
              </div>
              <PostComposer
                key={editingPost?.id || 'new-post'}
                initialPost={editingPost}
                onSuccess={handleComposerSuccess}
              />
            </div>

            {/* PUBLISHED TAB */}
            {activeTab === 'published' && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="font-serif font-bold text-3xl text-army-navy">Published Posts</h1>
                    <p className="text-army-olive/60 mt-1 text-sm">{publishedPosts.length} posts live on the feed.</p>
                  </div>
                  <button
                    onClick={() => { setEditingPost(undefined); setActiveTab('compose'); }}
                    className="flex items-center gap-2 bg-army-green text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-army-olive transition-all"
                  >
                    <Plus size={16} /> New Post
                  </button>
                </div>
                <PostTable list={publishedPosts} />
              </div>
            )}

            {/* DRAFTS TAB */}
            {activeTab === 'drafts' && (
              <div className="animate-fade-in">
                <div className="mb-8">
                  <h1 className="font-serif font-bold text-3xl text-army-navy">Drafts</h1>
                  <p className="text-army-olive/60 mt-1 text-sm">{draftPosts.length} unpublished drafts.</p>
                </div>
                <PostTable list={draftPosts} />
              </div>
            )}

            {/* ARCHIVED TAB */}
            {activeTab === 'archived' && (
              <div className="animate-fade-in">
                <div className="mb-8">
                  <h1 className="font-serif font-bold text-3xl text-army-navy">Archived</h1>
                  <p className="text-army-olive/60 mt-1 text-sm">{archivedPosts.length} archived posts.</p>
                </div>
                <PostTable list={archivedPosts} />
              </div>
            )}

            {/* VISIONS TAB */}
            {activeTab === 'visions' && (
              <div className="animate-fade-in">
                <VisionsAdminTab />
              </div>
            )}

            {/* MEDIA TAB */}
            {activeTab === 'media' && (
              <div className="animate-fade-in">
                <MediaLibraryTab />
              </div>
            )}

            {/* VIDEOS TAB */}
            {activeTab === 'videos' && (
              <div className="animate-fade-in">
                <VideosAdminTab />
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};
