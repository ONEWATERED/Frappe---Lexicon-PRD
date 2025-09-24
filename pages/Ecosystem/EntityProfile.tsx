import React, { useState, useMemo, useEffect, FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { VendorResource, VendorContact, JobPosting, VisitorLog, User, Manual, EcosystemEntity, BlogPost, DroobiVideo, FlashcardDeck, Project, ValueHighlight, SocialLinks, ConferenceMaterial } from '../../types';
import { 
    BriefcaseIcon, ArrowDownTrayIcon, EyeIcon, LinkIcon, MapPinIcon, GlobeAltIcon, UsersIcon, CheckBadgeIcon, SparklesIcon, CalendarDaysIcon, ChatBubbleLeftRightIcon, AcademicCapIcon, ClockIcon, ArrowLeftIcon, ChevronDownIcon, EnvelopeIcon, PhoneIcon, SearchIcon, CpuChipIcon, PencilSquareIcon, DocumentTextIcon,
    LinkedInIcon, XSocialIcon, YouTubeIcon, GiftIcon, ClipboardDocumentListIcon, PlayCircleIcon
} from '../../components/icons/Icons';
import VideoPlayer from '../../components/VideoPlayer';

// --- Reusable Helper Components ---

const EmptyContent: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-center py-16 px-6 glass-card rounded-lg">
        <p className="text-slate-400">{message}</p>
    </div>
);

// --- "Digital Booth" Components ---

const materialTypeConfig: Record<ConferenceMaterial['type'], { icon: React.FC<{className?: string}>, label: string, bgClass: string, textClass: string, hoverBgClass: string }> = {
    'Brochure': { icon: ClipboardDocumentListIcon, label: 'Download Brochure', bgClass: 'bg-blue-500', textClass: 'text-blue-400', hoverBgClass: 'hover:bg-blue-600' },
    'Cut Sheet': { icon: ClipboardDocumentListIcon, label: 'Download Cut Sheet', bgClass: 'bg-blue-500', textClass: 'text-blue-400', hoverBgClass: 'hover:bg-blue-600' },
    'Whitepaper': { icon: DocumentTextIcon, label: 'Read Whitepaper', bgClass: 'bg-slate-500', textClass: 'text-slate-400', hoverBgClass: 'hover:bg-slate-600' },
    'Case Study': { icon: DocumentTextIcon, label: 'Read Case Study', bgClass: 'bg-slate-500', textClass: 'text-slate-400', hoverBgClass: 'hover:bg-slate-600' },
    'Giveaway': { icon: GiftIcon, label: 'Enter Giveaway', bgClass: 'bg-green-500', textClass: 'text-green-400', hoverBgClass: 'hover:bg-green-600' },
    'Video Demo': { icon: PlayCircleIcon, label: 'Watch Demo', bgClass: 'bg-rose-500', textClass: 'text-rose-400', hoverBgClass: 'hover:bg-rose-600' },
};

const ConferenceMaterialCard: React.FC<{ material: ConferenceMaterial }> = ({ material }) => {
    const config = materialTypeConfig[material.type];
    
    return (
        <div className="glass-card rounded-lg overflow-hidden flex flex-col h-full group">
            <div className="aspect-[4/3] bg-slate-800 overflow-hidden">
                <img src={material.thumbnailUrl} alt={material.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <span className={`text-xs font-semibold uppercase ${config.textClass}`}>{material.type}</span>
                <h4 className="font-bold text-white mt-2">{material.title}</h4>
                <p className="text-sm text-slate-400 mt-2 flex-grow">{material.description}</p>
            </div>
            <div className="p-4 border-t border-slate-700">
                <a 
                    href={material.actionUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`flex items-center justify-center gap-2 text-sm font-semibold text-white ${config.bgClass} ${config.hoverBgClass} w-full py-2.5 rounded-lg transition-colors`}
                >
                    <config.icon className="w-5 h-5" />
                    {config.label}
                </a>
            </div>
        </div>
    );
};

const ConferenceBoothSection: React.FC<{ materials: ConferenceMaterial[] }> = ({ materials }) => {
    return (
        <div>
            <h3 className="text-2xl font-bold text-white mb-6">Digital Conference Booth</h3>
            <p className="text-slate-400 mb-8 max-w-3xl">
                Explore our virtual booth. Here you can find all the materials you'd typically see at a conference, from detailed product brochures and technical cut sheets to video demonstrations and special giveaways.
            </p>
            {materials.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {materials.map(material => <ConferenceMaterialCard key={material.id} material={material} />)}
                </div>
            ) : (
                <EmptyContent message="No conference materials have been added yet." />
            )}
        </div>
    );
};

