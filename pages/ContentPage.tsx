
import React, { useMemo, useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { useLanguage } from '../context/LanguageContext';
import InfoModal from '../components/InfoModal';
import ImageCarousel from '../components/ImageCarousel';
import type { InteractiveCard, ModalContent } from '../types';

function ContentPage() {
  const { enrollment, division } = useParams();
  const location = useLocation();
  const { language } = useLanguage();
  const { getEnglishPage, getTranslatedPage, isPageTranslating, translatePage } = useContent();
  const [activeModalContent, setActiveModalContent] = useState<ModalContent | null>(null);
  
  const isCounselorPage = location.pathname.endsWith('/counselor');
  const isPtsOrBooster = !enrollment && !division;

  const pageId = useMemo(() => {
    if (isPtsOrBooster) {
        return location.pathname.substring(1); // /ptso -> ptso
    }
    return `${enrollment}-${division}${isCounselorPage ? '-counselor' : ''}`;
  }, [enrollment, division, isCounselorPage, location.pathname, isPtsOrBooster]);

  useEffect(() => {
    if (pageId && language !== 'en') {
      translatePage(pageId, language);
    }
  }, [pageId, language, translatePage]);

  const pageContent = language === 'en' 
    ? getEnglishPage(pageId)
    : getTranslatedPage(pageId, language) || getEnglishPage(pageId); // Fallback to English while translating

  const isLoading = isPageTranslating(pageId, language);

  // Grouping logic
  const interactiveGroups = useMemo(() => {
    if (!pageContent || !pageContent.interactiveContent) return [];
    
    const groups: { name: string; cards: InteractiveCard[] }[] = [];
    
    pageContent.interactiveContent.forEach(card => {
      const catName = card.category || 'General';
      let group = groups.find(g => g.name === catName);
      if (!group) {
        group = { name: catName, cards: [] };
        groups.push(group);
      }
      group.cards.push(card);
    });
    
    return groups;
  }, [pageContent]);

  if (isLoading && !pageContent) {
    return (
       <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-aisr-blue animate-pulse">Translating...</h1>
        <p className="text-gray-600 mt-2">Please wait while we prepare the content in your selected language.</p>
      </div>
    );
  }
  
  if (!pageContent) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600">Page Not Found</h1>
        <p className="text-gray-600 mt-2">The content for this page could not be located.</p>
        <Link to="/" className="text-aisr-blue hover:underline mt-4 inline-block">Return Home</Link>
      </div>
    );
  }
  
  const basePagePath = `/${enrollment}/${division}`;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-aisr-blue">{pageContent.title} {isLoading && <span className="text-lg text-gray-400">(Updating...)</span>}</h1>
        {division && (
             <div className="flex-shrink-0 ml-4">
             {isCounselorPage ? (
               <Link to={basePagePath} className="bg-aisr-light-blue text-aisr-blue px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
                 &larr; Back to {division.toUpperCase()}
               </Link>
             ) : (
               <Link to={`${basePagePath}/counselor`} className="bg-aisr-gold text-white px-4 py-2 rounded-md font-semibold hover:bg-yellow-600 transition">
                 Counselor Page &rarr;
               </Link>
             )}
           </div>
        )}
      </div>

      {pageContent.topImageUrls && pageContent.topImageUrls.length > 0 && (
        <ImageCarousel images={pageContent.topImageUrls} />
      )}

      {pageContent.welcomeVideoUrl && !pageContent.topImageUrls && (
        <div className="relative mb-8 w-full overflow-hidden rounded-lg shadow-md pb-[56.25%] bg-white" style={{ backgroundColor: 'white' }}>
          <iframe 
            src={pageContent.welcomeVideoUrl}
            title="Welcome Video" 
            width="100%"
            height="100%"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full bg-white"
            style={{ backgroundColor: 'white', border: 'none' }}
          ></iframe>
        </div>
      )}

      {/* Quick Access Cards Section */}
      {pageContent.quickAccessCards && pageContent.quickAccessCards.length > 0 && (
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 mb-12">
          {pageContent.quickAccessCards.map(card => {
             const bgColor = card.variant === 'blue' ? 'bg-aisr-blue' : 'bg-aisr-gold';
             const hoverColor = card.variant === 'blue' ? 'hover:bg-blue-800' : 'hover:bg-yellow-600';
             const Component = card.linkUrl ? 'a' : 'div';
             const props = card.linkUrl ? { href: card.linkUrl, target: "_blank", rel: "noopener noreferrer" } : {};

             return (
               <Component
                 key={card.id}
                 {...props}
                 className={`${bgColor} text-white p-6 rounded-lg shadow-lg w-full md:w-64 aspect-square flex flex-col items-center justify-center text-center transition-transform transform hover:scale-105 ${card.linkUrl ? `cursor-pointer ${hoverColor}` : ''}`}
               >
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  {card.description && <p className="text-sm font-medium opacity-90 whitespace-pre-line">{card.description}</p>}
               </Component>
             )
          })}
        </div>
      )}
      
      {pageContent.interactiveContent && pageContent.interactiveContent.length > 0 ? (
        <>
          <div className="text-center mb-6">
            {pageContent.mainContent ? (
               <div className="text-lg font-medium">
                 <MarkdownRenderer content={pageContent.mainContent} className="text-aisr-blue" />
               </div>
            ) : (
               <p className="text-lg text-gray-700">Please select a topic below for more information.</p>
            )}
          </div>
          
          {interactiveGroups.map(group => (
            <div key={group.name} className="mb-10">
              {(interactiveGroups.length > 1 || group.name !== 'General') && (
                 <h2 className="text-2xl font-bold text-aisr-blue mb-4 border-b-2 border-aisr-gold pb-2 inline-block">{group.name}</h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {group.cards.map(card => (
                  <button
                    key={card.id}
                    onClick={() => setActiveModalContent(card.modalContent)}
                    className="text-center p-6 bg-white rounded-lg border-2 border-aisr-light-blue hover:border-aisr-blue hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aisr-blue flex flex-col items-center justify-center min-h-[120px]"
                    aria-haspopup="dialog"
                  >
                    <h3 className="font-semibold text-aisr-blue text-lg">{card.title}</h3>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
              <MarkdownRenderer content={pageContent.mainContent} />
          </div>
          
          {pageContent.links.length > 0 && (
            <aside className="md:col-span-1 bg-aisr-light-blue p-6 rounded-lg">
              <h2 className="text-xl font-bold text-aisr-blue mb-4 border-b-2 border-aisr-gold pb-2">Key Links</h2>
              <ul className="space-y-3">
                {pageContent.links.map((link, index) => {
                  if (link.modalContent) {
                    return (
                       <li key={index}>
                        <button 
                          onClick={() => setActiveModalContent(link.modalContent || null)}
                          className="text-aisr-blue font-semibold hover:underline hover:text-blue-800 transition-colors text-left"
                        >
                          {link.title}
                        </button>
                      </li>
                    );
                  }
                  return (
                    <li key={index}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-aisr-blue font-semibold hover:underline hover:text-blue-800 transition-colors">
                        {link.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </aside>
          )}
        </div>
      )}
      
      {activeModalContent && (
        <InfoModal 
          content={activeModalContent} 
          onClose={() => setActiveModalContent(null)} 
        />
      )}
    </div>
  );
}

export default ContentPage;
