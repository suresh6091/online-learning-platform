// Load environment variables from .env
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); // Assuming you have a db.js file for MongoDB connection
const User = require('./models/User');  // Ensure correct path to your User model
const Course = require('./models/Course');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware setup (for example, JSON parsing)
app.use(express.json());

// Simple route to test server
app.get('/', (req, res) => {
    res.send('Server is running');
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
