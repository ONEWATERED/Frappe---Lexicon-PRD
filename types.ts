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
  };
  badges: string[];
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
  id: string;
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

export type EcosystemEntity = {
  id: string;
  name: string;
  logoUrl: string;
  type: EntityType;
  tagline: string;
  location: string;
  domain: string;
  isClaimed: boolean;
  claimedByUserId?: string;
};

// This one was missing from the spec, but needed for the context.
export type Vendor = EcosystemEntity & { type: 'Vendor' };

// Updated to match Academy screenshot
export interface OneWaterMinute {
  dailyTopic: string;
  description: string;
  deckId: string;
}

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
}