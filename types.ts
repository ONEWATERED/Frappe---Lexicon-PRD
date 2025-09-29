
import { IconType } from 'react-icons';

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
  tierId: string;
  xp: number;
  stats: {
    commentsPosted: number;
    documentsUploaded: number;
    insightfulMarks: number;
    knowledgeContributions?: number;
    publicShares?: number;
    thanksReceived?: number;
    views?: number;
    savesByOthers?: number;
  };
  badges: string[];
  credentials?: UserCredential[];
  careerGoals?: CareerGoal[];
  activePathwayId?: string;
  // FIX: Added missing careerPathways property to User type.
  careerPathways?: CareerPathway[];
  projectPortfolio?: ProjectPortfolioItem[];
  skills?: UserSkill[];
  resumeVault?: ResumeDocument[];
  myLibrary?: LibraryCollection[];
  learningTranscript?: LearningActivity[];
  knowledgeMap?: KnowledgeMapData;
  isOnline?: boolean;
  lastSeen?: string; // ISO Date
  connections?: string[]; // Array of user IDs
  pendingConnections?: {
    incoming: string[];
    outgoing: string[];
  };
  mentorshipStatus?: 'seeking' | 'offering' | 'none';
  mentorshipTopics?: LexiconCategory[];
  knowledgeEntries?: KnowledgeEntry[];
  location?: { city: string; state: string; };
  joinDate?: string; // ISO Date
};

export type IconName = 'AcademicCapIcon' | 'StarIcon' | 'ShieldCheckIcon' | 'SparklesIcon' | 'TrophyIcon';

export type ProfessionalTier = {
  id: string; // T0-T6
  name: string; // Associate -> Infrastructure Maverick
  minXp: number;
  icon: IconName;
};

export type UserProgress = {
  dailyFlips: { current: number, goal: number };
  weeklyChallenges: { current: number, goal: number };
  currentStreak: number;
};

// --- CAREER PATHWAY TYPES ---
export type CareerPathwayStep = {
  type: 'deck' | 'video' | 'article' | 'manual' | 'connection';
  title: string;
  description: string;
  targetId: string; // ID of deck, video, blog post, user, etc.
  completed: boolean;
};

export type CareerPathway = {
  id: string;
  goalId: string;
  steps: CareerPathwayStep[];
};

export type CareerGoal = {
  id: string;
  title: string;
  description: string;
};

// --- PROJECT PORTFOLIO TYPES ---
export type ProjectPortfolioItem = {
  id: string;
  title: string;
  role: string;
  summary: string;
  outcome: string;
  imageUrl?: string;
  videoUrl?: string;
  taggedPartnerIds?: string[];
  startDate: string; // ISO Date
  endDate: string;   // ISO Date
};

// --- SKILLS & ENDORSEMENTS TYPES ---
export type SkillEndorsement = {
  userId: string; // ID of user who endorsed
  timestamp: string;
};

export type UserSkill = {
  id: string;
  name: string;
  endorsements: SkillEndorsement[];
};

// --- RESUME VAULT TYPES ---
export type ResumeDocument = {
  id: string;
  fileName: string;
  versionName: string;
  fileUrl: string;
  uploadedAt: string; // ISO Date
  isPrimary: boolean;
};


// --- CREDENTIALS TYPES ---
export type CEUProgress = {
  required: number;
  completed: number;
  unitName: 'CEU' | 'PDH' | 'Credit';
};

export type UserCredential = {
  id:string;
  name: string;
  type: 'License' | 'Certification' | 'Accreditation';
  issuingBody: string;
  licenseNumber?: string;
  issueDate: string; // ISO Date string
  renewalDate: string; // ISO Date string
  fileUrl: string;
  ceuRequirements?: CEUProgress;
};


// --- MY LIBRARY TYPES ---
export type LibraryItemType = 'term' | 'video' | 'deck' | 'manual' | 'post';

export type LibraryItem = {
  id: string;
  type: LibraryItemType;
  contentId: string; // ID of the term, video, deck etc.
  addedAt: string; // ISO Date
};

export type LibraryCollection = {
  id: string;
  name: string;
  items: LibraryItem[];
};

// --- LEARNING TRANSCRIPT TYPES ---
export type LearningActivityType = 'deck_completed' | 'pathway_achieved' | 'video_watched';

export type LearningActivity = {
  id: string;
  type: LearningActivityType;
  contentId: string;
  contentTitle: string;
  completedAt: string; // ISO Date
};

// --- KNOWLEDGE MAP TYPES ---
export type KnowledgeMapNode = {
  id: string; // e.g., 'asset_mgmt'
  label: string;
  activityCount: number;
  isSuggested?: boolean;
};

