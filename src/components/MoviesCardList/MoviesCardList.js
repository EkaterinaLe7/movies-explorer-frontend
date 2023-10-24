import React, { useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ cards, isLoading = false }) {
  const location = useLocation();

  const [isSaved, setIsSaved] = useState(false);

  function handleSave() {
    setIsSaved(true);
  }

  function handleDelete() {
    setIsSaved(false);
  }

  return (
    <section className="cards" aria-label="Фильмы">
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <ul className="cards__list">
            {cards.map((card) => (
              <MoviesCard
                key={card.id}
                name={card.name}
                image={card.image}
                duration={card.duration}
                isSaved={isSaved}
                onSave={handleSave}
                onDelete={handleDelete}
              />
            ))}
          </ul>
          {location.pathname === "/movies" && (
            <div className="cards__btn-container">
              <button className="cards__button">Ещё</button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
