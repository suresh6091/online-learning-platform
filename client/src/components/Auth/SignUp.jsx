import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/signup', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'An error occurred during signup.');
      } else {
        setError('Network error. Please try again later.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transform -translate-y-1/2">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">Create an Account</h2>
        <p className="mt-2 text-center text-gray-600">Sign up to get started</p>
        
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
              className="w-full px-4 py-2 text-gray-900 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 text-gray-900 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="w-full px-4 py-2 text-gray-900 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Register
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-green-600 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
