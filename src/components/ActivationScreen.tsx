
import React from 'react';
import { Timer, Zap } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white">
      <div className="text-center max-w-md mx-auto animate-scale-in">
        <div className="text-8xl mb-6 animate-bounce">⏰</div>
        
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
          {userName ? `E aí, ${userName}!` : 'Preparado(a)?'}
        </h2>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-8 border border-white/20">
          <p className="text-lg leading-relaxed font-medium">
            Você tem <span className="font-bold text-yellow-300">24h</span> pra viver normalmente. 
            Depois disso, vai descobrir quantos <span className="font-bold text-green-300">METROS</span> rolou na tela do celular.
          </p>
          
          <div className="mt-4 text-xl">
            <span className="animate-pulse">🤔</span> Topa?
          </div>
        </div>
        
        <Button
          onClick={onStartMeasurement}
          className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl text-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Zap className="mr-2" />
          Começar Medição
        </Button>
        
        <div className="mt-6 text-sm opacity-80">
          <p>⚡ O cronômetro vai começar agora!</p>
          <p>📱 Use o celular normalmente</p>
        </div>
      </div>
    </div>
  );
};

export default ActivationScreen;
