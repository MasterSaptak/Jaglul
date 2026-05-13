import React from 'react';
import { Link } from 'react-router-dom';

export const LifeSketch: React.FC = () => {
  return (
    <section className="py-24 bg-army-cream/30 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/50 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="reveal active">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-army-red mb-1">
              Md Jaglul Ahsan,
            </h2>
            <h3 className="text-2xl font-serif font-bold text-army-navy mb-8">
              SUP, psc, G (Retd)
            </h3>

            <p className="text-sm font-bold text-army-navy/60 uppercase tracking-widest mb-6">
              LIFE SKETCH OF COL MD JAGLUL AHSAN, SUP, psc, G
            </p>

            <div className="mb-8 pl-6 border-l-4 border-army-navy/20">
              <blockquote className="text-2xl md:text-3xl font-serif font-bold text-army-navy leading-tight italic">
                "You may write me down in history<br />
                With your bitter, twisted lies,<br />
                You may trod me in the very dirt<br />
                But still, like dust, I'll rise."
              </blockquote>
              <cite className="block mt-4 text-xl font-bold text-army-navy">
                -Maya Angelo
              </cite>
            </div>

            <div className="space-y-6 text-army-navy/80 leading-relaxed text-lg">
              <p>
                1. If life is a stream of fall and rise as Maya Angelo says then the life of Col (retd) Jaglul is a flow with unprecedented frequency of pitch, roll and turbulence. However, most life do not flow the way we think it should have flown. Few undergoes adventures, few takes challenges, few compromises and only few takes a path of uncompromising stand to make the life challenging, eventful and dynamic. Col (retd) Jaglul took the later course echoing with Robert Frost;
              </p>
            </div>

            <div className="mt-8 mb-10 pl-6">
              <blockquote className="text-2xl md:text-3xl font-serif font-bold text-army-navy italic">
                "Two roads diverged in a yellow wood,<br />
                And I took the one less travelled by"
              </blockquote>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
            >
              Read More
            </Link>
          </div>

          {/* Right Image with Diamond Frames */}
          <div className="relative flex justify-center items-center py-20">
            {/* Background Decorative Diamonds */}
            <div className="absolute w-[400px] h-[400px] bg-orange-500/20 rotate-45 rounded-3xl -translate-x-10 translate-y-10"></div>
            <div className="absolute w-[400px] h-[400px] bg-army-red/10 rotate-45 rounded-3xl translate-x-10 -translate-y-10 border-4 border-army-red/20"></div>
            
            {/* Main Image Diamond */}
            <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] rotate-45 overflow-hidden rounded-[60px] border-[12px] border-white shadow-2xl z-10">
              <div className="-rotate-45 w-[142%] h-[142%] absolute top-[-21%] left-[-21%]">
                <img
                  src="/colonel-jaglul.png"
                  alt="Colonel Md Jaglul Ahsan"
                  className="w-full h-full object-cover object-top scale-110"
                />
              </div>
            </div>

            {/* Accent Diamonds */}
            <div className="absolute w-20 h-20 bg-army-gold rotate-45 rounded-lg -bottom-10 -right-5 z-20"></div>
            <div className="absolute w-12 h-12 bg-army-red rotate-45 rounded-md top-10 -left-10 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
