import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { VendorResource, VendorContact, JobPosting, VisitorLog, User, Manual, EcosystemEntity, BlogPost, DroobiVideo, FlashcardDeck } from '../../types';
import { 
    BriefcaseIcon, ArrowDownTrayIcon, EyeIcon, LinkIcon, MapPinIcon, GlobeAltIcon, UsersIcon, CheckBadgeIcon, SparklesIcon, CalendarDaysIcon, ChatBubbleLeftRightIcon, AcademicCapIcon, ClockIcon, ArrowLeftIcon, ChevronDownIcon 
} from '../../components/icons/Icons';
import VideoPlayer from '../../components/VideoPlayer';

// --- Reusable Helper Components ---

const EmptyContent: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-center py-16 px-6 glass-card rounded-lg">
        <p className="text-slate-400">{message}</p>
    </div>
);

const ActionButton: React.FC<{ href?: string; children: React.ReactNode; className?: string; title?: string }> = ({ href, children, className, title }) => {
    const isDisabled = !href || href === '#';
    const finalClassName = `w-full font-semibold px-2 py-1 rounded-md text-xs transition-colors flex items-center justify-center gap-1 ${className} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`;

    return (
        <a 
            href={href || '#'} 
            aria-disabled={isDisabled}
            onClick={(e) => { if (isDisabled) e.preventDefault(); }}
            title={isDisabled ? (title || 'Coming soon') : ''}
            className={finalClassName}
        >
            {children}
        </a>
    );
};

// --- Microsite Sub-components ---

const ContactCard: React.FC<{ contact: VendorContact }> = ({ contact }) => (
    <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
            <img src={contact.avatarUrl} alt={contact.name} className="w-16 h-16 rounded-full" />
            <span className={`absolute bottom-0 right-0 block h-4 w-4 rounded-full border-2 border-slate-800 ${contact.online ? 'bg-green-400' : 'bg-slate-500'}`}></span>
        </div>
        <div>
            <p className="font-bold text-white">{contact.name}</p>
            <p className="text-sm text-slate-400">{contact.title}</p>
            <a href={`mailto:${contact.email}`} className="text-xs text-blue-400 hover:underline">{contact.email}</a>
            <div className="mt-2 flex flex-col sm:flex-row gap-2">
                <ActionButton href={contact.online ? contact.chatUrl : undefined} className="bg-green-500 hover:bg-green-600 text-white" title="Live chat coming soon">
                    <ChatBubbleLeftRightIcon className="w-3 h-3" /> Chat Now
                </ActionButton>
                <ActionButton href={contact.calendarUrl} className="bg-slate-600 hover:bg-slate-500 text-white" title="Scheduling link not available">
                    <CalendarDaysIcon className="w-3 h-3" /> Schedule
                </ActionButton>
            </div>
        </div>
    </div>
);

const ResourceCard: React.FC<{ resource: VendorResource }> = ({ resource }) => (
    <div className="glass-card p-4 flex flex-col h-full">
        <p className="text-xs font-semibold text-purple-400">{resource.type}</p>
        <h4 className="font-semibold text-slate-100 mt-1">{resource.title}</h4>
        <p className="text-sm text-slate-400 mt-2 flex-grow">{resource.description}</p>
        <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-between text-xs">
            <div className="flex items-center gap-4 text-slate-400">
                <span className="flex items-center gap-1"><EyeIcon className="w-4 h-4"/>{resource.views}</span>
                <span className="flex items-center gap-1"><ArrowDownTrayIcon className="w-4 h-4"/>{resource.downloads}</span>
            </div>
            <a href={resource.fileUrl} download className="font-semibold text-blue-400 hover:text-blue-300">Download</a>
        </div>
    </div>
);

const JobPostingCard: React.FC<{ job: JobPosting }> = ({ job }) => (
    <div className="glass-card p-6">
        <div className="flex justify-between items-start">
            <div>
                <h4 className="font-bold text-slate-100 text-lg">{job.title}</h4>
                <p className="text-sm text-slate-400">{job.location}</p>
            </div>
            <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{job.type}</span>
        </div>
        <p className="text-sm text-slate-300 mt-3">{job.description}</p>
        <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">Apply Now</a>
    </div>
);

