import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import {
  User, LexiconTerm, Vendor, DroobiVideo, Session, OnDemandSession, Manual,
  FlashcardDeck, Flashcard, LearningPathway, OneWaterMinute, EcosystemEntity, AuthContextType, UserProgress,
  CommunityPost, CommunityEvent, ResearcherProfile, ResearchOpportunity, TopicSuggestion, BlogAuthor, BlogPost,
  CareerGoal, CareerPathway, Conversation
} from '../types';
import {
  users, initialTerms, vendors, droobiVideos, droobiSessions, onDemandSessions,
  manuals, flashcardDecks, flashcards, learningPathways, oneWaterMinute, ecosystemEntities,
  userProgress, communityPosts, communityEvents, researcherProfiles, researchOpportunities,
  topicSuggestions, blogAuthors, blogPosts, careerGoals, careerPathways, conversations
} from '../data';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(users[0] || null);

  const login = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };
  
  const getUserById = (userId: string): User | undefined => {
    return users.find(u => u.id === userId);
  }

  const getAllUsers = (): User[] => {
    return users;
  }

  const value = useMemo(() => ({
    currentUser,
    login,
    logout,
    getUserById,
    getAllUsers,
    terms: initialTerms,
    vendors,
    droobiVideos,
    droobiSessions,
    onDemandSessions,
    manuals,
    flashcardDecks,
    flashcards,
    learningPathways,
    oneWaterMinute,
    ecosystemEntities,
    userProgress,
    communityPosts,
    communityEvents,
    researcherProfiles,
    researchOpportunities,
    topicSuggestions,
    blogAuthors,
    blogPosts,
    careerGoals,
    careerPathways,
    conversations,
  }), [currentUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};