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
