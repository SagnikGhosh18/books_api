const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ReviewModule {
    async updateReviewById(id, review, userId) {
        const reviewData = await prisma.review.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        console.log(review);

        if (reviewData.userId !== parseInt(userId)) {
            throw new Error('You are not authorized to update this review');
        }

        if (!reviewData) {
            throw new Error('Review not found');
        }

        return prisma.review.update({
            where: {
                id: parseInt(id),
            },
            data: review
        });
    }

    async deleteReviewById(id, userId) {
        const reviewData = await prisma.review.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (reviewData.userId !== parseInt(userId)) {
            throw new Error('You are not authorized to delete this review');
        }

        if (!reviewData) {
            throw new Error('Review not found');
        }

        return prisma.review.delete({
            where: {
                id: parseInt(id)
            }
        });
    }
}

module.exports = ReviewModule;
