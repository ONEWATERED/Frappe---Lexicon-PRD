import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BlogPost, BlogAuthor } from '../../types';
import { PencilSquareIcon, ClockIcon } from '../../components/icons/Icons';

const FeaturedPostCard: React.FC<{ post: BlogPost; author?: BlogAuthor }> = ({ post, author }) => (
    <Link to={`/insights/${post.id}`} className="block group relative rounded-2xl overflow-hidden glass-card">
        <img src={post.heroImageUrl} alt={post.title} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        <div className="relative p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white group-hover:text-blue-400 transition-colors duration-300">{post.title}</h2>
            <p className="mt-4 text-slate-300 max-w-2xl">{post.subtitle}</p>
            {author && (
                <div className="mt-6 flex items-center gap-3">
                    <img src={author.avatarUrl} alt={author.name} className="w-12 h-12 rounded-full border-2 border-slate-700" />
                    <div>
                        <p className="font-semibold text-slate-100">{author.name}</p>
                        <p className="text-sm text-slate-400">{author.title}</p>
                    </div>
                </div>
            )}
        </div>
    </Link>
);

const PostCard: React.FC<{ post: BlogPost; author?: BlogAuthor }> = ({ post, author }) => (
    <Link to={`/insights/${post.id}`} className="block group glass-card rounded-xl overflow-hidden h-full flex flex-col">
        <div className="aspect-video bg-slate-800 overflow-hidden">
            <img src={post.heroImageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 flex-grow">{post.title}</h3>
            {author && (
                 <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                         <img src={author.avatarUrl} alt={author.name} className="w-8 h-8 rounded-full" />
                         <span className="font-semibold text-slate-300">{author.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                        <ClockIcon className="w-4 h-4" />
                        <span>{post.readTimeMinutes} min read</span>
                    </div>
                 </div>
            )}
        </div>
    </Link>
);

const BlogHome: React.FC = () => {
    const { blogPosts, blogAuthors, currentUser } = useAuth();

    const getAuthorById = (authorId: string) => blogAuthors.find(a => a.id === authorId);

    const sortedPosts = useMemo(() => {
        return [...blogPosts].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    }, [blogPosts]);

    const featuredPost = sortedPosts[0];
    const otherPosts = sortedPosts.slice(1);

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">Insights</h1>
                    <p className="mt-4 max-w-3xl text-lg text-slate-400">
                        Welcome to Insights, our collaborative thought leadership platform. We invite experts from across the water industry—vendors, consultants, academics, and government officials—to share their knowledge as contributors, authors, and editors. By aggregating diverse perspectives, we aim to create a comprehensive knowledge hub while recognizing and rewarding our top contributors for their invaluable input.
                    </p>
                </div>
                {currentUser && (
                    <Link to="/insights/new" className="mt-6 md:mt-0 flex-shrink-0 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        <PencilSquareIcon className="w-5 h-5" />
                        Write an Insight
                    </Link>
                )}
            </div>

            {featuredPost && <FeaturedPostCard post={featuredPost} author={getAuthorById(featuredPost.authorId)} />}
            
            <div className="mt-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherPosts.map(post => (
                        <PostCard key={post.id} post={post} author={getAuthorById(post.authorId)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogHome;