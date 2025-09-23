import React, { useMemo, useState, useEffect, FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LexiconTerm, lexiconCategoryNames, User } from '../../types';
import { ArrowRightIcon, BuildingOffice2Icon, StarIcon, ClockIcon, ArrowUpTrayIcon, EyeIcon, TrophyIcon } from '../../components/icons/Icons';

const useRecentlyViewed = () => {
  const [viewed, setViewed] = useState<string[]>([]);
  
  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      setViewed(JSON.parse(stored));
    }
  }, []);

  return viewed;
};


const TermCard: React.FC<{ term: LexiconTerm }> = ({ term }) => (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 hover:border-blue-400 transition-all duration-300 h-full flex flex-col group">
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
      <p className="text-slate-400 mt-2 text-sm flex-grow">{term.plainLanguageDefinition}</p>
      
      <div className="mt-4">
        {term.linkedVendorIds && term.linkedVendorIds.length > 0 && (
            <div className="flex items-center text-sm text-slate-400">
                <BuildingOffice2Icon className="w-4 h-4 mr-2" />
                {term.linkedVendorIds.length} Vendor{term.linkedVendorIds.length > 1 ? 's' : ''}
            </div>
        )}
      </div>
      
      <Link to={`/term/${term.id}`} className="flex items-center justify-between text-blue-400 mt-4 font-semibold text-sm">
        <span>View Details</span>
        <ArrowRightIcon className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
);

const TrendingTerms: React.FC = () => {
  const { terms } = useAuth();
  const trending = useMemo(() => {
    // Most discussed
    const mostDiscussed = [...terms].sort((a,b) => (b.comments?.length || 0) - (a.comments?.length || 0)).slice(0, 3);
    // Most viewed
    const mostViewed = [...terms].sort((a,b) => b.viewCount - a.viewCount).slice(0, 3);
    // Newly added (first 3 from data)
    const newlyAdded = terms.slice(0, 3);
    return { mostDiscussed, mostViewed, newlyAdded };
  }, [terms]);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-4">Trending & Popular Terms</h2>
      <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
        {[...trending.mostViewed, ...trending.mostDiscussed, ...trending.newlyAdded]
          .filter((term, index, self) => index === self.findIndex(t => t.id === term.id)) // unique
          .slice(0, 8)
          .map(term => (
          <div key={term.id} className="w-80 flex-shrink-0">
            <TermCard term={term} />
          </div>
        ))}
      </div>
    </div>
  );
};


const PersonalDashboard: React.FC = () => {
    const { currentUser, terms } = useAuth();
    const recentlyViewedIds = useRecentlyViewed();
    const recentlyViewedTerms = useMemo(() => {
        return recentlyViewedIds.map(id => terms.find(t => t.id === id)).filter(Boolean) as LexiconTerm[];
    }, [recentlyViewedIds, terms]);

    const termsToExplore = useMemo(() => {
        if (recentlyViewedTerms.length === 0) return terms.slice(0, 3);
        const viewedCategories = new Set(recentlyViewedTerms.map(t => t.category));
        return terms.filter(t => !recentlyViewedIds.includes(t.id) && viewedCategories.has(t.category)).slice(0, 3);
    }, [recentlyViewedTerms, terms, recentlyViewedIds]);
    
    if (!currentUser) return null;

    return (
        <div className="mt-12 bg-slate-800/50 p-6 rounded-lg border border-slate-700">
            <h2 className="font-bold text-white text-xl">Welcome back, {currentUser.name.split(' ')[0]}!</h2>
            <div className="mt-4 grid md:grid-cols-3 gap-6">
                <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-300"><ClockIcon className="w-4 h-4"/>Recently Viewed</h3>
                    <div className="mt-2 space-y-2">
                        {recentlyViewedTerms.slice(0,3).map(term => (
                            <Link key={term.id} to={`/term/${term.id}`} className="block text-sm text-blue-400 hover:underline">{term.term}</Link>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-300"><ArrowUpTrayIcon className="w-4 h-4"/>My Contributions</h3>
                     <div className="mt-2 space-y-1 text-sm text-slate-400">
                        <p>Comments Posted: {currentUser.stats.commentsPosted}</p>
                        <p>Documents Uploaded: {currentUser.stats.documentsUploaded}</p>
                    </div>
                </div>
                 <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-300"><EyeIcon className="w-4 h-4"/>Terms to Explore</h3>
                    <div className="mt-2 space-y-2">
                        {termsToExplore.map(term => (
                           <Link key={term.id} to={`/term/${term.id}`} className="block text-sm text-blue-400 hover:underline">{term.term}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

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
    )
}

const LexiconHome: React.FC = () => {
  const { terms, currentUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeLetter, setActiveLetter] = useState('All');
  const query = searchParams.get('q')?.toLowerCase() || '';
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearchParams(inputValue ? { q: inputValue } : {});
  };

  const alphabet = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  const filteredTerms = useMemo(() => {
    let results = terms;

    if (query) {
      results = results.filter(
        (term) =>
          term.term.toLowerCase().includes(query) ||
          term.plainLanguageDefinition.toLowerCase().includes(query) ||
          term.technicalDefinition.toLowerCase().includes(query)
      );
    }
    
    if (activeLetter !== 'All') {
      results = results.filter(term => term.term.toUpperCase().startsWith(activeLetter));
    }
    
    return results;
  }, [terms, query, activeLetter]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">The Living Lexicon</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
          The semantic backbone for the public infrastructure sector.
        </p>
      </div>

      <TrendingTerms />
      
      <div className="mt-12 grid lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2">
            {currentUser ? <PersonalDashboard /> : (
                 <div className="mt-12 grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                        <h2 className="font-bold text-white">Search Lexicon & Industry Partners</h2>
                        <p className="text-sm text-slate-400 mt-1">Find terms, definitions, vendors, and more.</p>
                        <form onSubmit={handleSearch} className="mt-4">
                            <input 
                            type="search"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="e.g., 'Non-Revenue Water' or 'AquaTech'..." 
                            className="w-full bg-slate-700 text-white placeholder-slate-400 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </form>
                    </div>
                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                        <h2 className="font-bold text-white">Request a New Term</h2>
                        <p className="text-sm text-slate-400 mt-1">Don't see a term? Request it here and our community will help define it.</p>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const term = (e.currentTarget.elements.namedItem('term_request') as HTMLInputElement).value;
                            if (term) alert(`Thank you! Your request for "${term}" has been submitted.`);
                            (e.currentTarget.elements.namedItem('term_request') as HTMLInputElement).value = '';
                            }} className="mt-4 flex gap-2">
                            <input type="text" name="term_request" placeholder="e.g., 'Hydraulic Modeling'" className="flex-grow w-full bg-slate-700 text-white placeholder-slate-400 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md text-sm transition-colors">Request</button>
                        </form>
                    </div>
                 </div>
            )}


          <div className="mt-10 flex justify-center flex-wrap gap-2">
            {alphabet.map(letter => (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className={`w-10 h-10 rounded-md text-sm font-semibold transition-colors ${
                  activeLetter === letter ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((term) => <TermCard key={term.id} term={term} />)
            ) : (
              <div className="col-span-full text-center py-16">
                <h3 className="text-2xl font-semibold text-slate-300">No terms found</h3>
                <p className="text-slate-500 mt-2">Try adjusting your search or filter.</p>
              </div>
            )}
          </div>
        </main>
        <aside className="lg:col-span-1 space-y-8 mt-12 lg:mt-0">
            <Leaderboard />
        </aside>
      </div>

    </div>
  );
};

export default LexiconHome;