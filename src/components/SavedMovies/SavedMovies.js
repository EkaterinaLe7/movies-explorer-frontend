import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import cards from "../../utils/saved-cards";

function SavedMovies({loggedIn}) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="saved-movies">
        <SearchForm />
        <MoviesCardList cards={cards} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
