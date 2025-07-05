
import React, { useState, useEffect } from 'react';
import { Clock, Smartphone } from 'lucide-react';
import { phrases } from '../data/phrases';

interface TimerScreenProps {
  timeRemaining: number;
  userName: string;
}

const TimerScreen: React.FC<TimerScreenProps> = ({ timeRemaining, userName }) => {
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [phraseCategory, setPhraseCategory] = useState('');

  useEffect(() => {
    // Show a random phrase on component mount and every time user opens the app
    showRandomPhrase();
  }, []);

  const showRandomPhrase = () => {
    const categories = Object.keys(phrases) as Array<keyof typeof phrases>;
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const categoryPhrases = phrases[randomCategory];
    const randomPhrase = categoryPhrases[Math.floor(Math.random() * categoryPhrases.length)];
    
    setCurrentPhrase(randomPhrase);
    setPhraseCategory(randomCategory);
  };

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'curiosidade': return '🤔';
      case 'humor': return '😂';
      case 'motivacional': return '💪';
      case 'duploSentido': return '😏';
      default: return '📱';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'curiosidade': return 'from-blue-400 to-purple-500';
      case 'humor': return 'from-yellow-400 to-orange-500';
      case 'motivacional': return 'from-green-400 to-teal-500';
      case 'duploSentido': return 'from-pink-400 to-red-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="text-6xl mb-4 animate-pulse">⏳</div>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
            Rolômetro Ativo
          </h2>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-8 border border-white/20">
          <div className="text-4xl font-mono font-bold mb-2 text-yellow-300">
            {formatTime(timeRemaining)}
          </div>
          <p className="text-sm opacity-80">tempo restante</p>
        </div>

        {currentPhrase && (
          <div className={`bg-gradient-to-r ${getCategoryColor(phraseCategory)} rounded-3xl p-6 mb-8 transform hover:scale-105 transition-all duration-200 cursor-pointer`}
               onClick={showRandomPhrase}>
            <div className="text-3xl mb-3">
              {getCategoryEmoji(phraseCategory)}
            </div>
            <p className="text-lg font-medium leading-relaxed">
              {currentPhrase}
            </p>
            <div className="mt-4 text-xs opacity-80">
              👆 Toque para ver outra frase
            </div>
          </div>
        )}

        <div className="text-sm opacity-70 space-y-2">
          <p>📊 Estamos medindo sua rolagem...</p>
          <p>🎯 Continue usando normalmente</p>
          {userName && <p>👋 Oi, {userName}!</p>}
        </div>
      </div>
    </div>
  );
};

export default TimerScreen;
