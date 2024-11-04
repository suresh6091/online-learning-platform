// Load environment variables from .env
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); // MongoDB connection
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const courseRoutes = require('./routes/courseRoutes'); // Import course routes
const protect = require('./middleware/authMiddleware'); // Import JWT auth middleware

const app = express();

// Connect to MongoDB
connectDB();

// Middleware setup (for example, JSON parsing)
app.use(express.json());

// Simple route to test server
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Use auth routes for registration and login
app.use('/api/auth', authRoutes);

// Example protected route
app.get('/api/profile', protect, (req, res) => {
    res.json({ message: 'This is your profile', user: req.user });
});

// Use course routes (protected)
app.use('/api/courses', protect, courseRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
