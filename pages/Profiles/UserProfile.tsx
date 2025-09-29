import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PROFESSIONAL_TIERS } from '../../data';
import { 
    TierIcon, IdentificationIcon, ArrowUpTrayIcon, DocumentDuplicateIcon, CalendarDaysIcon, BellIcon,
    RocketLaunchIcon, CheckBadgeIcon, PlayCircleIcon, BookOpenIcon, UsersIcon, AcademicCapIcon,
    RectangleStackIcon, WrenchScrewdriverIcon, HandThumbUpIcon, DocumentArrowDownIcon, StarIcon, DocumentTextIcon,
    ShareIcon, TrophyIcon, BookmarkSquareIcon, ClipboardDocumentListIcon, CpuChipIcon,
    CameraIcon, VideoCameraIcon, PhotoIcon, GlobeAltIcon, ArchiveBoxIcon,
    MicrophoneIcon
} from '../../components/icons/Icons';
import { User, UserCredential, UserSkill, ResumeDocument, ProjectPortfolioItem, CareerGoal, CareerPathway, CareerPathwayStep, LibraryCollection, LibraryItem, LearningActivity, KnowledgeMapData, KnowledgeEntry, KnowledgeEntryType, SharingScope } from '../../types';
import VideoPlayer from '../../components/VideoPlayer';
import { DigitalWaterProBadge, UtilityManagementStewardBadge } from '../../components/Badges';
import KnowledgeMap from '../../components/KnowledgeMap';

const getCredentialStatus = (renewalDate: string): { text: string, color: string, daysLeft: number } => {
  const now = new Date();
  const renewal = new Date(renewalDate);
  const diffTime = renewal.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { text: 'Expired', color: 'red', daysLeft: diffDays };
  }
  if (diffDays <= 90) {
    return { text: 'Expiring Soon', color: 'yellow', daysLeft: diffDays };
  }
  return { text: 'Active', color: 'green', daysLeft: diffDays };
};

const CredentialCard: React.FC<{ credential: UserCredential }> = ({ credential }) => {
  const status = getCredentialStatus(credential.renewalDate);
  const ceuProgress = credential.ceuRequirements ? (credential.ceuRequirements.completed / credential.ceuRequirements.required) * 100 : 0;

  const statusColorClasses = {
    red: 'bg-red-500/10 text-red-400 border-red-500/30',
    yellow: 'bg-yellow-400/10 text-yellow-300 border-yellow-400/30',
    green: 'bg-green-500/10 text-green-400 border-green-500/30',
  };

  return (
    <div className="bg-slate-800/70 p-6 rounded-xl border border-slate-700 flex flex-col">
      <div className="flex justify-between items-start gap-4">
        <div>
          <span className="text-xs font-semibold uppercase text-blue-400">{credential.type}</span>
          <h4 className="text-lg font-bold text-white mt-1">{credential.name}</h4>
          <p className="text-sm text-slate-400">{credential.issuingBody}</p>
        </div>
        <div className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${statusColorClasses[status.color]}`}>
          {status.text}
        </div>
      </div>

      {credential.ceuRequirements && (
        <div className="mt-4">
          <div className="flex justify-between items-baseline mb-1">
            <h5 className="text-sm font-semibold text-slate-300">Continuing Education</h5>
            <p className="text-xs font-mono text-slate-400">{credential.ceuRequirements.completed}/{credential.ceuRequirements.required} {credential.ceuRequirements.unitName}s</p>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${ceuProgress}%` }}></div>
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-slate-700/50 flex-grow grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div className="text-slate-400">License #</div>
        <div className="text-slate-200 font-mono">{credential.licenseNumber || 'N/A'}</div>
        <div className="text-slate-400">Issued</div>
        <div className="text-slate-200">{new Date(credential.issueDate).toLocaleDateString()}</div>
        <div className="text-slate-400 font-semibold flex items-center gap-1.5">
          <BellIcon className={`w-4 h-4 text-${status.color}-400`}/> Renews
        </div>
        <div className={`font-semibold text-${status.color}-400`}>
          {new Date(credential.renewalDate).toLocaleDateString()}
          {status.daysLeft > 0 && <span className="text-xs ml-1">({status.daysLeft} days)</span>}
        </div>
      </div>

      <div className="mt-4">
        <a href={credential.fileUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">
          <DocumentDuplicateIcon className="w-4 h-4" /> View Document
        </a>
      </div>
    </div>
  );
};

