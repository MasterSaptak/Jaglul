import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  PenSquare,
  FileText,
  Archive,
  Image as ImageIcon,
  Settings,
  Eye,
  LogOut,
  Video as VideoIcon,
  Flag
} from 'lucide-react';

export type StudioTab = 'dashboard' | 'compose' | 'published' | 'drafts' | 'archived' | 'media' | 'videos' | 'visions';

interface StudioSidebarProps {
  activeTab: StudioTab;
  setActiveTab: (tab: StudioTab) => void;
  counts: {
    published: number;
    drafts: number;
    archived: number;
    media: number;
  };
  onLogout: () => void;
  isLoggingOut: boolean;
}

export const StudioSidebar: React.FC<StudioSidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  counts, 
  onLogout, 
  isLoggingOut 
}) => {
  const sidebarItems: { id: StudioTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'compose', label: 'Create Post', icon: <PenSquare size={18} /> },
    { id: 'published', label: 'Published', icon: <Eye size={18} />, count: counts.published },
    { id: 'drafts', label: 'Drafts', icon: <FileText size={18} />, count: counts.drafts },
    { id: 'archived', label: 'Archived', icon: <Archive size={18} />, count: counts.archived },
    { id: 'visions', label: 'Visions', icon: <Flag size={18} /> },
    { id: 'videos', label: 'Videos', icon: <VideoIcon size={18} /> },
    { id: 'media', label: 'Media Library', icon: <ImageIcon size={18} />, count: counts.media },
  ];

  return (
    <aside className="w-64 bg-white border-r border-army-green/10 flex-shrink-0 hidden md:flex flex-col h-full sticky top-0">
      {/* Studio Logo */}
      <div className="p-6 border-b border-army-green/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-army-green to-army-olive flex items-center justify-center shadow-md">
            <LayoutDashboard size={18} className="text-white" />
          </div>
          <div>
            <p className="font-serif font-bold text-army-navy text-sm leading-tight">Jaglul Studio</p>
            <p className="text-[10px] text-army-olive/50 font-medium">Publishing Platform</p>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {sidebarItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left
              ${activeTab === item.id
                ? 'bg-army-green text-white shadow-sm'
                : 'text-army-olive/70 hover:bg-army-cream hover:text-army-navy'
              }`}
          >
            <span className={activeTab === item.id ? 'text-white' : 'text-army-olive/50'}>{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.count !== undefined && item.count > 0 && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                ${activeTab === item.id ? 'bg-white/20 text-white' : 'bg-army-cream text-army-olive'}`}>
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-army-green/5 bg-gray-50/50">
        <Link to="/feed" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-army-olive/70 hover:bg-army-cream hover:text-army-navy transition-all">
          <Eye size={18} className="text-army-olive/40" />
          View Live Site
        </Link>
        <Link to="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-army-olive/70 hover:bg-army-cream hover:text-army-navy transition-all mt-1">
          <Settings size={18} className="text-army-olive/40" />
          Settings
        </Link>
        <button
          onClick={onLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-army-red/70 hover:bg-army-red/5 hover:text-army-red transition-all mt-1"
        >
          <LogOut size={18} />
          {isLoggingOut ? 'Logging Out...' : 'Log Out'}
        </button>
      </div>
    </aside>
  );
};
