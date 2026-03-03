import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Heart, GraduationCap, Shield, Medal, Scale, Image } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const impactLinks = [
  { name: 'Humanitarian Work', path: '/impact/humanitarian', icon: <Heart size={16} /> },
  { name: 'Education & Youth', path: '/impact/education', icon: <GraduationCap size={16} /> },
  { name: 'National Security', path: '/impact/security', icon: <Shield size={16} /> },
  { name: 'Veterans Welfare', path: '/impact/veterans', icon: <Medal size={16} /> },
  { name: 'Civic Action', path: '/impact/civic', icon: <Scale size={16} /> },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [impactDropdown, setImpactDropdown] = useState(false);
  const [mobileImpactOpen, setMobileImpactOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isAdmin, logout } = useAuth();
  const location = useLocation();

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setImpactDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'News & Events', path: '/news' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.replace('/#', '/'));
  };

  const isImpactActive = () => {
    return location.pathname.startsWith('/impact');
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
      ? 'bg-[#F42A41]/98 backdrop-blur-md shadow-lg border-b border-[#D91E36]'
      : 'bg-[#F42A41] shadow-md border-b border-[#D91E36]'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              {/* Portrait with BD Flag colors */}
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/80 shadow-md group-hover:border-[#D4AF37] group-hover:scale-110 transition-all duration-300 relative bg-white">
                <img
                  src="/colonel-jaglul.png"
                  alt="Col. Jaglul Ahsan"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-black text-xl text-white leading-none tracking-wide" style={{ fontFamily: 'Playfair Display, Georgia, serif', letterSpacing: '0.05em' }}>
                  JAGLUL AHSAN
                </span>
                <span className="text-xs font-medium text-white/80 tracking-wide mt-0.5">
                  Colonel (Retd.) • SUP, psc, G
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${isActive(link.path)
                  ? 'text-white bg-white/20'
                  : 'text-white/90 hover:text-white hover:bg-white/15'
                  }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Impact Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setImpactDropdown(!impactDropdown)}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-1 ${isImpactActive()
                  ? 'text-white bg-white/20'
                  : 'text-white/90 hover:text-white hover:bg-white/15'
                  }`}
              >
                Impact
                <ChevronDown size={16} className={`transition-transform duration-200 ${impactDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {impactDropdown && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#F42A41]/30 py-2 animate-fade-in">
                  {impactLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setImpactDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[#006A4E] hover:bg-[#006A4E]/10 transition-colors"
                    >
                      <span className="text-[#F42A41]">{link.icon}</span>
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Gallery Link */}
            <Link
              to="/gallery"
              className={`px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-1.5 ${location.pathname === '/gallery'
                ? 'text-white bg-white/20'
                : 'text-white/90 hover:text-white hover:bg-white/15'
                }`}
            >
              <Image size={16} />
              Gallery
            </Link>

            {/* Contact Link */}
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${location.pathname === '/contact'
                ? 'text-white bg-white/20'
                : 'text-white/90 hover:text-white hover:bg-white/15'
                }`}
            >
              Contact
            </Link>

            {/* Join Me CTA - BD Red with Animation */}
            <Link
              to="/contact"
              className="ml-4 relative bg-white text-[#F42A41] px-6 py-2.5 rounded-md font-bold hover:bg-[#D4AF37] hover:text-[#006A4E] hover:-translate-y-1 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md btn-military overflow-hidden group"
            >
              <span className="relative z-10">Join Me</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </Link>

            {isAdmin && (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/30">
                <span className="text-xs font-bold text-white bg-white/20 px-2 py-1 rounded">ADMIN</span>
                <button onClick={logout} className="text-sm text-white/80 hover:text-white transition-colors">Logout</button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/20 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className="bg-[#D91E36] border-t border-white/20 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-md font-medium transition-colors ${isActive(link.path)
                ? 'text-white bg-white/20'
                : 'text-white/90 hover:text-white hover:bg-white/15'
                }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Impact Dropdown */}
          <div className="border-t border-white/20 pt-2 mt-2">
            <button
              onClick={() => setMobileImpactOpen(!mobileImpactOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-md font-medium text-white/90"
            >
              <span>Impact Focus Areas</span>
              <ChevronDown size={16} className={`transition-transform duration-200 ${mobileImpactOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileImpactOpen && (
              <div className="pl-4 space-y-1 mt-1">
                {impactLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => { setIsOpen(false); setMobileImpactOpen(false); }}
                    className="flex items-center gap-3 px-4 py-2.5 text-white/90 hover:text-white hover:bg-white/15 rounded-md transition-colors"
                  >
                    <span className="text-white/70">{link.icon}</span>
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Gallery Link */}
          <Link
            to="/gallery"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-4 py-3 rounded-md font-medium text-white/90 hover:text-white hover:bg-white/15 transition-colors"
          >
            <Image size={16} />
            Media Gallery
          </Link>

          {/* Contact Link */}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 rounded-md font-medium text-white/90 hover:text-white hover:bg-white/15 transition-colors"
          >
            Contact
          </Link>

          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center mt-4 relative bg-white text-[#F42A41] px-5 py-3 rounded-md font-bold hover:bg-[#D4AF37] hover:text-[#006A4E] hover:scale-[1.02] hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            <span className="relative z-10">Join Me</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
