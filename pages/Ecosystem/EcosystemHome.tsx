import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { EcosystemEntity, EntityType } from '../../types';
import { BuildingOffice2Icon, ScaleIcon, AcademicCapIcon, HeartIcon, ArrowRightIcon } from '../../components/icons/Icons';

const entityTypes: EntityType[] = ['Vendor', 'Consultant', 'Government', 'Academia', 'Non-Profit'];

const typeStyles: Record<EntityType, { color: string, Icon: React.FC<{className?: string}> }> = {
    'Vendor': { color: 'green', Icon: BuildingOffice2Icon },
    'Consultant': { color: 'purple', Icon: BuildingOffice2Icon },
    'Government': { color: 'sky', Icon: ScaleIcon },
    'Academia': { color: 'amber', Icon: AcademicCapIcon },
    'Non-Profit': { color: 'rose', Icon: HeartIcon },
};

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

            <div className="mt-12 bg-slate-800/50 py-6 rounded-xl border border-slate-700">
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