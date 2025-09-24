import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CommunityEvent, CommunityPost, LexiconCategory, lexiconCategoryNames, User, Conversation, FeatureSuggestion } from '../../types';
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
    UserGroupIcon,
    InboxIcon,
    LightBulbIcon,
    ArrowLeftIcon,
    ArrowRightIcon
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

const EventsCalendar: React.FC = () => {
    const { communityEvents, currentUser } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState(communityEvents);

    const handleToggleRegistration = (eventId: string) => {
        if (!currentUser) return;

        setEvents(prevEvents => prevEvents.map(event => {
            if (event.id === eventId) {
                const isRegistered = event.registeredUserIds.includes(currentUser.id);
                const newRegisteredUserIds = isRegistered
                    ? event.registeredUserIds.filter(id => id !== currentUser.id)
                    : [...event.registeredUserIds, currentUser.id];
                return { ...event, registeredUserIds: newRegisteredUserIds };
            }
            return event;
        }));
    };

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    const startingDay = firstDayOfMonth.getDay();

    const eventsByDate = useMemo(() => {
        const map: { [key: string]: CommunityEvent[] } = {};
        events.forEach(event => {
            const date = new Date(event.eventDate).toDateString();
            if (!map[date]) {
                map[date] = [];
            }
            map[date].push(event);
        });
        return map;
    }, [events]);

    const selectedDayEvents = eventsByDate[selectedDate.toDateString()] || [];

    const changeMonth = (amount: number) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + amount);
            return newDate;
        });
    };

    const days = Array.from({ length: startingDay }).map((_, i) => (
        <div key={`empty-start-${i}`} className="border-r border-b border-slate-700/50"></div>
    ));

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const isToday = date.toDateString() === new Date().toDateString();
        const isSelected = date.toDateString() === selectedDate.toDateString();
        const hasEvents = !!eventsByDate[date.toDateString()];

        days.push(
            <div key={day} onClick={() => setSelectedDate(date)} className="border-r border-b border-slate-700/50 p-2 cursor-pointer hover:bg-slate-700/50 relative">
                <span className={`flex items-center justify-center h-8 w-8 rounded-full text-sm ${isToday ? 'bg-blue-500 text-white font-bold' : ''} ${isSelected ? 'ring-2 ring-blue-400' : ''}`}>
                    {day}
                </span>
                {hasEvents && <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full"></div>}
            </div>
        );
    }

    return (
        <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
                <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-slate-700"><ArrowLeftIcon className="w-5 h-5" /></button>
                <h2 className="text-xl font-bold text-white">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-slate-700"><ArrowRightIcon className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-7 text-center text-xs text-slate-400 border-t border-l border-slate-700/50">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="py-2 border-r border-b border-slate-700/50">{day}</div>
                ))}
                {days}
            </div>
            <div className="mt-6">
                <h3 className="font-bold text-white">Events for {selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
                <div className="mt-4 space-y-4">
                    {selectedDayEvents.length > 0 ? selectedDayEvents.map(event => {
                        const isRegistered = currentUser ? event.registeredUserIds.includes(currentUser.id) : false;
                        return (
                             <div key={event.id} className="bg-slate-800/50 p-4 rounded-lg">
                                <p className="text-xs font-bold uppercase text-purple-400">{event.type}</p>
                                <h4 className="font-bold text-slate-100 mt-1">{event.title}</h4>
                                <p className="text-sm text-slate-400 mt-1">{event.description}</p>
                                <div className="mt-2 text-xs text-slate-400 flex items-center gap-4">
                                     <span><MapPinIcon className="w-3 h-3 inline mr-1" />{event.location}</span>
                                     <span><UsersIcon className="w-3 h-3 inline mr-1" />{event.registeredUserIds.length} Registered</span>
                                </div>
                                <div className="mt-3">
                                    {event.isLive ? (
                                        <a href={event.joinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-1.5 px-3 rounded-md text-sm transition-colors">
                                            Join Live Session
                                        </a>
                                    ) : isRegistered ? (
                                        <button onClick={() => handleToggleRegistration(event.id)} className="inline-flex items-center gap-2 bg-slate-600 text-slate-300 font-semibold py-1.5 px-3 rounded-md text-sm">
                                            <CheckIcon className="w-4 h-4" /> Registered
                                        </button>
                                    ) : (
                                        <button onClick={() => handleToggleRegistration(event.id)} className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 px-3 rounded-md text-sm transition-colors">
                                            Register
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    }) : <p className="text-sm text-slate-500">No events scheduled for this day.</p>}
                </div>
            </div>
        </div>
    );
};

const AvatarCluster: React.FC<{ users: User[]; title: string; }> = ({ users, title }) => (
    <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <Link to="#" className="text-sm font-semibold text-blue-400 hover:underline">See All {users.length}</Link>
        </div>
        <div className="flex flex-wrap items-center -space-x-4">
            {users.slice(0, 15).map((user, index) => (
                <Link to={`/profile/${user.id}`} key={user.id} title={user.name}>
                    <img 
                        className="w-16 h-16 rounded-full object-cover border-4 border-slate-800 hover:border-blue-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 z-10 hover:z-20"
                        src={user.avatarUrl} 
                        alt={user.name}
                        style={{ zIndex: users.length - index }} 
                    />
                </Link>
            ))}
            {users.length > 15 && (
                 <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center border-4 border-slate-800 text-sm font-bold text-slate-300">
                    +{users.length - 15}
                </div>
            )}
        </div>
    </div>
);

const MembersExploreView: React.FC = () => {
    const { currentUser, getAllUsers } = useAuth();
    const allUsers = getAllUsers();

    const newMembersThisWeek = useMemo(() => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return allUsers.filter(user => user.joinDate && new Date(user.joinDate) >= oneWeekAgo);
    }, [allUsers]);

    const membersNearYou = useMemo(() => {
        if (!currentUser?.location) return [];
        return allUsers.filter(user => user.id !== currentUser.id && user.location?.state === currentUser.location?.state);
    }, [allUsers, currentUser]);

    const onlineNow = useMemo(() => {
        return allUsers.filter(user => user.isOnline);
    }, [allUsers]);

    return (
        <div>
            {newMembersThisWeek.length > 0 && <AvatarCluster users={newMembersThisWeek} title="New Members This Week" />}
            {membersNearYou.length > 0 && <AvatarCluster users={membersNearYou} title="Members Near You" />}
            {onlineNow.length > 0 && <AvatarCluster users={onlineNow} title="Online Now" />}
        </div>
    );
};


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
                    <Link to={`/community/messages/${user.id}`} className="flex-1 flex items-center justify-center gap-2 bg-slate-600 text-white font-semibold py-2 px-3 rounded-md text-sm hover:bg-slate-500">
                        <PaperAirplaneIcon className="w-4 h-4" /> Message
                    </Link>
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

const statusStyles: Record<FeatureSuggestion['status'], { bg: string, text: string, border: string }> = {
    'Under Consideration': { bg: 'bg-slate-600/50', text: 'text-slate-300', border: 'border-slate-500' },
    'Planned': { bg: 'bg-purple-500/10', text: 'text-purple-300', border: 'border-purple-500/30' },
    'In Progress': { bg: 'bg-blue-500/10', text: 'text-blue-300', border: 'border-blue-500/30' },
    'Shipped': { bg: 'bg-green-500/10', text: 'text-green-300', border: 'border-green-500/30' },
};

const FeatureSuggestionCard: React.FC<{ suggestion: FeatureSuggestion }> = ({ suggestion }) => {
    const { currentUser } = useAuth();
    const [upvoted, setUpvoted] = useState(currentUser ? suggestion.upvoteUserIds.includes(currentUser.id) : false);
    const [voteCount, setVoteCount] = useState(suggestion.upvoteUserIds.length);

    const handleUpvote = () => {
        if (upvoted) {
            setVoteCount(prev => prev - 1);
        } else {
            setVoteCount(prev => prev + 1);
        }
        setUpvoted(!upvoted);
    };
    
    const statusStyle = statusStyles[suggestion.status];

    return (
        <div className="glass-card p-6 flex flex-col h-full">
            <div className="flex justify-between items-start gap-4">
                <h3 className="text-lg font-bold text-white flex-grow">{suggestion.title}</h3>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full border whitespace-nowrap ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                    {suggestion.status}
                </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
                <img src={suggestion.submittedBy.avatarUrl} alt={suggestion.submittedBy.name} className="w-6 h-6 rounded-full" />
                <p className="text-xs text-slate-400">Suggested by {suggestion.submittedBy.name}</p>
            </div>
            <p className="text-sm text-slate-300 mt-4 flex-grow">{suggestion.description}</p>
             <div className="mt-4 flex flex-wrap gap-2">
                {suggestion.tags.map(tag => (
                    <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{tag}</span>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between gap-4">
                <button 
                    onClick={handleUpvote} 
                    className={`flex items-center gap-2 text-sm font-semibold py-2 px-4 rounded-lg transition-colors ${upvoted ? 'bg-yellow-400/10 text-yellow-300' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                    <LightBulbIcon className="w-5 h-5" />
                    <span>{voteCount}</span>
                </button>
                 <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400">
                    <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5"/> {suggestion.comments.length} Comments
                 </button>
            </div>
        </div>
    );
};

const OraKLESLabs: React.FC = () => {
    const { featureSuggestions } = useAuth();
    const [sortOrder, setSortOrder] = useState<'trending' | 'newest'>('trending');
    const [showForm, setShowForm] = useState(false);

    const sortedSuggestions = useMemo(() => {
        const sorted = [...featureSuggestions];
        if (sortOrder === 'trending') {
            return sorted.sort((a, b) => b.upvoteUserIds.length - a.upvoteUserIds.length);
        }
        return sorted.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }, [featureSuggestions, sortOrder]);

    return (
        <div>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                         <h2 className="text-2xl font-bold text-white">ORAKLES Labs</h2>
                         <p className="text-slate-400 mt-1">Help shape the future of ORAKLES. Suggest and vote on new features.</p>
                    </div>
                    <button onClick={() => setShowForm(!showForm)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded-lg transition-colors w-full md:w-auto">
                        {showForm ? 'Cancel' : 'Suggest a Feature'}
                    </button>
                </div>
                {showForm && (
                    <form className="mt-6 border-t border-slate-700 pt-6 space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-slate-300" htmlFor="feat-title">Feature Title</label>
                            <input type="text" id="feat-title" placeholder="e.g., AI-Powered Resume Builder" className="w-full mt-1 bg-slate-700 text-white placeholder-slate-400 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-slate-300" htmlFor="feat-desc">Why is this needed?</label>
                            <textarea id="feat-desc" rows={4} placeholder="Describe the feature and the problem it solves for the community..." className="w-full mt-1 bg-slate-700 text-white placeholder-slate-400 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <div className="text-right">
                             <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">Submit Idea</button>
                        </div>
                    </form>
                )}
            </div>

            <div className="flex justify-end items-center gap-2 mb-6">
                <span className="text-sm font-semibold text-slate-400">Sort by:</span>
                <button onClick={() => setSortOrder('trending')} className={`px-4 py-1.5 rounded-full text-sm font-semibold ${sortOrder === 'trending' ? 'bg-slate-600 text-white' : 'bg-slate-700 text-slate-300'}`}>Trending</button>
                <button onClick={() => setSortOrder('newest')} className={`px-4 py-1.5 rounded-full text-sm font-semibold ${sortOrder === 'newest' ? 'bg-slate-600 text-white' : 'bg-slate-700 text-slate-300'}`}>Newest</button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {sortedSuggestions.map(suggestion => <FeatureSuggestionCard key={suggestion.id} suggestion={suggestion} />)}
            </div>
        </div>
    );
};

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

const MyMessagesWidget: React.FC = () => {
    const { currentUser, conversations, getUserById } = useAuth();
    if (!currentUser) return null;

    const myConversations = conversations.filter(c => c.participantIds.includes(currentUser.id));
    
    const getOtherParticipant = (convo: Conversation) => {
        const otherId = convo.participantIds.find(id => id !== currentUser.id);
        return getUserById(otherId || '');
    };

    return (
        <div className="glass-card p-4 space-y-3">
            <h3 className="font-bold text-white">My Messages</h3>
            {myConversations.slice(0, 3).map(convo => {
                const otherUser = getOtherParticipant(convo);
                const lastMessage = convo.messages[convo.messages.length - 1];
                if (!otherUser || !lastMessage) return null;

                const isUnread = !lastMessage.isRead && lastMessage.fromUserId !== currentUser.id;

                return (
                    <Link to={`/community/messages/${otherUser.id}`} key={convo.id} className="flex items-center gap-3 p-2 -m-2 rounded-lg hover:bg-slate-700/50 relative">
                        <img src={otherUser.avatarUrl} alt={otherUser.name} className="w-10 h-10 rounded-full" />
                        <div className="flex-grow overflow-hidden">
                           <p className={`font-semibold text-slate-200 text-sm ${isUnread ? 'text-white' : 'text-slate-300'}`}>{otherUser.name}</p>
                           <p className={`text-xs truncate ${isUnread ? 'text-slate-200' : 'text-slate-400'}`}>{lastMessage.content}</p>
                        </div>
                        {isUnread && <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-blue-500 rounded-full"></div>}
                    </Link>
                );
            })}
             <Link to="/community/messages" className="block w-full text-center bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">
                View All Messages
            </Link>
        </div>
    );
};

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

interface NewMembersWidgetProps {
    setActiveView: (view: string) => void;
}

const NewMembersWidget: React.FC<NewMembersWidgetProps> = ({ setActiveView }) => {
    const { getAllUsers } = useAuth();

    const newMembers = useMemo(() => {
        const allUsers = getAllUsers();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        return allUsers
            .filter(user => user.joinDate && new Date(user.joinDate) >= oneWeekAgo)
            .sort((a, b) => new Date(b.joinDate!).getTime() - new Date(a.joinDate!).getTime());
    }, [getAllUsers]);

    if (newMembers.length === 0) {
        return null;
    }

    return (
        <div className="glass-card p-4">
            <h3 className="font-bold text-white mb-3">👋 Welcome New Members</h3>
            <div className="space-y-3">
                {newMembers.slice(0, 5).map(member => (
                    <Link to={`/profile/${member.id}`} key={member.id} className="flex items-center gap-3 p-2 -m-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                        <img src={member.avatarUrl} alt={member.name} className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="font-semibold text-slate-200 text-sm">{member.name}</p>
                            <p className="text-xs text-slate-400">{getTimeAgo(member.joinDate!)}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <button 
                onClick={() => setActiveView('members')}
                className="w-full text-center bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors mt-4"
            >
                View All Members
            </button>
        </div>
    );
};


const CommunityHome: React.FC = () => {
    const { communityPosts } = useAuth();
    const [activeView, setActiveView] = useState<string>('labs');
    const [memberViewTab, setMemberViewTab] = useState<'explore' | 'all'>('explore');
    
    const combinedFeed = useMemo(() => {
        const postsAsFeed = communityPosts.map(p => ({ ...p, feedType: 'post' as const, date: p.timestamp }));
        
        let filtered = postsAsFeed;
        if (activeView !== 'feed') {
            filtered = postsAsFeed.filter(item => item.channel === activeView);
        }

        return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [communityPosts, activeView]);

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
                    Connect with peers, shape our roadmap, and discover events across the water industry.
                </p>
            </div>
            
            <div className="grid lg:grid-cols-12 gap-8">
                <aside className="lg:col-span-3 space-y-4">
                    <div className="glass-card p-3 space-y-1">
                        <NavButton viewId="labs" icon={<SparklesIcon className="w-5 h-5 text-yellow-400"/>} label="ORAKLES Labs" />
                        <NavButton viewId="feed" icon={<UsersIcon className="w-5 h-5"/>} label="Community Feed" />
                        <NavButton viewId="members" icon={<UserGroupIcon className="w-5 h-5"/>} label="Members" />
                        <NavButton viewId="events" icon={<CalendarDaysIcon className="w-5 h-5"/>} label="Events" />
                        <Link to="/community/messages" className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold transition-colors text-slate-300 hover:bg-slate-700/50`}>
                            <InboxIcon className="w-5 h-5"/>
                            Messages
                        </Link>
                    </div>
                    <div className="glass-card p-3 space-y-1">
                        <p className="px-3 pt-2 pb-1 text-xs font-bold uppercase text-slate-400">Discussion Channels</p>
                        {Object.entries(lexiconCategoryNames).map(([key, name]) => (
                            <NavButton key={key} viewId={key as LexiconCategory} icon={<TagIcon className="w-5 h-5"/>} label={name} />
                        ))}
                    </div>
                </aside>

                <main className="lg:col-span-6">
                    {activeView === 'labs' ? (
                        <OraKLESLabs />
                    ) : activeView === 'members' ? (
                        <div>
                            <div className="flex items-center gap-2 border-b border-slate-700 mb-6">
                                <button 
                                    onClick={() => setMemberViewTab('explore')}
                                    className={`px-4 py-2 text-sm font-semibold rounded-t-md transition-colors ${memberViewTab === 'explore' ? 'bg-slate-800/50 text-white' : 'text-slate-400 hover:bg-slate-800/20'}`}
                                >
                                    Explore
                                </button>
                                <button 
                                    onClick={() => setMemberViewTab('all')}
                                    className={`px-4 py-2 text-sm font-semibold rounded-t-md transition-colors ${memberViewTab === 'all' ? 'bg-slate-800/50 text-white' : 'text-slate-400 hover:bg-slate-800/20'}`}
                                >
                                    All Members
                                </button>
                            </div>
                            {memberViewTab === 'explore' ? <MembersExploreView /> : <MembersList />}
                        </div>
                    ) : activeView === 'events' ? (
                        <EventsCalendar />
                    ) : (
                        <>
                            {activeView === 'feed' && <CreatePost />}
                            {combinedFeed.length > 0 ? (
                                <div className="space-y-6">
                                    {combinedFeed.map(item => (
                                         <PostCard key={item.id} post={item as CommunityPost} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 glass-card">
                                    <h3 className="text-xl font-semibold text-slate-300">No activity yet</h3>
                                    <p className="text-slate-500 mt-2">Be the first to post in this channel!</p>
                                </div>
                            )}
                        </>
                    )}
                </main>

                <aside className="lg:col-span-3 space-y-6">
                    <NewMembersWidget setActiveView={setActiveView} />
                    <MyNetworkWidget />
                    <MyMessagesWidget />
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