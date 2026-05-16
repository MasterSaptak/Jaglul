import React from 'react';
import { Calendar, MapPin, Users, User, Award, Tag } from 'lucide-react';
import { Post } from '../types';

interface EventSummaryCardProps {
  post: Post;
}

const getCategoryConfig = (category: string) => {
  switch (category) {
    case 'Event':
      return { color: 'bg-army-gold/10 border-army-gold text-army-gold', label: 'Event' };
    case 'Humanitarian':
      return { color: 'bg-army-red/10 border-army-red text-army-red', label: 'Humanitarian Initiative' };
    case 'Op-Ed':
      return { color: 'bg-army-navy/10 border-army-navy text-army-navy', label: 'Opinion & Commentary' };
    case 'Policy':
      return { color: 'bg-army-olive/10 border-army-olive text-army-olive', label: 'Policy & Security' };
    default:
      return { color: 'bg-army-green/10 border-army-green text-army-green', label: 'News Update' };
  }
};

const getThematicLabel = (area: string) => {
  switch (area) {
    case 'humanitarian': return 'Humanitarian & Relief';
    case 'education': return 'Education & Youth Development';
    case 'security': return 'National Security & Policy';
    case 'veterans': return 'Veterans Welfare';
    case 'civic': return 'Civic Action & Rights';
    default: return 'General';
  }
};

export const EventSummaryCard: React.FC<EventSummaryCardProps> = ({ post }) => {
  const categoryConfig = getCategoryConfig(post.category);
  const hasEventDetails = post.eventDetails;

  return (
    <div className="bg-white rounded-xl border border-army-green/15 overflow-hidden shadow-sm mb-8">
      {/* Header with Category Badge */}
      <div className="bg-army-cream/50 px-6 py-4 border-b border-army-green/10">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className={`${categoryConfig.color} text-xs font-bold px-3 py-1.5 rounded-full border uppercase tracking-wider`}>
              {categoryConfig.label}
            </span>
            <span className="text-sm text-army-olive/60 font-medium">
              {getThematicLabel(post.thematicArea)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-army-olive/70">
            <Calendar size={14} />
            <span className="font-medium">{post.date}</span>
          </div>
        </div>
      </div>

      {/* Event Details Grid */}
      <div className="p-6">
        <div className={`grid ${hasEventDetails ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2'} gap-4`}>
          {/* Location */}
          {hasEventDetails && post.eventDetails?.location && (
            <div className="flex items-start gap-3 p-3 bg-army-cream/30 rounded-lg group hover:bg-army-cream/50 transition-colors">
              <div className="w-9 h-9 bg-army-green/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-army-green group-hover:scale-110 transition-all">
                <MapPin size={16} className="text-army-green group-hover:text-white transition-colors" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-army-olive/60 uppercase tracking-wider font-medium">Location</p>
                <p className="text-sm text-army-navy font-semibold truncate">{post.eventDetails.location}</p>
              </div>
            </div>
          )}

          {/* Event Date/Time */}
          {hasEventDetails && post.eventDetails?.eventDate && (
            <div className="flex items-start gap-3 p-3 bg-army-cream/30 rounded-lg group hover:bg-army-cream/50 transition-colors">
              <div className="w-9 h-9 bg-army-green/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-army-green group-hover:scale-110 transition-all">
                <Calendar size={16} className="text-army-green group-hover:text-white transition-colors" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-army-olive/60 uppercase tracking-wider font-medium">Date & Time</p>
                <p className="text-sm text-army-navy font-semibold">{post.eventDetails.eventDate}</p>
              </div>
            </div>
          )}

          {/* Organizer */}
          {hasEventDetails && post.eventDetails?.organizer && (
            <div className="flex items-start gap-3 p-3 bg-army-cream/30 rounded-lg group hover:bg-army-cream/50 transition-colors">
              <div className="w-9 h-9 bg-army-green/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-army-green group-hover:scale-110 transition-all">
                <Users size={16} className="text-army-green group-hover:text-white transition-colors" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-army-olive/60 uppercase tracking-wider font-medium">Organizer</p>
                <p className="text-sm text-army-navy font-semibold truncate">{post.eventDetails.organizer}</p>
              </div>
            </div>
          )}

          {/* Role */}
          {hasEventDetails && post.eventDetails?.role && (
            <div className="flex items-start gap-3 p-3 bg-army-cream/30 rounded-lg group hover:bg-army-cream/50 transition-colors">
              <div className="w-9 h-9 bg-army-gold/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-army-gold group-hover:scale-110 transition-all">
                <Award size={16} className="text-army-gold group-hover:text-army-forest transition-colors" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-army-olive/60 uppercase tracking-wider font-medium">Colonel's Role</p>
                <p className="text-sm text-army-navy font-semibold">{post.eventDetails.role}</p>
              </div>
            </div>
          )}

          {/* For non-event posts, show author and category info */}
          {!hasEventDetails && (
            <>
              <div className="flex items-start gap-3 p-3 bg-army-cream/30 rounded-lg group hover:bg-army-cream/50 transition-colors">
                <div className="w-9 h-9 bg-army-green/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-army-green group-hover:scale-110 transition-all">
                  <User size={16} className="text-army-green group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-army-olive/60 uppercase tracking-wider font-medium">Author</p>
                  <p className="text-sm text-army-navy font-semibold">Col. (Retd.) Md. Jaglul Ahsan</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-army-cream/30 rounded-lg group hover:bg-army-cream/50 transition-colors">
                <div className="w-9 h-9 bg-army-green/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-army-green group-hover:scale-110 transition-all">
                  <Tag size={16} className="text-army-green group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-army-olive/60 uppercase tracking-wider font-medium">Focus Area</p>
                  <p className="text-sm text-army-navy font-semibold">{getThematicLabel(post.thematicArea)}</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-army-green/10">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-army-olive/60 uppercase tracking-wider font-medium">Topics:</span>
              {post.tags.map(tag => (
                <span 
                  key={tag}
                  className="text-xs bg-army-green/5 text-army-navy/80 px-2.5 py-1 rounded-full border border-army-green/10 hover:bg-army-green/10 transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Outcome/Impact (if available) */}
        {hasEventDetails && post.eventDetails?.outcome && (
          <div className="mt-4 pt-4 border-t border-army-green/10">
            <div className="bg-army-green/5 rounded-lg p-4 border-l-4 border-army-green">
              <p className="text-xs text-army-olive/60 uppercase tracking-wider font-medium mb-1">Impact / Outcome</p>
              <p className="text-sm text-army-navy">{post.eventDetails.outcome}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
