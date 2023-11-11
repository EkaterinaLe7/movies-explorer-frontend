import React, { useEffect, useState } from "react";
import "./MoviesCard.css";
import { BASE_MOVIES_API_URL } from "../../utils/constants";
import MovieCardButton from "./MovieCardButton/MovieCardButton";
import { convertMovieDuration } from "../../utils/utils";

function MoviesCard({
  card,
  onSaveCard,
  isSavedMoviesRoute,
  savedCards,
  onDeleteCard,
  isSaved,
  // hasSavedCard
}) {

  // const [isSaved, setIsSaved] = useState(false);
  // const checkSavedCard = savedCards.some(savedCard => {
  //   return savedCard.movieId === card.movieId
  // })

  // useEffect(() => {
    
  //   setIsSaved(checkSavedCard);
  // }, [card, checkSavedCard]);

  // function checkSavedCard(card) {
  //     return savedCards.some((savedCard) => savedCard.movieId === card.movieId)
      
  //   }




  function handleSaveCard() {
    onSaveCard(card);
  }

  // function handleToggleSaveDeleteCard() {
  //   const isSaved = savedCards.some((savedCard) => savedCard.movieId === card.id)
  //   if(isSaved) {
  //     onDeleteCard(savedCards.find((savedCard) => savedCard.movieId === card.id));
  //   }
  //   onSaveCard(card);
  // }

  function handleDeleteSearchedCard() {

      onDeleteCard(savedCards.find((savedCard) => savedCard.movieId === card.id));
  }

  function handleDeleteCard() {
    onDeleteCard(card);
  }


  // const hasSavedCard = savedCards.some(s => {
  //   return s.movieId === card.movieId
  // })

  return (
    <li className="card">
      <a
        href={card.trailerLink}
        className="card__trailer_link"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="card__img"
          src={
            isSavedMoviesRoute
              ? card.image
              : `${BASE_MOVIES_API_URL}${card.image.url}`
          }
          alt={`Постер к фильму "${card.nameRU}"`}
        />
      </a>

      <MovieCardButton
        isSaved={isSaved}
        onSave={handleSaveCard}
        onSearchedCardDelete={handleDeleteSearchedCard}
        // onToggle={handleToggleSaveDeleteCard}
        onDelete={handleDeleteCard}
      />
      <div className="card__description">
        <h2 className="card__title">{card.nameRU}</h2>
        <span className="card__duration">
          {convertMovieDuration(card.duration)}
        </span>
      </div>
    </li>
  );
}

export default MoviesCard;
