const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Booking = require('../models/Booking');

const router = express.Router();

// Middleware to protect user routes
const userAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'No token' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

// @route   POST /api/auth/send-otp
// @desc    Generate and send OTP to phone
router.post('/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ success: false, error: 'Phone number is required' });

    // Generate 6 digit OTP. Use static OTP for test account.
    const otp = phone === '9999999999' ? '123456' : Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    let user = await User.findOne({ phone });
    if (!user) {
      // Create a skeleton user if it doesn't exist
      user = new User({ phone, name: 'New User', otp, otpExpires });
    } else {
      user.otp = otp;
      user.otpExpires = otpExpires;
    }
    
    await user.save();

    // MOCK: In production use Twilio/Fast2SMS. For now, log to console.
    console.log(`[AUTH] OTP for ${phone}: ${otp}`);

    res.json({ success: true, message: 'OTP sent successfully (Check console for code)' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP and return JWT
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ success: false, error: 'Phone and OTP are required' });

    const user = await User.findOne({ phone, otp, otpExpires: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid or expired OTP' });
    }

    // Clear OTP after verification
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({
      success: true,
      data: { token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone } }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @route   POST /api/auth/register
// @desc    Register a new user (Signup with password)
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email: email && email.length > 0 ? email : undefined }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User with this phone or email already exists' });
    }

    const user = new User({ name, email: email || undefined, phone, password });
    await user.save();

    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      success: true,
      data: { token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone } }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    User login (Support both email and phone)
router.post('/login', async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    let user;

    if (phone) {
      user = await User.findOne({ phone });
    } else if (email) {
      user = await User.findOne({ email });
    }

    if (!user || !user.password || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({
      success: true,
      data: { token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone } }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get user profile and bookings (Past Bookings Requirement)
router.get('/me', userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    // Fetch all bookings for this user, sorted by newest
    const bookings = await Booking.find({ userId: user._id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { user, bookings }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
router.put('/profile', userAuth, async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    if (name) user.name = name;
    if (email) {
      // Check if email is already taken by another user
      const existingEmail = await User.findOne({ email, _id: { $ne: user._id } });
      if (existingEmail) return res.status(400).json({ success: false, error: 'Email already in use' });
      user.email = email;
    }

    await user.save();

    res.json({
      success: true,
      data: { id: user._id, name: user.name, email: user.email, phone: user.phone }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