// --- Microsite Sub-components ---

const ContactCard: React.FC<{ contact: VendorContact }> = ({ contact }) => {
  const isChatEnabled = !!contact.online && !!contact.chatUrl;
  const isScheduleEnabled = !!contact.calendarUrl;

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <img src={contact.avatarUrl} alt={contact.name} className="w-16 h-16 rounded-full" />
          <span
            className={`absolute bottom-0 right-0 block h-4 w-4 rounded-full border-2 border-slate-800/50 ${contact.online ? 'bg-green-400' : 'bg-red-500'}`}
            title={contact.online ? 'Available' : 'Offline'}
          ></span>
        </div>
        <div className="flex-grow">
          <p className="font-bold text-white">{contact.name}</p>
          <p className="text-sm text-slate-400">{contact.title}</p>
          <div className="mt-1 flex flex-wrap gap-2 text-xs">
            {contact.region && <span className="bg-slate-700 px-2 py-0.5 rounded-full">{contact.region}</span>}
            {contact.role && <span className="bg-slate-700 px-2 py-0.5 rounded-full">{contact.role}</span>}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-700 grid grid-cols-2 gap-2">
        <a href={`mailto:${contact.email}`} className="flex items-center justify-center gap-1.5 text-sm font-semibold text-slate-200 hover:text-blue-400 transition-colors bg-slate-700/50 hover:bg-slate-700 py-1.5 rounded-md">
          <EnvelopeIcon className="w-4 h-4" /> Email
        </a>
        <a href={contact.phone ? `tel:${contact.phone}` : '#'}
           className={`flex items-center justify-center gap-1.5 text-sm font-semibold text-slate-200 transition-colors bg-slate-700/50 py-1.5 rounded-md ${contact.phone ? 'hover:text-blue-400 hover:bg-slate-700' : 'opacity-50 cursor-not-allowed'}`}
           onClick={(e) => !contact.phone && e.preventDefault()}
           title={!contact.phone ? 'Phone not available' : ''}
        >
          <PhoneIcon className="w-4 h-4" /> Call
        </a>
        <a href={isChatEnabled ? contact.chatUrl : '#'}
           className={`flex items-center justify-center gap-1.5 text-sm font-semibold text-white transition-colors py-1.5 rounded-md ${isChatEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-600 opacity-50 cursor-not-allowed'}`}
           onClick={(e) => !isChatEnabled && e.preventDefault()}
           title={!isChatEnabled ? (contact.online ? 'Chat not available' : 'User is offline') : 'Chat Now'}
        >
          <ChatBubbleLeftRightIcon className="w-4 h-4" /> Chat
        </a>
        <a href={isScheduleEnabled ? contact.calendarUrl : '#'}
           target={isScheduleEnabled ? '_blank' : undefined}
           rel={isScheduleEnabled ? 'noopener noreferrer' : undefined}
           className={`flex items-center justify-center gap-1.5 text-sm font-semibold text-white transition-colors py-1.5 rounded-md ${isScheduleEnabled ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-600 opacity-50 cursor-not-allowed'}`}
           onClick={(e) => !isScheduleEnabled && e.preventDefault()}
           title={!isScheduleEnabled ? 'Scheduling not available' : 'Schedule a Meeting'}
        >
          <CalendarDaysIcon className="w-4 h-4" /> Schedule
        </a>
      </div>
    </div>
  );
};

