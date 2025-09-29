import React, { useMemo, useState, useEffect, FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LexiconTerm, LexiconCategory, lexiconCategoryNames, User } from '../../types';
import { 
    ArrowRightIcon, 
    BuildingOffice2Icon, 
    StarIcon, 
    TrophyIcon, 
    SearchIcon,
    FilterIcon,
    ViewGridIcon,
    ViewListIcon,
    LightBulbIcon
} from '../../components/icons/Icons';

const TermOfTheDay: React.FC<{ term: LexiconTerm }> = ({ term }) => (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
        <h3 className="flex items-center gap-2 font-bold text-white"><LightBulbIcon className="w-5 h-5 text-yellow-400"/>Term of the Day</h3>
        <div className="mt-4">
            <span className="text-xs font-semibold uppercase text-blue-400">{lexiconCategoryNames[term.category]}</span>
            <h4 className="text-lg font-bold text-slate-100 mt-1">{term.term}</h4>
            <p className="text-sm text-slate-400 mt-2">{term.plainLanguageDefinition}</p>
            <Link to={`/term/${term.id}`} className="flex items-center justify-between text-blue-400 mt-4 font-semibold text-sm">
                <span>Learn More</span>
                <ArrowRightIcon className="w-4 h-4" />
            </Link>
        </div>
    </div>
);

