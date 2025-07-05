
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useMonitoring } from '../hooks/useMonitoring';
import { generateScrollResult } from '../utils/calculations';
import { ScrollResult } from '../types/monitoring';
import { useTranslation } from 'react-i18next';

// Lazy load components
const WelcomeScreen = lazy(() => import('../components/WelcomeScreen'));
const ActivationScreen = lazy(() => import('../components/ActivationScreen'));
const TimerScreen = lazy(() => import('../components/TimerScreen'));
const UnlockScreen = lazy(() => import('../components/UnlockScreen'));
const ResultScreen = lazy(() => import('../components/ResultScreen'));

export type AppScreen = 'welcome' | 'activation' | 'timer' | 'unlock' | 'result';

interface IndexProps {
  onScreenChange?: (screen: string) => void;
}

const Index = ({ onScreenChange }: IndexProps) => {
  const { i18n } = useTranslation();
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');
  const [userName, setUserName] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(24 * 60 * 60 * 1000); // 24 hours in milliseconds
  const [scrollResult, setScrollResult] = useState<ScrollResult | null>(null);
  
  const {
    data: monitoringData,
    isActive: isMonitoringActive,
    startMonitoring,
    loadExistingData,
    clearData: clearMonitoringData
  } = useMonitoring();

  const navigateToScreen = (screen: AppScreen) => {
    setCurrentScreen(screen);
    if (onScreenChange) onScreenChange(screen);
  };

  const startTimer = () => {
    const now = Date.now();
    setStartTime(now);
    startMonitoring();
    setCurrentScreen('timer');
  };

  const simulateLastSeconds = () => {
    const now = Date.now();
    setStartTime(now - (24 * 60 * 60 * 1000) + 5000); // Set to 5 seconds remaining
    setTimeRemaining(5000);
  };

  const resetApp = () => {
    setCurrentScreen('welcome');
    setUserName('');
    setStartTime(null);
    setTimeRemaining(24 * 60 * 60 * 1000);
    setScrollResult(null);
    clearMonitoringData();
  };

  // Carregar dados existentes ao iniciar
  useEffect(() => {
    loadExistingData();
  }, [loadExistingData]);

  useEffect(() => {
    if (startTime && currentScreen === 'timer') {
      const interval = setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTime;
        const remaining = Math.max(0, 24 * 60 * 60 * 1000 - elapsed);
        
        setTimeRemaining(remaining);
        
        if (remaining === 0) {
          // Gerar resultado real com dados coletados
          if (monitoringData) {
            const result = generateScrollResult(monitoringData);
            setScrollResult(result);
          }
          setCurrentScreen('unlock');
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, currentScreen, monitoringData]);

  useEffect(() => {
    if (onScreenChange) onScreenChange(currentScreen);
  }, [currentScreen, onScreenChange]);

  const renderScreen = () => {
    const LoadingFallback = () => (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="text-gray-600">Carregando...</div>
        </div>
      </div>
    );

    switch (currentScreen) {
      case 'welcome':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <WelcomeScreen
              userName={userName}
              setUserName={setUserName}
              onStart={() => navigateToScreen('activation')}
            />
          </Suspense>
        );
      case 'activation':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <ActivationScreen
              userName={userName}
              onStartMeasurement={startTimer}
            />
          </Suspense>
        );
      case 'timer':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <TimerScreen
              key={i18n.language}
              timeRemaining={timeRemaining}
              userName={userName}
              monitoringData={monitoringData}
              onSimulateEnd={simulateLastSeconds}
            />
          </Suspense>
        );
      case 'unlock':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <UnlockScreen
              onUnlock={() => navigateToScreen('result')}
            />
          </Suspense>
        );
      case 'result':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <ResultScreen
              userName={userName}
              scrollResult={scrollResult}
              onMeasureAgain={resetApp}
              onShare={() => alert('Compartilhamento simulado! 📱')}
            />
          </Suspense>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}
    </div>
  );
};

export default Index;
