import React from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";

function Navigation({ isOpen, onClose }) {
  return (
    <div className={`navigation ${isOpen ? "navigation_opened" : ""}`}>
      <nav className="navigation__container">
        <div className="navigation__wrapper">
          <div className="navigation__link-wrapper">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `navigation__link ${isActive ? "navigation__link_active" : ""}`
              }
              onClick={onClose}
            >
              Главная
            </NavLink>
          </div>
          <div className="navigation__link-wrapper">
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `navigation__link ${isActive ? "navigation__link_active" : ""}`
              }
              onClick={onClose}
            >
              Фильмы
            </NavLink>
          </div>
          <div className="navigation__link-wrapper">
            <NavLink
              to="/saved-movies"
              className={({ isActive }) =>
                `navigation__link ${isActive ? "navigation__link_active" : ""}`
              }
              onClick={onClose}
            >
              Сохранённые фильмы
            </NavLink>
          </div>
        </div>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `navigation__link-account ${
              isActive ? "navigation__link-account_active" : ""
            }`
          }
          onClick={onClose}
        >
          Аккаунт
          <div className="navigation__link-img"></div>
        </NavLink>
        <div className="navigation__button-close" onClick={onClose}></div>
      </nav>
    </div>
  );
}

export default Navigation;
