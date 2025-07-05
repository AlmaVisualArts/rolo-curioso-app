
import React from 'react';
import { Trophy, RotateCcw, Share2 } from 'lucide-react';
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
  // Generate a random result between 8000-15000 meters for more impact
  const metersRolled = Math.floor(Math.random() * 7000) + 8000;
  
  // Generate multiple equivalences
  const getEquivalences = (meters: number) => {
    return [
      {
        title: "Campos de futebol",
        value: Math.round(meters / 105),
        unit: "campos",
        emoji: "⚽"
      },
      {
        title: "Altura do Cristo Redentor",
        value: Math.round(meters / 38),
        unit: "vezes",
        emoji: "🗽"
      },
      {
        title: "Quadras da cidade",
        value: Math.round(meters / 100),
        unit: "quadras",
        emoji: "🏙️"
      },
      {
        title: "Altura da Torre Eiffel",
        value: Math.round(meters / 330),
        unit: "vezes",
        emoji: "🗼"
      }
    ];
  };

  const equivalences = getEquivalences(metersRolled);

  const getRanking = (meters: number) => {
    if (meters < 9000) return { rank: "Scrollador Casual", color: "text-blue-600", medal: "🥉" };
    if (meters < 11000) return { rank: "Rolador Intermediário", color: "text-orange-500", medal: "🥈" };
    if (meters < 13000) return { rank: "Mestre do Scroll", color: "text-yellow-500", medal: "🥇" };
    return { rank: "Lenda da Rolagem", color: "text-purple-600", medal: "👑" };
  };

  const ranking = getRanking(metersRolled);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-6">🎉</div>
          
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            {userName ? `${userName}, seu resultado:` : 'Seu resultado chegou!'}
          </h2>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-100">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {metersRolled.toLocaleString()} metros
            </div>
            <div className="text-lg text-gray-600 mb-4">
              rolados em 24 horas! 📏
            </div>
            
            <div className={`inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 ${ranking.color}`}>
              <span className="text-2xl">{ranking.medal}</span>
              <span className="font-semibold">{ranking.rank}</span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Isso equivale a:</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {equivalences.map((eq, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="text-2xl mb-1">{eq.emoji}</div>
                  <div className="text-xl font-bold text-gray-800">{eq.value}</div>
                  <div className="text-sm text-gray-600">{eq.unit}</div>
                  <div className="text-xs text-gray-500 mt-1">{eq.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-4 mb-6 border border-yellow-100">
            <div className="text-sm text-gray-600 mb-1">📊 Média nacional</div>
            <div className="text-lg font-bold text-gray-800">4.247 metros</div>
            <div className="text-sm text-green-600 font-medium">
              Você rolou {Math.round((metersRolled / 4247 - 1) * 100)}% acima da média!
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={onShare}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Share2 className="mr-2" size={18} />
              Compartilhar Resultado
            </Button>

            <Button
              onClick={onMeasureAgain}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <RotateCcw className="mr-2" size={18} />
              Medir Novamente
            </Button>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            <p>🎯 Consegue rolar menos na próxima? 😏</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
