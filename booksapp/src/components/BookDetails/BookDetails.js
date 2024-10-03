import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BookDetails.css'; // Import the CSS file

const BookDetails = () => {
    const { id } = useParams(); // Get the book ID from the URL parameters
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/books/${id}`); // Fetch book details by ID
                const data = await response.json();
                setBook(data.book); // Set the book state with the fetched data
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [id]);

    const addToLibrary = async () => {
        // Logic to add the book to the "My Library" collection
        try {
            const response = await fetch('http://localhost:4000/api/library', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookId: id }), // Send the book ID to add to the library
            });

            if (response.ok) {
                alert('Book added to your library!'); // Alert on successful addition
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add book to library');
            }
        } catch (error) {
            console.error('Error adding book to library:', error);
            alert('Error adding book to library: ' + error.message); // Alert on error
        }
    };

    if (!book) return <p>Loading...</p>; // Show loading text while fetching data

    return (
        <div className="book-details">
            <h1>{book.title}</h1>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Rating:</strong> {book.rating}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <p><strong>Publication Year:</strong> {book.publication_year}</p>
            <button onClick={addToLibrary}>Add to My Library</button>
        </div>
    );
};

export default BookDetails;
