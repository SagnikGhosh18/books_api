const express = require('express');
const router = express.Router();
const { reviewController } = require('../../../../controllers/index');
const authMiddleware = require('../../../../middleware/auth');

router.use(authMiddleware);

// PUT /reviews/:id – Update your own review
router.put('/:id', reviewController.updateReviewById);

// DELETE /reviews/:id – Delete your own review
router.delete('/:id', reviewController.deleteReviewById);

module.exports = router;