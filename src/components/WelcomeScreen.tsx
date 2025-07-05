
import React, { useState, useEffect } from 'react';
import { Smartphone, TrendingUp, Clock, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

interface WelcomeScreenProps {
  userName: string;
  setUserName: (name: string) => void;
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  userName,
  setUserName,
  onStart,
}) => {
  const { t } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    { icon: "📱", title: t('welcome.feature1.title'), desc: t('welcome.feature1.desc') },
    { icon: "🎯", title: t('welcome.feature2.title'), desc: t('welcome.feature2.desc') },
    { icon: "💡", title: t('welcome.feature3.title'), desc: t('welcome.feature3.desc') }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features]);

  const handleStart = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onStart();
    }, 500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full animate-pulse-slow delay-1000"></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-pink-200 rounded-full animate-pulse-slow delay-2000"></div>
          </div>
          
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-lg mx-auto">
          {/* Header Section */}
          <style>
            {`
              @keyframes float-emoji {
                0% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
                100% { transform: translateY(0); }
              }
              .animate-float-emoji {
                animation: float-emoji 6s ease-in-out infinite;
              }
            `}
          </style>
          <div className="text-center mb-4 mt-4">
            <div className="mb-2 flex justify-center">
              <div className="text-6xl animate-float-emoji">📱</div> {/* Tamanho reduzido */}
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold mb-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('welcome.title')}
          </h1>
            <p className="text-base sm:text-xl text-gray-700 leading-relaxed max-w-md mx-auto">
              {t('welcome.description')}
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 mb-4 shadow-xl border border-white/20">
            <div className="text-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">👋 {t('welcome.name_title')}</h3>
              <p className="text-xs text-gray-600">{t('welcome.name_hint')}</p>
            </div>
            <Input
              type="text"
              placeholder={t('welcome.name_placeholder')}
              value={userName}
              onChange={(e) => {
                const value = e.target.value;
                // Sanitizar entrada: apenas letras, números, espaços e caracteres especiais comuns
                const sanitized = value.replace(/[^\w\sàáâãäåçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ]/g, '');
                setUserName(sanitized);
              }}
              maxLength={50}
              className="text-center text-base p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/50"
            />
          </div>
          
          {/* CTA Button */}
          <Button
            onClick={handleStart}
            disabled={isAnimating}
            className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 animate-glow ${
              isAnimating ? 'animate-pulse' : ''
            }`}
          >
            <Zap className="mr-2" size={20} />
            {isAnimating ? t('welcome.starting') : t('welcome.start_button')}
            <ArrowRight className="ml-2" size={18} />
          </Button>
          
          {/* Espaço extra entre botão e cards */}
          <div className="h-3 sm:h-4"></div>

          {/* Pequenos boxes horizontais substituindo os cards */}
          <div className="flex flex-row gap-2 justify-center mb-2">
            <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-white/20 min-w-[70px]">
              <span className="text-lg mb-0.5">⏰</span>
              <span className="text-xs font-bold text-gray-800">{t('welcome.time_label')}</span>
            </div>
            <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-white/20 min-w-[70px]">
              <span className="text-lg mb-0.5">📊</span>
              <span className="text-xs font-bold text-gray-800">{t('welcome.data_label')}</span>
            </div>
            <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-white/20 min-w-[70px]">
              <span className="text-lg mb-0.5">🎯</span>
              <span className="text-xs font-bold text-gray-800">{t('welcome.insights_label')}</span>
            </div>
          </div>

          {/* Indicadores e mensagem de privacidade */}
          <div className="flex flex-col items-center justify-center mt-4 mb-2">
            <div className="flex items-center space-x-3 text-gray-700 text-sm font-medium mb-1">
              <span className="flex items-center space-x-1">
                <span className="text-base">📈</span>
                <span>{t('welcome.real_data_label')}</span>
              </span>
              <span className="text-xs">•</span>
              <span className="flex items-center space-x-1">
                <span className="text-base">⏰</span>
                <span>{t('welcome.full_24h_label')}</span>
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1 text-center w-full">
              {t('welcome.privacy_message')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
