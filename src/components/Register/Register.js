import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";

function Register({ isLoading = false }) {
  return (
    <main className="register">
      <div className="register__container">
        <Link to="/" className="register__logo" />
        <h2 className="register__title">Добро пожаловать!</h2>
        <form className="register__form" method="post" name="register">
          <label className="register__label">
            Имя
            <input
              className="register__input register__input_content_name"
              type="text"
              id="name-input"
              name="username"
              placeholder="Имя"
              required=""
              minLength={2}
              maxLength={40}
            />
            <span className="register__error name-input-error"></span>
          </label>
          <label className="register__label">
            E-mail
            <input
              className="register__input register__input_content_email"
              type="email"
              id="email-input"
              name="email"
              placeholder="Email"
              required=""
              minLength={2}
              maxLength={40}
            />
            <span className="register__error email-input-error"></span>
          </label>
          <label className="register__label">
            Пароль
            <input
              className="register__input register__input_content_password register__input_type_error"
              type="password"
              id="password-input"
              name="password"
              placeholder="Пароль"
              required=""
              minLength={5}
              maxLength={40}
            />
            <span className="register__error password-input-error">
              Что-то пошло не так...
            </span>
          </label>
          <button className="register__button" type="submit">
            {`${isLoading ? "Отправка..." : "Зарегистрироваться"}`}
          </button>
        </form>
        <p className="register__link-text">
          Уже зарегистрированы?{" "}
          <Link className="register__link" to="/signin">
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
