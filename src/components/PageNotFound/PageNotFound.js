import React from "react";
import "./PageNotFound.css";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <main className="not-found">
      <h1 className="not-found__title">404</h1>
      <h2 className="not-found__subtitle">Страница не найдена</h2>
      <Link className="not-found__link" to="/">
        Назад
      </Link>
    </main>
  );
}

export default PageNotFound;
