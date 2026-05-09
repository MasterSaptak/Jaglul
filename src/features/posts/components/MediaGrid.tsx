import React from 'react';
import { MediaItem } from '../types';

interface MediaGridProps {
  media: MediaItem[];
}

export const MediaGrid: React.FC<MediaGridProps> = ({ media }) => {
  if (!media || media.length === 0) return null;

  const count = media.length;

  if (count === 1) {
    return (
      <div className="rounded-lg overflow-hidden border border-army-green/10 shadow-sm">
        {media[0].type === 'image' ? (
          <img src={media[0].url} alt={media[0].alt || 'Post media'} className="w-full h-auto object-cover max-h-[500px]" />
        ) : (
          <video src={media[0].url} controls className="w-full h-auto max-h-[500px]" />
        )}
      </div>
    );
  }

  if (count === 2) {
    return (
      <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden border border-army-green/10 shadow-sm h-72">
        {media.map((item, i) => (
          <div key={item.id || i} className="relative h-full">
            <img src={item.url} alt={item.alt || `Media ${i}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden border border-army-green/10 shadow-sm h-96">
        <div className="h-full">
          <img src={media[0].url} alt="Media 0" className="w-full h-full object-cover" />
        </div>
        <div className="grid grid-rows-2 gap-1 h-full">
          <img src={media[1].url} alt="Media 1" className="w-full h-full object-cover" />
          <img src={media[2].url} alt="Media 2" className="w-full h-full object-cover" />
        </div>
      </div>
    );
  }

  // 4 or more: Collage
  return (
    <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden border border-army-green/10 shadow-sm h-[400px]">
      <div className="h-full">
        <img src={media[0].url} alt="Media 0" className="w-full h-full object-cover" />
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
        <img src={media[1].url} alt="Media 1" className="w-full h-full object-cover" />
        <img src={media[2].url} alt="Media 2" className="w-full h-full object-cover" />
        <div className="relative h-full">
          <img src={media[3].url} alt="Media 3" className="w-full h-full object-cover" />
          {count > 4 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-2xl font-bold">
              +{count - 4}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
