import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { Link } from 'react-router-dom';

function BackgroundManager() {
  const { backgroundImage, backgroundOpacity, updateBackgroundSettings } = useContent();
  const [imageUrl, setImageUrl] = useState(backgroundImage);
  const [opacity, setOpacity] = useState(backgroundOpacity);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaved(false);
    updateBackgroundSettings(imageUrl, opacity);
    setTimeout(() => { 
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <Link to="/admin" className="text-sm text-aisr-blue hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
      <h1 className="text-3xl font-bold text-aisr-blue mb-6">Manage Background</h1>

      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Background Image URL</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aisr-blue"
            />
        </div>

        <div>
            <label htmlFor="opacity" className="block text-sm font-medium text-gray-700">
                Fade Level (Opacity): <span className="font-bold">{Math.round(opacity * 100)}%</span>
            </label>
            <input
              type="range"
              id="opacity"
              min="0"
              max="1"
              step="0.01"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
        </div>

        <div className="text-right flex items-center justify-end gap-4">
            {saved && <span className="text-green-600 text-sm font-semibold">Saved successfully!</span>}
            <button type="submit" className="bg-aisr-blue text-white font-bold py-2 px-6 rounded-md hover:bg-blue-800 transition-colors disabled:bg-gray-400" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
        </div>
      </form>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Background Preview</h2>
        {backgroundImage ? (
          <div className="border p-4 rounded-md bg-gray-100">
            <img src={backgroundImage} alt="Current background" className="w-full h-auto max-h-64 object-cover rounded" style={{ opacity: opacity }} />
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No background image is set.</p>
        )}
      </div>
    </div>
  );
}

export default BackgroundManager;