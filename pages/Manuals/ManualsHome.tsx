import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Manual } from '../../types';
import { SearchIcon, ArrowRightIcon } from '../../components/icons/Icons';

const assetTypes: Manual['assetType'][] = ['Pump', 'Sensor', 'Hydrant', 'Valve', 'Filtration System'];

const ManualCard: React.FC<{ manual: Manual }> = ({ manual }) => {
    const { vendors } = useAuth();
    const vendor = vendors.find(v => v.id === manual.vendorId);

    return (
        <div className="bg-slate-800 rounded-lg overflow-hidden group border border-slate-700 hover:border-blue-400 transition-colors duration-300">
            <div className="h-48 bg-slate-700">
                <img src={manual.coverImageUrl} alt={manual.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
                <span className="text-xs font-semibold uppercase text-blue-400">{manual.assetType}</span>
                <h3 className="text-lg font-bold text-slate-100 mt-2">{manual.title}</h3>
                <p className="text-sm text-slate-400 mt-1">{vendor?.name}</p>
                <p className="text-xs text-slate-500 font-mono mt-1">Model: {manual.modelNumber}</p>
                <Link to={`/manual/${manual.id}`} className="flex items-center justify-between text-blue-400 mt-4 font-semibold text-sm">
                    <span>View & Interact</span>
                    <ArrowRightIcon className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
};


const ManualsHome: React.FC = () => {
    const { manuals } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All Assets');

    const filteredManuals = useMemo(() => {
        return manuals.filter(manual => {
            const matchesFilter = activeFilter === 'All Assets' || manual.assetType === activeFilter;
            const matchesSearch = searchTerm === '' ||
                manual.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                manual.modelNumber.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [manuals, searchTerm, activeFilter]);


    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">Interactive Manuals Library</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
                    Search, filter, and interact with O&M manuals for critical infrastructure assets.
                </p>
            </div>
            
            <div className="mt-10 max-w-3xl mx-auto">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by manual title, model number, or vendor..."
                        className="block w-full bg-slate-800 border border-slate-700 rounded-md py-3 pl-10 pr-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="mt-8 flex justify-center flex-wrap gap-2">
                <button
                    onClick={() => setActiveFilter('All Assets')}
                    className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${activeFilter === 'All Assets' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                >
                    All Assets
                </button>
                {assetTypes.map(type => (
                    <button
                        key={type}
                        onClick={() => setActiveFilter(type)}
                        className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${activeFilter === type ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredManuals.map(manual => <ManualCard key={manual.id} manual={manual} />)}
            </div>
        </div>
    );
};

export default ManualsHome;