import React from "react";
import "./MoviesCard.css";
import MovieCardButton from "./MovieCardButton/MovieCardButton";

function MoviesCard({ card, isSaved, onSave, onDelete }) {
  return (
    <li className="card">
      <a href={card.trailerLink} className="card__trailer_link" target="_blank" rel="noreferrer">
      <img className="card__img" src={`https://api.nomoreparties.co/${card.image.url}`} alt="Постер к фильму" />
      </a>
      
      <MovieCardButton isSaved={isSaved} onDelete={onDelete} onSave={onSave} />
      <div className="card__description">
        <h2 className="card__title">{card.nameRU}</h2>
        <span className="card__duration">{card.duration}</span>
      </div>
    </li>
  );
}

export default MoviesCard;
