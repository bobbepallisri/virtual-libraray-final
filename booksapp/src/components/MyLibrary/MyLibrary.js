import React from 'react';
import BookCard from '../BookCard/BookCard'; // Adjust this import according to your folder structure

const BookList = ({ books, onBookClick }) => {
  return (
    <div className="book-list">
      {books.length === 0 ? (
        <p>No books found in your library.</p>
      ) : (
        books.map(book => (
          <BookCard key={book.id} book={book} onClick={() => onBookClick(book)} />
        ))
      )}
    </div>
  );
};

export default BookList;
