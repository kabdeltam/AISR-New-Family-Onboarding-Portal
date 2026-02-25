
import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Link } from 'react-router-dom';

function FooterManager() {
  const { footerImages, addFooterImage, deleteFooterImage } = useContent();
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newImageUrl.trim()) {
      addFooterImage(newImageUrl);
      setNewImageUrl('');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <Link to="/admin" className="text-sm text-aisr-blue hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
      <h1 className="text-3xl font-bold text-aisr-blue mb-6">Manage Footer Images</h1>

      <form onSubmit={handleAddImage} className="flex gap-4 mb-8">
        <input
          type="text"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          placeholder="Enter new image URL"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aisr-blue"
        />
        <button type="submit" className="bg-aisr-blue text-white font-bold py-2 px-6 rounded-md hover:bg-blue-800 transition-colors">
          Add Image
        </button>
      </form>
      
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Images</h2>
        {footerImages.length > 0 ? (
          <ul className="space-y-3">
            {footerImages.map((url, index) => (
              <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
                <div className="flex items-center gap-4">
                    <img src={url} alt="" className="h-10 w-20 object-contain bg-white border p-1 rounded" />
                    <span className="text-sm text-gray-600 truncate">{url}</span>
                </div>
                <button 
                  onClick={() => deleteFooterImage(index)}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-200 text-sm font-semibold"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-4">No footer images have been added yet.</p>
        )}
      </div>
    </div>
  );
}

export default FooterManager;
