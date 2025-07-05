
import React, { useState } from 'react';
import { CreditCard, Gift, Clock, Eye, ShieldCheck, Trophy, TrendingUp, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';

interface UnlockScreenProps {
  onUnlock: () => void;
}

const UnlockScreen: React.FC<UnlockScreenProps> = ({ onUnlock }) => {
  const { t, i18n } = useTranslation();
  const [isPaying, setIsPaying] = useState(false);
  const { toast } = useToast();

  const handlePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      toast({
        title: t('unlock.payment_success'),
        description: "Pagamento processado com sucesso!",
        duration: 3000,
      });
      onUnlock();
    }, 1200);
  };

  // Preço dinâmico por idioma
  const price = i18n.language.startsWith('en') ? '€1' : 'R$ 4,95';
  const priceOnly = i18n.language.startsWith('en') ? 'only' : 'apenas';

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-pink-50">
      {/* Blobs grandes e translúcidos para destaque visual */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl pointer-events-none select-none"></div>
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-pink-200 rounded-full opacity-15 blur-3xl pointer-events-none select-none"></div>
      
      {/* Bolinhas pequenas animadas */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full animate-pulse-slow"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full animate-pulse-slow delay-1000"></div>
      <div className="absolute bottom-32 left-20 w-20 h-20 bg-pink-200 rounded-full animate-pulse-slow delay-2000"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-lg mx-auto flex flex-col items-center">
          {/* Emoji e título grande fora do card */}
          <style>
            {`
              @keyframes float-gift {
                0% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
                100% { transform: translateY(0); }
              }
              .animate-gift {
                animation: float-gift 3.5s ease-in-out infinite;
              }
            `}
          </style>
          <div className="flex flex-col items-center mb-4 mt-8">
            <div className="text-5xl mb-2 animate-gift">🎁</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight text-center whitespace-nowrap" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>{t('unlock.title')}</h2>
            <div className="text-gray-700 text-base mt-1 mb-2 text-center">{t('unlock.subtitle')}</div>
          </div>

          {/* Card central com sombra colorida leve */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 w-full mb-2 shadow-[0_4px_32px_0_rgba(59,130,246,0.08),0_1.5px_16px_0_rgba(168,85,247,0.07),0_0.5px_8px_0_rgba(236,72,153,0.07)]">
            {/* Cards de benefícios */}
            <div className="space-y-1 mb-4">
              <div className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-blue-700 font-semibold text-xs">{t('unlock.benefit1')}</div>
              <div className="rounded-xl border border-green-200 bg-green-50 px-3 py-1.5 text-green-700 font-semibold text-xs">{t('unlock.benefit2')}</div>
              <div className="rounded-xl border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-yellow-700 font-semibold text-xs">{t('unlock.benefit3')}</div>
            </div>
            {/* Preço */}
            <div className="flex flex-col items-center mb-1">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-2 flex flex-col items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-blue-700">{price}</span>
                  <span className="text-xs text-gray-500">{priceOnly}</span>
                </div>
              </div>
              <div className="flex items-center text-xs text-gray-600 mt-1 gap-1">
                <span className="text-sm" role="img" aria-label="escudo">🛡️</span> {t('unlock.payment_secure')}
              </div>
            </div>
          </div>

          {/* Botão destacado logo abaixo do card */}
          <Button
            className="w-full text-base font-bold py-3 shadow-md bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 mb-2 animate-pulse-button focus:animate-none"
            onClick={handlePayment}
            disabled={isPaying}
          >
            {isPaying ? t('unlock.processing') : t('unlock.button')}
          </Button>

          {/* Texto menor e garantias fora do card */}
          <div className="flex flex-col items-center w-full">
            <div className="bg-white/70 border-2 border-blue-300 rounded-2xl px-3 py-2 shadow-lg max-w-xs w-full text-center mb-2">
              <div className="text-blue-700 font-semibold text-xs mb-1">{t('unlock.one_time_payment')}</div>
              <div className="text-blue-900 text-xs mb-1">{t('unlock.pay_once_use_anytime')}</div>
              <div className="text-blue-600 text-xs font-medium mt-1">{t('unlock.lifetime_access')}</div>
            </div>
            <div className="flex justify-center gap-3 mt-2 mb-1 text-xs">
              <div className="flex items-center gap-1 text-gray-500 bg-white/60 rounded-full px-2 py-1 shadow-sm">
                <span className="text-sm" role="img" aria-label="relógio">⏱️</span>
                <span className="text-xs">{t('unlock.instant_result')}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 bg-white/60 rounded-full px-2 py-1 shadow-sm">
                <span className="text-sm" role="img" aria-label="satisfação">😃</span>
                <span className="text-xs">{t('unlock.satisfaction_guaranteed')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockScreen;
