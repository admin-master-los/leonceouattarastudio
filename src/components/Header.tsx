import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useNavigation } from '../lib/useSupabaseData';

const Header: React.FC = () => {
  const { data: navigation, loading } = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navigation.map((item) => item.id);
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  /**
   * Gère la navigation selon le type de lien
   */
  const handleNavigation = (href: string, isExternal: boolean) => {
    // Lien externe (https://, http://)
    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (isExternal) {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = href;
      }
      setIsMenuOpen(false);
      return;
    }

    // Lien ancre (#section, /#section)
    if (href.startsWith('#')) {
      scrollToSection(href);
      return;
    }

    // Lien relatif avec ancre (/#section)
    if (href.startsWith('/#')) {
      scrollToSection(href.substring(1)); // Enlever le /
      return;
    }

    // Lien relatif (/page)
    if (href.startsWith('/')) {
      window.location.href = href;
      setIsMenuOpen(false);
      return;
    }

    // Fallback: essayer comme ancre
    scrollToSection(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/70 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo - Responsive */}
          <div className="flex-shrink-0 group">
            <button
              onClick={() => scrollToSection('#home')}
              className={`flex items-center gap-2 sm:gap-3 hover:scale-105 transition-all duration-300 ${
                isScrolled ? 'transform scale-90' : ''
              }`}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-lg shadow-lg shadow-cyan-500/25 group-hover:shadow-xl group-hover:shadow-cyan-500/40 transition-all duration-300">
                lOS
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent group-hover:animate-pulse leading-tight">
                  Leonce Ouattara
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-normal leading-tight">
                  Studio
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {!loading && navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.href, item.is_external || false)}
                className={`relative text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/5 ${
                  activeSection === item.id ? 'text-cyan-400' : ''
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </nav>

          {/* CTA Button - Desktop & Mobile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Version Desktop complète (md et plus) */}
            <button
              onClick={() => scrollToSection('#contact')}
              className="hidden md:flex bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 md:px-6 py-2 rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 font-medium items-center gap-2 hover:scale-105 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                <Phone size={16} />
                <span className="hidden lg:inline">Demarrer un projet</span>
                <span className="lg:hidden">Projet</span>
              </span>
            </button>

            {/* Version Mobile compacte (visible uniquement sur mobile/tablet) */}
            <button
              onClick={() => scrollToSection('#contact')}
              className="md:hidden bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 sm:px-4 py-2 rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 font-medium text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 hover:scale-105 relative overflow-hidden group whitespace-nowrap"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <Phone size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Projet</span>
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-300 hover:text-cyan-400 transition-colors duration-300 p-1.5 sm:p-2 rounded-lg hover:bg-white/5"
            >
              {isMenuOpen ? <X size={22} className="sm:w-6 sm:h-6" /> : <Menu size={22} className="sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Responsive */}
      <div
        className={`lg:hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-black/95 backdrop-blur-xl border-b border-cyan-500/10`}
      >
        <nav className="px-3 sm:px-4 py-4 sm:py-6 space-y-2 sm:space-y-4">
          {!loading && navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.href, item.is_external || false)}
              className={`block w-full text-left text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg hover:bg-white/5 text-sm sm:text-base ${
                activeSection === item.id ? 'text-cyan-400 bg-white/5' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
          
          {/* CTA dans le menu mobile */}
          <button
            onClick={() => scrollToSection('#contact')}
            className="w-full mt-3 sm:mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 font-medium text-sm sm:text-base flex items-center justify-center gap-2 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              <Phone size={16} className="sm:w-5 sm:h-5" />
              <span>Planifier un Appel</span>
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
