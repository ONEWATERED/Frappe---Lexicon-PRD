import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Conversation, User, DirectMessage } from '../../types';
import { PaperAirplaneIcon, SearchIcon, ArrowLeftIcon } from '../../components/icons/Icons';

function formatMessageTime(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

const CommunityMessages: React.FC = () => {
    const { currentUser, conversations: initialConversations, getUserById } = useAuth();
    const { userId: newChatUserId } = useParams<{ userId: string }>();
    const navigate = useNavigate();

    // Local state to allow for optimistic updates
    const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!currentUser) return;
        
        if (newChatUserId) {
            // Find if a conversation already exists
            let existingConvo = conversations.find(c => 
                c.participantIds.includes(currentUser.id) && c.participantIds.includes(newChatUserId)
            );

            if (existingConvo) {
                setActiveConversationId(existingConvo.id);
            } else {
                // Create a new, temporary conversation
                const newConvo: Conversation = {
                    id: `temp-${currentUser.id}-${newChatUserId}`,
                    participantIds: [currentUser.id, newChatUserId],
                    messages: []
                };
                setConversations(prev => [newConvo, ...prev]);
                setActiveConversationId(newConvo.id);
            }
            // Clear the URL param after handling it
            navigate('/community/messages', { replace: true });
        }
    }, [newChatUserId, currentUser, conversations, navigate]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeConversationId, conversations]);

    const myConversations = useMemo(() => {
        if (!currentUser) return [];
        return conversations
            .filter(c => c.participantIds.includes(currentUser.id))
            .sort((a, b) => {
                const lastMsgA = a.messages[a.messages.length - 1];
                const lastMsgB = b.messages[b.messages.length - 1];
                if (!lastMsgA) return 1;
                if (!lastMsgB) return -1;
                return new Date(lastMsgB.timestamp).getTime() - new Date(lastMsgA.timestamp).getTime();
            });
    }, [conversations, currentUser]);
    
    const activeConversation = useMemo(() => {
        return conversations.find(c => c.id === activeConversationId);
    }, [conversations, activeConversationId]);
    
    const otherParticipant = useMemo(() => {
        if (!activeConversation || !currentUser) return null;
        const otherId = activeConversation.participantIds.find(id => id !== currentUser.id);
        return getUserById(otherId || '');
    }, [activeConversation, currentUser, getUserById]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentUser || !activeConversationId) return;

        const message: DirectMessage = {
            id: `msg-${Date.now()}`,
            fromUserId: currentUser.id,
            content: newMessage,
            timestamp: new Date().toISOString(),
            isRead: false
        };

        setConversations(prev => prev.map(convo => {
            if (convo.id === activeConversationId) {
                return { ...convo, messages: [...convo.messages, message] };
            }
            return convo;
        }));
        setNewMessage('');
    };

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="h-[calc(100vh-10rem)] flex glass-card rounded-2xl overflow-hidden">
                {/* Conversations List */}
                <aside className={`w-full md:w-1/3 border-r border-slate-700 flex flex-col ${activeConversationId ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-4 border-b border-slate-700">
                        <h1 className="text-2xl font-bold text-white">Messages</h1>
                    </div>
                    <div className="flex-grow overflow-y-auto">
                        {myConversations.map(convo => {
                            const otherUser = getUserById(convo.participantIds.find(id => id !== currentUser.id) || '');
                            if (!otherUser) return null;
                            const lastMessage = convo.messages[convo.messages.length - 1];
                             const isUnread = lastMessage && !lastMessage.isRead && lastMessage.fromUserId !== currentUser.id;

                            return (
                                <button key={convo.id} onClick={() => setActiveConversationId(convo.id)} className={`w-full text-left p-4 flex items-center gap-3 transition-colors ${activeConversationId === convo.id ? 'bg-slate-700/50' : 'hover:bg-slate-800/50'}`}>
                                    <img src={otherUser.avatarUrl} alt={otherUser.name} className="w-12 h-12 rounded-full" />
                                    <div className="flex-grow overflow-hidden">
                                        <p className="font-semibold text-slate-100">{otherUser.name}</p>
                                        {lastMessage && <p className={`text-sm truncate ${isUnread ? 'text-white font-semibold' : 'text-slate-400'}`}>{lastMessage.content}</p>}
                                    </div>
                                    {isUnread && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0"></div>}
                                </button>
                            );
                        })}
                    </div>
                </aside>
                
                {/* Chat View */}
                <main className={`w-full md:w-2/3 flex-col ${activeConversationId ? 'flex' : 'hidden md:flex'}`}>
                    {activeConversation && otherParticipant ? (
                        <>
                            <header className="p-4 border-b border-slate-700 flex items-center gap-3">
                                <button onClick={() => setActiveConversationId(null)} className="md:hidden p-2 -ml-2 text-slate-400">
                                    <ArrowLeftIcon className="w-5 h-5" />
                                </button>
                                <img src={otherParticipant.avatarUrl} alt={otherParticipant.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <h2 className="font-bold text-white">{otherParticipant.name}</h2>
                                    <p className="text-xs text-green-400">Online</p>
                                </div>
                            </header>
                            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                                {activeConversation.messages.map(msg => (
                                    <div key={msg.id} className={`flex items-end gap-2 ${msg.fromUserId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                                        {msg.fromUserId !== currentUser.id && <img src={otherParticipant.avatarUrl} className="w-6 h-6 rounded-full" />}
                                        <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${msg.fromUserId === currentUser.id ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                                            <p className="text-sm">{msg.content}</p>
                                            <p className={`text-xs mt-1 ${msg.fromUserId === currentUser.id ? 'text-blue-200' : 'text-slate-400'} text-right`}>{formatMessageTime(msg.timestamp)}</p>
                                        </div>
                                    </div>
                                ))}
                                 <div ref={messagesEndRef} />
                            </div>
                            <footer className="p-4 border-t border-slate-700">
                                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="w-full bg-slate-700/50 border border-slate-600 rounded-full py-2 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full flex-shrink-0">
                                        <PaperAirplaneIcon className="w-5 h-5"/>
                                    </button>
                                </form>
                            </footer>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
                            <h2 className="text-xl font-bold text-slate-200">Select a conversation</h2>
                            <p>Choose from your existing conversations or start a new one from the members page.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default CommunityMessages;