const ManualCard: React.FC<{ manual: Manual }> = ({ manual }) => (
    <Link to={`/manual/${manual.id}`} className="glass-card p-4 flex gap-4 items-center group h-full">
        <img src={manual.coverImageUrl} alt={manual.title} className="w-20 h-28 object-cover rounded-md flex-shrink-0" />
        <div>
            <p className="text-xs font-semibold uppercase text-blue-400">{manual.assetType}</p>
            <h4 className="font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">{manual.title}</h4>
            <p className="text-xs text-slate-500 font-mono mt-1">Model: {manual.modelNumber}</p>
        </div>
    </Link>
);

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
    <Link to={`/insights/${post.id}`} className="block group glass-card rounded-xl overflow-hidden h-full flex flex-col">
        <div className="aspect-video bg-slate-800 overflow-hidden">
            <img src={post.heroImageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors duration-300 flex-grow">{post.title}</h3>
            <div className="mt-2 flex items-center gap-1 text-slate-400 text-xs">
                <ClockIcon className="w-3 h-3" />
                <span>{post.readTimeMinutes} min read</span>
            </div>
        </div>
    </Link>
);

const VideoCard: React.FC<{ video: DroobiVideo }> = ({ video }) => (
    <Link to={`/video/${video.id}`} className="block group glass-card rounded-xl overflow-hidden h-full flex flex-col">
        <div className="aspect-video bg-slate-800 overflow-hidden relative">
            <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
             <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors duration-300 flex-grow">{video.title}</h3>
            <div className="mt-2 flex items-center gap-1 text-slate-400 text-xs">
                <ClockIcon className="w-3 h-3" />
                <span>{video.durationMinutes} min</span>
            </div>
        </div>
    </Link>
);

