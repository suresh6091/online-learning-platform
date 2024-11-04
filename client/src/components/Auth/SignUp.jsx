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
        // Optionally, you can redirect to the login page or home page after successful signup
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
    <div className="sign-up">
      <h1>Sign Up</h1>
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
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Register</button>
      </form>
      <p style={{marginTop:'15px'}}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#007bff', textDecoration: 'underline' }}>
          Sign in here
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
