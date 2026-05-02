import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi' | 'genz' | 'te' | 'mr';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (text: string) => string;
  fetchTranslation: (text: string, targetLang: Language) => void;
}

const TranslationContext = createContext<TranslationContextType>({
  language: 'en',
  setLanguage: () => {},
  translate: (text: string) => text,
  fetchTranslation: () => {},
});

export const useTranslation = () => useContext(TranslationContext);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [cache, setCache] = useState<Record<string, Record<string, string>>>({
    en: {}, hi: {}, genz: {}, te: {}, mr: {}
  });

  const translate = (text: string) => {
    if (language === 'en') return text;
    if (cache[language] && cache[language][text]) {
      return cache[language][text];
    }
    return text; // Return placeholder, fetching is handled by T component
  };

  const fetchTranslation = async (text: string, targetLang: Language) => {
    if (cache[targetLang] && cache[targetLang][text] !== undefined) return;
    
    // Static GenZ Dictionary to avoid hitting the 15 Requests/Min Gemini Free Quota
    if (targetLang === 'genz') {
      const genzDict: Record<string, string> = {
        'Guide': 'W-roadmap',
        'Timeline': 'The Scroll',
        'Assistant': 'Support Main',
        'Find Booth': 'IRL Spawn Point',
        'Panic Button': 'Emergency Yeet',
        'Logout': 'Dip',
        'Sign In': 'Log On',
        'Contrast': 'Vibe Check',
        'Text Size': 'Big Font Energy',
        'Your Personal': 'Your main',
        'Election Companion': 'Voting Sidekick, no cap',
        'Start My Guide': 'Let\'s gooo',
        'Ask AI Assistant': 'Drop a question',
        'First-Time Voter?': 'Noob Voter?',
        'Booth Locator & Queue': 'Find the Spot',
        'Important Dates': 'Mark the Cal',
        'Smart Assistant': 'AI Bestie',
        'Rumor Checker': 'Cap Detector',
        'Emergency Help': 'SOS Yeet',
        'Navigate the election process with confidence. Get personalized guidance, real-time booth updates, and instant answers to your voting queries.': 'Glide through the voting process like a pro. Get the perfect guide, live booth updates, and quick answers to all your voting questions, fr fr.'
      };

      if (genzDict[text]) {
        setCache(prev => ({
          ...prev,
          [targetLang]: { ...prev[targetLang], [text]: genzDict[text] }
        }));
        return;
      }
    }

    setCache(prev => ({
      ...prev,
      [targetLang]: { ...prev[targetLang], [text]: text } 
    }));

    try {
      const response = await fetch('http://localhost:5000/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLang })
      });
      const data = await response.json();
      
      if (data.translatedText) {
        setCache(prev => ({
          ...prev,
          [targetLang]: { ...prev[targetLang], [text]: data.translatedText }
        }));
      }
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, translate, fetchTranslation }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const T: React.FC<{ children: string }> = ({ children }) => {
  const { translate, language, fetchTranslation } = useTranslation();
  
  useEffect(() => {
    if (language !== 'en') {
      fetchTranslation(children, language);
    }
  }, [children, language, fetchTranslation]);

  return <>{translate(children)}</>;
};
