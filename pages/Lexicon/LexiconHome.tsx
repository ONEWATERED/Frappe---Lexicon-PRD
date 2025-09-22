
import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LexiconTerm, lexiconCategoryNames } from '../../types';
import { ArrowRightIcon } from '../../components/icons/Icons';

const TermCard: React.FC<{ term: LexiconTerm }> = ({ term }) => (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 hover:border-blue-400 transition-all duration-300 h-full flex flex-col group">
      <span className="text-xs font-semibold uppercase text-blue-400">{lexiconCategoryNames[term.category]}</span>
      <h3 className="text-xl font-bold text-slate-100 mt-2">{term.term}</h3>
      <p className="text-slate-400 mt-2 text-sm flex-grow line-clamp-4">{term.plainLanguageDefinition}</p>
      <Link to={`/term/${term.id}`} className="flex items-center justify-between text-blue-400 mt-4 font-semibold text-sm">
        <span>View Details</span>
        <ArrowRightIcon className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
);

const LexiconHome: React.FC = () => {
  const { terms } = useAuth();
  const [searchParams] = useSearchParams();
  const [activeLetter, setActiveLetter] = useState('All');
  const query = searchParams.get('q')?.toLowerCase() || '';

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
        <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">oraKLES Lexicon</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
          The semantic backbone for the public infrastructure sector.
        </p>
      </div>

      <div className="mt-10 flex justify-center flex-wrap gap-2">
        {alphabet.map(letter => (
          <button
            key={letter}
            onClick={() => setActiveLetter(letter)}
            className={`w-10 h-10 rounded-md text-sm font-semibold transition-colors ${
              activeLetter === letter
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((term) => <TermCard key={term.id} term={term} />)
        ) : (
          <div className="col-span-full text-center py-16">
            <h3 className="text-2xl font-semibold text-slate-300">No terms found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LexiconHome;