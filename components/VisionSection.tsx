import React from 'react';
import { ArrowRight } from 'lucide-react';

// Using high-quality images that match the vision pillars with authoritative context
const VISION_ITEMS = [
  {
    id: 1,
    title: "Fostering Bangladeshi Nationalism",
    // Colonel with raised fist wearing Bangladesh flag - represents national pride
    image: "/image 1.png",
    link: "#"
  },
  {
    id: 2,
    title: "Socio-economic Advancement of the Area",
    // Local image for socio-economic development
    image: "/image 2.png",
    link: "#"
  },
  {
    id: 3,
    title: "Empowering Retired Soldiers",
    // Local image for veterans empowerment
    image: "/image 3.png",
    link: "#"
  },
  {
    id: 4,
    title: "Promoting Leadership Amongst the Next Generation",
    // Local image for youth leadership
    image: "/image 4.png",
    link: "#"
  },
  {
    id: 5,
    title: "Promoting Humanitarian Works",
    // Local image for humanitarian work
    image: "/image 5.png",
    link: "#"
  },
  {
    id: 6,
    title: "Promoting Entrepreneurship & Employment",
    // Local image for entrepreneurship
    image: "/image 6.png",
    link: "#"
  }
];

export const VisionSection: React.FC = () => {
  return (
    <section id="vision" className="py-12 sm:py-16 md:py-24 bg-[#F7FAF8] relative overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-0"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Patriotic BD colors: green + red */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight mb-4 sm:mb-6 relative inline-block">
            <span className="text-[#006A4E]/90">Vision</span>
            <span className="text-[#F42A41]/90 mx-1">&</span>
            <span className="text-[#006A4E]/90">Mission</span>
            {/* Animated accent underline - hero colors, softer */}
            <div className="absolute -bottom-3 left-0 right-0 h-1.5 bg-gradient-to-r from-[#006A4E]/75 via-[#F42A41]/75 to-[#006A4E]/75 rounded-full"></div>
          </h2>

          <p className="max-w-2xl mx-auto text-[#3A4A1C]/90 text-sm sm:text-lg font-medium leading-relaxed px-2">
            Colonel Ahsan's steadfast commitment to national strength, veteran welfare, youth empowerment, and ethical leadership.
          </p>
        </div>

        {/* Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {VISION_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="group relative block h-64 sm:h-80 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-black/30 transition-all duration-500 ease-out transform hover:-translate-y-2 sm:hover:-translate-y-4 active:scale-[0.98] sm:hover:scale-105 cursor-pointer"
            >
              {/* Image - Clear and vibrant, no color overlay */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Bottom gradient ONLY for text readability - no green tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* Content Container with Text Box */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-6 z-20">
                {/* Text Box with backdrop for better readability */}
                <div className="bg-black/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 transform group-hover:bg-black/70 transition-all duration-300">
                  {/* Title - BIGGER and BOLDER */}
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-black text-white leading-tight drop-shadow-lg">
                    {item.title}
                  </h3>

                  {/* CTA Button - Smooth fade in */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 flex items-center pt-3 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-[#F42A41] font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                      See More
                      <ArrowRight size={18} className="transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Border on Hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#F42A41]/60 rounded-2xl transition-all duration-500 pointer-events-none z-30"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};