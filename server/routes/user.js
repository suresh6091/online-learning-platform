const express = require('express');
const User = require('../models/User'); // Adjust path as necessary
const generateToken = require('../utils/token'); // Adjust path as necessary

const router = express.Router();

// Example login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(user);

        // Respond with user data and token
        res.status(200).json({ 
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token // Include token in response
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
