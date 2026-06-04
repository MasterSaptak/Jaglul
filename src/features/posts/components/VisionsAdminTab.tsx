import React, { useState } from 'react';
import { useVisions } from '../../../context/VisionsContext';
import { Vision, VisionStatus } from '../types';
import { Plus, Trash2, Edit3, Image as ImageIcon, Check, ArrowUp, ArrowDown, X, Link as LinkIcon, Save } from 'lucide-react';

export const VisionsAdminTab: React.FC = () => {
  const { visions, isLoading, createVision, updateVision, deleteVision, archiveVision } = useVisions();
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [status, setStatus] = useState<VisionStatus>('published');
  
  const [formError, setFormError] = useState('');

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setShortDescription('');
    setFullDescription('');
    setCoverImage('');
    setStatus('published');
    setFormError('');
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEditClick = (vision: Vision) => {
    setTitle(vision.title);
    setSlug(vision.slug);
    setShortDescription(vision.shortDescription || '');
    setFullDescription(vision.fullDescription || '');
    setCoverImage(vision.coverImage || '');
    setStatus(vision.status);
    setEditingId(vision.id);
    setIsAdding(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!title || !slug) {
      setFormError('Title and Slug are required.');
      return;
    }

    const payload = {
      title,
      slug,
      shortDescription: shortDescription || undefined,
      fullDescription: fullDescription || undefined,
      coverImage: coverImage || undefined,
      status,
      sortOrder: visions.length
    };

    if (editingId) {
      const { error } = await updateVision(editingId, payload);
      if (error) {
        setFormError(error.message || 'Error updating vision');
        return;
      }
    } else {
      const { error } = await createVision(payload);
      if (error) {
        setFormError(error.message || 'Error creating vision');
        return;
      }
    }
    
    resetForm();
  };

  const generateSlug = (val: string) => {
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const moveUp = async (index: number) => {
    if (index === 0) return;
    const current = visions[index];
    const above = visions[index - 1];
    
    await updateVision(current.id, { sortOrder: above.sortOrder });
    await updateVision(above.id, { sortOrder: current.sortOrder });
  };

  const moveDown = async (index: number) => {
    if (index === visions.length - 1) return;
    const current = visions[index];
    const below = visions[index + 1];
    
    await updateVision(current.id, { sortOrder: below.sortOrder });
    await updateVision(below.id, { sortOrder: current.sortOrder });
  };

  if (isLoading) {
    return <div className="p-8 text-center text-army-olive/50">Loading visions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif font-bold text-3xl text-army-navy">Visions</h1>
          <p className="text-army-olive/60 mt-1 text-sm">Manage the core pillars of Colonel Ahsan's mission.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => { resetForm(); setIsAdding(true); }}
            className="flex items-center gap-2 bg-army-green text-white px-4 py-2 rounded-lg font-bold hover:bg-army-olive transition-all"
          >
            <Plus size={18} /> Add Vision
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white rounded-xl border border-army-green/10 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-army-green/10 pb-4">
            <h3 className="font-serif font-bold text-xl text-army-navy">
              {editingId ? 'Edit Vision' : 'Create New Vision'}
            </h3>
            <button onClick={resetForm} className="text-army-olive/50 hover:text-army-red">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <div className="p-3 bg-army-red/10 border border-army-red/20 text-army-red rounded-lg text-sm">
                {formError}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-army-oliveDark mb-1">Title *</label>
                <input 
                  type="text" 
                  className="w-full rounded-md border-army-green/30 shadow-sm focus:border-army-green focus:ring-army-green p-2 border"
                  required
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!editingId) generateSlug(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-army-oliveDark mb-1">Slug * (URL)</label>
                <input 
                  type="text" 
                  className="w-full rounded-md border-army-green/30 shadow-sm focus:border-army-green focus:ring-army-green p-2 border"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-army-oliveDark mb-1">Short Description</label>
              <textarea 
                className="w-full rounded-md border-army-green/30 shadow-sm focus:border-army-green focus:ring-army-green p-2 border"
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="A brief summary for the homepage card."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-army-oliveDark mb-1">Full Description</label>
              <textarea 
                className="w-full rounded-md border-army-green/30 shadow-sm focus:border-army-green focus:ring-army-green p-2 border"
                rows={5}
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                placeholder="The detailed content for the vision's dedicated page."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-army-oliveDark mb-1">Cover Image URL</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ImageIcon size={16} className="text-gray-400" />
                    </div>
                    <input 
                      type="url" 
                      className="w-full pl-9 rounded-md border-army-green/30 shadow-sm focus:border-army-green focus:ring-army-green p-2 border"
                      placeholder="https://..."
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-army-oliveDark mb-1">Status</label>
                <select
                  className="w-full rounded-md border-army-green/30 shadow-sm focus:border-army-green focus:ring-army-green p-2 border bg-white"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as VisionStatus)}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-army-green/10">
              <button 
                type="button" 
                onClick={resetForm}
                className="px-4 py-2 text-army-olive hover:text-army-navy font-medium mr-2"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-army-navy text-white px-6 py-2 rounded-lg font-bold hover:bg-army-navy/90 flex items-center gap-2"
              >
                <Save size={18} /> {editingId ? 'Update Vision' : 'Create Vision'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Visions List */}
      <div className="space-y-3">
        {visions.length === 0 && !isAdding && (
          <div className="text-center py-12 text-army-olive/50 italic bg-white rounded-xl border border-army-green/10">
            No visions configured yet. Click 'Add Vision' to start.
          </div>
        )}
        
        {visions.map((vision, index) => (
          <div key={vision.id} className="bg-white rounded-xl border border-army-green/10 p-4 flex items-start sm:items-center gap-4 shadow-sm hover:shadow-md transition-all">
            {/* Thumbnail */}
            <div className="w-16 h-16 rounded-lg bg-army-cream overflow-hidden border border-army-green/10 flex-shrink-0">
              {vision.coverImage ? (
                <img src={vision.coverImage} alt={vision.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-army-olive/20">
                  <ImageIcon size={20} />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-serif font-bold text-army-navy text-lg leading-tight truncate">
                  {vision.title}
                </h3>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  vision.status === 'published' ? 'bg-army-green/10 text-army-green' : 
                  vision.status === 'draft' ? 'bg-army-gold/20 text-army-gold' : 
                  'bg-army-olive/10 text-army-olive'
                }`}>
                  {vision.status}
                </span>
              </div>
              <p className="text-xs text-army-olive/70 truncate flex items-center gap-1">
                <LinkIcon size={12} /> /{vision.slug}
              </p>
              {vision.shortDescription && (
                <p className="text-sm text-army-olive/80 mt-1 line-clamp-1">{vision.shortDescription}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="flex flex-col mr-2 border-r border-army-green/10 pr-2">
                <button 
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="p-1 text-army-olive/40 hover:text-army-green disabled:opacity-30"
                >
                  <ArrowUp size={16} />
                </button>
                <button 
                  onClick={() => moveDown(index)}
                  disabled={index === visions.length - 1}
                  className="p-1 text-army-olive/40 hover:text-army-green disabled:opacity-30"
                >
                  <ArrowDown size={16} />
                </button>
              </div>
              
              <button 
                onClick={() => handleEditClick(vision)}
                className="p-2 rounded-lg text-army-olive/60 hover:text-army-green hover:bg-army-green/5 transition-all"
                title="Edit"
              >
                <Edit3 size={18} />
              </button>
              <button 
                onClick={async () => {
                  if (window.confirm('Are you sure you want to delete this vision?')) {
                    await deleteVision(vision.id);
                  }
                }}
                className="p-2 rounded-lg text-army-olive/60 hover:text-army-red hover:bg-army-red/5 transition-all"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
