import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { explainTermSimply, generateRealWorldExample } from '../../services/geminiService';
import { TermComment, TermDocument, LexiconTerm } from '../../types';
import { DocumentTextIcon, PaperClipIcon, ChatBubbleLeftRightIcon, LightBulbIcon, GlobeAltIcon, ShareIcon, SparklesIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '../../components/icons/Icons';
import VideoPlayer from '../../components/VideoPlayer';

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

// FIX: Completed the file by adding the TermDetail component and its default export. This resolves the module import error in App.tsx.
const TermDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { terms, vendors, droobiVideos, flashcardDecks, currentUser } = useAuth();
    
    const term = useMemo(() => terms.find(t => t.id === id), [terms, id]);
    
    useRecentlyViewedManager(id);

    const [simpleExplanation, setSimpleExplanation] = useState('');
    const [isSimpleLoading, setIsSimpleLoading] = useState(false);
    const [realWorldExample, setRealWorldExample] = useState('');
    const [isExampleLoading, setIsExampleLoading] = useState(false);
    const [termComments, setTermComments] = useState<TermComment[]>(term?.comments || []);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Reset state on term change
        setSimpleExplanation('');
        setRealWorldExample('');
        setTermComments(term?.comments || []);
        
        if (term?.audioUrl) {
            const newAudio = new Audio(term.audioUrl);
            audioRef.current = newAudio;
            newAudio.onplay = () => setIsPlaying(true);
            newAudio.onpause = () => setIsPlaying(false);
            newAudio.onended = () => setIsPlaying(false);
            setAudio(newAudio);
        }
        return () => {
            audioRef.current?.pause();
        };
    }, [term]);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
    };

    const getSimpleExplanation = useCallback(async () => {
        if (term) {
            setIsSimpleLoading(true);
            const explanation = await explainTermSimply(term.term, term.technicalDefinition);
            setSimpleExplanation(explanation);
            setIsSimpleLoading(false);
        }
    }, [term]);

    const getRealWorldExample = useCallback(async () => {
        if (term) {
            setIsExampleLoading(true);
            const example = await generateRealWorldExample(term.term, term.plainLanguageDefinition);
            setRealWorldExample(example);
            setIsExampleLoading(false);
        }
    }, [term]);

    const handleMarkInsightful = (commentId: string) => {
        const markComment = (comments: TermComment[]): TermComment[] => {
            return comments.map(c => {
                if (c.id === commentId) {
                    return { ...c, insightfulCount: c.insightfulCount + 1 };
                }
                if (c.replies) {
                    return { ...c, replies: markComment(c.replies) };
                }
                return c;
            });
        };
        setTermComments(markComment(termComments));
    };

    if (!term) {
        return (
          <div className="text-center py-20 text-white">
            <h1 className="text-2xl">Term not found.</h1>
            <Link to="/" className="text-blue-400 hover:underline mt-4 inline-block">Back to Lexicon</Link>
          </div>
        );
    }
    
    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <header>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white">{term.term}</h1>
            </header>
            
            <div className="mt-8 grid lg:grid-cols-3 gap-8">
                <main className="lg:col-span-2 space-y-8">
                    {/* Definitions */}
                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                        <h2 className="text-xl font-bold text-white">Plain Language Definition</h2>
                        <p className="text-slate-300 mt-2">{term.plainLanguageDefinition}</p>
                        <h2 className="text-xl font-bold text-white mt-6">Technical Definition</h2>
                        <p className="text-slate-300 mt-2">{term.technicalDefinition}</p>
                    </div>

                    {/* AI Insights */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                           <h3 className="flex items-center gap-2 font-bold text-white"><SparklesIcon className="w-5 h-5 text-purple-400"/> Explain Like I'm 5</h3>
                           {simpleExplanation ? <p className="text-sm text-slate-300 mt-2">{simpleExplanation}</p> : <button onClick={getSimpleExplanation} disabled={isSimpleLoading} className="mt-3 text-sm font-semibold text-blue-400 hover:underline disabled:opacity-50">{isSimpleLoading ? 'Generating...' : 'Generate simple explanation'}</button>}
                        </div>
                        <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                           <h3 className="flex items-center gap-2 font-bold text-white"><GlobeAltIcon className="w-5 h-5 text-green-400"/> Real-World Example</h3>
                           {realWorldExample ? <p className="text-sm text-slate-300 mt-2">{realWorldExample}</p> : <button onClick={getRealWorldExample} disabled={isExampleLoading} className="mt-3 text-sm font-semibold text-blue-400 hover:underline disabled:opacity-50">{isExampleLoading ? 'Generating...' : 'Generate real-world example'}</button>}
                        </div>
                    </div>

                    {/* Media */}
                    {(term.videoUrl || term.audioUrl) && (
                        <div className="grid md:grid-cols-2 gap-6">
                           {term.videoUrl && (
                             <div className="aspect-video"><VideoPlayer src={term.videoUrl} /></div>
                           )}
                           {term.audioUrl && (
                             <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 flex items-center justify-between">
                               <div>
                                 <h3 className="font-bold text-white">Listen to Definition</h3>
                                 <p className="text-sm text-slate-400">Audio explanation</p>
                               </div>
                               <button onClick={togglePlay} className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                                 {isPlaying ? <SpeakerXMarkIcon className="w-7 h-7" /> : <SpeakerWaveIcon className="w-7 h-7" />}
                               </button>
                             </div>
                           )}
                        </div>
                    )}
                    
                    {/* Documents */}
                    {term.documents && term.documents.length > 0 && (
                        <div>
                          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><PaperClipIcon className="w-6 h-6"/>Related Documents</h2>
                          <div className="space-y-4">
                            {term.documents.map(doc => <DocumentItem key={doc.id} doc={doc} />)}
                          </div>
                        </div>
                    )}

                    {/* Comments */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><ChatBubbleLeftRightIcon className="w-6 h-6"/>Community Discussion</h2>
                        {currentUser && (
                             <div className="flex items-start gap-3 mb-6">
                                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full" />
                                <div className="flex-grow">
                                  <textarea placeholder="Add your comment or question..." rows={3} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"></textarea>
                                  <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-1.5 rounded-md text-sm">Post</button>
                                </div>
                              </div>
                        )}
                        <div className="space-y-6">
                            {termComments.map(comment => <Comment key={comment.id} comment={comment} onMarkInsightful={handleMarkInsightful}/>)}
                        </div>
                    </div>
                </main>
                <aside className="lg:col-span-1 space-y-6">
                    {/* Actions, Related Vendors, Related Terms etc. */}
                </aside>
            </div>
        </div>
    );
};

export default TermDetail;
