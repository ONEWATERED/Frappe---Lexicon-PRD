
import React, { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { explainTermSimply } from '../../services/geminiService';

const TermDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { terms, vendors } = useAuth();
  const [simpleExplanation, setSimpleExplanation] = useState('');
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);

  const term = terms.find(t => t.id === id);

  const handleExplainSimply = useCallback(async () => {
    if (!term) return;
    setIsLoadingExplanation(true);
    setSimpleExplanation('');
    try {
      const explanation = await explainTermSimply(term.term, term.technicalDefinition);
      setSimpleExplanation(explanation);
    } catch (error) {
      setSimpleExplanation('Sorry, I could not generate an explanation at this time.');
    } finally {
      setIsLoadingExplanation(false);
    }
  }, [term]);

  if (!term) {
    return (
      <div className="text-center py-20 text-white">
        <h1 className="text-2xl">Term not found.</h1>
        <Link to="/" className="text-blue-400 hover:underline mt-4 inline-block">Back to Lexicon</Link>
      </div>
    );
  }

  const linkedVendors = term.linkedVendorIds?.map(vid => vendors.find(v => v.id === vid)).filter(Boolean) || [];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-slate-300">
      <span className="text-sm font-semibold uppercase text-blue-400">{term.category.replace('_', ' ')}</span>
      <h1 className="text-4xl font-extrabold text-white tracking-tight mt-2">{term.term}</h1>
      
      <div className="mt-8 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Plain Language Definition</h2>
          <p className="mt-2 text-lg leading-relaxed">{term.plainLanguageDefinition}</p>
        </div>
        
        <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100">Technical Definition</h2>
          <p className="mt-2 text-lg leading-relaxed font-mono">{term.technicalDefinition}</p>
        </div>

        <div>
           <button onClick={handleExplainSimply} disabled={isLoadingExplanation} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-slate-500 transition-colors">
            {isLoadingExplanation ? 'Thinking...' : "ELI5: Explain Like I'm 5"}
          </button>
          {simpleExplanation && (
            <div className="mt-4 p-4 bg-green-900/50 border border-green-500 rounded-lg">
                <p className="text-green-200">{simpleExplanation}</p>
            </div>
          )}
        </div>

        {linkedVendors.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Related Vendors</h2>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              {linkedVendors.map(vendor => vendor && (
                <Link to={`/vendor/${vendor.id}`} key={vendor.id} className="bg-slate-800 p-4 rounded-lg flex items-center space-x-4 hover:bg-slate-700 transition-colors">
                  <img src={vendor.logoUrl} alt={vendor.name} className="h-10 w-10 bg-white p-1 rounded-full"/>
                  <span className="font-semibold text-slate-200">{vendor.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TermDetail;
