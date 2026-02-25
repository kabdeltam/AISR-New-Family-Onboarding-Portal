
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <h1 className="text-4xl font-bold text-aisr-blue mb-4">{t('welcomeTitle')}</h1>
      <p className="text-lg text-gray-600 mb-8">
        {t('welcomeMessage')}
      </p>
      <div className="flex justify-center gap-6">
        <Link 
          to="/aisr/es" 
          className="bg-aisr-gold text-white font-bold py-3 px-8 rounded-lg hover:bg-yellow-600 transition-transform transform hover:scale-105"
        >
          {t('getStarted')}
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
