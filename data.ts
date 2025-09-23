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
  UserProgress
} from './types';

export const users: User[] = [
  {
    id: 'user-123',
    name: 'Alex Johnson',
    email: 'alex.johnson@aquatech.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=user-123',
    tierId: 'T3',
    xp: 7250,
    stats: { commentsPosted: 42, documentsUploaded: 5, insightfulMarks: 15 },
    badges: ['B01', 'B02', 'B04'],
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
  },
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
    { id: 'v001', name: 'Xylem Inc.', logoUrl: 'https://logo.clearbit.com/xylem.com', type: 'Vendor', tagline: 'Global water technology provider for water and wastewater applications.', location: 'Rye Brook, NY', domain: 'xylem.com', isClaimed: true, claimedByUserId: 'user-123' },
    { id: 'v002', name: 'Badger Meter', logoUrl: 'https://logo.clearbit.com/badgermeter.com', type: 'Vendor', tagline: 'Innovator in flow measurement, control, and communications solutions.', location: 'Milwaukee, WI', domain: 'badgermeter.com', isClaimed: false },
    { id: 'v003', name: 'Innovyze (An Autodesk Company)', logoUrl: 'https://logo.clearbit.com/autodesk.com', type: 'Vendor', tagline: 'Global leader in water infrastructure software.', location: 'Portland, OR', domain: 'innovyze.com', isClaimed: true },
    { id: 'c001', name: 'Black & Veatch', logoUrl: 'https://logo.clearbit.com/bv.com', type: 'Consultant', tagline: 'Employee-owned engineering, procurement, and consulting company.', location: 'Overland Park, KS', domain: 'bv.com', isClaimed: false },
    { id: 'g001', name: 'Environmental Protection Agency (EPA)', logoUrl: 'https://logo.clearbit.com/epa.gov', type: 'Government', tagline: 'Protecting Human Health and the Environment', location: 'Washington, D.C.', domain: 'epa.gov', isClaimed: true },
    { id: 'v004', name: 'Mueller Water Products', logoUrl: 'https://logo.clearbit.com/muellerwaterproducts.com', type: 'Vendor', tagline: 'Leading manufacturer of products for water transmission and distribution.', location: 'Atlanta, GA', domain: 'muellerwaterproducts.com', isClaimed: false},
    { id: 'v005', name: 'Grundfos', logoUrl: 'https://logo.clearbit.com/grundfos.com', type: 'Vendor', tagline: 'Advanced pump solutions and water technology.', location: 'Bjerringbro, Denmark (USA HQ: Brookshire, TX)', domain: 'grundfos.com', isClaimed: true},
    { id: 'v006', name: 'Evoqua Water Technologies', logoUrl: 'https://logo.clearbit.com/evoqua.com', type: 'Vendor', tagline: 'Providing mission-critical water and wastewater treatment solutions.', location: 'Pittsburgh, PA', domain: 'evoqua.com', isClaimed: false},
    { id: 'v007', name: 'American Water', logoUrl: 'https://logo.clearbit.com/amwater.com', type: 'Vendor', tagline: 'The largest publicly traded U.S. water and wastewater utility company.', location: 'Camden, NJ', domain: 'amwater.com', isClaimed: true},
    { id: 'v008', name: 'SUEZ', logoUrl: 'https://logo.clearbit.com/suez.com', type: 'Vendor', tagline: 'Water and waste management solutions for municipalities and industries.', location: 'Paris, France (USA HQ: Paramus, NJ)', domain: 'suez.com', isClaimed: false},
    { id: 'c002', name: 'Stantec', logoUrl: 'https://logo.clearbit.com/stantec.com', type: 'Consultant', tagline: 'Design with community in mind.', location: 'Edmonton, Canada (USA Offices Nationwide)', domain: 'stantec.com', isClaimed: true },
    { id: 'a001', name: 'Water Research Foundation', logoUrl: 'https://logo.clearbit.com/waterrf.org', type: 'Academia', tagline: 'Advancing the science of water.', location: 'Denver, CO', domain: 'waterrf.org', isClaimed: true },
    { id: 'n001', name: 'Charity: Water', logoUrl: 'https://logo.clearbit.com/charitywater.org', type: 'Non-Profit', tagline: 'Bringing clean and safe drinking water to people in developing countries.', location: 'New York, NY', domain: 'charitywater.org', isClaimed: true },
     { id: 'v009', name: 'Hach Company', logoUrl: 'https://logo.clearbit.com/hach.com', type: 'Vendor', tagline: 'Manufacturing and distributing analytical instruments for water quality.', location: 'Loveland, CO', domain: 'hach.com', isClaimed: false },
    { id: 'c003', name: 'Trimble Water', logoUrl: 'https://logo.clearbit.com/trimble.com', type: 'Consultant', tagline: 'Data management and remote monitoring for water utilities.', location: 'Westminster, CO', domain: 'water.trimble.com', isClaimed: true },
];

