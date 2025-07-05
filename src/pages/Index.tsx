
import React, { useState, useEffect } from 'react';
import WelcomeScreen from '../components/WelcomeScreen';
import ActivationScreen from '../components/ActivationScreen';
import TimerScreen from '../components/TimerScreen';
import UnlockScreen from '../components/UnlockScreen';
import ResultScreen from '../components/ResultScreen';

export type AppScreen = 'welcome' | 'activation' | 'timer' | 'unlock' | 'result';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('welcome');
  const [userName, setUserName] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(24 * 60 * 60 * 1000); // 24 hours in milliseconds

  const navigateToScreen = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };

  const startTimer = () => {
    const now = Date.now();
    setStartTime(now);
    setCurrentScreen('timer');
  };

  const simulateLastSeconds = () => {
    const now = Date.now();
    setStartTime(now - (24 * 60 * 60 * 1000) + 10000); // Set to 10 seconds remaining
    setTimeRemaining(10000);
  };

  const resetApp = () => {
    setCurrentScreen('welcome');
    setUserName('');
    setStartTime(null);
    setTimeRemaining(24 * 60 * 60 * 1000);
  };

  useEffect(() => {
    if (startTime && currentScreen === 'timer') {
      const interval = setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTime;
        const remaining = Math.max(0, 24 * 60 * 60 * 1000 - elapsed);
        
        setTimeRemaining(remaining);
        
        if (remaining === 0) {
          setCurrentScreen('unlock');
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            userName={userName}
            setUserName={setUserName}
            onStart={() => navigateToScreen('activation')}
          />
        );
      case 'activation':
        return (
          <ActivationScreen
            userName={userName}
            onStartMeasurement={startTimer}
          />
        );
      case 'timer':
        return (
          <TimerScreen
            timeRemaining={timeRemaining}
            userName={userName}
            onSimulateEnd={simulateLastSeconds}
          />
        );
      case 'unlock':
        return (
          <UnlockScreen
            onUnlock={() => navigateToScreen('result')}
          />
        );
      case 'result':
        return (
          <ResultScreen
            userName={userName}
            onMeasureAgain={resetApp}
            onShare={() => alert('Compartilhamento simulado! 📱')}
          />
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
