const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authModule = {
    async register({ email, password, name }) {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            throw new Error('Email already registered');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 8);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });

        // Generate token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        };
    },

    async login({ email, password }) {
        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        // Generate token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        };
    },

    async logout(token) {
        // Create blacklisted token
        await prisma.blacklistedToken.create({
            data: {
                token,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
            }
        });

        return true;
    },

    async validateToken(token) {
        // Check if token is blacklisted
        const blacklistedToken = await prisma.blacklistedToken.findFirst({
            where: {
                token,
                expiresAt: {
                    gt: new Date()
                }
            }
        });

        if (blacklistedToken) {
            throw new Error('Token has been revoked');
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.id }
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }
};

module.exports = authModule;