import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <div className="navigation__wrapper">
        <Link to="/" className="navigation__link">
          Фильмы
        </Link>
        <Link to="/" className="navigation__link">
          Сохранённые фильмы
        </Link>
      </div>
      <Link to="/" className="navigation__link header__link-account">
        Аккаунт
        <div className="navigation__link-img"></div>
      </Link>
    </nav>
  );
}

export default Navigation;
