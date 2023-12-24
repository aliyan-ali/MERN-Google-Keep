import React from "react";
import Image from "next/image";
import searchIcon from "./img/searchIcon.svg";
import HeaderIcon from "./HeaderIcon";
import styles from "./SearchInput.css";

const SearchInput = () => {

  return (
    <>
      <div className="search-input-field">
        <span >
          <HeaderIcon icon={searchIcon} title ='Search' alt='hamburger-icon-svg'/>
        </span>
        <input type="text" placeholder="Search" className="input-field" />
      </div>
    </>
  );
};

export default SearchInput;
