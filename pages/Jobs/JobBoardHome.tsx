import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { JobPosting } from '../../types';
import { BriefcaseIcon, StarIcon, MapPinIcon } from '../../components/icons/Icons';

type AggregatedJob = JobPosting & {
    companyName: string;
    companyLogoUrl: string;
    entityId: string;
};

const JobCard: React.FC<{ job: AggregatedJob }> = ({ job }) => {
    return (
        <div className="glass-card p-6 flex flex-col h-full">
            <div className="flex items-start gap-4">
                <Link to={`/ecosystem/${job.entityId}`} className="flex-shrink-0 w-16 h-16 bg-white rounded-lg flex items-center justify-center p-1">
                    <img src={job.companyLogoUrl} alt={job.companyName} className="max-w-full max-h-full object-contain" />
                </Link>
                <div>
                    <span className="text-xs font-semibold bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{job.type}</span>
                    <h3 className="text-lg font-bold text-white mt-2">{job.title}</h3>
                </div>
            </div>
            <div className="flex-grow mt-3">
                 <Link to={`/ecosystem/${job.entityId}`} className="font-semibold text-slate-300 hover:text-blue-400">{job.companyName}</Link>
                 <p className="flex items-center gap-1.5 text-sm text-slate-400 mt-1"><MapPinIcon className="w-4 h-4" />{job.location}</p>
            </div>
            <div className="mt-4">
                <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="w-full text-center block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">
                    Apply Now
                </a>
            </div>
        </div>
    );
};

const JobBoardHome: React.FC = () => {
    const { ecosystemEntities } = useAuth();
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('All');

    const allJobs = useMemo((): AggregatedJob[] => {
        return ecosystemEntities.flatMap(entity =>
            entity.jobPostings?.map(job => ({
                ...job,
                companyName: entity.name,
                companyLogoUrl: entity.logoUrl,
                entityId: entity.id
            })) || []
        );
    }, [ecosystemEntities]);

    const filteredJobs = useMemo(() => {
        return allJobs.filter(job => {
            const matchesKeyword = keyword === '' ||
                job.title.toLowerCase().includes(keyword.toLowerCase()) ||
                job.companyName.toLowerCase().includes(keyword.toLowerCase()) ||
                job.description.toLowerCase().includes(keyword.toLowerCase());
            
            const matchesLocation = location === '' ||
                job.location.toLowerCase().includes(location.toLowerCase());

            const matchesType = jobType === 'All' || job.type === jobType;

            return matchesKeyword && matchesLocation && matchesType;
        });
    }, [allJobs, keyword, location, jobType]);

    const jobTypes: JobPosting['type'][] = ['Full-time', 'Part-time', 'Contract'];

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <div className="relative inline-block">
                    <BriefcaseIcon className="w-16 h-16 text-blue-500 mx-auto" />
                    <StarIcon className="w-8 h-8 text-yellow-400 absolute -top-1 -right-2" />
                </div>
                <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl mt-4">Premium Job Board</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-400">
                    Exclusive career opportunities from top partners in the oraKLES ecosystem.
                </p>
            </div>

            <div className="mt-12 glass-card p-6 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Keyword, company, etc."
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-3 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={jobType}
                        onChange={e => setJobType(e.target.value)}
                        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="All">All Job Types</option>
                        {jobTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <main className="lg:col-span-8">
                    <h2 className="text-xl font-bold text-white mb-6">
                        {filteredJobs.length} {filteredJobs.length === 1 ? 'Opportunity' : 'Opportunities'} Found
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredJobs.map(job => <JobCard key={job.id} job={job} />)}
                    </div>
                </main>

                <aside className="lg:col-span-4 sticky top-24">
                    <div className="glass-card p-6 rounded-2xl text-center">
                        <h3 className="text-xl font-bold text-white">Hiring?</h3>
                        <p className="text-slate-400 mt-2 text-sm">Reach qualified professionals in the water industry. Post your job opening on the oraKLES Premium Job Board.</p>
                        <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                            Post a Job
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default JobBoardHome;
