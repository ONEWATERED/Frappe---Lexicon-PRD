import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Publication, Patent, ResearchProject } from '../../types';
import { ShareIcon, LinkIcon, BookmarkSquareIcon } from '../../components/icons/Icons';

const PublicationCard: React.FC<{ pub: Publication }> = ({ pub }) => (
    <div className="py-4">
        <h4 className="font-bold text-slate-200">{pub.title}</h4>
        <p className="text-sm text-slate-400 mt-1">{pub.journal}, {pub.year}</p>
        <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline mt-2 inline-flex items-center gap-1">
            <LinkIcon className="w-4 h-4" /> View Publication (DOI: {pub.doi})
        </a>
    </div>
);

const PatentCard: React.FC<{ patent: Patent }> = ({ patent }) => (
    <div className="py-4">
        <h4 className="font-bold text-slate-200">{patent.title}</h4>
        <p className="text-sm text-slate-400 mt-1">Patent No: {patent.patentNumber} &bull; Granted: {new Date(patent.dateGranted).toLocaleDateString()}</p>
        <a href={patent.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline mt-2 inline-flex items-center gap-1">
            <LinkIcon className="w-4 h-4" /> View Patent Details
        </a>
    </div>
);

const ProjectCard: React.FC<{ project: ResearchProject }> = ({ project }) => (
    <div className="py-4">
        <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-200">{project.title}</h4>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${project.status === 'Ongoing' ? 'bg-green-500/10 text-green-400' : 'bg-slate-600 text-slate-300'}`}>
                {project.status}
            </span>
        </div>
        <p className="text-sm text-slate-400 mt-1">{project.description}</p>
    </div>
);


const ResearcherProfilePage: React.FC = () => {
    const { researcherId } = useParams<{ researcherId: string }>();
    const { researcherProfiles } = useAuth();
    const researcher = researcherProfiles.find(r => r.id === researcherId);

    if (!researcher) {
        return (
            <div className="text-center py-20 text-white">
                <h1 className="text-2xl">Researcher not found.</h1>
                <Link to="/research" className="text-blue-400 hover:underline mt-4 inline-block">&larr; Back to Research Hub</Link>
            </div>
        );
    }
    
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Profile link copied to clipboard!');
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="glass-card p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8">
                <img src={researcher.avatarUrl} alt={researcher.name} className="w-40 h-40 rounded-full border-4 border-slate-700 shadow-lg flex-shrink-0" />
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-extrabold text-white">{researcher.name}</h1>
                    <p className="text-xl text-blue-300 mt-1">{researcher.title}</p>
                    <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
                        <img src={researcher.universityLogoUrl} alt={`${researcher.university} logo`} className="w-8 h-8"/>
                        <p className="text-lg text-slate-300">{researcher.university}</p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="mt-8 grid lg:grid-cols-12 gap-8">
                {/* Left Sidebar */}
                <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
                    <div className="glass-card p-6">
                        <h3 className="text-lg font-bold text-white mb-3">Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                            {researcher.expertiseTags.map(tag => (
                                <span key={tag} className="text-sm bg-slate-700 text-slate-200 px-3 py-1 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="glass-card p-6">
                        <button onClick={handleShare} className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                            <ShareIcon className="w-5 h-5"/> Share / Recommend Profile
                        </button>
                    </div>
                </aside>
                
                {/* Right Content */}
                <main className="lg:col-span-8 xl:col-span-9 space-y-8">
                    <div className="glass-card p-8">
                        <h2 className="text-2xl font-bold text-white">About</h2>
                        <p className="mt-4 text-slate-300 leading-relaxed whitespace-pre-line">{researcher.bio}</p>
                    </div>

                    <div className="glass-card p-8">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><BookmarkSquareIcon className="w-7 h-7 text-blue-400"/> Publications</h2>
                        <div className="divide-y divide-slate-700">
                           {researcher.publications.map(pub => <PublicationCard key={pub.id} pub={pub} />)}
                        </div>
                    </div>

                    {researcher.projects.length > 0 && (
                        <div className="glass-card p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Research Projects</h2>
                            <div className="divide-y divide-slate-700">
                                {researcher.projects.map(proj => <ProjectCard key={proj.id} project={proj} />)}
                            </div>
                        </div>
                    )}

                    {researcher.patents.length > 0 && (
                        <div className="glass-card p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Patents</h2>
                            <div className="divide-y divide-slate-700">
                                {researcher.patents.map(pat => <PatentCard key={pat.id} patent={pat} />)}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ResearcherProfilePage;