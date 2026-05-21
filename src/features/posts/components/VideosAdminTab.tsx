import React, { useState } from 'react';
import { useVideos } from '../../../context/VideosContext';
import { Plus, Trash2, Edit3, Star, Link as LinkIcon, Check, ArrowUp, ArrowDown, Search, X } from 'lucide-react';
import { Video } from '../../../types';

export const VideosAdminTab: React.FC = () => {
  const { videos, addVideo, deleteVideo, updateVideoTitle, toggleFeatured, reorderVideos, isLoading } = useVideos();
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredVideos = videos.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError('');
    const { error } = await addVideo(newUrl, newTitle);
    if (error) {
      setAddError(error.message);
    } else {
      setIsAdding(false);
      setNewUrl('');
      setNewTitle('');
    }
  };

  const handleSaveEdit = async (id: string) => {
    await updateVideoTitle(id, editTitle);
    setEditingId(null);
  };

  const startEdit = (video: Video) => {
    setEditingId(video.id);
    setEditTitle(video.title);
  };

  const copyLink = (youtubeId: string, id: string) => {
    navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${youtubeId}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...videos];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index - 1];
    newOrder[index - 1] = temp;
    reorderVideos(newOrder);
  };

  const moveDown = (index: number) => {
    if (index === videos.length - 1) return;
    const newOrder = [...videos];
    const temp = newOrder[index];
    newOrder[index] = newOrder[index + 1];
    newOrder[index + 1] = temp;
    reorderVideos(newOrder);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="font-serif font-bold text-3xl text-army-navy">YouTube Videos</h1>
          <p className="text-army-olive/60 mt-1 text-sm">Manage the video gallery displayed on the homepage.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-army-green text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-army-olive transition-all"
        >
          {isAdding ? <Check size={16} /> : <Plus size={16} />} 
          {isAdding ? 'Cancel' : 'Add Video'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl border border-army-green/20 mb-8 shadow-sm">
          <h3 className="font-bold text-army-navy mb-4">Add New YouTube Video</h3>
          {addError && <div className="text-army-red text-sm mb-4 bg-army-red/10 p-2 rounded">{addError}</div>}
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-army-oliveDark mb-1">YouTube URL</label>
              <input 
                type="url" 
                required
                className="w-full rounded-md border-army-green/30 shadow-sm focus:border-army-green focus:ring-army-green p-2 border"
                placeholder="https://www.youtube.com/watch?v=..."
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-army-oliveDark mb-1">Video Title</label>
              <input 
                type="text" 
                required
                className="w-full rounded-md border-army-green/30 shadow-sm focus:border-army-green focus:ring-army-green p-2 border"
                placeholder="Enter title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-army-navy text-white px-4 py-2 rounded-lg font-bold hover:bg-army-navy/90">
              Save Video
            </button>
          </form>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-army-olive/40" />
        </div>
        <input
          type="text"
          placeholder="Search videos by title..."
          className="block w-full pl-10 pr-3 py-2 border border-army-green/20 rounded-lg leading-5 bg-white placeholder-army-olive/40 focus:outline-none focus:ring-1 focus:ring-army-green focus:border-army-green sm:text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-army-olive/50">Loading videos...</div>
      ) : filteredVideos.length === 0 ? (
        <div className="text-center py-12 text-army-olive/50 italic font-serif bg-white rounded-xl border border-army-green/10">
          {searchQuery ? 'No videos match your search.' : 'No videos added yet.'}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredVideos.map((video, index) => (
            <div key={video.id} className={`bg-white rounded-xl border p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm transition-all ${video.is_featured ? 'border-army-gold ring-1 ring-army-gold' : 'border-army-green/10'}`}>
              
              {/* Order Controls */}
              {!searchQuery && (
                <div className="flex flex-col gap-1 items-center justify-center text-army-olive/30 mr-2">
                  <button onClick={() => moveUp(index)} disabled={index === 0} className="hover:text-army-green disabled:opacity-30 disabled:cursor-not-allowed"><ArrowUp size={16} /></button>
                  <button onClick={() => moveDown(index)} disabled={index === videos.length - 1} className="hover:text-army-green disabled:opacity-30 disabled:cursor-not-allowed"><ArrowDown size={16} /></button>
                </div>
              )}

              {/* Thumbnail */}
              <div className="w-full sm:w-28 aspect-video rounded-lg overflow-hidden bg-black flex-shrink-0 relative group">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80" />
                {video.is_featured && <div className="absolute top-1 left-1 bg-army-gold text-white text-[10px] font-bold px-1.5 py-0.5 rounded">FEATURED</div>}
              </div>

              {/* Title / Edit Form */}
              <div className="flex-1 min-w-0 w-full">
                {editingId === video.id ? (
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full border-army-green/30 rounded p-1 text-sm border"
                      autoFocus
                    />
                    <button onClick={() => handleSaveEdit(video.id)} className="p-1 bg-army-green text-white rounded hover:bg-army-olive">
                      <Check size={16} />
                    </button>
                    <button onClick={() => setEditingId(null)} className="p-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <h4 className="font-serif font-bold text-army-navy text-base leading-tight">
                      {video.title}
                    </h4>
                    <p className="text-xs text-army-olive/50 mt-1 flex items-center gap-2">
                      <span>{new Date(video.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className="truncate">{video.youtube_id}</span>
                    </p>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0 mt-2 sm:mt-0">
                <button
                  onClick={() => toggleFeatured(video.id)}
                  title={video.is_featured ? "Remove Featured" : "Set Featured"}
                  className={`p-2 rounded-lg transition-all ${video.is_featured ? 'text-army-gold bg-army-gold/10' : 'text-army-olive/50 hover:text-army-gold'} hover:bg-army-gold/5`}
                >
                  <Star size={18} className={video.is_featured ? 'fill-army-gold' : ''} />
                </button>
                <button
                  onClick={() => copyLink(video.youtube_id, video.id)}
                  title="Copy Link"
                  className="p-2 rounded-lg text-army-olive/50 hover:text-army-navy hover:bg-army-navy/5 transition-all"
                >
                  {copiedId === video.id ? <Check size={18} className="text-army-green" /> : <LinkIcon size={18} />}
                </button>
                <button
                  onClick={() => startEdit(video)}
                  title="Edit Title"
                  className="p-2 rounded-lg text-army-olive/50 hover:text-army-green hover:bg-army-green/5 transition-all"
                >
                  <Edit3 size={18} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this video?')) {
                      deleteVideo(video.id);
                    }
                  }}
                  title="Delete Video"
                  className="p-2 rounded-lg text-army-olive/50 hover:text-army-red hover:bg-army-red/5 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
