import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "./Navigation/Navigation";

function Header({ isMainPage = false }) {
  const loggedIn = true;
  const [isOpen, setIsOpen] = useState(false);

  function handleMenuClick() {
    setIsOpen(true);
  }

  function closePopup() {
    setIsOpen(false);
  }

  return (
    <header className={`header ${isMainPage ? "header_colored" : ""}`}>
      <Link to="/" className="header__logo" />
      {!loggedIn ? (
        <nav className="header__links-container">
          <Link to="/signup" className="header__link header__link_bold">
            Регистрация
          </Link>
          <Link to="/signin" className="header__link header__link_type_button">
            Войти
          </Link>
        </nav>
      ) : (
        <>
          <nav className="header__logged-container">
            <div className="header__wrapper">
              <Link to="/movies" className="header__link header__link_bold">
                Фильмы
              </Link>
              <Link to="/saved-movies" className="header__link">
                Сохранённые фильмы
              </Link>
            </div>
            <Link to="/profile" className="header__link header__link-account">
              Аккаунт
              <div className={`header__link-img ${isMainPage ? "header__link-img_colored" : ""}`}></div>
            </Link>
          </nav>
          <button
            className="header__menu-btn"
            onClick={handleMenuClick}
            type="button"
          ></button>
          <Navigation isOpen={isOpen} onClose={closePopup} />
        </>
      )}
    </header>
  );
}

export default Header;
