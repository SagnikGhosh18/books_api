# Books API

A Node.js API built with Express following MVC pattern.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Start the production server:
```bash
npm start
```

## API Endpoints

- GET `/api/v1/books` - Get all books
- GET `/api/v1/books/:id` - Get a single book
- POST `/api/v1/books` - Create a new book
- PUT `/api/v1/books/:id` - Update a book
- DELETE `/api/v1/books/:id` - Delete a book

## Project Structure

- `/routes` - Contains all route handlers
  - `/api/v1` - Versioned API routes
    - `index.js` - Main API router
    - `books.js` - Books route handler

## Environment Variables

- `PORT` - Server port (default: 3000)
