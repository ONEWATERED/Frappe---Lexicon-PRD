import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBlogPost: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would handle the form submission,
        // API call, and validation here.
        alert('Your insight has been submitted for review!');
        navigate('/insights');
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-white">Write Your Insight</h1>
                <p className="mt-2 text-lg text-slate-400">Share your expertise with the community.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-slate-300">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full bg-slate-800 border-slate-700 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
                        placeholder="A catchy and descriptive title"
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="subtitle" className="block text-sm font-medium text-slate-300">Subtitle</label>
                    <input
                        type="text"
                        id="subtitle"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="mt-1 block w-full bg-slate-800 border-slate-700 rounded-md shadow-sm py-2 px-4 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="A brief, engaging summary"
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-slate-300">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={15}
                        className="mt-1 block w-full bg-slate-800 border-slate-700 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-serif"
                        placeholder="Tell your story... You can use markdown for formatting."
                        required
                    />
                     <p className="mt-2 text-xs text-slate-500">Markdown is supported for formatting.</p>
                </div>

                <div className="flex justify-end gap-4">
                     <button
                        type="button"
                        onClick={() => navigate('/insights')}
                        className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                    >
                        Publish
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlogPost;
