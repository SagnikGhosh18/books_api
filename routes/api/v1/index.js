const authRoutes = require('./auth');
const bookRoutes = require('./books');
const reviewRoutes = require('./reviews');
const express = require('express');
const router = express.Router();
const { bookController } = require('../../../controllers/index');

router.use('/auth', authRoutes);
router.use('/books', bookRoutes);
router.use('/reviews', reviewRoutes);

router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to API v1'
  });
});

// GET /api/v1/search - Search books
router.get('/search', (req, res) => {
  bookController.searchBooks(req, res);
});

module.exports = router;
