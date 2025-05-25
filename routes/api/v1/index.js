const authRoutes = require('./auth');
const bookRoutes = require('./books');
const reviewRoutes = require('./reviews');
const express = require('express');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/books', bookRoutes);
router.use('/reviews', reviewRoutes);

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to API v1',
    endpoints: {
      auth: '/auth',
      books: '/books',
      reviews: '/reviews',
    }
  });
});

module.exports = router;
