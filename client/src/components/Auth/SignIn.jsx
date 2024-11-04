import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Start loading

    try {
      const response = await axios.post('http://127.0.0.1:8000/login', {
        username,
        password,
      });

      if (response.status === 200) {
        const { token, role } = response.data; // Assuming the response contains a JWT token and user role
        localStorage.setItem('token', token); // Store the token
        localStorage.setItem('role', role); // Store the user role

        setUsername('');
        setPassword('');

        // Navigate based on user role
        if (role === 'admin') {
          navigate('/admin/dashboard'); // Admin dashboard
        } else if (role === 'superadmin') {
          navigate('/superadmin/dashboard'); // Super admin dashboard
        } else {
          navigate('/courses'); // User courses page
        }
      } else {
        throw new Error(response.data.message || 'Unexpected error occurred during login.');
      }
    } catch (error) {
      // Handle errors
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
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="sign-in">
      <h1>Sign In</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: '15px' }}>
        Don’t have an account?{' '}
        <Link to="/signup" style={{ color: '#007bff', textDecoration: 'underline' }}>
          Register here
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
