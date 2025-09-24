import React, { useState, useEffect, useRef } from 'react';
import { getHardeepVoiceResponse } from '../services/geminiService';
import { MicrophoneIcon, XIcon, SparklesIcon } from './icons/Icons';

interface VoiceChatModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const VoiceChatModal: React.FC<VoiceChatModalProps> = ({ isOpen, onClose }) => {
    const [isListening, setIsListening] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);


    const processTranscript = async (transcript: string) => {
        if (!transcript.trim()) return;

        setChatHistory(prev => [...prev, { sender: 'user', text: transcript }]);
        setIsThinking(true);

        try {
            const aiResponse = await getHardeepVoiceResponse(transcript);
            setChatHistory(prev => [...prev, { sender: 'ai', text: aiResponse }]);
            speak(aiResponse);
        } catch (error) {
            const errorMessage = "Sorry, I encountered an error. Please try again.";
            setChatHistory(prev => [...prev, { sender: 'ai', text: errorMessage }]);
            speak(errorMessage);
        } finally {
            setIsThinking(false);
        }
    };

    const speak = (text: string) => {
        // Cancel any previous speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';
            recognition.interimResults = false;

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                processTranscript(transcript);
            };
            recognition.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };
            recognition.onend = () => {
                setIsListening(false);
            };
            recognitionRef.current = recognition;
        } else {
             console.error("Browser does not support SpeechRecognition.");
        }

        return () => {
            recognitionRef.current?.stop();
            window.speechSynthesis.cancel();
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);
    
    // Cleanup on close
    useEffect(() => {
        if (!isOpen) {
            window.speechSynthesis.cancel();
            recognitionRef.current?.stop();
            setIsListening(false);
            setIsSpeaking(false);
            setIsThinking(false);
        }
    }, [isOpen]);

    const handleMicClick = () => {
        const recognition = recognitionRef.current;
        if (!recognition) return;

        if (isListening) {
            recognition.stop();
        } else {
            try {
                recognition.start();
                setIsListening(true);
            } catch (error) {
                console.error("Speech recognition could not start: ", error);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md h-[70vh] flex flex-col shadow-2xl">
                <header className="flex items-center justify-between p-4 border-b border-slate-700">
                    <div className="flex items-center gap-3">
                        <img src="https://i.pravatar.cc/150?u=hardeep" alt="Hardeep" className="w-10 h-10 rounded-full" />
                        <div>
                            <h2 className="text-xl font-bold text-white">Hardeep</h2>
                            <p className="text-sm text-green-400">Live</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white"><XIcon className="w-6 h-6"/></button>
                </header>
                <div className="flex-grow p-4 overflow-y-auto space-y-4">
                    {chatHistory.length === 0 && (
                        <div className="text-center text-slate-400 h-full flex flex-col items-center justify-center">
                            <p>Press the microphone to start talking to Hardeep.</p>
                        </div>
                    )}
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                            {msg.sender === 'ai' && <div className="w-8 h-8 bg-blue-500 rounded-full flex-shrink-0 flex items-center justify-center"><SparklesIcon className="w-5 h-5 text-white" /></div>}
                            <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isThinking && <div>...</div>}
                    <div ref={messagesEndRef}></div>
                </div>
                <footer className="p-4 border-t border-slate-700 flex flex-col items-center justify-center">
                    <button 
                        onClick={handleMicClick}
                        disabled={!recognitionRef.current}
                        className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors duration-300 ${isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                        <MicrophoneIcon className="w-10 h-10 text-white"/>
                    </button>
                    <p className="text-xs text-slate-400 mt-2 h-4">
                        {isListening ? "Listening..." : (isThinking ? "Thinking..." : (isSpeaking ? "Speaking..." : "Tap to speak"))}
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default VoiceChatModal;