// --- PERSONAL KNOWLEDGE CAPTURE COMPONENTS ---

const KnowledgeStatsWidget: React.FC<{ stats: User['stats'] }> = ({ stats }) => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-white">{stats?.knowledgeContributions || 0}</p>
            <p className="text-xs text-slate-400">Contributions</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-white">{stats?.publicShares || 0}</p>
            <p className="text-xs text-slate-400">Public Shares</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-white">{stats?.thanksReceived || 0}</p>
            <p className="text-xs text-slate-400">"Thanks" Received</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-white">{stats?.views || 0}</p>
            <p className="text-xs text-slate-400">Total Views</p>
        </div>
    </div>
);

const KnowledgeEntryCard: React.FC<{ entry: KnowledgeEntry }> = ({ entry }) => {
    const typeConfig: Record<KnowledgeEntryType, { Icon: React.FC<{className?:string}>, color: string }> = {
        photo: { Icon: PhotoIcon, color: 'text-green-400' },
        video: { Icon: VideoCameraIcon, color: 'text-rose-400' },
        audio: { Icon: MicrophoneIcon, color: 'text-sky-400' },
        card: { Icon: DocumentTextIcon, color: 'text-amber-400' },
    };

    const scopeConfig: Record<SharingScope, { label: string, bg: string, text: string }> = {
        private: { label: 'Private', bg: 'bg-slate-600', text: 'text-slate-200' },
        organization: { label: 'Organization', bg: 'bg-purple-500/20', text: 'text-purple-300' },
        public: { label: 'Public', bg: 'bg-blue-500/20', text: 'text-blue-300' },
    };

    const { Icon, color } = typeConfig[entry.type];
    const { label, bg, text } = scopeConfig[entry.sharingScope];
    const isPending = entry.status === 'pending_sync';

    return (
        <div className={`bg-slate-800/70 p-4 rounded-xl border border-slate-700 flex flex-col relative overflow-hidden ${isPending ? 'opacity-60' : ''}`}>
            {isPending && <div className="absolute top-2 right-2 text-xs font-bold text-yellow-300 bg-yellow-500/20 px-2 py-0.5 rounded-full">Pending Sync</div>}
            <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center bg-slate-700/50 ${color}`}>
                    <Icon className="w-7 h-7" />
                </div>
                <div className="flex-grow">
                    <h4 className="font-bold text-white leading-tight">{entry.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{new Date(entry.createdAt).toLocaleString()}</p>
                </div>
            </div>
            {entry.description && <p className="text-sm text-slate-300 mt-3 line-clamp-2">{entry.description}</p>}
            <div className="mt-4 pt-3 border-t border-slate-700 flex flex-wrap items-center justify-between gap-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${bg} ${text}`}>{label}</span>
                <div className="flex items-center gap-2">
                    {!entry.cardId && <button className="text-xs font-semibold text-blue-400 hover:underline">Convert to Card</button>}
                    <button className="text-xs font-semibold text-slate-400 hover:text-white">Edit</button>
                </div>
            </div>
        </div>
    );
};


