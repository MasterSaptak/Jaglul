import React from 'react';
import { Shield, Globe, Award, BookOpen, Crosshair, Users, Heart, GraduationCap, Building2, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuickStats: React.FC = () => {
  const primaryStats = [
    {
      icon: <Shield className="w-5 h-5" />,
      value: "30+",
      label: "Years of Service",
      sublabel: "Bangladesh Army",
      textColor: "text-[#006A4E]",
    },
    {
      icon: <Crosshair className="w-5 h-5" />,
      value: "1990",
      label: "Commissioned",
      sublabel: "Artillery Regiment",
      textColor: "text-[#F42A41]",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      value: "2",
      label: "UN Missions",
      sublabel: "Sierra Leone & Mali",
      textColor: "text-[#006A4E]",
    },
    {
      icon: <Award className="w-5 h-5" />,
      value: "SUP",
      label: "Sena Utkarsh Padak",
      sublabel: "Awarded 2019",
      textColor: "text-[#006A4E]",
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      value: "PhD",
      label: "In Progress",
      sublabel: "Lifelong Learner",
      textColor: "text-[#006A4E]",
    },
    {
      icon: <Users className="w-5 h-5" />,
      value: "Active",
      label: "Veterans Advisor",
      sublabel: "Welfare Advocate",
      textColor: "text-[#F42A41]",
    }
  ];

  const impactStats = [
    {
      icon: <Award className="w-5 h-5" />,
      value: "5",
      label: "Awards & Recognitions",
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      value: "8",
      label: "Development Initiatives",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      value: "20+",
      label: "Social Welfare Programs",
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      value: "1,000+",
      label: "Young Leaders Trained",
    }
  ];

  return (
    <section className="py-8 sm:py-10 relative overflow-hidden bg-[#f6fbf8]">
      <div className="w-full px-3 sm:px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#006A4E] via-[#00513d] to-[#013324] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 shadow-2xl shadow-[#006A4E]/20">
          <div className="absolute -left-16 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full bg-[#F42A41]/90 blur-[1px]"></div>
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-15" style={{
            backgroundImage: `radial-gradient(circle at 18px 18px, rgba(255,255,255,0.55) 2px, transparent 2.5px)`,
            backgroundSize: '36px 36px'
          }}></div>
          <div className="absolute inset-x-0 top-0 h-1 bg-[#F42A41]"></div>

          <div className="relative z-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-5">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">At A Glance</h2>
                <div className="mt-2 h-1 w-16 rounded-full bg-[#F42A41]"></div>
              </div>
              <Link
                to="/about"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#004D38] shadow-lg shadow-black/10 transition-all duration-300 hover:bg-[#F42A41] hover:text-white group"
              >
                Read Full Biography
                <TrendingUp size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {primaryStats.map((stat, index) => (
                <div key={index} className="group rounded-lg border border-white/15 bg-white/95 p-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg">
                  <div className={`mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#006A4E]/8 ${stat.textColor} ring-1 ring-[#006A4E]/10 transition-transform group-hover:scale-110`}>
                    {React.cloneElement(stat.icon, { className: "w-4 h-4" })}
                  </div>
                  <p className={`text-xl md:text-2xl font-black ${stat.textColor} leading-none`}>{stat.value}</p>
                  <p className="mt-1 text-[10px] font-black text-gray-900 uppercase leading-tight">{stat.label}</p>
                  <p className="mt-0.5 text-[10px] text-gray-500 font-semibold leading-tight">{stat.sublabel}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 overflow-hidden rounded-xl border border-white/15 bg-[#003d2e]/75 backdrop-blur">
              {impactStats.map((stat, index) => (
                <div key={index} className="group flex items-center gap-3 border-white/10 p-3 text-left odd:border-r lg:border-r lg:last:border-r-0">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#F42A41] text-white shadow-md shadow-[#F42A41]/20 transition-transform duration-300 group-hover:scale-105">
                    {React.cloneElement(stat.icon, { className: "w-4 h-4" })}
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif text-2xl font-bold leading-none text-white">{stat.value}</p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase leading-tight text-white/75">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