export type KnowledgeMapLink = {
  source: string; // id of source node
  target: string; // id of target node
};

export type KnowledgeMapData = {
  nodes: KnowledgeMapNode[];
  links: KnowledgeMapLink[];
};


export type LexiconCategory = 'data' | 'asset_mgmt' | 'climate_impacts' | 'resiliency' | 'regulations' | 'governance' | 'modeling' | 'operations' | 'ai_blockchain' | 'wastewater_treatment' | 'water_distribution' | 'utility_management';

export const lexiconCategoryNames: Record<LexiconCategory, string> = {
  data: 'Data',
  asset_mgmt: 'Asset Management',
  climate_impacts: 'Climate Impacts',
  resiliency: 'Resiliency',
  regulations: 'Regulations',
  governance: 'Governance',
  modeling: 'Modeling',
  operations: 'Operations',
  ai_blockchain: 'AI & Blockchain',
  wastewater_treatment: 'Wastewater Treatment',
  water_distribution: 'Water Distribution',
  utility_management: 'Utility Management',
};

export type TermDocument = {
  id: string;
  user: User;
  title: string;
  fileUrl: string;
  fileType: 'PDF' | 'DOCX' | 'Whitepaper' | 'Case Study';
  timestamp: string;
};

export type LexiconTerm = {
  id:string;
  term: string;
  category: LexiconCategory;
  plainLanguageDefinition: string;
  technicalDefinition: string;
  videoUrl?: string;
  audioUrl?: string;
  linkedVendorIds?: string[];
  comments?: TermComment[];
  isPremium?: boolean;
  documents?: TermDocument[];
  viewCount: number;
  relatedTermIds?: string[];
  relatedDroobiVideoIds?: string[];
  relatedDeckIds?: string[];
};

export type TermComment = {
  id:string;
  user: User;
  text: string;
  timestamp: string;
  replies: TermComment[];
  insightfulCount: number;
};

export type SeriesInfo = {
  name: string;
  episode: number;
};

export type DroobiVideo = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string; // HLS streaming URL
  category: string;
  durationMinutes: number;
  airDate: string;
  series_info?: SeriesInfo | null;
  vendorId?: string;
};

export type Speaker = {
  name: string;
  title: string;
  avatarUrl: string;
};

export type Session = {
  id: string;
  title: string;
  speaker: Speaker;
  dateTime: string;
  durationMinutes?: number;
  registeredAttendees: number;
  attendees: number | null;
  description: string;
  category: string;
  tags?: string[];
  isLive: boolean;
  isPremium: boolean;
  joinUrl: string;
};

export type OnDemandSession = Session & { isLive: false };

export type FlashcardDeck = {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  category_id: LexiconCategory;
  vendor_ids?: string[];
  sponsorship?: { sponsor_id: string } | null;
  cardCount: number;
};

export type Flashcard = {
  id: string;
  deck_id: string;
  category_id: LexiconCategory;
  front: { content: string };
  back: {
    content: string;
    bullets?: string[];
    video_url?: string;
  };
  media: { image_url?: string };
};

export type LearningPathway = {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  steps: { deck_id: string }[];
  badge_id: string;
  badge_name: string;
};

export type Manual = {
  id: string;
  title: string;
  vendorId: string;
  assetType: 'Pump' | 'Sensor' | 'Hydrant' | 'Valve' | 'Filtration System';
  modelNumber: string;
  partNumber?: string;
  summary: string;
  coverImageUrl: string;
  fileUrl: string;
  uploadedAt: string;
};

export type EntityType = 'Vendor' | 'Consultant' | 'Government' | 'Academia' | 'Non-Profit';

// --- VENDOR MICRO-SITE TYPES ---
export type CTA = {
    label: string;
    action: string; // e.g., 'modal:video', 'scroll:#team', or a URL
};

export type HeroData = {
    videoUrl?: string;
    posterImage?: string;
    primaryCta?: CTA;
    secondaryCta?: CTA;
};

export type VendorContact = {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  email: string;
  phone?: string;
  online?: boolean;
  calendarUrl?: string;
  chatUrl?: string;
  region?: string;
  role?: string;
};

export type VendorResource = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  type: 'Brochure' | 'Case Study' | 'Whitepaper' | 'Specification';
  category: string; // Vendor-defined category
  views: number;
  downloads: number;
};

export type JobPosting = {
  id: string;
  title: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  description: string;
  applyUrl: string;
};

export type VisitorLog = {
  userId: string;
  firstVisit: string;
  lastVisit: string;
  totalVisits: number;
  downloads: number;
  views: number;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  coverImageUrl?: string;
  coverVideoUrl?: string;
  tags: string[];
  caseStudyUrl?: string;
};

