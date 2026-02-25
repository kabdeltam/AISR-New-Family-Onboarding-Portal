
import React, { isValidElement } from 'react';

interface MarkdownRendererProps {
  content?: string; 
  className?: string;
}

const parseInlineFormatting = (text: string): React.ReactNode[] => {
    if (!text) return []; 
    
    const elements: React.ReactNode[] = [];

    const regex = /(!\[.*?\]\(.*?\))|(\[.*?\]\(.*?\))|(<u>.*?<\/u>)|(<color c=".*?">.*?<\/color>)|(\*\*.*?\*\*)|(\*.*?\*)|([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            elements.push(text.substring(lastIndex, match.index));
        }

        const matchedStr = match[0];

        if (matchedStr.startsWith('![')) {
            const imgMatch = /!\[([^\]]*)\]\(([^)]+)\)/.exec(matchedStr);
            if (imgMatch) {
                const [, altText, url] = imgMatch;
                elements.push(
                  <img 
                    key={`${lastIndex}-img`} 
                    src={url} 
                    alt={altText} 
                    className="max-w-full h-auto rounded-lg shadow-md mx-auto my-4 block" 
                  />
                );
            }
        } else if (matchedStr.startsWith('[')) {
            const linkMatch = /\[([^\]]+)\]\(([^)]+)\)/.exec(matchedStr);
            if (linkMatch) {
                const [, linkText, url] = linkMatch;
                elements.push(<a href={url} key={`${lastIndex}-link`} target={url.startsWith('mailto:') ? '_self' : '_blank'} rel="noopener noreferrer" className="text-aisr-blue font-semibold hover:underline">{parseInlineFormatting(linkText)}</a>);
            }
        } else if (matchedStr.startsWith('<u>')) {
            elements.push(<u key={`${lastIndex}-u`}>{parseInlineFormatting(matchedStr.slice(3, -4))}</u>);
        } else if (matchedStr.startsWith('<color')) {
            const colorMatch = /<color c="(#[0-9a-fA-F]{6})">(.*?)<\/color>/.exec(matchedStr);
            if (colorMatch) {
                elements.push(<span style={{ color: colorMatch[1] }} key={`${lastIndex}-color`}>{parseInlineFormatting(colorMatch[2])}</span>);
            }
        } else if (matchedStr.startsWith('**')) {
            elements.push(<strong key={`${lastIndex}-strong`}>{parseInlineFormatting(matchedStr.slice(2, -2))}</strong>);
        } else if (matchedStr.startsWith('*')) {
            elements.push(<em key={`${lastIndex}-em`}>{parseInlineFormatting(matchedStr.slice(1, -1))}</em>);
        } else if (matchedStr.includes('@') && !matchedStr.includes(' ')) { 
             elements.push(<a href={`mailto:${matchedStr}`} key={`${lastIndex}-mail`} className="text-aisr-blue font-semibold hover:underline">{matchedStr}</a>);
        } else {
             elements.push(matchedStr);
        }

        lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
        elements.push(text.substring(lastIndex));
    }

    return elements;
};


const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {
  if (!content) {
      return null;
  }

  const renderLine = (line: string, index: number) => {
    if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold text-aisr-blue mb-4 border-b-2 border-aisr-gold pb-2 inline-block">{parseInlineFormatting(line.substring(3))}</h2>;
    }
    if (line.startsWith('*   ')) {
      return <li key={index} className="ml-8 list-disc">{parseInlineFormatting(line.substring(4))}</li>;
    }
     if (line.startsWith('- ')) {
      return <li key={index} className="ml-8 list-disc">{parseInlineFormatting(line.substring(2))}</li>;
    }
    if (line.trim() === '') {
      return <br key={index} />;
    }
    return <p key={index} className="mb-4">{parseInlineFormatting(line)}</p>;
  };

  const lines = content.split('\n');
  const elements = lines.map(renderLine);
  
  // Group list items
  const groupedElements: React.ReactNode[] = [];
  let currentList: React.ReactElement[] = [];

  elements.forEach((el, index) => {
    if (isValidElement(el) && el.type === 'li') {
      currentList.push(el);
    } else {
      if (currentList.length > 0) {
        groupedElements.push(<ul key={`ul-${index}`} className="mb-4">{currentList}</ul>);
        currentList = [];
      }
      groupedElements.push(el);
    }
  });

  if (currentList.length > 0) {
    groupedElements.push(<ul key="ul-last" className="mb-4">{currentList}</ul>);
  }

  return <div className={`prose max-w-none ${className || 'text-gray-700'}`}>{groupedElements}</div>;
};

export default MarkdownRenderer;
