// src/components/Navbar/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import CSS for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <h2 className="logo">Library</h2>
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/add-book">Add Book</Link>
                </li>
                <li>
                    <Link to="/my-library">My Library</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
