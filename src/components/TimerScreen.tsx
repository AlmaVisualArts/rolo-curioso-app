
import React, { useState, useEffect } from 'react';
import { Clock, FastForward, Activity, TrendingUp, Eye, Zap, Target, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { phrases } from '../data/phrases';
import { MonitoringData } from '../types/monitoring';
import { useTranslation } from 'react-i18next';
import i18n from '../lib/i18n';

interface TimerScreenProps {
  timeRemaining: number;
  userName: string;
  monitoringData: MonitoringData | null;
  onSimulateEnd: () => void;
}

const TimerScreen: React.FC<TimerScreenProps> = ({ timeRemaining, userName, monitoringData, onSimulateEnd }) => {
  const { t } = useTranslation();
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [phraseCategory, setPhraseCategory] = useState('');
  const [isPhraseAnimating, setIsPhraseAnimating] = useState(false);

  useEffect(() => {
    showRandomPhrase();
  }, []);

  const showRandomPhrase = () => {
    setIsPhraseAnimating(true);
    setTimeout(() => {
      const lang = i18n.language.startsWith('en') ? 'en' : 'pt';
      const categories = Object.keys(phrases[lang]) as Array<keyof typeof phrases[typeof lang]>;
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const categoryPhrases = phrases[lang][randomCategory];
    const randomPhrase = categoryPhrases[Math.floor(Math.random() * categoryPhrases.length)];
    setCurrentPhrase(randomPhrase);
    setPhraseCategory(randomCategory);
      setIsPhraseAnimating(false);
    }, 300);
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

  const getProgressPercentage = () => {
    const total = 24 * 60 * 60 * 1000;
    const elapsed = total - timeRemaining;
    return Math.min((elapsed / total) * 100, 100);
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return { text: 'Bom dia', emoji: '🌅' };
    if (hour >= 12 && hour < 18) return { text: 'Boa tarde', emoji: '☀️' };
    if (hour >= 18 && hour < 22) return { text: 'Boa noite', emoji: '🌆' };
    return { text: 'Boa madrugada', emoji: '🌙' };
  };

  const timeOfDay = getTimeOfDay();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Enhanced Background Elements - agora mais sutis, lentas e variadas */}
      <style>
        {`
          .pulse-slow {
            animation: pulse 12s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          .pulse-slower {
            animation: pulse 15s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          .pulse-slowest {
            animation: pulse 18s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}
      </style>
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Bolinha 1 - azul */}
        <div className="absolute top-10 left-8 w-32 h-32 bg-blue-100 rounded-full opacity-5 pulse-slow"></div>
        {/* Bolinha 2 - roxo */}
        <div className="absolute top-1/3 right-10 w-20 h-20 bg-purple-100 rounded-full opacity-8 pulse-slower"></div>
        {/* Bolinha 3 - rosa */}
        <div className="absolute bottom-24 left-1/4 w-40 h-40 bg-pink-100 rounded-full opacity-5 pulse-slowest"></div>
        {/* Bolinha 4 - azul mais escuro */}
        <div className="absolute bottom-10 right-1/5 w-16 h-16 bg-blue-100 rounded-full opacity-5 pulse-slower"></div>
        {/* Bolinha 5 - roxo mais escuro */}
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-100 rounded-full opacity-5 pulse-slow"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-3">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          {/* Título grande fora do card */}
          <style>
            {`
              @keyframes swing-hourglass {
                0% { transform: rotate(-10deg); }
                50% { transform: rotate(10deg); }
                100% { transform: rotate(-10deg); }
              }
              .animate-swing-hourglass {
                animation: swing-hourglass 3.5s ease-in-out infinite;
                display: inline-block;
              }
            `}
          </style>
          <div className="flex flex-col items-center mb-1">
            <span className="text-3xl mb-1 animate-swing-hourglass">⏳</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight text-center whitespace-nowrap">{t('timer.title')}</h2>
          </div>

          {/* Card central com progresso e cronômetro */}
          <div className="bg-white rounded-2xl shadow p-4 text-center flex flex-col items-center gap-3 border border-gray-100 w-full mb-3">
            {/* Barra de Progresso */}
            <div className="w-full flex flex-col gap-0.5">
              <div className="flex justify-between text-xs text-gray-500 mb-0">
                <span className="flex items-center gap-1"><Target size={10} />{t('timer.progress')}</span>
                <span className="font-semibold">{getProgressPercentage().toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden border border-blue-100">
                <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700" style={{ width: `${getProgressPercentage()}%` }}></div>
              </div>
            </div>
            <div className="text-[10px] text-gray-400">h de 24h completadas</div>
            {/* Cronômetro */}
            <div className={`w-full bg-blue-50 rounded-xl p-1 flex flex-col items-center gap-0.5 border border-blue-100 ${timeRemaining <= 5000 ? 'animate-countdown-final' : ''}`}>
              <div className="text-xl sm:text-2xl font-extrabold font-mono mb-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight">{formatTime(timeRemaining)}</div>
              <div className="text-xs text-gray-600 font-semibold">{t('timer.time_remaining_text')}</div>
            </div>
          </div>

          {/* Botão destacado logo abaixo do card */}
          <Button
            onClick={onSimulateEnd}
            className="w-full h-10 mb-2 bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white font-semibold text-sm rounded-lg shadow-sm flex items-center justify-center gap-1 px-4 py-1"
          >
            <FastForward size={16} />
            {t('timer.simulate_last_5_seconds')}
          </Button>

          {/* Texto menor fora do card */}
          <div className="text-xs text-gray-500 mb-4 text-center flex items-center gap-1">
            <span role="img" aria-label="alvo">🎯</span> {t('timer.app_close_message')}
          </div>

          {/* Card de Frases */}
          {currentPhrase && (
            <div 
              className={`w-full rounded-2xl shadow p-2 border cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-105 max-h-32 overflow-y-auto ${getCategoryColor(phraseCategory)} ${
                isPhraseAnimating ? 'animate-pulse' : ''
              }`} 
              onClick={showRandomPhrase}
            >
              <div className="text-lg mb-1 text-center animate-bounce">{getCategoryEmoji(phraseCategory)}</div>
              <p className="text-xs font-medium leading-relaxed text-center mb-1">{currentPhrase}</p>
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 text-[10px] opacity-70 bg-white/50 rounded-full px-2 py-0.5">
                  <span>👆</span>
                  <span>{t('timer.tap_for_another_phrase')}</span>
                </div>
              </div>
            </div>
          )}

          {/* Status Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-3 border border-white/20 mt-3 w-full"> 
            <div className="flex items-center space-x-2 mb-2"> 
              <Eye className="text-green-600" size={16} /> 
              <h3 className="text-sm font-semibold text-gray-800">{t('timer.monitoring_status')}</h3> 
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-2 text-xs text-gray-600"> 
              <div className="flex items-center gap-3"> 
                <span role="img" aria-label="gráfico">📊</span>
                {t('timer.measuring_scroll')}
              </div>
              <div className="flex items-center gap-3"> 
                <span role="img" aria-label="dados">📡</span>
                {t('timer.collecting_data')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerScreen;
