import React, { useState, useRef, useEffect } from 'react';
import { Flashcard } from '../types';
import { getAICoachResponse } from '../services/geminiService';
import { SparklesIcon } from './icons/Icons';

interface AICoachModalProps {
  card: Flashcard;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const AICoachModal: React.FC<AICoachModalProps> = ({ card, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getAICoachResponse(card.front.content, card.back.content, input);
      const aiMessage: Message = { sender: 'ai', text: aiResponse };
      setMessages(prev => [...prev, userMessage, aiMessage]);
    } catch (error) {
      const errorMessage: Message = { sender: 'ai', text: "Sorry, I encountered an error. Please try again." };
      setMessages(prev => [...prev, userMessage, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl">
        <header className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <SparklesIcon className="w-6 h-6 text-purple-400" />
            <div>
              <h2 className="text-xl font-bold text-white">AI Coach</h2>
              <p className="text-sm text-slate-400">Topic: {card.front.content}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
        </header>
        
        <div className="flex-grow p-4 overflow-y-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-slate-400 h-full flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                <SparklesIcon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-semibold text-slate-200">Ask me anything!</h3>
              <p className="text-sm">Want an example, a simpler explanation, or a deep dive? Just ask.</p>
            </div>
          )}
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'ai' && <div className="w-8 h-8 bg-purple-500 rounded-full flex-shrink-0 flex items-center justify-center"><SparklesIcon className="w-5 h-5 text-white" /></div>}
              <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex-shrink-0 flex items-center justify-center"><SparklesIcon className="w-5 h-5 text-white" /></div>
              <div className="bg-slate-700 p-3 rounded-lg">
                  <div className="flex items-center gap-1">
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a follow-up question..."
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isLoading}
            />
          </form>
        </footer>
      </div>
    </div>
  );
};

export default AICoachModal;