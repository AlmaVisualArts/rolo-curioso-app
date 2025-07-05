
import React from 'react';
import { Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">📱</div>
            <div className="absolute -top-2 -right-2 text-3xl">📏</div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Rolômetro
          </h1>
          
          <p className="text-lg mb-8 text-gray-600 leading-relaxed">
            Descubra quantos metros você rolou na tela do celular nas próximas 24h.
          </p>
          
          <div className="space-y-4 mb-8">
            <Input
              type="text"
              placeholder="Seu nome (opcional)"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="text-center text-lg p-4 border-2 border-gray-200 rounded-xl focus:border-blue-400 transition-colors"
            />
          </div>
          
          <Button
            onClick={onStart}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Smartphone className="mr-2" size={20} />
            Começar meu Rolômetro
          </Button>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>🎯 Prepare-se para uma surpresa!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
