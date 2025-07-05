
import React from 'react';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ActivationScreenProps {
  userName: string;
  onStartMeasurement: () => void;
}

const ActivationScreen: React.FC<ActivationScreenProps> = ({
  userName,
  onStartMeasurement,
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-6">⏰</div>
          
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {userName ? `E aí, ${userName}!` : 'Preparado(a)?'}
          </h2>
          
          <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-100">
            <p className="text-lg leading-relaxed text-gray-700 font-medium">
              Você tem <span className="font-bold text-blue-600">24h</span> pra viver normalmente. 
              Depois disso, vai descobrir quantos <span className="font-bold text-green-600">METROS</span> rolou na tela do celular.
            </p>
            
            <div className="mt-4 text-xl">
              <span>🤔</span> Topa?
            </div>
          </div>
          
          <Button
            onClick={onStartMeasurement}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Zap className="mr-2" size={20} />
            Começar Medição
          </Button>
          
          <div className="mt-6 text-sm text-gray-500 space-y-1">
            <p>⚡ O cronômetro vai começar agora!</p>
            <p>📱 Use o celular normalmente</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivationScreen;
