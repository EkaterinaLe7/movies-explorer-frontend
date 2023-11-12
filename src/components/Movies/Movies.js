import React, { useState, useEffect } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Error from "../Error/Error";
import * as moviesApi from "../../utils/MoviesApi";
import { searchMovies, filterMovies } from "../../utils/utils";
import {
  SEARCH_SERVER_ERROR,
  NOT_FOUND_SEARCH_ERROR,
} from "../../utils/constants";
// import cards from "../../utils/cards";

function Movies({ loggedIn, onSaveCard, savedCards, handleCardDelete, isSaved }) {
  // const [allMovies, setAllMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]); //найденные по ключевым словам фильмы
  const [filteredMovies, setFilteredMovies] = useState([]); // фильмы для рендера с учетом короткометражек

  const [isFilterChecked, setIsFilterChecked] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isFirstSearch, setisFirstSearch] = useState(false);

  // const [errorText, setErrorText] = useState("");


  function handleMoviesFilter(movies, query, isFilterChecked) {
    //  setAllMovies(movies);
    const searchedMoviesList = searchMovies(movies, query);
    setSearchedMovies(searchedMoviesList);
    setFilteredMovies(
      isFilterChecked ? filterMovies(searchedMoviesList) : searchedMoviesList
    );

    localStorage.setItem("searchedMovies", JSON.stringify(searchedMoviesList));
    localStorage.setItem("searchTextQuery", query);
    localStorage.setItem("filterCheck", isFilterChecked);
  }

  function handleSearchMoviesSubmit(query) {
    const storedAllMovies = localStorage.getItem("allMovies");
    setSearchText(query);
    setIsServerError(false);

    if (!storedAllMovies) {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((movies) => {
          handleMoviesFilter(movies, query, isFilterChecked);
          setisFirstSearch(true);
          // setAllMovies(movies);

          localStorage.setItem("allMovies", JSON.stringify(movies));
        })
        .catch((err) => {
          setIsServerError(true);
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    } else {
      // setAllMovies(JSON.parse(storedAllMovies));
      handleMoviesFilter(JSON.parse(storedAllMovies), query, isFilterChecked);
    }
  }

  // useEffect(() => {
  //   if (filteredMovies.length < 1) {
  //     setIsNotFound(true);
  //   } else {
  //     setIsNotFound(false);
  //   }
  // }, [isNotFound, setIsNotFound, filteredMovies.length, isFirstSearch]);

  // useEffect(() => {
  //   if (localStorage.getItem('searchedMovies')) {
  //     if (filteredMovies.length === 0) {
  //       setIsNotFound(true);
  //     } else {
  //       setIsNotFound(false);
  //     }
  //   } else {
  //     setIsNotFound(false);
  //   }
  // }, [filteredMovies]);

  useEffect(() => {
    const storedFilterCheck = JSON.parse(localStorage.getItem("filterCheck"));
    const storedSearchText = localStorage.getItem("searchTextQuery");
    if (storedFilterCheck) {
      if (storedFilterCheck === true) {
        setIsFilterChecked(true);
      } else {
        setIsFilterChecked(false);
      }
    }

    if (storedSearchText) {
      setSearchText(storedSearchText);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("searchedMovies")) {
      const searchedStoredMovies = JSON.parse(
        localStorage.getItem("searchedMovies")
      );
      setSearchedMovies(searchedStoredMovies);

      if (isFilterChecked) {
        setFilteredMovies(
          isFilterChecked
            ? filterMovies(searchedStoredMovies)
            : searchedStoredMovies
        );
      }
    }
  }, [isFilterChecked]);

  useEffect(() => {
    setFilteredMovies(
      isFilterChecked ? filterMovies(searchedMovies) : searchedMovies
    );
    localStorage.setItem("filterCheck", isFilterChecked);
  }, [isFilterChecked, searchedMovies]);

  function handleFilterCheck() {
    setIsFilterChecked(!isFilterChecked);
  }

  useEffect(() => {
    if (localStorage.getItem('searchedMovies')) {
      if (filteredMovies.length < 1) {
        setIsNotFound(true);
        setisFirstSearch(true)
      } else {
        setIsNotFound(false);
      }
    }

  }, [isNotFound, setIsNotFound, filteredMovies.length, isFirstSearch]);



  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm
          onSearchSubmit={handleSearchMoviesSubmit}
          isFilterChecked={isFilterChecked}
          onCheck={handleFilterCheck}
          searchText={searchText}
        />

        {isServerError && <Error text={SEARCH_SERVER_ERROR} />}
        {(isNotFound && !isLoading && isFirstSearch) && (
          <Error text={NOT_FOUND_SEARCH_ERROR} />
        )}
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            cards={filteredMovies}
            onSaveCard={onSaveCard}
            savedCards={savedCards}
            onDeleteCard={handleCardDelete}
            isSaved={isSaved}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
