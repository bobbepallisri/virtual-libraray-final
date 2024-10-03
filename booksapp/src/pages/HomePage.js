import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard/BookCard'; // Adjust the path as necessary
import Navbar from '../components/Navbar/Navbar'; // Import the Navbar
import SearchBar from '../components/SearchBar/SearchBar'; // Adjust the path as necessary
import './Homepage.css'; // Import your CSS

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    //const navigate = useNavigate(); // Initialize navigate for navigation

    // Fetch books data from API
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/books'); // Adjust the URL as necessary
                const data = await response.json();
                setBooks(data.books); // Assuming the data has a 'books' property
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);

    // Handle the search input change
    const handleInputChange = (event) => {
        if (event && event.target) {
            setSearchTerm(event.target.value); // Set searchTerm to input value
        } else {
            console.error('Event or event.target is undefined');
        }
    }; 
    
    // Filter books based on the search term
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="home-page">
            <Navbar /> {/* Include the Navbar here */}
            <h1>Book Library</h1>
            <SearchBar 
                value={searchTerm} 
                onChange={handleInputChange} 
                placeholder="Search for books..." 
            />

            <div className="book-list">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => (
                        <BookCard key={book.id} book={book} />
                    ))
                ) : (
                    <p>No books found.</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;