export const vendors: Vendor[] = ecosystemEntities.filter(e => e.type === 'Vendor') as Vendor[];

export const droobiVideos: DroobiVideo[] = [
    { id: 'vid001', title: 'The Digital Twin Revolution in Water Management', description: 'Explore how utilities are building virtual replicas of their water networks to optimize operations, predict failures, and plan for the future.', thumbnailUrl: 'https://picsum.photos/seed/aurora/800/450', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', category: 'Technology', durationMinutes: 42, airDate: '2024-05-10' },
    { id: 'vid002', title: 'Navigating the New Lead and Copper Rule Revisions', description: 'Experts break down the latest EPA regulations and what they mean for utilities and consumers.', thumbnailUrl: 'https://picsum.photos/seed/pipes/400/225', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', category: 'Regulation', durationMinutes: 58, airDate: '2024-04-22' },
    { id: 'vid003', title: 'AI-Powered Leak Detection', description: 'A case study on how artificial intelligence is saving millions of gallons by pinpointing leaks with unprecedented accuracy.', thumbnailUrl: 'https://picsum.photos/seed/ai-water/400/225', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', category: 'Technology', durationMinutes: 34, airDate: '2024-03-15' },
    // Fix: Corrected property 'name' to 'title' to match the DroobiVideo type.
    { id: 'vid004', title: 'Asset Management Masterclass: Prioritizing Capital Improvements', description: 'Learn how to make data-driven decisions for infrastructure renewal and replacement projects.', thumbnailUrl: 'https://picsum.photos/seed/asset-mgmt/400/225', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', category: 'Asset Management', durationMinutes: 72, airDate: '2024-02-28' },
];


export const droobiSessions: Session[] = [
    { id: 's001', title: 'Live Q&A: AI in Water Treatment', speaker: { name: 'Dr. Evelyn Reed', title: 'Chief Scientist, AquaAI', avatarUrl: 'https://i.pravatar.cc/150?u=ereed' }, dateTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), isLive: true, isPremium: true, joinUrl: '#', registeredAttendees: 1204, attendees: null, description: 'Join us for a live session on the future of AI.', category: 'AI & Blockchain', tags: ['AI', 'Live'] },
];

export const onDemandSessions: OnDemandSession[] = [
    { id: 's002', title: 'Workshop: SCADA Security Best Practices', speaker: { name: 'John Chen', title: 'Cybersecurity Expert', avatarUrl: 'https://i.pravatar.cc/150?u=jchen' }, dateTime: '2024-04-20T18:00:00Z', isLive: false, isPremium: false, joinUrl: '#', registeredAttendees: 850, attendees: 812, description: 'A recorded workshop on securing your operational technology.', category: 'Operations', tags: ['Security', 'SCADA'], durationMinutes: 90 },
];

export const manuals: Manual[] = [
    { id: 'm001', title: 'AquaLeap Series 5 Centrifugal Pump', vendorId: 'v001', assetType: 'Pump', modelNumber: 'AL-5000', summary: 'This manual provides comprehensive instructions for the installation, operation, and maintenance of the AquaLeap Series 5 pump.', coverImageUrl: 'https://picsum.photos/seed/pump-manual/300/400', fileUrl: '#', uploadedAt: '2023-11-10' },
    { id: 'm002', title: 'FlowIntel II Ultrasonic Sensor', vendorId: 'v002', assetType: 'Sensor', modelNumber: 'FI-2023-U', summary: 'Technical specifications and O&M guide for the FlowIntel II non-invasive ultrasonic flow sensor.', coverImageUrl: 'https://picsum.photos/seed/sensor-manual/300/400', fileUrl: '#', uploadedAt: '2024-01-20' },
    { id: 'm003', title: 'Guardian III Smart Hydrant', vendorId: 'v004', assetType: 'Hydrant', modelNumber: 'G-3-SM', summary: 'A complete guide to the Guardian III Smart Hydrant, including pressure monitoring and acoustic leak detection features.', coverImageUrl: 'https://picsum.photos/seed/hydrant-manual/300/400', fileUrl: '#', uploadedAt: '2024-03-05' },
    { id: 'm004', title: 'ResiValv Resilient Seated Gate Valve', vendorId: 'v004', assetType: 'Valve', modelNumber: 'RV-RSGV-24', summary: 'Installation, operation, and troubleshooting guide for Mueller resilient seated gate valves.', coverImageUrl: 'https://picsum.photos/seed/valve-manual/300/400', fileUrl: '#', uploadedAt: '2023-09-15' },
];

export const userProgress: UserProgress = {
    dailyFlips: { current: 3, goal: 5 },
    weeklyChallenges: { current: 0, goal: 1 },
    currentStreak: 8,
};

export const flashcardDecks: FlashcardDeck[] = [
    { id: 'd001', title: 'Asset Management Fundamentals', description: 'Key concepts in water asset management.', thumbnail_url: 'https://picsum.photos/seed/d001/400/225', category_id: 'asset_mgmt', cardCount: 25 },
    { id: 'd002', title: 'Key Regulatory Frameworks', description: 'Understanding the SDWA, CWA, and other key regulations.', thumbnail_url: 'https://picsum.photos/seed/d002/400/225', category_id: 'regulations', sponsorship: { sponsor_id: 'c001' }, cardCount: 18 },
    { id: 'd003', title: 'Intro to Water Modeling', description: 'Learn the basics of hydraulic and water quality modeling.', thumbnail_url: 'https://picsum.photos/seed/d003/400/225', category_id: 'modeling', sponsorship: { sponsor_id: 'v003' }, cardCount: 32 },
];

export const flashcards: Flashcard[] = [
    // Deck d001
    { id: 'fc001', deck_id: 'd001', category_id: 'asset_mgmt', front: { content: 'What is "Level of Service" (LoS)?' }, back: { content: 'The outcomes a water utility and its customers agree it should provide.', bullets: ['Defines performance targets', 'Balances cost, risk, and performance', 'Key to asset management planning'] }, media: {} },
    { id: 'fc002', deck_id: 'd001', category_id: 'asset_mgmt', front: { content: 'What are the two main types of asset failure?' }, back: { content: 'Physical Failure & Functional Failure' }, media: { image_url: 'https://picsum.photos/seed/fc002/400/200' } },
    // Deck d002
    { id: 'fc101', deck_id: 'd002', category_id: 'regulations', front: { content: 'What is the primary objective of the Safe Drinking Water Act (SDWA)?' }, back: { content: 'The principal federal law in the United States intended to ensure safe drinking water for the public.', bullets: ['Enacted in 1974', 'Authorizes EPA to set national health-based standards'] }, media: {} },
    { id: 'fc102', deck_id: 'd002', category_id: 'regulations', front: { content: 'What does NPDES stand for?' }, back: { content: 'National Pollutant Discharge Elimination System.', bullets: ['Authorized by the Clean Water Act', 'Controls water pollution by regulating point sources'] }, media: {} },
     // Deck d003
    { id: 'fc201', deck_id: 'd003', category_id: 'modeling', front: { content: 'What does a hydraulic model simulate?' }, back: { content: 'The flow and pressure of water in a pipe network.' }, media: {} },
];

export const learningPathways: LearningPathway[] = [
    { id: 'lp001', title: 'Utility Manager Certification', description: 'Master the language of asset management, finance, and regulatory compliance for aspiring utility leaders.', thumbnail_url: 'https://picsum.photos/seed/lp001/400/225', steps: [{ deck_id: 'd001' }, { deck_id: 'd002' }], badge_id: 'B05', badge_name: 'Cert. Manager' },
    { id: 'lp002', title: 'Digital Water Professional', description: 'Gain expertise in the tools and concepts shaping the future of water, from AMI to Digital Twins.', thumbnail_url: 'https://picsum.photos/seed/lp002/400/225', steps: [{ deck_id: 'd003' }], badge_id: 'B06', badge_name: 'Digital Pro' },
];

export const oneWaterMinute: OneWaterMinute = {
  dailyTopic: 'Understanding the SDWA',
  description: 'The principal federal law in the United States intended to ensure safe drinking water for the public.',
  deckId: 'd002'
};