const PersonalKnowledgeCaptureSection: React.FC<{ entries: KnowledgeEntry[] }> = ({ entries }) => {
    const { currentUser } = useAuth();
    if (!currentUser) return null;

    return (
        <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
                <ArchiveBoxIcon className="w-8 h-8 text-blue-400"/>
                <h2 className="text-2xl font-bold text-white">Personal Knowledge Capture</h2>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <button className="flex flex-col items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 px-2 rounded-lg transition-colors text-sm"><CameraIcon className="w-6 h-6"/> Capture Media</button>
                    <button className="flex flex-col items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 px-2 rounded-lg transition-colors text-sm"><ArrowUpTrayIcon className="w-6 h-6"/> Upload Media</button>
                    <button className="flex flex-col items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 px-2 rounded-lg transition-colors text-sm"><MicrophoneIcon className="w-6 h-6"/> Record Audio</button>
                    <button className="flex flex-col items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 px-2 rounded-lg transition-colors text-sm"><DocumentDuplicateIcon className="w-6 h-6"/> Create Card</button>
                </div>

                <h3 className="text-lg font-bold text-white mb-4">Contribution Impact</h3>
                <KnowledgeStatsWidget stats={currentUser.stats} />
                
                <div className="mt-8">
                    <h3 className="text-lg font-bold text-white mb-4">My Recent Contributions</h3>
                     {entries.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {entries.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(entry => (
                                <KnowledgeEntryCard key={entry.id} entry={entry} />
                            ))}
                        </div>
                     ) : (
                        <div className="text-center py-12 text-slate-400">
                            <p>No contributions yet. Capture your first piece of knowledge!</p>
                        </div>
                     )}
                </div>
            </div>
        </div>
    );
};


const CredentialsSection: React.FC<{ credentials: UserCredential[] }> = ({ credentials }) => (
  <div className="mt-12">
    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
      <div className="flex items-center gap-3">
        <IdentificationIcon className="w-8 h-8 text-blue-400"/>
        <h2 className="text-2xl font-bold text-white">Professional Credentials</h2>
      </div>
      <button 
        onClick={() => alert('Feature to add new credential coming soon!')}
        className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
      >
        <ArrowUpTrayIcon className="w-4 h-4" /> Add New Credential
      </button>
    </div>
    {credentials.length > 0 ? (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {credentials.map(cred => <CredentialCard key={cred.id} credential={cred} />)}
      </div>
    ) : (
      <div className="text-center py-12 bg-slate-800/50 rounded-xl border border-slate-700">
        <p className="text-slate-400">No credentials have been added yet.</p>
      </div>
    )}
  </div>
);

