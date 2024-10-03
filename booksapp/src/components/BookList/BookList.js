import React from 'react';
import BookCard from '../BookCard/BookCard';
import './BookList.css';

const BookList = ({ books, onBookClick }) => {
  return (
    <div className="book-list">
      {books.map(book => (
        <BookCard key={book.id} book={book} onClick={onBookClick} />
      ))}
    </div>
  );
};

export default BookList;