const TeamSection: React.FC<{ contacts: VendorContact[] }> = ({ contacts }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [regionFilter, setRegionFilter] = useState('All');
    const [roleFilter, setRoleFilter] = useState('All');

    const uniqueRegions = useMemo(() => ['All', ...new Set(contacts.map(c => c.region).filter(Boolean) as string[])], [contacts]);
    const uniqueRoles = useMemo(() => ['All', ...new Set(contacts.map(c => c.role).filter(Boolean) as string[])], [contacts]);

    const filteredContacts = useMemo(() => {
        return contacts.filter(contact => {
            const matchesSearch = searchTerm === '' ||
                contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.title.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesRegion = regionFilter === 'All' || contact.region === regionFilter;
            const matchesRole = roleFilter === 'All' || contact.role === roleFilter;

            return matchesSearch && matchesRegion && matchesRole;
        });
    }, [contacts, searchTerm, regionFilter, roleFilter]);
    
    if (!contacts || contacts.length === 0) {
        return (
             <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white mb-4">Meet the Team</h3>
                <p className="text-sm text-slate-400">Team profiles coming soon.</p>
            </div>
        );
    }

    return (
        <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white">Meet the Team</h3>
            
            <div className="mt-4 space-y-3">
                <div className="relative">
                    <SearchIcon className="w-4 h-4 text-slate-400 absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none" />
                    <input 
                        type="search"
                        placeholder="Search by name or title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 pl-9 pr-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="grid grid-cols-2 gap-2">
                     <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)} className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                        {uniqueRegions.map(region => <option key={region} value={region}>{region === 'All' ? 'All Regions' : region}</option>)}
                    </select>
                    <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                        {uniqueRoles.map(role => <option key={role} value={role}>{role === 'All' ? 'All Roles' : role}</option>)}
                    </select>
                </div>
            </div>

            <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {filteredContacts.length > 0 ? (
                    filteredContacts.map(contact => <ContactCard key={contact.id} contact={contact} />)
                ) : (
                    <p className="text-center text-sm text-slate-400 py-8">No matching contacts found.</p>
                )}
            </div>
        </div>
    );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="glass-card rounded-lg overflow-hidden flex flex-col h-full">
        <div className="aspect-video bg-slate-800">
            {project.coverVideoUrl ? (
                <VideoPlayer src={project.coverVideoUrl} autoPlay loop muted controls={false} />
            ) : project.coverImageUrl ? (
                <img src={project.coverImageUrl} alt={project.title} className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800">
                    <CpuChipIcon className="w-12 h-12 text-slate-600" />
                </div>
            )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-bold text-white">{project.title}</h4>
            <p className="text-sm text-slate-400 mt-2 flex-grow">{project.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map(tag => (
                    <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{tag}</span>
                ))}
            </div>
        </div>
        {project.caseStudyUrl && (
            <div className="p-4 border-t border-slate-700">
                <a href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-400 hover:underline">
                    View Case Study &rarr;
                </a>
            </div>
        )}
    </div>
);

const FeaturedProjectsSection: React.FC<{ projects: Project[] }> = ({ projects }) => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        projects.forEach(p => p.tags.forEach(t => tags.add(t)));
        return Array.from(tags);
    }, [projects]);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const filteredProjects = useMemo(() => {
        if (selectedTags.length === 0) return projects;
        return projects.filter(p => p.tags.some(t => selectedTags.includes(t)));
    }, [projects, selectedTags]);

    return (
        <div>
            <h3 id="projects-heading" className="text-2xl font-bold text-white mb-4">Featured Projects & Case Studies</h3>
            <div className="flex flex-wrap gap-2 mb-6">
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${selectedTags.includes(tag) ? 'bg-blue-500 text-white font-semibold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            {filteredProjects.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredProjects.map(project => <ProjectCard key={project.id} project={project} />)}
                </div>
            ) : (
                <EmptyContent message="No projects match the selected filters." />
            )}
        </div>
    );
};

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
                            <div key={log.userId} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-3">
                                    <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                                    <span className="font-semibold text-slate-200">{user.name}</span>
                                </div>
                                <div className="text-right text-slate-400">
                                    <p>Last Visit: {new Date(log.lastVisit).toLocaleDateString()}</p>
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

