import React from "react";
import "./MovieCardButton.css";
import { useLocation } from "react-router-dom";

function MovieCardButton({ isSaved, onSave, onDelete }) {
  const location = useLocation();

  return (
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
  );
}

export default MovieCardButton;
