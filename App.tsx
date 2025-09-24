import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
// Import Pages
import LexiconHome from './pages/Lexicon/LexiconHome';
import TermDetail from './pages/Lexicon/TermDetail';
import VideoDetail from './pages/DroobiTV/VideoDetail';
import FlashcardPlayer from './pages/Academy/FlashcardPlayer';
import UserProfile from './pages/Profiles/UserProfile';
import DroobiTVHome from './pages/DroobiTV/DroobiTVHome';
import AcademyHome from './pages/Academy/AcademyHome';
import ManualsHome from './pages/Manuals/ManualsHome';
import EcosystemHome from './pages/Ecosystem/EcosystemHome';
import EntityProfile from './pages/Ecosystem/EntityProfile';
import ComingSoon from './pages/ComingSoon';
import AIAgentsPage from './pages/AIAgents/AIAgentsPage';
import CommunityHome from './pages/Community/CommunityHome';
import ResearchHubHome from './pages/Research/ResearchHubHome';
import ResearcherProfilePage from './pages/Research/ResearcherProfilePage';
import BlogHome from './pages/Insights/BlogHome';
import BlogPostDetail from './pages/Insights/BlogPostDetail';
import CreateBlogPost from './pages/Insights/CreateBlogPost';
import CommunityMessages from './pages/Community/CommunityMessages';
import JobBoardHome from './pages/Jobs/JobBoardHome';


const MainLayout: React.FC = () => (
  <div className="min-h-screen bg-slate-900 text-slate-300">
    <Header />
    <main>
      <Outlet />
    </main>
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<LexiconHome />} />
            <Route path="/term/:id" element={<TermDetail />} />
            <Route path="/vendor/:vendorId" element={<EntityProfile />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="/droobi-tv" element={<DroobiTVHome />} />
            <Route path="/video/:videoId" element={<VideoDetail />} />
            <Route path="/droobi-tv/sessions" element={<ComingSoon title="Live & On-Demand Sessions" />} />
            <Route path="/manuals" element={<ManualsHome />} />
            <Route path="/manual/:manualId" element={<ComingSoon title="Manual Viewer" />} />
            <Route path="/academy" element={<AcademyHome />} />
            <Route path="/academy/pathway/:pathwayId" element={<ComingSoon title="Learning Pathway" />} />
            <Route path="/community" element={<CommunityHome />} />
            <Route path="/community/messages" element={<CommunityMessages />} />
            <Route path="/community/messages/:userId" element={<CommunityMessages />} />
            <Route path="/insights" element={<BlogHome />} />
            <Route path="/insights/new" element={<CreateBlogPost />} />
            <Route path="/insights/:postId" element={<BlogPostDetail />} />
            <Route path="/research" element={<ResearchHubHome />} />
            <Route path="/research/researcher/:researcherId" element={<ResearcherProfilePage />} />
            <Route path="/ecosystem" element={<EcosystemHome />} />
            <Route path="/ecosystem/:entityId" element={<EntityProfile />} />
            <Route path="/jobs" element={<JobBoardHome />} />
            <Route path="/ai-agents" element={<AIAgentsPage />} />
          </Route>
          {/* Fullscreen route without main layout */}
          <Route path="/academy/deck/:deckId" element={<FlashcardPlayer />} />

          <Route path="*" element={<div className="text-center p-20">404 Not Found</div>} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;