export type AcademyContribution = {
  show: boolean;
  badgeUrl?: string;
  blurb?: string;
  academyUrl?: string;
};

export type SponsorshipDetails = {
  show: boolean;
  badgeUrl?: string;
  text: string;
  linkUrl?: string;
};

export type ValueHighlight = {
  icon: 'chat' | 'calendar' | 'book' | 'blog' | 'projects' | 'sponsor';
  label: string;
};

export type NewsletterSettings = {
  show: boolean;
  successMessage: string;
};

export type SocialLinks = {
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  shareEnabled?: boolean;
};

export type ConferenceMaterial = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  actionUrl: string;
  type: 'Brochure' | 'Cut Sheet' | 'Whitepaper' | 'Case Study' | 'Giveaway' | 'Video Demo';
};

export type EcosystemEntity = {
  id: string;
  name: string;
  logoUrl: string;
  type: EntityType;
  tagline: string;
  location: string;
  domain: string;
  isClaimed: boolean;
  isFeatured?: boolean;
  claimedByUserId?: string;
  hero?: HeroData;
  sponsorships?: {
    feature: string;
    description: string;
  }[];
  // Vendor-specific micro-site properties (optional)
  featuredVideoUrl?: string;
  longDescription?: string;
  contacts?: VendorContact[];
  services?: { title: string; description: string }[];
  futureOfferings?: { title: string; description: string }[];
  resources?: VendorResource[];
  jobPostings?: JobPosting[];
  projects?: Project[];
  visitorLogs?: VisitorLog[];
  // Phase 5 additions
  academyContribution?: AcademyContribution;
  sponsorshipDetails?: SponsorshipDetails;
  highlights?: ValueHighlight[];
  // Phase 6 & 7 additions
  newsletter?: NewsletterSettings;
  social?: SocialLinks;
  conferenceBooth?: ConferenceMaterial[];
};


// This one was missing from the spec, but needed for the context.
export type Vendor = EcosystemEntity & { type: 'Vendor' };

// Updated to match Academy screenshot
export interface OneWaterMinute {
  dailyTopic: string;
  description: string;
  deckId: string;
}

// --- COMMUNITY TYPES ---
export type CommunityPostType = 'discussion' | 'question' | 'poll';
export type CommunityEventType = 'Webinar' | 'Conference' | 'Meetup' | 'Workshop';

export type CommunityPost = {
  id: string;
  author: User;
  timestamp: string;
  type: CommunityPostType;
  channel: LexiconCategory;
  content: string;
  likes: number;
  comments: { user: User; text: string }[];
  tags: string[];
};

export type CommunityEvent = {
  id: string;
  title: string;
  description: string;
  type: CommunityEventType;
  submittedBy: User;
  timestamp: string; // when it was posted
  eventDate: string; // when it takes place
  location: string;
  url?: string;
  attendeeIds: string[];
  registeredUserIds: string[];
  isLive: boolean;
  joinUrl?: string;
};

export type DirectMessage = {
  id: string;
  fromUserId: string;
  content: string;
  timestamp: string; // ISO Date
  isRead: boolean;
};

export type Conversation = {
  id: string;
  participantIds: string[]; // array of 2 user IDs
  messages: DirectMessage[];
};


// --- RESEARCH & INNOVATION HUB TYPES ---
export type Publication = {
  id: string;
  title: string;
  journal: string;
  year: number;
  url: string;
  doi: string;
};

export type Patent = {
  id: string;
  title: string;
  patentNumber: string;
  dateGranted: string;
  url: string;
};

export type ResearchProject = {
  id: string;
  title: string;
  description: string;
  status: 'Ongoing' | 'Completed';
};

export type ResearcherProfile = {
  id: string;
  name: string;
  avatarUrl: string;
  title: string; // e.g., "PhD Candidate in Environmental Engineering"
  university: string;
  universityLogoUrl: string;
  bio: string;
  expertiseTags: string[];
  publications: Publication[];
  patents: Patent[];
  projects: ResearchProject[];
};

export type ResearchDocument = {
  id: string;
  title: string;
  fileUrl: string;
  fileType: 'PDF' | 'Dataset' | 'Presentation';
};

export type ResearchOpportunity = {
  id: string;
  title: string;
  submittedBy: User;
  organization: EcosystemEntity;
  timestamp: string;
  problemStatement: string;
  desiredOutcomes: string;
  domain: LexiconCategory;
  relatedDocuments: ResearchDocument[];
  interestedResearcherIds: string[];
};

export type TopicComment = {
  id: string;
  user: User;
  text: string;
  timestamp: string;
};

