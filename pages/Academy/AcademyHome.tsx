



import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowRightIcon, StarIcon } from '../../components/icons/Icons';
import { FlashcardDeck, lexiconCategoryNames } from '../../types';

const ProgressCard: React.FC<{ title: string; progress: number; goal: number; label: string }> = ({ title, progress, goal, label }) => {
  const percentage = goal > 0 ? (progress / goal) * 100 : 0;
  return (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-slate-200">{title}</h3>
        <span className="text-sm font-mono text-slate-400">{progress}/{goal}</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2.5">
        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="text-xs text-slate-500 mt-2">{label}</p>
    </div>
  );
};

const DeckCard: React.FC<{ deck: FlashcardDeck }> = ({ deck }) => (
    <Link to={`/academy/deck/${deck.id}`} className="block bg-slate-800 rounded-lg overflow-hidden group border border-slate-700 hover:border-blue-400 transition-all duration-300">
        <div className="h-32 bg-slate-700">
             <img src={deck.thumbnail_url} alt={deck.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform"/>
        </div>
        <div className="p-4">
            <h4 className="font-bold text-slate-100 truncate group-hover:text-blue-400">{deck.title}</h4>
            <p className="text-sm text-slate-400">{deck.cardCount} Cards</p>
        </div>
    </Link>
);


const AcademyHome: React.FC = () => {
  const { userProgress, oneWaterMinute, flashcardDecks, learningPathways } = useAuth();
  
  const oneWaterMinuteDeck = flashcardDecks.find(d => d.id === oneWaterMinute.deckId);

  const decksByCategory = useMemo(() => {
    // FIX: Explicitly typing the accumulator for `reduce` ensures that the resulting object's type is correctly inferred as `Record<string, FlashcardDeck[]>`, preventing `decks.map` from failing due to an `unknown` type on the `decks` variable.
    return flashcardDecks.reduce<Record<string, FlashcardDeck[]>>((acc, deck) => {
        const categoryName = lexiconCategoryNames[deck.category_id] || 'General';
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(deck);
        return acc;
    }, {});
  }, [flashcardDecks]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">oraKLES Academy</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
          Master the language of the water industry with interactive flashcard decks, learning pathways, and credentials.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-white mb-4">Your Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProgressCard title="Daily Challenge" progress={userProgress.dailyFlips.current} goal={userProgress.dailyFlips.goal} label="Daily cards flipped"/>
          <ProgressCard title="Weekly Challenge" progress={userProgress.weeklyChallenges.current} goal={userProgress.weeklyChallenges.goal} label="Decks reviewed this week" />
          <div className="bg-slate-800/50 p-6 rounded-xl border border-orange-500/50">
            <h3 className="font-semibold text-slate-200">Learning Streak</h3>
            <p className="text-3xl font-bold text-orange-400 mt-2">{userProgress.currentStreak} Days</p>
            <p className="text-xs text-slate-500 mt-1">Keep studying daily to grow your streak!</p>
          </div>
        </div>
      </div>

      {oneWaterMinuteDeck && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-4">Today's One Water Minute</h2>
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-grow">
                <span className="text-sm font-semibold uppercase text-blue-400">Daily Topic</span>
                <h3 className="text-2xl font-bold text-white mt-2">{oneWaterMinute.dailyTopic}</h3>
                <p className="text-slate-400 mt-2 max-w-xl">{oneWaterMinute.description}</p>
                <Link to={`/academy/deck/${oneWaterMinute.deckId}`} className="mt-6 inline-flex items-center gap-2 bg-white text-slate-900 font-bold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors">
                    Study the Full Deck <ArrowRightIcon className="w-4 h-4" />
                </Link>
            </div>
            <Link to={`/academy/deck/${oneWaterMinute.deckId}`} className="flex-shrink-0 w-full md:w-64 group">
                <div className="bg-slate-700 p-4 rounded-lg">
                    <img src={oneWaterMinuteDeck.thumbnail_url} alt={oneWaterMinuteDeck.title} className="w-full aspect-video object-cover rounded"/>
                    <h4 className="font-semibold text-slate-200 mt-3">{oneWaterMinuteDeck.title}</h4>
                    <p className="text-sm text-slate-400">{oneWaterMinuteDeck.cardCount} Cards</p>
                </div>
            </Link>
          </div>
        </div>
      )}

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-white mb-6">Featured Learning Pathways</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningPathways.map(pathway => (
                <Link to={`/academy/pathway/${pathway.id}`} key={pathway.id} className="bg-slate-800 rounded-lg overflow-hidden group border border-slate-700 hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative">
                        <img src={pathway.thumbnail_url} alt={pathway.title} className="w-full h-48 object-cover"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{pathway.title}</h3>
                    </div>
                    <div className="p-6">
                        <p className="text-slate-400 text-sm h-20">{pathway.description}</p>
                        <div className="mt-4 flex justify-between items-center text-sm">
                            <span className="text-slate-300 font-semibold">{pathway.steps.length} Decks</span>
                            <div className="flex items-center gap-2 px-3 py-1 bg-yellow-400/10 text-yellow-300 rounded-full border border-yellow-400/30">
                                <StarIcon className="w-4 h-4" />
                                <span className="font-bold">{pathway.badge_name}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-white mb-6">Browse Decks by Category</h2>
        <div className="space-y-8">
            {Object.entries(decksByCategory).map(([category, decks]) =>(
                <div key={category}>
                    <h3 className="text-2xl font-semibold text-slate-200 mb-4">{category}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {decks.map(deck => <DeckCard key={deck.id} deck={deck} />)}
                    </div>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default AcademyHome;