import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import MovieCardButton from "./MovieCardButton/MovieCardButton"

function MoviesCard({ name, image, duration, isSaved, onSave, onDelete }) {
  const location = useLocation();
  return (
    <li className="card">
      <img className="card__img" src={image} alt="Постер к фильму" />
      {/* {isSaved ? (
        <button
          className="card__btn card__btn_type_saved"
          type="button"
          onClick={onDelete}
        ></button>
      ) : (
        <button
          className="card__btn card__btn_type_save"
          type="button"
          onClick={onSave}
        >
          Сохранить
        </button>
      )} */}
      <MovieCardButton isSaved={isSaved} onDelete={onDelete} onSave={onSave} />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <span className="card__duration">{duration}</span>
      </div>
      
      
    </li>
  );
}

export default MoviesCard;
