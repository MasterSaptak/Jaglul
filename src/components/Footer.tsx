import React from 'react';
import { Facebook, Twitter, Youtube, MapPin, Phone, Mail, ArrowUp, Lock, ExternalLink, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#002B1B] text-white border-t-4 border-[#DA291C] overflow-hidden">
      {/* Decorative Accent Stripe */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006A4E] via-[#DA291C] to-[#D4AF37] opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          
          {/* Column 1: Identity */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37]/40 p-0.5 bg-white shadow-xl">
                <img src="/colonel-jaglul.png" alt="Logo" className="w-full h-full object-cover object-top rounded-full" />
              </div>
              <div>
                <p className="font-serif font-black text-xl leading-tight">Md. Jaglul Ahsan</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Colonel (Retd.) • SUP, psc, G</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              A legacy of service, leadership, and unwavering dedication to the nation and its veterans.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#DA291C] hover:-translate-y-1 transition-all duration-300"><Facebook size={18} /></a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#25D366] hover:-translate-y-1 transition-all duration-300"><MessageCircle size={18} /></a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#FF0000] hover:-translate-y-1 transition-all duration-300"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-5">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#D4AF37] border-l-2 border-[#DA291C] pl-3">Explore</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Feed', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                    className="text-sm text-gray-300 hover:text-white hover:pl-2 transition-all flex items-center gap-2 group"
                  >
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-5">
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#D4AF37] border-l-2 border-[#DA291C] pl-3">Contact</h4>
            <div className="space-y-4">
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Road+12+Avenue+02+House+Number+893+Mirpur+DOHS+Pallabi+Dhaka"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group text-sm text-gray-300 hover:text-white transition-colors"
              >
                <MapPin size={18} className="text-[#D4AF37] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                <p className="leading-snug">
                  Road: 12, Avenue: 02, House Number: 893, Mirpur DOHS, Pallabi, Dhaka
                </p>
              </a>
              <a href="tel:+8801407071631" className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors group">
                <Phone size={18} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
                +880 1407 071 631
              </a>
              <a href="mailto:jaglul.official@gmail.com" className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors group">
                <Mail size={18} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
                jaglul.official@gmail.com
              </a>
            </div>
          </div>

          {/* Column 4: Motto & Admin */}
          <div className="space-y-6 lg:text-right">
             <div className="bg-white/5 p-4 rounded-xl border border-white/10 relative group overflow-hidden">
                <div className="absolute inset-0 bg-[#DA291C]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <p className="text-[#DA291C] font-black italic text-base leading-tight relative z-10">
                  "A MISFIT TO THIS WORLD STRUGGLING TO SETTLE HIS DESTINY"
                </p>
             </div>
             
             <div className="flex lg:justify-end gap-3">
                <Link 
                  to="/admin" 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                >
                  <Lock size={12} /> Admin Portal
                </Link>
                <button 
                  onClick={scrollToTop}
                  className="w-10 h-10 rounded-lg bg-[#D4AF37] text-[#002B1B] flex items-center justify-center hover:scale-110 transition-all shadow-lg shadow-[#D4AF37]/20"
                >
                  <ArrowUp size={20} />
                </button>
             </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
          <p>© {currentYear} Colonel (Retd) Md. Jaglul Ahsan. All Rights Reserved.</p>
          <p className="flex items-center gap-2">
            Developed with Discipline by <span className="text-[#D4AF37]">Saptech</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