const CareerPathwayPlanner: React.FC<{ goals: CareerGoal[], pathways: CareerPathway[], initialPathwayId: string }> = ({ goals, pathways, initialPathwayId }) => {
    const [activePathway, setActivePathway] = useState(() => pathways.find(p => p.id === initialPathwayId));

    const handleGoalChange = (goalId: string) => {
        setActivePathway(pathways.find(p => p.goalId === goalId));
    };

    const stepIconMap: Record<CareerPathwayStep['type'], React.FC<{className?:string}>> = {
        deck: AcademicCapIcon,
        video: PlayCircleIcon,
        article: BookOpenIcon,
        manual: DocumentTextIcon,
        connection: UsersIcon
    };

    const stepLinkMap: Record<CareerPathwayStep['type'], (id: string) => string> = {
        deck: (id) => `/academy/deck/${id}`,
        video: (id) => `/video/${id}`,
        article: (id) => `/insights/${id}`,
        manual: (id) => `/manual/${id}`,
        connection: (id) => `/profile/${id}`
    };

    return (
        <div className="mt-12">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <RocketLaunchIcon className="w-8 h-8 text-blue-400"/>
                    <h2 className="text-2xl font-bold text-white">Career Pathway Planner</h2>
                </div>
                <select 
                    onChange={(e) => handleGoalChange(e.target.value)} 
                    defaultValue={activePathway?.goalId}
                    className="bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    {goals.map(goal => <option key={goal.id} value={goal.id}>{goal.title}</option>)}
                </select>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                <h3 className="text-xl font-bold text-white">Goal: {goals.find(g => g.id === activePathway?.goalId)?.title}</h3>
                <p className="text-slate-400 mt-1">{goals.find(g => g.id === activePathway?.goalId)?.description}</p>
                <div className="mt-8 flow-root">
                    <ul className="-mb-8">
                        {activePathway?.steps.map((step, stepIdx) => {
                            const Icon = stepIconMap[step.type];
                            const link = stepLinkMap[step.type](step.targetId);
                            return (
                                <li key={step.title}>
                                    <div className="relative pb-8">
                                        {stepIdx !== activePathway.steps.length - 1 ? (
                                        <span className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-slate-600" aria-hidden="true" />
                                        ) : null}
                                        <div className="relative flex items-start space-x-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full ${step.completed ? 'bg-green-500' : 'bg-slate-600'}`}>
                                                    {step.completed ? <CheckBadgeIcon className="w-6 h-6 text-white"/> : <Icon className="w-5 h-5 text-slate-300" />}
                                                </div>
                                            </div>
                                            <div className="min-w-0 flex-1 pt-1.5">
                                                <p className="text-sm text-slate-400">Step {stepIdx + 1}</p>
                                                <Link to={link} className="font-bold text-slate-100 hover:text-blue-400 transition-colors mt-1 block">{step.title}</Link>
                                                <p className="text-sm text-slate-400 mt-1">{step.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const ProjectPortfolioSection: React.FC<{ projects: ProjectPortfolioItem[] }> = ({ projects }) => (
    <div className="mt-12">
        <div className="flex items-center gap-3 mb-6">
            <RectangleStackIcon className="w-8 h-8 text-blue-400"/>
            <h2 className="text-2xl font-bold text-white">Project Portfolio</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map(project => (
                <div key={project.id} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
                    <div className="aspect-video bg-slate-800">
                        {project.videoUrl ? <VideoPlayer src={project.videoUrl} autoPlay loop muted controls={false}/> : <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="p-6">
                        <p className="text-sm font-semibold text-slate-400">{new Date(project.startDate).getFullYear()} - {new Date(project.endDate).getFullYear()}</p>
                        <h3 className="text-xl font-bold text-white mt-2">{project.title}</h3>
                        <p className="text-md font-semibold text-blue-300">{project.role}</p>
                        <p className="text-sm text-slate-300 mt-4">{project.summary}</p>
                        <div className="mt-4 pt-4 border-t border-slate-700">
                            <h4 className="text-sm font-semibold text-slate-400">Outcome</h4>
                            <p className="text-sm text-slate-300 mt-1">{project.outcome}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const SkillsSection: React.FC<{ skills: UserSkill[], currentUserId: string, viewingOwnProfile: boolean }> = ({ skills, currentUserId, viewingOwnProfile }) => {
    const { getUserById } = useAuth();
    return (
        <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
                <WrenchScrewdriverIcon className="w-8 h-8 text-blue-400"/>
                <h2 className="text-2xl font-bold text-white">Skills & Endorsements</h2>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <div className="flex flex-wrap gap-4">
                    {skills.map(skill => (
                        <div key={skill.id} className="flex items-center gap-2 bg-slate-700/80 rounded-lg p-2 pr-4">
                            <div className="flex items-center gap-2">
                                <HandThumbUpIcon className="w-5 h-5 text-blue-400"/>
                                <span className="font-mono font-bold text-white">{skill.endorsements.length}</span>
                            </div>
                            <span className="font-semibold text-slate-200">{skill.name}</span>
                             <button disabled={viewingOwnProfile} onClick={() => alert(`Endorsed ${skill.name}!`)} className="ml-2 text-xs bg-blue-500 text-white font-bold px-2 py-1 rounded hover:bg-blue-600 disabled:bg-slate-500 disabled:cursor-not-allowed">Endorse</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ResumeVaultSection: React.FC<{ resumes: ResumeDocument[] }> = ({ resumes }) => (
    <div className="mt-12">
        <div className="flex items-center gap-3 mb-6">
            <DocumentTextIcon className="w-8 h-8 text-blue-400"/>
            <h2 className="text-2xl font-bold text-white">Resume & CV Vault (Private)</h2>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                 <button onClick={() => alert('Resume generation coming soon!')} className="w-full flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">
                    Generate Resume from Profile
                </button>
                 <button className="w-full flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">
                    <ArrowUpTrayIcon className="w-4 h-4"/> Upload New Version
                </button>
            </div>
            <div className="space-y-3">
                {resumes.map(resume => (
                    <div key={resume.id} className="bg-slate-700/50 p-4 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-slate-100">{resume.fileName}</h3>
                                {resume.isPrimary && <span className="text-xs bg-green-500/10 text-green-400 font-bold px-2 py-0.5 rounded-full flex items-center gap-1"><StarIcon className="w-3 h-3"/>Primary</span>}
                            </div>
                            <p className="text-sm text-slate-400">{resume.versionName} - Uploaded on {new Date(resume.uploadedAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                             {!resume.isPrimary && <button className="text-xs font-semibold text-slate-300 hover:text-white">Set as Primary</button>}
                            <a href={resume.fileUrl} download className="flex items-center gap-1.5 bg-slate-600 hover:bg-slate-500 text-white font-semibold py-1.5 px-3 rounded-md text-sm transition-colors">
                                <DocumentArrowDownIcon className="w-4 h-4" /> Download
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

interface BadgeInfo {
    id: string;
    Component: React.FC<{ className?: string }>;
    title: string;
    description: string;
}

const badgeMap: Record<string, BadgeInfo> = {
    'B05': {
        id: 'B05',
        Component: UtilityManagementStewardBadge,
        title: 'Utility Management Steward',
        description: 'Awarded for demonstrating mastery in utility leadership, including asset management, finance, and regulatory compliance through the ORAKLES Academy.'
    },
    'B06': {
        id: 'B06',
        Component: DigitalWaterProBadge,
        title: 'Digital Water Professional',
        description: 'Recognizes expertise in digital water technologies, including smart metering, hydraulic modeling, and data analytics via the ORAKLES Academy.'
    }
};

const AchievementsSection: React.FC<{ badgeIds: string[] }> = ({ badgeIds }) => {
    const earnedBadges = badgeIds.map(id => badgeMap[id]).filter(Boolean);

    if (earnedBadges.length === 0) return null;

    return (
        <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
                <TrophyIcon className="w-8 h-8 text-yellow-400"/>
                <h2 className="text-2xl font-bold text-white">Achievements & Badges</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {earnedBadges.map(({ id, Component, title, description }) => (
                    <div key={id} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <div className="flex-shrink-0">
                            <Component className="w-32 h-32 md:w-40 md:h-40"/>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">{title}</h3>
                            <p className="text-sm text-slate-400 mt-2">{description}</p>
                            <div className="mt-4">
                                <button
                                  onClick={() => alert(`Sharing options for ${title} coming soon!`)}
                                  className="flex items-center justify-center gap-2 text-sm bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full md:w-auto"
                                >
                                    <ShareIcon className="w-4 h-4"/>
                                    Share Badge
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const useLibraryItemDetails = () => {
    const { terms, droobiVideos, flashcardDecks, manuals, blogPosts } = useAuth();

    const getItemDetails = (item: LibraryItem) => {
        switch (item.type) {
            case 'term': {
                const term = terms.find(t => t.id === item.contentId);
                return term ? { title: term.term, description: term.plainLanguageDefinition, url: `/term/${term.id}`, typeLabel: 'Lexicon Term' } : null;
            }
            case 'video': {
                const video = droobiVideos.find(v => v.id === item.contentId);
                return video ? { title: video.title, description: video.description, url: `/video/${video.id}`, typeLabel: 'Droobi TV' } : null;
            }
            case 'deck': {
                 const deck = flashcardDecks.find(d => d.id === item.contentId);
                return deck ? { title: deck.title, description: deck.description, url: `/academy/deck/${deck.id}`, typeLabel: 'Flashcard Deck' } : null;
            }
            case 'manual': {
                const manual = manuals.find(m => m.id === item.contentId);
                return manual ? { title: manual.title, description: manual.summary, url: `/manual/${manual.id}`, typeLabel: 'Manual' } : null;
            }
            case 'post': {
                const post = blogPosts.find(p => p.id === item.contentId);
                return post ? { title: post.title, description: post.subtitle, url: `/insights/${post.id}`, typeLabel: 'Insight Post' } : null;
            }
            default:
                return null;
        }
    };
    return getItemDetails;
};

// FIX: Added the main UserProfile component and default export to resolve the module import error in App.tsx.
const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { getUserById, currentUser } = useAuth();
  
  const [activeTab, setActiveTab] = useState('overview');

  const user = useMemo(() => getUserById(userId || ''), [userId, getUserById]);

  if (!user) {
    return (
      <div className="text-center py-20 text-white">
        <h1 className="text-2xl">User not found.</h1>
        <Link to="/" className="text-blue-400 hover:underline mt-4 inline-block">Back to safety</Link>
      </div>
    );
  }

  const viewingOwnProfile = currentUser?.id === user.id;
  const userTier = PROFESSIONAL_TIERS.find(t => t.id === user.tierId);

  const TabButton: React.FC<{ tabName: string; children: React.ReactNode }> = ({ tabName, children }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
        activeTab === tabName ? 'bg-blue-500 text-white' : 'text-slate-300 hover:bg-slate-700'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full border-4 border-slate-600" />
          {user.isOnline && <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-400 rounded-full border-2 border-slate-800" title="Online"></div>}
        </div>
        <div className="flex-grow text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-white">{user.name}</h1>
          {userTier && (
            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
              <TierIcon icon={userTier.icon} className="w-6 h-6 text-yellow-400" />
              <p className="text-lg font-bold text-yellow-400">{userTier.name}</p>
            </div>
          )}
          <p className="text-slate-400 mt-1">{user.email}</p>
        </div>
        {!viewingOwnProfile && (
            <div className="flex flex-col sm:flex-row gap-2">
                 <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Connect</button>
                 <button className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg">Message</button>
            </div>
        )}
      </header>

      <nav className="mt-8 flex flex-wrap items-center gap-2 border-b border-slate-700 pb-4">
        <TabButton tabName="overview">Overview</TabButton>
        <TabButton tabName="career">Career</TabButton>
        <TabButton tabName="portfolio">Portfolio</TabButton>
        <TabButton tabName="skills">Skills</TabButton>
        {viewingOwnProfile && user.knowledgeEntries && <TabButton tabName="knowledge">Knowledge Capture</TabButton>}
      </nav>

      <div className="mt-8">
        {activeTab === 'overview' && (
          <div>
            {user.credentials && <CredentialsSection credentials={user.credentials} />}
            {user.badges && <AchievementsSection badgeIds={user.badges} />}
          </div>
        )}
        {activeTab === 'career' && user.careerGoals && user.activePathwayId && user.careerPathways && (
          <div>
              <CareerPathwayPlanner goals={user.careerGoals} pathways={user.careerPathways} initialPathwayId={user.activePathwayId} />
              {viewingOwnProfile && user.resumeVault && <ResumeVaultSection resumes={user.resumeVault} />}
          </div>
        )}
        {activeTab === 'portfolio' && user.projectPortfolio && <ProjectPortfolioSection projects={user.projectPortfolio} />}
        {activeTab === 'skills' && user.skills && (
            <SkillsSection skills={user.skills} currentUserId={currentUser?.id || ''} viewingOwnProfile={viewingOwnProfile} />
        )}
        {activeTab === 'knowledge' && viewingOwnProfile && user.knowledgeEntries && (
            <PersonalKnowledgeCaptureSection entries={user.knowledgeEntries} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
