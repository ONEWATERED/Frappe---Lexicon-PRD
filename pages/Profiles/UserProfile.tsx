import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PROFESSIONAL_TIERS } from '../../data';
import { 
    TierIcon, IdentificationIcon, ArrowUpTrayIcon, DocumentDuplicateIcon, CalendarDaysIcon, BellIcon,
    RocketLaunchIcon, CheckBadgeIcon, PlayCircleIcon, BookOpenIcon, UsersIcon, AcademicCapIcon,
    RectangleStackIcon, WrenchScrewdriverIcon, HandThumbUpIcon, DocumentArrowDownIcon, StarIcon, DocumentTextIcon,
    ShareIcon, TrophyIcon, BookmarkSquareIcon, ClipboardDocumentListIcon, CpuChipIcon
} from '../../components/icons/Icons';
import { UserCredential, UserSkill, ResumeDocument, ProjectPortfolioItem, CareerGoal, CareerPathway, CareerPathwayStep, LibraryCollection, LibraryItem, LearningActivity, KnowledgeMapData } from '../../types';
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
        description: 'Awarded for demonstrating mastery in utility leadership, including asset management, finance, and regulatory compliance through the oraKLES Academy.'
    },
    'B06': {
        id: 'B06',
        Component: DigitalWaterProBadge,
        title: 'Digital Water Professional',
        description: 'Recognizes expertise in digital water technologies, including smart metering, hydraulic modeling, and data analytics via the oraKLES Academy.'
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

    return (item: LibraryItem) => {
        switch (item.type) {
            case 'term':
                const term = terms.find(t => t.id === item.contentId);
                return { title: term?.term, link: `/term/${item.contentId}`, Icon: DocumentTextIcon };
            case 'video':
                const video = droobiVideos.find(v => v.id === item.contentId);
                return { title: video?.title, link: `/video/${item.contentId}`, Icon: PlayCircleIcon };
            case 'deck':
                 const deck = flashcardDecks.find(d => d.id === item.contentId);
                return { title: deck?.title, link: `/academy/deck/${item.contentId}`, Icon: AcademicCapIcon };
            case 'manual':
                 const manual = manuals.find(m => m.id === item.contentId);
                return { title: manual?.title, link: `/manual/${item.contentId}`, Icon: BookOpenIcon };
            case 'post':
                 const post = blogPosts.find(p => p.id === item.contentId);
                return { title: post?.title, link: `/insights/${item.contentId}`, Icon: BookOpenIcon };
            default:
                return { title: 'Unknown Item', link: '#', Icon: DocumentTextIcon };
        }
    };
};

