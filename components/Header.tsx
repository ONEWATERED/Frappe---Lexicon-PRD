import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { WaterDropIcon, MenuIcon, XIcon, StarIcon, ChevronDownIcon } from './icons/Icons';

// Original NavItem, used inside the mobile dropdown
const NavItem: React.FC<{ to: string; children: React.ReactNode; isMobile?: boolean }> = ({ to, children, isMobile = false }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md font-medium transition-colors duration-200 flex items-center gap-1.5 ${
        isMobile ? 'block text-base w-full' : 'text-sm'
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

// New component for desktop dropdown menu items
const DropdownLink: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void; }> = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex w-full items-center gap-1.5 rounded-md px-3 py-2 text-sm transition-colors ${
        isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
      }`
    }
  >
    {children}
  </NavLink>
);


// New component for desktop dropdowns
const DropdownNav: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="px-3 py-2 rounded-md font-medium text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-1 transition-colors"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <span>{title}</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute top-full mt-1 w-56 bg-slate-800 border border-slate-700 rounded-md shadow-lg p-2 z-50">
                    {React.Children.map(children, (child) => {
                        if (React.isValidElement(child)) {
                            // This adds an onClick to each child link to close the dropdown when an item is selected.
                            const originalOnClick = (child.props as any).onClick;
                            return React.cloneElement(child as React.ReactElement<any>, {
                                onClick: () => {
                                    if (originalOnClick) {
                                        originalOnClick();
                                    }
                                    setIsOpen(false);
                                },
                            });
                        }
                        return child;
                    })}
                </div>
            )}
        </div>
    );
};

// New component for mobile dropdowns
const MobileDropdownNav: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-700/50">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-3 py-3 text-base font-medium text-slate-200"
            >
                <span>{title}</span>
                <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pl-4 pt-1 pb-2 space-y-1">
                    {children}
                </div>
            )}
        </div>
    );
};


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
              <span className="ml-2 text-2xl font-bold">ORAKLES</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                <DropdownNav title="Learn & Train">
                    <DropdownLink to="/">Lexicon</DropdownLink>
                    <DropdownLink to="/academy">Academy</DropdownLink>
                    <DropdownLink to="/insights">Insights</DropdownLink>
                </DropdownNav>
                <DropdownNav title="Operate & Interact">
                    <DropdownLink to="/manuals">Manuals</DropdownLink>
                    <DropdownLink to="/ai-agents">AI Co-pilots</DropdownLink>
                </DropdownNav>
                <DropdownNav title="Engage & Connect">
                    <DropdownLink to="/community">Community</DropdownLink>
                    <DropdownLink to="/droobi-tv">Droobi TV</DropdownLink>
                    <DropdownLink to="/ecosystem">Partners</DropdownLink>
                    <DropdownLink to="/jobs">
                        Job Board
                        <StarIcon className="w-4 h-4 text-yellow-400" />
                    </DropdownLink>
                </DropdownNav>
                <DropdownNav title="Trust & Standards">
                    <DropdownLink to="/pip">PIP</DropdownLink>
                    <DropdownLink to="/research">Research</DropdownLink>
                </DropdownNav>
                <DropdownNav title="More">
                    <DropdownLink to="/community/messages">Messages</DropdownLink>
                    <DropdownLink to="/droobi-tv/sessions">Live Sessions</DropdownLink>
                </DropdownNav>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:flex items-center gap-4">
                <Link to="/community" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md text-sm transition-colors">
                    Join Community
                </Link>
                {currentUser && (
                  <Link to={`/profile/${currentUser.id}`}>
                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="h-8 w-8 rounded-full" />
                  </Link>
                )}
            </div>
            <div className="ml-4 -mr-2 flex md:hidden">
              {currentUser && (
                <Link to={`/profile/${currentUser.id}`} className="mr-4">
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="h-8 w-8 rounded-full" />
                </Link>
              )}
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
          <div className="pt-2 pb-3 sm:px-3">
             <div className="px-2 mb-4">
                <Link to="/community" className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-3 rounded-md text-base transition-colors">
                    Join Community
                </Link>
             </div>
            <MobileDropdownNav title="Learn & Train">
                <NavItem to="/" isMobile>Lexicon</NavItem>
                <NavItem to="/academy" isMobile>Academy</NavItem>
                <NavItem to="/insights" isMobile>Insights</NavItem>
            </MobileDropdownNav>
             <MobileDropdownNav title="Operate & Interact">
                <NavItem to="/manuals" isMobile>Manuals</NavItem>
                <NavItem to="/ai-agents" isMobile>AI Co-pilots</NavItem>
            </MobileDropdownNav>
             <MobileDropdownNav title="Engage & Connect">
                <NavItem to="/community" isMobile>Community</NavItem>
                <NavItem to="/droobi-tv" isMobile>Droobi TV</NavItem>
                <NavItem to="/ecosystem" isMobile>Partners</NavItem>
                <NavItem to="/jobs" isMobile>
                  Job Board
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                </NavItem>
            </MobileDropdownNav>
            <MobileDropdownNav title="Trust & Standards">
                <NavItem to="/pip" isMobile>PIP</NavItem>
                <NavItem to="/research" isMobile>Research</NavItem>
            </MobileDropdownNav>
            <MobileDropdownNav title="More">
                <NavItem to="/community/messages" isMobile>Messages</NavItem>
                <NavItem to="/droobi-tv/sessions" isMobile>Live Sessions</NavItem>
            </MobileDropdownNav>
          </div>
        </div>
      )}
    </header>
  );
};