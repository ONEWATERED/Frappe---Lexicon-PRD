
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { DroobiIcon } from './icons/DroobiIcon';
import { XIcon, SparklesIcon } from './icons/Icons';
import { getDroobiResponse } from '../services/geminiService';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const Droobi: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showNudge, setShowNudge] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const nudgeTimeoutRef = useRef<number | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const getNudgeMessage = (pathname: string): string => {
        if (pathname.startsWith('/academy')) return "Ready to study for an exam?";
        if (pathname.startsWith('/term')) return "Need help understanding this term?";
        if (pathname.startsWith('/droobi-tv')) return "Looking for a specific video?";
        if (pathname.startsWith('/manuals')) return "Can't find the right manual?";
        if (pathname.startsWith('/ecosystem')) return "Which partner are you looking for?";
        return "Got any questions about water?";
    };
    
    useEffect(() => {
        if (nudgeTimeoutRef.current) {
            clearTimeout(nudgeTimeoutRef.current);
        }
        setShowNudge(false);
        if (!isOpen) {
             nudgeTimeoutRef.current = window.setTimeout(() => {
                setShowNudge(true);
            }, 5000); // Show nudge after 5 seconds
        }

        return () => {
            if (nudgeTimeoutRef.current) clearTimeout(nudgeTimeoutRef.current);
        }
    }, [location.pathname, isOpen]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: userInput };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = userInput;
        setUserInput('');
        setIsLoading(true);

        try {
            const aiResponse = await getDroobiResponse(currentInput);
            const aiMessage: Message = { sender: 'ai', text: aiResponse };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = { sender: 'ai', text: "Sorry, I'm having a little trouble connecting. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const openChat = () => {
        setIsOpen(true);
        setShowNudge(false);
        if (messages.length === 0) {
            setIsLoading(true);
            getDroobiResponse("Hello").then(response => {
                setMessages([{ sender: 'ai', text: response }]);
                setIsLoading(false);
            });
        }
    }

    return (
        <div className="fixed bottom-5 right-5 z-[100]">
            {/* Chat Window */}
            {isOpen && (
                <div className="w-[calc(100vw-40px)] sm:w-96 h-[60vh] bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl flex flex-col animate-fadeInUp">
                    <header className="flex items-center justify-between p-4 border-b border-slate-700">
                        <div className="flex items-center gap-2">
                            <DroobiIcon className="w-8 h-8"/>
                            <h2 className="font-bold text-white">DROOBI</h2>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-700">
                            <XIcon className="w-5 h-5"/>
                        </button>
                    </header>
                    <div className="flex-grow p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex gap-3 items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender === 'ai' && <DroobiIcon className="w-8 h-8 flex-shrink-0" />}
                                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}></p>
                                </div>
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex gap-3 items-end justify-start">
                               <DroobiIcon className="w-8 h-8 flex-shrink-0" />
                               <div className="bg-slate-700 p-3 rounded-2xl rounded-bl-none">
                                   <div className="flex items-center gap-1.5">
                                       <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-0"></span>
                                       <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></span>
                                       <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-300"></span>
                                   </div>
                               </div>
                            </div>
                         )}
                        <div ref={messagesEndRef} />
                    </div>
                    <footer className="p-4 border-t border-slate-700">
                        <form onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading}
                            />
                        </form>
                    </footer>
                </div>
            )}
            
            {/* Nudge Message */}
            {!isOpen && showNudge && (
                 <div onClick={openChat} className="absolute bottom-4 right-24 w-64 bg-slate-700 text-white p-3 rounded-lg shadow-lg cursor-pointer animate-fadeInUp">
                    <p className="text-sm">{getNudgeMessage(location.pathname)}</p>
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-slate-700"></div>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={openChat}
                className={`w-20 h-20 rounded-full bg-blue-500 shadow-lg flex items-center justify-center transition-transform hover:scale-110 ${!isOpen ? 'animate-droobi-pulse' : ''}`}
                aria-label="Open AI Assistant"
            >
                <DroobiIcon className="w-28 h-28" />
            </button>
        </div>
    );
};

export default Droobi;
