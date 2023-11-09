import React, { useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";


function MoviesCardList({ cards }) {
  const location = useLocation();

  const [isSaved, setIsSaved] = useState(false);
  const [errorText, setErrorText] = useState("");

  function handleSave() {
    setIsSaved(true);
  }

  function handleDelete() {
    setIsSaved(false);
  }

  return (
    <section className="cards" aria-label="Фильмы">
            <>
              <ul className="cards__list">
                {cards.map((card) => (
                  <MoviesCard
                    key={card.id}
                    card={card}
                    // name={card.name}
                    // image={card.image}
                    // duration={card.duration}
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
    </section>
  );
}

export default MoviesCardList;
