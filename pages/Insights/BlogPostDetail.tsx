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
    const { blogPosts, blogAuthors, currentUser } = useAuth();
    const [claps, setClaps] = useState(0);

    const post = useMemo(() => blogPosts.find(p => p.id === postId), [blogPosts, postId]);
    const author = useMemo(() => post ? blogAuthors.find(a => a.id === post.authorId) : undefined, [blogAuthors, post]);
    
    // FIX: Replaced incorrect `useState` with `useEffect` to set component state based on props. `useState` with two arguments is invalid.
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
                         <button className="text-center group">
                             <div className="w-12 h-12 rounded-full border-2 border-slate-600 group-hover:border-green-400 flex items-center justify-center transition-colors">
                                <ShareIcon className="w-6 h-6 text-slate-400 group-hover:text-green-400" />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="my-8 rounded-2xl overflow-hidden aspect-video bg-slate-800">
                    <img src={post.heroImageUrl} alt={post.title} className="w-full h-full object-cover" />
                </div>

                {/* Post Content */}
                <article className="prose prose-lg prose-invert prose-p:leading-relaxed prose-p:text-slate-300 prose-headings:text-white prose-headings:font-sans max-w-none">
                    {post.content.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </article>

                {/* Author Bio */}
                <div className="mt-16 pt-8 border-t border-slate-800">
                    <div className="glass-card p-6 rounded-lg flex items-center gap-6">
                        <img src={author.avatarUrl} alt={author.name} className="w-20 h-20 rounded-full" />
                        <div>
                            <p className="text-xs uppercase font-semibold text-slate-400 font-sans">Written By</p>
                            <h3 className="text-xl font-bold text-white mt-1 font-sans">{author.name}</h3>
                            <p className="text-sm text-slate-400">{author.title}</p>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <section id="comments" className="mt-16 pt-8 border-t border-slate-800 font-sans">
                    <h2 className="text-2xl font-bold text-white mb-6">Responses ({post.comments.length})</h2>
                    {currentUser && (
                         <div className="flex items-start gap-4 mb-8">
                            <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full" />
                            <div className="flex-grow">
                                <textarea
                                    placeholder="What are your thoughts?"
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                ></textarea>
                                <div className="mt-2 text-right">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">Respond</button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="space-y-6">
                        {post.comments.map((comment, index) => (
                            <PostComment key={index} comment={comment} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BlogPostDetail;