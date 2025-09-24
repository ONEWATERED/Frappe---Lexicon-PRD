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
// FIX: Changed "CEC" to "CEU" to match the allowed types in `CEUProgress`.
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


export const users: User[] = [
  {
    id: 'user-123',
    name: 'Alex Johnson',
    email: 'alex.johnson@aquatech.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=user-123',
    tierId: 'T3',
    xp: 7250,
    stats: { commentsPosted: 42, documentsUploaded: 5, insightfulMarks: 15 },
    badges: ['B01', 'B02', 'B04', 'B05', 'B06'],
    credentials: userCredentials_Alex,
    careerGoals: careerGoals,
    activePathwayId: 'path-001',
    projectPortfolio: projectPortfolio_Alex,
    skills: skills_Alex,
    resumeVault: resumeVault_Alex,
    myLibrary: myLibrary_Alex,
    learningTranscript: learningTranscript_Alex,
    knowledgeMap: knowledgeMap_Alex,
    isOnline: true,
    lastSeen: new Date().toISOString(),
    connections: ['user-456'],
    pendingConnections: {
      incoming: ['user-789'],
      outgoing: [],
    },
    mentorshipStatus: 'seeking',
    mentorshipTopics: ['utility_management', 'asset_mgmt'],
  },
  {
    id: 'user-456',
    name: 'Maria Garcia',
    email: 'maria.g@hydro-solutions.io',
    avatarUrl: 'https://i.pravatar.cc/150?u=user-456',
    tierId: 'T4',
    xp: 18500,
    stats: { commentsPosted: 112, documentsUploaded: 12, insightfulMarks: 68 },
    badges: ['B01', 'B02', 'B03', 'B05'],
    isOnline: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    connections: ['user-123'],
    pendingConnections: {
      incoming: [],
      outgoing: [],
    },
    mentorshipStatus: 'offering',
    mentorshipTopics: ['asset_mgmt', 'regulations', 'governance'],
  },
  {
    id: 'user-789',
    name: 'Sam Chen',
    email: 's.chen@citywater.gov',
    avatarUrl: 'https://i.pravatar.cc/150?u=user-789',
    tierId: 'T2',
    xp: 2200,
    stats: { commentsPosted: 15, documentsUploaded: 1, insightfulMarks: 4 },
    badges: ['B01'],
    isOnline: true,
    lastSeen: new Date().toISOString(),
    connections: [],
    pendingConnections: {
      incoming: [],
      outgoing: ['user-123'],
    },
    mentorshipStatus: 'none',
  },
];

export const conversations: Conversation[] = [
  {
    id: 'convo-123-456',
    participantIds: ['user-123', 'user-456'],
    messages: [
      { id: 'msg-1', fromUserId: 'user-456', content: 'Hey Alex, great question in the asset management channel. Do you have a moment to chat about predictive maintenance models?', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), isRead: true },
      { id: 'msg-2', fromUserId: 'user-123', content: 'Hi Maria! Absolutely. Thanks for reaching out. I\'m free this afternoon if that works for you?', timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(), isRead: false }
    ]
  }
];

export const PROFESSIONAL_TIERS: ProfessionalTier[] = [
  { id: 'T0', name: 'Associate', minXp: 0, icon: 'AcademicCapIcon' },
  { id: 'T1', name: 'Technician', minXp: 250, icon: 'AcademicCapIcon' },
  { id: 'T2', name: 'Specialist', minXp: 1000, icon: 'StarIcon' },
  { id: 'T3', name: 'Senior Specialist', minXp: 5000, icon: 'StarIcon' },
  { id: 'T4', name: 'Principal Expert', minXp: 15000, icon: 'ShieldCheckIcon' },
  { id: 'T5', name: 'Sector Leader', minXp: 50000, icon: 'SparklesIcon' },
  { id: 'T6', name: 'Infrastructure Maverick', minXp: 100000, icon: 'TrophyIcon' },
];

const term_documents: TermDocument[] = [
    {
        id: 'doc001',
        user: users[1], // Maria Garcia
        title: 'WRF Study on NRW Management Strategies',
        fileUrl: '#',
        fileType: 'PDF',
        timestamp: '2024-03-15T10:00:00Z'
    },
    {
        id: 'doc002',
        user: users[0], // Alex Johnson
        title: 'Case Study: AMI Implementation in Small Utilities',
        fileUrl: '#',
        fileType: 'Case Study',
        timestamp: '2024-04-02T11:20:00Z'
    }
];

const term_comments: TermComment[] = [
    {
        id: 'c001',
        user: users[1],
        text: "This is a critical metric for any utility. Good explanation.",
        timestamp: "2024-05-20T14:30:00Z",
        insightfulCount: 18,
        replies: [
            {
                id: 'c001-r1',
                user: users[0],
                text: "Agreed! We saw a 15% reduction in NRW after implementing a new acoustic leak detection program.",
                timestamp: "2024-05-21T09:00:00Z",
                insightfulCount: 5,
                replies: []
            }
        ]
    },
    {
        id: 'c002',
        user: users[0],
        text: "Does anyone have a good resource on the financial impact of high NRW? Looking for some data for a board presentation.",
        timestamp: "2024-06-01T11:00:00Z",
        insightfulCount: 3,
        replies: []
    }
];

const videoUrlForAllTerms = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

