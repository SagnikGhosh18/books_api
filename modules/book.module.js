const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class BookModule {
    async getAllBooks(requestBody = {}) {
        const { author = '', genre = '', page = 1, limit = 10 } = requestBody;

        let queryFilter = {};

        if (author) {
            queryFilter.author = {
                contains: author
            }
        }

        if (genre) {
            queryFilter.genre = {
                contains: genre
            }
        }

        const books = await prisma.book.findMany({
            where: queryFilter,
            skip: (page - 1) * limit,
            take: limit
        });

        return books || [];
    }

    async createBook(requestBody = {}) {
        const { title, author } = requestBody;

        const book = await prisma.book.create({
            data: {
                title,
                author
            }
        });

        return book;
    }

    async getBookById(id) {
        const book = await prisma.book.findUnique({
            where: {
                id
            }
        });

        return book;
    }

    async searchBooks(query, page = 1, limit = 10) {
        const searchQuery = query.toLowerCase();

        const [books, total] = await Promise.all([
            prisma.book.findMany({
                where: {
                    OR: [
                        {
                            title: {
                                contains: searchQuery
                            }
                        },
                        {
                            author: {
                                contains: searchQuery
                            }
                        }
                    ]
                },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    title: 'asc'
                }
            }),
            prisma.book.count({
                where: {
                    OR: [
                        {
                            title: {
                                contains: searchQuery
                            }
                        },
                        {
                            author: {
                                contains: searchQuery
                            }
                        }
                    ]
                }
            })
        ]);

        const totalPages = Math.ceil(total / limit);
        const currentPage = page;
        const hasMore = currentPage < totalPages;

        return {
            books,
            pagination: {
                currentPage,
                totalPages,
                hasMore,
                limit,
                total
            }
        };
    }

    async getBookDetailsWithReviews(id, page = 1, limit = 10) {
        const bookId = parseInt(id);

        if (!bookId || isNaN(bookId)) {
            throw new Error('Invalid book ID');
        }

        const [book, reviews, reviewCount] = await Promise.all([
            prisma.book.findUnique({
                where: { id: bookId },
                include: {
                    reviews: {
                        take: limit,
                        skip: (page - 1) * limit,
                        orderBy: {
                            createdAt: 'desc'
                        },
                        include: {
                            user: true
                        }
                    }
                }
            }),
            prisma.review.aggregate({
                where: { bookId },
                _avg: { rating: true }
            }),
            prisma.review.count({
                where: { bookId }
            })
        ]);

        if (!book) {
            throw new Error('Book not found');
        }

        if (!book) {
            throw new Error('Book not found');
        }

        const totalPages = Math.ceil(reviewCount / limit);
        const currentPage = page;
        const hasMore = currentPage < totalPages;

        return {
            book: {
                ...book,
                averageRating: reviews._avg.rating || 0,
                reviewCount
            },
            reviews: book.reviews,
            pagination: {
                currentPage,
                totalPages,
                hasMore,
                limit
            }
        };
    }

    async createReview(bookId, userId, body) {
        const { rating, comment } = body;
        const existingReview = await prisma.review.findFirst({
            where: {
                bookId: parseInt(bookId),
                userId: parseInt(userId)
            }
        });

        if (existingReview) {
            throw new Error('User has already reviewed this book');
        }

        if (rating < 1 || rating > 5) {
            throw new Error('Rating must be between 1 and 5');
        }
        const review = await prisma.review.create({
            data: {
                rating,
                comment,
                bookId: parseInt(bookId),
                userId: parseInt(userId)
            }
        });

        return review;
    }

    async updateBookById(id, requestBody = {}) {
        const book = await prisma.book.update({
            where: {
                id
            },
            data: {
                ...requestBody
            }
        });

        return book;
    }

    async deleteBookById(id) {
        const book = await prisma.book.delete({
            where: {
                id
            }
        });

        return book;
    }
}

module.exports = BookModule;
