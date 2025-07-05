import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LanguageModal from './components/LanguageModal';
import i18n from './lib/i18n';
import React from "react";

const queryClient = new QueryClient();

const App = () => {
  const [showLanguageModal, setShowLanguageModal] = React.useState(false);
  const [currentLang, setCurrentLang] = React.useState(() => localStorage.getItem('scrollmeter_lang') || 'pt');
  const [currentScreen, setCurrentScreen] = React.useState('');
  const handleScreenChange = (screen: string) => setCurrentScreen(screen);
  const handleSelectLanguage = (lang: 'pt' | 'en') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('scrollmeter_lang', lang);
    setCurrentLang(lang);
    setShowLanguageModal(false);
  };
  React.useEffect(() => {
    const savedLang = localStorage.getItem('scrollmeter_lang');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
      setCurrentLang(savedLang);
    } else {
      i18n.changeLanguage('pt');
      setCurrentLang('pt');
    }
  }, []);
  return (
    <>
      {currentScreen === 'welcome' && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setShowLanguageModal(true)}
            className="bg-white/80 rounded-full shadow p-2 border border-gray-200 hover:scale-105 transition-transform focus:outline-none"
            aria-label="Change language"
          >
            <span className="text-2xl">
              {currentLang === 'pt' ? '🇧🇷' : '🇬🇧'}
            </span>
          </button>
        </div>
      )}
      <LanguageModal isOpen={showLanguageModal} onSelect={handleSelectLanguage} />
      <Index onScreenChange={handleScreenChange} />
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
    </>
);
};

export default App;
