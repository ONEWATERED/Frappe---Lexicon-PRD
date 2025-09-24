
import {
  User,
  ProfessionalTier,
  LexiconTerm,
  TermComment,
  TermDocument,
  Vendor,
  DroobiVideo,
  Session,
  OnDemandSession,
  Manual,
  FlashcardDeck,
  Flashcard,
  LearningPathway,
  EcosystemEntity,
  OneWaterMinute,
  IconName,
  UserProgress,
  lexiconCategoryNames,
  CommunityPost,
  CommunityEvent,
  ResearcherProfile,
  ResearchOpportunity,
  TopicSuggestion,
  BlogAuthor,
  BlogPost,
  UserCredential,
  CareerGoal,
  CareerPathway,
  ProjectPortfolioItem,
  UserSkill,
  ResumeDocument,
  LibraryCollection,
  LearningActivity,
  KnowledgeMapData,
  Conversation,
  PIPDocument,
  Publication,
  Patent,
  ResearchProject,
  FeatureSuggestion,
  KnowledgeEntry,
  KnowledgeCard,
  Reaction,
  LexiconCategory,
} from './types';

// --- CAREER GOALS DATA ---
export const careerGoals: CareerGoal[] = [
  { id: 'goal-001', title: 'Utility Manager', description: 'Oversee operations, finance, and strategic planning for a water or wastewater utility.' },
  { id: 'goal-002', title: 'Water Reuse Specialist', description: 'Design and implement advanced water recycling and reuse projects for municipal or industrial clients.' },
  { id: 'goal-003', title: 'Digital Water Expert', description: 'Lead digital transformation initiatives using technologies like Digital Twins, AI, and advanced analytics.' }
];

// --- CAREER PATHWAYS DATA ---
export const careerPathways: CareerPathway[] = [
  {
    id: 'path-001',
    goalId: 'goal-001', // Utility Manager
    steps: [
      { type: 'deck', title: 'Master Utility Management Concepts', description: 'Build a foundational understanding of utility governance and finance.', targetId: 'd-cat-utility_management', completed: true },
      { type: 'deck', title: 'Deepen Asset Management Expertise', description: 'Learn the principles of managing physical infrastructure assets effectively.', targetId: 'd001', completed: true },
      { type: 'video', title: 'Learn from Industry Leaders', description: 'Watch the "Asset Management Masterclass" to understand capital improvement prioritization.', targetId: 'vid004', completed: false },
      { type: 'article', title: 'Understand Digital Transformation', description: 'Read how Digital Twins are revolutionizing utility operations.', targetId: 'post-1', completed: false },
      { type: 'connection', title: 'Connect with a Mentor', description: 'Find a Sector Leader or Infrastructure Maverick to guide your career.', targetId: 'user-456', completed: false },
    ]
  },
  {
    id: 'path-002',
    goalId: 'goal-002',
    steps: []
  },
  {
    id: 'path-003',
    goalId: 'goal-003',
    steps: []
  }
];

const projectPortfolio_Alex: ProjectPortfolioItem[] = [
  {
    id: 'proj-alex-1',
    title: 'City of Springfield AMI Network Deployment',
    role: 'Project Engineer',
    summary: 'Led the technical deployment of a 50,000-node AMI network, including network design, hardware installation oversight, and data integration with the utility\'s billing system.',
    outcome: 'Reduced non-revenue water by 8% in the first year and improved billing accuracy by 99.8%. Enabled the launch of a customer water-use portal.',
    imageUrl: 'https://picsum.photos/seed/project-ami/800/600',
    taggedPartnerIds: ['v001', 'v002'],
    startDate: '2021-03-01T00:00:00Z',
    endDate: '2023-06-30T00:00:00Z',
  },
  {
    id: 'proj-alex-2',
    title: 'Wastewater Treatment Plant SCADA Upgrade',
    role: 'Controls Integration Specialist',
    summary: 'Managed the upgrade of the main wastewater plant\'s SCADA system, improving process automation and developing new HMI screens for operators.',
    outcome: 'Increased operational efficiency by 15% and provided real-time data for better process control, resulting in consistent permit compliance.',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    taggedPartnerIds: ['v005'],
    startDate: '2019-01-10T00:00:00Z',
    endDate: '2020-11-15T00:00:00Z',
  }
];

const skills_Alex: UserSkill[] = [
  { id: 'skill-01', name: 'Hydraulic Modeling', endorsements: [{ userId: 'user-456', timestamp: '2024-01-01T00:00:00Z' }] },
  { id: 'skill-02', name: 'Asset Management', endorsements: [{ userId: 'user-456', timestamp: '2024-01-01T00:00:00Z' }, { userId: 'user-789', timestamp: '2024-02-01T00:00:00Z' }] },
  { id: 'skill-03', name: 'SCADA & Controls', endorsements: [] },
  { id: 'skill-04', name: 'Project Management', endorsements: [{ userId: 'user-456', timestamp: '2024-01-01T00:00:00Z' }] },
  { id: 'skill-05', name: 'Non-Revenue Water', endorsements: [] },
];

const resumeVault_Alex: ResumeDocument[] = [
  { id: 'res-01', fileName: 'AlexJohnson_Resume_2024.pdf', versionName: 'Standard Resume', fileUrl: '#', uploadedAt: '2024-05-15T00:00:00Z', isPrimary: true },
  { id: 'res-02', fileName: 'AJ_Federal_CV.pdf', versionName: 'Federal Application CV', fileUrl: '#', uploadedAt: '2024-03-02T00:00:00Z', isPrimary: false },
];

const userCredentials_Alex: UserCredential[] = [
  {
    id: 'cred-001',
    name: 'Professional Engineer (PE), Civil',
    type: 'License',
    issuingBody: 'Texas Board of Professional Engineers',
    licenseNumber: '123456',
    issueDate: '2018-06-15T00:00:00Z',
    renewalDate: new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString(), // Expires in 2 months
    fileUrl: '#',
    ceuRequirements: {
      required: 15,
      completed: 12,
      unitName: 'PDH'
    }
  },
  {
    id: 'cred-002',
    name: 'Certified Floodplain Manager (CFM)',
    type: 'Certification',
    issuingBody: 'Association of State Floodplain Managers (ASFPM)',
    issueDate: '2020-01-20T00:00:00Z',
    renewalDate: '2026-01-20T00:00:00Z',
    fileUrl: '#',
    ceuRequirements: {
      required: 16,
      completed: 4,
      unitName: 'CEU'
    }
  },
   {
    id: 'cred-003',
    name: 'Water Treatment Operator, Class A',
    type: 'License',
    issuingBody: 'TCEQ',
    licenseNumber: 'WWTO-98765',
    issueDate: '2016-09-01T00:00:00Z',
    renewalDate: '2024-03-01T00:00:00Z', // Expired
    fileUrl: '#',
    ceuRequirements: {
      required: 30,
      completed: 30,
      unitName: 'Credit'
    }
  }
];

