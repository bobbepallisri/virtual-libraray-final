import React from 'react';
import './MyLibrary.css'; // Ensure to import the CSS file

const MyLibrary = ({ books, onRemove }) => {
  return (
    <div className="my-library">
      <h2>My Library</h2>
      {books.length === 0 ? (
        <p>No books in your library.</p>
      ) : (
        <div className="book-cards">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
              <button onClick={() => onRemove(book)} className="remove-button">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLibrary;
