
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import type { PageContent, LinkItem, InteractiveCard, ModalContent, QuickAccessCard } from '../../types';

// A new component defined inside PageEditor for rich text editing
const RichTextArea: React.FC<{
  value: string;
  onValueChange: (newValue: string) => void;
  rows?: number;
}> = ({ value, onValueChange, rows = 6 }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = (prefix: string, suffix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    if (selectedText) {
      const newText =
        textarea.value.substring(0, start) +
        prefix +
        selectedText +
        suffix +
        textarea.value.substring(end);
      onValueChange(newText);
      // After update, re-focus and set selection
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(start + prefix.length, end + prefix.length);
        }
      }, 0);
    } else {
        // If no text selected, just insert the tags and put cursor in between
         const newText =
        textarea.value.substring(0, start) +
        prefix + suffix +
        textarea.value.substring(end);
        onValueChange(newText);
         setTimeout(() => {
            if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(start + prefix.length, start + prefix.length);
            }
        }, 0);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    applyFormat(`<color c="${color}">`, `</color>`);
  };

  return (
    <div>
      <div className="flex items-center gap-2 p-1 bg-gray-200 border border-b-0 border-gray-300 rounded-t-md flex-wrap">
        <button type="button" onClick={() => applyFormat('**', '**')} title="Bold" className="px-3 py-1 font-bold text-sm rounded hover:bg-gray-300">B</button>
        <button type="button" onClick={() => applyFormat('*', '*')} title="Italic" className="px-3 py-1 italic text-sm rounded hover:bg-gray-300">I</button>
        <button type="button" onClick={() => applyFormat('<u>', '</u>')} title="Underline" className="px-3 py-1 underline text-sm rounded hover:bg-gray-300">U</button>
        
        <div className="w-px h-4 bg-gray-400 mx-1"></div>

        <label className="flex items-center cursor-pointer" title="Select text color">
          <input type="color" onChange={handleColorChange} className="w-6 h-6 p-0 border-none bg-transparent cursor-pointer" />
        </label>

        <div className="w-px h-4 bg-gray-400 mx-1"></div>
        
        <button type="button" onClick={() => applyFormat('[', '](https://)')} title="Insert Link" className="px-3 py-1 text-sm font-semibold text-blue-600 rounded hover:bg-gray-300">
           Link
        </button>
        <button type="button" onClick={() => applyFormat('![Alt Text](', ')')} title="Insert Image" className="px-3 py-1 text-sm font-semibold text-green-600 rounded hover:bg-gray-300">
           Img
        </button>
        
        <span className="text-xs text-gray-500 font-mono ml-2">Format: ![Alt](url)</span>
      </div>
      <textarea
        ref={textareaRef}
        value={value || ''} 
        onChange={(e) => onValueChange(e.target.value)}
        rows={rows}
        className="block w-full px-3 py-2 border border-gray-300 rounded-b-md font-mono text-sm shadow-inner focus:ring-0 focus:border-gray-400"
        placeholder="Enter content here..."
      />
    </div>
  );
};


