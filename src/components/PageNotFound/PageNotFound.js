import React from "react";
import "./PageNotFound.css";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <main className="not-found">
      <h1 className="not-found__title">404</h1>
      <h2 className="not-found__subtitle">Страница не найдена</h2>
      <button className="not-found__btn" onClick={goBack}>
        Назад
      </button>
    </main>
  );
}

export default PageNotFound;
