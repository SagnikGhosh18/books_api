
const BookModule = require('../modules/book.module');
const bookModule = new BookModule();

const getAllBooks = async (req, res) => {
    try {
        const body = req;

        if (!body) {
            return res.status(400).json({
                success: false,
                message: 'Invalid request'
            });
        }
        const books = await bookModule.getAllBooks(body) || [];

        res.status(201).json({
            success: true,
            result: {
                hits: books,
                count: books.length
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createBook = async (req, res) => {
    try {
        const { body = {} } = req;

        if (!body) {
            return res.status(400).json({
                success: false,
                message: 'No body provided'
            });
        }

        const book = await bookModule.createBook(body);

        res.status(201).json({
            success: true,
            result: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getBookById = async (req, res) => {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    try {
        const bookDetails = await bookModule.getBookDetailsWithReviews(id, parseInt(page), parseInt(limit));
        res.status(200).json(bookDetails);
        res.status(201).json({
            success: true,
            result: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const { body = {} } = req;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'No id provided'
            });
        }

        const book = await bookModule.updateBookById(id, body);

        res.status(201).json({
            success: true,
            result: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteBookById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'No id provided'
            });
        }

        const book = await bookModule.deleteBookById(id);

        res.status(201).json({
            success: true,
            result: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const createReview = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers['user-id'];
        const { body = {} } = req;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'No id provided'
            });
        }

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'No user id provided'
            });
        }

        const review = await bookModule.createReview(id, userId, body);

        res.status(201).json({
            success: true,
            result: review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const searchBooks = async (req, res) => {
    try {
        const { query, page = 1, limit = 10 } = req.query;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'No query provided'
            });
        }

        const books = await bookModule.searchBooks(query, parseInt(page), parseInt(limit));

        res.status(201).json({
            success: true,
            result: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllBooks,
    createBook,
    getBookById,
    updateBookById,
    deleteBookById,
    createReview,
    searchBooks
};
