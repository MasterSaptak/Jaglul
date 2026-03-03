import React from 'react';
import { ChevronRight, Shield, Award, Globe } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[90vh] sm:min-h-[85vh] overflow-hidden">
      {/* Mobile: same background as desktop for consistent look (no diamond frame) */}
      <div className="absolute inset-0 md:hidden">
        <img
          src="/background%20new%20pc.png"
          alt=""
          className="w-full h-full object-cover object-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#006A4E]/50 via-[#006A4E]/30 to-[#1A3A2A]/90"></div>
      </div>

      {/* Desktop: Background image */}
      <div className="absolute inset-0 hidden md:block">
        <img
          src="/background%20new%20pc.png"
          alt=""
          className="w-full h-full object-cover object-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#006A4E]/60 via-[#006A4E]/30 to-transparent"></div>
      </div>

      {/* Top accent - BD Flag colors, softer */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#006A4E]/90 via-[#F42A41]/90 to-[#006A4E]/90 z-20"></div>

      {/* Content */}
      <div className="relative z-10 min-h-0 px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto h-full">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 sm:gap-6 h-full">
            {/* Mobile: Clean vertical flow, matches desktop look, animates */}
            <div className="md:hidden w-full flex flex-col items-center pt-2 animate-fade-in">
              {/* Portrait - large, prominent, no box border, with float animation */}
              <div className="w-72 sm:w-80 aspect-[3/4] rounded-2xl overflow-hidden mb-6 flex-shrink-0 animate-float">
                <img
                  src="/colonel-jaglul.png"
                  alt="Colonel (Retd.) Md. Jaglul Ahsan"
                  className="w-full h-full object-cover object-top drop-shadow-2xl"
                />
              </div>
              {/* Text - on gradient, no heavy box */}
              <div className="w-full max-w-sm text-center space-y-3">
                <h1 className="text-2xl font-serif font-black text-white leading-tight">
                  Colonel (Retd.) Md. Jaglul Ahsan
                </h1>
                <p className="text-[#D4AF37] font-semibold text-sm">
                  Leading with Integrity, Inspiring with Vision, Serving with Dedication.
                </p>
                <p className="text-white/80 text-xs">
                  SUP, psc, G • 30+ Years • 2 UN Missions • Bangladesh Army
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => window.location.href = '/#/about'}
                    className="w-full flex items-center justify-center gap-2 bg-[#F42A41] hover:bg-[#D91E36] text-white font-bold py-3 rounded-xl text-sm"
                  >
                    Read Biography
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full flex items-center justify-center gap-2 border-2 border-white/50 text-white font-semibold py-2.5 rounded-xl text-sm"
                  >
                    View Vision & Mission
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop: Text Box */}
            <div className="hidden md:block w-full max-w-md flex-shrink-0 mx-auto md:mx-0">
              <div className="bg-gradient-to-br from-[#006A4E]/90 to-[#004D38]/90 backdrop-blur-md rounded-2xl p-5 lg:p-6 border border-[#D4AF37]/25 shadow-xl">
                  <p className="text-[#D4AF37] font-bold text-sm tracking-wide uppercase mb-2">A Visionary Leader</p>
                  <p className="text-white font-semibold text-base lg:text-lg leading-snug mb-4">
                    Leading with Integrity, Inspiring with Vision, Serving with Dedication.
                  </p>
                  <div className="h-px w-16 bg-[#F42A41] mb-4"></div>
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-[#D4AF37]/40 rounded-full px-4 py-2 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F42A41] animate-pulse"></div>
                    <span className="text-white font-bold text-xs tracking-wider uppercase">Service • Honor • Nation</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-serif font-black text-white leading-tight mb-1">Colonel (Retd.)</h1>
                  <h1 className="text-4xl lg:text-5xl font-serif font-black text-[#D4AF37] leading-tight mb-4">Md. Jaglul Ahsan</h1>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-0.5 w-10 bg-[#D4AF37]"></div>
                    <p className="text-[#D4AF37] text-sm font-semibold">SUP, psc, G — Bangladesh Army</p>
                  </div>
                  <p className="text-white/90 text-base leading-relaxed mb-4">
                    Three decades of distinguished military service. Combat veteran, UN peacekeeper, and advocate for ethics, veteran welfare, and national integrity.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg text-sm text-white">
                      <Shield className="w-4 h-4 text-[#D4AF37]" />30+ Years
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg text-sm text-white">
                      <Globe className="w-4 h-4 text-[#D4AF37]" />2 UN Missions
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg text-sm text-white">
                      <Award className="w-4 h-4 text-[#D4AF37]" />SUP Awardee
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => window.location.href = '/#/about'}
                      className="group flex items-center gap-2 bg-[#F42A41] hover:bg-[#D91E36] text-white font-bold px-5 py-2.5 rounded-lg shadow-lg transition-all text-sm"
                    >
                      Read Biography
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <button
                      onClick={() => document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex items-center gap-2 border-2 border-[#D4AF37] hover:bg-[#D4AF37]/20 text-[#D4AF37] font-bold px-5 py-2.5 rounded-lg transition-all text-sm"
                    >
                      Vision
                    </button>
                  </div>
              </div>
            </div>

            {/* Right - LARGE Portrait (Colonel prominent) - visible on tablet+ */}
            <div className="hidden md:flex items-end justify-end flex-1 min-h-[300px] lg:min-h-[400px]">
              <div className="w-[280px] sm:w-[320px] lg:w-[420px] xl:w-[520px] 2xl:w-[600px] animate-float">
                <img
                  src="/colonel-jaglul.png"
                  alt="Colonel (Retd.) Md. Jaglul Ahsan"
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom accent - hero gold, softer */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/85 to-transparent z-20"></div>
    </div>
  );
};
