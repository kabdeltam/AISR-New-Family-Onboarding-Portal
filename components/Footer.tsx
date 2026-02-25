import React from 'react';
import { useContent } from '../context/ContentContext';

function Footer() {
  const { footerImages } = useContent();

  return (
    <footer className="bg-white mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center items-center gap-8">
          {footerImages.map((src, index) => (
            <img key={index} src={src} alt={`Footer logo ${index + 1}`} className="h-16 md:h-20 object-contain" />
          ))}
        </div>
        <div className="text-center text-gray-500 mt-8 text-sm">
          &copy; {new Date().getFullYear()} American International School - Riyadh. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
