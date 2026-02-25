import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import HomePage from './pages/HomePage';
import ContentPage from './pages/ContentPage';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import PageEditor from './pages/admin/PageEditor';
import FooterManager from './pages/admin/FooterManager';
import AdminLayout from './components/AdminLayout';
import { useContent } from './context/ContentContext';
import BackgroundManager from './pages/admin/BackgroundManager';

function App() {
  const { backgroundImage, backgroundOpacity } = useContent();

  return (
    <>
      <div
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          opacity: backgroundOpacity,
        }}
        className="fixed inset-0 bg-cover bg-center z-0"
        aria-hidden="true"
      />
      <div className="relative z-10 min-h-screen font-sans bg-transparent">
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="edit/:pageId" element={<PageEditor />} />
            <Route path="footer" element={<FooterManager />} />
            <Route path="background" element={<BackgroundManager />} />
          </Route>

          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path=":enrollment/:division" element={<ContentPage />} />
            <Route path=":enrollment/:division/counselor" element={<ContentPage />} />
            <Route path="ptso" element={<ContentPage />} />
            <Route path="booster-club" element={<ContentPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;