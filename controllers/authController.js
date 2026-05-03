// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // --- START OF DEBUG CODE ---
  console.log(`\nAttempting login for email: ${email}`);
  // --- END OF DEBUG CODE ---

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    // --- START OF DEBUG CODE ---
    console.log(`Found user in DB: ${user}`);
    // --- END OF DEBUG CODE ---

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Invalid credentials' });
    // }

    // Create JWT Payload
    const payload = {
      id: user.id,
      role: user.role,
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            email: user.email,
            role: user.role
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};