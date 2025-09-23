import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ResearcherProfile, ResearchOpportunity, lexiconCategoryNames } from '../../types';
import { BeakerIcon, LightBulbIcon, UsersIcon, ArrowRightIcon } from '../../components/icons/Icons';

const ResearcherCard: React.FC<{ researcher: ResearcherProfile }> = ({ researcher }) => (
    <div className="glass-card p-6 h-full flex flex-col">
        <div className="flex items-start gap-4">
            <img src={researcher.avatarUrl} alt={researcher.name} className="w-16 h-16 rounded-full border-2 border-slate-600" />
            <div>
                <h3 className="text-lg font-bold text-white">{researcher.name}</h3>
                <p className="text-sm text-slate-400">{researcher.title}</p>
            </div>
        </div>
        <div className="flex-grow mt-4">
            <p className="text-sm text-slate-300 line-clamp-3">{researcher.bio}</p>
        </div>
        <div className="mt-4">
            <div className="flex flex-wrap gap-2">
                {researcher.expertiseTags.slice(0,3).map(tag => (
                    <span key={tag} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{tag}</span>
                ))}
            </div>
        </div>
        <Link to={`/research/researcher/${researcher.id}`} className="mt-6 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg text-sm text-center hover:bg-blue-600 transition-colors">
            View Profile
        </Link>
    </div>
);

const OpportunityCard: React.FC<{ opportunity: ResearchOpportunity }> = ({ opportunity }) => (
    <div className="glass-card p-6 h-full flex flex-col">
        <div>
            <span className="text-xs font-semibold uppercase text-purple-400">{lexiconCategoryNames[opportunity.domain]}</span>
            <h3 className="text-lg font-bold text-white mt-2">{opportunity.title}</h3>
        </div>
        <div className="flex-grow mt-2">
            <p className="text-sm text-slate-300 line-clamp-4">{opportunity.problemStatement}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="flex items-center gap-3">
                <img src={opportunity.organization.logoUrl} alt={opportunity.organization.name} className="w-8 h-8 rounded-full bg-white p-1" />
                <div>
                    <p className="text-xs text-slate-400">Posted by</p>
                    <p className="text-sm font-semibold text-slate-200">{opportunity.organization.name}</p>
                </div>
            </div>
            <button className="mt-4 w-full bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-slate-600 transition-colors">
                View Details & Collaborate
            </button>
        </div>
    </div>
);

const ResearchHubHome: React.FC = () => {
    const { researcherProfiles, researchOpportunities } = useAuth();
    const [activeTab, setActiveTab] = useState<'opportunities' | 'experts'>('opportunities');

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <BeakerIcon className="w-16 h-16 text-blue-500 mx-auto" />
                <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl mt-4">Research & Innovation Hub</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-400">
                    Connecting industry challenges with academic brilliance to foster innovation and solve the water sector's most pressing problems.
                </p>
            </div>

            <div className="mt-12 flex justify-center border-b border-slate-700">
                <button 
                    onClick={() => setActiveTab('opportunities')}
                    className={`flex items-center gap-2 px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'opportunities' ? 'text-white border-b-2 border-blue-500' : 'text-slate-400 hover:text-white'}`}
                >
                    <LightBulbIcon className="w-6 h-6"/> Research Opportunities
                </button>
                <button 
                    onClick={() => setActiveTab('experts')}
                    className={`flex items-center gap-2 px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'experts' ? 'text-white border-b-2 border-blue-500' : 'text-slate-400 hover:text-white'}`}
                >
                    <UsersIcon className="w-6 h-6"/> Find an Expert
                </button>
            </div>

            <div className="mt-10">
                {activeTab === 'opportunities' && (
                    <div>
                         <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Industry Challenges</h2>
                            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded-lg transition-colors text-sm">
                                Submit an Opportunity
                            </button>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {researchOpportunities.map(opp => <OpportunityCard key={opp.id} opportunity={opp} />)}
                        </div>
                    </div>
                )}
                {activeTab === 'experts' && (
                    <div>
                         <h2 className="text-2xl font-bold text-white mb-6">Academic & Research Professionals</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {researcherProfiles.map(res => <ResearcherCard key={res.id} researcher={res} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResearchHubHome;