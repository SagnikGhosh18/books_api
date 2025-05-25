
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
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'No id provided'
            });
        }

        const book = await bookModule.getBookById(id);

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

module.exports = {
    getAllBooks,
    createBook,
    getBookById,
    updateBookById,
    deleteBookById
};
