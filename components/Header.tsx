import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { WaterDropIcon, MenuIcon, XIcon } from './icons/Icons';

const NavItem: React.FC<{ to: string; children: React.ReactNode; isMobile?: boolean }> = ({ to, children, isMobile = false }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
        isMobile ? 'block text-base' : 'text-sm'
      } ${
        isActive
          ? 'bg-slate-700 text-white'
          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
      }`
    }
  >
    {children}
  </NavLink>
);

export const Header: React.FC = () => {
  const { currentUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu on route change
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 glass-card">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center text-white">
              <WaterDropIcon className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">oraKLES</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavItem to="/">Lexicon</NavItem>
                <NavItem to="/droobi-tv">Droobi TV</NavItem>
                <NavItem to="/academy">Academy</NavItem>
                <NavItem to="/research">Research</NavItem>
                <NavItem to="/community">Community</NavItem>
                <NavItem to="/manuals">Manuals</NavItem>
                <NavItem to="/ecosystem">Partners</NavItem>
                <NavItem to="/ai-agents">AI Co-pilots</NavItem>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {currentUser && (
              <div className="relative">
                <Link to={`/profile/${currentUser.id}`}>
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="h-8 w-8 rounded-full" />
                </Link>
              </div>
            )}
            <div className="ml-4 -mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavItem to="/" isMobile>Lexicon</NavItem>
            <NavItem to="/droobi-tv" isMobile>Droobi TV</NavItem>
            <NavItem to="/academy" isMobile>Academy</NavItem>
            <NavItem to="/research" isMobile>Research</NavItem>
            <NavItem to="/community" isMobile>Community</NavItem>
            <NavItem to="/manuals" isMobile>Manuals</NavItem>
            <NavItem to="/ecosystem" isMobile>Partners</NavItem>
            <NavItem to="/ai-agents" isMobile>AI Co-pilots</NavItem>
          </div>
        </div>
      )}
    </header>
  );
};