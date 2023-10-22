import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm() {
const [isFocused, setIsFocused] = useState(false);

function handleFocus() {
    setIsFocused(true);
}

function handleBlur() {
    setIsFocused(false);
}

  return (
    <section className="search">
      <div className={`search__container ${isFocused ? "search__container_focused" : ''} `}>
        <form className="search__form">
          <label className="search__label">
            <input
              className="search__input"
              type="text"
              id="search-input"
              name="searchMovies"
              placeholder="Фильм"
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </label>
          <button className="search__button" type="submit">
            Найти
          </button>
        </form>

      </div>
    </section>
  );
}

export default SearchForm;
