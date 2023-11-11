import React, { useState, useEffect } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Error from "../Error/Error";
import { searchMovies, filterMovies } from "../../utils/utils";
import { NOT_FOUND_SEARCH_ERROR } from "../../utils/constants";
// import cards from "../../utils/saved-cards";

function SavedMovies({ loggedIn, savedCards, handleCardDelete }) {
  const [searchedMovies, setSearchedMovies] = useState([]); //найденные по ключевым словам фильмы
  const [filteredMovies, setFilteredMovies] = useState([]); // фильмы для рендера с учетом короткометражек

  const [isFilterChecked, setIsFilterChecked] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);

  function handleMoviesFilter(movies, query, isFilterChecked) {
    const searchedMoviesList = searchMovies(movies, query);
    setSearchedMovies(searchedMoviesList);
    setFilteredMovies(
      isFilterChecked ? filterMovies(searchedMoviesList) : searchedMoviesList
    );
  }

  function handleSearchMoviesSubmit(query) {
    setSearchText(query);
      // handleMoviesFilter(savedCards, query, isFilterChecked);
    }

    function handleFilterCheck() {
      setIsFilterChecked(!isFilterChecked);
    }

      useEffect(() => {
        handleMoviesFilter(savedCards, searchText, isFilterChecked)
  }, [savedCards, searchText, isFilterChecked]);

  useEffect(() => {
      if (filteredMovies.length < 1) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }

  }, [isNotFound, setIsNotFound, filteredMovies.length]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="saved-movies">
        <SearchForm 
        onSearchSubmit={handleSearchMoviesSubmit}
        isFilterChecked={isFilterChecked}
        onCheck={handleFilterCheck}
        searchText={searchText}
         />
                 {isNotFound && (
          <Error text={NOT_FOUND_SEARCH_ERROR} />
        )}
        <MoviesCardList
          cards={filteredMovies}
          isSavedMoviesRoute={true}
          onDeleteCard={handleCardDelete}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
