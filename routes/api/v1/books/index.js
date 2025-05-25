const express = require('express');
const router = express.Router();
const { bookController } = require('../../../../controllers/index');
const authMiddleware = require('../../../../middleware/auth');

router.use(authMiddleware);

// GET /api/v1/books - Get all books
router.get('/', (req, res) => {
  bookController.getAllBooks(req, res);
});

// GET /api/v1/books/:id - Get single book
router.get('/:id', (req, res) => {
  bookController.getBookById(req, res);
});

// POST /api/v1/books - Create book
router.post('/', (req, res) => {
  bookController.createBook(req, res);
});

// PUT /api/v1/books/:id - Update book
router.put('/:id', (req, res) => {
  bookController.updateBookById(req, res);
});

// DELETE /api/v1/books/:id - Delete book
router.delete('/:id', (req, res) => {
  bookController.deleteBookById(req, res);
});

// GET /api/v1/books/:id/reviews - Get book reviews
router.get('/:id/reviews', (req, res) => {
  res.json({
    success: true,
    message: `Get reviews for book with ID: ${req.params.id}`
  });
});

// POST /api/v1/books/:id/reviews - Add book review
router.post('/:id/reviews', (req, res) => {
  bookController.createReview(req, res);
});

module.exports = router;
