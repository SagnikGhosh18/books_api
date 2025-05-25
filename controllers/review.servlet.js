const ReviewModule = require('../modules/review.module');
const reviewModule = new ReviewModule();

const updateReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers['user-id'];
        const { comment, rating } = req.body;

        const result = await reviewModule.updateReviewById(id, { comment, rating }, userId);

        res.json({
            success: true,
            message: 'Review updated successfully',
            review: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers['user-id'];

        const result = await reviewModule.deleteReviewById(id, userId);

        res.json({
            success: true,
            message: 'Review deleted successfully',
            review: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    updateReviewById,
    deleteReviewById
};
