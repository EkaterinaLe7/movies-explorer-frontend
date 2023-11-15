import React, { useState, useEffect, useCallback } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import { useResize } from "../../hooks/useResize";
import {
  DISPLAYED_CARDS_L,
  DISPLAYED_CARDS_M,
  DISPLAYED_CARDS_S,
  ADDITIONAL_CARDS_L,
  ADDITIONAL_CARDS_M,
  ADDITIONAL_CARDS_S,
} from "../../utils/constants";

function MoviesCardList({
  cards,
  onSaveCard,
  isSavedMoviesRoute,
  savedCards,
  onDeleteCard,
}) {
  const { isScreenLarge, isScreenMedium, isScreenSmall, width } = useResize();
  const location = useLocation();

  const [count, setCount] = useState(0);
  // const [isSaved, setIsSaved] = useState(false);

  const handleCardsShow = useCallback(() => {
    if (isScreenLarge) {
      setCount(DISPLAYED_CARDS_L);
    } else if (isScreenMedium) {
      setCount(DISPLAYED_CARDS_M);
    } else if (isScreenSmall) {
      setCount(DISPLAYED_CARDS_S);
    }
  }, [isScreenLarge, isScreenMedium, isScreenSmall]);

  useEffect(() => {
    handleCardsShow();
  }, [handleCardsShow, cards, width]);

  function addCards() {
    if (isScreenLarge) {
      setCount(count + ADDITIONAL_CARDS_L);
    } else if (isScreenMedium) {
      setCount(count + ADDITIONAL_CARDS_M);
    } else if (isScreenSmall) {
      setCount(count + ADDITIONAL_CARDS_S);
    }
  }

  return (
    <section className="cards" aria-label="Фильмы">
      {location.pathname === "/movies" && (
        <>
          <ul className="cards__list">
            {cards.slice(0, count).map((card) => (
              <MoviesCard
                key={card.id}
                card={card}
                onSaveCard={onSaveCard}
                savedCards={savedCards}
                onDeleteCard={onDeleteCard}
                isSaved={savedCards.some((c) => c.movieId === card.id)}
              />
            ))}
          </ul>
          {cards.length > count && (
            <div className="cards__btn-container">
              <button className="cards__button" onClick={addCards}>
                Ещё
              </button>
            </div>
          )}
        </>
      )}

      {location.pathname === "/saved-movies" && (
        <>
          <ul className="cards__list">
            {cards.map((card) => (
              <MoviesCard
                key={card._id}
                card={card}
                onDeleteCard={onDeleteCard}
                isSavedMoviesRoute={isSavedMoviesRoute}
              />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
