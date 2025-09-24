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
} from './types';

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
    credentials: userCredentials_Alex,
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
  { id: 'user-789', name: 'Sam Chen', email: 's.chen@citywater.gov', avatarUrl: 'https://i.pravatar.cc/150?u=user-789', tierId: 'T2', xp: 2200, stats: { commentsPosted: 15, documentsUploaded: 1, insightfulMarks: 4 }, badges: ['B01'] },

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
          { userId: 'user-789', firstVisit: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), lastVisit: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), totalVisits: 1, downloads: 0, views: 2 }
        ],
        academyContribution: {
          show: true,
          badgeUrl: 'https://picsum.photos/seed/academy-badge/100/100',
          blurb: "Xylem contributes expert lessons to our Academy.",
          academyUrl: '#'
        },
        sponsorshipDetails: {
          show: true,
          badgeUrl: 'https://picsum.photos/seed/sponsor-badge/100/100',
          text: 'Proudly supporting the oraKLES AI Co-pilots initiative to help drive intelligent water infrastructure.',
          linkUrl: '/ai-agents'
        },
        highlights: [
          { icon: 'chat', label: 'Live Chat & Real-Time Engagement' },
          { icon: 'calendar', label: 'Meet the Team via Scheduling' },
          { icon: 'book', label: 'Academy Knowledge Contributor' },
          { icon: 'blog', label: 'Active Blog & Insights' },
          { icon: 'projects', label: 'Global Impact Projects' },
          { icon: 'sponsor', label: 'Innovation Sponsor' }
        ],
        newsletter: {
          show: true,
          successMessage: "Thanks! We’ll be in touch soon."
        },
        social: {
          linkedin: "https://linkedin.com/company/xylem",
          twitter: "https://twitter.com/xyleminc",
          youtube: "https://youtube.com/@xylem",
          shareEnabled: true
        },
        conferenceBooth: [
          {
            id: 'cb001',
            title: 'Xylem Vue: Smart Water Solutions',
            description: 'Our comprehensive brochure detailing the entire suite of Xylem Vue digital solutions for utilities.',
            thumbnailUrl: 'https://picsum.photos/seed/xylem-brochure/400/300',
            actionUrl: '#',
            type: 'Brochure',
          },
          {
            id: 'cb002',
            title: 'Flygt Concertor - Cut Sheet',
            description: 'Technical specifications and performance data for the world\'s first wastewater pumping system with integrated intelligence.',
            thumbnailUrl: 'https://picsum.photos/seed/flygt-pump/400/300',
            actionUrl: '#',
            type: 'Cut Sheet',
          },
          {
            id: 'cb003',
            title: 'Sensus iPERL Meter - Video Demo',
            description: 'Watch a hands-on demonstration of the Sensus iPERL smart water meter, highlighting its accuracy and IoT capabilities.',
            thumbnailUrl: 'https://picsum.photos/seed/sensus-demo/400/300',
            actionUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
            type: 'Video Demo',
          },
          {
            id: 'cb004',
            title: 'Win a YETI Cooler!',
            description: 'Enter our conference giveaway! Fill out a short survey for your chance to win a YETI Tundra Haul Hard Cooler.',
            thumbnailUrl: 'https://picsum.photos/seed/yeti-giveaway/400/300',
            actionUrl: '#',
            type: 'Giveaway',
          },
        ]
    },
    { id: 'v002', name: 'Badger Meter', logoUrl: 'https://logo.clearbit.com/badgermeter.com', type: 'Vendor', tagline: 'Innovator in flow measurement, control, and communications solutions.', location: 'Milwaukee, WI', domain: 'badgermeter.com', isClaimed: false },
    { id: 'v003', name: 'Innovyze (An Autodesk Company)', logoUrl: 'https://logo.clearbit.com/autodesk.com', type: 'Vendor', tagline: 'Global leader in water infrastructure software.', location: 'Portland, OR', domain: 'innovyze.com', isClaimed: true },
    { id: 'c001', name: 'Black & Veatch', logoUrl: 'https://logo.clearbit.com/bv.com', type: 'Consultant', tagline: 'Employee-owned engineering, procurement, and consulting company.', location: 'Overland Park, KS', domain: 'bv.com', isClaimed: false },
    { id: 'g001', name: 'Environmental Protection Agency (EPA)', logoUrl: 'https://logo.clearbit.com/epa.gov', type: 'Government', tagline: 'Protecting Human Health and the Environment', location: 'Washington, D.C.', domain: 'epa.gov', isClaimed: true },
    { id: 'v004', name: 'Mueller Water Products', logoUrl: 'https://logo.clearbit.com/muellerwaterproducts.com', type: 'Vendor', tagline: 'Leading manufacturer of products for water transmission and distribution.', location: 'Atlanta, GA', domain: 'muellerwaterproducts.com', isClaimed: false},
    { id: 'v005', name: 'Grundfos', logoUrl: 'https://logo.clearbit.com/grundfos.com', type: 'Vendor', tagline: 'Advanced pump solutions and water technology.', location: 'Bjerringbro, Denmark (USA HQ: Brookshire, TX)', domain: 'grundfos.com', isClaimed: false, isFeatured: false},
    { id: 'v006', name: 'Evoqua Water Technologies', logoUrl: 'https://logo.clearbit.com/evoqua.com', type: 'Vendor', tagline: 'Providing mission-critical water and wastewater treatment solutions.', location: 'Pittsburgh, PA', domain: 'evoqua.com', isClaimed: false},
    { id: 'v007', name: 'American Water', logoUrl: 'https://logo.clearbit.com/amwater.com', type: 'Vendor', tagline: 'The largest publicly traded U.S. water and wastewater utility company.', location: 'Camden, NJ', domain: 'amwater.com', isClaimed: true},
    { id: 'v008', name: 'SUEZ', logoUrl: 'https://logo.clearbit.com/suez.com', type: 'Vendor', tagline: 'Water and waste management solutions for municipalities and industries.', location: 'Paris, France (USA HQ: Paramus, NJ)', domain: 'suez.com', isClaimed: false},
    { id: 'c002', name: 'Stantec', logoUrl: 'https://logo.clearbit.com/stantec.com', type: 'Consultant', tagline: 'Design with community in mind.', location: 'Edmonton, Canada (USA Offices Nationwide)', domain: 'stantec.com', isClaimed: false, isFeatured: false },
    { id: 'a001', name: 'Water Research Foundation', logoUrl: 'https://logo.clearbit.com/waterrf.org', type: 'Academia', tagline: 'Advancing the science of water.', location: 'Denver, CO', domain: 'waterrf.org', isClaimed: true },
    { id: 'n001', name: 'Charity: Water', logoUrl: 'https://logo.clearbit.com/charitywater.org', type: 'Non-Profit', tagline: 'Bringing clean and safe drinking water to people in developing countries.', location: 'New York, NY', domain: 'charitywater.org', isClaimed: true },
     { id: 'v009', name: 'Hach Company', logoUrl: 'https://logo.clearbit.com/hach.com', type: 'Vendor', tagline: 'Manufacturing and distributing analytical instruments for water quality.', location: 'Loveland, CO', domain: 'hach.com', isClaimed: false },
    { id: 'c003', name: 'Trimble Water', logoUrl: 'https://logo.clearbit.com/trimble.com', type: 'Consultant', tagline: 'Data management and remote monitoring for water utilities.', location: 'Westminster, CO', domain: 'water.trimble.com', isClaimed: true },
];

