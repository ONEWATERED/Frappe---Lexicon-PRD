import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { explainTermSimply, generateRealWorldExample } from '../../services/geminiService';
import { TermComment, TermDocument, LexiconTerm } from '../../types';
// FIX: Added SparklesIcon to import to resolve missing component error.
import { DocumentTextIcon, PaperClipIcon, ChatBubbleLeftRightIcon, LightBulbIcon, GlobeAltIcon, ShareIcon, SparklesIcon } from '../../components/icons/Icons';

function getTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const weeks = Math.round(days / 7);
  const months = Math.round(days / 30);
  const years = Math.round(days / 365);

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 5) return `${weeks}w ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
}

const useRecentlyViewedManager = (termId?: string) => {
    useEffect(() => {
        if (!termId) return;
        const stored = localStorage.getItem('recentlyViewed');
        let viewed: string[] = stored ? JSON.parse(stored) : [];
        viewed = [termId, ...viewed.filter(id => id !== termId)].slice(0, 5);
        localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
    }, [termId]);
};

const DocumentItem: React.FC<{ doc: TermDocument }> = ({ doc }) => (
  <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors">
    <div className="flex-shrink-0 w-10 h-10 bg-slate-700 rounded-md flex items-center justify-center">
      <DocumentTextIcon className="w-6 h-6 text-slate-400" />
    </div>
    <div className="flex-grow">
      <p className="font-semibold text-slate-200">{doc.title}</p>
      <p className="text-xs text-slate-400">
        <span className={`font-semibold text-blue-400`}>{doc.fileType}</span> - Added by {doc.user.name}
      </p>
    </div>
  </a>
);

const Comment: React.FC<{ comment: TermComment; onMarkInsightful: (commentId: string) => void; isReply?: boolean }> = ({ comment, onMarkInsightful, isReply = false }) => (
  <div className={`flex items-start gap-3 ${isReply ? 'ml-8' : ''}`}>
    <img src={comment.user.avatarUrl} alt={comment.user.name} className="w-10 h-10 rounded-full flex-shrink-0" />
    <div className="flex-grow">
      <div className="bg-slate-800/70 p-3 rounded-lg border border-slate-700/50">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-200 text-sm">{comment.user.name}</span>
          <span className="text-xs text-slate-500">{getTimeAgo(comment.timestamp)}</span>
        </div>
        <p className="text-slate-300 mt-1">{comment.text}</p>
      </div>
       <div className="mt-2 flex items-center gap-4">
            <button onClick={() => onMarkInsightful(comment.id)} className="flex items-center gap-1 text-xs text-slate-400 hover:text-yellow-400 transition-colors">
                <LightBulbIcon className="w-4 h-4" />
                <span>Mark as Insightful ({comment.insightfulCount})</span>
            </button>
       </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map(reply => <Comment key={reply.id} comment={reply} onMarkInsightful={onMarkInsightful} isReply />)}
        </div>
      )}
    </div>
  </div>
);


const TermDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { terms, vendors, currentUser, droobiVideos, flashcardDecks } = useAuth();
  
  const term = terms.find(t => t.id === id);
  useRecentlyViewedManager(term?.id);

  const [simpleExplanation, setSimpleExplanation] = useState('');
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [realWorldExample, setRealWorldExample] = useState('');
  const [isLoadingExample, setIsLoadingExample] = useState(false);

  const [comments, setComments] = useState<TermComment[]>(term?.comments || []);
  const [newCommentText, setNewCommentText] = useState('');
  const [sortOrder, setSortOrder] = useState<'recent' | 'insightful'>('recent');

  useEffect(() => {
    setComments(term?.comments || []);
  }, [term]);

  const sortedComments = useMemo(() => {
    const commentsCopy = JSON.parse(JSON.stringify(comments)) as TermComment[];
    if (sortOrder === 'insightful') {
        return commentsCopy.sort((a,b) => b.insightfulCount - a.insightfulCount);
    }
    return commentsCopy.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [comments, sortOrder]);


  const handleMarkInsightful = (commentId: string) => {
    const updateInsightfulCount = (commentList: TermComment[]): TermComment[] => {
        return commentList.map(c => {
            if (c.id === commentId) {
                return {...c, insightfulCount: c.insightfulCount + 1};
            }
            if (c.replies) {
                return {...c, replies: updateInsightfulCount(c.replies)};
            }
            return c;
        });
    }
    setComments(prev => updateInsightfulCount(prev));
  };


  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !currentUser) return;
    
    const newComment: TermComment = {
        id: `c${Date.now()}`,
        user: currentUser,
        text: newCommentText,
        timestamp: new Date().toISOString(),
        replies: [],
        insightfulCount: 0,
    };
    
    setComments(prev => [...prev, newComment]);
    setNewCommentText('');
  };

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

  const handleShowExample = useCallback(async () => {
    if (!term) return;
    setIsLoadingExample(true);
    setRealWorldExample('');
    try {
      const example = await generateRealWorldExample(term.term, term.plainLanguageDefinition);
      setRealWorldExample(example);
    } catch (error) {
      setRealWorldExample('Sorry, I could not generate an example at this time.');
    } finally {
      setIsLoadingExample(false);
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
  const relatedTerms = term.relatedTermIds?.map(tid => terms.find(t => t.id === tid)).filter(Boolean) as LexiconTerm[] || [];
  const relatedVideos = term.relatedDroobiVideoIds?.map(vid => droobiVideos.find(v => v.id === vid)).filter(Boolean) || [];
  const relatedDecks = term.relatedDeckIds?.map(did => flashcardDecks.find(d => d.id === did)).filter(Boolean) || [];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-slate-300">
      <div className="grid lg:grid-cols-3 gap-12">
      <main className="lg:col-span-2">
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
            <h3 className="text-xl font-bold text-slate-100 mb-4">AI Learning Tools</h3>
            <div className="flex flex-wrap gap-4">
              <button onClick={handleExplainSimply} disabled={isLoadingExplanation} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-slate-500 transition-colors flex items-center gap-2">
                 <SparklesIcon className="w-5 h-5"/> {isLoadingExplanation ? 'Thinking...' : "ELI5: Explain Like I'm 5"}
              </button>
               <button onClick={handleShowExample} disabled={isLoadingExample} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 disabled:bg-slate-500 transition-colors flex items-center gap-2">
                 <GlobeAltIcon className="w-5 h-5"/> {isLoadingExample ? 'Generating...' : "Show Me an Example"}
              </button>
            </div>
            {simpleExplanation && (
              <div className="mt-4 p-4 bg-blue-900/50 border border-blue-500 rounded-lg">
                  <p className="text-blue-200">{simpleExplanation}</p>
              </div>
            )}
             {realWorldExample && (
              <div className="mt-4 p-4 bg-green-900/50 border border-green-500 rounded-lg">
                  <p className="text-green-200">{realWorldExample}</p>
              </div>
            )}
          </div>
        </div>

         <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
            <ChatBubbleLeftRightIcon className="w-7 h-7 text-blue-400" />
            Community Discussion
          </h2>
           <div className="flex items-center justify-end gap-2 mb-4 text-sm">
                <span className="text-slate-400">Sort by:</span>
                <button onClick={() => setSortOrder('recent')} className={`px-3 py-1 rounded-full ${sortOrder === 'recent' ? 'bg-slate-600 text-white' : 'bg-slate-800 text-slate-300'}`}>Recent</button>
                <button onClick={() => setSortOrder('insightful')} className={`px-3 py-1 rounded-full ${sortOrder === 'insightful' ? 'bg-slate-600 text-white' : 'bg-slate-800 text-slate-300'}`}>Insightful</button>
            </div>
          {currentUser && (
              <form onSubmit={handlePostComment} className="flex items-start gap-3 mb-8">
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-grow">
                      <textarea
                          value={newCommentText}
                          onChange={(e) => setNewCommentText(e.target.value)}
                          placeholder="Add to the discussion..."
                          className="w-full bg-slate-700 text-white placeholder-slate-400 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                      ></textarea>
                      <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md text-sm transition-colors disabled:bg-slate-600" disabled={!newCommentText.trim()}>
                          Post Comment
                      </button>
                  </div>
              </form>
          )}
          <div className="space-y-6">
              {sortedComments.length > 0 ? sortedComments.map(c => <Comment key={c.id} comment={c} onMarkInsightful={handleMarkInsightful}/>) : <p className="text-slate-500 text-center py-8">No comments yet. Be the first to contribute!</p>}
          </div>
        </div>
      </main>
      
      <aside className="lg:col-span-1 space-y-8">
          <div className="sticky top-24 space-y-8">
            {(relatedTerms.length > 0 || relatedVideos.length > 0 || relatedDecks.length > 0) && (
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-slate-100 mb-4">Learn More in the oraKLES Ecosystem</h3>
                <div className="space-y-4">
                  {relatedVideos.map(video => (
                    <Link key={video.id} to={`/video/${video.id}`} className="block p-3 rounded-md bg-slate-700/50 hover:bg-slate-700">
                      <p className="text-xs uppercase text-rose-400 font-semibold">Droobi TV</p>
                      <p className="font-semibold text-slate-200">{video.title}</p>
                    </Link>
                  ))}
                  {relatedDecks.map(deck => (
                     <Link key={deck.id} to={`/academy/deck/${deck.id}`} className="block p-3 rounded-md bg-slate-700/50 hover:bg-slate-700">
                      <p className="text-xs uppercase text-amber-400 font-semibold">Academy Deck</p>
                      <p className="font-semibold text-slate-200">{deck.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {relatedTerms.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-100 mb-4">Related Terms</h2>
                  <div className="space-y-2">
                    {relatedTerms.map(rt => (
                      <Link to={`/term/${rt.id}`} key={rt.id} className="block p-3 rounded-md bg-slate-800/50 hover:bg-slate-800 border border-slate-700">{rt.term}</Link>
                    ))}
                  </div>
                  <button className="mt-4 w-full text-sm flex items-center justify-center gap-2 p-2 rounded-md bg-slate-700 hover:bg-slate-600">
                    <ShareIcon className="w-4 h-4" /> View Concept Map
                  </button>
                </div>
            )}
           
            <div>
              <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-3">
                <PaperClipIcon className="w-6 h-6 text-blue-400" />
                Related Documents
              </h2>
              <div className="space-y-3">
                {term.documents && term.documents.length > 0 ? (
                    term.documents.map(doc => <DocumentItem key={doc.id} doc={doc} />
                ) : (
                    <p className="text-slate-500 text-sm">No documents have been contributed for this term yet.</p>
                )}
              </div>
              
              <div className="mt-6 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h3 className="font-semibold text-slate-200">Contribute a Document</h3>
                <p className="text-sm text-slate-400 mt-1">Help enrich this entry by uploading relevant files.</p>
                <button type="button" onClick={() => alert('This is a prototype. File upload is not implemented.')} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md text-sm transition-colors">
                    Upload
                </button>
              </div>
            </div>
        </div>
      </aside>
      </div>

    </div>
  );
};

export default TermDetail;