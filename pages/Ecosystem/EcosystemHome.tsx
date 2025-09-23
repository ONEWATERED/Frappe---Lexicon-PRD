import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { EcosystemEntity, EntityType } from '../../types';
import { BuildingOffice2Icon, ScaleIcon, AcademicCapIcon, HeartIcon, ArrowRightIcon, CheckBadgeIcon, SparklesIcon } from '../../components/icons/Icons';

const entityTypes: EntityType[] = ['Vendor', 'Consultant', 'Government', 'Academia', 'Non-Profit'];

const typeStyles: Record<EntityType, { color: string, Icon: React.FC<{className?: string}> }> = {
    'Vendor': { color: 'green', Icon: BuildingOffice2Icon },
    'Consultant': { color: 'purple', Icon: BuildingOffice2Icon },
    'Government': { color: 'sky', Icon: ScaleIcon },
    'Academia': { color: 'amber', Icon: AcademicCapIcon },
    'Non-Profit': { color: 'rose', Icon: HeartIcon },
};

const FeaturedPartnerCard: React.FC<{ entity: EcosystemEntity }> = ({ entity }) => (
    <Link to={`/ecosystem/${entity.id}`} className="block w-96 flex-shrink-0 bg-slate-800 rounded-lg p-6 group border-2 border-slate-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-1 flex-shrink-0">
                <img src={entity.logoUrl} alt={`${entity.name} logo`} className="max-w-full max-h-full object-contain" />
            </div>
            <div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{entity.name}</h3>
                <p className="text-sm text-slate-400">{entity.type}</p>
            </div>
        </div>
        <p className="mt-4 text-sm text-slate-300 line-clamp-2 h-10">{entity.tagline}</p>
        {entity.services && entity.services.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-xs font-semibold text-slate-400 uppercase">Key Offerings</p>
                <ul className="mt-2 text-sm text-slate-300 list-disc list-inside">
                    {entity.services.slice(0, 2).map(service => <li key={service.title} className="truncate">{service.title}</li>)}
                </ul>
            </div>
        )}
    </Link>
);


const EntityCard: React.FC<{ entity: EcosystemEntity }> = ({ entity }) => {
    const { color } = typeStyles[entity.type];

    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700 hover:border-blue-400 transition-all duration-300 h-full flex flex-col group">
            <div className="flex items-start justify-between">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-1">
                    <img src={entity.logoUrl} alt={`${entity.name} logo`} className="max-w-full max-h-full object-contain" />
                </div>
                <span className={`text-xs font-semibold px-2 py-1 bg-${color}-500/10 text-${color}-400 rounded-full border border-${color}-500/30`}>{entity.type}</span>
            </div>
            <div className="flex-grow mt-4">
                <h3 className="text-xl font-bold text-slate-100">{entity.name}</h3>
                <p className="text-sm text-slate-400">{entity.location}</p>
                <p className="text-sm text-slate-300 mt-2">{entity.tagline}</p>
            </div>
             <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {entity.isClaimed && (
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 text-green-400 rounded-full font-semibold">
                        <CheckBadgeIcon className="w-4 h-4" /> Claimed
                    </span>
                )}
                {entity.featuredVideoUrl && (
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-purple-500/10 text-purple-400 rounded-full font-semibold">
                        <SparklesIcon className="w-4 h-4" /> Micro-site
                    </span>
                )}
            </div>
             <Link to={`/ecosystem/${entity.id}`} className="flex items-center justify-between text-blue-400 mt-4 font-semibold text-sm">
                <span>View Profile</span>
                <ArrowRightIcon className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
            </Link>
        </div>
    );
}

const EcosystemHome: React.FC = () => {
    const { ecosystemEntities } = useAuth();
    const [activeTypeFilter, setActiveTypeFilter] = useState('All');
    const [activeLetter, setActiveLetter] = useState('All');
    
    const alphabet = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
    
    const featuredPartners = useMemo(() => ecosystemEntities.filter(e => e.isFeatured), [ecosystemEntities]);

    const filteredEntities = useMemo(() => {
        let results = [...ecosystemEntities];

        if (activeTypeFilter !== 'All') {
            results = results.filter(e => e.type === activeTypeFilter);
        }

        if (activeLetter !== 'All') {
            results = results.filter(entity => entity.name.toUpperCase().startsWith(activeLetter));
        }
        
        // Sort alphabetically by name for consistent, fair ordering
        results.sort((a, b) => a.name.localeCompare(b.name));

        return results;
    }, [ecosystemEntities, activeTypeFilter, activeLetter]);

    return (
         <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">Industry Partners</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
                    Discover and connect with the vendors, consultants, and agencies shaping the future of infrastructure.
                </p>
            </div>

            <div className="mt-16">
                <h2 className="text-3xl font-bold text-white mb-6">Featured Partners</h2>
                <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4">
                    {featuredPartners.map(entity => <FeaturedPartnerCard key={entity.id} entity={entity} />)}
                </div>
            </div>

            <div className="mt-16">
                 <h2 className="text-3xl font-bold text-white mb-6 text-center">All Partners</h2>
                <div className="bg-slate-800/50 py-6 rounded-xl border border-slate-700">
                    <div className="flex justify-center flex-wrap gap-1 sm:gap-2 px-4">
                        {alphabet.map(letter => (
                            <button
                                key={letter}
                                onClick={() => setActiveLetter(letter)}
                                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-sm font-bold transition-colors flex items-center justify-center ${
                                activeLetter === letter ? 'bg-blue-500 text-white' : 'text-slate-200 hover:bg-slate-600'
                                }`}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-center flex-wrap gap-3 px-4">
                        <button
                            onClick={() => setActiveTypeFilter('All')}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${activeTypeFilter === 'All' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                        >
                            All Types
                        </button>
                        {entityTypes.map(type => (
                            <button
                                key={type}
                                onClick={() => setActiveTypeFilter(type)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${activeTypeFilter === type ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                            >
                                {React.createElement(typeStyles[type].Icon, { className: "w-4 h-4"})}
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

             <div className="mt-12">
                {filteredEntities.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredEntities.map(entity => <EntityCard key={entity.id} entity={entity} />)}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-slate-800/50 rounded-lg">
                        <h3 className="text-2xl font-semibold text-slate-300">No Partners Found</h3>
                        <p className="text-slate-500 mt-2">Try adjusting your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EcosystemHome;