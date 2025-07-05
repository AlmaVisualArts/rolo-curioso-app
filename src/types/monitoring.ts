// Tipos principais para o resultado do scroll
export type ScrollResult = {
  metersRolled: number;
  ranking: string;
  patternLabel: string;
  insights: {
    percentageAboveAverage: number;
    // recommendation?: string; // removido pois não está mais em uso
  };
};

// Dados brutos do monitoramento
export type MonitoringData = {
  startTime: number;
  totalActiveMinutes: number;
  interactionCount: number;
  sessionCount: number;
  timeSlots: {
    morning: number;
    afternoon: number;
    evening: number;
    night: number;
  };
  lastUpdate: number;
}; 