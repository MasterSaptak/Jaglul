import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, GraduationCap, Shield, Medal, Scale, ArrowRight } from 'lucide-react';
import { INITIAL_POSTS, THEMATIC_AREAS } from '../constants';
import { ThematicArea } from '../types';

const iconMap: { [key: string]: React.ReactNode } = {
  humanitarian: <Heart className="w-7 h-7" />,
  education: <GraduationCap className="w-7 h-7" />,
  security: <Shield className="w-7 h-7" />,
  veterans: <Medal className="w-7 h-7" />,
  civic: <Scale className="w-7 h-7" />
};

const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
  humanitarian: { bg: 'bg-[#F42A41]/10', text: 'text-[#F42A41]/90', border: 'border-[#F42A41]/25' },
  education: { bg: 'bg-[#D4AF37]/10', text: 'text-[#D4AF37]/90', border: 'border-[#D4AF37]/25' },
  security: { bg: 'bg-army-navy/10', text: 'text-army-navy/90', border: 'border-army-navy/25' },
  veterans: { bg: 'bg-[#006A4E]/10', text: 'text-[#006A4E]/90', border: 'border-[#006A4E]/25' },
  civic: { bg: 'bg-army-olive/10', text: 'text-army-olive/90', border: 'border-army-olive/25' }
};

export const ImpactAreas: React.FC = () => {
  // Get count for each area
  const getCounts = (area: string) => {
    return INITIAL_POSTS.filter(p => p.thematicArea === area).length;
  };

  // Featured areas (top 4)
  const featuredAreas = ['humanitarian', 'education', 'veterans', 'security'];

  return (
    <section className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#006A4E]/90 mb-2">Areas of Impact</h2>
          <div className="h-1 w-24 bg-[#F42A41]/80 mx-auto mb-4"></div>
          <p className="text-army-oliveDark/80 max-w-2xl mx-auto text-sm sm:text-base px-2">
            Colonel Ahsan's work spans multiple areas of public service, from humanitarian relief to national security discourse.
          </p>
        </div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredAreas.map((key) => {
            const config = THEMATIC_AREAS[key as ThematicArea];
            const colors = colorMap[key];
            const count = getCounts(key);
            
            return (
              <Link
                key={key}
                to={`/impact/${key}`}
                className="group relative bg-army-cream rounded-xl p-4 sm:p-6 border border-army-green/10 card-lift overflow-hidden"
              >
                {/* Background Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${colors.bg} rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                
                {/* Icon */}
                <div className={`w-14 h-14 ${colors.bg} ${colors.text} rounded-xl flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                  {iconMap[key]}
                </div>
                
                {/* Content */}
                <h3 className="font-serif font-bold text-army-navy text-lg mb-1 relative z-10 group-hover:text-[#006A4E]/90 transition-colors">
                  {config.title}
                </h3>
                <p className="text-sm text-army-olive/70 mb-3 relative z-10">
                  {config.subtitle}
                </p>
                
                {/* Count & CTA */}
                <div className="flex items-center justify-between relative z-10">
                  <span className={`text-sm font-semibold ${colors.text}`}>
                    {count} documented activities
                  </span>
                  <ArrowRight size={16} className="text-army-olive/50 group-hover:text-army-green group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* All Areas Link */}
        <div className="text-center mt-10">
          <p className="text-sm text-army-olive/60 mb-4">
            Explore all documented initiatives across {Object.keys(THEMATIC_AREAS).length} focus areas
          </p>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 bg-[#006A4E]/90 text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#006A4E]/80 transition-colors btn-military"
          >
            View Complete Archive
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};
