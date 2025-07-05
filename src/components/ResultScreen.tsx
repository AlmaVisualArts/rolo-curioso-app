
import React from 'react';
import { Trophy, RotateCcw, Share2, TrendingUp, BarChart3, Eye, Zap, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollResult } from '../types/monitoring';
import { useTranslation } from 'react-i18next';
import i18n from '../lib/i18n';

interface ResultScreenProps {
  userName: string;
  scrollResult: ScrollResult | null;
  onMeasureAgain: () => void;
  onShare: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  userName,
  scrollResult,
  onMeasureAgain,
  onShare,
}) => {
  const { t } = useTranslation();
  // Valor simulado só é gerado uma vez
  const [simulatedMeters] = React.useState(() => Math.floor(Math.random() * (9000 - 3000 + 1)) + 3000);
  const metersRolled = (scrollResult && scrollResult.metersRolled && scrollResult.metersRolled >= 3000)
    ? scrollResult.metersRolled
    : simulatedMeters;

  // Generate multiple equivalences
  const getEquivalences = (meters: number) => {
    if (i18n.language.startsWith('en')) {
      return [
        {
          title: t('result.eq.christ'),
          value: Math.round(meters / 38),
          unit: t('result.eq.times'),
          emoji: '🗽',
        },
        {
          title: t('result.eq.eiffel'),
          value: Math.round(meters / 330),
          unit: t('result.eq.times'),
          emoji: '🗼',
        },
        {
          title: t('result.eq.soccer_field'),
          value: (meters / 105).toFixed(1),
          unit: t('result.eq.soccer_fields'),
          emoji: '🏟️',
        },
        {
          title: t('result.eq.olympic_pool'),
          value: (meters / 50).toFixed(1),
          unit: t('result.eq.pools'),
          emoji: '🏊‍♂️',
        },
      ];
    }
    return [
      {
        title: t('result.eq.christ'),
        value: Math.round(meters / 38),
        unit: t('result.eq.times'),
        emoji: '🗽',
      },
      {
        title: t('result.eq.eiffel'),
        value: Math.round(meters / 330),
        unit: t('result.eq.times'),
        emoji: '🗼',
      },
      {
        title: t('result.eq.maracana'),
        value: (meters / 110).toFixed(1),
        unit: t('result.eq.maracanas'),
        emoji: '🏟️',
      },
      {
        title: t('result.eq.olympic_pool'),
        value: (meters / 50).toFixed(1),
        unit: t('result.eq.pools'),
        emoji: '🏊‍♂️',
      },
    ];
  };

  const equivalences = getEquivalences(metersRolled);

  const getRanking = (meters: number) => {
    if (meters < 3000) return { rank: t('result.ranking.casual'), color: 'text-blue-600', medal: '🥉', rank_key: 'casual' };
    if (meters < 6000) return { rank: t('result.ranking.intermediario'), color: 'text-orange-500', medal: '🥈', rank_key: 'intermediario' };
    if (meters < 9000) return { rank: t('result.ranking.mestre'), color: 'text-yellow-500', medal: '🥇', rank_key: 'mestre' };
    return { rank: t('result.ranking.lenda'), color: 'text-purple-600', medal: '👑', rank_key: 'lenda' };
  };

  const ranking = scrollResult?.ranking || getRanking(metersRolled);
  const rankingData = typeof ranking === 'string' ? getRanking(metersRolled) : ranking;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-pink-50">
      {/* Blobs grandes e translúcidos para destaque visual */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl pointer-events-none select-none"></div>
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-pink-200 rounded-full opacity-15 blur-3xl pointer-events-none select-none"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-2 sm:p-3">
        <div className="w-full max-w-lg mx-auto flex flex-col items-center">
          {/* Emoji e título grande fora do card */}
          <style>
            {`
              @keyframes bounce-celebrate {
                0%, 100% { transform: translateY(0); }
                30% { transform: translateY(-12px); }
                50% { transform: translateY(-8px); }
                70% { transform: translateY(-12px); }
              }
              .animate-bounce-celebrate {
                animation: bounce-celebrate 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                display: inline-block;
              }
            `}
          </style>
          <div className="flex flex-col items-center mb-2 mt-4">
            <div className="text-4xl mb-1 animate-bounce-celebrate">🎉</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight text-center whitespace-nowrap">
              {userName ? t('result.title_with_name', { name: userName }) : t('result.title')}
            </h2>
          </div>

          {/* Card central suspenso com sombra colorida leve */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 text-center border border-white/20 w-full mb-2 mx-4 shadow-[0_4px_32px_0_rgba(59,130,246,0.08),0_1.5px_16px_0_rgba(168,85,247,0.07),0_0.5px_8px_0_rgba(236,72,153,0.07)] flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-extrabold text-5xl sm:text-6xl md:text-7xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg leading-none" style={{ letterSpacing: '-2px' }}>{metersRolled.toLocaleString()}</span>
                <span className="px-3 py-1 rounded-full bg-white/80 text-blue-600 text-lg font-bold shadow-sm border border-blue-100 ml-1">{t('result.meters')}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 mb-2">
                <span className={`inline-flex items-center space-x-1 bg-white rounded-full px-2 py-1 text-xs font-semibold shadow ${rankingData.color}`}> <span className="text-lg">{rankingData.medal}</span> <span>{rankingData.rank}</span> </span>
                <span className="text-gray-400 text-base">|</span>
                <span className="text-xs text-gray-700">{t('result.rolled_in_24h')}</span>
              </div>
            </div>
          </div>

          {/* Bloco de equivalências */}
          <div className="w-full mb-2">
            <h3 className="text-xs font-semibold text-gray-700 mb-1 flex items-center justify-center gap-1">
              <BarChart3 className="text-blue-500" size={12} />
              {t('result.equivalent_to')}
            </h3>
            <div className="grid grid-cols-2 gap-1">
              {equivalences.map((eq, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-1 border border-gray-100 flex flex-col items-center shadow min-h-[56px] justify-center h-[62px]">
                  <div className="flex items-center gap-1 text-xs font-bold text-gray-800 mb-0.5">
                    <span className="text-base">{eq.emoji}</span>
                    <span>{eq.value}</span>
                    <span className="text-[10px] text-gray-600">{eq.unit}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 text-center leading-tight px-1">{eq.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Novo design para média nacional */}
          <div className="flex flex-col items-center w-full mb-2">
            <div className="flex items-center gap-1 text-xs text-gray-600 border-b border-blue-100 pb-1 mb-1">
              <TrendingUp className="text-blue-400" size={12} />
              <span>{t('result.average_national_media')}</span>
              <span className="font-bold text-blue-700 ml-2">4.247 {t('result.meters')}</span>
            </div>
            {(() => {
              const percentage = Math.round((metersRolled / 4247 - 1) * 100);
              const isAbove = percentage >= 0;
              return (
                <div className={`text-xs font-medium ${isAbove ? 'text-green-600' : 'text-red-600'}`}>
                  {isAbove
                    ? t('result.percentage_above', { percentage: Math.abs(percentage) })
                    : t('result.percentage_below', { percentage: Math.abs(percentage) })}
                </div>
              );
            })()}
          </div>

          {/* Botão Share */}
          <div className="mb-2 w-full">
            <Button onClick={onShare} className="w-full bg-gradient-to-r from-blue-500 to-purple-400 hover:from-blue-600 hover:to-purple-500 text-white font-bold py-2 px-3 rounded-xl text-xs transition-all duration-300 shadow-[0_1px_4px_0_rgba(236,72,153,0.10)] hover:shadow-md transform hover:scale-105 animate-glow">
              <Share2 className="mr-2" size={12} />
              {t('result.share_result')}
            </Button>
          </div>

          {/* Botão Measure Again simples */}
          <div className="mb-1 w-full flex justify-center">
            <Button onClick={onMeasureAgain} className="bg-transparent text-blue-600 hover:text-blue-700 font-medium text-xs transition-colors duration-200">
              {t('result.measure_again')}
            </Button>
          </div>

          {/* Bloco de dica final */}
          <div className="mt-1 text-[10px] text-gray-500 w-full text-center">
            <p>{t('result.next_roll_hint')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
