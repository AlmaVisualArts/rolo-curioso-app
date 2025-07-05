
import React from 'react';
import { CreditCard, Gift } from 'lucide-react';
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
          <div className="text-6xl mb-6">🔓</div>
          
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Seu Rolômetro está pronto!
          </h2>
          
          <div className="bg-green-50 rounded-xl p-6 mb-8 border border-green-100">
            <div className="text-4xl mb-4">🎁</div>
            <p className="text-lg font-medium mb-4 text-gray-700">
              Você pode desbloquear o resultado por apenas
            </p>
            <div className="text-3xl font-bold text-green-600 mb-2">
              R$ 5,00
            </div>
            <p className="text-sm text-gray-600">
              Descubra quantos metros você rolou!
            </p>
          </div>

          <div className="space-y-3 mb-8">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center justify-center space-x-2 text-blue-700">
                <Gift size={18} />
                <span className="font-medium">Resultado exclusivo</span>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <span className="text-lg">📊</span>
                <span className="font-medium">Comparação divertida</span>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center justify-center space-x-2 text-purple-700">
                <span className="text-lg">🏆</span>
                <span className="font-medium">Seu ranking pessoal</span>
              </div>
            </div>
          </div>
          
          <Button
            onClick={handlePayment}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <CreditCard className="mr-2" size={20} />
            Desbloquear por R$ 5,00
          </Button>
          
          <div className="mt-6 text-xs text-gray-500 space-y-1">
            <p>💳 Pagamento 100% seguro</p>
            <p>⚡ Resultado instantâneo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockScreen;
