import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HandThumbUpIcon, ShareIcon, ClockIcon, ChatBubbleOvalLeftEllipsisIcon } from '../../components/icons/Icons';
import { User } from '../../types';

function getTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (days > 1) return `${days} days ago`;
  if (days === 1) return `1 day ago`;
  if (hours > 1) return `${hours} hours ago`;
  if (hours === 1) return `1 hour ago`;
  if (minutes > 1) return `${minutes} minutes ago`;
  return `a moment ago`;
}

const PostComment: React.FC<{ comment: {user: User, text: string, timestamp: string} }> = ({ comment }) => (
    <div className="flex items-start gap-4">
        <img src={comment.user.avatarUrl} alt={comment.user.name} className="w-10 h-10 rounded-full" />
        <div className="flex-grow">
            <div className="flex items-center gap-2">
                <p className="font-semibold text-slate-100 text-sm">{comment.user.name}</p>
                <p className="text-xs text-slate-500">{getTimeAgo(comment.timestamp)}</p>
            </div>
            <p className="text-slate-300 mt-1">{comment.text}</p>
        </div>
    </div>
);


const BlogPostDetail: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const { blogPosts, blogAuthors, currentUser, ecosystemEntities } = useAuth();
    const [claps, setClaps] = useState(0);

    const post = useMemo(() => blogPosts.find(p => p.id === postId), [blogPosts, postId]);
    const author = useMemo(() => post ? blogAuthors.find(a => a.id === post.authorId) : undefined, [blogAuthors, post]);
    const entity = useMemo(() => post?.vendorId ? ecosystemEntities.find(e => e.id === post.vendorId) : undefined, [ecosystemEntities, post]);
    const shareEnabled = entity?.social?.shareEnabled;
    
    useEffect(() => {
        if(post) setClaps(post.claps)
    }, [post])

    if (!post || !author) {
        return (
            <div className="text-center py-20 text-white">
                <h1 className="text-2xl">Post not found.</h1>
                <Link to="/insights" className="text-blue-400 hover:underline mt-4 inline-block">Back to Insights</Link>
            </div>
        );
    }

    const handleClap = () => setClaps(claps + 1);
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    };

    return (
        <div className="bg-slate-900 text-slate-300 font-serif">
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight font-sans">{post.title}</h1>
                    <p className="mt-4 text-xl md:text-2xl text-slate-400">{post.subtitle}</p>
                    <div className="mt-8 flex items-center gap-4">
                        <img src={author.avatarUrl} alt={author.name} className="w-16 h-16 rounded-full" />
                        <div>
                            <p className="text-lg font-semibold text-slate-100 font-sans">{author.name}</p>
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span>Published on {new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                <span className="flex items-center gap-1"><ClockIcon className="w-4 h-4" /> {post.readTimeMinutes} min read</span>
                            </div>
                        </div>
                    </div>
                </header>
                
                {/* Floating Engagement Bar */}
                <div className="sticky top-20 z-10 py-2 hidden md:block">
                    <div className="glass-card w-20 p-2 rounded-full flex flex-col items-center gap-4">
                        <button onClick={handleClap} className="text-center group">
                            <div className="w-12 h-12 rounded-full border-2 border-slate-600 group-hover:border-yellow-400 flex items-center justify-center transition-colors">
                                <HandThumbUpIcon className="w-6 h-6 text-slate-400 group-hover:text-yellow-400" />
                            </div>
                            <span className="text-xs font-semibold text-slate-300 mt-1">{claps}</span>
                        </button>
                        <a href="#comments" className="text-center group">
                             <div className="w-12 h-12 rounded-full border-2 border-slate-600 group-hover:border-blue-400 flex items-center justify-center transition-colors">
                                <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-slate-400 group-hover:text-blue-400" />
                            </div>
                            <span className="text-xs font-semibold text-slate-300 mt-1">{post.comments.length}</span>
                        </a>
                         {shareEnabled && (
                            <button onClick={handleShare} className="text-center group">
                                <div className="w-12 h-12 rounded-full border-2 border-slate-600 group-hover:border-green-400 flex items-center justify-center transition-colors">
                                    <ShareIcon className="w-6 h-6 text-slate-400 group-hover:text-green-400" />
                                </div>
                            </button>
                         )}
                    </div>
                </div>

                {/* Hero Image */}
                <div className="my-8 rounded-2xl overflow-hidden aspect-video bg-slate-800">
                    <img src={post.heroImageUrl} alt={post.title} className="w-full h-full object-cover" />
                </div>

                {/* Post Content */}
                <article className="prose prose-invert prose-lg max-w-none prose-slate font-serif prose-a:text-blue-400">
                    {post.content.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </article>

                {/* Mobile Engagement Bar */}
                <div className="mt-8 pt-6 border-t border-slate-700 flex items-center justify-around md:hidden">
                    <button onClick={handleClap} className="flex items-center gap-2 text-slate-400 hover:text-yellow-400">
                        <HandThumbUpIcon className="w-5 h-5" /> {claps}
                    </button>
                    <a href="#comments" className="flex items-center gap-2 text-slate-400 hover:text-blue-400">
                        <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" /> {post.comments.length}
                    </a>
                    {shareEnabled && (
                        <button onClick={handleShare} className="flex items-center gap-2 text-slate-400 hover:text-green-400">
                            <ShareIcon className="w-5 h-5" /> Share
                        </button>
                    )}
                </div>


                {/* Comments Section */}
                <section id="comments" className="mt-16 pt-8 border-t border-slate-700">
                    <h2 className="text-2xl font-bold text-white font-sans mb-6">Discussion ({post.comments.length})</h2>
                    <div className="space-y-6">
                        {currentUser && (
                            <div className="flex items-start gap-4">
                                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full" />
                                <div className="flex-grow">
                                    <textarea placeholder="Add your comment..." rows={3} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"></textarea>
                                    <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md text-sm transition-colors">Post Comment</button>
                                </div>
                            </div>
                        )}
                        {post.comments.map((comment, index) => <PostComment key={index} comment={comment} />)}
                    </div>
                </section>

                 {entity && (
                    <footer className="mt-16 pt-8 border-t border-slate-700">
                        <p className="text-sm text-slate-400 mb-4">This insight is associated with:</p>
                        <Link to={`/ecosystem/${entity.id}`} className="glass-card p-4 flex items-center gap-4 group">
                             <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-1 flex-shrink-0">
                                <img src={entity.logoUrl} alt={`${entity.name} logo`} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-lg group-hover:text-blue-400">{entity.name}</h4>
                                <p className="text-sm text-slate-400">{entity.tagline}</p>
                            </div>
                        </Link>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default BlogPostDetail;
