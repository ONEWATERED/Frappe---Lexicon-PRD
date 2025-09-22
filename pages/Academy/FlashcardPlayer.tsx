import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MicrophoneIcon, SparklesIcon } from '../../components/icons/Icons';
import AICoachModal from '../../components/AICoachModal';

const FlashcardPlayer: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const { flashcardDecks, flashcards: allFlashcards, userProgress } = useAuth();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCoachOpen, setIsCoachOpen] = useState(false);

  const deck = useMemo(() => flashcardDecks.find(d => d.id === deckId), [flashcardDecks, deckId]);
  const deckFlashcards = useMemo(() => allFlashcards.filter(f => f.deck_id === deckId), [allFlashcards, deckId]);
  
  const currentCard = deckFlashcards[currentIndex];

  if (!deck) {
    return <div className="fixed inset-0 bg-slate-900 flex items-center justify-center text-white">Deck not found.</div>;
  }
  if (!currentCard) {
    return <div className="fixed inset-0 bg-slate-900 flex items-center justify-center text-white">No cards in this deck.</div>;
  }

  const handleFlip = () => setIsFlipped(!isFlipped);
  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % deckFlashcards.length);
  };
  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + deckFlashcards.length) % deckFlashcards.length);
  };

  const progress = ((currentIndex + 1) / deckFlashcards.length) * 100;

  return (
    <>
      <div className="fixed inset-0 bg-slate-900 text-white flex flex-col p-4 md:p-8">
        <header className="flex items-center justify-between w-full max-w-4xl mx-auto">
          <div className="flex items-center gap-4 text-sm font-semibold text-slate-300">
            <div className="bg-slate-800 px-3 py-1 rounded-full">
              🔥 {userProgress.currentStreak} Day Streak
            </div>
            <div className="bg-slate-800 px-3 py-1 rounded-full">
              Mastery: 75%
            </div>
          </div>
          <Link to="/academy" className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold">Exit</Link>
        </header>
        
        <div className="flex-grow flex items-center justify-center w-full">
          <div className="w-full max-w-3xl flex flex-col items-center">
            <div 
              className="w-full aspect-[16/9] perspective-1000"
            >
              <div 
                className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
              >
                {/* Front of Card */}
                <div className="absolute w-full h-full backface-hidden bg-slate-800/50 border-2 border-slate-700 rounded-2xl flex items-center justify-center p-8 text-center">
                  <h2 className="text-2xl md:text-4xl font-bold">{currentCard.front.content}</h2>
                </div>

                {/* Back of Card */}
                <div className="absolute w-full h-full backface-hidden bg-slate-800/50 border-2 border-slate-700 rounded-2xl flex flex-col justify-center p-8 rotate-y-180 text-center">
                  <p className="text-xl md:text-2xl font-semibold mb-4">{currentCard.back.content}</p>
                  {currentCard.back.bullets && (
                    <ul className="list-disc list-inside space-y-2 text-left text-base md:text-lg max-w-md mx-auto">
                      {currentCard.back.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                <MicrophoneIcon className="w-5 h-5" /> Listen
              </button>
              <button onClick={handleFlip} className="px-6 py-3 text-lg font-bold bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                Flip Card
              </button>
              <button onClick={() => setIsCoachOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <SparklesIcon className="w-5 h-5" /> AI Coach
              </button>
            </div>
          </div>
        </div>

        <footer className="w-full max-w-3xl mx-auto">
          <div className="w-full bg-slate-700 rounded-full h-2.5 mb-4">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex items-center justify-between">
            <button onClick={handlePrev} className="px-6 py-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors font-semibold">Prev</button>
            <div className="text-lg font-mono">{currentIndex + 1} / {deckFlashcards.length}</div>
            <button onClick={handleNext} className="px-6 py-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors font-semibold">Next</button>
          </div>
        </footer>
      </div>
      {isCoachOpen && <AICoachModal card={currentCard} onClose={() => setIsCoachOpen(false)} />}
    </>
  );
};

export default FlashcardPlayer;