const express = require('express');
const router = express.Router();

// API routes
const apiRoutes = require('./api/v1/index');

// API version 1 routes
router.use('/api/v1', apiRoutes);

// Root route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Books API',
    documentation: 'https://github.com/yourusername/books-api'
  });
});

// 404 handler
router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

module.exports = router;