const ResourcesSection: React.FC<{ resources: VendorResource[] }> = ({ resources }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = useMemo(() => ['All', ...new Set(resources.map(r => r.category))], [resources]);

    const filteredResources = useMemo(() => {
        return resources.filter(r => {
            const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
            const matchesSearch = searchTerm === '' || 
                                  r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  r.description.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [resources, searchTerm, selectedCategory]);

    return (
        <div>
            <h3 className="text-2xl font-bold text-white mb-4">Resources</h3>
            <input 
                type="search"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-md py-2 px-4 mb-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(cat => (
                    <button 
                        key={cat} 
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1 text-sm rounded-full ${selectedCategory === cat ? 'bg-blue-500 text-white font-semibold' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            {filteredResources.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map(res => <ResourceCard key={res.id} resource={res} />)}
                </div>
            ) : <EmptyContent message="No resources match your search." />}
        </div>
    );
};

const CareersSection: React.FC<{ jobs: JobPosting[] }> = ({ jobs }) => (
    <div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <BriefcaseIcon className="w-7 h-7" /> Careers
        </h3>
        <div className="space-y-6">
            {jobs.map(job => <JobPostingCard key={job.id} job={job} />)}
        </div>
    </div>
);

const RelatedManualsSection: React.FC<{ manuals: Manual[] }> = ({ manuals }) => (
    <div>
        <h3 className="text-2xl font-bold text-white mb-6">Related Manuals</h3>
        <div className="grid md:grid-cols-2 gap-6">
            {manuals.map(manual => <ManualCard key={manual.id} manual={manual} />)}
        </div>
    </div>
);

const RelatedBlogSection: React.FC<{ posts: BlogPost[] }> = ({ posts }) => (
    <div>
        <h3 className="text-2xl font-bold text-white mb-6">From the Blog</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => <BlogCard key={post.id} post={post} />)}
        </div>
    </div>
);

const RelatedVideosSection: React.FC<{ videos: DroobiVideo[] }> = ({ videos }) => (
    <div>
        <h3 className="text-2xl font-bold text-white mb-6">Featured on Droobi TV</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(video => <VideoCard key={video.id} video={video} />)}
        </div>
    </div>
);

const SponsorshipSection: React.FC<{ sponsorships?: EcosystemEntity['sponsorships'], sponsoredDecks: FlashcardDeck[] }> = ({ sponsorships, sponsoredDecks }) => (
    <div>
        <h3 className="text-2xl font-bold text-white mb-6">Sponsorship & Contributions</h3>
        <div className="space-y-6">
            <SponsorshipShowcase sponsorships={sponsorships} />
            <AcademyContributorBadge sponsoredDecks={sponsoredDecks} />
        </div>
    </div>
);

const ContentHub: React.FC<{ entity: EcosystemEntity }> = ({ entity }) => {
    const { currentUser, getUserById, manuals, blogPosts, droobiVideos, flashcardDecks } = useAuth();
    
    const relatedManuals = useMemo(() => manuals.filter(m => m.vendorId === entity.id), [manuals, entity.id]);
    const relatedBlogPosts = useMemo(() => blogPosts.filter(p => p.vendorId === entity.id), [blogPosts, entity.id]);
    const relatedVideos = useMemo(() => droobiVideos.filter(v => v.vendorId === entity.id), [droobiVideos, entity.id]);
    const sponsoredDecks = useMemo(() => flashcardDecks.filter(d => d.sponsorship?.sponsor_id === entity.id), [flashcardDecks, entity.id]);

    const hasSponsorships = (entity.sponsorships && entity.sponsorships.length > 0) || sponsoredDecks.length > 0;
    const canShowAnalytics = currentUser?.id === entity.claimedByUserId && entity.visitorLogs && entity.visitorLogs.length > 0;

    return (
        <div className="space-y-12">
            {entity.resources && entity.resources.length > 0 && <ResourcesSection resources={entity.resources} />}
            {entity.jobPostings && entity.jobPostings.length > 0 && <CareersSection jobs={entity.jobPostings} />}
            {relatedManuals.length > 0 && <RelatedManualsSection manuals={relatedManuals} />}
            {relatedBlogPosts.length > 0 && <RelatedBlogSection posts={relatedBlogPosts} />}
            {relatedVideos.length > 0 && <RelatedVideosSection videos={relatedVideos} />}
            {hasSponsorships && <SponsorshipSection sponsorships={entity.sponsorships} sponsoredDecks={sponsoredDecks} />}
            {canShowAnalytics && <AnalyticsDashboard logs={entity.visitorLogs!} getUserById={getUserById!} />}
        </div>
    );
};

// --- Main Profile Components ---

const MicrositeHero: React.FC<{ entity: EcosystemEntity }> = ({ entity }) => {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    
    if (!entity.hero) {
        return (
            <header className="bg-slate-800 p-8 rounded-b-2xl">
                <h1 className="text-3xl font-bold text-white text-center">{entity.name}</h1>
            </header>
        );
    }

    const handleCta = (action?: string) => {
        if (!action) return;
        if (action === 'modal:video' && entity.featuredVideoUrl) {
            setIsVideoModalOpen(true);
        } else if (action.startsWith('scroll:')) {
            const elementId = action.split(':')[1];
            document.querySelector(elementId)?.scrollIntoView({ behavior: 'smooth' });
        } else if (action.startsWith('http')) {
            window.open(action, '_blank');
        }
    };
    
    return (
        <>
            <header className="relative h-[80vh] min-h-[500px] w-full overflow-hidden text-white flex items-center justify-center text-center">
                {entity.hero.videoUrl && (
                    <div className="absolute inset-0 z-0">
                        <VideoPlayer src={entity.hero.videoUrl} poster={entity.hero.posterImage} autoPlay loop muted controls={false} />
                        <div className="absolute inset-0 bg-black/60"></div>
                    </div>
                )}
                <div className="relative z-10 p-8">
                    <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-xl mx-auto flex items-center justify-center p-2 border border-white/20">
                        <img src={entity.logoUrl} alt={`${entity.name} logo`} className="max-w-full max-h-full"/>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mt-6 drop-shadow-lg">{entity.name}</h1>
                    <p className="text-xl md:text-2xl mt-4 text-slate-200 drop-shadow-md">{entity.tagline}</p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        {entity.hero.primaryCta && (
                            <button onClick={() => handleCta(entity.hero?.primaryCta?.action)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
                                {entity.hero.primaryCta.label}
                            </button>
                        )}
                         {entity.hero.secondaryCta && (
                            <button onClick={() => handleCta(entity.hero?.secondaryCta?.action)} className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
                                {entity.hero.secondaryCta.label}
                            </button>
                        )}
                    </div>
                </div>
                 <a href="#content" className="absolute bottom-8 z-10 animate-bounce">
                    <ChevronDownIcon className="w-8 h-8"/>
                </a>
            </header>

            {isVideoModalOpen && entity.featuredVideoUrl && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsVideoModalOpen(false)}>
                    <div className="w-full max-w-4xl aspect-video relative" onClick={(e) => e.stopPropagation()}>
                        <VideoPlayer src={entity.featuredVideoUrl} controls />
                         <button onClick={() => setIsVideoModalOpen(false)} className="absolute -top-10 right-0 text-white text-3xl">&times;</button>
                    </div>
                </div>
            )}
        </>
    );
};

