import React from 'react';

const SearchBar = ({ value, onChange, placeholder }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange} // Make sure this is correctly set
            placeholder={placeholder}
        />
    );
};

export default SearchBar;
