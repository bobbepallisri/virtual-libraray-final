import axios from 'axios';
import React, { useState } from 'react';
import './AddBook.css'; // Import the CSS file

const AddBook = () => {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    rating: '',
    description: '',
    publication_year: '',
  });

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/api/books', newBook)
      .then(() => alert('Book added successfully!'))
      .catch(error => console.error('Error adding book:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="add-book-form">
      <input type="text" name="title" placeholder="Title" value={newBook.title} onChange={handleChange} required />
      <input type="text" name="author" placeholder="Author" value={newBook.author} onChange={handleChange} required />
      <input type="text" name="genre" placeholder="Genre" value={newBook.genre} onChange={handleChange} required />
      <input type="text" name="rating" placeholder="Rating" value={newBook.rating} onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" value={newBook.description} onChange={handleChange} required />
      <input type="text" name="publication_year" placeholder="Publication Year" value={newBook.publication_year} onChange={handleChange} required />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;
