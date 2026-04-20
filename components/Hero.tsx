import React from 'react';
import { ChevronRight, Shield, Award, Globe } from 'lucide-react';

// Navbar is h-16 (64px / 4rem) on mobile, h-20 (80px / 5rem) on sm+
// Hero fills exactly the remaining viewport height below the navbar

export const Hero: React.FC = () => {
  return (
    <div className="relative h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] min-h-[580px] overflow-hidden flex flex-col">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/background%20new%20pc.png"
          alt=""
          className="w-full h-full object-cover object-center"
          aria-hidden
        />
        {/* Mobile gradient: heavy bottom fade */}
        <div className="absolute inset-0 md:hidden bg-gradient-to-b from-[#006A4E]/55 via-[#1A3A2A]/65 to-[#0a1f15]/95" />
        {/* Desktop gradient: left-side fade only */}
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#006A4E]/65 via-[#006A4E]/30 to-transparent" />
      </div>

      {/* Top accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#006A4E]/90 via-[#F42A41]/90 to-[#006A4E]/90 z-20" />

      {/* ── Content fills remaining height ── */}
      <div className="relative z-10 flex-1 flex flex-col px-4 sm:px-6 lg:px-8 py-4 sm:py-6 min-h-0">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col min-h-0">

          {/* ── MOBILE layout (< md) ── */}
          <div className="md:hidden flex flex-col items-center justify-center flex-1 gap-3 py-2 animate-fade-in overflow-y-auto">
            {/* Portrait */}
            <div className="w-44 sm:w-56 max-w-[55vw] flex-shrink-0 animate-float">
              <img
                src="/colonel-jaglul.png"
                alt="Colonel (Retd.) Md. Jaglul Ahsan"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>

            {/* Text card */}
            <div className="w-full max-w-sm sm:max-w-md bg-[#0a1f15]/80 backdrop-blur-lg rounded-2xl border border-[#D4AF37]/20 p-4 sm:p-5 space-y-3">
              <div className="text-center">
                <p className="text-[#D4AF37] font-bold text-[10px] sm:text-xs tracking-[0.15em] uppercase mb-1.5">
                  A Visionary Leader
                </p>
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-white leading-tight">
                  Colonel (Retd.)<br />Md. Jaglul Ahsan
                </h1>
                <div className="flex items-center justify-center gap-2 mt-1.5">
                  <div className="h-px w-6 bg-[#D4AF37]/60" />
                  <p className="text-[#D4AF37] text-[10px] sm:text-xs font-semibold tracking-wide">
                    SUP, psc, G — Bangladesh Army
                  </p>
                  <div className="h-px w-6 bg-[#D4AF37]/60" />
                </div>
              </div>

              <p className="text-white/90 font-medium text-xs sm:text-sm text-center leading-relaxed">
                Leading with Integrity, Inspiring with Vision, Serving with Dedication.
              </p>

              <div className="bg-white/5 border-l-2 border-[#D4AF37]/60 rounded-r-lg px-3 py-2">
                <p className="text-white/70 text-[11px] italic leading-relaxed">
                  "You may write me down in history… But still, like dust, I'll rise."
                </p>
                <p className="text-[#D4AF37]/70 text-[10px] mt-1">— Maya Angelou</p>
              </div>

              <div className="flex flex-wrap justify-center gap-1.5">
                {[
                  { icon: <Shield className="w-3 h-3 text-[#D4AF37]" />, label: '30+ Years' },
                  { icon: <Globe className="w-3 h-3 text-[#D4AF37]" />, label: '2 UN Missions' },
                  { icon: <Award className="w-3 h-3 text-[#D4AF37]" />, label: 'SUP Awardee' },
                ].map(({ icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-1 text-white text-[11px] px-2.5 py-1 rounded-full border border-white/15 bg-white/10">
                    {icon}{label}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-0.5">
                <button
                  onClick={() => (window.location.href = '/#/about')}
                  className="w-full flex items-center justify-center gap-2 bg-[#F42A41] hover:bg-[#D91E36] text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-red-900/30 transition-colors"
                >
                  Read Biography <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full flex items-center justify-center border-2 border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 font-bold py-2.5 rounded-xl text-sm transition-colors"
                >
                  View Vision & Mission
                </button>
              </div>
            </div>
          </div>

          {/* ── DESKTOP layout (≥ md) ── */}
          <div className="hidden md:flex flex-row items-center justify-between gap-6 lg:gap-10 flex-1 min-h-0">

            {/* Left — Text card */}
            <div className="w-full max-w-[400px] lg:max-w-[440px] xl:max-w-[480px] flex-shrink-0">
              <div className="bg-gradient-to-br from-[#006A4E]/90 to-[#004D38]/90 backdrop-blur-md rounded-2xl p-5 lg:p-6 border border-[#D4AF37]/25 shadow-xl">
                <p className="text-[#D4AF37] font-bold text-xs lg:text-sm tracking-wide uppercase mb-2">
                  A Visionary Leader
                </p>
                <p className="text-white font-semibold text-sm lg:text-base leading-snug mb-3">
                  Leading with Integrity, Inspiring with Vision, Serving with Dedication.
                </p>
                <div className="h-px w-16 bg-[#F42A41] mb-3" />
                <div className="inline-flex items-center gap-2 bg-white/10 border border-[#D4AF37]/40 rounded-full px-4 py-1.5 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#F42A41] animate-pulse" />
                  <span className="text-white font-bold text-xs tracking-wider uppercase">
                    Service • Honor • Nation
                  </span>
                </div>

                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-black text-white leading-tight mb-1">
                  Colonel (Retd.)
                </h1>
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-black text-[#D4AF37] leading-tight mb-3">
                  Md. Jaglul Ahsan
                </h1>

                <div className="flex items-center gap-3 mb-3">
                  <div className="h-0.5 w-10 bg-[#D4AF37]" />
                  <p className="text-[#D4AF37] text-xs lg:text-sm font-semibold">
                    SUP, psc, G — Bangladesh Army
                  </p>
                </div>

                <p className="text-white/90 text-xs lg:text-sm leading-relaxed mb-3">
                  Three decades of distinguished military service. Combat veteran, UN peacekeeper,
                  and advocate for ethics, veteran welfare, and national integrity.
                </p>

                <div className="bg-white/5 border-l-2 border-[#D4AF37]/60 rounded-r-lg px-3 py-2 mb-3">
                  <p className="text-white/70 text-xs italic leading-relaxed">
                    "You may write me down in history… But still, like dust, I'll rise."
                  </p>
                  <p className="text-[#D4AF37]/70 text-[10px] mt-1">— Maya Angelou</p>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {[
                    { icon: <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />, label: '30+ Years' },
                    { icon: <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />, label: '2 UN Missions' },
                    { icon: <Award className="w-3.5 h-3.5 text-[#D4AF37]" />, label: 'SUP Awardee' },
                  ].map(({ icon, label }) => (
                    <span key={label} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1.5 rounded-lg text-xs lg:text-sm text-white">
                      {icon}{label}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 lg:gap-3">
                  <button
                    onClick={() => (window.location.href = '/#/about')}
                    className="group flex items-center gap-2 bg-[#F42A41] hover:bg-[#D91E36] text-white font-bold px-4 lg:px-5 py-2.5 rounded-lg shadow-lg transition-all text-xs lg:text-sm"
                  >
                    Read Biography
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <button
                    onClick={() => document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 border-2 border-[#D4AF37] hover:bg-[#D4AF37]/20 text-[#D4AF37] font-bold px-4 lg:px-5 py-2.5 rounded-lg transition-all text-xs lg:text-sm"
                  >
                    Vision
                  </button>
                </div>
              </div>
            </div>

            {/* Right — Portrait, constrained by both width and viewport height */}
            <div className="flex-1 flex items-center justify-center lg:justify-end min-w-0 overflow-hidden">
              <img
                src="/colonel-jaglul.png"
                alt="Colonel (Retd.) Md. Jaglul Ahsan"
                className="w-auto max-w-[300px] md:max-w-[360px] lg:max-w-[440px] xl:max-w-[540px] 2xl:max-w-[640px] max-h-[calc(100vh-9rem)] object-contain drop-shadow-2xl animate-float"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/85 to-transparent z-20" />
    </div>
  );
};
