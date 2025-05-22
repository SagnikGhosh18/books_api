const express = require('express');
const router = express.Router();

const apiRoutes = require('./api/v1/index');

router.use('/api/v1', apiRoutes);
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Books API',
    documentation: 'https://github.com/yourusername/books-api'
  });
});

router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

module.exports = router;
