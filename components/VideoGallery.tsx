import React, { useState } from 'react';
import { Play, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Video } from '../types';
import { Button } from './Button';

interface VideoGalleryProps {
  videos: Video[];
  onAddVideo: (url: string, title: string) => void;
  onDeleteVideo: (id: string) => void;
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({ videos, onAddVideo, onDeleteVideo }) => {
  const { isAdmin } = useAuth();
  const [mainVideo, setMainVideo] = useState<Video>(videos[0]);
  const [isAdding, setIsAdding] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddVideo(newUrl, newTitle);
    setIsAdding(false);
    setNewUrl('');
    setNewTitle('');
  };

  return (
    <section id="videos" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-army-green">Video Messages</h2>
            <p className="text-army-olive/70 text-sm mt-1">Speeches, reflections, and public addresses</p>
            <div className="h-1 w-20 bg-army-red mt-2"></div>
          </div>
          {isAdmin && (
            <Button size="sm" onClick={() => setIsAdding(!isAdding)}>
              <Plus size={18} className="mr-2" /> Add Video
            </Button>
          )}
        </div>

        {isAdmin && isAdding && (
          <div className="mb-8 p-6 bg-army-cream border border-army-green/20 rounded-lg animate-fade-in">
            <h3 className="font-bold text-lg mb-4 text-army-green">Add New YouTube Video</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-army-oliveDark">Video Title</label>
                <input 
                  type="text" 
                  required
                  className="mt-1 block w-full rounded-md border-army-green/30 shadow-sm focus:border-army-green focus:ring-army-green p-2 border"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-army-oliveDark">YouTube URL</label>
                <input 
                  type="url" 
                  required
                  className="mt-1 block w-full rounded-md border-army-green/30 shadow-sm focus:border-army-green focus:ring-army-green p-2 border"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Publish Video</Button>
                <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${mainVideo.youtubeId}?rel=0`}
                title={mainVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{mainVideo.title}</h3>
              <p className="text-gray-500 font-medium">{mainVideo.date}</p>
            </div>
          </div>

          {/* Side List */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            <h4 className="font-serif font-bold text-army-olive uppercase tracking-widest text-sm mb-4">
              Previous Addresses
            </h4>
            {videos.map((video) => (
              <div 
                key={video.id}
                onClick={() => setMainVideo(video)}
                className={`group flex gap-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${mainVideo.id === video.id ? 'bg-army-green/5 border-l-4 border-army-green' : 'hover:bg-army-cream hover:translate-x-1'}`}
              >
                <div className="relative w-32 flex-shrink-0 aspect-video bg-army-olive/20 rounded overflow-hidden">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-army-green/30 group-hover:bg-army-green/10 transition-colors flex items-center justify-center">
                     <Play size={16} className="text-white fill-current group-hover:scale-125 transition-transform duration-300" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-gray-800 text-sm line-clamp-2 leading-snug group-hover:text-army-green transition-colors duration-300">{video.title}</h5>
                  <p className="text-xs text-army-olive/70 mt-1">{video.date}</p>
                  
                  {isAdmin && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onDeleteVideo(video.id); }}
                      className="mt-2 text-xs text-army-red hover:text-red-800 flex items-center gap-1"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};