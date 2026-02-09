import React from 'react';
import { ChevronRight, Shield, Award, Globe } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-[85vh] overflow-hidden">
      {/* Background Image - Army with Motto */}
      <div className="absolute inset-0">
        <img
          src="/hero-army-motto-mobile.png"
          alt="Bangladesh Army motto background"
          className="w-full h-full object-cover block lg:hidden"
        />
        <img
          src="/hero-army-motto.png"
          alt="Bangladesh Army motto background"
          className="w-full h-full object-cover hidden lg:block"
        />
        {/* Very light overlay on left for text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"></div>
      </div>

      {/* Top accent - BD Flag colors */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#006A4E] via-[#F42A41] to-[#006A4E] z-20"></div>

      {/* Content - TOP HALF ONLY */}
      <div className="relative z-10 h-[55%] px-4 sm:px-6 lg:px-8 pt-4">
        <div className="max-w-7xl mx-auto h-full">
          <div className="flex items-start justify-between gap-6 h-full">

            {/* Left - Text Box with BD/Army Colors */}
            <div className="max-w-md flex-shrink-0">
              <div className="bg-gradient-to-br from-[#006A4E]/95 to-[#004D38]/95 backdrop-blur-md rounded-xl p-5 lg:p-6 border border-[#D4AF37]/30 shadow-xl">

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

            {/* Right - BIG Portrait */}
            <div className="hidden lg:flex items-start justify-end flex-1">
              <div className="w-[380px] xl:w-[450px] 2xl:w-[500px] animate-float">
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
