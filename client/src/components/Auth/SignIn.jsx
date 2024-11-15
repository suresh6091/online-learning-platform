import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/login', { username, password });

      if (response.status === 200) {
        const { token, role } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        setUsername('');
        setPassword('');

        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'superadmin') {
          navigate('/superadmin/dashboard');
        } else {
          navigate('/courses');
        }
      } else {
        throw new Error(response.data.message || 'Unexpected error occurred during login.');
      }
    } catch (error) {
      if (!error.response) {
        setError('Network error. Please try again later.');
      } else if (error.response.status === 401) {
        setError('Incorrect username or password. Please try again.');
      } else if (error.response.status === 404) {
        setError('Login service is unavailable. Please contact support.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transform -translate-y-1/2">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Welcome Back</h2>
        <p className="mt-2 text-center text-gray-600">Sign in to your account</p>
        
        {error && (
          <div className="p-3 my-4 text-sm text-center text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label htmlFor="username" className="block mb-1 font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 text-gray-900 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 text-gray-900 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

