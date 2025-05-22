const authRoutes = require('./auth');
const userRoutes = require('./users');
const bookRoutes = require('./books');
const genreRoutes = require('./genres');
const authorRoutes = require('./authors');
const express = require('express');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/genres', genreRoutes);
router.use('/authors', authorRoutes);

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
