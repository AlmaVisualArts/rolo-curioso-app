
import React, { useState, useEffect } from 'react';
import { Clock, FastForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { phrases } from '../data/phrases';

interface TimerScreenProps {
  timeRemaining: number;
  userName: string;
  onSimulateEnd: () => void;
}

const TimerScreen: React.FC<TimerScreenProps> = ({ timeRemaining, userName, onSimulateEnd }) => {
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [phraseCategory, setPhraseCategory] = useState('');

  useEffect(() => {
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
      case 'curiosidade': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'humor': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'motivacional': return 'bg-green-50 border-green-200 text-green-800';
      case 'duploSentido': return 'bg-pink-50 border-pink-200 text-pink-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">⏳</div>
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Rolômetro Ativo
          </h2>

          <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-100">
            <div className="text-3xl font-mono font-bold mb-2 text-blue-600">
              {formatTime(timeRemaining)}
            </div>
            <p className="text-sm text-gray-600">tempo restante</p>
          </div>

          <Button
            onClick={onSimulateEnd}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <FastForward className="mr-2" size={18} />
            Simular últimos 10 segundos
          </Button>
        </div>

        {currentPhrase && (
          <div className={`rounded-2xl shadow-lg p-6 border-2 cursor-pointer transition-all duration-200 hover:shadow-xl ${getCategoryColor(phraseCategory)}`}
               onClick={showRandomPhrase}>
            <div className="text-3xl mb-3 text-center">
              {getCategoryEmoji(phraseCategory)}
            </div>
            <p className="text-lg font-medium leading-relaxed text-center">
              {currentPhrase}
            </p>
            <div className="mt-4 text-xs opacity-70 text-center">
              👆 Toque para ver outra frase
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="text-sm text-gray-600 space-y-2 text-center">
            <p>📊 Estamos medindo sua rolagem...</p>
            <p>🎯 Continue usando normalmente</p>
            {userName && <p>👋 Oi, {userName}!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerScreen;
