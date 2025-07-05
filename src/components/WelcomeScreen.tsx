
import React from 'react';
import { Smartphone, TrendingUp } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white">
      <div className="text-center max-w-md mx-auto animate-fade-in">
        <div className="mb-8 relative">
          <div className="text-8xl mb-4 animate-pulse">📱</div>
          <div className="absolute -top-2 -right-2 text-4xl animate-bounce">📏</div>
        </div>
        
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
          Rolômetro
        </h1>
        
        <p className="text-xl mb-8 leading-relaxed font-medium">
          Descubra quantos metros você rolou na tela do celular nas próximas 24h.
        </p>
        
        <div className="space-y-4 mb-8">
          <Input
            type="text"
            placeholder="Seu nome (opcional)"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="bg-white/20 border-white/30 text-white placeholder-white/70 text-lg p-4 rounded-2xl backdrop-blur-sm"
          />
        </div>
        
        <Button
          onClick={onStart}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-2xl text-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Smartphone className="mr-2" />
          Começar meu Rolômetro
        </Button>
        
        <div className="mt-8 text-sm opacity-80">
          <p>🎯 Prepare-se para uma surpresa!</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
