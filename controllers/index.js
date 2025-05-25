const authController = require('./auth.servlet');
const bookController = require("./book.servlet");
const reviewController = require("./review.servlet");

module.exports = {
    authController,
    bookController,
    reviewController
}
