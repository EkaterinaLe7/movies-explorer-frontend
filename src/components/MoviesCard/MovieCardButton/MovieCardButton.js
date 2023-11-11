import React from "react";
import "./MovieCardButton.css";
import { useLocation } from "react-router-dom";

function MovieCardButton({ isSaved, onSave, onSearchedCardDelete, onToggle, onDelete }) {
  const location = useLocation();
  // const className = isSaved ? 'card-button_type_done' : 'card-button_type_save';
  const cardButtonClassName = `card__btn ${
    isSaved ? "card__btn_type_saved" : "card__btn_type_save"
  }`;

  const text = !isSaved ? "Сохранить" : "";

  return (
    <>
      {location.pathname === "/saved-movies" && (
        <button
          className="card__btn card__btn_type_delete"
          type="button"
          onClick={onDelete}
        ></button>
      )}

      {location.pathname === "/movies" && (
        <>
          {isSaved ? (
            <button
              className="card__btn card__btn_type_saved"
              type="button"
              onClick={onSearchedCardDelete}
            ></button>
          ) : (
            <button
              className="card__btn card__btn_type_save"
              type="button"
              onClick={onSave}
            >
              Сохранить
            </button>
          )}
        </>
        // <button
        //       className={cardButtonClassName}
        //       type="button"
        //       onClick={onToggle}
        //     >{text}</button>
      )}
    </>
  );
}

export default MovieCardButton;