const highlightIconMap: Record<ValueHighlight['icon'], React.FC<{className?: string}>> = {
    chat: ChatBubbleLeftRightIcon,
    calendar: CalendarDaysIcon,
    book: AcademicCapIcon,
    blog: PencilSquareIcon,
    projects: GlobeAltIcon,
    sponsor: SparklesIcon,
};

const ValueHighlightsSection: React.FC<{ highlights: ValueHighlight[] }> = ({ highlights }) => (
    <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-white mb-4">Value Highlights</h3>
        <div className="space-y-3">
            {highlights.map(highlight => {
                const Icon = highlightIconMap[highlight.icon];
                return (
                    <div key={highlight.label} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-sm font-semibold text-slate-200">{highlight.label}</span>
                    </div>
                );
            })}
        </div>
    </div>
);

const AcademyContributorSection: React.FC<{ entity: EcosystemEntity }> = ({ entity }) => {
    const contribution = entity.academyContribution;
    if (!contribution || !contribution.show) return null;

    const blurb = contribution.blurb || `${entity.name} contributes expertise to our Learning Academy, sharing resources and insights to strengthen water innovation.`;

    return (
        <div className="glass-card p-6" title="Academy Contributor">
            <div className="flex items-center gap-4">
                {contribution.badgeUrl ? (
                    <img src={contribution.badgeUrl} alt="Academy Contributor Badge" className="w-16 h-16 object-contain" />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                        <AcademicCapIcon className="w-8 h-8 text-amber-400" />
                    </div>
                )}
                <div>
                    <h3 className="text-lg font-bold text-white">Academy Contributor</h3>
                </div>
            </div>
            <p className="text-sm text-slate-300 mt-4">{blurb}</p>
            {contribution.academyUrl && (
                <a href={contribution.academyUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-blue-400 hover:underline">
                    Explore Contributions &rarr;
                </a>
            )}
        </div>
    );
};

const SponsorshipRecognitionSection: React.FC<{ entity: EcosystemEntity }> = ({ entity }) => {
    const sponsorship = entity.sponsorshipDetails;
    if (!sponsorship || !sponsorship.show) return null;

    return (
        <div className="glass-card p-6">
            <div className="flex items-center gap-4">
                {sponsorship.badgeUrl ? (
                    <img src={sponsorship.badgeUrl} alt="Sponsorship Badge" className="w-16 h-16 object-contain" />
                ) : (
                     <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                        <SparklesIcon className="w-8 h-8 text-purple-400" />
                    </div>
                )}
                 <div>
                    <h3 className="text-lg font-bold text-white">Sponsorship Recognition</h3>
                </div>
            </div>
            <p className="text-sm text-slate-300 mt-4">{sponsorship.text}</p>
            {sponsorship.linkUrl && (
                <Link to={sponsorship.linkUrl} className="mt-4 inline-block text-sm font-semibold text-blue-400 hover:underline">
                    Learn More &rarr;
                </Link>
            )}
        </div>
    );
};

const NewsletterSection: React.FC<{ entity: EcosystemEntity }> = ({ entity }) => {
    const newsletter = entity.newsletter;
    const [submitted, setSubmitted] = useState(false);
    const [formKey, setFormKey] = useState(Date.now());

    if (!newsletter || !newsletter.show) return null;

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormKey(Date.now()); 
        }, 5000);
    };

    if (submitted) {
        return (
            <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white">Thank You!</h3>
                <p className="text-sm text-slate-300 mt-2">{newsletter.successMessage}</p>
            </div>
        );
    }

    return (
        <section className="glass-card p-6" aria-labelledby="newsletter-heading">
            <h3 id="newsletter-heading" className="text-lg font-bold text-white mb-4">Contact / Newsletter</h3>
            <form key={formKey} onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input type="text" name="name" id="name" required className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Your Name" />
                </div>
                <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input type="email" name="email" id="email" required className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Your Email Address" />
                </div>
                <div>
                    <label htmlFor="interest" className="sr-only">I'm interested in...</label>
                    <select id="interest" name="interest" className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                        <option>I'm interested in...</option>
                        <option>Products</option>
                        <option>Speaking</option>
                        <option>Demos</option>
                        <option>Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="message" className="sr-only">Message</label>
                    <textarea name="message" id="message" rows={4} className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Your Message (optional)"></textarea>
                </div>
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input id="subscribe" name="subscribe" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-slate-600 rounded bg-slate-700" />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="subscribe" className="text-slate-300">Subscribe to updates from {entity.name}</label>
                    </div>
                </div>
                <div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">Submit</button>
                </div>
            </form>
        </section>
    );
};

