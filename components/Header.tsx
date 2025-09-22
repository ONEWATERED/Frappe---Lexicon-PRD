
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { WaterDropIcon } from './icons/Icons';

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
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
  const { currentUser, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
    navigate(`/?q=${query}`);
  };

  return (
    <header className="sticky top-0 z-50 glass-card">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center text-white">
              <WaterDropIcon className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">Language of Water</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavItem to="/">Lexicon</NavItem>
                <NavItem to="/droobi-tv">Droobi TV</NavItem>
                <NavItem to="/academy">Academy</NavItem>
                <NavItem to="/manuals">Manuals</NavItem>
                <NavItem to="/ecosystem">Ecosystem</NavItem>
              </div>
            </div>
          </div>
          <div className="flex items-center">
             <form onSubmit={handleSearch} className="mr-4">
                <input
                    type="search"
                    name="q"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search lexicon..."
                    className="bg-slate-700 text-white placeholder-slate-400 px-3 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </form>
            {currentUser && (
              <div className="relative">
                <Link to={`/profile/${currentUser.id}`}>
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="h-8 w-8 rounded-full" />
                </Link>
                {/* Simple example, can be expanded to a full dropdown */}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
