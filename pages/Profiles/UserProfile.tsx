import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PROFESSIONAL_TIERS } from '../../data';
import { TierIcon } from '../../components/icons/Icons';

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { getUserById } = useAuth();
  
  const user = getUserById(userId || '');

  if (!user) {
    return (
      <div className="text-center py-20 text-white">
        <h1 className="text-2xl">User not found.</h1>
        <Link to="/" className="text-blue-400 hover:underline mt-4 inline-block">Go Home</Link>
      </div>
    );
  }

  const currentTier = PROFESSIONAL_TIERS.find(t => t.id === user.tierId) || PROFESSIONAL_TIERS[0];
  const nextTier = PROFESSIONAL_TIERS.find(t => t.minXp > user.xp) || currentTier;
  const xpForNextTier = nextTier.minXp - currentTier.minXp;
  const xpProgress = user.xp - currentTier.minXp;
  const progressPercentage = xpForNextTier > 0 ? (xpProgress / xpForNextTier) * 100 : 100;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-slate-300">
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
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white">Badges</h2>
        <div className="flex flex-wrap gap-4 mt-4">
          {user.badges.map(badge => (
            <div key={badge} className="bg-slate-700 p-3 rounded-full text-sm font-semibold">{badge}</div>
          ))}
           {/* Placeholder for more visual badges */}
        </div>
      </div>

    </div>
  );
};

export default UserProfile;