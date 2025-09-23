import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CommunityEvent, CommunityPost, LexiconCategory, lexiconCategoryNames } from '../../types';
import { 
    UsersIcon, 
    CalendarDaysIcon, 
    ChatBubbleOvalLeftEllipsisIcon, 
    PlusIcon, 
    MapPinIcon, 
    LinkIcon, 
    HeartIcon, 
    TagIcon 
} from '../../components/icons/Icons';

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

const CreatePost: React.FC = () => {
    const { currentUser } = useAuth();
    if (!currentUser) return null;

    return (
        <div className="glass-card p-4 mb-8">
            <div className="flex items-start gap-4">
                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-12 h-12 rounded-full" />
                <div className="flex-grow">
                    <textarea 
                        placeholder="Share your thoughts or ask a question..."
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                    ></textarea>
                    <div className="mt-2 flex justify-end">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PostCard: React.FC<{ post: CommunityPost }> = ({ post }) => (
    <div className="glass-card p-6">
        <div className="flex items-center gap-3">
            <img src={post.author.avatarUrl} alt={post.author.name} className="w-10 h-10 rounded-full" />
            <div>
                <p className="font-bold text-slate-100">{post.author.name}</p>
                <p className="text-xs text-slate-400">{getTimeAgo(post.timestamp)} in <span className="font-semibold text-blue-400">{lexiconCategoryNames[post.channel]}</span></p>
            </div>
        </div>
        <p className="mt-4 text-slate-300">{post.content}</p>
        <div className="mt-4 flex items-center gap-2">
            {post.tags.map(tag => (
                <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">#{tag}</span>
            ))}
        </div>
        <div className="mt-4 pt-3 border-t border-slate-700 flex items-center gap-6 text-sm text-slate-400">
            <button className="flex items-center gap-2 hover:text-rose-400"><HeartIcon className="w-5 h-5" /> {post.likes} Likes</button>
            <button className="flex items-center gap-2 hover:text-blue-400"><ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" /> {post.comments.length} Comments</button>
        </div>
    </div>
);

const EventCard: React.FC<{ event: CommunityEvent }> = ({ event }) => (
    <div className="glass-card p-6">
        <p className="text-xs font-bold uppercase text-purple-400">{event.type}</p>
        <h3 className="text-xl font-bold text-white mt-2">{event.title}</h3>
        <p className="text-sm text-slate-400 mt-2">{event.description}</p>
        <div className="mt-4 space-y-2 text-sm">
            <p className="flex items-center gap-2"><CalendarDaysIcon className="w-4 h-4 text-slate-500" /> {new Date(event.eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="flex items-center gap-2"><MapPinIcon className="w-4 h-4 text-slate-500" /> {event.location}</p>
            {event.url && <a href={event.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:underline"><LinkIcon className="w-4 h-4" /> Visit Event Website</a>}
        </div>
        <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-between">
            <div className="flex items-center -space-x-2">
                {event.attendeeIds.slice(0, 3).map(id => <img key={id} src={`https://i.pravatar.cc/150?u=${id}`} className="w-8 h-8 rounded-full border-2 border-slate-800" alt="attendee" />)}
                {event.attendeeIds.length > 0 && <span className="text-xs pl-3 text-slate-400">{event.attendeeIds.length} attending</span>}
            </div>
            <button className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                I'm Attending
            </button>
        </div>
    </div>
);

const UpcomingEventsWidget: React.FC = () => {
    const { communityEvents } = useAuth();
    const upcoming = useMemo(() => {
        return communityEvents
            .filter(e => new Date(e.eventDate) > new Date())
            .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
            .slice(0, 3);
    }, [communityEvents]);

    return (
        <div className="glass-card p-4 space-y-4">
            <h3 className="font-bold text-white">Upcoming Events</h3>
            {upcoming.map(event => (
                <div key={event.id}>
                    <p className="text-xs text-slate-400">{new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    <p className="font-semibold text-slate-200 leading-tight">{event.title}</p>
                </div>
            ))}
        </div>
    );
};

const TrendingTopicsWidget: React.FC = () => {
    const { communityPosts } = useAuth();
    const topics = useMemo(() => {
        const tagCounts = communityPosts.flatMap(p => p.tags).reduce((acc, tag) => {
            acc[tag] = (acc[tag] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    }, [communityPosts]);

    return (
        <div className="glass-card p-4">
            <h3 className="font-bold text-white mb-3">Trending Topics</h3>
            <div className="flex flex-wrap gap-2">
                {topics.map(([tag]) => (
                     <button key={tag} className="text-sm bg-slate-700 text-slate-300 px-3 py-1 rounded-full hover:bg-slate-600">#{tag}</button>
                ))}
            </div>
        </div>
    );
}

const CommunityHome: React.FC = () => {
    const { communityPosts, communityEvents } = useAuth();
    const [activeView, setActiveView] = useState<'feed' | 'events' | LexiconCategory>('feed');
    
    const combinedFeed = useMemo(() => {
        const postsAsFeed = communityPosts.map(p => ({ ...p, feedType: 'post' as const, date: p.timestamp }));
        const eventsAsFeed = communityEvents.map(e => ({ ...e, feedType: 'event' as const, date: e.timestamp }));
        
        let filtered = [...postsAsFeed, ...eventsAsFeed];

        if (activeView !== 'feed' && activeView !== 'events') {
            filtered = postsAsFeed.filter(item => item.channel === activeView);
        } else if (activeView === 'events') {
            filtered = eventsAsFeed.sort((a,b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
        }

        if (activeView !== 'events') {
            filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }

        return filtered;
    }, [communityPosts, communityEvents, activeView]);

    const NavButton: React.FC<{ viewId: typeof activeView, icon: React.ReactNode, label: string }> = ({ viewId, icon, label }) => (
        <button onClick={() => setActiveView(viewId)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold transition-colors ${activeView === viewId ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-700/50'}`}>
            {icon}
            {label}
        </button>
    );

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <UsersIcon className="w-16 h-16 text-blue-500 mx-auto" />
                <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl mt-4">Community Hub</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-400">
                    Connect with peers, share knowledge, and discover events across the water industry.
                </p>
            </div>
            
            <div className="grid lg:grid-cols-12 gap-8">
                <aside className="lg:col-span-3 space-y-4">
                    <button className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        <PlusIcon className="w-5 h-5" /> Add Event
                    </button>
                    <div className="glass-card p-3 space-y-1">
                        <NavButton viewId="feed" icon={<UsersIcon className="w-5 h-5"/>} label="Community Feed" />
                        <NavButton viewId="events" icon={<CalendarDaysIcon className="w-5 h-5"/>} label="Events" />
                    </div>
                    <div className="glass-card p-3 space-y-1">
                        <p className="px-3 pt-2 pb-1 text-xs font-bold uppercase text-slate-400">Discussion Channels</p>
                        {Object.entries(lexiconCategoryNames).map(([key, name]) => (
                            <NavButton key={key} viewId={key as LexiconCategory} icon={<TagIcon className="w-5 h-5"/>} label={name} />
                        ))}
                    </div>
                </aside>

                <main className="lg:col-span-6 space-y-6">
                    {activeView === 'feed' && <CreatePost />}
                    {combinedFeed.length > 0 ? (
                        combinedFeed.map(item => {
                            if (item.feedType === 'post') {
                                return <PostCard key={item.id} post={item} />;
                            }
                            if (item.feedType === 'event') {
                                return <EventCard key={item.id} event={item} />;
                            }
                            return null;
                        })
                    ) : (
                        <div className="text-center py-20 glass-card">
                            <h3 className="text-xl font-semibold text-slate-300">No activity yet</h3>
                            <p className="text-slate-500 mt-2">Be the first to post in this channel!</p>
                        </div>
                    )}
                </main>

                <aside className="lg:col-span-3 space-y-6">
                    <UpcomingEventsWidget />
                    <TrendingTopicsWidget />
                </aside>
            </div>
        </div>
    );
};

export default CommunityHome;