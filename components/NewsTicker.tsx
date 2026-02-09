import React from 'react';
import { Bell, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NewsTickerProps {
  updates: string[];
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ updates }) => {
  const { isAdmin } = useAuth();

  return (
    <div className="bg-gradient-to-r from-[#006A4E] via-[#004D38] to-[#006A4E] text-white relative flex items-center h-12 overflow-hidden border-b-2 border-[#D4AF37]/60 z-40">
      {/* BD Flag Red accent */}
      <div className="bg-[#F42A41] h-full px-5 flex items-center justify-center z-10 shadow-lg relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37]"></div>
        <span className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
          <Bell size={16} className="animate-pulse" />
          Latest Updates
        </span>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div className="absolute whitespace-nowrap animate-marquee flex items-center h-full">
          {updates.map((update, index) => (
            <span key={index} className="mx-8 text-sm font-medium">
              <span className="text-[#D4AF37] mr-2">✦</span>
              {update}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {updates.map((update, index) => (
            <span key={`dup-${index}`} className="mx-8 text-sm font-medium">
              <span className="text-[#D4AF37] mr-2">✦</span>
              {update}
            </span>
          ))}
        </div>
      </div>

      {isAdmin && (
        <button className="absolute right-2 top-2 bg-white text-[#006A4E] p-1 rounded-full hover:bg-[#D4AF37] hover:text-white z-50 transition-colors">
          <Edit size={12} />
        </button>
      )}
    </div>
  );
};
