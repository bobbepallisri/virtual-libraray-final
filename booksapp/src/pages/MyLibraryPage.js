import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyLibrary from '../components/MyLibrary/MyLibrary';

const MyLibraryPage = () => {
  const [libraryBooks, setLibraryBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/my-library')
      .then(response => {
        // If your response contains a key like 'libraryBooks', adjust accordingly
        setLibraryBooks(response.data); // Make sure this matches your API response
      })
      .catch(error => console.error('Error fetching library books:', error));
  }, []);

  const removeBook = (book) => {
    axios.delete(`http://localhost:4000/api/my-library/${book.id}`)
      .then(() => setLibraryBooks(prevBooks => prevBooks.filter(b => b.id !== book.id)))
      .catch(error => console.error('Error removing book:', error));
  };

  return (
    <div className="my-library-page">
      <MyLibrary books={libraryBooks} onRemove={removeBook} />
    </div>
  );
};

export default MyLibraryPage;
