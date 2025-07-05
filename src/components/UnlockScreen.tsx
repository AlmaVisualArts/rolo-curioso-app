
import React from 'react';
import { CreditCard, Gift, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UnlockScreenProps {
  onUnlock: () => void;
}

const UnlockScreen: React.FC<UnlockScreenProps> = ({ onUnlock }) => {
  const handlePayment = () => {
    alert('💳 Pagamento simulado com sucesso!\n🎉 Desbloqueando seu resultado...');
    setTimeout(() => {
      onUnlock();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-6">🎯</div>
          
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Resultado Pronto!
          </h2>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            Sua medição de 24h foi concluída e o resultado está aqui... 
            <span className="font-semibold">você não vai acreditar no número!</span>
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-100">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Eye className="text-blue-600" size={24} />
              <span className="text-lg font-semibold text-gray-700">O que você vai descobrir:</span>
            </div>
            
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Quantos metros você rolou</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">Equivalências surpreendentes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Seu ranking exclusivo</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-100">
            <p className="text-sm text-gray-600 mb-2">
              Desbloqueie por um valor simbólico de apenas
            </p>
            <div className="text-2xl font-bold text-green-600">
              R$ 4,95
            </div>
          </div>
          
          <Button
            onClick={handlePayment}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <CreditCard className="mr-2" size={20} />
            Desbloquear por R$ 4,95
          </Button>
          
          <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock size={12} />
              <span>Resultado instantâneo</span>
            </div>
            <div className="flex items-center space-x-1">
              <Gift size={12} />
              <span>Pagamento seguro</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockScreen;