const SocialLinksSection: React.FC<{ social?: SocialLinks }> = ({ social }) => {
    if (!social) return null;
    const hasLinks = social.linkedin || social.twitter || social.youtube;
    if (!hasLinks) return null;

    return (
        <section className="glass-card p-6" aria-labelledby="social-heading">
            <h3 id="social-heading" className="text-lg font-bold text-white mb-4">Follow Us</h3>
            <div className="flex items-center gap-4">
                {social.linkedin && (
                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-slate-400 hover:text-white transition-colors">
                        <span className="sr-only">LinkedIn</span>
                        <LinkedInIcon className="w-6 h-6" />
                    </a>
                )}
                {social.twitter && (
                    <a href={social.twitter} target="_blank" rel="noopener noreferrer" title="X (Twitter)" className="text-slate-400 hover:text-white transition-colors">
                         <span className="sr-only">X (formerly Twitter)</span>
                        <XSocialIcon className="w-6 h-6" />
                    </a>
                )}
                {social.youtube && (
                    <a href={social.youtube} target="_blank" rel="noopener noreferrer" title="YouTube" className="text-slate-400 hover:text-white transition-colors">
                        <span className="sr-only">YouTube</span>
                        <YouTubeIcon className="w-6 h-6" />
                    </a>
                )}
            </div>
        </section>
    );
};


