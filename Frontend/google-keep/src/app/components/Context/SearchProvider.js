import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


export const SearchContext = createContext();

function SearchProvider({ children }) {


    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [notes, setNotes] = useState([]);

    const handleSearch = () => {
        const filtered = notes.filter(
            (note) =>
                note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                note.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredNotes(filtered, filteredNotes);
    };

    // console.log('search context running', searchQuery);

    return (
        <SearchContext.Provider value={{
            searchQuery,
            setSearchQuery,
            filteredNotes,
            handleSearch,
            notes,
            setNotes, }}>
            {children}
        </SearchContext.Provider>
    );
}
export default SearchProvider;