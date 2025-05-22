const express = require('express');
const router = express.Router();

// GET /api/v1/categories - Get all categories
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Get all categories'
  });
});

// GET /api/v1/categories/:id - Get single category
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    message: `Get category with ID: ${req.params.id}`
  });
});

// POST /api/v1/categories - Create category
router.post('/', (req, res) => {
  res.json({
    success: true,
    message: 'Create new category'
  });
});

// PUT /api/v1/categories/:id - Update category
router.put('/:id', (req, res) => {
  res.json({
    success: true,
    message: `Update category with ID: ${req.params.id}`
  });
});

// DELETE /api/v1/categories/:id - Delete category
router.delete('/:id', (req, res) => {
  res.json({
    success: true,
    message: `Delete category with ID: ${req.params.id}`
  });
});

module.exports = router;
