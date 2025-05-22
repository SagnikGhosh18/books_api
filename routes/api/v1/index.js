const express = require('express');
const router = express.Router();

// Import individual route handlers
const authRoutes = require('./auth');
const userRoutes = require('./users');
const bookRoutes = require('./books');
const genreRoutes = require('./genres');
const authorRoutes = require('./authors');

// API version prefix
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/genres', genreRoutes);
router.use('/authors', authorRoutes);

// API version root
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to API v1',
    endpoints: {
      auth: '/auth',
      users: '/users',
      books: '/books',
      genres: '/genres',
      authors: '/authors'
    }
  });
});

module.exports = router;
