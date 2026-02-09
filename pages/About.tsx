import React, { useState } from 'react';
import {
  Shield, Award, BookOpen, Globe, Heart, Briefcase,
  ChevronDown, ChevronUp, Calendar, MapPin, Star,
  Target, Users, Flag, Medal, Crosshair, FileText,
  Building, Scale, Eye, Sword
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { NewsTicker } from '../components/NewsTicker';

// Timeline Item Component
const TimelineItem: React.FC<{
  year: string;
  title: string;
  subtitle?: string;
  highlight?: boolean;
}> = ({ year, title, subtitle, highlight }) => (
  <div className="flex gap-4 group">
    <div className="flex flex-col items-center">
      <div className={`w-3 h-3 rounded-full ${highlight ? 'bg-army-red' : 'bg-army-gold'} group-hover:scale-125 transition-transform`}></div>
      <div className="w-0.5 h-full bg-army-green/20 group-last:hidden"></div>
    </div>
    <div className="pb-6">
      <span className="text-xs font-bold text-army-gold uppercase tracking-wider">{year}</span>
      <h4 className="font-bold text-army-green">{title}</h4>
      {subtitle && <p className="text-sm text-army-oliveDark/70">{subtitle}</p>}
    </div>
  </div>
);

// Expandable Section Component
const ExpandableSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-army-green/20 rounded-lg overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-army-cream hover:bg-army-green/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-army-green">{icon}</div>
          <h3 className="font-serif font-bold text-army-green text-lg">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="text-army-olive" /> : <ChevronDown className="text-army-olive" />}
      </button>
      <div className={`transition-all duration-300 ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="p-6 border-t border-army-green/10">
          {children}
        </div>
      </div>
    </div>
  );
};

// Info Card Component
const InfoCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
}> = ({ icon, title, value, subtitle }) => (
  <div className="bg-white p-4 rounded-lg border border-army-green/10 shadow-grow group cursor-pointer">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-army-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-army-green transition-colors duration-300">
        <span className="group-hover:text-white transition-colors duration-300">{icon}</span>
      </div>
      <div>
        <p className="text-xs text-army-olive/70 uppercase tracking-wider">{title}</p>
        <p className="font-bold text-army-green group-hover:text-army-gold transition-colors duration-300">{value}</p>
        {subtitle && <p className="text-xs text-army-oliveDark/60 mt-1">{subtitle}</p>}
      </div>
    </div>
  </div>
);

// Honor Badge Component
const HonorBadge: React.FC<{
  title: string;
  year?: string;
  description?: string;
}> = ({ title, year, description }) => (
  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-army-gold/10 to-transparent rounded-lg border-l-4 border-army-gold hover:from-army-gold/20 hover:border-army-red transition-all duration-300 cursor-pointer group">
    <Medal className="w-5 h-5 text-army-gold flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
    <div>
      <p className="font-bold text-army-green text-sm group-hover:text-army-gold transition-colors duration-300">{title}</p>
      {year && <p className="text-xs text-army-olive/70">{year}</p>}
      {description && <p className="text-xs text-army-oliveDark/60 mt-1">{description}</p>}
    </div>
  </div>
);

export const About: React.FC = () => {
  const tickerItems = [
    "Colonel (Retd.) Md. Jaglul Ahsan — A Life of Service, Sacrifice, and Principle",
    "Decorated Officer • Combat Veteran • UN Peacekeeper • Ethics Advocate"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-army-cream">
      <NewsTicker updates={tickerItems} />
      <Navbar />

      <main className="flex-grow">
        {/* ===== HERO IDENTITY SECTION ===== */}
        <section className="relative bg-gradient-to-br from-army-olive via-army-green to-army-oliveDark py-16 md:py-24 overflow-hidden">
          {/* Military Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' }}></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Portrait Area */}
              <div className="md:col-span-1 flex justify-center">
                <div className="relative">
                  {/* About portrait (formal, civilian) */}
                  <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full bg-white border-4 border-[#D4A634]/60 overflow-hidden shadow-2xl">
                    <img
                      src="/colonel-about.png"
                      alt="Colonel (Retd.) Md. Jaglul Ahsan"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {/* Rank Insignia */}
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-army-gold rounded-full flex items-center justify-center border-4 border-army-green shadow-lg">
                    <Shield className="w-8 h-8 text-army-forest" />
                  </div>
                </div>
              </div>

              {/* Identity Info */}
              <div className="md:col-span-2 text-center md:text-left">
                <div className="inline-block bg-army-red/20 border border-army-red/30 rounded-full px-4 py-1 mb-4">
                  <span className="text-army-red font-bold text-xs tracking-widest uppercase">
                    Retired Bangladesh Army Officer
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-white leading-tight mb-2">
                  Colonel (Retd.) Md. Jaglul Ahsan
                </h1>

                <p className="text-army-gold font-bold text-lg tracking-wide mb-4">
                  SUP, psc, G
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                  <span className="bg-white/10 text-white/90 text-xs px-3 py-1 rounded-full border border-white/20">Artillery Regiment</span>
                  <span className="bg-white/10 text-white/90 text-xs px-3 py-1 rounded-full border border-white/20">Combat Veteran</span>
                  <span className="bg-white/10 text-white/90 text-xs px-3 py-1 rounded-full border border-white/20">UN Peacekeeper</span>
                  <span className="bg-white/10 text-white/90 text-xs px-3 py-1 rounded-full border border-white/20">PhD Candidate</span>
                </div>

                <blockquote className="text-green-100/80 italic text-lg border-l-4 border-army-gold pl-4 max-w-xl">
                  "A life measured not by rank attained, but by principles upheld."
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ===== LIFE PHILOSOPHY SECTION ===== */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-army-green mb-2">Life Philosophy & Character</h2>
              <div className="h-1 w-24 bg-army-red mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-army-cream p-6 rounded-xl border border-army-green/10 text-center card-lift group cursor-pointer">
                <div className="w-14 h-14 bg-army-green/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-army-green group-hover:scale-110 transition-all duration-300">
                  <Scale className="w-7 h-7 text-army-green group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-army-green mb-2 group-hover:text-army-gold transition-colors duration-300">Uncompromising Ethics</h3>
                <p className="text-sm text-army-oliveDark/70">A steadfast refusal to bend principles for personal gain or institutional pressure.</p>
              </div>

              <div className="bg-army-cream p-6 rounded-xl border border-army-green/10 text-center card-lift group cursor-pointer">
                <div className="w-14 h-14 bg-army-green/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-army-green group-hover:scale-110 transition-all duration-300">
                  <Target className="w-7 h-7 text-army-green group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-army-green mb-2 group-hover:text-army-gold transition-colors duration-300">Revolutionary Mindset</h3>
                <p className="text-sm text-army-oliveDark/70">Questioning unjust systems while respecting the foundations of discipline and order.</p>
              </div>

              <div className="bg-army-cream p-6 rounded-xl border border-army-green/10 text-center card-lift group cursor-pointer">
                <div className="w-14 h-14 bg-army-green/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-army-green group-hover:scale-110 transition-all duration-300">
                  <Heart className="w-7 h-7 text-army-green group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-army-green mb-2 group-hover:text-army-gold transition-colors duration-300">Emotional Integrity</h3>
                <p className="text-sm text-army-oliveDark/70">Outspoken and principled — never silent when conscience demands voice.</p>
              </div>

              <div className="bg-army-cream p-6 rounded-xl border border-army-green/10 text-center card-lift group cursor-pointer">
                <div className="w-14 h-14 bg-army-green/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-army-green group-hover:scale-110 transition-all duration-300">
                  <BookOpen className="w-7 h-7 text-army-green group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-army-green mb-2 group-hover:text-army-gold transition-colors duration-300">Literary Soul</h3>
                <p className="text-sm text-army-oliveDark/70">Influenced by Maya Angelou, Robert Frost, Khalil Gibran, and the spirit of Che Guevara.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== EARLY LIFE & EDUCATION ===== */}
        <section className="py-16 bg-army-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-army-green mb-2">Origin & Formation</h2>
              <div className="h-1 w-24 bg-army-red mx-auto mb-4"></div>
              <p className="text-army-oliveDark/70 max-w-2xl mx-auto">
                How this man was intellectually and morally forged — values, origin, and academic depth.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Early Life */}
              <div className="bg-white rounded-2xl border border-army-green/10 overflow-hidden shadow-sm">
                {/* Header */}
                <div className="bg-gradient-to-r from-army-green to-army-olive p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-serif font-bold text-white">Early Life</h2>
                      <p className="text-green-100/70 text-sm">Values & Formative Years</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Birth Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-army-cream rounded-xl p-4 border border-army-green/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-army-gold" />
                        <span className="text-xs text-army-olive/70 uppercase tracking-wider font-medium">Birth Year</span>
                      </div>
                      <p className="text-2xl font-bold text-army-green">1969</p>
                    </div>
                    <div className="bg-army-cream rounded-xl p-4 border border-army-green/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Flag className="w-4 h-4 text-army-gold" />
                        <span className="text-xs text-army-olive/70 uppercase tracking-wider font-medium">District</span>
                      </div>
                      <p className="text-lg font-bold text-army-green">Bogura</p>
                      <p className="text-xs text-army-olive/60">Bangladesh</p>
                    </div>
                  </div>

                  {/* Full Birthplace */}
                  <div className="bg-gradient-to-r from-army-gold/10 to-army-gold/5 rounded-xl p-4 border-l-4 border-army-gold mb-6">
                    <p className="text-xs text-army-olive/70 uppercase tracking-wider mb-1">Full Birthplace</p>
                    <p className="font-semibold text-army-green">
                      Village Bansgari, Sariakandi, Bogura District, Bangladesh
                    </p>
                  </div>

                  {/* Formation Text */}
                  <div className="space-y-4">
                    <p className="text-sm text-army-oliveDark/80 leading-relaxed">
                      Born during a period of national upheaval, Colonel (Retd.) Md. Jaglul Ahsan's early life
                      was shaped by <strong>discipline, resistance to injustice, and academic excellence</strong>.
                      Raised at Mirzapur Cadet College, he demonstrated leadership, moral courage, and an
                      uncompromising stand against wrongdoing from a very young age — traits that would
                      later define his military and public life.
                    </p>

                    {/* Academic Excellence Badge */}
                    <div className="flex items-center gap-3 bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-emerald-700 text-sm">Primary Education Excellence</p>
                        <p className="text-xs text-emerald-600">PTI School — 1st Position from Class 1 to 5</p>
                      </div>
                    </div>

                    {/* Key Traits */}
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <div className="text-center p-2 bg-army-green/5 rounded-lg">
                        <Shield className="w-5 h-5 text-army-green mx-auto mb-1" />
                        <p className="text-xs font-medium text-army-green">Discipline</p>
                      </div>
                      <div className="text-center p-2 bg-army-green/5 rounded-lg">
                        <Target className="w-5 h-5 text-army-green mx-auto mb-1" />
                        <p className="text-xs font-medium text-army-green">Leadership</p>
                      </div>
                      <div className="text-center p-2 bg-army-green/5 rounded-lg">
                        <Scale className="w-5 h-5 text-army-green mx-auto mb-1" />
                        <p className="text-xs font-medium text-army-green">Moral Courage</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education Timeline */}
              <div className="bg-white rounded-2xl border border-army-green/10 overflow-hidden shadow-sm">
                {/* Header */}
                <div className="bg-gradient-to-r from-army-navy to-army-green p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-serif font-bold text-white">Education</h2>
                      <p className="text-blue-100/70 text-sm">Complete Academic Timeline</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 max-h-[600px] overflow-y-auto">
                  {/* Timeline */}
                  <div className="space-y-0">
                    {/* Primary */}
                    <div className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></div>
                        <div className="w-0.5 flex-1 bg-army-green/20"></div>
                      </div>
                      <div className="pb-5 flex-1">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">Primary</span>
                        <h4 className="font-bold text-army-green mt-1">PTI School</h4>
                        <p className="text-xs text-army-oliveDark/70">Consistently ranked 1st (Class 1–5)</p>
                      </div>
                    </div>

                    {/* Cadet College */}
                    <div className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></div>
                        <div className="w-0.5 flex-1 bg-army-green/20"></div>
                      </div>
                      <div className="pb-5 flex-1">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">Cadet Education</span>
                        <h4 className="font-bold text-army-green mt-1">Mirzapur Cadet College</h4>
                        <p className="text-xs text-army-oliveDark/70">Leadership development, discipline, academic excellence</p>
                      </div>
                    </div>

                    {/* SSC */}
                    <div className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-army-gold group-hover:scale-125 transition-transform"></div>
                        <div className="w-0.5 flex-1 bg-army-green/20"></div>
                      </div>
                      <div className="pb-5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-army-gold uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded">1986</span>
                          <span className="text-xs font-bold text-army-green bg-army-green/10 px-2 py-0.5 rounded">805 Marks</span>
                        </div>
                        <h4 className="font-bold text-army-green mt-1">Secondary School Certificate (SSC)</h4>
                      </div>
                    </div>

                    {/* HSC */}
                    <div className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-army-gold group-hover:scale-125 transition-transform"></div>
                        <div className="w-0.5 flex-1 bg-army-green/20"></div>
                      </div>
                      <div className="pb-5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-army-gold uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded">1988</span>
                          <span className="text-xs font-bold text-army-green bg-army-green/10 px-2 py-0.5 rounded">812 Marks</span>
                        </div>
                        <h4 className="font-bold text-army-green mt-1">Higher Secondary Certificate (HSC)</h4>
                      </div>
                    </div>

                    {/* BMA */}
                    <div className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-army-red group-hover:scale-125 transition-transform"></div>
                        <div className="w-0.5 flex-1 bg-army-green/20"></div>
                      </div>
                      <div className="pb-5 flex-1">
                        <span className="text-[10px] font-bold text-army-red uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded">1988 — Military</span>
                        <h4 className="font-bold text-army-green mt-1">Bangladesh Military Academy</h4>
                        <p className="text-xs text-army-oliveDark/70">Military training & commissioning</p>
                      </div>
                    </div>

                    {/* BSc */}
                    <div className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 group-hover:scale-125 transition-transform"></div>
                        <div className="w-0.5 flex-1 bg-army-green/20"></div>
                      </div>
                      <div className="pb-5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider bg-purple-50 px-2 py-0.5 rounded">1990</span>
                          <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">First Class (605)</span>
                        </div>
                        <h4 className="font-bold text-army-green mt-1">Bachelor of Science (BSc)</h4>
                        <p className="text-xs text-army-oliveDark/70">Chittagong University</p>
                      </div>
                    </div>

                    {/* Defense Studies */}
                    <div className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-cyan-500 group-hover:scale-125 transition-transform"></div>
                        <div className="w-0.5 flex-1 bg-army-green/20"></div>
                      </div>
                      <div className="pb-5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-wider bg-cyan-50 px-2 py-0.5 rounded">2005</span>
                          <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded">618</span>
                        </div>
                        <h4 className="font-bold text-army-green mt-1">Master's in Defense Studies</h4>
                        <p className="text-xs text-army-oliveDark/70">Staff College</p>
                      </div>
                    </div>

                    {/* MBA */}
                    <div className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform"></div>
                        <div className="w-0.5 flex-1 bg-army-green/20"></div>
                      </div>
                      <div className="pb-5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded">2009</span>
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">A+</span>
                        </div>
                        <h4 className="font-bold text-army-green mt-1">Master of Business Administration (MBA)</h4>
                      </div>
                    </div>

                    {/* Military Science */}
                    <div className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-rose-500 group-hover:scale-125 transition-transform"></div>
                        <div className="w-0.5 flex-1 bg-army-green/20"></div>
                      </div>
                      <div className="pb-5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded">2012</span>
                          <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">Distinction (750)</span>
                        </div>
                        <h4 className="font-bold text-army-green mt-1">Master's in Military Science</h4>
                      </div>
                    </div>

                    {/* Germany */}
                    <div className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-amber-500 group-hover:scale-125 transition-transform"></div>
                        <div className="w-0.5 flex-1 bg-army-green/20"></div>
                      </div>
                      <div className="pb-5 flex-1">
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded">International</span>
                        <h4 className="font-bold text-army-green mt-1">European Center for Security Studies</h4>
                        <p className="text-xs text-army-oliveDark/70">Germany — Graduate Program</p>
                      </div>
                    </div>

                    {/* PhD */}
                    <div className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-army-red border-2 border-white shadow group-hover:scale-125 transition-transform"></div>
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-army-red px-2 py-0.5 rounded animate-pulse">Ongoing</span>
                        <h4 className="font-bold text-army-green mt-1">Doctor of Philosophy (PhD)</h4>
                        <p className="text-xs text-army-oliveDark/70">Bangladesh University of Professionals (BUP)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== MILITARY CAREER ===== */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-army-green mb-2">Military Career</h2>
              <div className="h-1 w-24 bg-army-red mx-auto mb-4"></div>
              <p className="text-army-oliveDark/70 max-w-2xl mx-auto">
                Three decades of service to Bangladesh, marked by leadership, doctrine development, and unwavering commitment to military excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <InfoCard
                icon={<Sword className="w-5 h-5 text-army-green" />}
                title="Commissioned"
                value="1990"
                subtitle="Artillery Regiment"
              />
              <InfoCard
                icon={<Shield className="w-5 h-5 text-army-green" />}
                title="Final Rank"
                value="Colonel"
                subtitle="With Honors"
              />
              <InfoCard
                icon={<Star className="w-5 h-5 text-army-green" />}
                title="Service"
                value="30+ Years"
                subtitle="Active & Reserve"
              />
            </div>

            <div className="bg-army-cream p-6 rounded-xl border border-army-green/10">
              <h3 className="font-serif font-bold text-army-green text-xl mb-6">Key Appointments</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-army-gold mt-2"></div>
                  <div>
                    <p className="font-bold text-army-green text-sm">GSO-3 (General Staff Officer)</p>
                    <p className="text-xs text-army-olive/70">Staff operations and planning</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-army-gold mt-2"></div>
                  <div>
                    <p className="font-bold text-army-green text-sm">Brigade Major</p>
                    <p className="text-xs text-army-olive/70">Brigade-level staff coordination</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-army-gold mt-2"></div>
                  <div>
                    <p className="font-bold text-army-green text-sm">Instructor & Chief Instructor</p>
                    <p className="text-xs text-army-olive/70">Training and doctrine education</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-army-gold mt-2"></div>
                  <div>
                    <p className="font-bold text-army-green text-sm">Commanding Officer</p>
                    <p className="text-xs text-army-olive/70">Major & Minor Unit Commands</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg md:col-span-2">
                  <div className="w-2 h-2 rounded-full bg-army-red mt-2"></div>
                  <div>
                    <p className="font-bold text-army-green text-sm">GSO-1, Doctrine Division (ARTDOC)</p>
                    <p className="text-xs text-army-olive/70">Senior staff role in artillery doctrine development and institutional policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== COMBAT, CRISIS & COURAGE ===== */}
        <section className="py-16 bg-gradient-to-br from-army-forest via-army-green to-army-olive text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold mb-2">Combat, Crisis & Courage</h2>
              <div className="h-1 w-24 bg-army-red mx-auto mb-4"></div>
              <p className="text-green-100/80 max-w-2xl mx-auto">
                Service that demanded not just leadership, but personal sacrifice.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-army-red rounded-full flex items-center justify-center">
                    <Crosshair className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-serif font-bold text-xl">Chittagong Firefight</h3>
                </div>
                <p className="text-green-100/80 text-sm mb-4">
                  Sustained multiple bullet wounds during active combat operations in Chittagong.
                  Survived against odds, earning the respect of peers and the informal recognition:
                </p>
                <div className="bg-white/10 p-3 rounded-lg border border-army-gold/30">
                  <p className="text-army-gold font-bold text-sm italic">"The Man with 42 Stitches"</p>
                  <p className="text-xs text-green-100/60 mt-1">A testament to resilience and survival in the line of duty.</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-army-gold rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-army-forest" />
                  </div>
                  <h3 className="font-serif font-bold text-xl">1996 Dhaka Standoff</h3>
                </div>
                <p className="text-green-100/80 text-sm mb-4">
                  Played a critical role during the 1996 military standoff in Dhaka — a moment
                  that tested institutional loyalty, personal courage, and the ability to
                  navigate crisis with discipline.
                </p>
                <div className="bg-white/10 p-3 rounded-lg">
                  <p className="text-xs text-green-100/60">
                    Details of this period reflect the complex political-military dynamics of Bangladesh's history.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== INTERNATIONAL SERVICE ===== */}
        <section className="py-16 bg-army-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Globe className="w-8 h-8 text-army-green" />
                <h2 className="text-3xl font-serif font-bold text-army-green">International Service</h2>
              </div>
              <div className="h-1 w-24 bg-army-red mx-auto mb-4"></div>
              <p className="text-army-oliveDark/70 max-w-2xl mx-auto">
                Representing Bangladesh with distinction on the global stage through United Nations peacekeeping missions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Sierra Leone */}
              <div className="bg-white p-6 rounded-xl border border-army-green/10 card-lift group">
                <div className="flex items-center gap-2 mb-4">
                  <img src="https://flagcdn.com/w40/sl.png" alt="Sierra Leone" className="w-8 h-6 object-cover rounded group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="font-serif font-bold text-army-green text-lg">UNAMSIL — Sierra Leone</h3>
                    <p className="text-xs text-army-olive/70">United Nations Mission in Sierra Leone</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-army-gold"></div>
                    <p className="text-sm text-army-oliveDark"><strong>Role:</strong> Head of Logistics</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-army-gold"></div>
                    <p className="text-sm text-army-oliveDark"><strong>Transition:</strong> UN Military Observer</p>
                  </div>
                  <div className="bg-army-cream/50 p-3 rounded-lg mt-4">
                    <p className="text-xs text-army-olive/80">
                      Managed complex logistics operations in a post-conflict environment,
                      later transitioning to observer duties monitoring ceasefire compliance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mali */}
              <div className="bg-white p-6 rounded-xl border border-army-green/10 card-lift group">
                <div className="flex items-center gap-2 mb-4">
                  <img src="https://flagcdn.com/w40/ml.png" alt="Mali" className="w-8 h-6 object-cover rounded group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="font-serif font-bold text-army-green text-lg">MINUSMA — Mali</h3>
                    <p className="text-xs text-army-olive/70">2017–2018</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-army-gold"></div>
                    <p className="text-sm text-army-oliveDark"><strong>Role:</strong> Military Intelligence Officer</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-army-green"></div>
                    <p className="text-sm text-army-oliveDark"><strong>Evaluation:</strong> <span className="text-army-green font-bold">"Outstanding"</span></p>
                  </div>
                  <div className="bg-army-green/10 p-3 rounded-lg mt-4 border-l-4 border-army-green">
                    <p className="text-xs text-army-green font-medium">
                      Received the highest performance evaluation, reflecting exemplary
                      service and integrity in a challenging operational environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== HONORS & DISTINCTIONS ===== */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-army-green mb-2">Honors & Distinctions</h2>
              <div className="h-1 w-24 bg-army-red mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <HonorBadge
                title="Sena Utkarsh Padak (SUP)"
                year="2019"
                description="Military excellence award for distinguished service"
              />
              <HonorBadge
                title="Best Firer"
                year="2006"
                description="Top marksmanship recognition"
              />
              <HonorBadge
                title="Best Research & Essay Writing Officer"
                year="Awarded Twice"
                description="Recognition for intellectual contribution"
              />
              <div className="md:col-span-2 lg:col-span-3">
                <div className="flex items-center gap-3 p-4 bg-army-cream rounded-lg border border-army-green/10">
                  <Award className="w-6 h-6 text-army-gold flex-shrink-0" />
                  <div>
                    <p className="font-bold text-army-green">TRACE Score: ~85%</p>
                    <p className="text-xs text-army-olive/70">
                      TRACE (Training, Research, Administration, Command, Extra-curricular) —
                      A comprehensive military performance metric. Score of 85% indicates
                      exceptional all-round officer competency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== ETHICS & INSTITUTIONAL CONFLICT (Collapsible) ===== */}
        <section className="py-16 bg-army-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ExpandableSection
              title="Ethics, Resistance & Institutional Conflict"
              icon={<Scale className="w-5 h-5" />}
              defaultOpen={false}
            >
              <div className="space-y-6">
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> This section presents factual career events.
                    It is included for historical completeness, not as accusation or grievance.
                  </p>
                </div>

                <div className="prose prose-sm max-w-none text-army-oliveDark/80">
                  <h4 className="text-army-green font-bold">Ethical Resistance</h4>
                  <p>
                    Throughout his career, Colonel Ahsan maintained positions of principle
                    even when such positions conflicted with institutional expectations or
                    the interests of superior officers. This included:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Refusing to participate in or endorse actions deemed unethical</li>
                    <li>Advocating for transparency in procurement and administrative processes</li>
                    <li>Speaking against favoritism in promotions and assignments</li>
                  </ul>

                  <h4 className="text-army-green font-bold mt-6">Professional Consequences</h4>
                  <p>
                    Such positions, while principled, carried professional costs — including
                    delayed promotions, challenging postings, and institutional friction.
                    These are presented as factual career impacts, not as complaints.
                  </p>

                  <h4 className="text-army-green font-bold mt-6">Career Impact</h4>
                  <p>
                    Despite these challenges, Colonel Ahsan completed a full career with
                    honors, international service, and the respect of many peers. The
                    conflicts experienced reflect broader institutional dynamics rather
                    than personal failures.
                  </p>
                </div>
              </div>
            </ExpandableSection>
          </div>
        </section>

        {/* ===== POST-RETIREMENT LIFE ===== */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-army-green mb-2">Post-Retirement Life</h2>
              <div className="h-1 w-24 bg-army-red mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-army-cream p-6 rounded-xl border border-army-green/10 card-lift group cursor-pointer">
                <Building className="w-10 h-10 text-army-green mb-4 group-hover:scale-110 group-hover:text-army-gold transition-all duration-300" />
                <h3 className="font-bold text-army-green mb-2 group-hover:text-army-gold transition-colors duration-300">Corporate Sector</h3>
                <p className="text-sm text-army-oliveDark/70 mb-3">
                  <strong>Trust Bank Ltd</strong> — Served as Head of Purchase
                </p>
                <p className="text-xs text-army-olive/60 bg-white p-2 rounded">
                  Resigned on ethical grounds, maintaining the same principles
                  that defined military service.
                </p>
              </div>

              <div className="bg-army-cream p-6 rounded-xl border border-army-green/10 card-lift group cursor-pointer">
                <Briefcase className="w-10 h-10 text-army-green mb-4 group-hover:scale-110 group-hover:text-army-gold transition-all duration-300" />
                <h3 className="font-bold text-army-green mb-2 group-hover:text-army-gold transition-colors duration-300">Independent Business</h3>
                <p className="text-sm text-army-oliveDark/70">
                  Currently engaged in independent business ventures,
                  applying leadership and management expertise from
                  decades of service.
                </p>
              </div>

              <div className="bg-army-cream p-6 rounded-xl border border-army-green/10 card-lift group cursor-pointer">
                <Users className="w-10 h-10 text-army-green mb-4 group-hover:scale-110 group-hover:text-army-gold transition-all duration-300" />
                <h3 className="font-bold text-army-green mb-2 group-hover:text-army-gold transition-colors duration-300">Veterans Advisory</h3>
                <p className="text-sm text-army-oliveDark/70">
                  Serves as adviser to major retired soldiers' groups,
                  contributing to veteran welfare and institutional reform advocacy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== LEADERSHIP & VISION ===== */}
        <section className="py-16 bg-gradient-to-br from-army-olive via-army-green to-army-oliveDark text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold mb-2">Leadership & Vision</h2>
              <div className="h-1 w-24 bg-army-red mx-auto mb-4"></div>
              <p className="text-green-100/80 max-w-2xl mx-auto">
                Core principles guiding continued public engagement and advocacy.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center group hover:bg-white/20 hover:border-army-gold/50 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 bg-army-red rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Scale className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold mb-2 group-hover:text-army-gold transition-colors duration-300">Anti-Corruption</h3>
                <p className="text-sm text-green-100/70">
                  Zero tolerance for corruption in public and private institutions.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center group hover:bg-white/20 hover:border-army-gold/50 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 bg-army-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Flag className="w-7 h-7 text-army-forest" />
                </div>
                <h3 className="font-bold mb-2 group-hover:text-army-gold transition-colors duration-300">National Integrity</h3>
                <p className="text-sm text-green-100/70">
                  Unwavering commitment to Bangladesh's sovereignty and values.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center group hover:bg-white/20 hover:border-army-gold/50 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold mb-2 group-hover:text-army-gold transition-colors duration-300">Veteran Unity</h3>
                <p className="text-sm text-green-100/70">
                  Bringing together retired soldiers for collective welfare and voice.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center group hover:bg-white/20 hover:border-army-gold/50 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold mb-2 group-hover:text-army-gold transition-colors duration-300">Institutional Reform</h3>
                <p className="text-sm text-green-100/70">
                  Advocating for transparent, merit-based institutional systems.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-green-100/60 text-sm italic max-w-2xl mx-auto">
                "A soldier's duty does not end at retirement. The commitment to nation,
                justice, and truth continues in every capacity available."
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
