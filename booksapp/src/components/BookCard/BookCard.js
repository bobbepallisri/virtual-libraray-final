import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css'; // Make sure to import your CSS

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <Link to={`/book/${book.id}`}>View Details</Link> {/* Link to Book Details Page */}
    </div>
  );
};

export default BookCard;
