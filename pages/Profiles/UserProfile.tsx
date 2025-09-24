import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PROFESSIONAL_TIERS } from '../../data';
import { TierIcon, IdentificationIcon, ArrowUpTrayIcon, DocumentDuplicateIcon, CalendarDaysIcon, BellIcon } from '../../components/icons/Icons';
import { UserCredential } from '../../types';

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
  <div className="mt-8">
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

      {user.credentials && <CredentialsSection credentials={user.credentials} />}
      
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