// --- MY LIBRARY DATA ---
const myLibrary_Alex: LibraryCollection[] = [
  {
    id: 'lib-col-1',
    name: 'PFAS Research',
    items: [
      { id: 'li-1', type: 'post', contentId: 'post-1', addedAt: '2024-05-20T10:00:00Z' },
      { id: 'li-2', type: 'term', contentId: 't009', addedAt: '2024-05-18T14:30:00Z' },
      { id: 'li-3', type: 'deck', contentId: 'd002', addedAt: '2024-05-15T09:00:00Z' },
    ],
  },
  {
    id: 'lib-col-2',
    name: 'Asset Management Study Prep',
    items: [
      { id: 'li-4', type: 'term', contentId: 't008', addedAt: '2024-04-10T11:00:00Z' },
      { id: 'li-5', type: 'video', contentId: 'vid004', addedAt: '2024-04-09T16:00:00Z' },
      { id: 'li-6', type: 'deck', contentId: 'd001', addedAt: '2024-04-08T12:00:00Z' },
      { id: 'li-7', type: 'manual', contentId: 'm001', addedAt: '2024-04-05T18:00:00Z' },
    ],
  },
];

// --- LEARNING TRANSCRIPT DATA ---
const learningTranscript_Alex: LearningActivity[] = [
    { id: 'lt-1', type: 'pathway_achieved', contentId: 'lp001', contentTitle: 'Utility Manager Certification', completedAt: '2024-05-10T00:00:00Z' },
    { id: 'lt-2', type: 'deck_completed', contentId: 'd001', contentTitle: 'Asset Management Fundamentals', completedAt: '2024-05-08T00:00:00Z' },
    { id: 'lt-3', type: 'video_watched', contentId: 'vid004', contentTitle: 'Asset Management Masterclass', completedAt: '2024-04-22T00:00:00Z' },
    { id: 'lt-4', type: 'deck_completed', contentId: 'd002', contentTitle: 'Key Regulatory Frameworks', completedAt: '2024-03-15T00:00:00Z' },
];

// --- KNOWLEDGE MAP DATA ---
const knowledgeMap_Alex: KnowledgeMapData = {
    nodes: [
        { id: 'asset_mgmt', label: 'Asset Mgmt', activityCount: 28 },
        { id: 'utility_management', label: 'Utility Mgmt', activityCount: 22 },
        { id: 'modeling', label: 'Modeling', activityCount: 15 },
        { id: 'water_distribution', label: 'Distribution', activityCount: 18 },
        { id: 'wastewater_treatment', label: 'Wastewater', activityCount: 9 },
        { id: 'regulations', label: 'Regulations', activityCount: 12 },
        // Suggested nodes
        { id: 'resiliency', label: 'Resiliency', activityCount: 0, isSuggested: true },
        { id: 'climate_impacts', label: 'Climate', activityCount: 0, isSuggested: true },
    ],
    links: [
        { source: 'asset_mgmt', target: 'utility_management' },
        { source: 'asset_mgmt', target: 'water_distribution' },
        { source: 'utility_management', target: 'regulations' },
        { source: 'modeling', target: 'water_distribution' },
        { source: 'asset_mgmt', target: 'modeling' },
        { source: 'wastewater_treatment', target: 'utility_management' },
        // Links to suggested
        { source: 'asset_mgmt', target: 'resiliency' },
        { source: 'utility_management', target: 'climate_impacts' },
        { source: 'resiliency', target: 'climate_impacts' },
    ],
};

// --- KNOWLEDGE CAPTURE DATA ---
export const knowledgeEntries: KnowledgeEntry[] = [
    {
        id: 'ke-001',
        userId: 'user-123',
        type: 'photo',
        title: 'Corroded Flange at Pump Station 3',
        description: 'Minor weeping observed on the lower bolt. Scheduled for replacement during next maintenance cycle.',
        mediaUrl: 'https://picsum.photos/seed/ke-001/800/600',
        thumbnailUrl: 'https://picsum.photos/seed/ke-001/400/300',
        tags: ['leak', 'pump station', 'flange', 'maintenance', 'corrosion'],
        lexiconTermIds: ['t001', 't008'],
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        sharingScope: 'private',
        metadata: { timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), device: 'Pixel 8 Pro' },
        status: 'published',
    },
    {
        id: 'ke-002',
        userId: 'user-123',
        type: 'audio',
        title: 'Field Note: Unusual Hum from VFD',
        description: 'Recorded the sound from the VFD for motor #2. It has a high-frequency pitch that wasn\'t present last week. Sending to senior tech for review.',
        mediaUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        transcript: 'This is Alex Johnson at Pump Station 3, it\'s Tuesday around 1400 hours. I\'m recording the sound from the VFD on motor number two. There\'s a high-frequency hum here that sounds new. I\'m going to send this over to Maria to see if she recognizes the signature. Everything else seems normal.',
        tags: ['vfd', 'motor', 'diagnostics', 'audio log'],
        lexiconTermIds: ['t003'],
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        sharingScope: 'public',
        metadata: { timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), device: 'iPhone 15', duration: 35 },
        status: 'published',
    },
    {
        id: 'ke-003',
        userId: 'user-123',
        type: 'video',
        title: 'Hydrant Flush Procedure',
        description: 'Quick video showing the proper sequence for opening and closing the hydrant at Elm & Main to avoid water hammer.',
        mediaUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        thumbnailUrl: 'https://picsum.photos/seed/ke-003/400/300',
        transcript: 'Okay, here is the hydrant at Elm and Main. We are going to open it slowly to prevent water hammer. First, crack the valve just a bit... then open it fully. To close, we will do the reverse: slow closure until it is completely seated. This prevents main breaks. Done.',
        tags: ['hydrant', 'flushing', 'procedure', 'water hammer'],
        lexiconTermIds: ['t002'],
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        sharingScope: 'organization',
        metadata: { timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), device: 'Pixel 8 Pro', duration: 52 },
        status: 'published',
    },
     {
        id: 'ke-004',
        userId: 'user-123',
        type: 'video',
        title: 'New SCADA HMI Screen',
        description: 'This is a screen recording of the new overview HMI for the clearwell levels. It shows the new trending objects and the updated alarm indicators. This is still pending sync to the cloud.',
        mediaUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        thumbnailUrl: 'https://picsum.photos/seed/ke-004/400/300',
        tags: ['scada', 'hmi', 'update'],
        lexiconTermIds: ['t003', 't008'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sharingScope: 'private',
        metadata: { timestamp: new Date().toISOString(), device: 'Desktop Screenshot' },
        status: 'pending_sync',
    }
];

