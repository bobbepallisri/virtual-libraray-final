import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookDetails from '../components/BookDetails/BookDetails';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error('Error fetching book:', error));
  }, [id]);

  return (
    <div className="book-details-page">
      {book ? <BookDetails book={book} /> : <p>Loading...</p>}
    </div>
  );
};

export default BookDetailsPage;
