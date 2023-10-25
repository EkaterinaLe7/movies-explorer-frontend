import React from "react";
import "./MoviesCard.css";
import MovieCardButton from "./MovieCardButton/MovieCardButton";

function MoviesCard({ name, image, duration, isSaved, onSave, onDelete }) {
  return (
    <li className="card">
      <img className="card__img" src={image} alt="Постер к фильму" />
      <MovieCardButton isSaved={isSaved} onDelete={onDelete} onSave={onSave} />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <span className="card__duration">{duration}</span>
      </div>
    </li>
  );
}

export default MoviesCard;
