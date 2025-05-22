const express = require('express');
const router = express.Router();

// GET /api/v1/users - Get all users
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Get all users'
  });
});

// GET /api/v1/users/:id - Get single user
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    message: `Get user with ID: ${req.params.id}`
  });
});

// PUT /api/v1/users/:id - Update user
router.put('/:id', (req, res) => {
  res.json({
    success: true,
    message: `Update user with ID: ${req.params.id}`
  });
});

// DELETE /api/v1/users/:id - Delete user
router.delete('/:id', (req, res) => {
  res.json({
    success: true,
    message: `Delete user with ID: ${req.params.id}`
  });
});

module.exports = router;