export const knowledgeCards: KnowledgeCard[] = [
    {
        id: 'kc-001',
        sourceEntryId: 'ke-003',
        userId: 'user-123',
        title: 'Standard Procedure: Hydrant Flushing for Water Quality',
        scenario: 'When responding to a water quality complaint or performing routine system flushing in a residential area.',
        steps: [
            'Notify dispatch of flushing location and start time.',
            'Slowly open hydrant valve to avoid causing a water main break.',
            'Let water flow until it runs clear and chlorine residual is stable.',
            'Slowly close hydrant valve to prevent water hammer.',
            'Record flushing details in the log.'
        ],
        materials: ['Hydrant Wrench', 'Dechlorination tablets/diffuser', 'Chlorine test kit'],
        warnings: ['Always open and close hydrants slowly to prevent water hammer.', 'Ensure water is being dechlorinated before it enters a storm drain.'],
        attachmentEntryIds: [],
        lexiconTermIds: ['t002', 't008'],
        suggestedDestination: 'Manuals',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: 'published',
    }
];

export const reactions: Reaction[] = [
    { id: 'react-1', entityId: 'ke-002', userId: 'user-456', type: 'thanks', createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString() },
    { id: 'react-2', entityId: 'kc-001', userId: 'user-789', type: 'helped', createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
];

export const users: User[] = [
  { 
    id: 'user-123', 
    name: 'Alex Johnson', 
    avatarUrl: 'https://i.pravatar.cc/150?u=user-123',
    email: 'alex.j@utility.gov',
    tierId: 'T4',
    xp: 28500,
    stats: { 
      commentsPosted: 124, 
      documentsUploaded: 18, 
      insightfulMarks: 450,
      knowledgeContributions: 4,
      publicShares: 1,
      thanksReceived: 1,
      views: 120,
      savesByOthers: 3,
    },
    badges: ['B05', 'B06'],
    credentials: userCredentials_Alex,
    careerGoals: careerGoals,
    activePathwayId: 'path-001',
    // FIX: Added careerPathways property to align with updated User type.
    careerPathways: careerPathways,
    projectPortfolio: projectPortfolio_Alex,
    skills: skills_Alex,
    resumeVault: resumeVault_Alex,
    myLibrary: myLibrary_Alex,
    learningTranscript: learningTranscript_Alex,
    knowledgeMap: knowledgeMap_Alex,
    isOnline: true,
    lastSeen: new Date().toISOString(),
    connections: ['user-456', 'user-789'],
    pendingConnections: {
      incoming: ['user-999'],
      outgoing: ['user-888']
    },
    mentorshipStatus: 'offering',
    mentorshipTopics: ['asset_mgmt', 'utility_management'],
    knowledgeEntries: knowledgeEntries,
  },
  { 
    id: 'user-456', 
    name: 'Maria Garcia', 
    avatarUrl: 'https://i.pravatar.cc/150?u=user-456',
    email: 'maria.g@consultants.com',
    tierId: 'T5',
    xp: 62000,
    stats: { commentsPosted: 350, documentsUploaded: 42, insightfulMarks: 1200 },
    badges: ['B05'],
    isOnline: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    connections: ['user-123'],
    pendingConnections: { incoming: [], outgoing: [] },
    mentorshipStatus: 'none',
  },
  { 
    id: 'user-789', 
    name: 'Chen Wei', 
    avatarUrl: 'https://i.pravatar.cc/150?u=user-789',
    email: 'chen.w@university.edu',
    tierId: 'T3',
    xp: 11250,
    stats: { commentsPosted: 50, documentsUploaded: 5, insightfulMarks: 210 },
    badges: [],
    isOnline: true,
    lastSeen: new Date().toISOString(),
    connections: ['user-123'],
    pendingConnections: { incoming: [], outgoing: [] },
    mentorshipStatus: 'seeking',
    mentorshipTopics: ['modeling', 'ai_blockchain'],
  },
  { 
    id: 'user-999', 
    name: 'Bob Ross', 
    avatarUrl: 'https://i.pravatar.cc/150?u=user-999',
    email: 'bob.r@utility.gov',
    tierId: 'T1',
    xp: 1500,
    stats: { commentsPosted: 10, documentsUploaded: 1, insightfulMarks: 20 },
    badges: [],
    isOnline: true,
    lastSeen: new Date().toISOString(),
    connections: [],
    pendingConnections: { incoming: [], outgoing: [] },
    mentorshipStatus: 'seeking',
    mentorshipTopics: ['operations'],
  },
  { 
    id: 'user-888', 
    name: 'Jane Doe', 
    avatarUrl: 'https://i.pravatar.cc/150?u=user-888',
    email: 'jane.d@vendor.com',
    tierId: 'T4',
    xp: 25000,
    stats: { commentsPosted: 150, documentsUploaded: 22, insightfulMarks: 500 },
    badges: [],
    isOnline: false,
    lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    connections: [],
    pendingConnections: { incoming: [], outgoing: [] },
    mentorshipStatus: 'offering',
    mentorshipTopics: ['data', 'water_distribution'],
  }
];

export const PROFESSIONAL_TIERS: ProfessionalTier[] = [
  { id: 'T0', name: 'Associate', minXp: 0, icon: 'AcademicCapIcon' },
  { id: 'T1', name: 'Practitioner', minXp: 1000, icon: 'AcademicCapIcon' },
  { id: 'T2', name: 'Professional', minXp: 5000, icon: 'StarIcon' },
  { id: 'T3', name: 'Sector Specialist', minXp: 10000, icon: 'StarIcon' },
  { id: 'T4', name: 'Sector Leader', minXp: 25000, icon: 'ShieldCheckIcon' },
  { id: 'T5', name: 'Domain Expert', minXp: 50000, icon: 'SparklesIcon' },
  { id: 'T6', name: 'Infrastructure Maverick', minXp: 100000, icon: 'TrophyIcon' },
];

const termComments: TermComment[] = [
    {
        id: 'c001',
        user: users[1], // Maria
        text: "This is a great, clear definition. Could we add a section on the typical opex impact of deferring maintenance on this type of asset?",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
        replies: [
            {
                id: 'c002',
                user: users[0], // Alex
                text: "Good point, Maria. I've seen studies showing a 5-10x cost increase for reactive vs. proactive maintenance. I'll upload a whitepaper on that.",
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
                replies: [],
                insightfulCount: 12
            }
        ],
        insightfulCount: 28
    },
    {
        id: 'c003',
        user: users[2], // Chen
        text: "Does anyone have a good public dataset for asset failure prediction models? Specifically for cast iron water mains.",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        replies: [],
        insightfulCount: 15
    }
];

const termDocuments: TermDocument[] = [
  {
    id: 'doc001',
    user: users[0],
    title: 'AWWA M28 - Rehabilitation of Water Mains',
    fileUrl: '#',
    fileType: 'PDF',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'doc002',
    user: users[1],
    title: 'Case Study: City of Metropolis AMI Rollout',
    fileUrl: '#',
    fileType: 'Case Study',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

export const initialTerms: LexiconTerm[] = [
    { id: 't001', term: 'Asset Management', category: 'asset_mgmt', plainLanguageDefinition: "It's like making a plan to take care of all the important parts of a water system, like pipes and pumps, so they last a long time and don't break.", technicalDefinition: "A systematic process of developing, operating, maintaining, upgrading, and disposing of assets in the most cost-effective manner including all costs, risks, and performance attributes.", videoUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", comments: termComments, documents: termDocuments, viewCount: 1245, isPremium: true, relatedTermIds: ['t008'] },
    { id: 't002', term: 'Water Hammer', category: 'operations', plainLanguageDefinition: "Imagine a water pipe is like a hallway and the water is people running. If you suddenly slam a door, the people crash into it. Water hammer is when water crashes inside a pipe because a valve was closed too fast.", technicalDefinition: "A pressure surge or wave caused when a fluid in motion is forced to stop or change direction suddenly (momentum change).", viewCount: 876, relatedTermIds: ['t003', 't004'] },
    { id: 't003', term: 'SCADA', category: 'data', plainLanguageDefinition: "It's a computer system that lets people see and control what's happening in the water system from a central place, like a video game for managing water.", technicalDefinition: "Supervisory Control and Data Acquisition. A system of software and hardware elements that allows industrial organizations to control industrial processes locally or at remote locations.", viewCount: 2310, isPremium: true },
    { id: 't004', term: 'Non-Revenue Water', category: 'utility_management', plainLanguageDefinition: "This is water that gets cleaned and put into pipes but is lost before it reaches customers. It's like having a hole in your soda cup.", technicalDefinition: "The volume of water put into a water distribution system but not billed to customers. It includes losses from leaks, theft, and metering inaccuracies.", viewCount: 1532 },
    { id: 't005', term: 'Digital Twin', category: 'modeling', plainLanguageDefinition: "It's a perfect computer copy of the real water system. You can test things on the computer copy to see what would happen in real life without actually having to do it.", technicalDefinition: "A virtual representation of a physical object or system. It is updated from real-time data and uses simulation, machine learning, and reasoning to help decision-making.", viewCount: 1890, isPremium: true },
    { id: 't006', term: 'Clarifier', category: 'wastewater_treatment', plainLanguageDefinition: "A big tank where dirty water sits still, so all the heavy, yucky stuff can sink to the bottom, making the water cleaner.", technicalDefinition: "A settling tank built with mechanical means for continuous removal of solids being deposited by sedimentation. A clarifier is generally used to remove solid particulates or suspended solids from liquid for clarification and/or thickening.", viewCount: 721 },
    { id: 't007', term: 'Hydraulic Model', category: 'modeling', plainLanguageDefinition: "A computer program that acts like a map of all the water pipes, showing how the water moves and how much pressure there is everywhere.", technicalDefinition: "A computer-based simulation of a water distribution system, using demand, pipe, pump, and valve data to analyze pressures and flows under various operating conditions.", viewCount: 1102 },
    { id: 't008', term: 'Capital Improvement Plan (CIP)', category: 'utility_management', plainLanguageDefinition: "A utility's to-do list for big, expensive projects, like replacing old pipes or building a new water tower.", technicalDefinition: "A short-range plan, usually four to ten years, which identifies capital projects and equipment purchases, provides a planning schedule and identifies options for financing the plan.", viewCount: 954 },
    { id: 't009', term: 'PFAS', category: 'regulations', plainLanguageDefinition: "A group of man-made chemicals that are hard to get rid of and can be harmful if they get in our water.", technicalDefinition: "Per- and polyfluoroalkyl substances. A group of synthetic chemicals used in various industrial and consumer products, known for their persistence in the environment and potential health risks.", viewCount: 3489, isPremium: true },
    { id: 't010', term: 'Biogas', category: 'wastewater_treatment', plainLanguageDefinition: "A type of gas made from poop and other waste at a treatment plant that can be used to create electricity.", technicalDefinition: "A mixture of gases, primarily consisting of methane and carbon dioxide, produced from the decomposition of organic matter in the absence of oxygen (anaerobic digestion).", viewCount: 654 }
];

// FIX: Corrected type errors by moving non-vendor entities from this array to `ecosystemEntities`.
// This array now correctly contains only entities of type 'Vendor'.
export const vendors: Vendor[] = [
  { id: 'v001', name: 'Innovyze', logoUrl: 'https://pbs.twimg.com/profile_images/1359157298132955138/dbCoLqkM_400x400.jpg', type: 'Vendor', tagline: "The global leader in water infrastructure software.", location: "Portland, OR", domain: "innovyze.com", isClaimed: true, featuredVideoUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", claimedByUserId: 'user-888' },
  { id: 'v002', name: 'Badger Meter', logoUrl: 'https://mma.prnewswire.com/media/592285/Badger_Meter_Logo.jpg', type: 'Vendor', tagline: "Measure what matters.", location: "Milwaukee, WI", domain: "badgermeter.com", isClaimed: true, isFeatured: true },
  { id: 'v005', name: 'Rockwell Automation', logoUrl: 'https://companieslogo.com/img/orig/ROK-b6c93f87.png?t=1690352488', type: 'Vendor', tagline: "Connecting the imaginations of people with the potential of technology.", location: "Milwaukee, WI", domain: "rockwellautomation.com", isClaimed: false },
];

export const ecosystemEntities: EcosystemEntity[] = [
  ...vendors,
  // FIX: Moved these non-vendor entities here from the `vendors` array to satisfy type constraints.
  { id: 'v003', name: 'Carollo Engineers', logoUrl: 'https://www.carollo.com/img/logo-dark.svg', type: 'Consultant', tagline: "Working Wonders With Water®", location: "Walnut Creek, CA", domain: "carollo.com", isClaimed: true, isFeatured: true },
  { id: 'v004', name: 'USEPA', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/US_EPA_logo.svg/1200px-US_EPA_logo.svg.png', type: 'Government', tagline: "United States Environmental Protection Agency", location: "Washington, D.C.", domain: "epa.gov", isClaimed: true },
  { id: 'v006', name: 'AWWA', logoUrl: 'https://www.awwa.org/Portals/0/AWWA-2C-Tagline-Logo-Horizontal-RGB.jpg?ver=2019-10-09-152207-750', type: 'Non-Profit', tagline: "American Water Works Association", location: "Denver, CO", domain: "awwa.org", isClaimed: true },
  { id: 'v007', name: 'University of Michigan', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/U-M_Logo-Hex.svg/1200px-U-M_Logo-Hex.svg.png', type: 'Academia', tagline: "Civil & Environmental Engineering", location: "Ann Arbor, MI", domain: "cee.umich.edu", isClaimed: false },
  { id: 'e001', name: 'Hazen and Sawyer', logoUrl: 'https://www.hazenandsawyer.com/assets/hazen-logo-sm.png', type: 'Consultant', tagline: 'A firm of engineers and scientists, helping clients protect public health and the environment.', location: 'New York, NY', domain: 'hazenandsawyer.com', isClaimed: false },
  { id: 'e002', name: 'Black & Veatch', logoUrl: 'https://www.bv.com/sites/default/files/2022-09/bv-logo.png', type: 'Consultant', tagline: 'Building a World of Difference®.', location: 'Overland Park, KS', domain: 'bv.com', isClaimed: true },
  { id: 'e003', name: 'Xylem', logoUrl: 'https://www.xylem.com/siteassets/brand/xylem-logo-2022.svg', type: 'Vendor', tagline: 'Let\'s Solve Water.', location: 'Rye Brook, NY', domain: 'xylem.com', isClaimed: true, isFeatured: true, claimedByUserId: 'user-888',
    longDescription: 'Xylem is a leading global water technology company committed to developing innovative technology solutions to the world’s water challenges. The Company’s products and services move, treat, analyze, monitor and return water to the environment in public utility, industrial, residential and commercial building services settings.',
    hero: { videoUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", primaryCta: { label: "Explore Our Solutions", action: 'scroll:#content' } },
    contacts: [
      { id: 'c1', name: 'John Smith', title: 'Director of Sales, North America', avatarUrl: 'https://i.pravatar.cc/150?u=contact1', email: 'john.s@xylem.com', phone: '123-456-7890', online: true, calendarUrl: '#', chatUrl: '#', region: 'North America', role: 'Sales' },
      { id: 'c2', name: 'Emily White', title: 'Smart Water Specialist', avatarUrl: 'https://i.pravatar.cc/150?u=contact2', email: 'emily.w@xylem.com', online: false },
      { id: 'c3', name: 'David Chen', title: 'Treatment Technology Expert', avatarUrl: 'https://i.pravatar.cc/150?u=contact3', email: 'david.c@xylem.com', online: true, chatUrl: '#' }
    ],
    resources: [
      { id: 'r1', title: 'Digital Solutions Brochure', description: 'Explore our suite of digital tools for utility management.', fileUrl: '#', type: 'Brochure', category: 'Digital Water', views: 1024, downloads: 345 },
      { id: 'r2', title: 'Case Study: Smart Metering in Cityville', description: 'How our AMI technology reduced non-revenue water by 15%.', fileUrl: '#', type: 'Case Study', category: 'Smart Metering', views: 876, downloads: 210 }
    ],
    jobPostings: [
        {id: 'j1', title: 'Field Service Technician', location: 'Dallas, TX', type: 'Full-time', description: 'Provide on-site technical support for Xylem\'s advanced sensor and analytics equipment.', applyUrl: '#'},
        {id: 'j2', title: 'Software Engineer, Digital Twin', location: 'Remote', type: 'Full-time', description: 'Join our innovative team building the next generation of hydraulic modeling and digital twin software.', applyUrl: '#'}
    ],
    projects: [
        { id: 'p1', title: 'City of Springfield Digital Twin Implementation', summary: 'Developed a comprehensive digital twin for the city\'s water distribution network, enabling proactive maintenance and operational optimization.', coverImageUrl: 'https://picsum.photos/seed/project-xylem1/800/600', tags: ['Digital Twin', 'Smart Water', 'Modeling'], caseStudyUrl: '#' }
    ],
    visitorLogs: [
        { userId: 'user-123', firstVisit: '2024-05-01T10:00:00Z', lastVisit: '2024-05-20T14:00:00Z', totalVisits: 8, downloads: 2, views: 15 }
    ]
  },
];

export const droobiVideos: DroobiVideo[] = [
    { id: 'vid001', title: 'The Future of AI in Water Management', description: 'A deep dive into how artificial intelligence is revolutionizing utility operations, from predictive maintenance to demand forecasting.', thumbnailUrl: 'https://picsum.photos/seed/droobi-ai/800/450', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', category: 'Digital Transformation', durationMinutes: 28, airDate: '2023-10-15', vendorId: 'v001' },
    { id: 'vid002', title: 'Non-Revenue Water: Finding the Leaks', description: 'Experts from leading utilities share their strategies for detecting and reducing NRW using modern technology and field techniques.', thumbnailUrl: 'https://picsum.photos/seed/droobi-nrw/800/450', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', category: 'Utility Management', durationMinutes: 45, airDate: '2023-11-02' },
    { id: 'vid003', title: 'Navigating the New PFAS Regulations', description: 'A panel of regulatory experts and utility managers discuss the challenges and solutions for PFAS treatment and compliance.', thumbnailUrl: 'https://picsum.photos/seed/droobi-pfas/800/450', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', category: 'Regulations', durationMinutes: 52, airDate: '2023-11-20' },
    { id: 'vid004', title: 'Asset Management Masterclass', description: 'Learn the fundamentals of asset management, from inventory and condition assessment to risk-based capital planning.', thumbnailUrl: 'https://picsum.photos/seed/droobi-am/800/450', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', category: 'Asset Management', durationMinutes: 35, airDate: '2023-09-05', vendorId: 'v003' },
];

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);
const nextMonth = new Date(today);
nextMonth.setMonth(nextMonth.getMonth() + 1);


export const communityEvents: CommunityEvent[] = [
  {
    id: 'evt001',
    title: 'Webinar: AI in Leak Detection',
    description: 'Join experts from Innovyze and Carollo to discuss the latest advancements in AI-powered acoustic leak detection.',
    type: 'Webinar',
    submittedBy: users[1],
    timestamp: '2024-05-15T12:00:00Z',
    eventDate: tomorrow.toISOString(),
    location: 'Online',
    url: '#',
    attendeeIds: ['user-123', 'user-789'],
    registeredUserIds: ['user-123'],
    isLive: false,
    joinUrl: '#'
  },
  {
    id: 'evt002',
    title: 'ACE24 Annual Conference',
    description: 'The premier event for the water community to learn, connect, and be inspired to solve global water challenges.',
    type: 'Conference',
    submittedBy: users[0],
    timestamp: '2024-04-01T10:00:00Z',
    eventDate: nextWeek.toISOString(),
    location: 'Anaheim, CA',
    url: '#',
    attendeeIds: ['user-123', 'user-456', 'user-789'],
    registeredUserIds: ['user-123', 'user-456'],
    isLive: false,
    joinUrl: '#'
  },
  {
    id: 'evt003',
    title: 'Local Meetup: Digital Water Professionals',
    description: 'A casual get-together for professionals in the Austin area working with digital water technologies.',
    type: 'Meetup',
    submittedBy: users[2],
    timestamp: '2024-05-20T09:00:00Z',
    eventDate: nextMonth.toISOString(),
    location: 'Austin, TX',
    attendeeIds: [],
    registeredUserIds: [],
    isLive: false
  },
  {
    id: 'evt004',
    title: 'Live Now: Ask Me Anything with Hardeep',
    description: 'Hardeep, a Knowledge Avatar and expert in utility management, answers your questions live.',
    type: 'Webinar',
    submittedBy: users[0],
    timestamp: new Date().toISOString(),
    eventDate: new Date().toISOString(),
    location: 'Online',
    url: '#',
    attendeeIds: ['user-456', 'user-789'],
    registeredUserIds: ['user-123', 'user-456', 'user-789'],
    isLive: true,
    joinUrl: '#'
  },
  {
    id: 'evt005',
    title: 'Today: SCADA Security Workshop',
    description: 'A hands-on workshop covering the fundamentals of securing your SCADA systems from cyber threats.',
    type: 'Workshop',
    submittedBy: users[1],
    timestamp: new Date().toISOString(),
    eventDate: new Date().toISOString(),
    location: 'Online',
    url: '#',
    attendeeIds: ['user-123'],
    registeredUserIds: [],
    isLive: true,
    joinUrl: '#'
  }
];


export const droobiSessions: Session[] = [
    { id: 's001', title: 'Fireside Chat with George Hawkins', speaker: { name: 'George Hawkins', title: 'Founder, Moonshot Missions', avatarUrl: 'https://i.pravatar.cc/150?u=hawkins' }, dateTime: '2024-06-15T14:00:00Z', durationMinutes: 45, registeredAttendees: 1254, attendees: null, description: 'An intimate conversation with former DC Water CEO George Hawkins about leadership, innovation, and the future of water.', category: 'Leadership', tags: ['Innovation', 'Utility Management'], isLive: true, isPremium: true, joinUrl: '#' },
    { id: 's002', title: 'Live Demo: Innovyze InfoWater Pro', speaker: { name: 'Jane Smith', title: 'Product Manager, Innovyze', avatarUrl: 'https://i.pravatar.cc/150?u=janesmith' }, dateTime: '2024-06-20T11:00:00Z', registeredAttendees: 832, attendees: null, description: 'See the latest features of InfoWater Pro in action, including new AI-powered pipe failure prediction models.', category: 'Modeling', tags: ['Digital Twin', 'Software'], isLive: false, isPremium: false, joinUrl: '#' }
];

export const onDemandSessions: OnDemandSession[] = [
    { ...droobiSessions[0], id: 'od001', isLive: false, attendees: 2345 },
    { ...droobiSessions[1], id: 'od002', isLive: false, attendees: 1542 },
];

export const manuals: Manual[] = [
    { id: 'm001', title: 'Series 5400 Submersible Pump O&M', vendorId: 'v002', assetType: 'Pump', modelNumber: '5400-A', summary: 'Complete operation and maintenance guide for the Series 5400 submersible non-clog pumps.', coverImageUrl: 'https://picsum.photos/seed/manual-pump/400/600', fileUrl: '#', uploadedAt: '2023-01-15T00:00:00Z' },
    { id: 'm002', title: 'AquaSense pH Sensor Calibration', vendorId: 'v001', assetType: 'Sensor', modelNumber: 'AS-PH-2', summary: 'Step-by-step instructions for calibrating the AquaSense pH sensor for accurate readings.', coverImageUrl: 'https://picsum.photos/seed/manual-sensor/400/600', fileUrl: '#', uploadedAt: '2022-11-30T00:00:00Z' },
    { id: 'm003', title: 'IronHorse 500 Resilient Wedge Gate Valve', vendorId: 'v005', assetType: 'Valve', modelNumber: 'IH-500', summary: 'Installation, operation, and maintenance manual for the IronHorse 500 series gate valves.', coverImageUrl: 'https://picsum.photos/seed/manual-valve/400/600', fileUrl: '#', uploadedAt: '2023-03-20T00:00:00Z' },
];

export const flashcardDecks: FlashcardDeck[] = [
    { id: 'd001', title: 'Asset Management Fundamentals', description: 'Key concepts and terminology for utility asset management programs.', thumbnail_url: 'https://picsum.photos/seed/deck-am/400/300', category_id: 'asset_mgmt', vendor_ids: ['v001', 'v003'], sponsorship: { sponsor_id: 'e003'}, cardCount: 25 },
    { id: 'd002', title: 'Key Regulatory Frameworks', description: 'An overview of the Clean Water Act, Safe Drinking Water Act, and more.', thumbnail_url: 'https://picsum.photos/seed/deck-regs/400/300', category_id: 'regulations', cardCount: 30 },
    { id: 'd-cat-utility_management', title: 'Utility Management Concepts', description: 'Learn the basics of running a water utility.', thumbnail_url: 'https://picsum.photos/seed/deck-um/400/300', category_id: 'utility_management', cardCount: 15 },
    { id: 'd-cat-data', title: 'Data & Analytics in Water', description: 'From SCADA to AI, understand how data drives decisions.', thumbnail_url: 'https://picsum.photos/seed/deck-data/400/300', category_id: 'data', cardCount: 20 },
];

export const flashcards: Flashcard[] = [
  // Deck d001: Asset Management
  { id: 'f001', deck_id: 'd001', category_id: 'asset_mgmt', front: { content: 'What is the "Triple Bottom Line" in asset management?' }, back: { content: 'A framework that considers three performance areas: social, environmental, and financial.', bullets: ['Social: Public health, customer service', 'Environmental: Sustainability, compliance', 'Financial: Cost-effectiveness, ROI'] }, media: {} },
  { id: 'f002', deck_id: 'd001', category_id: 'asset_mgmt', front: { content: 'Define "Level of Service" (LoS).' }, back: { content: 'The outcomes customers and stakeholders experience, which are used to define performance targets for the utility.' }, media: {} },
  // Deck d002: Regulations
  { id: 'f003', deck_id: 'd002', category_id: 'regulations', front: { content: 'What is the primary goal of the Safe Drinking Water Act (SDWA)?' }, back: { content: 'To protect public health by regulating the nation\'s public drinking water supply.', bullets: ['Sets standards for drinking water quality', 'Oversees water suppliers who implement these standards'] }, media: {} },
  { id: 'f004', deck_id: 'd002', category_id: 'regulations', front: { content: 'What does NPDES stand for?' }, back: { content: 'National Pollutant Discharge Elimination System.', bullets: ['A permit program that controls water pollution', 'Requires facilities to obtain a permit before discharging pollutants into navigable waters'] }, media: {} },
];

export const learningPathways: LearningPathway[] = [
    { id: 'lp001', title: 'Utility Manager Certification', description: 'Master the core competencies of modern utility leadership, from asset management to digital transformation.', thumbnail_url: 'https://picsum.photos/seed/path-um/800/600', steps: [{ deck_id: 'd-cat-utility_management' }, { deck_id: 'd001' }], badge_id: 'B05', badge_name: 'Utility Management Steward' },
    { id: 'lp002', title: 'Digital Water Professional', description: 'Gain expertise in the technologies shaping the future of water, including smart sensors, hydraulic modeling, and AI.', thumbnail_url: 'https://picsum.photos/seed/path-dw/800/600', steps: [{ deck_id: 'd-cat-data' }], badge_id: 'B06', badge_name: 'Digital Water Pro' }
];

export const oneWaterMinute: OneWaterMinute = {
  dailyTopic: 'Understanding the Triple Bottom Line',
  description: "It's not just about the money. Learn how modern utilities balance financial, social, and environmental performance for sustainable success.",
  deckId: 'd001',
};

export const userProgress: UserProgress = {
  dailyFlips: { current: 34, goal: 50 },
  weeklyChallenges: { current: 2, goal: 5 },
  currentStreak: 14,
};

export const communityPosts: CommunityPost[] = [
  { id: 'p001', author: users[0], timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), type: 'question', channel: 'asset_mgmt', content: 'What is everyone using for mobile CMMS these days? Looking for something with good GIS integration.', likes: 15, comments: [{ user: users[1], text: 'We just switched to Cityworks and have been really happy with it.' }], tags: ['cmms', 'gis', 'software'] },
  { id: 'p002', author: users[2], timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), type: 'discussion', channel: 'modeling', content: "Just read a fascinating paper on using ML for real-time pump optimization. Seems promising but also complex to implement. Anyone have experience with this?", likes: 28, comments: [], tags: ['machine-learning', 'pumps', 'optimization'] },
];

export const researcherProfiles: ResearcherProfile[] = [
  { id: 'res001', name: 'Dr. Evelyn Reed', avatarUrl: 'https://i.pravatar.cc/150?u=res001', title: 'Professor of Environmental Engineering', university: 'Stanford University', universityLogoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Stanford_University_seal_2003.svg/1200px-Stanford_University_seal_2003.svg.png', bio: 'Dr. Reed\'s research focuses on the fate and transport of emerging contaminants, with a specific interest in developing novel treatment technologies for PFAS.', expertiseTags: ['PFAS', 'Contaminants', 'Water Treatment', 'Nanotechnology'], publications: [
      {id: 'pub1', title: 'Novel Sorbents for PFAS Removal', journal: 'Environmental Science & Technology', year: 2023, url: '#', doi: '10.1021/acs.est.3c01234'}
  ], patents: [], projects: [] },
  { id: 'res002', name: 'Dr. Kenji Tanaka', avatarUrl: 'https://i.pravatar.cc/150?u=res002', title: 'Associate Professor, Civil Engineering', university: 'University of Illinois Urbana-Champaign', universityLogoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/University_of_Illinois_Block_I.svg/1200px-University_of_Illinois_Block_I.svg.png', bio: 'Specializing in hydraulic modeling and computational fluid dynamics, Dr. Tanaka develops advanced digital twin frameworks for urban water systems to improve resilience against climate change.', expertiseTags: ['Hydraulic Modeling', 'Digital Twin', 'Resilience', 'CFD'], publications: [], patents: [], projects: [] },
];

export const researchOpportunities: ResearchOpportunity[] = [
  { id: 'opp001', title: 'Real-Time CSO Prediction Model', submittedBy: users[0], organization: ecosystemEntities[2], timestamp: new Date().toISOString(), problemStatement: 'Develop a machine learning model that can predict combined sewer overflow (CSO) events with high accuracy at least 6 hours in advance, using rainfall data and sensor inputs.', desiredOutcomes: 'A validated model with >90% accuracy, and a paper co-authored with our data science team.', domain: 'modeling', relatedDocuments: [], interestedResearcherIds: ['res002'] },
  { id: 'opp002', title: 'Cost-Effective Biosolids-to-Energy Solution', submittedBy: users[1], organization: ecosystemEntities[0], timestamp: new Date().toISOString(), problemStatement: 'Seeking innovative, scalable technologies to improve the energy yield from anaerobic digestion of wastewater biosolids, focusing on co-digestion strategies.', desiredOutcomes: 'A pilot-scale study proposal and a techno-economic analysis comparing at least three different approaches.', domain: 'wastewater_treatment', relatedDocuments: [], interestedResearcherIds: [] },
];

export const topicSuggestions: TopicSuggestion[] = [
    { id: 'ts001', title: 'AI for Satellite-Based Leak Detection', description: 'This seems like a game-changing technology for non-revenue water. I would love to see a presentation from a company that has successfully deployed this.', submittedBy: users[0], timestamp: '2024-05-10T00:00:00Z', upvoteUserIds: ['user-123', 'user-456', 'user-789'], recommendedSpeaker: 'AquaAI Corp', comments: [], tags: ['ai', 'leak-detection', 'non-revenue-water'] },
    { id: 'ts002', title: 'The Business Case for One Water', description: 'How do we effectively communicate the long-term value of integrated water management to policymakers and the public?', submittedBy: users[1], timestamp: '2024-05-18T00:00:00Z', upvoteUserIds: ['user-456', 'user-123'], comments: [], tags: ['one-water', 'governance', 'finance'] }
];

export const blogAuthors: BlogAuthor[] = [
    { id: 'ba001', name: 'Hardeep Anand', avatarUrl: 'https://i.pravatar.cc/150?u=hardeep', title: 'Founder, ORAKLES', isGuest: false },
    { id: 'ba002', name: 'Dr. Jane Foster', avatarUrl: 'https://i.pravatar.cc/150?u=jane-foster', title: 'Water Reuse Practice Leader, Carollo Engineers', isGuest: true }
];

export const blogPosts: BlogPost[] = [
    { id: 'post-1', title: 'The Semantic Web: Unlocking the Future of Water Infrastructure', subtitle: 'How a shared language can break down data silos and accelerate innovation across the sector.', authorId: 'ba001', publishDate: '2024-05-15T00:00:00Z', readTimeMinutes: 8, heroImageUrl: 'https://picsum.photos/seed/blog-semantic/1200/630', content: 'The water sector is at a crossroads...\n\nBy creating a universal vocabulary—a lexicon—we can enable true interoperability.', claps: 125, comments: [], vendorId: 'v003' },
    { id: 'post-2', title: 'Direct Potable Reuse: From Sci-Fi to Reality', subtitle: 'Exploring the technologies and public outreach strategies making DPR a viable solution for water scarcity.', authorId: 'ba002', publishDate: '2024-05-20T00:00:00Z', readTimeMinutes: 12, heroImageUrl: 'https://picsum.photos/seed/blog-dpr/1200/630', content: 'For decades, the idea of turning wastewater directly into drinking water was met with skepticism...\n\nNow, with advanced purification technologies, DPR is becoming a cornerstone of sustainable water management.', claps: 250, comments: [{ user: users[0], text: 'Great article, Dr. Foster!', timestamp: '2024-05-21T00:00:00Z' }] }
];

export const conversations: Conversation[] = [
    {
        id: 'conv-1',
        participantIds: ['user-123', 'user-456'],
        messages: [
            { id: 'm1-1', fromUserId: 'user-456', content: 'Hey Alex, great question in the asset management channel. I have a report I can share with you on mobile CMMS options.', timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), isRead: true },
            { id: 'm1-2', fromUserId: 'user-123', content: 'That would be amazing, Maria! Thanks so much.', timestamp: new Date(Date.now() - 28 * 60 * 1000).toISOString(), isRead: true },
        ]
    },
    {
        id: 'conv-2',
        participantIds: ['user-123', 'user-789'],
        messages: [
            { id: 'm2-1', fromUserId: 'user-789', content: 'Hi Alex, I saw you\'re offering mentorship in asset management. I\'d love to connect and learn more about your experience.', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), isRead: false }
        ]
    }
];

export const pipDocuments: PIPDocument[] = [
    { id: 'pip-1', title: 'City of Springfield Water Quality Report 2023', description: 'Annual consumer confidence report detailing water quality testing and results for the City of Springfield.', fileUrl: '#', fileType: 'Report', submittedByUserId: 'user-123', submittedByEntityId: 'e001', timestamp: new Date().toISOString(), region: 'United States', tags: ['water quality', 'ccr'], viewCount: 150, downloadCount: 45 },
    { id: 'pip-2', title: 'Advanced Metering Infrastructure (AMI) Business Case', description: 'A comprehensive business case analysis for implementing AMI in a mid-sized utility.', fileUrl: '#', fileType: 'Whitepaper', submittedByUserId: 'user-456', submittedByEntityId: 'v003', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), region: 'United States', tags: ['ami', 'smart meter', 'finance'], viewCount: 320, downloadCount: 112 },
    { id: 'pip-3', title: 'Lead Service Line Inventory and Replacement Plan', description: 'A template and guide for utilities developing their LSL inventory and replacement programs in accordance with new regulations.', fileUrl: '#', fileType: 'Case Study', submittedByUserId: 'user-888', submittedByEntityId: 'e003', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), region: 'United States', tags: ['lead and copper', 'lsl', 'regulations'], viewCount: 280, downloadCount: 98 },
];

export const featureSuggestions: FeatureSuggestion[] = [
    { id: 'fs-1', title: 'AI-Powered Resume Builder', description: 'Use my profile data (skills, projects, credentials) to automatically generate a professional resume tailored to specific job descriptions.', submittedBy: users[0], timestamp: '2024-05-01T00:00:00Z', upvoteUserIds: ['user-123', 'user-789'], comments: [], status: 'Planned', tags: ['profile', 'career'] },
    { id: 'fs-2', title: 'Gamified Learning Streaks', description: 'Award badges and XP bonuses for maintaining daily and weekly study streaks in the Academy to encourage consistent learning.', submittedBy: users[2], timestamp: '2024-04-15T00:00:00Z', upvoteUserIds: ['user-123', 'user-456', 'user-789'], comments: [], status: 'Shipped', tags: ['academy', 'gamification'] }
];
