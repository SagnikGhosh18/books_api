# Books API

A Node.js API built with Express following MVC pattern for managing books and reviews.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
PORT=3000
DATABASE_URL="mysql://user:password@localhost:3306/books_api"
JWT_SECRET=your_jwt_secret_key
```

3. Run database migrations:
```bash
npx prisma migrate dev
```

4. Start the development server:
```bash
npm run dev
```

5. Start the production server:
```bash
npm start
```

## API Endpoints

### Authentication
- POST `/api/v1/auth/register` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "your_password",
    "name": "John Doe"
  }
  ```
- POST `/api/v1/auth/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- POST `/api/v1/auth/logout` - Logout user

### Note on Authenticated Endpoints
For all authenticated endpoints (reviews, protected book endpoints), include these headers:
- `access-token`: <access_token>
- `user-id`: <user_id>

Example:
```bash
curl -X POST \
  -H "access-token: your_jwt_token" \
  -H "user-id: 123" \
  -H "Content-Type: application/json" \
  -d '{"rating": 4, "comment": "Great book!"}' \
  http://localhost:3000/api/v1/books/1/reviews
```

### Books
- GET `/api/v1/books` - Get all books
- GET `/api/v1/books/:id` - Get book details (including reviews)
- POST `/api/v1/books` - Create a new book
  ```json
  {
    "title": "Book Title",
    "author": "Author Name"
  }
  ```
- PUT `/api/v1/books/:id` - Update a book
- DELETE `/api/v1/books/:id` - Delete a book
- GET `/api/v1/search` - Search books by title or author
  ```json
  {
    "query": "search term",
    "page": 1,
    "limit": 10
  }
  ```

### Reviews
- POST `/api/v1/books/:id/reviews` - Submit a review (Authenticated users only)
  ```json
  {
    "rating": 4,
    "comment": "Great book!"
  }
  ```
- GET `/api/v1/books/:id/reviews` - Get book reviews with pagination

### Books
- GET `/api/v1/books` - Get all books
- GET `/api/v1/books/:id` - Get book details (including reviews)
- POST `/api/v1/books` - Create a new book
  ```json
  {
    "title": "Book Title",
    "author": "Author Name"
  }
  ```
- PUT `/api/v1/books/:id` - Update a book
- DELETE `/api/v1/books/:id` - Delete a book
- GET `/api/v1/search` - Search books by title or author
  ```json
  {
    "query": "search term",
    "page": 1,
    "limit": 10
  }
  ```

### Reviews
- POST `/api/v1/books/:id/reviews` - Submit a review (Authenticated users only)
  ```json
  {
    "rating": 4,
    "comment": "Great book!"
  }
  ```
- GET `/api/v1/books/:id/reviews` - Get book reviews with pagination

## Environment Variables

Required environment variables:
- `PORT` - Server port (default: 3000)
- `DATABASE_URL` - MySQL database connection URL
- `JWT_SECRET` - JWT secret key for authentication

## Database Schema

The application uses a MySQL database with the following schema:

### Users
- `id`: Primary key, auto-incrementing integer
- `email`: Unique email address
- `password`: Hashed password
- `name`: Optional user name
- `createdAt`: Timestamp of account creation
- `reviews`: One-to-many relationship with reviews

### Books
- `id`: Primary key, auto-incrementing integer
- `title`: Book title
- `author`: Author name
- `reviews`: One-to-many relationship with reviews

### Reviews
- `id`: Primary key, auto-incrementing integer
- `rating`: Rating (1-5)
- `comment`: Optional comment
- `userId`: Foreign key to User table
- `bookId`: Foreign key to Book table
- `createdAt`: Timestamp of review creation

The schema enforces referential integrity between Users, Books, and Reviews tables, ensuring that reviews are always associated with valid users and books.

## Project Structure

```
books_api/
├── /controllers/     # Controller modules
├── /modules/         # Business logic modules
├── /routes/          # Route handlers
│   └── /api/v1/     # Versioned API routes
│       ├── index.js  # Main API router
│       ├── books.js  # Books route handler
│       └── auth.js   # Authentication routes
├── /prisma/          # Prisma database schema and migrations
├── .env              # Environment variables
└── package.json      # Project dependencies
```