export type TopicSuggestion = {
  id: string;
  title: string;
  description: string; // "Why is this important?"
  submittedBy: User;
  timestamp: string;
  upvoteUserIds: string[];
  recommendedSpeaker?: string;
  comments: TopicComment[];
  tags: string[];
};

// --- ORAKLES LABS (FEATURE SUGGESTIONS) ---
export type FeatureComment = TopicComment;

export type FeatureSuggestion = {
  id: string;
  title: string;
  description: string;
  submittedBy: User;
  timestamp: string;
  upvoteUserIds: string[];
  comments: FeatureComment[];
  status: 'Under Consideration' | 'Planned' | 'In Progress' | 'Shipped';
  tags: string[];
};


// --- INSIGHTS (BLOG) TYPES ---
export type BlogAuthor = {
  id: string;
  name: string;
  avatarUrl: string;
  title: string;
  isGuest: boolean;
};

export type BlogPostComment = {
  user: User;
  text: string;
  timestamp: string;
};

export type BlogPost = {
  id: string;
  title: string;
  subtitle: string;
  authorId: string;
  publishDate: string;
  readTimeMinutes: number;
  heroImageUrl: string;
  content: string; // Will contain markdown-like content
  claps: number;
  comments: BlogPostComment[];
  vendorId?: string;
};

// --- PUBLIC INFORMATION PROTOCOL (PIP) TYPES ---
export type PIPDocument = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: 'Report' | 'Publication' | 'Case Study' | 'Whitepaper' | 'Dataset';
  submittedByUserId: string;
  submittedByEntityId?: string; // Optional if submitted by an individual not tied to a company
  timestamp: string; // ISO Date
  region: 'United States';
  tags: string[];
  viewCount: number;
  downloadCount: number;
};

// --- PERSONAL KNOWLEDGE CAPTURE TYPES ---
export type SharingScope = 'private' | 'organization' | 'public';
export type KnowledgeEntryType = 'photo' | 'video' | 'audio' | 'card';

export type AISuggestions = {
  title?: string;
  summary?: string;
  tags?: string[];
  lexiconTermIds?: string[];
  destination?: 'Manuals' | 'Academy' | 'Insights';
};

export type KnowledgeEntry = {
  id: string;
  userId: string;
  type: KnowledgeEntryType;
  title: string;
  description?: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  transcript?: string;
  tags: string[];
  lexiconTermIds: string[];
  createdAt: string; // ISO Date
  updatedAt: string; // ISO Date
  sharingScope: SharingScope;
  metadata: {
    timestamp: string; // ISO Date
    device?: string;
    gps?: { lat: number; lon: number };
    fileSize?: number; // in bytes
    duration?: number; // in seconds
  };
  status: 'published' | 'pending_sync';
  cardId?: string;
};

export type KnowledgeCard = {
  id: string;
  sourceEntryId: string;
  userId: string;
  title: string;
  scenario?: string;
  steps: string[];
  materials: string[];
  warnings: string[];
  attachmentEntryIds: string[];
  lexiconTermIds: string[];
  suggestedDestination?: 'Manuals' | 'Academy' | 'Insights';
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published';
};

export type Reaction = {
    id: string;
    entityId: string; // entryId or cardId
    userId: string;
    type: 'thanks' | 'helped';
    createdAt: string;
};


export interface AuthContextType {
  currentUser: User | null;
  login: (userId: string) => void;
  logout: () => void;
  getUserById: (userId: string) => User | undefined;
  getAllUsers: () => User[];
  terms: LexiconTerm[];
  vendors: Vendor[];
  droobiVideos: DroobiVideo[];
  droobiSessions: Session[];
  onDemandSessions: OnDemandSession[];
  manuals: Manual[];
  flashcardDecks: FlashcardDeck[];
  flashcards: Flashcard[];
  learningPathways: LearningPathway[];
  oneWaterMinute: OneWaterMinute;
  ecosystemEntities: EcosystemEntity[];
  userProgress: UserProgress;
  communityPosts: CommunityPost[];
  communityEvents: CommunityEvent[];
  researcherProfiles: ResearcherProfile[];
  researchOpportunities: ResearchOpportunity[];
  topicSuggestions: TopicSuggestion[];
  blogAuthors: BlogAuthor[];
  blogPosts: BlogPost[];
  careerPathways: CareerPathway[];
  careerGoals: CareerGoal[];
  conversations: Conversation[];
  pipDocuments: PIPDocument[];
  featureSuggestions: FeatureSuggestion[];
  knowledgeEntries: KnowledgeEntry[];
  knowledgeCards: KnowledgeCard[];
  reactions: Reaction[];
}
