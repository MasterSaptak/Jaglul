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
          <div className="md:hidden flex flex-col items-center justify-center flex-1 gap-6 py-4 animate-fade-in overflow-y-auto">
            {/* Portrait */}
            <div className="w-56 sm:w-64 max-w-[60vw] flex-shrink-0 animate-float">
              <img
                src="/colonel-jaglul.png"
                alt="Colonel (Retd.) Md. Jaglul Ahsan"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>

            {/* Text block */}
            <div className="w-full text-center px-4 space-y-5 pb-8">
              <div>
                <h1 className="text-5xl sm:text-6xl font-serif font-black text-[#D4AF37] drop-shadow-[0_4px_4px_rgba(0,0,0,1)] leading-tight">
                  Colonel<br />Md. Jaglul Ahsan
                </h1>
                <p className="text-[#D4AF37] text-xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,1)] mt-2">
                  SUP, psc, G (Retd)
                </p>
              </div>

              <div className="pt-3">
                <h2 className="text-3xl sm:text-4xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,1)] tracking-wide mb-3">
                  A Visionary Leader
                </h2>
                <p className="text-white text-base sm:text-lg font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,1)] leading-relaxed">
                  Leading with Integrity, Inspiring with Vision,<br />Serving with Dedication.
                </p>
              </div>
            </div>
          </div>

          {/* ── DESKTOP layout (≥ md) ── */}
          <div className="hidden md:flex flex-row items-center justify-between gap-6 lg:gap-10 flex-1 min-h-0 pl-4 lg:pl-12">

            {/* Left — Text block */}
            <div className="w-full max-w-[550px] lg:max-w-[650px] flex-shrink-0">
              <div className="space-y-8">
                <div>
                  <h1 className="text-6xl lg:text-7xl xl:text-8xl font-serif font-black text-[#D4AF37] leading-[1.1] drop-shadow-[0_8px_8px_rgba(0,0,0,1)]">
                    Colonel<br />Md. Jaglul Ahsan
                  </h1>
                  <p className="text-[#D4AF37] text-2xl lg:text-3xl font-bold mt-4 drop-shadow-[0_4px_4px_rgba(0,0,0,1)]">
                    SUP, psc, G (Retd)
                  </p>
                </div>

                <div className="pt-6">
                  <h2 className="text-4xl lg:text-5xl font-black text-white tracking-wide drop-shadow-[0_6px_6px_rgba(0,0,0,1)] mb-5">
                    A Visionary Leader
                  </h2>
                  <p className="text-white text-xl lg:text-2xl font-bold leading-relaxed drop-shadow-[0_4px_4px_rgba(0,0,0,1)] max-w-lg">
                    Leading with Integrity, Inspiring with Vision,<br />Serving with Dedication.
                  </p>
                </div>
              </div>
            </div>

            {/* Right — Portrait */}
            <div className="flex-1 flex items-center justify-center lg:justify-end min-w-0 overflow-hidden pr-4 lg:pr-12">
              <img
                src="/colonel-jaglul.png"
                alt="Colonel (Retd.) Md. Jaglul Ahsan"
                className="w-auto max-w-[320px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] 2xl:max-w-[700px] max-h-[calc(100vh-8rem)] object-contain drop-shadow-2xl animate-float"
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
