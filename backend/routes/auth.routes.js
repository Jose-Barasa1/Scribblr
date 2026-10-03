import express from 'express';
import User from '../models/user.js'; // Note the .js extension required in ESM

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    // Temporary dev-mode mock authentication or User lookup
    let user = null;
    try {
      user = await User.findOne({ email });
    } catch (dbErr) {
      // Fallback if DB is disconnected during quick testing
      user = null;
    }

    if (!user) {
      // Dev mode fallback for instant testing
      if (email === 'brian@scribblr.com' && password === 'password123') {
        return res.status(200).json({
          token: 'mock-jwt-token-brian',
          user: { id: 'u-101', name: 'Brian Manager', email, role: 'Site Manager', initials: 'BM' }
        });
      }
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Successful Login Response
    res.status(200).json({
      token: 'jwt-session-token-' + user._id,
      user: {
        id: user._id,
        name: user.name || 'Brian Manager',
        email: user.email,
        role: user.role || 'Site Manager',
        initials: user.name ? user.name.split(' ').map(n => n[0]).join('') : 'BM'
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
});

export default router;