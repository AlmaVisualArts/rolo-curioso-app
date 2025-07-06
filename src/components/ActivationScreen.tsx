
import React, { useState } from 'react';
import { Zap, Clock, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation, Trans } from 'react-i18next';

interface ActivationScreenProps {
  userName: string;
  onStartMeasurement: () => void;
}

const ActivationScreen: React.FC<ActivationScreenProps> = ({
  userName,
  onStartMeasurement,
}) => {
  const { t } = useTranslation();
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    setIsStarting(true);
    setTimeout(() => {
      onStartMeasurement();
    }, 800);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full animate-pulse-slow delay-1000"></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-pink-200 rounded-full animate-pulse-slow delay-2000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-lg mx-auto">
          {/* Topo visual com ícone e título grande */}
          <style>
            {`
              @keyframes swing-clock {
                0% { transform: rotate(-10deg); }
                50% { transform: rotate(10deg); }
                100% { transform: rotate(-10deg); }
              }
              .animate-swing-clock {
                animation: swing-clock 2.5s ease-in-out infinite;
                display: inline-block;
              }
            `}
          </style>
          <div className="flex flex-col items-center mt-4 mb-3">
            <div className="relative mb-1">
              <span className="text-4xl animate-swing-clock">⏰</span> {/* Tamanho reduzido */}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {userName ? t('activation.title_with_name', { name: userName }) : t('activation.title')}
            </h1>
            {/* Removido o parágrafo de preparação */}
            {/* Mantido apenas o bloco de instrução principal já presente abaixo */}
          </div>
          
          {/* Card central reduzido */}
          <div className="bg-white/90 rounded-2xl shadow-xl p-4 sm:p-5 max-w-md mx-auto mb-4"> {/* Padding reduzido */}
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-1">🎯</div> {/* Tamanho reduzido */}
              <div className="text-center text-sm sm:text-base font-medium text-gray-800 mb-3"> {/* Tamanho reduzido */}
                <Trans
                  i18nKey="activation.instruction"
                  components={{
                    strong1: <span className="text-green-600 font-bold" />,
                    strong2: <span className="text-blue-700 font-bold" />
                  }}
                />
              </div>
              <div className="flex gap-2 mb-2">
                <div className="bg-green-50 border border-green-100 rounded-xl px-2 py-1 flex flex-col items-center w-24"> {/* Tamanho reduzido */}
                  <span className="text-base text-green-600 mb-1"><Clock size={16} /></span> {/* Tamanho reduzido */}
                  <span className="text-xs font-semibold text-gray-700">{t('activation.card1.title')}</span>
                  <span className="text-[10px] text-gray-500">{t('activation.card1.desc')}</span>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-2 py-1 flex flex-col items-center w-24"> {/* Tamanho reduzido */}
                  <span className="text-base text-blue-600 mb-1"><TrendingUp size={16} /></span> {/* Tamanho reduzido */}
                  <span className="text-xs font-semibold text-gray-700">{t('activation.card2.title')}</span>
                  <span className="text-[10px] text-gray-500">{t('activation.card2.desc')}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Botão de ação destacado */}
          <div className="flex justify-center mb-4"> {/* Margin reduzido */}
            <Button className="w-full max-w-xs text-lg font-bold py-3 shadow-md bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 animate-glow" onClick={handleStart} disabled={isStarting}> {/* Adicionada animação glow */}
              {t('activation.start_button')}
          </Button>
          </div>

          {/* Card de privacidade */}
          <div className="bg-white/90 rounded-2xl shadow p-3 max-w-md mx-auto mb-3"> {/* Padding e margin reduzidos */}
            <div className="flex items-center mb-2">
              <span className="text-green-600 text-lg mr-2">🛡️</span> {/* Tamanho reduzido */}
              <span className="font-semibold text-gray-800">{t('activation.privacy.title')}</span>
            </div>
            <ul className="text-sm text-gray-700 pl-2 space-y-1">
              <li className="flex items-center"><span className="text-blue-400 mr-2">🔒</span> {t('activation.privacy.item1')}</li> {/* Emoji alterado */}
              <li className="flex items-center"><span className="text-purple-500 mr-2">⏱️</span> {t('activation.privacy.item2')}</li>
            </ul>
          </div>

          {/* Rodapé de status */}
          <div className="flex flex-col items-center text-xs text-gray-500 mt-1 mb-2"> {/* Margin reduzido */}
            <div className="flex items-center space-x-3 mb-1">
              <span className="flex items-center space-x-1"><span className="text-base">⚡</span><span>{t('activation.status.active')}</span></span>
              <span className="text-xs">•</span>
              <span className="flex items-center space-x-1"><span className="text-base">📈</span><span>{t('activation.status.realtime')}</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivationScreen;