const Leaderboard: React.FC = () => {
    const { getAllUsers } = useAuth();
    const users = getAllUsers();

    const leaderboard = useMemo(() => {
        return users.map(user => {
            const score = (user.stats.commentsPosted * 2) + (user.stats.documentsUploaded * 5) + (user.stats.insightfulMarks * 10);
            return { ...user, score };
        }).sort((a,b) => b.score - a.score).slice(0, 5);
    }, [users]);

    return (
        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <h3 className="flex items-center gap-2 font-bold text-white"><TrophyIcon className="w-5 h-5 text-yellow-400"/>Top Contributors</h3>
            <div className="mt-4 space-y-4">
                {leaderboard.map((user, index) => (
                    <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-slate-400 text-sm w-4">{index + 1}</span>
                            <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                            <Link to={`/profile/${user.id}`} className="text-sm font-semibold text-slate-200 hover:text-blue-400">{user.name}</Link>
                        </div>
                        <span className="text-sm font-mono font-bold text-blue-400">{user.score.toLocaleString()} pts</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TermCard: React.FC<{ term: LexiconTerm }> = ({ term }) => (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition-all duration-300 h-full flex flex-col group">
      <div className="flex justify-between items-start">
        <span className="text-xs font-semibold uppercase text-blue-400">{lexiconCategoryNames[term.category]}</span>
        {term.isPremium && (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-600/20 text-purple-300 rounded-full text-xs font-bold border border-purple-500/40">
            <StarIcon className="w-3 h-3" />
            Premium
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold text-slate-100 mt-2">{term.term}</h3>
      <p className="text-slate-400 mt-2 text-sm flex-grow line-clamp-3">{term.plainLanguageDefinition}</p>
      <Link to={`/term/${term.id}`} className="flex items-center justify-between text-blue-400 mt-4 font-semibold text-sm">
        <span>View Details</span>
        <ArrowRightIcon className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
);

const TermRow: React.FC<{ term: LexiconTerm }> = ({ term }) => (
    <Link to={`/term/${term.id}`} className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-800 transition-colors group">
        <div className="flex-grow">
            <h3 className="font-bold text-slate-100 group-hover:text-blue-400">{term.term}</h3>
            <p className="text-sm text-slate-400 line-clamp-1">{term.plainLanguageDefinition}</p>
        </div>
        <div className="flex-shrink-0 ml-4 text-right">
             <span className="text-xs font-semibold uppercase text-blue-400">{lexiconCategoryNames[term.category]}</span>
        </div>
    </Link>
);


const Pagination: React.FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void }> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    // Logic to create page numbers array (e.g., [1, '...', 4, 5, 6, '...', 10])
    // For simplicity, we'll just show prev/next and current page for now.
    
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-4 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-slate-700 text-sm font-semibold rounded-md disabled:opacity-50 hover:bg-slate-600"
            >
                Previous
            </button>
            <span className="text-sm font-semibold text-slate-400">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-slate-700 text-sm font-semibold rounded-md disabled:opacity-50 hover:bg-slate-600"
            >
                Next
            </button>
        </div>
    );
};

const TERMS_PER_PAGE = 24;

const LexiconHome: React.FC = () => {
  const { terms } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState<LexiconCategory[]>([]);
  const [activeLetter, setActiveLetter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const termOfTheDay = useMemo(() => terms[Math.floor(Math.random() * terms.length)], [terms]);

  const handleCategoryToggle = (category: LexiconCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const alphabet = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  const filteredTerms = useMemo(() => {
    setCurrentPage(1); // Reset page on filter change
    let results = terms;
    const lowerCaseQuery = query.toLowerCase();

    if (lowerCaseQuery) {
      results = results.filter(term => term.term.toLowerCase().includes(lowerCaseQuery));
    }
    
    if (selectedCategories.length > 0) {
        results = results.filter(term => selectedCategories.includes(term.category));
    }
    
    if (activeLetter !== 'All') {
      results = results.filter(term => term.term.toUpperCase().startsWith(activeLetter));
    }
    
    return results;
  }, [terms, query, selectedCategories, activeLetter]);

  const totalPages = Math.ceil(filteredTerms.length / TERMS_PER_PAGE);
  const paginatedTerms = useMemo(() => {
    const start = (currentPage - 1) * TERMS_PER_PAGE;
    const end = start + TERMS_PER_PAGE;
    return filteredTerms.slice(start, end);
  }, [filteredTerms, currentPage]);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
  };

  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="text-center py-16 sm:py-24 px-4">
        <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-6xl">The Living Lexicon</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">The semantic backbone for the public infrastructure sector.</p>
        <form onSubmit={handleSearchSubmit} className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input 
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 500 terms..." 
                className="w-full bg-slate-800/70 border border-slate-700 text-white placeholder-slate-400 px-4 py-3 pl-12 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <aside className="lg:col-span-3 xl:col-span-2">
            <div className="sticky top-24 space-y-8">
                <div>
                    <h3 className="flex items-center gap-2 font-bold text-white mb-4"><FilterIcon className="w-5 h-5"/> Categories</h3>
                    <div className="space-y-2">
                        {Object.entries(lexiconCategoryNames).map(([key, name]) => (
                            <label key={key} className="flex items-center text-sm text-slate-300 hover:text-white cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={selectedCategories.includes(key as LexiconCategory)}
                                    onChange={() => handleCategoryToggle(key as LexiconCategory)}
                                    className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500"
                                />
                                <span className="ml-3">{name}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-white mb-4">Browse A-Z</h3>
                    <div className="flex flex-wrap gap-1">
                        {alphabet.map(letter => (
                            <button key={letter} onClick={() => setActiveLetter(letter)}
                                className={`w-8 h-8 rounded-md text-xs font-semibold transition-colors ${activeLetter === letter ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                            >{letter}</button>
                        ))}
                    </div>
                </div>
            </div>
          </aside>

          <main className="lg:col-span-9 xl:col-span-7">
            <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-slate-400 font-semibold">{filteredTerms.length} terms found</p>
                <div className="flex items-center gap-2">
                    <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><ViewGridIcon className="w-5 h-5"/></button>
                    <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800'}`}><ViewListIcon className="w-5 h-5"/></button>
                </div>
            </div>

            {paginatedTerms.length > 0 ? (
                viewMode === 'grid' ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {paginatedTerms.map(term => <TermCard key={term.id} term={term} />)}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {paginatedTerms.map(term => <TermRow key={term.id} term={term} />)}
                    </div>
                )
            ) : (
                <div className="text-center py-24 bg-slate-800/50 rounded-lg">
                    <h3 className="text-2xl font-semibold text-slate-300">No terms found</h3>
                    <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
                </div>
            )}
            
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </main>

          <aside className="hidden xl:block xl:col-span-3">
            <div className="sticky top-24 space-y-8">
              <TermOfTheDay term={termOfTheDay} />
              <Leaderboard />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default LexiconHome;