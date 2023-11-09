import React, { useState, useEffect } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Error from "../Error/Error"
import * as moviesApi from "../../utils/MoviesApi";
import { searchMovies, filterMovies } from '../../utils/utils';
// import cards from "../../utils/cards";

function Movies({loggedIn}) {
  // const [allMovies, setAllMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]); //найденные по ключевым словам фильмы
  const [filteredMovies, setFilteredMovies] = useState([]); // фильмы для рендера с учетом короткометражек

  const [isFilterChecked, setIsFilterChecked] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isShowKeyWordError, setIsShowKeyWordError] = useState(false);

  // const [errorText, setErrorText] = useState("");
  




  // useEffect(() => {
  //   const searcedStoredMovies = localStorage.getItem("searchedMovies")
  //   if (searcedStoredMovies) {
  //     setFilteredMovies(JSON.parse(searcedStoredMovies));
  //     // setFilteredMovies(searchedMovies);
  //   }
  // }, [setFilteredMovies]);

  useEffect(() => {
    if (filteredMovies.length < 1) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
}, [isNotFound, setIsNotFound, filteredMovies.length]);


  function handleMoviesFilter(movies, query, isFilterChecked) {
    //  setAllMovies(movies);
    const searchedMoviesList = searchMovies(movies, query);
    setSearchedMovies(searchedMoviesList);
    setFilteredMovies(isFilterChecked ? filterMovies(searchedMoviesList) : searchedMoviesList);
    // const filteredMoviesList = filterMovies(searchedMovies, isFilterChecked);

    // const filteredMoviesList = searchMovies(movies, query, isFilterChecked);
    // setFilteredMovies(filteredMoviesList);
    
//  localStorage.setItem("allMovies", JSON.stringify(movies));
    localStorage.setItem('searchedMovies', JSON.stringify(searchedMoviesList));
    localStorage.setItem('searchTextQuery', query);
    localStorage.setItem('filterCheck', isFilterChecked);
  }



  function handleSearchMoviesSubmit(query) {
    const storedAllMovies = localStorage.getItem("allMovies");
    if (query.length === 0) {
      setIsShowKeyWordError(true);
      return;
    } else {
      setIsShowKeyWordError(false);
      setSearchText(query)

    if (!storedAllMovies) {
      setIsLoading(true);
       moviesApi
        .getMovies()
        .then((movies) => {
          handleMoviesFilter(movies, query, isFilterChecked)
          // setAllMovies(movies);
          
          localStorage.setItem("allMovies", JSON.stringify(movies));
        })
        .catch((err) => {
          setIsServerError(true);
          console.log(err);})
        .finally(() => setIsLoading(false));
    } else {
      // setAllMovies(JSON.parse(storedAllMovies));
      handleMoviesFilter(JSON.parse(storedAllMovies), query, isFilterChecked)
    }
    }
    
  }

  // useEffect(() => {
  //   const storeFilterCheck = (JSON.parse(localStorage.getItem('filterCheck')))
  //   if (localStorage.getItem('filterCheck')) {
  //     setIsFilterChecked(storeFilterCheck);
  //   } 
  //   // else {
  //   //   setIsFilterChecked(false);
  //   // }
  // }, []);

  useEffect(() => {
    const storedFilterCheck = (JSON.parse(localStorage.getItem('filterCheck')));
    const storedSearchText = localStorage.getItem('searchTextQuery');
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
       const searchedStoredMovies = (JSON.parse(localStorage.getItem("searchedMovies")));
       setSearchedMovies(searchedStoredMovies);
      //  return searchedStoredMovies;
      // if (localStorage.getItem('filterCheck')) {
      //   const storeFilterCheck = (JSON.parse(localStorage.getItem('filterCheck')));
      //   setIsFilterChecked(storeFilterCheck);
      //   // return storeFilterCheck;
      //   setFilteredMovies(storeFilterCheck ? filterMovies(searchedStoredMovies) : searchedStoredMovies);
      // }

      if (isFilterChecked) {
          // const storeFilterCheck = (JSON.parse(localStorage.getItem('filterCheck')));
          // setIsFilterChecked(storeFilterCheck);
          // return storeFilterCheck;
          setFilteredMovies(isFilterChecked ? filterMovies(searchedStoredMovies) : searchedStoredMovies);
        }
    }



    
    
    // setSearchedMovies(searchedStoredMovies);
    // const storedFilterCheck = localStorage.getItem("filterCheck")
    // if (searchedStoredMovies) {
    //   if (storedFilterCheck) {
    //     // setFilteredMovies(storedFilterCheck ? filterMovies(JSON.parse(searchedStoredMovies)) : JSON.parse(searchedStoredMovies));
    //     setFilteredMovies(filterMovies(JSON.parse(searchedStoredMovies)));
    //   } else {
    //     setFilteredMovies(JSON.parse(searchedStoredMovies))
    //   }

      // setFilteredMovies(JSON.parse(searchedStoredMovies));
      // setFilteredMovies(searchedMovies);
    },
    
    // else if (searchedStoredMovies && storedFilterCheck) {
    //   setFilteredMovies(filterMovies(searchedStoredMovies));
    // }

   []);

    useEffect(() => {
      setFilteredMovies(isFilterChecked ? filterMovies(searchedMovies) : searchedMovies);
      localStorage.setItem('filterCheck', isFilterChecked);
  }, [isFilterChecked, searchedMovies]);

    useEffect(() => {
      if (filteredMovies.length === 0) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }
  }, [isNotFound, setIsNotFound, filteredMovies.length]);

  function handleFilterCheck() {
    setIsFilterChecked(!isFilterChecked);

    // setFilteredMovies(!isFilterChecked ? filterMovies(searchedMovies) : searchedMovies);
    // localStorage.setItem('filterCheck', isFilterChecked);

    // if (isFilterChecked) {
    //   setFilteredMovies(filterMovies(searchedMovies))
    //   // filterMovies(searchedMovies)
    //   localStorage.setItem('filterCheck', isFilterChecked);
    // } else {

    // }
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm onSearchSubmit={handleSearchMoviesSubmit} isFilterChecked={isFilterChecked} onCheck={handleFilterCheck} searchText={searchText} isError={isShowKeyWordError} />
       {isServerError && <Error text="Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз" />}
       {isNotFound && <Error text="Ничего не найдено" />}
       {isLoading ? <Preloader /> : <MoviesCardList cards={filteredMovies} />}
        
      </main>
      <Footer />
    </>
  );
}

export default Movies;
