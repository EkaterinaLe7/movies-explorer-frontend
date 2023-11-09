import React from "react";
import "./Error.css";

function SearchError({ text }) {
  return (
    <>
      <h2 className="search-error">{text}</h2>
    </>
  );
}

export default SearchError;