export const vendors: Vendor[] = ecosystemEntities.filter(e => e.type === 'Vendor') as Vendor[];

export const droobiVideos: DroobiVideo[] = [
    { id: 'vid001', title: 'The Digital Twin Revolution in Water Management', description: 'Explore how utilities are building virtual replicas of their water networks to optimize operations, predict failures, and plan for the future.', thumbnailUrl: 'https://picsum.photos/seed/aurora/800/450', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', category: 'Technology', durationMinutes: 42, airDate: '2024-05-10', vendorId: 'v001' },
    { id: 'vid002', title: 'Navigating the New Lead and Copper Rule Revisions', description: 'Experts break down the latest EPA regulations and what they mean for utilities and consumers.', thumbnailUrl: 'https://picsum.photos/seed/pipes/400/225', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', category: 'Regulation', durationMinutes: 58, airDate: '2024-04-22' },
    { id: 'vid003', title: 'AI-Powered Leak Detection', description: 'A case study on how artificial intelligence is saving millions of gallons by pinpointing leaks with unprecedented accuracy.', thumbnailUrl: 'https://picsum.photos/seed/ai-water/400/225', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', category: 'Technology', durationMinutes: 34, airDate: '2024-03-15' },
    { id: 'vid004', title: 'Asset Management Masterclass: Prioritizing Capital Improvements', description: 'Learn how to make data-driven decisions for infrastructure renewal and replacement projects.', thumbnailUrl: 'https://picsum.photos/seed/asset-mgmt/400/225', videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', category: 'Asset Management', durationMinutes: 72, airDate: '2024-02-28', vendorId: 'v001' },
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
    { id: 'm005', title: 'Sensus iPERL Smart Water Meter', vendorId: 'v001', assetType: 'Sensor', modelNumber: 'iPERL-2024', summary: 'Installation and configuration guide for the Sensus iPERL residential and commercial smart water meters.', coverImageUrl: 'https://picsum.photos/seed/iperl-manual/300/400', fileUrl: '#', uploadedAt: '2024-02-18' },

];

export const userProgress: UserProgress = {
    dailyFlips: { current: 3, goal: 5 },
    weeklyChallenges: { current: 0, goal: 1 },
    currentStreak: 8,
};

// --- ACADEMY DATA GENERATION ---

// 1. Auto-generate flashcards from lexicon terms
const lexiconFlashcards: Flashcard[] = initialTerms.map((term, index) => ({
    id: `fc-term-${term.id}`,
    deck_id: `d-cat-${term.category}`, // This will be used to link to the auto-generated decks
    category_id: term.category,
    front: { content: `What is ${term.term}?` },
    back: { content: term.plainLanguageDefinition },
    media: {},
}));

// 2. Auto-generate decks from lexicon categories
const termsByCategory = initialTerms.reduce((acc, term) => {
    if (!acc[term.category]) {
        acc[term.category] = [];
    }
    acc[term.category].push(term);
    return acc;
}, {} as Record<string, LexiconTerm[]>);

const lexiconDecks: FlashcardDeck[] = Object.entries(termsByCategory).map(([category, terms]) => ({
    id: `d-cat-${category}`,
    title: `${lexiconCategoryNames[category as keyof typeof lexiconCategoryNames]} Concepts`,
    description: `Key terms and concepts related to ${lexiconCategoryNames[category as keyof typeof lexiconCategoryNames]}.`,
    thumbnail_url: `https://picsum.photos/seed/${category}/400/225`,
    category_id: category as keyof typeof lexiconCategoryNames,
    cardCount: terms.length,
}));

// 3. Existing + new data
const existingDecks: FlashcardDeck[] = [
    { id: 'd001', title: 'Asset Management Fundamentals', description: 'Key concepts in water asset management.', thumbnail_url: 'https://picsum.photos/seed/d001/400/225', category_id: 'asset_mgmt', cardCount: 25, sponsorship: { sponsor_id: 'v001' } },
    { id: 'd002', title: 'Key Regulatory Frameworks', description: 'Understanding the SDWA, CWA, and other key regulations.', thumbnail_url: 'https://picsum.photos/seed/d002/400/225', category_id: 'regulations', sponsorship: { sponsor_id: 'c001' }, cardCount: 18 },
    { id: 'd003', title: 'Intro to Water Modeling', description: 'Learn the basics of hydraulic and water quality modeling.', thumbnail_url: 'https://picsum.photos/seed/d003/400/225', category_id: 'modeling', sponsorship: { sponsor_id: 'v003' }, cardCount: 32 },
];

const existingFlashcards: Flashcard[] = [
    { id: 'fc001', deck_id: 'd001', category_id: 'asset_mgmt', front: { content: 'What is "Level of Service" (LoS)?' }, back: { content: 'The outcomes a water utility and its customers agree it should provide.', bullets: ['Defines performance targets', 'Balances cost, risk, and performance', 'Key to asset management planning'] }, media: {} },
    { id: 'fc002', deck_id: 'd001', category_id: 'asset_mgmt', front: { content: 'What are the two main types of asset failure?' }, back: { content: 'Physical Failure & Functional Failure' }, media: { image_url: 'https://picsum.photos/seed/fc002/400/200' } },
    { id: 'fc101', deck_id: 'd002', category_id: 'regulations', front: { content: 'What is the primary objective of the Safe Drinking Water Act (SDWA)?' }, back: { content: 'The principal federal law in the United States intended to ensure safe drinking water for the public.', bullets: ['Enacted in 1974', 'Authorizes EPA to set national health-based standards'] }, media: {} },
    { id: 'fc102', deck_id: 'd002', category_id: 'regulations', front: { content: 'What does NPDES stand for?' }, back: { content: 'National Pollutant Discharge Elimination System.', bullets: ['Authorized by the Clean Water Act', 'Controls water pollution by regulating point sources'] }, media: {} },
    { id: 'fc201', deck_id: 'd003', category_id: 'modeling', front: { content: 'What does a hydraulic model simulate?' }, back: { content: 'The flow and pressure of water in a pipe network.' }, media: {} },
];

// Combine all decks and flashcards
export const flashcardDecks: FlashcardDeck[] = [...existingDecks, ...lexiconDecks];
export const flashcards: Flashcard[] = [...existingFlashcards, ...lexiconFlashcards];

// 4. Create more valuable learning pathways
export const learningPathways: LearningPathway[] = [
    { id: 'lp001', title: 'Utility Manager Certification', description: 'Master asset management, finance, and regulatory compliance for aspiring utility leaders.', thumbnail_url: 'https://picsum.photos/seed/lp001/400/225', steps: [{ deck_id: 'd-cat-asset_mgmt' }, { deck_id: 'd002' }, { deck_id: 'd-cat-utility_management' }], badge_id: 'B05', badge_name: 'Cert. Manager' },
    { id: 'lp002', title: 'Digital Water Professional', description: 'Gain expertise in the tools shaping the future of water, from AMI to Digital Twins.', thumbnail_url: 'https://picsum.photos/seed/lp002/400/225', steps: [{ deck_id: 'd-cat-modeling' }, { deck_id: 'd-cat-water_distribution' }], badge_id: 'B06', badge_name: 'Digital Pro' },
    { id: 'lp003', title: 'Wastewater Operator Basics', description: 'Understand the fundamental processes and concepts of modern wastewater treatment.', thumbnail_url: 'https://picsum.photos/seed/lp003/400/225', steps: [{ deck_id: 'd-cat-wastewater_treatment' }], badge_id: 'B07', badge_name: 'Wastewater Cert.' },
];

export const oneWaterMinute: OneWaterMinute = {
  dailyTopic: 'Understanding the SDWA',
  description: 'The principal federal law in the United States intended to ensure safe drinking water for the public.',
  deckId: 'd002'
};


// --- COMMUNITY DATA ---
export const communityPosts: CommunityPost[] = [
    {
        id: 'post-001',
        author: users[1], // Maria
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'question',
        channel: 'asset_mgmt',
        content: "We're starting to build out our first predictive maintenance model for our pump stations. For those who have gone through this, what were your biggest 'gotchas' or unexpected challenges? Any advice is welcome!",
        likes: 22,
        comments: [{ user: users[0], text: "Great question! Make sure your sensor data is clean. We spent the first 3 months just on data cleansing and validation."}],
        tags: ['predictive-maintenance', 'pumps', 'data-quality']
    },
    {
        id: 'post-002',
        author: users[0], // Alex
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'discussion',
        channel: 'ai_blockchain',
        content: "Just read a fascinating whitepaper on using blockchain for water rights trading. Seems a bit futuristic, but the transparency aspect is compelling. What are your thoughts on practical applications in the next 5-10 years?",
        likes: 15,
        comments: [],
        tags: ['blockchain', 'water-rights', 'innovation']
    }
];

export const communityEvents: CommunityEvent[] = [
    {
        id: 'evt-001',
        title: 'AWWA ACE24 Annual Conference',
        description: 'The premier event for water professionals. Join us in Anaheim for networking, learning, and discovery.',
        type: 'Conference',
        submittedBy: users[0],
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        eventDate: '2024-06-10T09:00:00Z',
        location: 'Anaheim, CA',
        url: 'https://www.awwa.org/ace',
        attendeeIds: ['user-123', 'user-456']
    },
    {
        id: 'evt-002',
        title: 'Webinar: The Future of Digital Twins in Water',
        description: 'Join experts from Innovyze and Xylem for a panel discussion on the impact of Digital Twin technology on utility operations.',
        type: 'Webinar',
        submittedBy: users[1],
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Virtual',
        attendeeIds: ['user-123']
    },
    {
        id: 'evt-003',
        title: 'SF Bay Area Water Professionals Meetup',
        description: 'Casual networking event for anyone in the Bay Area water industry. First round is on us!',
        type: 'Meetup',
        submittedBy: users[0],
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        eventDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
        location: 'Oakland, CA',
        attendeeIds: []
    }
];

// --- RESEARCH & INNOVATION HUB DATA ---
export const researcherProfiles: ResearcherProfile[] = [
    {
        id: 'res-001',
        name: 'Dr. Kenji Tanaka',
        avatarUrl: 'https://i.pravatar.cc/150?u=res-001',
        title: 'Postdoctoral Fellow, Water Resources Engineering',
        university: 'Stanford University',
        universityLogoUrl: 'https://logo.clearbit.com/stanford.edu',
        bio: 'Dr. Tanaka specializes in the application of machine learning for predictive modeling of urban water distribution networks. His research focuses on early leak detection and demand forecasting to improve operational efficiency and water conservation. He holds a Ph.D. in Civil Engineering from MIT.',
        expertiseTags: ['Machine Learning', 'Hydraulic Modeling', 'Leak Detection', 'Data Analytics', 'Smart Water Networks'],
        publications: [
            { id: 'pub-001', title: 'A Novel Deep Learning Framework for Real-Time Anomaly Detection in Water Grids', journal: 'Journal of Water Resources Planning and Management', year: 2023, url: '#', doi: '10.1061/(ASCE)WR.1943-5452.0001234' },
            { id: 'pub-002', title: 'Optimizing Pumping Schedules using Reinforcement Learning', journal: 'Water Research', year: 2022, url: '#', doi: '10.1016/j.watres.2022.118123' },
        ],
        patents: [],
        projects: [
            { id: 'proj-001', title: 'AI-Powered Digital Twin for the City of Palo Alto Water System', description: 'Developing a real-time, self-calibrating digital twin to simulate and predict system behavior.', status: 'Ongoing' }
        ]
    },
    {
        id: 'res-002',
        name: 'Dr. Fatima Al-Jamil',
        avatarUrl: 'https://i.pravatar.cc/150?u=res-002',
        title: 'Professor, Environmental Chemistry',
        university: 'University of Michigan',
        universityLogoUrl: 'https://logo.clearbit.com/umich.edu',
        bio: 'A leading expert in the detection and remediation of emerging contaminants, with a particular focus on PFAS compounds. Dr. Al-Jamil\'s lab has developed several novel adsorbent materials and advanced oxidation processes for water treatment.',
        expertiseTags: ['PFAS Remediation', 'Emerging Contaminants', 'Advanced Oxidation', 'Water Quality', 'Environmental Chemistry'],
        publications: [
            { id: 'pub-003', title: 'Graphene-based Adsorbents for Rapid Removal of Per- and Polyfluoroalkyl Substances (PFAS)', journal: 'Environmental Science & Technology', year: 2023, url: '#', doi: '10.1021/acs.est.2c01234' },
        ],
        patents: [
            { id: 'pat-001', title: 'Method for Catalytic Degradation of Perfluoroalkyl Substances in Water', patentNumber: 'US 11,123,456 B2', dateGranted: '2022-08-15', url: '#' }
        ],
        projects: [
            { id: 'proj-002', title: 'Field Demonstration of a Novel AOP for PFAS Destruction', description: 'Pilot-scale testing of a new advanced oxidation process at a contaminated industrial site.', status: 'Completed' }
        ]
    }
];

export const researchOpportunities: ResearchOpportunity[] = [
    {
        id: 'ro-001',
        title: 'Cost-Effective Real-Time Cyanotoxin Sensors for Reservoir Management',
        submittedBy: users[1], // Maria Garcia
        organization: ecosystemEntities.find(e => e.id === 'g001')!, // EPA
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        problemStatement: 'Current methods for detecting cyanotoxins from harmful algal blooms (HABs) in reservoirs are lab-based, slow, and expensive. This delay hinders proactive water treatment adjustments, posing public health risks. We need a reliable, low-cost, real-time sensor that can be deployed in-situ.',
        desiredOutcomes: 'A field-deployable sensor prototype capable of detecting common cyanotoxins (e.g., microcystins) at sub-ppb levels with a response time of less than one hour. The target manufacturing cost should be under $500 per unit.',
        domain: 'water_distribution',
        relatedDocuments: [
            { id: 'rd-001', title: 'EPA Report on HABs and Drinking Water', fileUrl: '#', fileType: 'PDF' }
        ],
        interestedResearcherIds: ['res-002']
    },
    {
        id: 'ro-002',
        title: 'AI-driven Model for Predicting Wastewater Influent Quality',
        submittedBy: users[0], // Alex Johnson
        organization: ecosystemEntities.find(e => e.id === 'c001')!, // Black & Veatch
        timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        problemStatement: 'Wastewater treatment plants (WWTPs) face significant operational challenges due to high variability in influent quality (BOD, TSS, nutrient loads), especially with industrial dischargers and storm events. This variability makes process control difficult, leading to inefficiencies and potential permit violations.',
        desiredOutcomes: 'A machine learning model that uses upstream sensor data, weather forecasts, and historical data to predict influent quality 24-48 hours in advance. The model should integrate with existing SCADA systems to provide operators with actionable recommendations for process adjustments (e.g., aeration levels, chemical dosing).',
        domain: 'wastewater_treatment',
        relatedDocuments: [],
        interestedResearcherIds: ['res-001']
    }
];

export const topicSuggestions: TopicSuggestion[] = [
    {
        id: 'ts-001',
        title: 'Presentation on the Economics of Water Reuse for Agriculture',
        description: 'With increasing drought conditions, the agricultural sector needs a clearer understanding of the ROI for different water reuse technologies. A deep dive into the costs, benefits, and financing models would be invaluable for farmers and water managers alike.',
        submittedBy: users[1], // Maria Garcia
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        upvoteUserIds: Array.from({ length: 128 }, () => `user-${Math.floor(Math.random() * 1000)}`),
        recommendedSpeaker: 'Dr. David Sedlak (UC Berkeley)',
        comments: [],
        tags: ['agriculture', 'water-reuse', 'economics']
    },
    {
        id: 'ts-002',
        title: 'Live Demo: Using AI for Satellite-Based Leak Detection',
        description: 'I\'ve seen some companies claim they can find leaks from space. I\'d love to see a real presentation on how this technology works, its accuracy, and its limitations. Is it ready for prime time?',
        submittedBy: users[0], // Alex Johnson
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        upvoteUserIds: Array.from({ length: 75 }, () => `user-${Math.floor(Math.random() * 1000)}`),
        comments: [],
        tags: ['leak-detection', 'ai', 'remote-sensing', 'data']
    },
    {
        id: 'ts-003',
        title: 'Panel Discussion: The Future of PFAS Regulation & Treatment',
        description: 'The regulatory landscape for PFAS is changing rapidly. It would be great to have a panel of experts from regulatory bodies, technology providers, and utilities discuss what\'s coming next and how to prepare.',
        submittedBy: users[1], // Maria Garcia
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        upvoteUserIds: Array.from({ length: 215 }, () => `user-${Math.floor(Math.random() * 1000)}`),
        recommendedSpeaker: 'Xylem or Evoqua experts',
        comments: [],
        tags: ['pfas', 'regulations', 'treatment-tech']
    }
];

// --- INSIGHTS (BLOG) DATA ---

export const blogAuthors: BlogAuthor[] = [
  // From existing users
  { id: 'user-123', name: 'Alex Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=user-123', title: 'Senior Specialist, AquaTech', isGuest: false },
  { id: 'user-456', name: 'Maria Garcia', avatarUrl: 'https://i.pravatar.cc/150?u=user-456', title: 'Principal Expert, Hydro-Solutions', isGuest: false },
  // Guest author
  { id: 'guest-001', name: 'Dr. Eleanor Vance', avatarUrl: 'https://i.pravatar.cc/150?u=guest-001', title: 'Lead Researcher, Global Water Institute', isGuest: true },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Unseen Network: How Digital Twins Are Preventing Tomorrow\'s Water Main Breaks',
    subtitle: 'Beyond simple monitoring, digital twins are creating a predictive and resilient future for water infrastructure. Here\'s how.',
    authorId: 'user-456', // Maria Garcia
    publishDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    readTimeMinutes: 7,
    heroImageUrl: 'https://picsum.photos/seed/digital-twin-blog/1200/600',
    content: `The term "Digital Twin" has been circulating for years, but its practical application in the water sector is only now beginning to mature into a truly transformative technology...

A digital twin is more than just a 3D model; it's a living, breathing virtual replica of a physical water system. Fed by a constant stream of data from SCADA systems, IoT sensors, and GIS, it simulates the network's behavior in real-time. This allows utilities to move from a reactive to a predictive maintenance strategy. Instead of waiting for a pipe to burst, operators can identify stress points and potential failures weeks or even months in advance.

For example, a major metropolitan utility recently implemented a digital twin for its aging downtown water grid. Within six months, they were able to preemptively replace three critical mains that the model identified as being under high stress, preventing what would have been catastrophic and costly failures. The ROI wasn't just in avoided repair costs, but in maintained public trust and uninterrupted service.`,
    claps: 128,
    comments: [
      { user: users[0], text: 'This is a fantastic overview. The predictive aspect is a game-changer for capital planning.', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() }
    ],
    vendorId: 'v001',
  },
  {
    id: 'post-2',
    title: 'From Waste to Wattage: The Surprising Economics of Energy Recovery in Wastewater',
    subtitle: 'Modern wastewater treatment plants are no longer just cost centers; they are becoming resource recovery facilities that can generate power and revenue.',
    authorId: 'guest-001', // Dr. Eleanor Vance
    publishDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    readTimeMinutes: 5,
    heroImageUrl: 'https://picsum.photos/seed/wastewater-energy/1200/600',
    content: `For decades, wastewater treatment was viewed as an energy-intensive necessity. The goal was simple: treat the water and discharge it safely. But a paradigm shift is underway. With advancements in technologies like anaerobic digestion and thermal hydrolysis, utilities are now unlocking the immense energy potential stored in biosolids.

By capturing the biogas produced during digestion, a treatment plant can power its own operations, often with a surplus to sell back to the grid. This not only dramatically reduces operational costs but also creates a new revenue stream, turning a financial liability into an asset. Furthermore, the resulting Class A biosolids can be sold as high-quality fertilizer, closing the loop on a circular economy.`,
    claps: 95,
    comments: [],
  },
  {
    id: 'post-3',
    title: 'Demystifying AI in Water: It\'s Not About Robots, It\'s About Data',
    subtitle: 'Forget the sci-fi hype. Artificial intelligence in the water sector is all about making smarter, faster decisions with the data you already have.',
    authorId: 'user-123', // Alex Johnson
    publishDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    readTimeMinutes: 6,
    heroImageUrl: 'https://picsum.photos/seed/ai-data-blog/1200/600',
    content: `When people hear "AI," they often think of complex, sentient machines. In the context of a water utility, the reality is far more practical and powerful. AI, specifically machine learning, is about finding patterns in vast datasets that are invisible to the human eye.

Think about your SCADA system, which generates millions of data points every day on pressure, flow, and pump status. A machine learning model can analyze this historical data to learn what "normal" looks like. When a subtle deviation occurs—a pressure drop that's too small for an alarm but is inconsistent with the time of day and demand—the AI can flag it as a potential leak long before it becomes a major break. It's not magic; it's advanced pattern recognition that empowers your operators to be more proactive and efficient.`,
    claps: 210,
    comments: [],
  },
];