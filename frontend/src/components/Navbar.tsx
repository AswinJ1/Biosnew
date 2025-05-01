
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, Terminal, Shield } from 'lucide-react';
import { useSound } from '@/utils/useSound';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  // Preload and cache sounds for performance
const sounds = {
  click: new Audio('/sounds/mouse_click.mp3'),
  hover: new Audio('/sounds/mouse_over.mp3'),
};

const playSound = (type: 'click' | 'hover') => {
  if (sounds[type]) {
    sounds[type].currentTime = 0; // Reset sound to start
    sounds[type].play().catch(error => console.error("Audio playback error:", error));
  }
};


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    {  name: 'TEAM', path: '/teammembers' },
    
  ];

  const handleMenuToggle = () => {
    playSound('click');
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = () => {
    playSound('click');
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled ? 'py-2 glass border-white/10' : 'py-4 bg-black/70 backdrop-blur-sm border-white/5'
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-white font-mono"
          onClick={handleNavClick}
          onMouseEnter={() => playSound('hover')}
        >
          <span className="text-lg tracking-wider"><img src="/bios-logo.png" alt="" className='h-12' /></span>
          <span className="text-xs text-white/50 mt-1">[v2.0.7]</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'text-xs font-mono tracking-wider transition-colors',
                location.pathname === item.path 
                  ? 'text-white' 
                  : 'text-white/60 hover:text-white'
              )}
              onClick={handleNavClick}
              onMouseEnter={() => playSound('hover')}
            >
              {item.name}
            </Link>
          ))}
          <a 
            href="https://ctftime.org/team/662" 
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex h-8 items-center justify-center px-4 font-mono text-xs tracking-wider text-black bg-white hover:bg-white/90 transition-colors"
            onClick={handleNavClick}
            onMouseEnter={() => playSound('hover')}
          >
            <Terminal className="mr-2 h-3 w-3" />
            CTF_TEAM
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={handleMenuToggle}
          className="md:hidden flex items-center p-2 text-white"
          aria-label="Toggle menu"
          onMouseEnter={() => playSound('hover')}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-white/10 animate-fade-down">
          <div className="container px-4 py-3 mx-auto space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'block py-2 text-xs font-mono tracking-wider transition-colors',
                  location.pathname === item.path
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                )}
                onClick={handleNavClick}
                onMouseEnter={() => playSound('hover')}
              >
                {'>'} {item.name}
              </Link>
            ))}
            <a 
              href="https://ctftime.org/team/662" 
              target="_blank" 
              rel="noreferrer" 
              className="block w-full py-2 text-xs font-mono tracking-wider text-black bg-white hover:bg-white/90 transition-colors text-center mt-4"
              onClick={handleNavClick}
              onMouseEnter={() => playSound('hover')}
            >
              CTF_TEAM
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
