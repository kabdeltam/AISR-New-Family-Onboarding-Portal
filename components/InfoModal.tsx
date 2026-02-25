
import React from 'react';
import type { ModalContent } from '../types';
import MarkdownRenderer from './MarkdownRenderer';

interface InfoModalProps {
  content: ModalContent;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ content, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className={`bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto ${content.embedUrl ? 'max-w-5xl' : 'max-w-2xl'}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start">
            <h2 id="modal-title" className="text-2xl font-bold text-aisr-blue">{content.title}</h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-6">
            {content.imageUrl && (
              <img src={content.imageUrl} alt={content.title} className="w-1/2 h-auto rounded-md mb-4 mx-auto" />
            )}
            {content.embedUrl && (
               <div className="w-full h-[75vh] mb-4">
                  <iframe 
                    src={content.embedUrl} 
                    className="w-full h-full rounded-md border border-gray-200" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    title="Embedded Content"
                  ></iframe>
               </div>
            )}
            <MarkdownRenderer content={content.body || ''} />
            {content.links && content.links.length > 0 && (
              <div className="mt-6 pt-4 border-t">
                <h3 className="text-lg font-semibold text-aisr-blue mb-3">Useful Links</h3>
                <ul className="space-y-2">
                  {content.links.map((link, index) => (
                    <li key={index}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-aisr-blue font-semibold hover:underline hover:text-blue-800 transition-colors">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
