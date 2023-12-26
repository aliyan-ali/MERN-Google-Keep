import React,{ useContext, useEffect, useState } from "react";
import Image from "next/image";
import searchIcon from "./img/searchIcon.svg";
import HeaderIcon from "./HeaderIcon";
import CrossIcon from "./CrossIcon";
import cross from "./img/cross.svg"
import styles from "./SearchInput.css";
import { SearchContext } from "../Context/SearchProvider";
const SearchInput = () => {
  const { setSearchQuery, handleSearch } = useContext(SearchContext);
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    setSearchQuery(searchTerm);
    handleSearch();
  };

    const clearSearch = () => {
      handleSearch(); 
      setSearch("");
      setSearchQuery("");
    };



  return (
    <>
      <div className="search-input-field">
        <span>
          <HeaderIcon
            icon={searchIcon}
            title="Search"
            alt="hamburger-icon-svg"
          />
        </span>
        <input
          type="text"
          placeholder="Search"
          className="input-field input-field-nav"
          value={search} // Controlled input value
          onChange={handleInputChange}
        />
        <span onClick={clearSearch} className="clear-input-field-nav">
          <CrossIcon icon={cross} title="close" alt="close-icon-svg" />
        </span>
      </div>
    </>
  );
};

export default SearchInput;
















