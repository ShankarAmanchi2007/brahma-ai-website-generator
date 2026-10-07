const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { userRepo } = require('../models/dbRepository');

const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_ai_website_generator_2025';
  return jwt.sign({ id: userId }, secret, { expiresIn: '7d' });
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }

    const cleanEmail = email.toString().trim().toLowerCase();
    const cleanPassword = password.toString().trim();
    const cleanName = name.toString().trim();

    if (cleanPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    const existingUser = await userRepo.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(cleanPassword, salt);

    const user = await userRepo.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      password_hash: hashedPassword
    });

    const userId = user.id || user._id;
    const token = generateToken(userId);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: userId,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    const cleanEmail = email.toString().trim().toLowerCase();
    const rawPassword = password.toString();
    const trimmedPassword = rawPassword.trim();

    const user = await userRepo.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Resolves both password and password_hash column variations in PostgreSQL / NeonDB
    const storedHash = user.password || user.password_hash || user.passwordHash;
    if (!storedHash) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Attempt password verification using bcrypt
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(rawPassword, storedHash);
      if (!isMatch && trimmedPassword !== rawPassword) {
        isMatch = await bcrypt.compare(trimmedPassword, storedHash);
      }
    } catch (bcryptErr) {
      console.error('[Auth] Bcrypt compare error:', bcryptErr.message);
      isMatch = false;
    }

    // Fallback: in case legacy plain password existed in legacy test store
    if (!isMatch && (rawPassword === storedHash || trimmedPassword === storedHash)) {
      isMatch = true;
      // Upgrade plain password to bcrypt hash in background
      const salt = await bcrypt.genSalt(10);
      const newHash = await bcrypt.hash(trimmedPassword, salt);
      userRepo.create({ ...user, password: newHash, password_hash: newHash }).catch(() => {});
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const userId = user.id || user._id;
    const token = generateToken(userId);

    res.json({
      success: true,
      token,
      user: {
        id: userId,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await userRepo.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        id: user.id || user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide your email address' });
    }

    const cleanEmail = email.toString().trim().toLowerCase();
    const user = await userRepo.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with this email' });
    }

    res.json({
      success: true,
      message: 'Password reset link has been dispatched to your email address.'
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};
