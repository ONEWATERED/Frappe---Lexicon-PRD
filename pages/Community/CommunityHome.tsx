import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CommunityEvent, CommunityPost, LexiconCategory, lexiconCategoryNames, User } from '../../types';
import { 
    UsersIcon, 
    CalendarDaysIcon, 
    ChatBubbleOvalLeftEllipsisIcon, 
    PlusIcon, 
    MapPinIcon, 
    LinkIcon, 
    HeartIcon, 
    TagIcon,
    UserPlusIcon,
    CheckIcon,
    PaperAirplaneIcon,
    UserMinusIcon,
    XIcon,
    SparklesIcon,
    UserGroupIcon
} from '../../components/icons/Icons';
import { PROFESSIONAL_TIERS } from '../../data';

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

const MembersList: React.FC = () => {
    const { currentUser, getAllUsers } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [mentorshipFilter, setMentorshipFilter] = useState('all');
    const [onlineFilter, setOnlineFilter] = useState('all');

    const users = getAllUsers();

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            if (user.id === currentUser?.id) return false;

            const matchesSearch = searchTerm === '' || user.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesMentorship = mentorshipFilter === 'all' || user.mentorshipStatus === mentorshipFilter;
            const matchesOnline = onlineFilter === 'all' || (onlineFilter === 'online' ? user.isOnline : !user.isOnline);

            return matchesSearch && matchesMentorship && matchesOnline;
        });
    }, [users, currentUser, searchTerm, mentorshipFilter, onlineFilter]);

    const ConnectionButton: React.FC<{ user: User }> = ({ user }) => {
        const isConnected = currentUser?.connections?.includes(user.id);
        const isPendingOutgoing = currentUser?.pendingConnections?.outgoing.includes(user.id);
        const isPendingIncoming = currentUser?.pendingConnections?.incoming.includes(user.id);

        if (isConnected) {
            return (
                 <div className="flex items-center gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-slate-600 text-white font-semibold py-2 px-3 rounded-md text-sm hover:bg-slate-500">
                        <PaperAirplaneIcon className="w-4 h-4" /> Message
                    </button>
                     <button className="p-2 bg-slate-600 text-slate-300 rounded-md hover:bg-red-500/50 hover:text-red-300">
                        <UserMinusIcon className="w-4 h-4" />
                    </button>
                 </div>
            )
        }
        if (isPendingOutgoing) {
            return <button disabled className="w-full bg-slate-700 text-slate-400 font-semibold py-2 px-3 rounded-md text-sm cursor-not-allowed">Pending</button>
        }
        if (isPendingIncoming) {
            return (
                <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1 bg-green-500 text-white font-semibold py-2 px-3 rounded-md text-sm hover:bg-green-600">
                        <CheckIcon className="w-4 h-4" /> Accept
                    </button>
                    <button className="p-2 bg-slate-600 text-slate-300 rounded-md hover:bg-slate-500">
                        <XIcon className="w-4 h-4" />
                    </button>
                </div>
            )
        }
        return (
            <button className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white font-semibold py-2 px-3 rounded-md text-sm hover:bg-blue-600">
                <UserPlusIcon className="w-4 h-4" /> Connect
            </button>
        );
    };

    return (
        <div>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
                <input
                    type="search"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="md:col-span-1 bg-slate-700/50 border border-slate-600 rounded-lg p-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                 <select value={mentorshipFilter} onChange={e => setMentorshipFilter(e.target.value)} className="bg-slate-700/50 border border-slate-600 rounded-lg p-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="all">All Mentorship</option>
                    <option value="offering">Offering Mentorship</option>
                    <option value="seeking">Seeking Mentorship</option>
                 </select>
                 <select value={onlineFilter} onChange={e => setOnlineFilter(e.target.value)} className="bg-slate-700/50 border border-slate-600 rounded-lg p-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="all">All Members</option>
                    <option value="online">Online Now</option>
                    <option value="offline">Offline</option>
                 </select>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map(user => (
                    <div key={user.id} className="glass-card p-4 flex flex-col items-center text-center">
                        <div className="relative">
                            <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full border-2 border-slate-600" />
                            <span className={`absolute bottom-1 right-1 block h-4 w-4 rounded-full border-2 border-slate-800 ${user.isOnline ? 'bg-green-400' : 'bg-slate-500'}`}></span>
                        </div>
                        <Link to={`/profile/${user.id}`} className="font-bold text-lg text-white mt-3 hover:text-blue-400">{user.name}</Link>
                        <p className="text-sm text-slate-400">{PROFESSIONAL_TIERS.find(t => t.id === user.tierId)?.name}</p>
                        {user.mentorshipStatus !== 'none' && (
                             <div className={`mt-2 text-xs font-semibold px-2 py-1 rounded-full border ${
                                user.mentorshipStatus === 'offering' ? 'bg-purple-500/10 text-purple-300 border-purple-500/30' : 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                            }`}>
                                {user.mentorshipStatus === 'offering' ? 'Offering Mentorship' : 'Seeking Mentorship'}
                            </div>
                        )}
                        <div className="mt-4 w-full pt-3 border-t border-slate-700">
                            {currentUser && <ConnectionButton user={user} />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const MyNetworkWidget: React.FC = () => {
    const { currentUser, getUserById } = useAuth();
    if (!currentUser) return null;

    const incomingRequests = currentUser.pendingConnections?.incoming.map(id => getUserById(id)).filter(Boolean) as User[];

    return (
        <div className="glass-card p-4">
            <h3 className="font-bold text-white mb-3">My Network</h3>
            {incomingRequests.length > 0 && (
                <div className="space-y-3 mb-3">
                    <p className="text-xs font-semibold text-slate-300">Pending Invitations</p>
                    {incomingRequests.map(user => (
                        <div key={user.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                                <span className="text-sm font-semibold text-slate-200">{user.name}</span>
                            </div>
                            <div className="flex gap-1.5">
                                <button className="p-1.5 bg-green-500/20 text-green-300 rounded-full hover:bg-green-500/40"><CheckIcon className="w-4 h-4" /></button>
                                <button className="p-1.5 bg-slate-600 text-slate-300 rounded-full hover:bg-slate-500"><XIcon className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
             <Link to={`/profile/${currentUser.id}`} className="block w-full text-center bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">
                View My Connections ({currentUser.connections?.length || 0})
            </Link>
        </div>
    );
}

const FindMentorWidget: React.FC = () => {
    const { getAllUsers, currentUser } = useAuth();
    const mentors = useMemo(() => {
        return getAllUsers()
            .filter(u => u.mentorshipStatus === 'offering' && u.id !== currentUser?.id)
            .slice(0, 4);
    }, [getAllUsers, currentUser]);

    return (
        <div className="glass-card p-4 space-y-3">
             <h3 className="font-bold text-white">Find a Mentor</h3>
             {mentors.map(mentor => (
                 <Link to={`/profile/${mentor.id}`} key={mentor.id} className="flex items-center gap-3 p-2 -m-2 rounded-lg hover:bg-slate-700/50">
                     <img src={mentor.avatarUrl} alt={mentor.name} className="w-10 h-10 rounded-full" />
                     <div>
                        <p className="font-semibold text-slate-200 text-sm">{mentor.name}</p>
                        <p className="text-xs text-slate-400">{PROFESSIONAL_TIERS.find(t => t.id === mentor.tierId)?.name}</p>
                     </div>
                 </Link>
             ))}
        </div>
    );
};

const CommunityHome: React.FC = () => {
    const { communityPosts, communityEvents } = useAuth();
    const [activeView, setActiveView] = useState<string>('members');
    
    const combinedFeed = useMemo(() => {
        const postsAsFeed = communityPosts.map(p => ({ ...p, feedType: 'post' as const, date: p.timestamp }));
        const eventsAsFeed = communityEvents.map(e => ({ ...e, feedType: 'event' as const, date: e.timestamp }));
        
        if (activeView === 'events') {
             return eventsAsFeed.sort((a,b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
        }

        let filtered = postsAsFeed;
        if (activeView !== 'feed') {
            filtered = postsAsFeed.filter(item => item.channel === activeView);
        }

        return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [communityPosts, communityEvents, activeView]);

    const NavButton: React.FC<{ viewId: string, icon: React.ReactNode, label: string }> = ({ viewId, icon, label }) => (
        <button onClick={() => setActiveView(viewId)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold transition-colors ${activeView === viewId ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-700/50'}`}>
            {icon}
            {label}
        </button>
    );

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <UserGroupIcon className="w-16 h-16 text-blue-500 mx-auto" />
                <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl mt-4">Community Hub</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-400">
                    Connect with peers, share knowledge, and discover events across the water industry.
                </p>
            </div>
            
            <div className="grid lg:grid-cols-12 gap-8">
                <aside className="lg:col-span-3 space-y-4">
                    <div className="glass-card p-3 space-y-1">
                        <NavButton viewId="feed" icon={<UsersIcon className="w-5 h-5"/>} label="Community Feed" />
                        <NavButton viewId="members" icon={<UserGroupIcon className="w-5 h-5"/>} label="Members" />
                        <NavButton viewId="events" icon={<CalendarDaysIcon className="w-5 h-5"/>} label="Events" />
                    </div>
                    <div className="glass-card p-3 space-y-1">
                        <p className="px-3 pt-2 pb-1 text-xs font-bold uppercase text-slate-400">Discussion Channels</p>
                        {Object.entries(lexiconCategoryNames).map(([key, name]) => (
                            <NavButton key={key} viewId={key as LexiconCategory} icon={<TagIcon className="w-5 h-5"/>} label={name} />
                        ))}
                    </div>
                </aside>

                <main className="lg:col-span-6">
                    {activeView === 'feed' && <CreatePost />}
                    
                    {activeView === 'members' ? (
                        <MembersList />
                    ) : (combinedFeed.length > 0 ? (
                        <div className="space-y-6">
                            {combinedFeed.map(item => {
                                if ('feedType' in item && item.feedType === 'post') {
                                    return <PostCard key={item.id} post={item as CommunityPost} />;
                                }
                                if ('feedType' in item && item.feedType === 'event') {
                                    return <EventCard key={item.id} event={item as CommunityEvent} />;
                                }
                                // Handle cases where item is just a post without feedType
                                if ('author' in item) {
                                     return <PostCard key={item.id} post={item as CommunityPost} />;
                                }
                                return null;
                            })}
                        </div>
                        ) : (
                        <div className="text-center py-20 glass-card">
                            <h3 className="text-xl font-semibold text-slate-300">No activity yet</h3>
                            <p className="text-slate-500 mt-2">Be the first to post in this channel!</p>
                        </div>
                    ))}
                </main>

                <aside className="lg:col-span-3 space-y-6">
                    <MyNetworkWidget />
                    <FindMentorWidget />
                    <UpcomingEventsWidget />
                </aside>
            </div>
        </div>
    );
};

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
             <button className="w-full text-center bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors mt-2">
                View All Events
            </button>
        </div>
    );
};


export default CommunityHome;