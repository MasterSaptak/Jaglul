import React, { useState } from 'react';
import { Post, PostType, PostVisibility, MediaItem } from '../types';
import { usePosts } from '../context/PostsContext';
import { PostCard } from './PostCard';
import { Image as ImageIcon, X, Plus, Save, Send, Archive, Layout, Link as LinkIcon, ChevronDown } from 'lucide-react';

interface PostComposerProps {
  initialPost?: Post;
  onSuccess?: () => void;
}

const POST_TYPES: { value: PostType; label: string; emoji: string }[] = [
  { value: 'news', label: 'News Article', emoji: '📰' },
  { value: 'event', label: 'Event', emoji: '📍' },
  { value: 'gallery', label: 'Gallery', emoji: '🖼️' },
  { value: 'announcement', label: 'Announcement', emoji: '📢' },
  { value: 'achievement', label: 'Achievement', emoji: '🏆' },
  { value: 'video', label: 'Video', emoji: '🎥' },
];

const THEMES = ['humanitarian', 'education', 'security', 'veterans', 'civic'];
const CATEGORIES = ['News', 'Event', 'Op-Ed', 'Humanitarian', 'Policy', 'Achievement', 'Gallery'];

export const PostComposer: React.FC<PostComposerProps> = ({ initialPost, onSuccess }) => {
  const { createPost, updatePost } = usePosts();

  const [type, setType] = useState<PostType>(initialPost?.type || 'news');
  const [title, setTitle] = useState(initialPost?.title || '');
  const [caption, setCaption] = useState(initialPost?.caption || '');
  const [description, setDescription] = useState(initialPost?.description || '');
  const [category, setCategory] = useState(initialPost?.category || '');
  const [theme, setTheme] = useState(initialPost?.theme || '');
  const [tags, setTags] = useState<string[]>(initialPost?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [media, setMedia] = useState<MediaItem[]>(initialPost?.media || []);
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [showMeta, setShowMeta] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState('');

  // Auto-generate slug from title
  const autoSlug = title
    ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    : '';

  const previewPost: Post = {
    id: initialPost?.id || 'preview',
    type,
    title: title || undefined,
    caption: caption || undefined,
    description: description || undefined,
    media,
    category: category || undefined,
    theme: theme || undefined,
    tags: tags.length ? tags : undefined,
    author: 'Colonel (Retd.) Md. Jaglul Ahsan',
    createdAt: initialPost?.createdAt || new Date().toISOString(),
    visibility: 'published',
    reactions: initialPost?.reactions || { like: 0, inspire: 0, support: 0 },
    slug: slug || autoSlug || 'preview',
  };

  const handleAddMedia = () => {
    const url = prompt('Enter Image URL:');
    if (url) {
      setMedia(prev => [...prev, {
        id: `media-${Date.now()}`,
        type: 'image',
        url,
        uploadedAt: new Date().toISOString()
      }]);
    }
  };

  const removeMedia = (id: string) => setMedia(prev => prev.filter(m => m.id !== id));

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags(prev => [...prev, t]);
      setTagInput('');
    }
  };

  const buildPostData = (visibility: PostVisibility) => ({
    type,
    title: title || undefined,
    caption: caption || undefined,
    description: description || undefined,
    media,
    category: category || undefined,
    theme: theme || undefined,
    tags: tags.length ? tags : undefined,
    author: 'Colonel (Retd.) Md. Jaglul Ahsan',
    visibility,
    slug: slug || autoSlug || `post-${Date.now()}`,
  });

  const handleSubmit = (status: PostVisibility) => {
    setIsSaving(true);
    const postData = buildPostData(status);
    if (initialPost) {
      updatePost(initialPost.id, postData);
    } else {
      createPost(postData);
    }
    setLastSaved(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    setIsSaving(false);
    if (onSuccess && status !== 'draft') onSuccess();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

      {/* ── EDITOR PANEL ── */}
      <div className="space-y-0 bg-white rounded-xl border border-army-green/10 shadow-sm overflow-hidden">

        {/* Type Selector Bar */}
        <div className="flex gap-1 p-3 bg-army-cream/40 border-b border-army-green/5 overflow-x-auto">
          {POST_TYPES.map(t => (
            <button
              key={t.value}
              onClick={() => setType(t.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all
                ${type === t.value ? 'bg-army-green text-white shadow-sm' : 'text-army-olive/70 hover:bg-white hover:text-army-navy'}`}
            >
              <span>{t.emoji}</span> {t.label}
            </button>
          ))}
        </div>

        {/* Content Fields */}
        <div className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="text-[10px] font-bold text-army-olive/50 uppercase tracking-widest block mb-1.5">Title</label>
            <input
              type="text"
              placeholder="Enter a compelling headline..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full text-xl font-serif font-bold text-army-navy border-b-2 border-army-green/10 pb-2 focus:border-army-gold outline-none transition-colors bg-transparent placeholder:text-army-olive/20 placeholder:font-normal placeholder:text-lg"
            />
          </div>

          {/* Caption */}
          <div>
            <label className="text-[10px] font-bold text-army-olive/50 uppercase tracking-widest block mb-1.5">Caption / Highlight</label>
            <textarea
              placeholder="A brief, impactful caption (shown prominently)..."
              value={caption}
              onChange={e => setCaption(e.target.value)}
              rows={2}
              className="w-full text-sm italic text-army-navy/80 border-b border-army-green/5 pb-2 focus:border-army-gold outline-none resize-none bg-transparent placeholder:text-army-olive/20 placeholder:not-italic"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[10px] font-bold text-army-olive/50 uppercase tracking-widest block mb-1.5">Full Description</label>
            <textarea
              placeholder="Write the full story, report, or update here..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={8}
              className="w-full text-sm text-army-oliveDark focus:outline-none resize-none bg-transparent placeholder:text-army-olive/20 leading-relaxed"
            />
          </div>

          {/* Media Upload */}
          <div className="pt-4 border-t border-army-green/5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-[10px] font-bold text-army-olive/50 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon size={12} /> Media Assets ({media.length})
              </label>
              <button onClick={handleAddMedia} className="text-xs font-bold text-army-green hover:text-army-gold flex items-center gap-1 transition-colors">
                <Plus size={14} /> Add Image
              </button>
            </div>

            {media.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mb-3">
                {media.map((item, i) => (
                  <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden border border-army-green/10 group">
                    <img src={item.url} alt={`Asset ${i + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                      <button
                        onClick={() => removeMedia(item.id)}
                        className="opacity-0 group-hover:opacity-100 bg-black/60 text-white p-1.5 rounded-full transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                    {i === 0 && (
                      <span className="absolute top-1 left-1 bg-army-gold text-white text-[9px] font-bold px-1.5 py-0.5 rounded">COVER</span>
                    )}
                  </div>
                ))}
                <button
                  onClick={handleAddMedia}
                  className="aspect-square rounded-lg border-2 border-dashed border-army-green/15 flex flex-col items-center justify-center text-army-olive/30 hover:text-army-green hover:border-army-green/30 transition-all"
                >
                  <Plus size={18} />
                  <span className="text-[9px] mt-1 font-bold uppercase">Add</span>
                </button>
              </div>
            )}

            {media.length === 0 && (
              <button
                onClick={handleAddMedia}
                className="w-full py-8 border-2 border-dashed border-army-green/10 rounded-lg flex flex-col items-center justify-center text-army-olive/30 hover:text-army-green hover:border-army-green/20 transition-all"
              >
                <ImageIcon size={24} className="mb-2" />
                <span className="text-xs font-bold uppercase tracking-wide">Drag & Drop or Click to Upload</span>
              </button>
            )}
          </div>

          {/* Meta Accordion */}
          <div className="border-t border-army-green/5 pt-4">
            <button
              onClick={() => setShowMeta(!showMeta)}
              className="flex items-center justify-between w-full text-[10px] font-bold text-army-olive/50 uppercase tracking-widest hover:text-army-navy transition-colors"
            >
              <span>Category, Theme & Tags</span>
              <ChevronDown size={14} className={`transition-transform ${showMeta ? 'rotate-180' : ''}`} />
            </button>

            {showMeta && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-army-olive/50 uppercase block mb-1.5">Category</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full text-sm p-2.5 bg-army-cream/50 rounded-lg border border-army-green/10 outline-none text-army-navy"
                    >
                      <option value="">Select...</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-army-olive/50 uppercase block mb-1.5">Theme</label>
                    <select
                      value={theme}
                      onChange={e => setTheme(e.target.value)}
                      className="w-full text-sm p-2.5 bg-army-cream/50 rounded-lg border border-army-green/10 outline-none text-army-navy capitalize"
                    >
                      <option value="">Select...</option>
                      {THEMES.map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="text-[10px] font-bold text-army-olive/50 uppercase block mb-1.5">Tags</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Type and press Enter..."
                      className="flex-1 text-xs p-2 bg-army-cream/50 rounded-lg border border-army-green/10 outline-none"
                    />
                    <button onClick={addTag} className="px-3 bg-army-green text-white text-xs font-bold rounded-lg hover:bg-army-olive transition-colors">
                      Add
                    </button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {tags.map(tag => (
                        <span key={tag} className="flex items-center gap-1 bg-army-cream text-army-navy text-xs font-medium px-2.5 py-1 rounded-full border border-army-green/10">
                          {tag}
                          <button onClick={() => setTags(prev => prev.filter(t => t !== tag))} className="text-army-red/50 hover:text-army-red ml-1">
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Slug */}
                <div>
                  <label className="text-[10px] font-bold text-army-olive/50 uppercase block mb-1.5">URL Slug (auto-generated)</label>
                  <div className="flex items-center gap-2 bg-army-cream/50 rounded-lg border border-army-green/10 px-3 py-2">
                    <span className="text-xs text-army-olive/40 font-mono">jaglul.com/#/{type}/</span>
                    <input
                      type="text"
                      value={slug || autoSlug}
                      onChange={e => setSlug(e.target.value)}
                      className="flex-1 text-xs font-mono text-army-navy bg-transparent outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Bar */}
        <div className="px-6 py-4 bg-army-cream/20 border-t border-army-green/10 flex items-center justify-between">
          <div className="flex gap-1">
            <button
              onClick={() => handleSubmit('draft')}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-army-olive/70 hover:text-army-navy hover:bg-army-cream rounded-lg transition-all"
            >
              <Save size={15} /> Save Draft
            </button>
            <button
              onClick={() => handleSubmit('archived')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-army-olive/70 hover:text-army-red hover:bg-army-red/5 rounded-lg transition-all"
            >
              <Archive size={15} /> Archive
            </button>
          </div>

          <div className="flex items-center gap-3">
            {lastSaved && (
              <span className="text-[10px] text-army-olive/40 font-medium">Saved {lastSaved}</span>
            )}
            <button
              onClick={() => handleSubmit('published')}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2.5 bg-army-green text-white text-sm font-bold rounded-lg hover:bg-army-olive transition-all shadow-md active:scale-95"
            >
              <Send size={15} /> {initialPost ? 'Update Post' : 'Publish'}
            </button>
          </div>
        </div>
      </div>

      {/* ── LIVE PREVIEW PANEL ── */}
      <div className="hidden xl:block">
        <div className="sticky top-24">
          <div className="flex items-center gap-2 mb-3 text-army-olive/50">
            <Layout size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Live Feed Preview</span>
            <span className="ml-auto text-[10px] bg-army-green/10 text-army-green font-bold px-2 py-0.5 rounded-full">Real-time</span>
          </div>
          <div className="opacity-95 hover:opacity-100 transition-opacity">
            <PostCard post={previewPost} />
          </div>
          <div className="mt-4 p-3 bg-army-navy/5 rounded-lg border border-army-navy/10">
            <p className="text-[10px] font-bold text-army-olive/50 uppercase tracking-widest mb-1">Permalink Preview</p>
            <p className="text-xs font-mono text-army-navy/70 truncate">
              #/{type}/{slug || autoSlug || 'your-post-slug'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
