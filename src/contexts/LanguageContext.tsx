
'use client';

import type { Language, Translations } from '@/types';
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Translations;
  t: (key: string, params?: Record<string, string | number>) => string;
  isLoading: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ka'); // Changed default to 'ka'
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchTranslations = useCallback(async (lang: Language) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/locales/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${lang}`);
      }
      const data = await response.json();
      setTranslations(data);
    } catch (error) {
      console.error(error);
      // Fallback to English if loading fails for the selected language (except if English itself fails)
      if (lang !== 'en') {
        // Attempt to load English as a fallback if the primary language fails
        try {
          const fallbackResponse = await fetch(`/locales/en.json`);
          if (!fallbackResponse.ok) {
            throw new Error(`Failed to load fallback English translations`);
          }
          const fallbackData = await fallbackResponse.json();
          setTranslations(fallbackData);
          setLanguageState('en'); // Explicitly set language to English if fallback is used
        } catch (fallbackError) {
          console.error(fallbackError);
          setTranslations({}); // Empty translations if English also fails
        }
      } else {
        setTranslations({}); // Empty translations if English fails
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTranslations(language);
  }, [language, fetchTranslations]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let result: string | Translations | undefined = translations;

    for (const k of keys) {
      if (typeof result === 'object' && result !== null && k in result) {
        result = result[k];
      } else {
        // Key not found, return key itself or a placeholder
        console.warn(`Translation key "${key}" not found for language "${language}".`);
        return key;
      }
    }

    if (typeof result === 'string') {
      if (params) {
        return Object.entries(params).reduce((str, [paramKey, paramValue]) => {
          return str.replace(new RegExp(`{${paramKey}}`, 'g'), String(paramValue));
        }, result);
      }
      return result;
    }
    // If the path leads to an object, not a string, return the key
    console.warn(`Translation key "${key}" leads to an object, not a string, for language "${language}".`);
    return key;
  }, [translations, language]);


  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};
