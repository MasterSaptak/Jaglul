import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Feed', path: '/feed' },
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    setIsOpen(false);
    navigate('/admin/login', { replace: true });
    void logout().then(({ error }) => {
      if (error) console.error('Logout error:', error);
    });
  };

  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setIsOpen(false);

    if (window.location.pathname === '/') {
      event.preventDefault();
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
      ? 'bg-[#004B35]/98 backdrop-blur-md shadow-xl border-b-2 border-[#DA291C] py-0.5'
      : 'bg-[#006A4E] shadow-lg border-b-2 border-[#DA291C] py-1'
      }`}>
      <div className="w-full px-4 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-18 sm:h-20" style={{ height: '72px' }}>
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-army-gold/30 shadow-inner group-hover:border-army-gold transition-all duration-300 bg-white" style={{ width: '52px', height: '52px', flexShrink: 0 }}>
                <img
                  src="/colonel-jaglul.png"
                  alt="Col. Jaglul Ahsan"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-2xl text-white leading-none tracking-wider">
                  JAGLUL AHSAN
                </span>
                <span className="text-xs font-bold text-army-gold/80 uppercase tracking-widest mt-1 hidden sm:block">
                  Colonel (Retd.) - Official
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-end flex-grow">
            <div className="flex items-center gap-1 lg:gap-2 mr-6 lg:mr-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-6 py-3 text-sm font-black uppercase tracking-widest transition-all duration-200 rounded-md
                    ${isActive(link.path)
                      ? 'text-army-gold'
                      : 'text-white hover:bg-[#DA291C] hover:text-white'
                    }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-1 left-6 right-6 h-0.5 bg-army-gold rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {isAdmin ? (
                <div className="flex items-center gap-2 pl-4 border-l border-white/10 ml-2">
                  <Link
                    to="/admin/studio"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-army-gold text-army-navy text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-sm"
                  >
                    Studio
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-[10px] font-bold text-white/50 hover:text-army-red transition-colors uppercase tracking-widest px-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <a
                  href="/#contact"
                  onClick={handleContactClick}
                  className="bg-army-gold text-army-navy px-7 py-3 rounded-md font-black text-sm uppercase tracking-widest hover:bg-[#DA291C] hover:text-white hover:border-[#DA291C] transition-all active:scale-95 border border-army-gold/50"
                >
                  Join Me
                </a>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-army-green border-t border-white/10 px-4 py-6 space-y-2 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-bold transition-all ${isActive(link.path)
                ? 'text-army-gold bg-white/10 shadow-inner'
                : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 mt-4 border-t border-white/10">
            {isAdmin ? (
              <div className="space-y-3">
                <Link
                  to="/admin/studio"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-army-gold text-army-navy font-black uppercase tracking-widest shadow-lg"
                >
                  Go to Studio
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl border border-white/15 text-white/70 font-bold uppercase tracking-widest"
                >
                  Logout
                </button>
              </div>
            ) : (
              <a
                href="/#contact"
                onClick={handleContactClick}
                className="flex items-center justify-center w-full py-4 rounded-xl bg-army-gold text-army-navy font-black uppercase tracking-widest shadow-lg"
              >
                Join Me
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
