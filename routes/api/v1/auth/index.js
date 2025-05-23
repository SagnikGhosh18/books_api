const express = require('express');
const authRouter = express.Router();
const { authController } = require('../../../../controllers/index');
const authMiddleware = require('../../../../middleware/auth');

// POST /api/v1/auth/register - User registration
authRouter.post('/register', authController.register);

// POST /api/v1/auth/login - User login
authRouter.post('/login', authController.login);

authRouter.use(authMiddleware);

// POST /api/v1/auth/logout - User logout
authRouter.post('/logout', authController.logout);


module.exports = authRouter;
