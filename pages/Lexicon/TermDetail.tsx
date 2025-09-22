
import React, { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { explainTermSimply } from '../../services/geminiService';
import { TermComment, TermDocument } from '../../types';
import { DocumentTextIcon, PaperClipIcon, ChatBubbleLeftRightIcon } from '../../components/icons/Icons';

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

const Comment: React.FC<{ comment: TermComment; isReply?: boolean }> = ({ comment, isReply = false }) => (
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
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map(reply => <Comment key={reply.id} comment={reply} isReply />)}
        </div>
      )}
    </div>
  </div>
);


const TermDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { terms, vendors, currentUser } = useAuth();
  const [simpleExplanation, setSimpleExplanation] = useState('');
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  
  const term = terms.find(t => t.id === id);

  const [comments, setComments] = useState(term?.comments || []);
  const [newCommentText, setNewCommentText] = useState('');

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !currentUser) return;
    
    const newComment: TermComment = {
        id: `c${Date.now()}`,
        user: currentUser,
        text: newCommentText,
        timestamp: new Date().toISOString(),
        replies: []
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
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-slate-300">
      <div className="max-w-4xl mx-auto">
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
      
      <div className="mt-16 max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
            <ChatBubbleLeftRightIcon className="w-7 h-7 text-blue-400" />
            Community Discussion
          </h2>
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
              {comments.length > 0 ? comments.map(c => <Comment key={c.id} comment={c} />) : <p className="text-slate-500 text-center py-8">No comments yet. Be the first to contribute!</p>}
          </div>
        </div>
        <aside className="lg:col-span-2">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
                <PaperClipIcon className="w-7 h-7 text-blue-400" />
                Related Documents
              </h2>
              <div className="space-y-3">
                {term.documents && term.documents.length > 0 ? (
                    term.documents.map(doc => <DocumentItem key={doc.id} doc={doc} />)
                ) : (
                    <p className="text-slate-500 text-sm">No documents have been contributed for this term yet.</p>
                )}
              </div>
              
              <div className="mt-8 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h3 className="font-semibold text-slate-200">Contribute a Document</h3>
                <p className="text-sm text-slate-400 mt-1">Help enrich this entry by uploading relevant files.</p>
                <form className="mt-4 space-y-3">
                    <div>
                        <label htmlFor="doc-title" className="text-xs font-medium text-slate-300">Document Title</label>
                        <input id="doc-title" type="text" placeholder="e.g., WRF Study 4501" className="mt-1 w-full bg-slate-700 text-white placeholder-slate-500 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                     <div>
                        <label htmlFor="doc-file" className="text-xs font-medium text-slate-300">File</label>
                        <input id="doc-file" type="file" className="mt-1 block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-300 hover:file:bg-blue-500/20"/>
                    </div>
                    <button type="button" onClick={() => alert('This is a prototype. File upload is not implemented.')} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md text-sm transition-colors">
                        Upload
                    </button>
                </form>
              </div>
            </div>
        </aside>
      </div>

    </div>
  );
};

export default TermDetail;