const jwt = require('jsonwebtoken');
const User = require('../models/User');

const ACCESS_COOKIE_NAME = 'accessToken';
const REFRESH_COOKIE_NAME = 'refreshToken';

const getCookieBaseOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.COOKIE_SAME_SITE || 'lax',
  path: '/',
  ...(process.env.COOKIE_DOMAIN ? { domain: process.env.COOKIE_DOMAIN } : {}),
});

const getAccessCookieOptions = () => ({
  ...getCookieBaseOptions(),
  maxAge: Number(process.env.ACCESS_TOKEN_COOKIE_MAX_AGE_MS) || 15 * 60 * 1000,
});

const getRefreshCookieOptions = () => ({
  ...getCookieBaseOptions(),
  maxAge: Number(process.env.REFRESH_TOKEN_COOKIE_MAX_AGE_MS) || 7 * 24 * 60 * 60 * 1000,
});

const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie(ACCESS_COOKIE_NAME, accessToken, getAccessCookieOptions());
  if (refreshToken) {
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, getRefreshCookieOptions());
  }
};

const clearAuthCookies = (res) => {
  const cookieBaseOptions = getCookieBaseOptions();
  res.clearCookie(ACCESS_COOKIE_NAME, cookieBaseOptions);
  res.clearCookie(REFRESH_COOKIE_NAME, cookieBaseOptions);
};

const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '15m' }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
  );

  return { accessToken, refreshToken };
};

// Register
exports.register = async (req, res) => {
  try {
    const { username, email, password, passwordConfirm } = req.body;

    // Validation
    if (!username || !email || !password || !passwordConfirm) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email or username already registered'
      });
    }

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password
    });

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(newUser._id);

    setAuthCookies(res, accessToken, refreshToken);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        userId: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Refresh Token
exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'No refresh token provided'
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate new access token and rotate access cookie
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '15m' }
    );

    res.cookie(ACCESS_COOKIE_NAME, accessToken, getAccessCookieOptions());

    res.status(200).json({
      success: true,
      message: 'Access token refreshed'
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
};

// Logout
exports.logout = (req, res) => {
  clearAuthCookies(res);
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

// Session status
exports.session = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('_id username email');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Session invalid'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        isAuthenticated: true,
        user
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to fetch session'
    });
  }
};
