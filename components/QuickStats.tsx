import React from 'react';
import { Shield, Globe, Award, BookOpen, Crosshair, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuickStats: React.FC = () => {
  const stats = [
    {
      icon: <Shield className="w-6 h-6" />,
      value: "30+",
      label: "Years of Service",
      sublabel: "Bangladesh Army",
      color: "from-[#006A4E] to-[#004D38]",
      bgColor: "bg-[#006A4E]",
      lightBg: "bg-[#006A4E]/10",
      textColor: "text-[#006A4E]",
      borderColor: "border-[#006A4E]/30"
    },
    {
      icon: <Crosshair className="w-6 h-6" />,
      value: "1990",
      label: "Commissioned",
      sublabel: "Artillery Regiment",
      color: "from-[#F42A41] to-[#D91E36]",
      bgColor: "bg-[#F42A41]",
      lightBg: "bg-[#F42A41]/10",
      textColor: "text-[#F42A41]",
      borderColor: "border-[#F42A41]/30"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      value: "2",
      label: "UN Missions",
      sublabel: "Sierra Leone & Mali",
      color: "from-[#006A4E] to-[#004D38]",
      bgColor: "bg-[#006A4E]",
      lightBg: "bg-[#006A4E]/10",
      textColor: "text-[#006A4E]",
      borderColor: "border-[#006A4E]/30"
    },
    {
      icon: <Award className="w-6 h-6" />,
      value: "SUP",
      label: "Sena Utkarsh Padak",
      sublabel: "Awarded 2019",
      color: "from-[#D4AF37] to-[#B8960B]",
      bgColor: "bg-[#D4AF37]",
      lightBg: "bg-[#D4AF37]/10",
      textColor: "text-[#B8960B]",
      borderColor: "border-[#D4AF37]/30"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      value: "PhD",
      label: "In Progress",
      sublabel: "Lifelong Learner",
      color: "from-[#006A4E] to-[#004D38]",
      bgColor: "bg-[#006A4E]",
      lightBg: "bg-[#006A4E]/10",
      textColor: "text-[#006A4E]",
      borderColor: "border-[#006A4E]/30"
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: "Active",
      label: "Veterans Advisor",
      sublabel: "Welfare Advocate",
      color: "from-[#F42A41] to-[#D91E36]",
      bgColor: "bg-[#F42A41]",
      lightBg: "bg-[#F42A41]/10",
      textColor: "text-[#F42A41]",
      borderColor: "border-[#F42A41]/30"
    }
  ];

  return (
    <section className="py-10 sm:py-16 relative overflow-hidden">
      {/* Patriotic BD colors - hero vibe, softer opacity */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#006A4E]/90 via-[#004D38]/90 to-[#1A3A2A]/90"></div>

      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Floating Orbs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-army-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F42A41]/90 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4 shadow-lg">
            <Award className="w-4 h-4" />
            Distinguished Service Record
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-2 sm:mb-3">
            At A Glance
          </h2>
          <p className="text-blue-100/80 max-w-2xl mx-auto text-sm sm:text-base px-2">
            A distinguished career marked by service, sacrifice, and unwavering commitment to ethics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Colored Top Accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`}></div>

              {/* Hover Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-10 h-10 sm:w-14 sm:h-14 ${stat.lightBg} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300`}>
                  <span className={`${stat.textColor} group-hover:text-white transition-colors duration-300`}>
                    {stat.icon}
                  </span>
                </div>

                {/* Value */}
                <p className={`text-xl sm:text-3xl font-bold ${stat.textColor} group-hover:text-white transition-colors duration-300 mb-0.5 sm:mb-1`}>
                  {stat.value}
                </p>

                {/* Label */}
                <p className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-white/90 transition-colors duration-300">
                  {stat.label}
                </p>

                {/* Sublabel */}
                <p className={`text-xs ${stat.textColor} opacity-70 group-hover:text-white/70 transition-colors duration-300 mt-0.5`}>
                  {stat.sublabel}
                </p>
              </div>

              {/* Decorative Corner */}
              <div className={`absolute -bottom-4 -right-4 w-16 h-16 ${stat.bgColor} opacity-10 rounded-full group-hover:scale-150 group-hover:opacity-20 transition-all duration-500`}></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 bg-[#F42A41]/90 text-white font-semibold px-6 py-3 rounded-full hover:bg-[#D91E36]/90 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            Read Full Biography
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
