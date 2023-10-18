import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import accountLogo from "../../images/accountLogo.svg";

function Header() {
  const loggedIn = false;
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false);

  function handleMenuClick() {
    setIsMenuPopupOpen(true);
  }

  function closePopup() {
    setIsMenuPopupOpen(false);
  }

  return (
    <header className="header">
      <Link to="/" className="header__logo" />
      {!loggedIn ? (
        <nav className="header__links-container">
          <Link to="/" className="header__link">
            Регистрация
          </Link>
          <Link to="/" className="header__link header__link_type_button">
            Войти
          </Link>
        </nav>
      ) : (
        <>
          <nav className="header__logged-container">
            <div className="header__wrapper">
              <Link to="/" className="header__link">
                Фильмы
              </Link>
              <Link to="/" className="header__link">
                Сохранённые фильмы
              </Link>
            </div>
            <Link to="/" className="header__link header__link-account">
              Аккаунт
              {/* <img src={accountLogo} className="header__link-img" alt="логотип аккаунта" /> */}
              <div className="header__link-img"></div>
            </Link>
          </nav>
          <button
            className="header__menu-btn"
            onClick={handleMenuClick}
            type="button"
          ></button>
        </>

        // {isMenuPopupOpen && <Navigation onClose={closePopup} /> }
      )}
    </header>
  );
}

export default Header;