export const initialTerms: LexiconTerm[] = [
  {
    id: 't001',
    term: 'Non-Revenue Water (NRW)',
    category: 'asset_mgmt',
    plainLanguageDefinition: 'Water that has been produced and is "lost" before it reaches the customer. This can be due to leaks, theft, or metering inaccuracies.',
    technicalDefinition: 'The difference between the volume of water put into a water distribution system and the volume that is billed to customers. It is usually expressed as a percentage of the total water produced.',
    videoUrl: videoUrlForAllTerms,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    linkedVendorIds: ['v001', 'v002'],
    comments: term_comments,
    documents: [term_documents[0]],
    viewCount: 1250,
    relatedTermIds: ['t004', 't008'],
    relatedDeckIds: ['d001'],
  },
  {
    id: 't002',
    term: 'Digital Twin',
    category: 'modeling',
    plainLanguageDefinition: 'A virtual model of a physical water system that is updated with real-time data. It helps operators understand and predict how the system will behave.',
    technicalDefinition: 'A dynamic, virtual representation of a physical asset, process, or system, which is continuously updated with data from its physical counterpart to enable simulation, analysis, and optimization.',
    videoUrl: videoUrlForAllTerms,
    linkedVendorIds: ['v003', 'v008'],
    comments: [],
    viewCount: 980,
    relatedTermIds: ['t003', 't004'],
    relatedDroobiVideoIds: ['vid001'],
    relatedDeckIds: ['d003'],
  },
   {
    id: 't003',
    term: 'SCADA System',
    category: 'operations',
    plainLanguageDefinition: 'A computer system that allows a water utility to monitor and control its equipment and processes remotely, like a central nervous system for the water network.',
    technicalDefinition: 'Supervisory Control and Data Acquisition (SCADA) is a system of software and hardware elements that allows industrial organizations to control industrial processes locally or at remote locations, monitor, gather, and process real-time data.',
    videoUrl: videoUrlForAllTerms,
    linkedVendorIds: ['v005'],
    viewCount: 750,
    relatedTermIds: ['t002']
  },
  {
    id: 't004',
    term: 'Advanced Metering Infrastructure (AMI)',
    category: 'water_distribution',
    plainLanguageDefinition: 'Smart water meters that can automatically send readings back to the utility, helping to detect leaks and provide customers with detailed usage information.',
    technicalDefinition: 'An integrated system of smart meters, communications networks, and data management systems that enables two-way communication between utilities and customers. It enables real-time monitoring and automated billing.',
    videoUrl: videoUrlForAllTerms,
    linkedVendorIds: ['v001', 'v002', 'v004'],
    documents: [term_documents[1]],
    viewCount: 1100,
    relatedTermIds: ['t001', 't002'],
    relatedDroobiVideoIds: ['vid003'],
  },
  {
    id: 't005',
    term: 'Membrane Bioreactor (MBR)',
    category: 'wastewater_treatment',
    plainLanguageDefinition: 'An advanced wastewater treatment process that combines traditional biological treatment with membrane filtration, resulting in very high-quality treated water.',
    technicalDefinition: 'A process that combines a membrane process like microfiltration or ultrafiltration with a suspended growth bioreactor. It is now widely used for municipal and industrial wastewater treatment.',
    videoUrl: videoUrlForAllTerms,
    linkedVendorIds: ['v006'],
    viewCount: 620,
    relatedTermIds: ['t006', 't009']
  },
  {
    id: 't006',
    term: 'Activated Sludge',
    category: 'wastewater_treatment',
    plainLanguageDefinition: 'The most common method for treating sewage. It uses a mixture of microorganisms (the "activated sludge") and oxygen to break down organic pollutants in the wastewater, cleaning it before it\'s discharged.',
    technicalDefinition: 'A biological wastewater treatment process in which a mixture of wastewater and microorganisms is agitated and aerated. The biological solids are then separated from the treated water and returned to the aeration process as needed.',
    videoUrl: videoUrlForAllTerms,
    linkedVendorIds: ['v001', 'v006'],
    viewCount: 450,
    relatedTermIds: ['t005', 't007', 't010']
  },
  {
    id: 't007',
    term: 'Anaerobic Digestion',
    category: 'wastewater_treatment',
    plainLanguageDefinition: 'A process where bacteria break down organic waste (like sewage sludge) in an environment without oxygen. This process produces biogas (which can be used for energy) and reduces the amount of sludge to be disposed of.',
    technicalDefinition: 'A sequence of processes by which microorganisms break down biodegradable material in the absence of oxygen. The process is used for industrial or domestic purposes to manage waste or to produce fuels.',
    videoUrl: videoUrlForAllTerms,
    linkedVendorIds: ['v001', 'v008'],
    viewCount: 380,
    relatedTermIds: ['t006', 't010'],
  },
  {
    id: 't008',
    term: 'Asset Management',
    category: 'utility_management',
    plainLanguageDefinition: 'The process of managing a utility\'s physical assets (like pipes, pumps, and plants) in a way that minimizes the total cost of owning and operating them, while delivering the desired level of service.',
    technicalDefinition: 'A systematic process of deploying, operating, maintaining, upgrading, and disposing of assets cost-effectively. It balances cost, risk, and performance to make informed decisions about infrastructure investment.',
    videoUrl: videoUrlForAllTerms,
    isPremium: true,
    viewCount: 2200,
    relatedTermIds: ['t001'],
    relatedDroobiVideoIds: ['vid004'],
    relatedDeckIds: ['d001'],
  },
  {
    id: 't009',
    term: 'Biological Nutrient Removal (BNR)',
    category: 'wastewater_treatment',
    plainLanguageDefinition: 'A wastewater treatment process designed to remove nitrogen and phosphorus from the water. This helps protect rivers and lakes from algae blooms caused by too many nutrients.',
    technicalDefinition: 'A process used for nitrogen and phosphorus removal from wastewater before it is discharged into surface or ground water. It involves configuring aerobic, anoxic, and anaerobic zones to encourage specific microbial activity.',
    videoUrl: videoUrlForAllTerms,
    isPremium: true,
    viewCount: 510,
    relatedTermIds: ['t005', 't006'],
  },
  {
    id: 't010',
    term: 'Biosolids',
    category: 'wastewater_treatment',
    plainLanguageDefinition: 'The nutrient-rich organic materials resulting from the treatment of sewage sludge. When treated and processed, they can be recycled as a fertilizer to improve and maintain productive soils.',
    technicalDefinition: 'Treated sewage sludge that meets U.S. Environmental Protection Agency (EPA) pollutant and pathogen requirements for land application and surface disposal. It is a source of essential plant nutrients and organic matter.',
    videoUrl: videoUrlForAllTerms,
    viewCount: 300,
    relatedTermIds: ['t006', 't007'],
  },
];