function PageEditor() {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const { getEnglishPage, updatePage } = useContent();

  const [page, setPage] = useState<PageContent | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (pageId) {
      const content = getEnglishPage(pageId);
      if (content) {
        setPage(JSON.parse(JSON.stringify(content)));
      } else {
        navigate('/admin');
      }
    }
  }, [pageId, getEnglishPage, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (page) {
      setPage({ ...page, [e.target.name]: e.target.value });
    }
  };

  const handleTopImageUrlChange = (index: number, value: string) => {
    if (page) {
      const newUrls = [...(page.topImageUrls || [])];
      newUrls[index] = value;
      setPage({ ...page, topImageUrls: newUrls });
    }
  };

  const addTopImageUrl = () => {
    if (page) {
      setPage({ ...page, topImageUrls: [...(page.topImageUrls || []), ''] });
    }
  };

  const removeTopImageUrl = (index: number) => {
    if (page && page.topImageUrls) {
      setPage({ ...page, topImageUrls: page.topImageUrls.filter((_, i) => i !== index) });
    }
  };
  
  // --- Standard Content Handlers ---
  const handleLinkChange = (index: number, field: keyof LinkItem, value: string) => {
    if (page) {
      const newLinks = [...page.links];
      newLinks[index] = { ...newLinks[index], [field]: value };
      setPage({ ...page, links: newLinks });
    }
  };

  const handleLinkTypeChange = (index: number, type: 'url' | 'modal') => {
      if (!page) return;
      const newLinks = [...page.links];
      if (type === 'modal') {
          newLinks[index] = {
              ...newLinks[index],
              url: '#',
              modalContent: { title: newLinks[index].title, body: '' }
          };
      } else {
          const { modalContent, ...rest } = newLinks[index];
          newLinks[index] = { ...rest, url: '' };
      }
      setPage({ ...page, links: newLinks });
  };

  const handleLinkModalChange = (index: number, field: keyof ModalContent, value: string) => {
      if (!page || !page.links[index].modalContent) return;
      const newLinks = [...page.links];
      newLinks[index] = {
          ...newLinks[index],
          modalContent: { ...newLinks[index].modalContent!, [field]: value }
      };
      setPage({ ...page, links: newLinks });
  };

  const addLink = () => {
    if (page) {
      setPage({ ...page, links: [...page.links, { title: '', url: '' }] });
    }
  };

  const removeLink = (index: number) => {
    if (page) {
      setPage({ ...page, links: page.links.filter((_, i) => i !== index) });
    }
  };

  // --- Quick Access Card Handlers ---
  const handleQuickAccessChange = (index: number, field: keyof QuickAccessCard, value: string) => {
    if (page?.quickAccessCards) {
        const newCards = page.quickAccessCards.map((card, i) => 
            i === index ? { ...card, [field]: value } : card
        );
        setPage({ ...page, quickAccessCards: newCards });
    }
  };

  const addQuickAccessCard = () => {
      if (page) {
          const newCard: QuickAccessCard = {
              id: `qa-${Date.now()}`,
              title: 'New Card',
              variant: 'blue',
          };
          const newCards = [...(page.quickAccessCards || []), newCard];
          setPage({ ...page, quickAccessCards: newCards });
      }
  };

  const removeQuickAccessCard = (index: number) => {
      if (page?.quickAccessCards) {
          const newCards = page.quickAccessCards.filter((_, i) => i !== index);
          setPage({ ...page, quickAccessCards: newCards });
      }
  };


  // --- Interactive Content Handlers ---

  const handleInteractiveCardChange = (cardIndex: number, field: keyof InteractiveCard, value: string) => {
    if (page?.interactiveContent) {
      const newCards = page.interactiveContent.map((card, index) => 
        index === cardIndex ? { ...card, [field]: value } : card
      );
      setPage({ ...page, interactiveContent: newCards });
    }
  };
  
  const handleModalContentChange = (cardIndex: number, field: keyof Omit<ModalContent, 'links'>, value: string) => {
    if (page?.interactiveContent) {
      const newCards = page.interactiveContent.map((card, index) => {
        if (index === cardIndex) {
          return { ...card, modalContent: { ...card.modalContent, [field]: value } };
        }
        return card;
      });
      setPage({ ...page, interactiveContent: newCards });
    }
  };
  
  const handleModalLinkChange = (cardIndex: number, linkIndex: number, field: keyof LinkItem, value: string) => {
     if (page?.interactiveContent) {
        const newCards = page.interactiveContent.map((card, cIndex) => {
            if (cIndex !== cardIndex) return card;
            const newLinks = (card.modalContent.links || []).map((link, lIndex) => 
                lIndex === linkIndex ? { ...link, [field]: value } : link
            );
            return { ...card, modalContent: { ...card.modalContent, links: newLinks } };
        });
        setPage({ ...page, interactiveContent: newCards });
    }
  };
  
  const addModalLink = (cardIndex: number) => {
    if (page?.interactiveContent) {
        const newCards = page.interactiveContent.map((card, cIndex) => {
            if (cIndex !== cardIndex) return card;
            const newLinks = [...(card.modalContent.links || []), { title: '', url: '' }];
            return { ...card, modalContent: { ...card.modalContent, links: newLinks } };
        });
        setPage({ ...page, interactiveContent: newCards });
    }
  };

  const removeModalLink = (cardIndex: number, linkIndex: number) => {
    if (page?.interactiveContent) {
        const newCards = page.interactiveContent.map((card, cIndex) => {
            if (cIndex !== cardIndex) return card;
            const newLinks = (card.modalContent.links || []).filter((_, lIndex) => lIndex !== linkIndex);
            return { ...card, modalContent: { ...card.modalContent, links: newLinks } };
        });
        setPage({ ...page, interactiveContent: newCards });
    }
  };

  const addCard = () => {
    if (page) {
      const newCard: InteractiveCard = {
        id: `card-${Date.now()}`,
        title: 'New Card Title',
        category: 'General',
        modalContent: {
          title: 'New Modal Title',
          body: 'Enter content here.',
          imageUrl: '',
          links: [],
        },
      };
      const newInteractiveContent = [...(page.interactiveContent || []), newCard];
      setPage({ ...page, interactiveContent: newInteractiveContent });
    }
  };
  
  const removeCard = (cardIndex: number) => {
    if (page?.interactiveContent) {
      const newCards = page.interactiveContent.filter((_, index) => index !== cardIndex);
      setPage({ ...page, interactiveContent: newCards });
    }
  };

  const switchToInteractive = () => {
    if (page && window.confirm('Are you sure? This will clear the existing Main Content and Key Links.')) {
        setPage({
            ...page,
            mainContent: '',
            links: [],
            interactiveContent: page.interactiveContent || []
        });
    }
  };

  const switchToStandard = () => {
    if (page && window.confirm('Are you sure? This will remove all interactive flash cards.')) {
        const newPage = {...page};
        delete newPage.interactiveContent;
        setPage(newPage);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (page && pageId) {
        setIsSaving(true);
        updatePage(pageId, page);
        setTimeout(() => {
            setIsSaving(false);
            navigate('/admin');
        }, 1000); // Simulate save
    }
  };

  if (!page) {
    return <div>Loading...</div>;
  }

  const isInteractive = page.interactiveContent !== undefined;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <Link to="/admin" className="text-sm text-aisr-blue hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-aisr-blue">Editing: {page.title}</h1>
        <button
            onClick={isInteractive ? switchToStandard : switchToInteractive}
            className="text-sm font-semibold bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
        >
            {isInteractive ? 'Switch to Standard Content' : 'Switch to Interactive Cards'}
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Page Title</label>
            <input type="text" name="title" id="title" value={page.title} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-aisr-blue focus:border-aisr-blue" />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">Top Image Carousel URLs</label>
            <div className="space-y-2 mt-1">
              {(page.topImageUrls || []).map((url, index) => (
                <div key={index} className="flex gap-2">
                  <input type="text" value={url} onChange={(e) => handleTopImageUrlChange(index, e.target.value)} className="flex-grow px-3 py-2 border border-gray-300 rounded-md text-sm" placeholder="Image URL" />
                  <button type="button" onClick={() => removeTopImageUrl(index)} className="text-red-500 font-bold p-2">&times;</button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addTopImageUrl} className="mt-2 text-xs font-semibold bg-gray-100 px-3 py-1.5 rounded border hover:bg-gray-200">+ Add Image to Carousel</button>
        </div>

        <div>
            <label htmlFor="welcomeVideoUrl" className="block text-sm font-medium text-gray-700">Fallback Welcome Video URL (Embed)</label>
            <input type="text" name="welcomeVideoUrl" id="welcomeVideoUrl" value={page.welcomeVideoUrl} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-aisr-blue focus:border-aisr-blue" />
        </div>

        {/* Quick Access Cards Section */}
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold text-aisr-blue mb-4 border-b border-gray-300 pb-2">Quick Access Cards (Top)</h2>
            <div className="space-y-4">
                {(page.quickAccessCards || []).map((card, index) => (
                    <div key={card.id || index} className="p-4 bg-white rounded-md border border-gray-300">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-semibold text-gray-800">Card {index + 1}</h3>
                            <button type="button" onClick={() => removeQuickAccessCard(index)} className="text-red-600 text-sm hover:underline">Remove</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Title</label>
                                <input type="text" value={card.title} onChange={(e) => handleQuickAccessChange(index, 'title', e.target.value)} className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700">Variant</label>
                                <select value={card.variant} onChange={(e) => handleQuickAccessChange(index, 'variant', e.target.value as 'blue' | 'yellow')} className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md text-sm">
                                    <option value="blue">Blue</option>
                                    <option value="yellow">Yellow</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-gray-700">Description (Optional - displays smaller text)</label>
                                <input type="text" value={card.description || ''} onChange={(e) => handleQuickAccessChange(index, 'description', e.target.value)} className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md text-sm" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-gray-700">Link URL (Optional - makes card clickable)</label>
                                <input type="text" value={card.linkUrl || ''} onChange={(e) => handleQuickAccessChange(index, 'linkUrl', e.target.value)} className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md text-sm" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button type="button" onClick={addQuickAccessCard} className="mt-4 bg-white border border-gray-400 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 text-sm font-semibold">
                + Add Quick Access Card
            </button>
        </div>


        {isInteractive ? (
            <div>
                <h2 className="text-xl font-bold text-aisr-blue mb-4 border-b pb-2">Interactive Flash Cards</h2>
                <div className="space-y-6">
                    {(page.interactiveContent || []).map((card, cardIndex) => (
                        <div key={card.id || cardIndex} className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Card #{cardIndex + 1}</h3>
                                <button type="button" onClick={() => removeCard(cardIndex)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm">Remove Card</button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Card Button Title</label>
                                    <input type="text" value={card.title} onChange={(e) => handleInteractiveCardChange(cardIndex, 'title', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category (Optional)</label>
                                    <input type="text" value={card.category || ''} onChange={(e) => handleInteractiveCardChange(cardIndex, 'category', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="e.g., AIS-R ID Cards"/>
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-700">Pop-up Title</label>
                                    <input type="text" value={card.modalContent.title} onChange={(e) => handleModalContentChange(cardIndex, 'title', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Pop-up Body Content</label>
                                     <RichTextArea
                                        value={card.modalContent.body || ''}
                                        onValueChange={(newValue) => handleModalContentChange(cardIndex, 'body', newValue)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Pop-up Image URL (Optional)</label>
                                    <input type="text" value={card.modalContent.imageUrl || ''} onChange={(e) => handleModalContentChange(cardIndex, 'imageUrl', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Pop-up Embed URL (Optional - e.g., PDF preview)</label>
                                    <input type="text" value={card.modalContent.embedUrl || ''} onChange={(e) => handleModalContentChange(cardIndex, 'embedUrl', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"/>
                                </div>
                                <div>
                                    <h4 className="text-md font-medium text-gray-800 mb-2">Pop-up Links</h4>
                                    <div className="space-y-2">
                                        {(card.modalContent.links || []).map((link, linkIndex) => (
                                            <div key={linkIndex} className="flex items-center gap-2 p-2 bg-white rounded border">
                                                <input type="text" placeholder="Link Title" value={link.title} onChange={(e) => handleModalLinkChange(cardIndex, linkIndex, 'title', e.target.value)} className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"/>
                                                <input type="text" placeholder="URL" value={link.url} onChange={(e) => handleModalLinkChange(cardIndex, linkIndex, 'url', e.target.value)} className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"/>
                                                <button type="button" onClick={() => removeModalLink(cardIndex, linkIndex)} className="bg-red-100 text-red-600 p-1 rounded-full text-xs hover:bg-red-200">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <button type="button" onClick={() => addModalLink(cardIndex)} className="mt-2 bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 text-xs font-semibold">Add Link</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={addCard} className="mt-4 bg-aisr-gold text-white px-4 py-2 rounded-md hover:bg-yellow-600 text-sm font-semibold">Add Flash Card</button>
            </div>
        ) : (
            <>
                <div>
                    <label htmlFor="mainContent" className="block text-sm font-medium text-gray-700">Main Content (Simple Markdown)</label>
                    <RichTextArea
                        value={page.mainContent}
                        onValueChange={(newValue) => setPage({ ...page, mainContent: newValue })}
                        rows={15}
                    />
                </div>

                <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Key Links</h3>
                    <div className="space-y-4">
                        {page.links.map((link, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-md border border-gray-200">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-gray-600">Link #{index + 1}</span>
                                        <select 
                                            value={link.modalContent ? 'modal' : 'url'} 
                                            onChange={(e) => handleLinkTypeChange(index, e.target.value as 'url' | 'modal')}
                                            className="text-xs border-gray-300 rounded"
                                        >
                                            <option value="url">External URL</option>
                                            <option value="modal">Pop-up Content</option>
                                        </select>
                                    </div>
                                    <button type="button" onClick={() => removeLink(index)} className="text-red-500 hover:text-red-700">&times;</button>
                                </div>
                                
                                <div className="mb-3">
                                    <input type="text" placeholder="Link Title" value={link.title} onChange={(e) => handleLinkChange(index, 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"/>
                                </div>

                                {link.modalContent ? (
                                    <div className="bg-white p-3 border rounded border-gray-200">
                                        <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase">Pop-up Content</h4>
                                        <div className="space-y-2">
                                            <input type="text" placeholder="Pop-up Title" value={link.modalContent.title} onChange={(e) => handleLinkModalChange(index, 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"/>
                                             <RichTextArea
                                                value={link.modalContent.body || ''}
                                                onValueChange={(newValue) => handleLinkModalChange(index, 'body', newValue)}
                                                rows={3}
                                            />
                                            <input type="text" placeholder="Pop-up Embed URL" value={link.modalContent.embedUrl || ''} onChange={(e) => handleLinkModalChange(index, 'embedUrl', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"/>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <input type="text" placeholder="URL" value={link.url} onChange={(e) => handleLinkChange(index, 'url', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"/>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <button type="button" onClick={addLink} className="mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 text-sm font-semibold">Add Link</button>
                </div>
            </>
        )}

        <div className="flex justify-end pt-4 border-t mt-6">
            <button type="submit" className="bg-aisr-blue text-white font-bold py-2 px-6 rounded-md hover:bg-blue-800 transition-colors disabled:bg-gray-400" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
      </form>
    </div>
  );
}

export default PageEditor;
