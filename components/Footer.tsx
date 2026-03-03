import React from 'react';
import { Facebook, Twitter, Youtube, Lock, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#006A4E]/90 via-[#004D38]/90 to-[#1A3A2A]/90 text-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        {/* Top stripe - BD flag colors */}
        <div className="h-1 w-full bg-gradient-to-r from-[#006A4E]/85 via-[#F42A41]/85 to-[#D4AF37]/85 rounded-full mb-8" />

        <div className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start">
          {/* Brand / Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37]/60 bg-white shadow-md">
                <img
                  src="/colonel-jaglul.png"
                  alt="Col. Jaglul Ahsan"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-army-gold/80">
                  Colonel (Retd.) • SUP, psc, G
                </p>
                <h3 className="text-white font-serif font-bold text-lg leading-tight">
                  Md. Jaglul Ahsan
                </h3>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Three decades of service as a Bangladesh Army officer, UN peacekeeper and advocate
              for ethics, veteran welfare and national integrity.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-army-gold hover:text-army-navy hover:-translate-y-0.5 transition-all duration-200"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-army-gold hover:text-army-navy hover:-translate-y-0.5 transition-all duration-200"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-army-gold hover:text-army-navy hover:-translate-y-0.5 transition-all duration-200"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Links & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-sm">
            {/* Navigation */}
            <div>
              <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-gray-400 mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-army-gold transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-army-gold transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/news"
                    className="text-gray-300 hover:text-army-gold transition-colors"
                  >
                    News &amp; Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gallery"
                    className="text-gray-300 hover:text-army-gold transition-colors"
                  >
                    Media Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/comment-policy"
                    className="text-gray-300 hover:text-army-gold transition-colors"
                  >
                    Comment Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Impact Areas */}
            <div>
              <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-gray-400 mb-4">
                Impact Areas
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    to="/impact/humanitarian"
                    className="text-gray-300 hover:text-army-gold transition-colors"
                  >
                    Humanitarian Work
                  </Link>
                </li>
                <li>
                  <Link
                    to="/impact/education"
                    className="text-gray-300 hover:text-army-gold transition-colors"
                  >
                    Education &amp; Youth
                  </Link>
                </li>
                <li>
                  <Link
                    to="/impact/veterans"
                    className="text-gray-300 hover:text-army-gold transition-colors"
                  >
                    Veterans Welfare
                  </Link>
                </li>
              </ul>

              <Link
                to="/admin"
                className="mt-4 inline-flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-300 transition-colors"
              >
                <Lock size={10} /> Staff Login
              </Link>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-semibold tracking-[0.18em] uppercase text-gray-400 mb-4">
                Contact
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 text-army-gold flex-shrink-0" />
                  <p className="text-gray-300">
                    Holding# 557, Road# 09, Avenue# 03<br />
                    Mirpur DOHS, Dhaka-1216<br />
                    Bangladesh
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-army-gold flex-shrink-0" />
                  <a
                    href="tel:+8801407071631"
                    className="text-gray-300 hover:text-army-gold transition-colors"
                  >
                    +880 1407 071 631
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-army-gold flex-shrink-0" />
                  <a
                    href="mailto:jaglul.official@gmail.com"
                    className="text-gray-300 hover:text-army-gold transition-colors"
                  >
                    jaglul.official@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] sm:text-[12px] text-gray-500 text-center md:text-left">
          <p className="break-words">© {currentYear} Colonel (Retd) Md. Jaglul Ahsan. All rights reserved.</p>
          <p className="text-gray-600">
            Designed with discipline &amp; dedication.
          </p>
        </div>
      </div>
    </footer>
  );
};
