import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PIPDocument, User, EcosystemEntity } from '../../types';
import { ArchiveBoxIcon, ArrowUpTrayIcon, BuildingOffice2Icon, DocumentTextIcon, TrophyIcon } from '../../components/icons/Icons';

type LeaderboardItem = {
    id: string;
    name: string;
    avatarUrl: string;
    count: number;
};

const Leaderboard: React.FC<{ title: string; items: LeaderboardItem[]; icon: React.ReactNode }> = ({ title, items, icon }) => (
    <div className="glass-card p-6 rounded-2xl">
        <h3 className="flex items-center gap-3 font-bold text-white text-xl">
            {icon}
            {title}
        </h3>
        <div className="mt-4 space-y-4">
            {items.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-slate-400 text-sm w-5 text-center">{index + 1}</span>
                        <img src={item.avatarUrl} alt={item.name} className={`w-9 h-9 rounded-full ${title.includes('Companies') ? 'bg-white p-1' : ''}`} />
                        <p className="text-sm font-semibold text-slate-200">{item.name}</p>
                    </div>
                    <span className="text-sm font-mono font-bold text-blue-400">{item.count.toLocaleString()}</span>
                </div>
            ))}
        </div>
    </div>
);


const PIPHome: React.FC = () => {
    const { pipDocuments, getAllUsers, ecosystemEntities } = useAuth();
    const users = getAllUsers();
    const [liveEvent, setLiveEvent] = useState<PIPDocument | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * pipDocuments.length);
            setLiveEvent(pipDocuments[randomIndex]);
            
            setTimeout(() => {
                setLiveEvent(null);
            }, 5000); // Notification stays for 5 seconds

        }, 8000); // New notification every 8 seconds

        return () => clearInterval(interval);
    }, [pipDocuments]);

    const contributorLeaderboard = useMemo((): LeaderboardItem[] => {
        const contributorCounts: Record<string, number> = {};
        pipDocuments.forEach(doc => {
            contributorCounts[doc.submittedByUserId] = (contributorCounts[doc.submittedByUserId] || 0) + 1;
        });

        return Object.entries(contributorCounts)
            .map(([userId, count]) => {
                const user = users.find(u => u.id === userId);
                return user ? { id: userId, name: user.name, avatarUrl: user.avatarUrl, count } : null;
            })
            .filter((item): item is LeaderboardItem => item !== null)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [pipDocuments, users]);

    const companyLeaderboard = useMemo((): LeaderboardItem[] => {
        const companyCounts: Record<string, number> = {};
        pipDocuments.forEach(doc => {
            if (doc.submittedByEntityId) {
                companyCounts[doc.submittedByEntityId] = (companyCounts[doc.submittedByEntityId] || 0) + 1;
            }
        });

        return Object.entries(companyCounts)
            .map(([entityId, count]) => {
                const entity = ecosystemEntities.find(e => e.id === entityId);
                return entity ? { id: entityId, name: entity.name, avatarUrl: entity.logoUrl, count } : null;
            })
            .filter((item): item is LeaderboardItem => item !== null)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
    }, [pipDocuments, ecosystemEntities]);

    const LiveContributionFeed: React.FC = () => {
        const user = users.find(u => u.id === liveEvent?.submittedByUserId);
        if (!liveEvent || !user) return null;
        
        return (
             <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${liveEvent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="glass-card p-3 rounded-lg flex items-center gap-3 shadow-2xl">
                    <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                    <p className="text-sm text-slate-200">
                        <span className="font-bold">{user.name}</span> just contributed a document.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-900">
            <LiveContributionFeed />
            <div className="relative isolate overflow-hidden pt-14">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3b82f6] to-[#1e40af] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
                </div>
                <div className="mx-auto max-w-7xl py-24 sm:py-32 lg:py-40 px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <ArchiveBoxIcon className="w-20 h-20 text-blue-400 mx-auto" />
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mt-4">Public Information Protocol (PIP)</h1>
                        <p className="mt-6 text-2xl font-semibold leading-8 text-slate-300">The oraKLES 100k Initiative</p>
                        <p className="mt-4 text-lg text-slate-400">
                            Our mission is to build the definitive, open repository of 100,000 vital water industry documents from the United States. By centralizing reports, publications, and case studies, we can break down knowledge silos, accelerate innovation, and empower a new era of shared intelligence for all. This is a collective effort to build an invaluable resource for the entire sector.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <button className="flex items-center gap-2 rounded-md bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                <ArrowUpTrayIcon className="w-5 h-5"/>
                                Contribute a Document
                            </button>
                            <a 
                                href="https://infra-knowledge-nexus.lovable.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-md bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                            >
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div id="learn-more" className="max-w-7xl mx-auto pb-24 px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12">
                     <Leaderboard 
                        title="Top Individual Contributors" 
                        items={contributorLeaderboard} 
                        icon={<TrophyIcon className="w-6 h-6 text-yellow-400"/>}
                    />
                    <Leaderboard 
                        title="Top Company Contributors" 
                        items={companyLeaderboard} 
                        icon={<BuildingOffice2Icon className="w-6 h-6 text-green-400"/>}
                    />
                </div>

                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-white mb-6">Recently Added to the Protocol</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pipDocuments.map(doc => {
                            const user = users.find(u => u.id === doc.submittedByUserId);
                            return (
                                <div key={doc.id} className="glass-card p-6 flex flex-col">
                                    <div className="flex-grow">
                                        <span className="text-xs font-semibold uppercase text-purple-400">{doc.fileType}</span>
                                        <h3 className="text-lg font-bold text-white mt-2">{doc.title}</h3>
                                        <p className="text-sm text-slate-400 mt-2 line-clamp-3">{doc.description}</p>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-slate-700">
                                        {user && (
                                            <div className="flex items-center gap-2">
                                                <img src={user.avatarUrl} alt={user.name} className="w-6 h-6 rounded-full" />
                                                <p className="text-xs text-slate-400">Contributed by {user.name}</p>
                                            </div>
                                        )}
                                        <button className="w-full mt-4 flex items-center justify-center gap-2 text-sm bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-3 rounded-md transition-colors">
                                            <DocumentTextIcon className="w-4 h-4" /> View Document
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PIPHome;