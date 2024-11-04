// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Import Home component
import SignIn from './components/Auth/SignIn'; // Import SignIn component
import SignUp from './components/Auth/SignUp'; // Import SignUp component
import ProtectedRoute from './routes/ProtectedRoute'; // Import the protected route component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Protected route example */}
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