const MicrositeProfile: React.FC<{ entity: EcosystemEntity }> = ({ entity }) => {
    const { manuals, blogPosts, droobiVideos, flashcardDecks } = useAuth();
    
    const hasContentHubMaterial = useMemo(() => {
        const hasOwnContent = entity.resources?.length || entity.jobPostings?.length || entity.sponsorships?.length;
        const hasRelatedContent = 
            manuals.some(m => m.vendorId === entity.id) ||
            blogPosts.some(p => p.vendorId === entity.id) ||
            droobiVideos.some(v => v.vendorId === entity.id) ||
            flashcardDecks.some(d => d.sponsorship?.sponsor_id === entity.id);
        return !!(hasOwnContent || hasRelatedContent);
    }, [entity, manuals, blogPosts, droobiVideos, flashcardDecks]);

    const hasConferenceBooth = useMemo(() => !!(entity.conferenceBooth && entity.conferenceBooth.length > 0), [entity.conferenceBooth]);
    
    const availableTabs = useMemo(() => {
        const tabs = [];
        if (hasConferenceBooth) tabs.push('booth');
        if (hasContentHubMaterial) tabs.push('content');
        return tabs;
    }, [hasConferenceBooth, hasContentHubMaterial]);

    const [activeTab, setActiveTab] = useState(availableTabs[0] || '');

    const TabButton: React.FC<{ name: string; children: React.ReactNode; activeTab: string; setActiveTab: (name: string) => void; }> = ({ name, children, activeTab, setActiveTab }) => (
        <button
            onClick={() => setActiveTab(name)}
            role="tab"
            aria-selected={activeTab === name}
            aria-controls={`tabpanel-${name}`}
            className={`px-1 py-4 text-sm font-medium transition-colors ${activeTab === name ? 'border-b-2 border-blue-500 text-blue-400' : 'border-b-2 border-transparent text-slate-400 hover:text-slate-200'}`}
        >
            {children}
        </button>
    );

    const TabPanel: React.FC<{ name: string; activeTab: string; children: React.ReactNode; }> = ({ name, activeTab, children }) => (
        <div id={`tabpanel-${name}`} role="tabpanel" tabIndex={0} hidden={activeTab !== name}>
            {activeTab === name && <div>{children}</div>}
        </div>
    );
    
    return (
        <div>
            <MicrositeHero entity={entity} />

            <div id="content" className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8 items-start">
                <main className="lg:col-span-8 space-y-12">
                    <section className="glass-card p-6" aria-labelledby="about-heading">
                        <h3 id="about-heading" className="text-lg font-bold text-white">About {entity.name}</h3>
                        <p className="mt-2 text-slate-300 whitespace-pre-line">{entity.longDescription}</p>
                    </section>
                    {entity.services && (
                         <section className="glass-card p-6" aria-labelledby="services-heading">
                            <h3 id="services-heading" className="text-lg font-bold text-white">Services & Offerings</h3>
                            <div className="mt-4 space-y-4">
                                {entity.services.map(s => (
                                    <div key={s.title}>
                                        <p className="font-semibold text-slate-100">{s.title}</p>
                                        <p className="text-sm text-slate-400">{s.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                     {entity.futureOfferings && (
                         <section className="glass-card p-6 border-l-4 border-purple-500" aria-labelledby="future-heading">
                            <h3 id="future-heading" className="text-lg font-bold text-white">Coming Soon</h3>
                            <div className="mt-4 space-y-4">
                                {entity.futureOfferings.map(s => (
                                    <div key={s.title}>
                                        <p className="font-semibold text-slate-100">{s.title}</p>
                                        <p className="text-sm text-slate-400">{s.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {entity.projects && entity.projects.length > 0 && (
                        <section aria-labelledby="projects-heading">
                           <FeaturedProjectsSection projects={entity.projects} />
                        </section>
                    )}

                    {availableTabs.length > 0 && (
                        <div>
                            <div className="border-b border-slate-700">
                                <nav className="-mb-px flex space-x-8" role="tablist" aria-label="Tabs">
                                    {hasConferenceBooth && <TabButton name="booth" activeTab={activeTab} setActiveTab={setActiveTab}>Digital Booth</TabButton>}
                                    {hasContentHubMaterial && <TabButton name="content" activeTab={activeTab} setActiveTab={setActiveTab}>Content Hub</TabButton>}
                                </nav>
                            </div>
                            
                            <div className="mt-8">
                                <TabPanel name="booth" activeTab={activeTab}>
                                    {hasConferenceBooth ? (
                                        <ConferenceBoothSection materials={entity.conferenceBooth!} />
                                    ) : null}
                                </TabPanel>
                                <TabPanel name="content" activeTab={activeTab}>
                                    <ContentHub entity={entity} />
                                </TabPanel>
                            </div>
                        </div>
                    )}
                </main>
                <aside id="team" className="lg:col-span-4 sticky top-24 space-y-6">
                    {entity.contacts && entity.contacts.length > 0 && (
                        <TeamSection contacts={entity.contacts} />
                    )}
                    {entity.highlights && entity.highlights.length > 0 && <ValueHighlightsSection highlights={entity.highlights} />}
                    {entity.academyContribution?.show && <AcademyContributorSection entity={entity} />}
                    {entity.sponsorshipDetails?.show && <SponsorshipRecognitionSection entity={entity} />}
                    <NewsletterSection entity={entity} />
                    <SocialLinksSection social={entity.social} />
                </aside>
            </div>
        </div>
    );
};

const StandardProfile: React.FC<{ entity: EcosystemEntity }> = ({ entity }) => (
    <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <section className="glass-card p-8 rounded-2xl" aria-labelledby="profile-heading">
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                    <img src={entity.logoUrl} alt={`${entity.name} logo`} className="max-w-full max-h-full" />
                </div>
                <div className="text-center md:text-left">
                    <h1 id="profile-heading" className="text-4xl font-extrabold text-white">{entity.name}</h1>
                    <p className="text-xl text-slate-300 mt-2">{entity.tagline}</p>
                    <div className="mt-4 space-y-2 text-slate-400">
                        <p className="flex items-center justify-center md:justify-start gap-2"><MapPinIcon className="w-5 h-5"/> {entity.location}</p>
                        <p className="flex items-center justify-center md:justify-start gap-2"><GlobeAltIcon className="w-5 h-5"/> <a href={`http://${entity.domain}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">{entity.domain}</a></p>
                    </div>
                </div>
            </div>
            {!entity.isClaimed && (
                <div className="mt-8 pt-6 border-t border-slate-700 text-center">
                    <h2 className="text-xl font-bold text-white">Is this your organization?</h2>
                    <p className="text-slate-400 mt-2">Claim this profile to unlock your micro-site, post jobs, share resources, and more.</p>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        Claim This Profile
                    </button>
                </div>
            )}
        </section>
    </main>
);

const EntityProfile: React.FC = () => {
    const { entityId, vendorId } = useParams<{ entityId?: string, vendorId?: string }>();
    const { ecosystemEntities } = useAuth();
    const finalId = entityId || vendorId;
    const entity = ecosystemEntities.find(e => e.id === finalId);

    useEffect(() => {
        if (entity) {
            document.title = `${entity.name} – Partner Microsite`;
            
            const existingMeta = document.querySelector('meta[name="description"]');
            const descriptionContent = entity.tagline || (entity.longDescription ? entity.longDescription.substring(0, 160) + '...' : 'Partner profile on oraKLES.');

            if (existingMeta) {
                existingMeta.setAttribute('content', descriptionContent);
            } else {
                const meta = document.createElement('meta');
                meta.name = 'description';
                meta.content = descriptionContent;
                document.head.appendChild(meta);
            }
        }
        return () => {
            document.title = 'oraKLES';
            const existingMeta = document.querySelector('meta[name="description"]');
            if (existingMeta) {
                 existingMeta.setAttribute('content', 'A comprehensive water industry educational platform with a lexicon, video streaming, an educational academy, manuals library, and ecosystem directory.');
            }
        };
    }, [entity]);

    if (!entity) {
        return (
            <div className="text-center py-20 text-white">
                <h1 className="text-2xl">Partner not found.</h1>
                <Link to="/ecosystem" className="text-blue-400 hover:underline mt-4 inline-block">&larr; Back to Partner Ecosystem</Link>
            </div>
        );
    }
    
    // Check for any micro-site content to render the advanced profile
    const isMicrosite = !!entity.longDescription || (entity.resources && entity.resources.length > 0);

    return (
        <div>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6" aria-label="Breadcrumb">
                <Link to="/ecosystem" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to All Partners
                </Link>
            </nav>
            {isMicrosite ? <MicrositeProfile entity={entity} /> : <StandardProfile entity={entity} />}
        </div>
    );
};

export default EntityProfile;