export const ecosystemEntities: EcosystemEntity[] = [
    { 
        id: 'v001', 
        name: 'Xylem Inc.', 
        logoUrl: 'https://logo.clearbit.com/xylem.com', 
        type: 'Vendor', 
        tagline: 'Let’s Solve Water.', 
        location: 'Rye Brook, NY', 
        domain: 'xylem.com', 
        isClaimed: true, 
        isFeatured: true,
        claimedByUserId: 'user-123',
        hero: {
            videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
            posterImage: 'https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            primaryCta: { label: 'Watch Our Story', action: 'modal:video' },
            secondaryCta: { label: 'Meet Our Team', action: 'scroll:#team' }
        },
        contacts: [
          { id: 'vc001', name: 'Samantha Carter', title: 'Lead Solutions Architect', avatarUrl: 'https://i.pravatar.cc/150?u=vc001', email: 's.carter@xylem.com', phone: '555-123-4567', online: true, calendarUrl: 'https://calendly.com/sample', chatUrl: '#', region: 'North America', role: 'Engineering' },
          { id: 'vc002', name: 'Daniel Jackson', title: 'Director of Sales, NA', avatarUrl: 'https://i.pravatar.cc/150?u=vc002', email: 'd.jackson@xylem.com', phone: '555-123-4568', online: false, calendarUrl: 'https://calendly.com/sample', region: 'North America', role: 'Sales' },
          { id: 'vc003', name: 'Janet Fraiser', title: 'Product Manager, Treatment', avatarUrl: 'https://i.pravatar.cc/150?u=vc003', email: 'j.fraiser@xylem.com', online: true, calendarUrl: undefined, region: 'EMEA', role: 'Product Management' },
        ],
        featuredVideoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        longDescription: 'Xylem is a leading global water technology company committed to developing innovative technology solutions to the world’s water challenges. The Company’s products and services move, treat, analyze, monitor and return water to the environment in public utility, industrial, residential and commercial building services settings. Xylem also provides a leading portfolio of smart metering, network technologies and advanced infrastructure analytics solutions for water, electric and gas utilities.',
        services: [
            { title: 'Water & Wastewater Treatment', description: 'Comprehensive solutions for biological treatment, disinfection, filtration, and sludge management.'},
            { title: 'Dewatering Solutions', description: 'Extensive rental fleet and expertise for temporary and permanent dewatering applications.'},
            { title: 'Measurement & Control', description: 'Sensors, controllers, and software for real-time monitoring of water networks.'}
        ],
        futureOfferings: [
            { title: 'Xy-AI Predictive Analytics Suite', description: 'A next-gen platform using AI to predict asset failure and optimize operational efficiency across entire water networks.'}
        ],
        sponsorships: [
            {
                feature: 'AI Co-pilot: Hardeep',
                description: 'Proudly sponsoring the development and hosting of the Hardeep Knowledge Avatar to democratize water utility expertise.'
            }
        ],
        projects: [
          {
            id: 'proj001',
            title: 'Digital Twin for City of South Bend',
            summary: 'Implementation of a real-time modeling solution that reduced combined sewer overflows (CSOs) by 70%.',
            coverImageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            tags: ['Digital Twin', 'CSO Reduction', 'Smart Water'],
            caseStudyUrl: '#'
          },
          {
            id: 'proj002',
            title: 'Flygt Concertor Pumping System Installation',
            summary: 'The world\'s first wastewater pumping system with integrated intelligence, reducing energy consumption by up to 50%.',
            coverVideoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
            tags: ['Wastewater Pumping', 'Energy Efficiency', 'Smart Pumping'],
            caseStudyUrl: '#'
          },
          {
            id: 'proj003',
            title: 'Sensus AMI Network Deployment',
            summary: 'Large-scale deployment of the FlexNet communication network for advanced metering infrastructure across a major metropolitan area.',
            coverImageUrl: 'https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            tags: ['AMI', 'Metering', 'Network Management'],
            caseStudyUrl: '#'
          },
          {
            id: 'proj004',
            title: 'Advanced Oxidation Process for PFAS Removal',
            summary: 'Pilot project demonstrating a novel AOP technology for the destruction of "forever chemicals" in drinking water sources.',
            coverImageUrl: undefined, // Test fallback
            tags: ['PFAS', 'Water Treatment', 'Innovation'],
            caseStudyUrl: undefined // Test fallback
          }
        ],
        resources: [
          { id: 'vr001', title: 'Flygt Concertor Pumping System', description: 'The world\'s first wastewater pumping system with integrated intelligence.', fileUrl: '#', type: 'Brochure', category: 'Pumping Systems', views: 1204, downloads: 312 },
          { id: 'vr002', title: 'Case Study: Digital Twin for City of South Bend', description: 'How real-time modeling reduced CSOs by 70%.', fileUrl: '#', type: 'Case Study', category: 'Digital Solutions', views: 855, downloads: 150 },
          { id: 'vr003', title: 'Sensus AMI Network Specifications', description: 'Technical details for the FlexNet communication network.', fileUrl: '#', type: 'Specification', category: 'Metering & AMI', views: 2430, downloads: 980 },
           { id: 'vr004', title: 'Leopold Filtration Systems Overview', description: 'Explore our comprehensive range of filtration solutions for municipal water.', fileUrl: '#', type: 'Brochure', category: 'Treatment', views: 540, downloads: 88 },

        ],
        jobPostings: [
          { id: 'jp001', title: 'Senior Software Engineer, Digital Water', location: 'Remote', type: 'Full-time', description: 'Join our team building the next generation of water utility software.', applyUrl: '#' },
          { id: 'jp002', title: 'Field Service Technician', location: 'Raleigh, NC', type: 'Full-time', description: 'Provide on-site support for Xylem\'s advanced treatment technologies.', applyUrl: '#' }
        ],
        visitorLogs: [
          { userId: 'user-456', firstVisit: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), lastVisit: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), totalVisits: 5, downloads: 2, views: 8 },
// FIX: Completed the visitor log entry with missing properties to match the 'VisitorLog' type.
          { userId: 'user-789', firstVisit: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), lastVisit: new Date(Date.now() - 30 * 60 * 1000).toISOString(), totalVisits: 3, downloads: 1, views: 10 },
        ],
    },
    {
        id: 'gov-001',
        name: 'US Environmental Protection Agency',
        logoUrl: 'https://logo.clearbit.com/epa.gov',
        type: 'Government',
        tagline: 'Protecting human health and the environment.',
        location: 'Washington, D.C.',
        domain: 'epa.gov',
        isClaimed: true,
        isFeatured: false,
    },
    {
        id: 'con-001',
        name: 'Carollo Engineers',
        logoUrl: 'https://logo.clearbit.com/carollo.com',
        type: 'Consultant',
        tagline: 'Engineers...Working Wonders With Water®',
        location: 'Walnut Creek, CA',
        domain: 'carollo.com',
        isClaimed: true,
        isFeatured: false,
    },
    {
        id: 'acad-001',
        name: 'Stanford University',
        logoUrl: 'https://logo.clearbit.com/stanford.edu',
        type: 'Academia',
        tagline: 'The wind of freedom blows.',
        location: 'Stanford, CA',
        domain: 'stanford.edu',
        isClaimed: true,
        isFeatured: false,
    },
];

