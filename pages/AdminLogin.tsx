
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (login(email, password)) {
      navigate('/admin');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-aisr-light-blue">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <div className="text-center mb-8">
            <img src="https://www.aisr.org/fs/resource-manager/view/95c4b175-9808-44d7-8f96-676425751921" alt="AISR Logo" className="h-16 mx-auto mb-4"/>
            <h1 className="text-2xl font-bold text-aisr-blue">Admin Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aisr-blue"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aisr-blue"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-aisr-blue text-white font-bold py-2 px-4 rounded-md hover:bg-blue-800 transition-colors"
          >
            Log In
          </button>
        </form>
         <div className="text-center mt-4">
            <Link to="/" className="text-sm text-gray-500 hover:text-aisr-blue">&larr; Back to Public Site</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
