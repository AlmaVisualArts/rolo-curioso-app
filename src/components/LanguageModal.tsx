import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageModalProps {
  isOpen: boolean;
  onSelect: (lang: 'pt' | 'en') => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({ isOpen, onSelect }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center min-w-[300px]">
        <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {t('app.name')}
        </h1>
        <div className="flex gap-8 justify-center">
          <button
            onClick={() => onSelect('pt')}
            className="flex flex-col items-center focus:outline-none hover:scale-105 transition-transform"
            aria-label="Português (Brasil)"
          >
            <span className="text-5xl mb-1">🇧🇷</span>
            <span className="text-xs font-semibold text-gray-700">Português</span>
          </button>
          <button
            onClick={() => onSelect('en')}
            className="flex flex-col items-center focus:outline-none hover:scale-105 transition-transform"
            aria-label="English (UK)"
          >
            <span className="text-5xl mb-1">🇬🇧</span>
            <span className="text-xs font-semibold text-gray-700">English</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal; 