import React from 'react';
import { ChevronRight, Shield, Award, Globe } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-[85vh] overflow-hidden">
      {/* Background - background new pc.png from public folder */}
      <div className="absolute inset-0">
        <img
          src="/background%20new%20pc.png"
          alt=""
          className="w-full h-full object-cover object-center"
          aria-hidden
        />
        {/* Overlay for text readability - patriotic green tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#006A4E]/60 via-[#006A4E]/30 to-transparent"></div>
      </div>

      {/* Top accent - BD Flag colors */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#006A4E] via-[#F42A41] to-[#006A4E] z-20"></div>

      {/* Content - Full height for better layout */}
      <div className="relative z-10 min-h-[70%] px-4 sm:px-6 lg:px-8 pt-6 pb-8">
        <div className="max-w-7xl mx-auto h-full">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 h-full">
            {/* Mobile: Colonel image at top for first-glance visibility */}
            <div className="md:hidden w-48 mx-auto flex-shrink-0">
              <img
                src="/colonel-jaglul.png"
                alt="Colonel (Retd.) Md. Jaglul Ahsan"
                className="w-full h-auto drop-shadow-2xl rounded-lg border-2 border-[#D4AF37]/40"
              />
            </div>

            {/* Left - Text Box with BD/Army Colors */}
            <div className="max-w-md flex-shrink-0">
              <div className="bg-gradient-to-br from-[#006A4E]/95 to-[#004D38]/95 backdrop-blur-md rounded-xl p-5 lg:p-6 border border-[#D4AF37]/30 shadow-xl">

                {/* Vision & Mission - FIRST GLANCE (Colonel's priority) */}
                <p className="text-[#D4AF37] font-bold text-sm sm:text-base tracking-wide uppercase mb-2">
                  A Visionary Leader
                </p>
                <p className="text-white font-semibold text-base sm:text-lg leading-snug mb-5">
                  Leading with Integrity, Inspiring with Vision, Serving with Dedication.
                </p>
                <div className="h-px w-16 bg-[#F42A41] mb-5"></div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 border border-[#D4AF37]/40 rounded-full px-4 py-2 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F42A41] animate-pulse"></div>
                  <span className="text-white font-bold text-xs tracking-wider uppercase">
                    Service • Honor • Nation
                  </span>
                </div>

                {/* Name */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white leading-tight mb-1">
                  Colonel (Retd.)
                </h1>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#D4AF37] leading-tight mb-4">
                  Md. Jaglul Ahsan
                </h1>

                {/* Subtitle */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-0.5 w-10 bg-[#D4AF37]"></div>
                  <p className="text-[#D4AF37] text-sm font-semibold">
                    SUP, psc, G — Bangladesh Army
                  </p>
                </div>

                {/* Description */}
                <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-4">
                  Three decades of distinguished military service. Combat veteran, UN peacekeeper, and advocate for ethics, veteran welfare, and national integrity.
                </p>

                {/* Stats */}
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

                {/* CTAs - BD Flag Red */}
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

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent z-20"></div>
    </div>
  );
};