const MyLibrarySection: React.FC<{ collections: LibraryCollection[] }> = ({ collections }) => {
    const [activeTab, setActiveTab] = useState(0);
    const getItemDetails = useLibraryItemDetails();

    return (
        <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
                <BookmarkSquareIcon className="w-8 h-8 text-blue-400"/>
                <h2 className="text-2xl font-bold text-white">My Library (Private)</h2>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <div className="border-b border-slate-700">
                    <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                        {collections.map((collection, index) => (
                            <button
                                key={collection.id}
                                onClick={() => setActiveTab(index)}
                                className={`${
                                    activeTab === index
                                        ? 'border-blue-500 text-blue-400'
                                        : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'
                                } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
                            >
                                {collection.name} ({collection.items.length})
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="mt-6">
                    {collections[activeTab]?.items.map(item => {
                        const details = getItemDetails(item);
                        return (
                             <Link to={details.link} key={item.id} className="flex items-center gap-4 p-3 -m-3 rounded-lg hover:bg-slate-700/50 transition-colors">
                                <details.Icon className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                <div className="flex-grow">
                                    <p className="text-sm font-semibold text-slate-200">{details.title}</p>
                                    <p className="text-xs text-slate-500">Bookmarked on {new Date(item.addedAt).toLocaleDateString()}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

const LearningTranscriptSection: React.FC<{ activities: LearningActivity[] }> = ({ activities }) => {
    const activityConfig = {
        pathway_achieved: { Icon: TrophyIcon, color: 'text-yellow-400' },
        deck_completed: { Icon: AcademicCapIcon, color: 'text-blue-400' },
        video_watched: { Icon: PlayCircleIcon, color: 'text-rose-400' },
    };

    return (
        <div className="mt-12">
             <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <ClipboardDocumentListIcon className="w-8 h-8 text-blue-400"/>
                    <h2 className="text-2xl font-bold text-white">Learning Transcript (Private)</h2>
                </div>
                <button 
                    onClick={() => alert('Transcript download coming soon!')}
                    className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                >
                    <DocumentArrowDownIcon className="w-4 h-4" /> Download Transcript
                </button>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <div className="space-y-4">
                    {activities.map(activity => {
                        const { Icon, color } = activityConfig[activity.type];
                        return (
                            <div key={activity.id} className="flex items-center gap-4">
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center`}>
                                    <Icon className={`w-6 h-6 ${color}`} />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold text-slate-200">{activity.contentTitle}</p>
                                    <p className="text-xs text-slate-400">Completed on {new Date(activity.completedAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

const KnowledgeMapSection: React.FC<{ mapData: KnowledgeMapData }> = ({ mapData }) => {
    return (
        <div className="mt-12">
             <div className="flex items-center gap-3 mb-6">
                <CpuChipIcon className="w-8 h-8 text-blue-400"/>
                <h2 className="text-2xl font-bold text-white">Interactive Knowledge Map</h2>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <p className="text-sm text-slate-400 mb-4">This map visualizes your areas of expertise based on your activity across oraKLES. Larger nodes indicate more activity. Dashed nodes are suggested topics for you to explore next.</p>
                <KnowledgeMap data={mapData} />
            </div>
        </div>
    );
};


const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { getUserById, currentUser, careerGoals, careerPathways } = useAuth();
  
  const user = getUserById(userId || '');

  if (!user) {
    return (
      <div className="text-center py-20 text-white">
        <h1 className="text-2xl">User not found.</h1>
        <Link to="/" className="text-blue-400 hover:underline mt-4 inline-block">Go Home</Link>
      </div>
    );
  }

  const viewingOwnProfile = currentUser?.id === user.id;

  const currentTier = PROFESSIONAL_TIERS.find(t => t.id === user.tierId) || PROFESSIONAL_TIERS[0];
  const nextTier = PROFESSIONAL_TIERS.find(t => t.minXp > user.xp) || currentTier;
  const xpForNextTier = nextTier.minXp - currentTier.minXp;
  const xpProgress = user.xp - currentTier.minXp;
  const progressPercentage = xpForNextTier > 0 ? (xpProgress / xpForNextTier) * 100 : 100;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-slate-300">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <img src={user.avatarUrl} alt={user.name} className="h-40 w-40 rounded-full border-4 border-slate-700 shadow-lg"/>
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{user.name}</h1>
          <p className="text-lg text-slate-400">{user.email}</p>
          <div className="mt-4 flex items-center justify-center md:justify-start gap-3 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
            <TierIcon icon={currentTier.icon} className="h-6 w-6 text-blue-400"/>
            <span className="font-semibold text-lg text-slate-200">{currentTier.name}</span>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
        <h2 className="text-xl font-bold text-white">Progression</h2>
        <div className="mt-4">
          <div className="flex justify-between text-sm font-medium text-slate-400">
            <span>{currentTier.name}</span>
            <span>{nextTier.name}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-4 mt-1">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-4 rounded-full" style={{width: `${progressPercentage}%`}}></div>
          </div>
          <div className="text-center mt-2 text-sm text-slate-300 font-mono">{user.xp.toLocaleString()} / {nextTier.minXp.toLocaleString()} XP</div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-slate-400">Comments Posted</h3>
          <p className="text-4xl font-bold text-white mt-2">{user.stats.commentsPosted}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-slate-400">Docs Uploaded</h3>
          <p className="text-4xl font-bold text-white mt-2">{user.stats.documentsUploaded}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-slate-400">Insightful Marks</h3>
          <p className="text-4xl font-bold text-white mt-2">{user.stats.insightfulMarks}</p>
        </div>
      </div>
      
      {user.knowledgeMap && <KnowledgeMapSection mapData={user.knowledgeMap} />}

      <AchievementsSection badgeIds={user.badges} />

      {user.credentials && <CredentialsSection credentials={user.credentials} />}

      {viewingOwnProfile && user.careerGoals && user.activePathwayId && (
        <CareerPathwayPlanner goals={careerGoals} pathways={careerPathways} initialPathwayId={user.activePathwayId} />
      )}
      
      {user.projectPortfolio && user.projectPortfolio.length > 0 && <ProjectPortfolioSection projects={user.projectPortfolio} />}
      
      {user.skills && user.skills.length > 0 && currentUser && (
        <SkillsSection skills={user.skills} currentUserId={currentUser.id} viewingOwnProfile={viewingOwnProfile} />
      )}
      
      {viewingOwnProfile && user.myLibrary && user.myLibrary.length > 0 && <MyLibrarySection collections={user.myLibrary} />}
      
      {viewingOwnProfile && user.learningTranscript && user.learningTranscript.length > 0 && <LearningTranscriptSection activities={user.learningTranscript} />}

      {viewingOwnProfile && user.resumeVault && user.resumeVault.length > 0 && <ResumeVaultSection resumes={user.resumeVault} />}

    </div>
  );
};

export default UserProfile;
