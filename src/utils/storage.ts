import { MonitoringData } from '@/types/monitoring';

const STORAGE_KEY = 'rolometro_monitoring_data';

// Logger simples que não expõe erros em produção
const logger = {
  error: (message: string, error?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(message, error);
    }
    // Em produção, você pode enviar para um serviço de monitoramento
    // como Sentry, LogRocket, etc.
  }
};

export const saveMonitoringData = (data: MonitoringData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    logger.error('Erro ao salvar dados de monitoramento:', error);
  }
};

export const loadMonitoringData = (): MonitoringData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    logger.error('Erro ao carregar dados de monitoramento:', error);
    return null;
  }
};

export const clearMonitoringData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    logger.error('Erro ao limpar dados de monitoramento:', error);
  }
};

export const isMonitoringActive = (): boolean => {
  const data = loadMonitoringData();
  if (!data) return false;
  
  // Verifica se o monitoramento começou há menos de 24h
  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;
  
  return (now - data.startTime) < twentyFourHours;
}; 