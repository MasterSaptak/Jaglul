import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, GraduationCap, Shield, Medal, Scale, Calendar, MapPin, Users, ArrowRight, MessageSquare } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { INITIAL_POSTS, THEMATIC_AREAS } from '../constants';
import { ThematicArea } from '../types';

const iconMap: { [key: string]: React.ReactNode } = {
  humanitarian: <Heart className="w-8 h-8" />,
  education: <GraduationCap className="w-8 h-8" />,
  security: <Shield className="w-8 h-8" />,
  veterans: <Medal className="w-8 h-8" />,
  civic: <Scale className="w-8 h-8" />
};

const colorMap: { [key: string]: string } = {
  humanitarian: 'army-red',
  education: 'army-gold',
  security: 'army-navy',
  veterans: 'army-green',
  civic: 'army-olive'
};

export const ImpactPage: React.FC = () => {
  const { theme } = useParams<{ theme: string }>();
  
  const thematicConfig = THEMATIC_AREAS[theme as ThematicArea];
  const filteredPosts = INITIAL_POSTS.filter(post => post.thematicArea === theme);
  const color = colorMap[theme || 'humanitarian'] || 'army-green';

  if (!thematicConfig) {
    return (
      <div className="min-h-screen flex flex-col bg-army-cream">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-army-green mb-4">Page Not Found</h1>
            <p className="text-army-olive/70 mb-6">The impact area you're looking for doesn't exist.</p>
            <Link to="/news" className="bg-army-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-army-olive transition-colors">
              Browse All News
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate stats
  const totalEvents = filteredPosts.filter(p => p.eventDetails).length;
  const totalAttendees = filteredPosts.reduce((sum, p) => sum + (p.eventDetails?.attendees || 0), 0);
  const totalComments = filteredPosts.reduce((sum, p) => sum + p.commentCount, 0);

  return (
    <div className="min-h-screen flex flex-col bg-army-cream">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className={`relative bg-gradient-to-br from-${color} via-${color}/90 to-${color}/80 py-20 md:py-28 overflow-hidden`}>
          {/* Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              {/* Icon */}
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 text-white border border-white/20">
                {iconMap[theme || 'humanitarian']}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
                {thematicConfig.title}
              </h1>
              
              <p className="text-xl text-white/90 font-medium mb-4">
                {thematicConfig.subtitle}
              </p>
              
              <p className="text-lg text-white/70 max-w-2xl">
                {thematicConfig.description}
              </p>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="bg-white border-b border-army-green/10 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="p-3 sm:p-4">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-army-green">{filteredPosts.length}</p>
                <p className="text-sm text-army-olive/70 font-medium">Documented Activities</p>
              </div>
              <div className="p-3 sm:p-4 border-l border-army-green/10">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-army-green">{totalEvents}</p>
                <p className="text-sm text-army-olive/70 font-medium">Events Organized</p>
              </div>
              <div className="p-3 sm:p-4 border-l border-army-green/10">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-army-green">{totalAttendees}+</p>
                <p className="text-sm text-army-olive/70 font-medium">People Reached</p>
              </div>
              <div className="p-3 sm:p-4 border-l border-army-green/10">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-army-green">{totalComments}</p>
                <p className="text-sm text-army-olive/70 font-medium">Public Responses</p>
              </div>
            </div>
          </div>
        </section>

        {/* Posts Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-army-green">
                  Documented Activities
                </h2>
                <p className="text-army-olive/70 mt-1">
                  All initiatives and events in this focus area
                </p>
              </div>
              <Link 
                to="/news"
                className="hidden md:flex items-center gap-2 text-army-green hover:text-army-gold transition-colors font-medium"
              >
                View All News <ArrowRight size={18} />
              </Link>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="space-y-8">
                {filteredPosts.map((post, index) => (
                  <article 
                    key={post.id}
                    className="bg-white rounded-xl border border-army-green/10 overflow-hidden shadow-sm card-lift group"
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* Image */}
                      <Link to={`/news/${post.id}`} className="lg:w-80 h-56 lg:h-auto flex-shrink-0 overflow-hidden img-zoom">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      
                      {/* Content */}
                      <div className="flex-1 p-6 lg:p-8">
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className={`bg-${color}/10 text-${color} text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-${color}/20`}>
                            {post.category}
                          </span>
                          <span className="text-sm text-army-olive/60 flex items-center gap-1.5">
                            <Calendar size={14} />
                            {post.date}
                          </span>
                        </div>
                        
                        {/* Title */}
                        <Link to={`/news/${post.id}`}>
                          <h3 className="font-serif font-bold text-army-navy text-xl lg:text-2xl mb-3 group-hover:text-army-green transition-colors">
                            {post.title}
                          </h3>
                        </Link>
                        
                        {/* Excerpt */}
                        <p className="text-army-olive/80 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        {/* Event Details */}
                        {post.eventDetails && (
                          <div className="flex flex-wrap gap-4 mb-4 text-sm text-army-olive/70">
                            {post.eventDetails.location && (
                              <div className="flex items-center gap-1.5">
                                <MapPin size={14} className="text-army-gold" />
                                <span>{post.eventDetails.location.split(',')[0]}</span>
                              </div>
                            )}
                            {post.eventDetails.attendees && (
                              <div className="flex items-center gap-1.5">
                                <Users size={14} className="text-army-gold" />
                                <span>{post.eventDetails.attendees} attendees</span>
                              </div>
                            )}
                            {post.eventDetails.role && (
                              <div className="flex items-center gap-1.5 text-army-green font-medium">
                                <span>Role: {post.eventDetails.role}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Outcome */}
                        {post.eventDetails?.outcome && (
                          <div className="bg-army-cream/50 rounded-lg p-3 mb-4 border-l-4 border-army-green">
                            <p className="text-xs text-army-olive/60 uppercase tracking-wider font-medium mb-1">Impact</p>
                            <p className="text-sm text-army-navy">{post.eventDetails.outcome}</p>
                          </div>
                        )}
                        
                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-army-green/10">
                          <Link 
                            to={`/news/${post.id}`}
                            className="inline-flex items-center gap-1.5 text-army-red font-semibold hover:text-army-green transition-colors"
                          >
                            Read Full Story <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </Link>
                          
                          {post.commentCount > 0 && (
                            <div className="flex items-center gap-1.5 text-sm text-army-olive/60">
                              <MessageSquare size={14} />
                              {post.commentCount} responses
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-army-green/10">
                <div className="w-16 h-16 bg-army-cream rounded-full flex items-center justify-center mx-auto mb-4">
                  {iconMap[theme || 'humanitarian']}
                </div>
                <h3 className="text-xl font-serif font-bold text-army-navy mb-2">No activities yet</h3>
                <p className="text-army-olive/70 mb-6">Check back soon for updates in this area.</p>
                <Link
                  to="/news"
                  className="bg-army-green text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-army-olive transition-colors"
                >
                  Browse All News
                </Link>
              </div>
            )}

            {/* Mobile Link */}
            <div className="mt-8 text-center md:hidden">
              <Link 
                to="/news"
                className="inline-flex items-center gap-2 bg-army-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-army-olive transition-colors"
              >
                View All News <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Other Focus Areas */}
        <section className="py-16 bg-white border-t border-army-green/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-serif font-bold text-army-green mb-8 text-center">
              Explore Other Focus Areas
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {Object.entries(THEMATIC_AREAS)
                .filter(([key]) => key !== theme)
                .map(([key, config]) => (
                  <Link 
                    key={key}
                    to={`/impact/${key}`}
                    className="bg-army-cream p-6 rounded-xl border border-army-green/10 text-center card-lift group"
                  >
                    <div className={`w-12 h-12 bg-${colorMap[key]}/10 rounded-full flex items-center justify-center mx-auto mb-3 text-${colorMap[key]} group-hover:bg-${colorMap[key]} group-hover:text-white transition-all`}>
                      {iconMap[key]}
                    </div>
                    <h3 className="font-bold text-army-navy group-hover:text-army-green transition-colors">
                      {config.title}
                    </h3>
                    <p className="text-xs text-army-olive/60 mt-1">
                      {INITIAL_POSTS.filter(p => p.thematicArea === key).length} activities
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};
