import { MonitoringData, ScrollResult } from '@/types/monitoring';

const AVERAGE_NATIONAL = 4247; // metros

// Validação de dados de entrada
const validateMonitoringData = (data: MonitoringData): boolean => {
  if (!data || typeof data !== 'object') return false;
  if (typeof data.totalActiveMinutes !== 'number' || data.totalActiveMinutes < 0) return false;
  if (typeof data.interactionCount !== 'number' || data.interactionCount < 0) return false;
  if (typeof data.sessionCount !== 'number' || data.sessionCount < 0) return false;
  if (!data.timeSlots || typeof data.timeSlots !== 'object') return false;
  
  const requiredTimeSlots = ['morning', 'afternoon', 'evening', 'night'];
  for (const slot of requiredTimeSlots) {
    if (typeof data.timeSlots[slot as keyof typeof data.timeSlots] !== 'number' || 
        data.timeSlots[slot as keyof typeof data.timeSlots] < 0) {
      return false;
    }
  }
  
  return true;
};

export const calculateScrollMeters = (data: MonitoringData): number => {
  // Validar dados de entrada
  if (!validateMonitoringData(data)) {
    console.warn('Dados de monitoramento inválidos, usando valores padrão');
    return 5000; // Valor padrão seguro
  }

  const { totalActiveMinutes, interactionCount } = data;
  
  // Taxa base: 0.5 metros por minuto ativo
  const baseScrollRate = 0.5;
  const baseMeters = totalActiveMinutes * baseScrollRate;
  
  // Multiplicador de interações (0.5 a 2.0)
  const interactionMultiplier = Math.min(Math.max(interactionCount / 100, 0.5), 2.0);
  
  // Variação natural (±15%)
  const variation = 0.85 + (Math.random() * 0.3);
  
  const totalMeters = Math.floor(baseMeters * interactionMultiplier * variation);
  
  // Limites realistas: 1.000 a 20.000 metros
  return Math.max(1000, Math.min(20000, totalMeters));
};

export const getTimePattern = (timeSlots: MonitoringData['timeSlots']): string => {
  const { morning, afternoon, evening, night } = timeSlots;
  const max = Math.max(morning, afternoon, evening, night);
  
  if (max === morning) return 'morning';
  if (max === afternoon) return 'afternoon';
  if (max === evening) return 'evening';
  if (max === night) return 'night';
  return 'balanced';
};

export const getRanking = (meters: number): string => {
  if (meters < 9000) return "Scrollador Casual";
  if (meters < 11000) return "Rolador Intermediário";
  if (meters < 13000) return "Mestre do Scroll";
  return "Lenda da Rolagem";
};

export const getInsights = (data: MonitoringData, meters: number) => {
  const pattern = getTimePattern(data.timeSlots);
  const nightUsage = data.timeSlots.night;
  const percentageAboveAverage = Math.round((meters / AVERAGE_NATIONAL - 1) * 100);
  
  let patternDescription = '';
  let recommendation = '';
  
  switch (pattern) {
    case 'night':
      patternDescription = 'Night Scroller (rolador noturno)';
      recommendation = 'Evite telas 1h antes de dormir para melhorar o sono';
      break;
    case 'morning':
      patternDescription = 'Early Bird (madrugador digital)';
      recommendation = 'Ótimo horário! Considere fazer exercícios pela manhã';
      break;
    case 'afternoon':
      patternDescription = 'Afternoon Scroller (rolador da tarde)';
      recommendation = 'Período produtivo! Faça pausas regulares';
      break;
    case 'evening':
      patternDescription = 'Evening Scroller (rolador da noite)';
      recommendation = 'Hora de relaxar! Reduza o uso gradualmente';
      break;
    default:
      patternDescription = 'Usuário equilibrado';
      recommendation = 'Mantenha o equilíbrio! Faça pausas regulares';
  }
  
  if (nightUsage > 60) {
    recommendation = 'Uso noturno alto detectado. Evite telas 1h antes de dormir';
  }
  
  return {
    pattern: patternDescription,
    recommendation,
    percentageAboveAverage
  };
};

export const generateScrollResult = (data: MonitoringData): ScrollResult => {
  const metersRolled = calculateScrollMeters(data);
  const ranking = getRanking(metersRolled);
  const insights = getInsights(data, metersRolled);
  
  return {
    metersRolled,
    ranking,
    patternLabel: insights.pattern,
    insights: {
      percentageAboveAverage: insights.percentageAboveAverage
    }
  };
}; 