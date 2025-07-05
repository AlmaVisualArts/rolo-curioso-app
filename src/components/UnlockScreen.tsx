
import React from 'react';
import { Lock, CreditCard, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UnlockScreenProps {
  onUnlock: () => void;
}

const UnlockScreen: React.FC<UnlockScreenProps> = ({ onUnlock }) => {
  const handlePayment = () => {
    // Simulate payment process
    alert('💳 Pagamento simulado com sucesso!\n🎉 Desbloqueando seu resultado...');
    setTimeout(() => {
      onUnlock();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white">
      <div className="text-center max-w-md mx-auto animate-scale-in">
        <div className="text-8xl mb-6 animate-bounce">🔓</div>
        
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
          Seu Rolômetro está pronto!
        </h2>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-8 border border-white/20">
          <div className="text-6xl mb-4">🎁</div>
          <p className="text-lg font-medium mb-4">
            Você pode desbloquear o resultado por apenas
          </p>
          <div className="text-4xl font-bold text-green-300 mb-2">
            R$ 5,00
          </div>
          <p className="text-sm opacity-80">
            Descubra quantos metros você rolou!
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-4 border border-blue-400/30">
            <div className="flex items-center justify-center space-x-2 text-blue-300">
              <Gift size={20} />
              <span className="font-medium">Resultado exclusivo</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-2xl p-4 border border-green-400/30">
            <div className="flex items-center justify-center space-x-2 text-green-300">
              <span className="text-xl">📊</span>
              <span className="font-medium">Comparação divertida</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-2xl p-4 border border-pink-400/30">
            <div className="flex items-center justify-center space-x-2 text-pink-300">
              <span className="text-xl">🏆</span>
              <span className="font-medium">Seu ranking pessoal</span>
            </div>
          </div>
        </div>
        
        <Button
          onClick={handlePayment}
          className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-2xl text-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl w-full"
        >
          <CreditCard className="mr-2" />
          Desbloquear por R$ 5,00
        </Button>
        
        <div className="mt-6 text-xs opacity-70">
          <p>💳 Pagamento 100% seguro</p>
          <p>⚡ Resultado instantâneo</p>
        </div>
      </div>
    </div>
  );
};

export default UnlockScreen;
