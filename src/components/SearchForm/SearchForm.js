import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

function SearchForm({onSearchSubmit, onCheck, isFilterChecked, searchText}) {
  const [isFocused, setIsFocused] = useState(false);
  const [keyWords, setkeyWords] = useState("");
  const [isSearchError, setIsSearchError] = useState(false);

  useEffect(() => {
    setkeyWords(searchText)
  }, [searchText]);

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  function handleChange(evt) {
    setkeyWords(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (keyWords.trim().length === 0) {
      setIsSearchError(true);
    } else {
      setIsSearchError(false);
      onSearchSubmit(keyWords);
      
    }
  }

  return (
    <section className="search">
      
      <div className="search__wrapper">
      <span className={`search__error ${
              isSearchError ? "search__error_showned" : ""
            } `}>Нужно ввести ключевое слово</span>
        <div
          className={`search__container ${
            isFocused ? "search__container_focused" : ""
          } `}
        >
          <form
            className={`search__form ${
              isFocused ? "search__form_focused" : ""
            } `}
            onSubmit={handleSubmit}
          >
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
                onChange={handleChange}
                value={keyWords}
              />
            </label>
            
            <button className="search__button" type="submit" onClick={handleSubmit}>
              Найти
            </button>
          </form>
         
          <FilterCheckbox isFilterChecked={isFilterChecked} onCheck={onCheck} />
          
        </div>
        
      </div>
    </section>
  );
}

export default SearchForm;
