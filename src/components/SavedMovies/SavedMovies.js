import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import cards from "../../utils/saved-cards";

function SavedMovies() {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList cards={cards} />
    </main>
  );
}

export default SavedMovies;