// --- DROOBI TV DATA ---
export const droobiVideos: DroobiVideo[] = [
  { id: 'vid001', title: 'The Future of Digital Twins in Water', description: 'Explore how virtual models are changing utility operations.', thumbnailUrl: 'https://picsum.photos/seed/vid001/400/225', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', category: 'Digital Transformation', durationMinutes: 12, airDate: '2024-05-10T00:00:00Z', vendorId: 'v003' },
  { id: 'vid002', title: 'Advanced Treatment for PFAS', description: 'A deep dive into the latest technologies for removing "forever chemicals".', thumbnailUrl: 'https://picsum.photos/seed/vid002/400/225', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', category: 'Water Treatment', durationMinutes: 18, airDate: '2024-05-02T00:00:00Z' },
  { id: 'vid003', title: 'Mastering AMI Network Management', description: 'Best practices for deploying and maintaining a robust AMI network.', thumbnailUrl: 'https://picsum.photos/seed/vid003/400/225', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', category: 'Metering & Distribution', durationMinutes: 22, airDate: '2024-04-25T00:00:00Z', vendorId: 'v001' },
  { id: 'vid004', title: 'Asset Management Masterclass', description: 'Learn from industry leaders on prioritizing capital improvement projects.', thumbnailUrl: 'https://picsum.photos/seed/vid004/400/225', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', category: 'Utility Management', durationMinutes: 35, airDate: '2024-04-18T00:00:00Z' },
];

export const droobiSessions: Session[] = [];
export const onDemandSessions: OnDemandSession[] = [];

// --- ACADEMY DATA ---
export const oneWaterMinute: OneWaterMinute = {
  dailyTopic: 'Understanding Water Hammer',
  description: 'Learn what causes water hammer (hydraulic shock) and the simple measures utilities can take to prevent this destructive phenomenon in their distribution systems.',
  deckId: 'd004',
};

export const flashcardDecks: FlashcardDeck[] = [
    { id: 'd001', title: 'Asset Management Fundamentals', description: 'Key concepts for managing utility assets.', thumbnail_url: 'https://picsum.photos/seed/d001/400/225', category_id: 'asset_mgmt', cardCount: 15 },
    { id: 'd002', title: 'Key Regulatory Frameworks', description: 'Understanding the Safe Drinking Water Act and Clean Water Act.', thumbnail_url: 'https://picsum.photos/seed/d002/400/225', category_id: 'regulations', cardCount: 20 },
    { id: 'd003', title: 'Digital Twin Applications', description: 'Learn how digital twins are used for operational optimization.', thumbnail_url: 'https://picsum.photos/seed/d003/400/225', category_id: 'modeling', cardCount: 12 },
    { id: 'd004', title: 'Water Distribution Hydraulics', description: 'The basics of pressure, flow, and velocity.', thumbnail_url: 'https://picsum.photos/seed/d004/400/225', category_id: 'water_distribution', cardCount: 18, sponsorship: { sponsor_id: 'v001' } },
    { id: `d-cat-utility_management`, title: 'Intro to Utility Management', description: 'Auto-generated deck for the Utility Management category.', thumbnail_url: 'https://picsum.photos/seed/d-cat-um/400/225', category_id: 'utility_management', cardCount: 10 },
];

export const flashcards: Flashcard[] = [
    { id: 'fc001', deck_id: 'd001', category_id: 'asset_mgmt', front: { content: 'What is "Level of Service" (LoS)?' }, back: { content: 'The outcomes an organization aims to deliver to its customers, defining quality, quantity, reliability, and responsiveness.' }, media: {} },
    { id: 'fc002', deck_id: 'd001', category_id: 'asset_mgmt', front: { content: 'Define "Capital Improvement Plan" (CIP).' }, back: { content: 'A short-range plan, usually 4-10 years, which identifies capital projects and equipment purchases, provides a planning schedule, and identifies options for financing the plan.' }, media: {} },
];

export const learningPathways: LearningPathway[] = [
    { id: 'lp001', title: 'Utility Manager Certification', description: 'A comprehensive pathway covering finance, asset management, and leadership.', thumbnail_url: 'https://picsum.photos/seed/lp001/400/225', steps: [{deck_id: 'd-cat-utility_management'}, {deck_id: 'd001'}], badge_id: 'B05', badge_name: 'Utility Management Steward' },
];

// --- USER PROGRESS ---
export const userProgress: UserProgress = {
    dailyFlips: { current: 12, goal: 20 },
    weeklyChallenges: { current: 2, goal: 5 },
    currentStreak: 14,
};

// --- MANUALS DATA ---
export const manuals: Manual[] = [
    { id: 'm001', title: 'Flygt Concertor Pumping System O&M', vendorId: 'v001', assetType: 'Pump', modelNumber: 'CON-3000', summary: 'Operational and maintenance manual for the intelligent Concertor pumping system.', coverImageUrl: 'https://picsum.photos/seed/m001/300/400', fileUrl: '#', uploadedAt: '2023-01-15T00:00:00Z' },
    { id: 'm002', title: 'Sensus iPERL Smart Meter', vendorId: 'v001', assetType: 'Sensor', modelNumber: 'IPERL-G4', summary: 'Installation and technical specifications for the Sensus iPERL residential smart water meter.', coverImageUrl: 'https://picsum.photos/seed/m002/300/400', fileUrl: '#', uploadedAt: '2022-11-20T00:00:00Z' },
];

// --- COMMUNITY DATA ---
export const communityPosts: CommunityPost[] = [
  { id: 'post1', author: users[0], timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), type: 'question', channel: 'asset_mgmt', content: 'Does anyone have experience with acoustic leak detection on PVC pipes? Looking for recommendations on effective equipment.', likes: 12, comments: [{ user: users[1], text: 'We\'ve had great success with the Echologics EchoShore-DX system. Happy to chat more about it.'}], tags: ['leak detection', 'non-revenue water', 'acoustics'] },
];

export const communityEvents: CommunityEvent[] = [
  { id: 'event1', title: 'AWWA ACE24 Annual Conference', description: 'The premier event for water professionals.', type: 'Conference', submittedBy: users[1], timestamp: '2024-03-01T00:00:00Z', eventDate: '2024-06-10T00:00:00Z', location: 'Anaheim, CA', url: 'https://www.awwa.org/ace', attendeeIds: ['user-123', 'user-456'] },
];

// --- RESEARCH HUB DATA ---
export const researcherProfiles: ResearcherProfile[] = [
  {
    id: 'res-001',
    name: 'Dr. Kenji Tanaka',
    avatarUrl: 'https://i.pravatar.cc/150?u=res-001',
    title: 'PhD Candidate in Civil & Environmental Engineering',
    university: 'Stanford University',
    universityLogoUrl: 'https://logo.clearbit.com/stanford.edu',
    bio: 'Kenji\'s research focuses on the application of machine learning and artificial intelligence to predict failures in urban water distribution networks. He is developing novel predictive models that leverage real-time sensor data, historical maintenance records, and environmental factors to help utilities proactively manage their aging infrastructure and reduce non-revenue water. His work aims to bridge the gap between advanced data science and practical utility operations.',
    expertiseTags: ['Machine Learning', 'Hydraulic Modeling', 'Asset Management', 'Digital Twin', 'Predictive Maintenance'],
    publications: [
      { id: 'pub-001', title: 'A Bayesian Approach to Water Main Break Prediction Using Multi-Source Data', journal: 'Journal of Water Resources Planning and Management', year: 2023, url: '#', doi: '10.1061/(ASCE)WR.1943-5452.0001234' },
      { id: 'pub-002', title: 'Integrating SCADA and AMI Data for Real-Time Anomaly Detection in Water Networks', journal: 'Water Research', year: 2024, url: '#', doi: '10.1016/j.watres.2024.120567' }
    ],
    patents: [
      { id: 'pat-001', title: 'System and Method for Adaptive Hydraulic Model Calibration', patentNumber: 'US 11,234,567 B2', dateGranted: '2024-03-15T00:00:00Z', url: '#' }
    ],
    projects: [
      { id: 'proj-res-001', title: 'Digital Twin for the City of Palo Alto Water System', description: 'Lead developer for the predictive analytics module of a comprehensive digital twin, focusing on pressure transient analysis and leak localization.', status: 'Ongoing' }
    ],
  },
  {
    id: 'res-002',
    name: 'Dr. Lena Petrova',
    avatarUrl: 'https://i.pravatar.cc/150?u=res-002',
    title: 'Postdoctoral Researcher, Chemical Engineering',
    university: 'University of Michigan',
    universityLogoUrl: 'https://logo.clearbit.com/umich.edu',
    bio: 'Dr. Petrova is a leading researcher in the field of environmental remediation, with a specific focus on the destruction of per- and polyfluoroalkyl substances (PFAS). Her work involves synthesizing and testing novel nanocomposite materials for enhanced adsorption and catalytic degradation of "forever chemicals" in drinking water sources. She is passionate about developing cost-effective and scalable treatment solutions to address widespread PFAS contamination.',
    expertiseTags: ['PFAS Remediation', 'Advanced Oxidation Processes', 'Water Chemistry', 'Nanomaterials', 'Environmental Catalysis'],
    publications: [
      { id: 'pub-003', title: 'Graphene Oxide-Bismuth Ferrite Nanocomposites for PFOA Degradation via Piezocatalysis', journal: 'Environmental Science & Technology', year: 2023, url: '#', doi: '10.1021/acs.est.3c01234' },
      { id: 'pub-004', title: 'A Critical Review of Current and Emerging Technologies for PFAS Treatment', journal: 'Chemical Engineering Journal', year: 2024, url: '#', doi: '10.1016/j.cej.2024.148910' }
    ],
    patents: [],
    projects: [
      { id: 'proj-res-002', title: 'Pilot-Scale Testing of a Novel Adsorbent for GenX Removal', description: 'Investigating the performance and lifecycle of a new adsorbent material under real-world water matrix conditions.', status: 'Ongoing' },
      { id: 'proj-res-003', title: 'Electrochemical Oxidation of Short-Chain PFAS Compounds', description: 'A completed lab-scale study demonstrating high degradation efficiency for emerging PFAS contaminants.', status: 'Completed' }
    ],
  }
];
export const researchOpportunities: ResearchOpportunity[] = [
  {
    id: 'opp-001',
    title: 'Predictive Analytics for Real-Time CSO Event Management',
    submittedBy: users[0], // Alex Johnson
    organization: ecosystemEntities.find(e => e.id === 'v001')!, // Xylem Inc.
    timestamp: '2024-05-10T09:00:00Z',
    problemStatement: 'Combined Sewer Overflows (CSOs) pose a significant environmental challenge for many municipalities. While real-time control (RTC) systems exist, they often rely on rule-based logic. We are seeking research into the development and validation of a machine learning model that can predict CSO events with higher accuracy and longer lead times by integrating diverse data sources (rainfall, flow, level sensors, and weather radar data).',
    desiredOutcomes: 'A validated predictive model with documented performance metrics. A research paper suitable for publication in a peer-reviewed journal. A prototype dashboard for visualizing model outputs and predictions. Recommendations for sensor placement to optimize model accuracy.',
    domain: 'modeling',
    relatedDocuments: [],
    interestedResearcherIds: ['res-001'],
  },
  {
    id: 'opp-002',
    title: 'Assessing the Efficacy of Nature-Based Solutions for Urban Stormwater Runoff',
    submittedBy: users[2], // Sam Chen
    organization: ecosystemEntities.find(e => e.id === 'gov-001')!, // EPA
    timestamp: '2024-05-22T14:00:00Z',
    problemStatement: 'Green infrastructure and nature-based solutions (e.g., bioswales, green roofs, permeable pavements) are increasingly being implemented for stormwater management. However, there is a need for standardized methodologies to quantify their long-term performance, cost-effectiveness, and co-benefits (e.g., urban heat island reduction, biodiversity) across different climatic and geological regions within the US.',
    desiredOutcomes: 'A comprehensive framework for evaluating the multi-faceted performance of various nature-based solutions. A comparative analysis of at least three case studies in different US regions. A life-cycle cost analysis tool for utilities considering green infrastructure investments.',
    domain: 'resiliency',
    relatedDocuments: [],
    interestedResearcherIds: [],
  },
  {
    id: 'opp-003',
    title: 'Development of a Cost-Benefit Analysis Framework for Direct Potable Reuse (DPR) Projects',
    submittedBy: users[1], // Maria Garcia
    organization: ecosystemEntities.find(e => e.id === 'con-001')!, // Carollo
    timestamp: '2024-06-01T11:30:00Z',
    problemStatement: 'Direct Potable Reuse (DPR) is a promising strategy for water supply resilience, but it faces hurdles related to public perception, regulatory approval, and economic feasibility. A standardized, transparent framework is needed to help utilities and stakeholders conduct a holistic cost-benefit analysis that includes not only capital and O&M costs but also quantifies social, environmental, and public health factors.',
    desiredOutcomes: 'A publicly available, spreadsheet-based C-B analysis tool. A guidance document for implementing the framework, including best practices for stakeholder engagement. A report summarizing the framework\'s application to a hypothetical or real-world DPR project scenario.',
    domain: 'governance',
    relatedDocuments: [],
    interestedResearcherIds: [],
  }
];
export const topicSuggestions: TopicSuggestion[] = [];

// --- ORAKLES LABS DATA ---
export const featureSuggestions: FeatureSuggestion[] = [
  {
    id: 'feat-001',
    title: 'Interactive Manual Library',
    description: 'Create a centralized, searchable clearinghouse for all vendor O&M manuals. Users could annotate, share, and link manual sections directly to lexicon terms or community discussions, turning static PDFs into living documents.',
    submittedBy: users[0], // Alex Johnson
    timestamp: '2024-06-10T10:00:00Z',
    upvoteUserIds: ['user-123', 'user-456', 'user-789', 'user-456', 'user-123'],
    comments: [
// FIX: Removed 'replies' and 'insightfulCount' properties to match the 'FeatureComment' (TopicComment) type.
      { id: 'fc-1', user: users[1], text: 'This would be a game-changer for field technicians!', timestamp: '2024-06-11T11:00:00Z' }
    ],
    status: 'Planned',
    tags: ['Manuals', 'Library', 'Vendor Content'],
  },
  {
    id: 'feat-002',
    title: 'AI-Powered Resume Builder',
    description: 'Allow users to automatically generate a tailored resume based on their profile data, including project portfolio, skills, credentials, and learning transcripts. The AI could suggest keywords and formats for specific job applications.',
    submittedBy: users[2], // Sam Chen
    timestamp: '2024-05-28T14:00:00Z',
    upvoteUserIds: ['user-789', 'user-456'],
    comments: [],
    status: 'Under Consideration',
    tags: ['AI', 'Profile', 'Careers'],
  },
  {
    id: 'feat-003',
    title: 'Live CEU Tracking & Reporting',
    description: 'Integrate with credential renewals to automatically track Continuing Education Units (CEUs) earned through Academy courses, Droobi TV sessions, and community contributions. Users could then generate official reports for their licensing boards.',
    submittedBy: users[1], // Maria Garcia
    timestamp: '2024-06-05T09:20:00Z',
    upvoteUserIds: ['user-456', 'user-123'],
    comments: [],
    status: 'In Progress',
    tags: ['Credentials', 'Academy', 'Profile'],
  }
];


// --- INSIGHTS (BLOG) DATA ---
export const blogAuthors: BlogAuthor[] = [
  { id: 'author-1', name: 'Dr. Eleanor Vance', avatarUrl: 'https://i.pravatar.cc/150?u=author-1', title: 'Lead Water Scientist, Hydro-Solutions.io', isGuest: false },
  { id: 'author-2', name: 'Alex Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=user-123', title: 'Senior Specialist, oraKLES Member', isGuest: true },
  { id: 'author-3', name: 'Sam Chen', avatarUrl: 'https://i.pravatar.cc/150?u=user-789', title: 'Utility Operator, City Water', isGuest: true },
];

export const blogPosts: BlogPost[] = [
  { id: 'post-1', title: 'The Digital Twin Revolution: More Than Just a Model', subtitle: 'How real-time, data-driven replicas of physical systems are transforming utility operations, planning, and resilience.', authorId: 'author-1', publishDate: '2024-05-15T00:00:00Z', readTimeMinutes: 8, heroImageUrl: 'https://picsum.photos/seed/post-1/1200/630', content: 'Digital twins are rapidly moving from a buzzword to a fundamental tool for modern water utilities. They provide a dynamic, virtual representation of a physical asset or system, continuously updated with real-time data from sensors. This allows operators to not only see what is happening, but to simulate what *will* happen under different conditions.\n\nFor example, a utility can use a digital twin of its distribution network to predict the impact of a mainline break, optimize pumping schedules to reduce energy costs, or test the resilience of the system against climate change-induced drought scenarios. This proactive approach marks a significant shift from the reactive operational models of the past.', claps: 128, comments: [
    { user: users[1], text: "Great overview. We're currently in the pilot phase of our own digital twin implementation and the benefits are already becoming clear.", timestamp: "2024-05-16T10:00:00Z" }
  ], vendorId: 'v003' },
  { 
    id: 'post-2', 
    title: 'Navigating the PFAS Maze: A Guide for Utilities', 
    subtitle: "From detection to destruction, we break down the challenges and emerging solutions for tackling 'forever chemicals' in our water supplies.", 
    authorId: 'author-1', 
    publishDate: '2024-05-01T00:00:00Z', 
    readTimeMinutes: 10, 
    heroImageUrl: 'https://picsum.photos/seed/post-2/1200/630', 
    content: "Per- and polyfluoroalkyl substances (PFAS) represent one of the most significant challenges facing the water industry today. Their persistence in the environment and potential health risks have led to increasingly stringent regulations, forcing utilities to act.\n\nThe first step is robust monitoring and detection, which can be complex due to the sheer number of PFAS compounds. Once identified, treatment options range from established methods like Granular Activated Carbon (GAC) and Ion Exchange (IX) to emerging destructive technologies such as electrochemical oxidation and supercritical water oxidation. Each approach has its own set of trade-offs in terms of cost, effectiveness for different chain lengths, and operational complexity. Choosing the right strategy requires a deep understanding of the local water chemistry and regulatory landscape.", 
    claps: 256, 
    comments: [
        { user: users[0], text: "This is incredibly timely. We're evaluating GAC vs. IX right now and this provides some great context.", timestamp: "2024-05-02T14:00:00Z" },
        { user: users[2], text: "The cost of these new treatment systems is a major hurdle for smaller utilities. Are there any resources on funding or grants available?", timestamp: "2024-05-03T09:00:00Z" }
    ], 
    vendorId: 'v001' 
  },
  { 
    id: 'post-3', 
    title: "From Technician to Maverick: Charting Your Course in the Water Sector", 
    subtitle: "A veteran utility operator shares hard-won lessons on skill development, mentorship, and the mindset required to build a fulfilling and impactful career in water.", 
    authorId: 'author-3', 
    publishDate: '2024-05-20T00:00:00Z', 
    readTimeMinutes: 7, 
    heroImageUrl: 'https://picsum.photos/seed/post-3/1200/630', 
    content: "The path to becoming a leader in the water industry isn't just about accumulating years of service; it's about intentional growth. It starts with mastering the fundamentals and obtaining the necessary certifications for your role. But don't stop there.\n\nEmbrace technology. The utility of the future is digital, and understanding SCADA, GIS, and asset management software is no longer optional. Seek out mentors—platforms like oraKLES connect you with seasoned professionals who have walked the path before. Their guidance is invaluable. Finally, never stop being curious. Attend webinars, read industry publications, and engage in community discussions. A career in water is a commitment to lifelong learning, and the opportunities for those who embrace it are limitless.", 
    claps: 95, 
    comments: [
        { user: users[0], text: "Fantastic advice! Finding a good mentor made all the difference for me early in my career.", timestamp: "2024-05-21T11:00:00Z" }
    ], 
    vendorId: undefined
  },
  { 
    id: 'post-4', 
    title: "Beyond the Buzzword: What 'Digital Water' Actually Means for Your Utility", 
    subtitle: "Cut through the noise and discover the practical, step-by-step approach to digital transformation that delivers real ROI and operational resilience.", 
    authorId: 'author-2', 
    publishDate: '2024-04-20T00:00:00Z', 
    readTimeMinutes: 9, 
    heroImageUrl: 'https://picsum.photos/seed/post-4/1200/630', 
    content: "'Digital Water' is more than just a marketing term; it's a fundamental shift in how we manage water systems. At its core, it's about using data to make smarter, faster, and more predictive decisions. This journey often begins with foundational technologies like SCADA for process control and AMI for accurate billing and consumption data.\n\nThe next layer involves integrating this data. When your AMI system can inform your hydraulic model, or your SCADA alarms can automatically generate work orders in your asset management system, you start breaking down departmental silos. The ultimate goal is a holistic view of your entire operation, often visualized through a Digital Twin. This allows you to move from a reactive state (fixing breaks) to a proactive one (preventing them), saving money, reducing water loss, and improving service for your community.", 
    claps: 182, 
    comments: [], 
    vendorId: 'v001' 
  },
];


// --- PIP DATA ---
export const pipDocuments: PIPDocument[] = [
    {
        id: 'pip-doc-001',
        title: 'Water Research Foundation Report on Lead and Copper Rule Revisions',
        description: 'A comprehensive analysis of the EPA\'s LCR revisions and their expected impact on public water systems across the United States.',
        fileUrl: '#',
        fileType: 'Report',
        submittedByUserId: 'user-456',
        submittedByEntityId: 'v001',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        region: 'United States',
        tags: ['Regulations', 'Lead and Copper Rule', 'Compliance'],
        viewCount: 152,
        downloadCount: 45
    },
    {
        id: 'pip-doc-002',
        title: 'Case Study: City of Austin\'s Advanced Metering Infrastructure Rollout',
        description: 'Details the 10-year implementation plan, challenges, and outcomes of Austin Water\'s city-wide AMI deployment, resulting in a 12% reduction in non-revenue water.',
        fileUrl: '#',
        fileType: 'Case Study',
        submittedByUserId: 'user-123',
        submittedByEntityId: 'v001',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        region: 'United States',
        tags: ['AMI', 'Non-Revenue Water', 'Smart Water'],
        viewCount: 388,
        downloadCount: 120
    },
    {
        id: 'pip-doc-003',
        title: 'Innovations in Direct Potable Reuse: A National Perspective',
        description: 'A peer-reviewed publication exploring the latest technologies and regulatory hurdles for direct potable reuse projects in the US.',
        fileUrl: '#',
        fileType: 'Publication',
        submittedByUserId: 'user-789',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        region: 'United States',
        tags: ['Water Reuse', 'DPR', 'Treatment'],
        viewCount: 210,
        downloadCount: 78
    }
];

export const vendors: Vendor[] = ecosystemEntities.filter(e => e.type === 'Vendor') as Vendor[];