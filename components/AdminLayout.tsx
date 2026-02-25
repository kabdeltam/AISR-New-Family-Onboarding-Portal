import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-aisr-blue text-white flex flex-col">
        <div className="p-4 border-b border-blue-700">
           <Link to="/" className="flex items-center gap-2">
            <img src="https://www.aisr.org/fs/resource-manager/view/95c4b175-9808-44d7-8f96-676425751921" alt="AISR Logo" className="h-10 bg-white p-1 rounded-full" />
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </Link>
        </div>
        <nav className="flex-grow p-4">
          <Link to="/admin" className="block py-2 px-3 rounded hover:bg-blue-700">Dashboard</Link>
          <Link to="/admin/footer" className="block py-2 px-3 rounded hover:bg-blue-700">Manage Footer</Link>
          <Link to="/admin/background" className="block py-2 px-3 rounded hover:bg-blue-700">Manage Background</Link>
        </nav>
        <div className="p-4 border-t border-blue-700">
          <button 
            onClick={handleLogout}
            className="w-full bg-aisr-gold text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;