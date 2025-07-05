
import React from 'react';
import { Trophy, RotateCcw, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultScreenProps {
  userName: string;
  onMeasureAgain: () => void;
  onShare: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  userName,
  onMeasureAgain,
  onShare,
}) => {
  // Generate a random result between 1000-8000 meters
  const metersRolled = Math.floor(Math.random() * 7000) + 1000;
  
  // Generate fun comparisons
  const getComparison = (meters: number) => {
    if (meters < 2000) {
      return {
        text: "Isso equivale a quase 3 quadras de futebol!",
        emoji: "⚽"
      };
    } else if (meters < 4000) {
      return {
        text: "Você rolou mais que a altura do Cristo Redentor... 85 vezes!",
        emoji: "🗽"
      };
    } else if (meters < 6000) {
      return {
        text: "Daria pra atravessar uns 6 campos de futebol!",
        emoji: "🏈"
      };
    } else {
      return {
        text: "Você rolou mais que a Torre Eiffel deitada... 2 vezes e meia!",
        emoji: "🗼"
      };
    }
  };

  const comparison = getComparison(metersRolled);

  const getRanking = (meters: number) => {
    if (meters < 2000) return { rank: "Iniciante Digital", color: "text-blue-300", medal: "🥉" };
    if (meters < 4000) return { rank: "Scrollador Intermediário", color: "text-yellow-300", medal: "🥈" };
    if (meters < 6000) return { rank: "Mestre do Scroll", color: "text-orange-300", medal: "🥇" };
    return { rank: "Lenda da Rolagem", color: "text-purple-300", medal: "👑" };
  };

  const ranking = getRanking(metersRolled);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white">
      <div className="text-center max-w-md mx-auto animate-fade-in">
        <div className="text-8xl mb-6 animate-bounce">🎉</div>
        
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
          {userName ? `${userName}, seu resultado:` : 'Seu resultado chegou!'}
        </h2>

        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-8 mb-6 border border-purple-400/30">
          <div className="text-6xl font-bold text-yellow-300 mb-2">
            {metersRolled.toLocaleString()}
          </div>
          <div className="text-2xl font-bold mb-4">
            METROS ROLADOS! 📏
          </div>
          
          <div className="bg-white/10 rounded-2xl p-4 mb-4">
            <div className="text-2xl mb-2">{comparison.emoji}</div>
            <p className="text-lg font-medium">
              {comparison.text}
            </p>
          </div>

          <div className="bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-2xl p-4 border border-orange-400/30">
            <div className="text-3xl mb-2">{ranking.medal}</div>
            <div className={`text-xl font-bold ${ranking.color}`}>
              {ranking.rank}
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm opacity-80">Média nacional</div>
              <div className="text-lg font-bold">2.847m</div>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-sm opacity-80">Seu ranking</div>
              <div className="text-lg font-bold">
                {metersRolled > 2847 ? 'Acima' : 'Abaixo'}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={onShare}
            className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-2xl text-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl w-full"
          >
            <Share className="mr-2" />
            Compartilhar Resultado
          </Button>

          <Button
            onClick={onMeasureAgain}
            className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-2xl text-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl w-full"
          >
            <RotateCcw className="mr-2" />
            Medir de Novo
          </Button>
        </div>

        <div className="mt-6 text-xs opacity-70">
          <p>🎯 Que tal tentar rolar menos na próxima?</p>
          <p>📱 Ou será que consegue rolar mais? 😏</p>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
