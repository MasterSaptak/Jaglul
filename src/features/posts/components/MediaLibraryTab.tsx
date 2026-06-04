import React, { useState, useRef } from 'react';
import { useMediaLibrary } from '../../../context/MediaLibraryContext';
import { MediaItem } from '../types';
import { Upload, Trash2, Edit3, Image as ImageIcon, Check, Search, X, CheckSquare, Square, FileVideo, Save } from 'lucide-react';

export const MediaLibraryTab: React.FC = () => {
  const { mediaFiles, isLoading, uploadFiles, deleteMedia, bulkDelete, updateMediaMetadata } = useMediaLibrary();
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [editAlt, setEditAlt] = useState('');
  const [editCaption, setEditCaption] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredMedia = mediaFiles.filter(item => 
    (item.alt || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.caption || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    setUploadError('');
    
    const filesArray = Array.from(e.target.files);
    const { error } = await uploadFiles(filesArray);
    
    if (error) {
      setUploadError(error.message || 'Failed to upload one or more files.');
    }
    
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === filteredMedia.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredMedia.map(m => m.id)));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedIds.size} files permanently?`)) {
      await bulkDelete(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  };

  const startEditing = (item: MediaItem) => {
    setEditingItem(item);
    setEditAlt(item.alt || '');
    setEditCaption(item.caption || '');
  };

  const saveEdit = async () => {
    if (!editingItem) return;
    await updateMediaMetadata(editingItem.id, {
      alt: editAlt || undefined,
      caption: editCaption || undefined
    });
    setEditingItem(null);
  };

  if (isLoading) {
    return <div className="p-8 text-center text-army-olive/50">Loading media library...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-3xl text-army-navy">Media Library</h1>
          <p className="text-army-olive/60 mt-1 text-sm">Manage all uploaded images and videos centrally.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 bg-army-green text-white px-4 py-2 rounded-lg font-bold hover:bg-army-olive transition-all disabled:opacity-50"
          >
            <Upload size={18} /> {isUploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      </div>

      {uploadError && (
        <div className="p-3 bg-army-red/10 border border-army-red/20 text-army-red rounded-lg text-sm">
          {uploadError}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-army-green/10 shadow-sm">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button 
            onClick={selectAll}
            className="flex items-center gap-2 text-army-olive hover:text-army-navy text-sm font-medium"
          >
            {selectedIds.size === filteredMedia.length && filteredMedia.length > 0 ? (
              <CheckSquare size={18} className="text-army-green" />
            ) : (
              <Square size={18} />
            )}
            Select All
          </button>
          
          {selectedIds.size > 0 && (
            <button 
              onClick={handleBulkDelete}
              className="flex items-center gap-2 text-army-red hover:text-army-red/80 text-sm font-bold bg-army-red/5 px-3 py-1.5 rounded-md"
            >
              <Trash2 size={16} /> Delete Selected ({selectedIds.size})
            </button>
          )}
        </div>

        <div className="relative w-full sm:w-64">
          <input 
            type="text" 
            placeholder="Search media..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-army-green/20 focus:border-army-green focus:ring-1 focus:ring-army-green text-sm"
          />
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-army-olive/50" />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-army-olive/50 hover:text-army-navy">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filteredMedia.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-army-green/10 shadow-sm">
          <ImageIcon size={48} className="mx-auto text-army-olive/20 mb-4" />
          <h3 className="font-serif font-bold text-xl text-army-navy mb-1">No media found</h3>
          <p className="text-army-olive/60 text-sm">Upload images or videos to build your library.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map(item => (
            <div 
              key={item.id} 
              className={`relative group bg-white rounded-xl overflow-hidden border transition-all ${
                selectedIds.has(item.id) ? 'border-army-green ring-2 ring-army-green/50' : 'border-army-green/10 hover:border-army-green/50 hover:shadow-md'
              }`}
            >
              <div 
                className="aspect-square bg-gray-100 cursor-pointer relative"
                onClick={() => toggleSelect(item.id)}
              >
                {item.type === 'image' ? (
                  <img src={item.url} alt={item.alt || ''} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <FileVideo size={32} className="text-army-olive/50" />
                  </div>
                )}
                
                {/* Selection Overlay */}
                <div className={`absolute inset-0 transition-opacity ${selectedIds.has(item.id) ? 'bg-army-green/20 opacity-100' : 'opacity-0 group-hover:opacity-100 bg-black/10'}`}>
                  <div className="absolute top-2 left-2">
                    {selectedIds.has(item.id) ? (
                      <CheckSquare size={20} className="text-army-green bg-white rounded-sm" />
                    ) : (
                      <Square size={20} className="text-white" />
                    )}
                  </div>
                </div>
              </div>

              {/* Details Footer */}
              <div className="p-2 border-t border-army-green/5">
                <p className="text-xs font-medium text-army-navy truncate" title={item.alt}>
                  {item.alt || 'Untitled'}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-[10px] text-army-olive/50">
                    {new Date(item.uploadedAt).toLocaleDateString()}
                  </p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); startEditing(item); }}
                    className="p-1 text-army-olive/50 hover:text-army-green bg-army-cream rounded"
                  >
                    <Edit3 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-army-green/10">
              <h3 className="font-serif font-bold text-xl text-army-navy">Edit Media</h3>
              <button onClick={() => setEditingItem(null)} className="text-army-olive hover:text-army-red">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4 border border-army-green/10">
                {editingItem.type === 'image' ? (
                  <img src={editingItem.url} alt="" className="w-full h-full object-contain" />
                ) : (
                  <video src={editingItem.url} controls className="w-full h-full" />
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-army-oliveDark mb-1">Alt Text (Title)</label>
                  <input 
                    type="text" 
                    value={editAlt}
                    onChange={(e) => setEditAlt(e.target.value)}
                    className="w-full rounded-md border-army-green/30 shadow-sm focus:border-army-green focus:ring-army-green p-2 border text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-army-oliveDark mb-1">Caption</label>
                  <textarea 
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                    rows={3}
                    className="w-full rounded-md border-army-green/30 shadow-sm focus:border-army-green focus:ring-army-green p-2 border text-sm"
                  />
                </div>
                <div className="text-xs text-army-olive/50 break-all">
                  <strong>URL:</strong> {editingItem.url}
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-army-green/10 bg-gray-50 flex justify-end gap-2">
              <button 
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 text-army-olive text-sm font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={saveEdit}
                className="px-4 py-2 bg-army-green text-white text-sm font-bold rounded-lg flex items-center gap-2 hover:bg-army-olive"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
