import React, { useState, useEffect } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Error from "../Error/Error";
import { searchMovies, filterMovies } from "../../utils/utils";
import { NOT_FOUND_SEARCH_ERROR } from "../../utils/constants";

function SavedMovies({
  loggedIn,
  savedCards,
  handleCardDelete,
  isLoadingSavedMovies,
}) {
  // const [searchedMovies, setSearchedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const [isFilterChecked, setIsFilterChecked] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);

  function handleMoviesFilter(movies, searchText, isFilterChecked) {
    const searchedMoviesList = searchMovies(movies, searchText);
    // setSearchedMovies(searchedMoviesList);
    setFilteredMovies(
      isFilterChecked ? filterMovies(searchedMoviesList) : searchedMoviesList
    );
  }

  function handleSearchMoviesSubmit(searchText) {
    setSearchText(searchText);
  }

  function handleFilterCheck() {
    setIsFilterChecked(!isFilterChecked);
  }

  useEffect(() => {
    handleMoviesFilter(savedCards, searchText, isFilterChecked);
  }, [savedCards, searchText, isFilterChecked]);

  useEffect(() => {
    if (filteredMovies.length === 0 && savedCards.length !== 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies, savedCards]);

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

        {isNotFound ? (
          <Error text={NOT_FOUND_SEARCH_ERROR} />
        ) : (
          <>
            {isLoadingSavedMovies ? (
              <Preloader />
            ) : (
              <MoviesCardList
                cards={filteredMovies}
                isSavedMoviesRoute={true}
                onDeleteCard={handleCardDelete}
              />
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
