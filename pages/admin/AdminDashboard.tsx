
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import type { PageContent } from '../../types';

function AdminDashboard() {
  const { pages, updatePage } = useContent();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pageEntries: PageContent[] = Object.values(pages);

  const handleExportJson = () => {
    const dataStr = JSON.stringify(pages, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'aisr_portal_content.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (typeof json === 'object' && json !== null) {
          // Update all pages from the imported JSON
          Object.entries(json).forEach(([id, content]) => {
            updatePage(id, content as PageContent);
          });
          alert('Content imported successfully! Your local session has been updated.');
          window.location.reload(); 
        }
      } catch (err) {
        console.error('Failed to parse JSON:', err);
        alert('Invalid JSON file. Please make sure you are uploading a valid export file.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure? This will delete all your local changes and revert to the site\'s permanent "hardcoded" defaults.')) {
        localStorage.removeItem('aisr_pages');
        localStorage.removeItem('aisr_footer_images');
        localStorage.removeItem('aisr_bg_image');
        localStorage.removeItem('aisr_bg_opacity');
        window.location.reload();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-aisr-blue">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Select a page to manage its content or sync data.</p>
        </div>
        <div className="flex flex-wrap gap-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImportJson} 
              className="hidden" 
              accept=".json"
            />
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-aisr-blue text-white font-bold py-2 px-4 rounded hover:bg-blue-800 transition-colors flex items-center gap-2 text-sm"
                title="Upload a previously exported JSON file"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Import JSON
            </button>
            <button 
                onClick={handleExportJson}
                className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-colors flex items-center gap-2 text-sm"
                title="Download current content as JSON"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export JSON
            </button>
            <button 
                onClick={handleResetToDefaults}
                className="bg-red-100 text-red-700 font-bold py-2 px-4 rounded hover:bg-red-200 transition-colors flex items-center gap-2 text-sm"
                title="Clear local changes and revert to permanent defaults"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Reset to Defaults
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pageEntries.map(page => (
          <Link 
            key={page.id} 
            to={`/admin/edit/${page.id}`}
            className="block bg-gray-50 p-4 rounded-md border border-gray-200 hover:shadow-lg hover:border-aisr-blue transition-all duration-200"
          >
            <h2 className="font-semibold text-aisr-blue">{page.title}</h2>
            <p className="text-sm text-gray-500">ID: {page.id}</p>
          </Link>
        ))}
      </div>
      
      <div className="mt-12 p-4 bg-aisr-light-blue rounded-lg border border-blue-200">
        <h3 className="text-sm font-bold text-aisr-blue uppercase mb-2">How to update the live site permanently:</h3>
        <ol className="text-xs text-gray-700 list-decimal ml-4 space-y-2">
          <li><strong>Edit:</strong> Use this portal to set up the site exactly how you want it. Your changes are saved to your browser automatically.</li>
          <li><strong>Export:</strong> Click <span className="text-green-600 font-bold">Export JSON</span>. This downloads a file with all your work.</li>
          <li><strong>Sync:</strong> Send the exported JSON file to the developer.</li>
          <li><strong>Deploy:</strong> The developer will update the source code with your JSON and redeploy the site.</li>
          <li><strong>Verify:</strong> Once redeployed, click <span className="text-red-600 font-bold">Reset to Defaults</span>. If the site still looks correct, your changes are now "hardcoded" for every visitor globally.</li>
        </ol>
      </div>
    </div>
  );
}

export default AdminDashboard;
