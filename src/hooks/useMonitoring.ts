import React, { useState, useEffect, useCallback } from 'react';
import { MonitoringData, MonitoringStats } from '@/types/monitoring';
import { saveMonitoringData, loadMonitoringData, clearMonitoringData } from '@/utils/storage';

export const useMonitoring = () => {
  const [data, setData] = useState<MonitoringData | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [sessionStart, setSessionStart] = useState<number | null>(null);

  // Inicializar monitoramento
  const startMonitoring = useCallback(() => {
    const now = Date.now();
    const initialData: MonitoringData = {
      startTime: now,
      totalActiveMinutes: 0,
      interactionCount: 0,
      sessionCount: 1,
      timeSlots: {
        morning: 0,
        afternoon: 0,
        evening: 0,
        night: 0
      },
      lastUpdate: now
    };

    setData(initialData);
    setIsActive(true);
    setSessionStart(now);
    saveMonitoringData(initialData);
  }, []);

  // Carregar dados existentes
  const loadExistingData = useCallback(() => {
    const existingData = loadMonitoringData();
    if (existingData) {
      setData(existingData);
      setIsActive(true);
      setSessionStart(Date.now());
    }
  }, []);

  // Atualizar dados de monitoramento
  const updateData = useCallback((updates: Partial<MonitoringData>) => {
    setData(prevData => {
      if (!prevData) return null;
      
      const updatedData = { ...prevData, ...updates, lastUpdate: Date.now() };
      saveMonitoringData(updatedData);
      return updatedData;
    });
  }, []);

  // Incrementar interação
  const incrementInteraction = useCallback(() => {
    updateData({
      interactionCount: (data?.interactionCount || 0) + 1
    });
  }, [data?.interactionCount, updateData]);

  // Adicionar tempo ativo
  const addActiveTime = useCallback((minutes: number) => {
    if (!data) return;

    const now = new Date();
    const hour = now.getHours();
    let timeSlot: keyof MonitoringData['timeSlots'] = 'morning';

    if (hour >= 6 && hour < 12) timeSlot = 'morning';
    else if (hour >= 12 && hour < 18) timeSlot = 'afternoon';
    else if (hour >= 18 && hour < 22) timeSlot = 'evening';
    else timeSlot = 'night';

    updateData({
      totalActiveMinutes: data.totalActiveMinutes + minutes,
      timeSlots: {
        ...data.timeSlots,
        [timeSlot]: data.timeSlots[timeSlot] + minutes
      }
    });
  }, [data, updateData]);

  // Incrementar sessão
  const incrementSession = useCallback(() => {
    updateData({
      sessionCount: (data?.sessionCount || 0) + 1
    });
  }, [data?.sessionCount, updateData]);

  // Parar monitoramento
  const stopMonitoring = useCallback(() => {
    setIsActive(false);
    setSessionStart(null);
  }, []);

  // Limpar dados
  const clearData = useCallback(() => {
    clearMonitoringData();
    setData(null);
    setIsActive(false);
    setSessionStart(null);
  }, []);

  // Obter estatísticas atuais
  const getCurrentStats = useCallback((): MonitoringStats | null => {
    if (!data) return null;

    return {
      activeMinutes: data.totalActiveMinutes,
      interactions: data.interactionCount,
      sessions: data.sessionCount,
      pattern: getTimePattern(data.timeSlots),
      nightUsage: data.timeSlots.night
    };
  }, [data]);

  // Função auxiliar para determinar padrão temporal
  const getTimePattern = (timeSlots: MonitoringData['timeSlots']): MonitoringStats['pattern'] => {
    const { morning, afternoon, evening, night } = timeSlots;
    const max = Math.max(morning, afternoon, evening, night);
    
    if (max === morning) return 'morning';
    if (max === afternoon) return 'afternoon';
    if (max === evening) return 'evening';
    if (max === night) return 'night';
    return 'balanced';
  };

  // Monitorar visibilidade da página
  useEffect(() => {
    if (!isActive) return;

    let interval: number;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Página ficou inativa
        if (sessionStart) {
          const activeMinutes = Math.floor((Date.now() - sessionStart) / (1000 * 60));
          if (activeMinutes > 0) {
            addActiveTime(activeMinutes);
          }
          setSessionStart(null);
        }
      } else {
        // Página ficou ativa
        setSessionStart(Date.now());
        incrementSession();
      }
    };

    // Atualizar a cada 5 minutos quando ativo
    interval = setInterval(() => {
      if (!document.hidden && sessionStart) {
        const activeMinutes = Math.floor((Date.now() - sessionStart) / (1000 * 60));
        if (activeMinutes >= 5) {
          addActiveTime(5);
          setSessionStart(Date.now());
        }
      }
    }, 5 * 60 * 1000);

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isActive, sessionStart, addActiveTime, incrementSession]);

  // Monitorar interações
  useEffect(() => {
    if (!isActive) return;

    const handleInteraction = () => {
      incrementInteraction();
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [isActive, incrementInteraction]);

  return {
    data,
    isActive,
    startMonitoring,
    loadExistingData,
    stopMonitoring,
    clearData,
    getCurrentStats,
    incrementInteraction,
    addActiveTime,
    incrementSession
  };
}; 