const AcademyContributorBadge: React.FC<{ sponsoredDecks: FlashcardDeck[] }> = ({ sponsoredDecks }) => {
    if (!sponsoredDecks || sponsoredDecks.length === 0) return null;
    return (
        <div className="glass-card p-6">
            <div className="flex items-center gap-3">
                <AcademicCapIcon className="w-8 h-8 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Academy Contributor</h3>
            </div>
            <p className="text-sm text-slate-400 mt-3">This partner contributes valuable knowledge to the oraKLES Academy by sponsoring the following decks:</p>
            <ul className="mt-2 space-y-2">
                {sponsoredDecks.map(deck => (
                    <li key={deck.id}>
                        <Link to={`/academy/deck/${deck.id}`} className="text-sm text-blue-400 hover:underline font-semibold">
                            {deck.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const SponsorshipShowcase: React.FC<{ sponsorships?: EcosystemEntity['sponsorships'] }> = ({ sponsorships }) => {
    if (!sponsorships || sponsorships.length === 0) return null;
    return (
        <div className="glass-card p-6">
            <div className="flex items-center gap-3">
                <SparklesIcon className="w-8 h-8 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Platform Sponsor</h3>
            </div>
            {sponsorships.map(spon => (
                <div key={spon.feature} className="mt-3">
                    <p className="font-semibold text-purple-300">{spon.feature}</p>
                    <p className="text-sm text-slate-400">{spon.description}</p>
                </div>
            ))}
        </div>
    );
};

const AnalyticsDashboard: React.FC<{ logs: VisitorLog[], getUserById: (id: string) => User | undefined }> = ({ logs, getUserById }) => (
    <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">Visitor Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-4"><p className="text-slate-400 text-sm">Total Visitors</p><p className="text-2xl font-bold text-white">{logs.length}</p></div>
            <div className="glass-card p-4"><p className="text-slate-400 text-sm">Total Page Visits</p><p className="text-2xl font-bold text-white">{logs.reduce((sum, l) => sum + l.totalVisits, 0)}</p></div>
            <div className="glass-card p-4"><p className="text-slate-400 text-sm">Total Downloads</p><p className="text-2xl font-bold text-white">{logs.reduce((sum, l) => sum + l.downloads, 0)}</p></div>
        </div>
        <div>
            <h4 className="font-semibold text-slate-200 mb-2">Recent Visitors</h4>
            <div className="glass-card p-4">
                <div className="space-y-3">
                    {logs.map(log => {
                        const user = getUserById(log.userId);
                        if (!user) return null;
                        return (
                            <div key={log.userId} className="flex items-center justify-between p-2 bg-slate-800/50 rounded-md">
                                <div className="flex items-center gap-3">
                                    <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full"/>
                                    <div>
                                        <Link to={`/profile/${user.id}`} className="font-semibold text-slate-200 hover:underline">{user.name}</Link>
                                        <p className="text-xs text-slate-400">{user.email}</p>
                                    </div>
                                </div>
                                <div className="text-right text-xs text-slate-400">
                                    <p>Last visit: {new Date(log.lastVisit).toLocaleDateString()}</p>
                                    <p>{log.totalVisits} visits, {log.downloads} downloads</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
);

const UnclaimedProfileView: React.FC<{ entity: EcosystemEntity }> = ({ entity }) => (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
            <Link to="/ecosystem" className="text-sm text-blue-400 hover:underline">
                &larr; Back to Partners Directory
            </Link>
        </div>
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 text-center">
            <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center p-2 mx-auto">
                <img src={entity.logoUrl} alt={`${entity.name} logo`} className="max-w-full max-h-full object-contain" />
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-4">{entity.name}</h1>
            <p className="text-lg text-slate-300 mt-1">{entity.tagline}</p>
        </div>
        <div className="relative mt-8">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center p-8 rounded-2xl">
                <h2 className="text-3xl font-bold text-white">This Profile is Unclaimed</h2>
                <p className="mt-2 text-slate-300 max-w-md">Are you an official representative of {entity.name}? Claim this profile to unlock your micro-site, add contacts, post jobs, and engage with the oraKLES community.</p>
                <button onClick={() => alert(`This would start the verification process to claim the profile for ${entity.name}.`)} className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg flex items-center gap-2">
                    <CheckBadgeIcon className="w-6 h-6" />
                    Claim This Profile
                </button>
            </div>
            <div className="opacity-20 pointer-events-none">
                <div className="space-y-8 glass-card p-8 rounded-2xl">
                    <div>
                        <h3 className="text-2xl font-bold text-white">About {entity.name}</h3>
                        <p className="mt-2 text-slate-300">Claim this profile to add a detailed company description, showcase your services, and share future offerings with the water industry's top professionals. This section will become a rich overview of your organization's mission and capabilities.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const VideoModal: React.FC<{ videoUrl: string, onClose: () => void }> = ({ videoUrl, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true">
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg" onClick={(e) => e.stopPropagation()}>
                <VideoPlayer src={videoUrl} autoPlay controls />
            </div>
        </div>
    );
};


const EntityProfile: React.FC = () => {
    const { entityId, vendorId } = useParams<{ entityId?: string, vendorId?: string }>();
    const { ecosystemEntities, currentUser, getUserById, manuals, blogPosts, droobiVideos, flashcardDecks } = useAuth();
    const id = entityId || vendorId;
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('about');
    const [resourceFilter, setResourceFilter] = useState('All');
    
    const entity = ecosystemEntities.find(e => e.id === id);

    const vendorManuals = useMemo(() => manuals.filter(m => m.vendorId === id), [manuals, id]);
    const vendorBlogPosts = useMemo(() => blogPosts.filter(p => p.vendorId === id), [blogPosts, id]);
    const vendorVideos = useMemo(() => droobiVideos.filter(v => v.vendorId === id), [droobiVideos, id]);
    const sponsoredDecks = useMemo(() => flashcardDecks.filter(d => d.sponsorship?.sponsor_id === id), [flashcardDecks, id]);

    if (!entity) {
        return (
          <div className="text-center py-20 text-white">
            <h1 className="text-2xl">Entity not found.</h1>
            <Link to="/ecosystem" className="text-blue-400 hover:underline mt-4 inline-block">Back to Partners Directory</Link>
          </div>
        );
    }

    if (!entity.isClaimed) {
        return <UnclaimedProfileView entity={entity} />;
    }
    
    const showAnalytics = entity.isClaimed && currentUser?.id === entity.claimedByUserId;
    const resourceCategories = useMemo(() => ['All', ...new Set(entity.resources?.map(r => r.category) || [])], [entity.resources]);
    const filteredResources = useMemo(() => {
        if (resourceFilter === 'All') return entity.resources || [];
        return entity.resources?.filter(r => r.category === resourceFilter) || [];
    }, [entity.resources, resourceFilter]);

    const hasContacts = entity.contacts && entity.contacts.length > 0;
    const hero = entity.hero;
    const hasVideo = !!hero?.videoUrl;

    const TabButton: React.FC<{ tabId: string, label: string }> = ({ tabId, label }) => (
        <button
            onClick={() => setActiveTab(tabId)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === tabId ? 'bg-blue-500 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-slate-900">
            <Link to="/ecosystem" className="absolute top-6 left-6 z-30 flex items-center gap-2 text-sm text-white bg-black/30 px-3 py-2 rounded-lg hover:bg-black/50 transition-colors">
                <ArrowLeftIcon className="w-4 h-4" />
                Back to All Partners
            </Link>
            
            {!hero ? (
                <div className="h-64 bg-slate-800 flex flex-col items-center justify-center text-center p-4">
                    <h1 className="text-4xl font-extrabold text-white">{entity.name}</h1>
                    <p className="text-lg text-slate-300 mt-2">{entity.tagline}</p>
                </div>
            ) : (
                <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
                    <div className="absolute inset-0 z-0 bg-slate-900">
                        {hero.videoUrl ? (
                            <VideoPlayer src={hero.videoUrl} poster={hero.posterImage} autoPlay loop muted controls={false} />
                        ) : hero.posterImage ? (
                            <img src={hero.posterImage} alt={`${entity.name} background`} className="w-full h-full object-cover" />
                        ) : null}
                         <div className="absolute inset-0 bg-black/50"></div>
                    </div>
                    <div className="relative z-10 flex flex-col items-center p-8 max-w-3xl">
                        <img src={entity.logoUrl} alt={`${entity.name} logo`} className="w-32 h-32 object-contain mb-4" />
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            {entity.tagline}
                        </h1>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => hasVideo && setIsModalOpen(true)}
                                disabled={!hasVideo}
                                aria-disabled={!hasVideo}
                                aria-label={hero.primaryCta?.label || "Watch Our Story"}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
                            >
                                {hero.primaryCta?.label || 'Watch Our Story'}
                            </button>
                            <a
                                href={hasContacts ? '#team' : undefined}
                                onClick={(e) => !hasContacts && e.preventDefault()}
                                aria-disabled={!hasContacts}
                                aria-label={hero.secondaryCta?.label || "Meet Our Team"}
                                className={`bg-white/20 hover:bg-white/30 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg ${!hasContacts ? 'pointer-events-none' : ''}`}
                            >
                                {hero.secondaryCta?.label || 'Meet Our Team'}
                            </a>
                        </div>
                    </div>
                    <a href="#main-content" aria-label="Scroll to main content" className="absolute bottom-8 z-10 animate-bounce">
                        <ChevronDownIcon className="w-8 h-8"/>
                    </a>
                </section>
            )}

            {isModalOpen && hero?.videoUrl && <VideoModal videoUrl={hero.videoUrl} onClose={() => setIsModalOpen(false)} />}

            <div id="main-content" className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8">
                <aside id="team" className="lg:col-span-4 xl:col-span-3 space-y-6 self-start lg:sticky top-24">
                     <div className="glass-card p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Key Contacts</h3>
                        {entity.contacts && entity.contacts.length > 0 ? (
                            <div className="space-y-6">
                                {entity.contacts.map(contact => <ContactCard key={contact.id} contact={contact}/>)}
                            </div>
                        ) : (
                             <p className="text-sm text-slate-400">Contact information is not available.</p>
                        )}
                    </div>
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Information</h3>
                        <div className="space-y-2 text-sm text-slate-300">
                             {entity.location && <p className="flex items-center gap-2"><MapPinIcon className="w-4 h-4 text-slate-500"/>{entity.location}</p>}
                             {entity.domain && <a href={`http://${entity.domain}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:underline"><GlobeAltIcon className="w-4 h-4"/>{entity.domain}</a>}
                        </div>
                    </div>
                    <SponsorshipShowcase sponsorships={entity.sponsorships} />
                    <AcademyContributorBadge sponsoredDecks={sponsoredDecks} />
                </aside>
                <main className="lg:col-span-8 xl:col-span-9">
                    <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-4">
                        <TabButton tabId="about" label="About" />
                        <TabButton tabId="insights" label="Insights" />
                        <TabButton tabId="videos" label="Videos" />
                        <TabButton tabId="resources" label="Resources" />
                        <TabButton tabId="manuals" label="O&M Manuals" />
                        <TabButton tabId="careers" label="Careers" />
                        {showAnalytics && <TabButton tabId="analytics" label="Analytics" />}
                    </div>

                    <div className="mt-4">
                        {activeTab === 'about' && (
                            <div className="space-y-8">
                                {(!entity.longDescription && (!entity.services || entity.services.length === 0) && (!entity.futureOfferings || entity.futureOfferings.length === 0)) ? (
                                    <EmptyContent message={`More information about ${entity.name} is coming soon.`} />
                                ) : (
                                    <>
                                        {entity.longDescription && (
                                            <div>
                                                <h3 className="text-2xl font-bold text-white">About {entity.name}</h3>
                                                <p className="mt-2 text-slate-300 whitespace-pre-line">{entity.longDescription}</p>
                                            </div>
                                        )}
                                        {entity.services && entity.services.length > 0 && (
                                            <div>
                                                <h3 className="text-2xl font-bold text-white">Services</h3>
                                                <div className="mt-4 space-y-4">
                                                    {entity.services.map(service => (
                                                        <div key={service.title} className="glass-card p-4">
                                                            <h4 className="font-semibold text-slate-100">{service.title}</h4>
                                                            <p className="text-sm text-slate-400">{service.description}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {entity.futureOfferings && entity.futureOfferings.length > 0 && (
                                            <div>
                                                <h3 className="text-2xl font-bold text-white">Coming Soon</h3>
                                                <div className="mt-4 space-y-4">
                                                    {entity.futureOfferings.map(offering => (
                                                        <div key={offering.title} className="glass-card p-4">
                                                            <h4 className="font-semibold text-slate-100">{offering.title}</h4>
                                                            <p className="text-sm text-slate-400">{offering.description}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                        {activeTab === 'insights' && (
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-4">Insights from {entity.name}</h3>
                                {vendorBlogPosts.length > 0 ? (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {vendorBlogPosts.map(post => <BlogCard key={post.id} post={post}/>)}
                                    </div>
                                ) : (
                                    <EmptyContent message="No insights from this partner yet." />
                                )}
                            </div>
                        )}
                         {activeTab === 'videos' && (
                             <div>
                                <h3 className="text-2xl font-bold text-white mb-4">Videos from {entity.name}</h3>
                                {vendorVideos.length > 0 ? (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {vendorVideos.map(video => <VideoCard key={video.id} video={video}/>)}
                                    </div>
                                ) : (
                                    <EmptyContent message="No videos from this partner yet." />
                                )}
                            </div>
                        )}
                        {activeTab === 'resources' && (
                             <div>
                                <h3 className="text-2xl font-bold text-white mb-4">Resource Library</h3>
                                {(entity.resources && entity.resources.length > 0) ? (
                                    <>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {resourceCategories.map(cat => (
                                                <button key={cat} onClick={() => setResourceFilter(cat)} className={`px-3 py-1 text-sm rounded-full ${resourceFilter === cat ? 'bg-purple-500 text-white font-semibold' : 'bg-slate-700 text-slate-300'}`}>{cat}</button>
                                            ))}
                                        </div>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {filteredResources.map(res => <ResourceCard key={res.id} resource={res}/>)}
                                        </div>
                                    </>
                                ) : (
                                    <EmptyContent message="No resources are available at this time." />
                                )}
                            </div>
                        )}
                         {activeTab === 'manuals' && (
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-4">O&M Manuals</h3>
                                {vendorManuals.length > 0 ? (
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {vendorManuals.map(man => <ManualCard key={man.id} manual={man}/>)}
                                    </div>
                                ) : (
                                    <EmptyContent message="No manuals from this partner have been added yet." />
                                )}
                            </div>
                         )}
                         {activeTab === 'careers' && (
                             <div>
                                <h3 className="text-2xl font-bold text-white mb-4">Current Openings</h3>
                                {(entity.jobPostings && entity.jobPostings.length > 0) ? (
                                    <div className="space-y-4">
                                        {entity.jobPostings.map(job => <JobPostingCard key={job.id} job={job}/>)}
                                    </div>
                                ) : (
                                    <EmptyContent message="There are no current openings." />
                                )}
                            </div>
                         )}
                        {activeTab === 'analytics' && showAnalytics && <AnalyticsDashboard logs={entity.visitorLogs || []} getUserById={getUserById}/>}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default EntityProfile;