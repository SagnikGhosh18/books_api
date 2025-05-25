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
        // Invalidate token by returning false
        return false;
    },

    async validateToken(token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            return true;
        } catch (error) {
            return false;
        }
        return user;
    }
};

module.exports = authModule;