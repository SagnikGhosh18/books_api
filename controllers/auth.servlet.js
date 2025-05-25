const authModule = require('../modules/auth.module');

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const result = await authModule.register({ email, password, name });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token: result.token,
      user: result.user
    });
  } catch (error) {
    res.status(error.message.includes('Email already registered') ? 400 : 500).json({
      success: false,
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const result = await authModule.login({ email, password });

    res.json({
      success: true,
      message: 'Login successful',
      token: result.token,
      user: result.user
    });
  } catch (error) {
    res.status(error.message.includes('Invalid credentials') ? 401 : 500).json({
      success: false,
      message: error.message
    });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers['access-token'];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
    }

    await authModule.logout(token);

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  register,
  login,
  logout
};
