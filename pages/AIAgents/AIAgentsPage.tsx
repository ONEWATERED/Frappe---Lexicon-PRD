


import React, { useState } from 'react';
// FIX: Added MicrophoneIcon to imports to resolve usage error.
import { PhoneIcon, ChatBubbleLeftRightIcon, CpuChipIcon, SparklesIcon, MicrophoneIcon } from '../../components/icons/Icons';
import AICoachModal from '../../components/AICoachModal'; // Re-using for simplicity
import VoiceChatModal from '../../components/VoiceChatModal';
import { Flashcard } from '../../types';

// Mock flashcard for the modal props
const hardeepCard: Flashcard = {
    id: 'agent-hardeep',
    deck_id: 'agents',
    category_id: 'ai_blockchain',
    front: { content: 'Hardeep: Knowledge Avatar' },
    back: { content: 'AI trained on Hardeep\'s expertise in water utility management.' },
    media: {}
};

const droobiCard: Flashcard = {
    id: 'agent-droobi',
    deck_id: 'agents',
    category_id: 'ai_blockchain',
    front: { content: 'Droobi: AI Interview Coach' },
    back: { content: 'AI designed to conduct mock interviews for various roles.' },
    media: {}
};


const AIAgentsPage: React.FC = () => {
    const [isHardeepModalOpen, setIsHardeepModalOpen] = useState(false);
    const [isVoiceChatOpen, setIsVoiceChatOpen] = useState(false);
    const [isDroobiModalOpen, setIsDroobiModalOpen] = useState(false);

    return (
        <>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <CpuChipIcon className="w-16 h-16 text-blue-500 mx-auto" />
                    <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl mt-4">oraKLES AI Co-pilots</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-400">
                        Interact with digital experts and AI-powered tools. Democratizing expertise to accelerate learning and professional growth.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {/* Hardeep Agent Card */}
                    <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
                        <img src="https://i.pravatar.cc/150?u=hardeep" alt="Hardeep" className="w-32 h-32 rounded-full border-4 border-slate-700 shadow-lg" />
                        <h2 className="text-3xl font-bold text-white mt-6">Hardeep</h2>
                        <p className="text-blue-400 font-semibold">Knowledge Avatar</p>
                        <p className="text-slate-300 mt-4 flex-grow">
                            Ask me anything about water utility management, digital transformation, and sustainable infrastructure. I am an AI trained on Hardeep's knowledge base, here to provide instant answers and insights.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <button onClick={() => setIsVoiceChatOpen(true)} className="flex items-center justify-center gap-3 w-48 px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors">
                                <PhoneIcon className="w-5 h-5" />
                                Talk to Hardeep
                            </button>
                             <button onClick={() => setIsHardeepModalOpen(true)} className="flex items-center justify-center gap-3 w-48 px-6 py-3 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-600 transition-colors">
                                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                                Chat Now
                            </button>
                        </div>
                    </div>

                    {/* Droobi Agent Card */}
                    <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
                        <div className="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center border-4 border-slate-700 shadow-lg">
                           <SparklesIcon className="w-20 h-20 text-purple-400"/>
                        </div>
                        <h2 className="text-3xl font-bold text-white mt-6">Droobi</h2>
                        <p className="text-purple-400 font-semibold">AI Interview Coach</p>
                        <p className="text-slate-300 mt-4 flex-grow">
                            Hone your interview skills for any role in the water industry. I'll ask you relevant questions, simulate real interview scenarios, and help you prepare to land your next job.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <button onClick={() => alert('Interview simulation coming soon!')} className="flex items-center justify-center gap-3 w-full sm:w-64 px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors">
                                <MicrophoneIcon className="w-5 h-5" />
                                Start Mock Interview
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center glass-card p-10 rounded-2xl">
                     <h2 className="text-3xl font-bold text-white">Create Your Own AI Agent</h2>
                     <p className="mt-4 max-w-2xl mx-auto text-slate-400">
                        Want to turn your organization's knowledge base or a key expert into an interactive AI? Create custom agents for internal training, customer support, or knowledge preservation.
                     </p>
                     <button onClick={() => alert('Contact us to learn more!')} className="mt-8 bg-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-600 transition-colors">
                        Learn More
                     </button>
                </div>
            </div>
            
            {isHardeepModalOpen && <AICoachModal card={hardeepCard} onClose={() => setIsHardeepModalOpen(false)} />}
            <VoiceChatModal isOpen={isVoiceChatOpen} onClose={() => setIsVoiceChatOpen(false)} />
        </>
    );
};

export default AIAgentsPage;