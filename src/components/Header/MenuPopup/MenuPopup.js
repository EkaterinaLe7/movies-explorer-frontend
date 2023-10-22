import React from "react";
import "./MenuPopup.css";
import { NavLink } from "react-router-dom";

function MenuPopup({ onClose }) {
  return (
    <div className="popup">
      <nav className="popup__container">
        <div className="popup__wrapper">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `popup__link ${isActive ? "popup__link_active" : ""}`
            }
            onClick={onClose}
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `popup__link ${isActive ? "popup__link_active" : ""}`
            }
            onClick={onClose}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `popup__link ${isActive ? "popup__link_active" : ""}`
            }
            onClick={onClose}
          >
            Сохранённые фильмы
          </NavLink>
        </div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `popup__link-account ${
              isActive ? "popup__link-account_active" : ""
            }`
          }
          onClick={onClose}
        >
          Аккаунт
          <div className="popup__link-img"></div>
        </NavLink>
        <div className="popup__button-close" onClick={onClose}></div>
      </nav>
    </div>
  );
}

export default MenuPopup;
