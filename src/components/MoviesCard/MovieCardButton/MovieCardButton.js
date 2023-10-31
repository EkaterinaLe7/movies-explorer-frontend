import React from "react";
import "./MovieCardButton.css";
import { useLocation } from "react-router-dom";

function MovieCardButton({ isSaved, onSave, onDelete }) {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/saved-movies" && (
        <button
          className="card__btn card__btn_type_delete"
          type="button"
          onClick={onSave}
        ></button>
      )}

      {location.pathname === "/movies" && (
        <>
          {isSaved ? (
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
          )}
        </>
      )}
    </>
  );
}

export default MovieCardButton;
