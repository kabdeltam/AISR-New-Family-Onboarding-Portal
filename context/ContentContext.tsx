
import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { initialPageData, initialFooterImages, initialBackgroundImage, initialBackgroundOpacity } from '../data/initialData';
import type { PageContent } from '../types';
import { GoogleGenAI, Type } from "@google/genai";
import { useLanguage } from './LanguageContext';

interface ContentContextType {
  pages: Record<string, PageContent>;
  footerImages: string[];
  backgroundImage: string;
  backgroundOpacity: number;
  updatePage: (pageId: string, content: PageContent) => void;
  addFooterImage: (url: string) => void;
  deleteFooterImage: (index: number) => void;
  updateBackgroundSettings: (url: string, opacity: number) => void;
  getEnglishPage: (id: string) => PageContent | undefined;
  getTranslatedPage: (id: string, lang: string) => PageContent | undefined;
  isPageTranslating: (id: string, lang: string) => boolean;
  translatePage: (id: string, lang: string) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Helper to load from localStorage or fallback
const loadFromStorage = <T,>(key: string, fallback: T): T => {
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(`Error parsing localStorage key "${key}":`, e);
    }
  }
  return fallback;
};

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { supportedLanguages } = useLanguage();
  
  // Initialize state from localStorage or initialData
  const [pages, setPages] = useState<Record<string, PageContent>>(() => 
    loadFromStorage('aisr_pages', initialPageData)
  );
  const [footerImages, setFooterImages] = useState<string[]>(() => 
    loadFromStorage('aisr_footer_images', initialFooterImages)
  );
  const [backgroundImage, setBackgroundImage] = useState<string>(() => 
    loadFromStorage('aisr_bg_image', initialBackgroundImage)
  );
  const [backgroundOpacity, setBackgroundOpacity] = useState<number>(() => 
    loadFromStorage('aisr_bg_opacity', initialBackgroundOpacity)
  );

  const [translatedPages, setTranslatedPages] = useState<Record<string, PageContent>>({});
  const [isTranslating, setIsTranslating] = useState<Record<string, boolean>>({});

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('aisr_pages', JSON.stringify(pages));
  }, [pages]);

  useEffect(() => {
    localStorage.setItem('aisr_footer_images', JSON.stringify(footerImages));
  }, [footerImages]);

  useEffect(() => {
    localStorage.setItem('aisr_bg_image', JSON.stringify(backgroundImage));
  }, [backgroundImage]);

  useEffect(() => {
    localStorage.setItem('aisr_bg_opacity', JSON.stringify(backgroundOpacity));
  }, [backgroundOpacity]);

  const updatePage = useCallback((pageId: string, content: PageContent) => {
    setPages(prevPages => ({
      ...prevPages,
      [pageId]: content,
    }));
  }, []);

  const addFooterImage = useCallback((url: string) => {
    if (url.trim()) {
      setFooterImages(prevImages => [...prevImages, url]);
    }
  }, []);

  const deleteFooterImage = useCallback((index: number) => {
    setFooterImages(prevImages => prevImages.filter((_, i) => i !== index));
  }, []);
  
  const updateBackgroundSettings = useCallback((url: string, opacity: number) => {
    if (url.trim()) {
      setBackgroundImage(url);
    }
    setBackgroundOpacity(opacity);
  }, []);

  const getEnglishPage = useCallback((id: string) => pages[id], [pages]);

  const getTranslatedPage = useCallback((id: string, lang: string) => {
    const cacheKey = `${id}-${lang}`;
    return translatedPages[cacheKey];
  }, [translatedPages]);

  const isPageTranslating = useCallback((id: string, lang: string) => {
    const cacheKey = `${id}-${lang}`;
    return !!isTranslating[cacheKey];
  }, [isTranslating]);

  const translatePage = useCallback(async (id: string, lang: string) => {
    const cacheKey = `${id}-${lang}`;
    if (getTranslatedPage(id, lang) || isTranslating[cacheKey]) {
      return;
    }

    const sourceContent = getEnglishPage(id);
    if (!sourceContent) return;

    setIsTranslating(prev => ({ ...prev, [cacheKey]: true }));

    try {
      const languageName = supportedLanguages[lang as keyof typeof supportedLanguages] || 'English';
      
      const translatableContent = {
        title: sourceContent.title,
        mainContent: sourceContent.mainContent,
        links: sourceContent.links.map(link => ({ title: link.title, url: link.url }))
      };
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate the following JSON content to ${languageName}. Keep the original markdown formatting in 'mainContent'. Only translate the 'title' field for each object in the 'links' array, keeping the 'url' field unchanged. Return ONLY the JSON object. Original content: ${JSON.stringify(translatableContent)}`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              mainContent: { type: Type.STRING },
              links: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    url: { type: Type.STRING }
                  },
                  required: ['title', 'url']
                }
              }
            },
            required: ['title', 'mainContent', 'links']
          }
        }
      });

      const translatedFields = JSON.parse(response.text);
      
      const newPageContent: PageContent = {
        ...sourceContent,
        title: translatedFields.title,
        mainContent: translatedFields.mainContent,
        links: translatedFields.links,
      };

      setTranslatedPages(prev => ({ ...prev, [cacheKey]: newPageContent }));

    } catch (error) {
      console.error("Translation failed:", error);
    } finally {
      setIsTranslating(prev => ({ ...prev, [cacheKey]: false }));
    }
  }, [getEnglishPage, getTranslatedPage, isTranslating, supportedLanguages]);

  return (
    <ContentContext.Provider value={{ pages, footerImages, backgroundImage, backgroundOpacity, updatePage, addFooterImage, deleteFooterImage, updateBackgroundSettings, getEnglishPage, getTranslatedPage, isPageTranslating, translatePage }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
