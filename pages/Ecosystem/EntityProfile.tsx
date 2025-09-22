import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { StarIcon } from '../../components/icons/Icons';

const EntityProfile: React.FC = () => {
  const { entityId, vendorId } = useParams<{ entityId?: string, vendorId?: string }>();
  const { ecosystemEntities } = useAuth();
  
  const id = entityId || vendorId;
  const entity = ecosystemEntities.find(e => e.id === id);

  if (!entity) {
    return (
      <div className="text-center py-20 text-white">
        <h1 className="text-2xl">Entity not found.</h1>
        <Link to="/ecosystem" className="text-blue-400 hover:underline mt-4 inline-block">Back to Ecosystem Directory</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link to="/ecosystem" className="text-sm text-blue-400 hover:underline">
          &larr; Back to Ecosystem Directory
        </Link>
      </div>

      <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-center gap-8">
        <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center p-2 flex-shrink-0">
          <img src={entity.logoUrl} alt={`${entity.name} logo`} className="max-w-full max-h-full object-contain" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-white">{entity.name}</h1>
          <p className="text-lg text-slate-300 mt-1">{entity.tagline}</p>
        </div>
      </div>

      <div className="mt-12">
        {!entity.isClaimed && (
          <div className="glass-card max-w-2xl mx-auto p-8 rounded-2xl border border-blue-400/50 text-center">
            <StarIcon className="w-12 h-12 text-blue-400 mx-auto" />
            <h2 className="text-2xl font-bold text-white mt-4">Is This Your Organization?</h2>
            <p className="text-slate-400 mt-2">
              Claim this profile for free to manage your information, connect with the community, and unlock powerful features.
            </p>
            <ul className="text-left space-y-2 mt-6 text-slate-300 max-w-md mx-auto">
              <li className="flex items-start"><span className="text-green-400 mr-2 mt-1">&#10003;</span> Showcase key contacts, technical documents, and performance metrics.</li>
              <li className="flex items-start"><span className="text-green-400 mr-2 mt-1">&#10003;</span> Generate qualified leads from industry professionals actively seeking solutions.</li>
              <li className="flex items-start"><span className="text-green-400 mr-2 mt-1">&#10003;</span> Host live expert sessions on Droobi TV to showcase your thought leadership.</li>
            </ul>
            <button className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity">
              Claim This Profile
            </button>
            <p className="text-xs text-slate-500 mt-3">Claiming requires verification using an official company email address.</p>
          </div>
        )}

        {entity.isClaimed && (
          <div className="text-center p-12 bg-slate-800 rounded-lg">
             <h2 className="text-2xl font-bold text-white">Profile Content</h2>
             <p className="text-slate-400 mt-2">This is where claimed profiles would display their detailed information, documents, and contacts.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default EntityProfile;