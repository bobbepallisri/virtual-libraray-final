const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize SQLite database
const db = new sqlite3.Database('./books.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Create books table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      genre TEXT NOT NULL,
      rating REAL NOT NULL,
      description TEXT NOT NULL,
      publication_year INTEGER NOT NULL
    )`, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Books table created or already exists.');
      }
    });

    // Create library table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS library (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bookId INTEGER NOT NULL,
      FOREIGN KEY (bookId) REFERENCES books(id)
    )`, (err) => {
      if (err) {
        console.error('Error creating library table:', err.message);
      } else {
        console.log('Library table created or already exists.');
      }
    });
  }
});

// API routes

// Get all books
app.get('/api/books', (req, res) => {
  const sql = "SELECT * FROM books";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ books: rows });
  });
});

// Get book by ID
app.get('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM books WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ book: row });
  });
});

// Add a new book
app.post('/api/books', (req, res) => {
  const { title, author, genre, rating, description, publication_year } = req.body;
  const sql = `INSERT INTO books (title, author, genre, rating, description, publication_year)
               VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(sql, [title, author, genre, rating, description, publication_year], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Book added successfully!', bookId: this.lastID });
  });
});

// Remove a book
app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM books WHERE id = ?";
  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Book deleted successfully!', deletedRows: this.changes });
  });
});

// Add a book to My Library
app.post('/api/library', (req, res) => {
  const { bookId } = req.body;
  const sql = `INSERT INTO library (bookId) VALUES (?)`;
  db.run(sql, [bookId], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Book added to library successfully!', libraryId: this.lastID });
  });
});

// Get all books in the library
app.get('/api/my-library', (req, res) => {
  const sql = `SELECT books.* FROM books
               INNER JOIN library ON books.id = library.bookId`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows); // Send only the book data in the response
  });
});

// Remove a book from My Library
app.delete('/api/my-library/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM library WHERE bookId = ?";
  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: 'Book removed from library successfully!', deletedRows: this.changes });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
