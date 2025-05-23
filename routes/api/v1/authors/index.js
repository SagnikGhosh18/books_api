const express = require('express');
const authorsRouter = express.Router();

// GET /api/v1/authors - Get all authors
authorsRouter.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Get all authors'
  });
});

// GET /api/v1/authors/:id - Get single author
authorsRouter.get('/:id', (req, res) => {
  res.json({
    success: true,
    message: `Get author with ID: ${req.params.id}`
  });
});

// POST /api/v1/authors - Create author
authorsRouter.post('/', (req, res) => {
  res.json({
    success: true,
    message: 'Create new author'
  });
});

// PUT /api/v1/authors/:id - Update author
authorsRouter.put('/:id', (req, res) => {
  res.json({
    success: true,
    message: `Update author with ID: ${req.params.id}`
  });
});

// DELETE /api/v1/authors/:id - Delete author
authorsRouter.delete('/:id', (req, res) => {
  res.json({
    success: true,
    message: `Delete author with ID: ${req.params.id}`
  });
});

module.exports = authorsRouter;
