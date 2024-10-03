import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AddBook from './components/AddBook/AddBook';
import BookDetailsPage from './pages/BookDetailsPage';
import HomePage from './pages/HomePage';
import MyLibraryPage from './pages/MyLibraryPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/my-library" element={<MyLibraryPage />} />
          <Route path="/add-book" element={<AddBook />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
