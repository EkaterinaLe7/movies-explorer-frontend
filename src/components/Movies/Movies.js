import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import cards from "../../utils/cards";

function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList cards={cards} />
    </main>
  );
}

export default Movies;
